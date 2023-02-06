const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

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

const port = 3001;
app.listen(port, () => {
  console.log(`Backend app listening on port ${port}`);
});
