import React from 'react'
import './style.css'

const BookCard = ({book}) => {
  return (
    <div className="book-card">
      <img src={book.image} alt={book.title} />
      <h3>{book.title}</h3>
      <p>{book.author}</p>
      <p>Likes: {book.likes.length}</p>
    </div>
  );
}

export default BookCard