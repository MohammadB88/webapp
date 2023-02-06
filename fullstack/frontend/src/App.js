
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
    <div className="book-review-app">
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
      <table class="book-review-table">
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


// /* eslint-disable no-unused-expressions */
// /* eslint-disable no-restricted-globals */
// import React, { Component } from 'react';
// import './App.css';
// import axios from 'axios';
// import { Button, Container, Card, Row } from 'react-bootstrap';

// // Import the background image
// //import background from './background.png';

// class App extends Component {
//   constructor(props) {
//     super(props)
//       this.state = {
//         setBookName: '',
//         setReview: '',
//         fetchData: [],
//         reviewUpdate: ''
//       }
//   }

//   handleChange = (event) => {
//     let nam = event.target.name;
//     let val = event.target.value
//     this.setState({
//       [nam]: val
//     })
//   }

//   handleChange2 = (event) => {
//     this.setState({
//       reviewUpdate: event.target.value
//     })
//   }

//   componentDidMount() {
//     axios.get("/api/get")
//       .then((response) => {
//         this.setState({
//           fetchData: response.data
//         })
//       })
//   }

//   submit = () => {
//     axios.post('/api/insert', this.state)
//       .then(() => { alert('success post') })
//     console.log(this.state)
//     document.location.reload();
//   }

//   delete = (id) => {
//     if (confirm("Do you want to delete? ")) {
//       axios.delete(`/api/delete/${id}`)
//       document.location.reload()
//     }
//   }

//   edit = (id) => {
//     axios.put(`/api/update/${id}`, this.state)
//     document.location.reload();
//   }

//   render() {

//     let card = this.state.fetchData.map((val, key) => {
//       return (
//         <React.Fragment>
//           <Card style={{ width: '18rem' }} className='m-2'>
//             <Card.Body>
//               <Card.Title>{val.book_name}</Card.Title>
//               <Card.Text>
//                 {val.book_review}
//               </Card.Text>
//               <input name='reviewUpdate' onChange={this.handleChange2} placeholder='Update Review' ></input>
//               <Button className='m-2' onClick={() => { this.edit(val.id) }}>Update</Button>
//               <Button onClick={() => { this.delete(val.id) }}>Delete</Button>
//             </Card.Body>
//           </Card>
//         </React.Fragment>
//       )
//     })

//     return (
//      // <div className='App' style={{backgroundImage: `url(${background})`}}>
//       <div className='body'>
//         <h1>Dockerized Fullstack React Application</h1>
//         <div className='form'>
//           <input name='setBookName' placeholder='Enter Book Name' onChange={this.handleChange} />
//           <input name='setReview' placeholder='Enter Review' onChange={this.handleChange} />
//         </div>

//         <Button className='my-2' variant="primary" onClick={this.submit}>Submit</Button> <br /><br/>

//         <Container>
//           <Row>
//             {card}
//           </Row>
//         </Container>
//       </div>
//     );
//   } 
// }
// export default App;
