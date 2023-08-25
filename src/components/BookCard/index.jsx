import React from 'react'
import './style.css'

const BookCard = ({book}) => {
  return (
    <div className="book-card">
  <div className="img-card">
    <img
      className="book-image"
      src={`data:image/jpeg;base64,${book.image}`}
      alt={book.title}
    />
  </div>
  <div className="book-details">
    <h3 className="book-title">{book.title}</h3>
    <p className="book-author">{book.author}</p>
    <p className="book-review">{book.review}</p>
    <div className="like-section">
      <i className={`fa-solid fa-thumbs-up fa-2xl like-icon`}></i>
      <p className="likes-count">{book.likes.length}</p>
    </div>
  </div>
</div>

  );
}

export default BookCard