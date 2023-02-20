const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

// Add summary block
const http = require('http');
const querystring = require('querystring');

const app = express();
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST_IP,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

app.get('/reviews', (req, res) => {
  const sql = `SELECT * FROM reviews`;
  connection.query(sql, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send({ error: 'Failed to retrieve reviews' });
      return;
    }
    res.send(results);
  });
});

app.post('/reviews', (req, res) => {
  const { title, author, rating, review } = req.body;
  const sql = `INSERT INTO reviews (title, author, rating, review) VALUES (?, ?, ?, ?)`;
  const params = [title, author, rating, review];
  connection.query(sql, params, (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).send({ error: 'Failed to submit review' });
      return;
    }
    res.send({ message: 'Review submitted successfully!' });
  });
});

app.put('/reviews/:id', (req, res) => {
  const { title, author, rating, review } = req.body;
  const { id } = req.params;
  const sql = `UPDATE reviews SET title = ?, author = ?, rating = ?, review = ? WHERE id = ?`;
  const params = [title, author, rating, review, id];
  connection.query(sql, params, (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).send({ error: 'Failed to update review' });
      return;
    }
    res.send({ message: 'Review updated successfully!' });
  });
});

app.delete('/reviews/:id', (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM reviews WHERE id = ?`;
  const params = [id];
  connection.query(sql, params, (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).send({ error: 'Failed to delete review' });
      return;
    }
    res.send({ message: 'Review deleted successfully!' });
  });
});


// Retrieve the book summary from TextRazor API
app.get('/books/:bookId/summary', (req, res) => {
  // Fetch book title and author from MySQL database
  const bookId = req.params.bookId;
  const query = `SELECT title, author FROM books WHERE id = ${bookId}`;
  connection.query(query, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error fetching book');
      return;
    }

    const book = results[0];

    // Generate summary using TextRazor API
    const postData = querystring.stringify({
      'extractors': 'entities,topics',
      'text': book.title + ' ' + book.author,
    });

    const options = {
      hostname: 'api.textrazor.com',
      path: '/',
      method: 'POST',
      headers: {
        'X-TextRazor-Key': process.env.API_TOKEN,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': postData.length,
      },
    };

    const request = http.request(options, (response) => {
      let data = '';

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        const summary = JSON.parse(data).response.sentences[0].sentence;

        // Update book record in MySQL database
        const updateQuery = `UPDATE books SET summary = ${mysql.escape(summary)} WHERE id = ${bookId}`;
        connection.query(updateQuery, (error, results) => {
          if (error) {
            console.error(error);
            res.status(500).send('Error updating book');
            return;
          }

          res.send({ summary });
        });
      });
    });

    request.on('error', (error) => {
      console.error(error);
      res.status(500).send('Error generating summary');
    });

    request.write(postData);
    request.end();
  });
});


const port = 3001;
app.listen(port, () => {
  console.log(`Backend app listening on port ${port}`);
});
