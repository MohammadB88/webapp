CREATE DATABASE book_reviews;
USE book_reviews;

CREATE TABLE reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  rating INT NOT NULL,
  review TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- CREATE TABLE IF NOT EXISTS `books_reviews` (
--   `id` int(11) NOT NULL AUTO_INCREMENT,
--   `book_name` varchar(50) NOT NULL,
--   `book_review` varchar(50) NOT NULL,
--   PRIMARY KEY (`id`)
-- ) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;