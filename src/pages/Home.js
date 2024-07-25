import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSpots } from '../actions';

const Home = () => {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots.spots);

  useEffect(() => {
    dispatch(fetchSpots());
  }, [dispatch]);

  return (
    <div>
      <h1>Surf Spots</h1>
      <ul>
        {spots.map((spot) => (
          <li key={spot._id}>
            <Link to={`/spot/${spot._id}`}>{spot.name}</Link>
          </li>
        ))}
      </ul>
      <Link to="/map">View Map</Link>
      <iframe src='https://beachcam.co.il/dromi2.html' />
    </div>
  );
};

export default Home;
