const currReducer = (state, action) => {
  //const { currentUser } = useAuth();
  let currency;
  switch (action.type) {
    case "SET_CURRENCY":
      currency = action.payload;
      return currency;
    default:
      return state;
  }
};

export default currReducer;
