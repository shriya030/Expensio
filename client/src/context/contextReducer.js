const contextReducer = (state, action) => {
  let transactions;

  switch (action.type) {
    case "GET_TRANSACTIONS":
      transactions = action.payload.transactions;
      const filtered_transactions = transactions.filter(
        t => t.userID === action.payload.id
      );
      return filtered_transactions;
    case "DELETE_TRANSACTION":
      transactions = state.filter(
        transaction => transaction._id !== action.payload
      );

      localStorage.setItem("transactions", JSON.stringify(transactions));

      return transactions;
    case "ADD_TRANSACTION":
      transactions = [action.payload, ...state];

      localStorage.setItem("transactions", JSON.stringify(transactions));

      return transactions;
    case "TRANSACTION_ERROR":
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export default contextReducer;
