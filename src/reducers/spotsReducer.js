const initialState = {
    spots: [],
  };
  
  const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_SPOTS':
        return {
          ...state,
          spots: action.payload,
        };
      case 'ADD_REVIEW':
        return {
          ...state,
          spots: state.spots.map(spot =>
            spot._id === action.payload.spotId
              ? { ...spot, reviews: [...spot.reviews, action.payload.review] }
              : spot
          ),
        };  
      default:
        return state;
    }
  };
  
  export default spotsReducer;
  