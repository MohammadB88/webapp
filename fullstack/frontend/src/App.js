
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [reviews, setReviews] = useState([]);
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    getReviews();
  }, []);

  const getReviews = async () => {
    try {
      const res = await axios.get("/api/reviews");
      setReviews(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addReview = async e => {
    e.preventDefault();
    try {
      if (editId === null) {
        const res = await axios.post("/api/reviews", {
          author,
          title,
          rating,
          review
        });
        setReviews([...reviews, res.data]);
      } else {
        const res = await axios.put(`/api/reviews/${editId}`, {
          author,
          title,
          rating,
          review
        });
        const updatedReviews = reviews.map(review =>
          review.id === editId ? res.data : review
        );
        setReviews(updatedReviews);
        setEditId(null);
      }
      setAuthor("");
      setTitle("");
      setRating("");
      setReview("");
    } catch (error) {
      console.error(error);
    }
  };

  const deleteReview = async id => {
    try {
      await axios.delete(`/api/reviews/${id}`);
      const updatedReviews = reviews.filter(review => review.id !== id);
      setReviews(updatedReviews);
    } catch (error) {
      console.error(error);
    }
  };

  const editReview = review => {
    setAuthor(review.author);
    setTitle(review.title);
    setRating(review.rating);
    setReview(review.review);
    setEditId(review.id);
  };

  return (
    <div className="container">
      <h1>Book Review App</h1>
      <form onSubmit={addReview}>
        <label>Author:</label>
        <input
          type="text"
          value={author}
          onChange={e => setAuthor(e.target.value)}
        />
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <label>Rating:</label>
        <input
          type="number"
          value={rating}
          onChange={e => setRating(e.target.value)}
        />
        <label>Review:</label>
        <textarea
          value={review}
          onChange={e => setReview(e.target.value)}
        />
        <button type="submit">{editId ? "Update" : "Add"} Review</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Author</th>
            <th>Title</th>
            <th>Rating</th>
            <th>Review</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map(review => (
            <tr key={review.id}>
              <td>{review.author}</td>
              <td>{review.title}</td>
              <td>{review.rating}</td>
              <td>{review.review}</td>
              <td>
                <button onClick={() => editReview(review)}>Edit</button>
                <button onClick={() => deleteReview(review.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;