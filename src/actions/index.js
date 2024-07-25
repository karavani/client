import axios from 'axios';

export const setSpots = (spots) => ({
  type: 'SET_SPOTS',
  payload: spots,
});

export const fetchSpots = () => async (dispatch) => {
  try {
    const response = await axios.get('/api/spots');
    dispatch(setSpots(response.data));
  } catch (error) {
    console.error('Error fetching spots:', error);
  }
};

export const addReview = (spotId, review) => async (dispatch) => {
  try {
    const response = await axios.post(`/api/spots/${spotId}/reviews`, { review });
    dispatch({
      type: 'ADD_REVIEW',
      payload: { spotId, review: response.data.reviews.slice(-1)[0] },
    });
  } catch (error) {
    console.error('Error adding review:', error);
  }
};
