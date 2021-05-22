import React, { useContext, useEffect } from 'react';
import { List as MUIList, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, IconButton, Slide, Button } from '@material-ui/core';
import { Delete, MoneyOff } from '@material-ui/icons';

import { ExpenseTrackerContext } from '../../../context/context';
import useStyles from './styles';
import{formatAmount} from '../../../utils/formatAmount';
import {useAuth} from "../../../context/AuthContext";
import axios from "axios";
import { CSVLink } from "react-csv";

const List = () => {
  const classes = useStyles();
  const { transactions, deleteTransaction, getTransactions, Currency } = useContext(ExpenseTrackerContext);
  const { currentUser } = useAuth();

  useEffect(() => {
    // console.log("***", currentUser.uid);
    getTransactions(currentUser.uid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const headers = [
    {label: 'Type', key: 'type'},
    {label: 'Category', key: 'category'},
    {label: 'Amount', key: 'amount'},
    {label: 'Date', key: 'date'},
    {label: "Description", key: 'description'}
  ];

  const csvReport = {
    filename: "Transactions.csv",
    headers: headers,
    data: transactions
    }


  return (
    <div>
    <MUIList dense={false} className={classes.list}>
      {transactions.map((transaction) => (
        <Slide direction="down" in mountOnEnter unmountOnExit key={transaction.id}>
          <ListItem>
            <ListItemAvatar>
              <Avatar className={transaction.type === 'Income' ? classes.avatarIncome : classes.avatarExpense}>
                <MoneyOff />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={transaction.category} secondary={`${Currency}${(transaction.amount)} : ${transaction.description===''?transaction.description:""} ${
                  transaction.date
                }`} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" onClick={() => deleteTransaction(transaction._id)}>
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </Slide>
      ))}
    </MUIList>

    <Button className={classes.button} variant='outlined' color='primary' fullWidth ><CSVLink {...csvReport}>Download</CSVLink></Button>
    </div>
  );
};



export default List;
