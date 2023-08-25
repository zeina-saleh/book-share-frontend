import React from 'react'
import Button from '../Button';
import './style.css';
import { sendRequest } from '../../config/request';
import { useState } from 'react';


const AddBook = ({handleCloseModal}) => {

    const defaultState = {
        title: '',
        author: '',
        review: ''
    };


    const [selectedImages, setSelectedImages] = useState('');
    const [data, setData] = useState(defaultState);
    console.log(data)

    const handleDataChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const selectedImagesArray = Array.from(e.target.files);
        setSelectedImages(selectedImagesArray);
      };
      const getBase64Image = (imageFile) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(imageFile);
          reader.onload = () => {
            const base64Image = reader.result.split(',')[1];
            resolve(base64Image);
          };
          reader.onerror = (error) => {
            reject(error);
          };
        });
      };
      const handleSave = async () => {
        const requestData = {
          title: data.title,
          author: data.author,
          reviewText: data.review,
          image: '' 
        };
        if (selectedImages.length > 0) {
          const base64Image = await getBase64Image(selectedImages[0]);
          requestData.image = base64Image;
        }
        try {
          const response = await sendRequest({
            method: 'POST',
            route: '/create',
            body: requestData
          });
          console.log(response.data);
          setData(defaultState);
          handleCloseModal();
        } catch (error) {
          console.log(error);
        }
      };


  return (
    <div className='modal-form-container'>
            <div className='form-container'>
                <div className='flex column gap10'>
                    <label>Book Title</label>
                    <input className='input-field' name='title' value={data.title} onChange={handleDataChange} placeholder='Enter book title' />
                </div>
                <div  className='flex column gap10'>
                    <label>Author</label>
                    <input className='input-field' name='author' value={data.author} onChange={handleDataChange} placeholder='Enter book author' />
                </div>
                    <label>Upload Images</label>
                    <input className='input-field' type='file' onChange={handleImageChange} />
                <div className='flex column gap10'>
                    <label>Review</label>
                    <textarea className='review-text' name='review' value={data.review} onChange={handleDataChange} placeholder='Enter review' />
                </div>
            </div>
            <div className='buttons-container'>
                <Button color='primary-bg' textColor='white-text' text='Cancel' onClick={handleCloseModal} />
                <Button color='primary-bg' textColor='white-text' text='Save' onClick={handleSave} />
            </div>
        </div>
  )
  }

export default AddBook