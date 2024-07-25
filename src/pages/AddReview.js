import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addReview } from '../actions';

const AddReview = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [review, setReview] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addReview(id, review));
    setReview('');
  };

  return (
    <div>
      <h1>Add Review</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          required
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddReview;
