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


// const express = require('express');
// const mysql = require('mysql2');
// const cors = require('cors');
// const app = express();

// // Add mysql database connection
// const db = mysql.createPool({
//   host: process.env.MYSQL_HOST_IP, //'mysql-db-svc', // the host name MYSQL_DATABASE: node_mysql
//   user: process.env.MYSQL_USER, //'MYSQL_USER', // database user MYSQL_USER: MYSQL_USER
//   password: process.env.MYSQL_PASSWORD, //'MYSQL_PASSWORD', // database user password MYSQL_PASSWORD: MYSQL_PASSWORD
//   database: process.env.MYSQL_DATABASE //'books' // database name MYSQL_HOST_IP: mysql_db
// })

// // Enable cors security headers
// app.use(cors())

// // add an express method to parse the POST method
// app.use(express.json())
// app.use(express.urlencoded({ extended: true }));

// // home page
// app.get('/', (req, res) => {
//   res.send('Hi There')
// });

// // get all of the books in the database
// app.get('/get', (req, res) => {
//   const SelectQuery = "SELECT * FROM  books_reviews";
//   db.query(SelectQuery, (err, result) => {
//      if(err)
//   {
//      console.log(err)
//   }else{
//      console.log('GOT')
//   }
//      res.send(result)
//   })
// })

// // add a book to the database
// app.post("/insert", (req, res) => {
//   const bookName = req.body.setBookName;
//   const bookReview = req.body.setReview;
//   const InsertQuery = "INSERT INTO books_reviews (book_name, book_review) VALUES (?, ?)";
//   db.query(InsertQuery, [bookName, bookReview], (err, result) => {
//      if(err)
//   {
//      console.log(err)
//   }else{
//      console.log('INSERTED')
//   }
// 	// console.log(result)
//   })
// })

// // delete a book from the database
// app.delete("/delete/:bookId", (req, res) => {
//   const bookId = req.params.bookId;
//   const DeleteQuery = "DELETE FROM books_reviews WHERE id = ?";
//   db.query(DeleteQuery, bookId, (err, result) => {
//      if(err)
//   {
//      console.log(err)
//   }else{
//      console.log('DELETED')
//   }
//   })
// })

// // update a book review
// app.put("/update/:bookId", (req, res) => {
//   const bookReview = req.body.reviewUpdate;
//   const bookId = req.params.bookId;
//   const UpdateQuery = "UPDATE books_reviews SET book_review = ? WHERE id = ?";
//   db.query(UpdateQuery, [bookReview, bookId], (err, result) => {
//      if(err)
//   {
//      console.log(err)
//   }else{
//      console.log('UPDATED')
//   }
//   })
// })

// app.listen('3001', (err) => { 
//      if(err)
//   {
//      console.log(err)
//   }else{
//      console.log('ON PORT 3001')
//   }
// })
