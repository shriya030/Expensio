import React, { useReducer, createContext } from "react";
import axios from "axios";
import currReducer from "./currReducer";

import contextReducer from "./contextReducer";

const initialState = JSON.parse(localStorage.getItem("transactions")) || [];
const init = [];

export const ExpenseTrackerContext = createContext(initialState);

export const Provider = ({ children }) => {
  const [transactions, dispatch] = useReducer(contextReducer, initialState);
  const [Currency, Dispatch] = useReducer(currReducer, init);

  async function getTransactions(uid) {
    try {
      const res = await axios.get("/api/v1/transactions");
      // res.data. data -> The other .data is used for getting data field from the object.
      dispatch({
        type: "GET_TRANSACTIONS",
        payload: { transactions: res.data.data, id: uid }
      });
    } catch (err) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: err.response.data.error
      });
    }
  }

  async function deleteTransaction(id) {
    try {
      await axios.delete(`/api/v1/transactions/${id}`);
      dispatch({ type: "DELETE_TRANSACTION", payload: id });
    } catch (err) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: err.response.data.error
      });
    }
  }

  async function addTransaction(transaction) {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.post("/api/v1/transactions", transaction, config);
      dispatch({ type: "ADD_TRANSACTION", payload: res.data.data });
    } catch (err) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: err.response.data.error
        //payload: err.response.data.error
      });
    }
  }

  async function setCurr(value) {
    Dispatch({ type: "SET_CURRENCY", payload: value });
  }

  const balance = transactions.reduce(
    (acc, currVal) =>
      currVal.type === "Expense" ? acc - currVal.amount : acc + currVal.amount,
    0
  );

  return (
    <ExpenseTrackerContext.Provider
      value={{
        setCurr,
        Currency,
        transactions,
        balance,
        getTransactions,
        deleteTransaction,
        addTransaction
      }}
    >
      {children}
    </ExpenseTrackerContext.Provider>
  );
};
