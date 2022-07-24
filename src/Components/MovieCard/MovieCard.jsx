/* eslint-disable max-len */
/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import {
  Button, Modal, Input, message,
} from 'antd';
import deleteBtn from './remove-svgrepo-com.svg';

const { TextArea } = Input;

function MovieCard({ movie }) {
  const [isVisible, setIsVisible] = useState(null);
  const [comments, setComments] = useState([]);
  const [input, setInput] = useState('');

  function openModal(id) {
    setIsVisible(id);
  }

  function closeModal() {
    setIsVisible(null);
    setInput('');
  }

  function inputHandler(evt) {
    setInput(evt.target.value);
  }

  function leaveComment() {
    if (input) {
      setComments([...comments, input]);
      closeModal();
      setInput('');
    } else {
      message.error("Can't send an empty comment");
    }
  }

  function removeComment(evt, indexToRemove) {
    setComments((prev) => {
      const newComments = [...prev];
      newComments.splice(indexToRemove, 1);
      return newComments;
    });
  }

  return (
    <>
      <div className="content">
        <div className="content-inner">
          <div className="content-front">
            <img src={movie.medium_cover_image} alt="movie poster" />
          </div>
          <div className="content-back">
            <h1>{movie.title}</h1>
            <ul>
              <li>
                <strong>{movie.year}</strong>
              </li>
              <li>
                <strong>{movie.genres[0]}</strong>
              </li>
              <li>
                <Button onClick={() => openModal(movie.id)} type="button">Leave a comment</Button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Modal title="All comments" visible={isVisible === movie.id} onOk={leaveComment} onCancel={closeModal}>
        {
        comments.length
          ? comments.map((comment, index) => (
            <div key={index} className="comment-block">
              <p className="comment-body">{comment}</p>
              <div onClick={(e) => removeComment(e, index)}>
                <img className="remove-comment-btn" src={deleteBtn} alt="delete button icon" />
              </div>
            </div>
          ))
          : <p>No comments yet</p>
        }
        <TextArea
          showCount
          maxLength={50}
          onChange={inputHandler}
          value={input}
          placeholder="type your comment here"
        />
      </Modal>
    </>
  );
}

export default MovieCard;
