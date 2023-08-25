import React, { useEffect, useState } from 'react';
import { sendRequest } from '../../../config/request';
import { Link } from 'react-router-dom';
import "./style.css";
import Nav from '../../Nav';
import Modal from "react-modal";
import BookCard from '../../BookCard';
import AddBook from '../../AddBook';


const Landing = () => {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const response = await sendRequest({ route: "/reviews", body: "" });
      const booksArray = response.flatMap(user => user.book);
      setBooks(booksArray);
      console.log(booksArray);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const [openModal, setOpenModal] = useState(false)
  const handleOpenModal = () => setOpenModal(true)
  const handleCloseModal = () => setOpenModal(false)


  return (
    <div>
      <Nav handleOpenModal={handleOpenModal} />
      <div className="book-list">
        <div className='container'>
          <div className="content">
            {books.map(book => (
              // <Link key={book._id} to={`/landing/${book._id}`}>
              <BookCard book={book} />
              
              // </Link>
            ))}
          </div>
        </div>
      </div>
      <Modal isOpen={openModal}
        onRequestClose={handleCloseModal}>
        <AddBook handleCloseModal={handleCloseModal} />
      </Modal>
    </div>
  );
};

export default Landing;
