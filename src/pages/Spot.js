import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

const Spot = () => {
  const { id } = useParams();
  const spot = useSelector((state) => state.spots.spots.find((spot) => spot._id === id));

  if (!spot) return <p>Spot not found</p>;

  return (
    <div>
      <h1>{spot.name}</h1>
      <ul>
        {spot.reviews.map((review, index) => (
          <li key={index}>{review.review}</li>
        ))}
      </ul>
      <Link to={`/add-review/${spot._id}`}>Add Review</Link>
    </div>
  );
};

export default Spot;
