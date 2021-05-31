// import React, { useState, useContext, useEffect } from 'react';
// import { TextField, Typography, Grid, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
// import { v4 as uuidv4 } from 'uuid';

// import { useSpeechContext } from '@speechly/react-client';
// import Snackbar from '../../Snackbar/Snackbar';
// import formatDate from '../../../utils/formatDate';
// import { ExpenseTrackerContext } from '../../../context/context';
// import { incomeCategories, expenseCategories } from '../../../constants/categories';
// import useStyles from './styles';

// const initialState = {
//   amount: '',
//   category: '',
//   type: 'Income',
//   date: formatDate(new Date()),
// };

// const NewTransactionForm = () => {
//   const classes = useStyles();
//   const { addTransaction } = useContext(ExpenseTrackerContext);
//   const [formData, setFormData] = useState(initialState);
//   const { segment } = useSpeechContext();
//   const [open, setOpen] = React.useState(false);

//   const createTransaction = () => {
//     if (Number.isNaN(Number(formData.amount)) || !formData.date.includes('-')) return;

//     if (incomeCategories.map((iC) => iC.type).includes(formData.category)) {
//       setFormData({ ...formData, type: 'Income' });
//     } else if (expenseCategories.map((iC) => iC.type).includes(formData.category)) {
//       setFormData({ ...formData, type: 'Expense' });
//     }

//     setOpen(true);
//     addTransaction({ ...formData, amount: Number(formData.amount), id: uuidv4() });
//     setFormData(initialState);
//   };

//   useEffect(() => {
//     if (segment) {
//       if (segment.intent.intent === 'add_expense') {
//         setFormData({ ...formData, type: 'Expense' });
//       } else if (segment.intent.intent === 'add_income') {
//         setFormData({ ...formData, type: 'Income' });
//       } else if (segment.isFinal && segment.intent.intent === 'create_transaction') {
//         return createTransaction();
//       } else if (segment.isFinal && segment.intent.intent === 'cancel_transaction') {
//         return setFormData(initialState);
//       }

//       segment.entities.forEach((s) => {
//         const category = `${s.value.charAt(0)}${s.value.slice(1).toLowerCase()}`;

//         switch (s.type) {
//           case 'amount':
//             setFormData({ ...formData, amount: s.value });
//             break;
//           case 'category':
//             if (incomeCategories.map((iC) => iC.type).includes(category)) {
//               setFormData({ ...formData, type: 'Income', category });
//             } else if (expenseCategories.map((iC) => iC.type).includes(category)) {
//               setFormData({ ...formData, type: 'Expense', category });
//             }
//             break;
//           case 'date':
//             setFormData({ ...formData, date: s.value });
//             break;
//           default:
//             break;
//         }
//       });

//       if (segment.isFinal && formData.amount && formData.category && formData.type && formData.date) {
//         createTransaction();
//       }
//     }
//   }, [segment]);

//   const selectedCategories = formData.type === 'Income' ? incomeCategories : expenseCategories;

//   return (
//     <Grid container spacing={2}>
//       <Snackbar open={open} setOpen={setOpen} />
//       <Grid item xs={12}>
//         <Typography align="center" variant="subtitle2" gutterBottom>
//         {segment ? (
//         <div className="segment">
//           {segment.words.map((w) => w.value).join(" ")}
//         </div>
//       ) : null}
//          {/* {isSpeaking ? <BigTranscript /> : 'Start adding transactions'}  */}
//         </Typography>
//       </Grid>
//       <Grid item xs={6}>
//         <FormControl fullWidth>
//           <InputLabel>Type</InputLabel>
//           <Select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
//             <MenuItem value="Income">Income</MenuItem>
//             <MenuItem value="Expense">Expense</MenuItem>
//           </Select>
//         </FormControl>
//       </Grid>
//       <Grid item xs={6}>
//         <FormControl fullWidth>
//           <InputLabel>Category</InputLabel>
//           <Select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
//             {selectedCategories.map((c) => <MenuItem key={c.type} value={c.type}>{c.type}</MenuItem>)}
//           </Select>
//         </FormControl>
//       </Grid>

//       <Grid item xs={6}>
//         <TextField type="number" label="Amount" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} fullWidth />
//       </Grid>
//       <Grid item xs={6}>
//         <TextField fullWidth label="Date" type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: formatDate(e.target.value) })} />
//       </Grid>
//       <Button className={classes.button} variant="outlined" color="primary" fullWidth onClick={createTransaction}>Create</Button>
//     </Grid>
//   );
// };

// export default NewTransactionForm;

import React ,{useState,useContext,useEffect} from 'react'
import {TextField,Typography,Grid,Button,FormControl,InputLabel,Select,MenuItem} from '@material-ui/core';
import useStyles from './styles'
import {ExpenseTrackerContext} from '../../../context/context'
import {v4 as uuidv4} from 'uuid';
import {incomeCategories,expenseCategories} from '../../../constants/categories'
import formatDate from '../../../utils/formatDate';
import {useSpeechContext} from '@speechly/react-client'
import {useAuth,currentUser} from '../../../context/AuthContext'
import SnackBar from '../../Snackbar/Snackbar'
const initialState={
  userID:'',
  amount:'',
  category:'',
  type:'Income',
  description:''
};

function Form() {
  const classes = useStyles();

  const{addTransaction, Currency, balance} = useContext(ExpenseTrackerContext);
  const [formData, setFormData]= useState(initialState);

  //this segment is used to extract the speech
  const {segment} = useSpeechContext();
  const [open,setOpen]=useState(false);

  const createTransaction=()=>
  {
    console.log(`current user id is ${currentUser.uid}`);
    if (Number.isNaN(Number(formData.amount)))
  {
        return;
  }
    //uuidv4 is a function that creates new unique id every time
    setOpen(true);
    addTransaction({...formData,amount:Number(formData.amount),userID:currentUser.uid})
     setFormData(initialState);
  }
// segment.isFinal returns a boolean value which becomes true when we stop speaking
  useEffect(() => {
    if (segment) {
      if (segment.intent.intent === 'add_expense') {
        setFormData({ ...formData, type: 'Expense' });
      } else if (segment.intent.intent === 'add_income') {
        setFormData({ ...formData, type: 'Income' });
      } else if (segment.isFinal && segment.intent.intent === 'create_transaction') {
        return createTransaction();
      } else if (segment.isFinal && segment.intent.intent === 'cancel_transaction') {
        return setFormData(initialState);
      }

      segment.entities.forEach((s) => {
        const category = `${s.value.charAt(0)}${s.value.slice(1).toLowerCase()}`;

        switch (s.type) {
          case 'amount':
            setFormData({ ...formData, amount: s.value });
            break;
          case 'category':
            if (incomeCategories.map((iC) => iC.type).includes(category)) {
              setFormData({ ...formData, type: 'Income', category });
            } else if (expenseCategories.map((iC) => iC.type).includes(category)) {
              setFormData({ ...formData, type: 'Expense', category });
            }
            break;
          case 'date':
            console.log("Date: " + s.value);
            setFormData({ ...formData, date: s.value.split("-").reverse().join("-") });
            break;
          default:
            break;
        }
      });

      if (segment.isFinal && formData.amount && formData.category && formData.type) {
        createTransaction();
      }
    }
  }, [segment]);

  const selectedCategories = formData.type === 'Income'?incomeCategories:expenseCategories;

  const {currentUser} = useAuth();
  return (

   <Grid container spacing={2}>
      <SnackBar open={open} setOpen={setOpen} />
      <Grid item xs={12}>
        <Typography align="center" variant="subtitle2" gutterBottom>
        {segment ? (
        <div className="segment">
          {segment.words.map((w) => w.value).join(" ")}
        </div>
      ) : null}
         {/* {isSpeaking ? <BigTranscript /> : 'Start adding transactions'}  */}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Type</InputLabel>
          <Select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
            <MenuItem value="Income">Income</MenuItem>
            <MenuItem value="Expense">Expense</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
            {selectedCategories.map((c) => <MenuItem key={c.type} value={c.type}>{c.type}</MenuItem>)}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={6}>
        <TextField type="number" label="Amount" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} fullWidth />
      </Grid>
      <Grid item xs={6}>
      <InputLabel>Date</InputLabel>
        <TextField fullWidth type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value})} />
      </Grid>
<TextField type="String" label="Additional Notes (Optional) " fullWidth value={formData.description} onChange={(e)=>setFormData({...formData,description:e.target.value})}/>
      <Button className={classes.button} variant="outlined" color="primary" fullWidth onClick={createTransaction}>Create</Button>
    </Grid>
  )
}

export default Form

       /* Like with the single selection, you can pull out the new value by accessing event.target.value in the onChange callback. It's always an array.
       value literally means what value will the selection hold. since it has formData.type , it will hold whatever value the updated form contains-- all thanks to useState()!*/
// The responsive grid focuses on consistent spacing widths, rather than column width. Material Design margins and columns follow an 8px square baseline grid. The spacing property is an integer between 0 and 10 inclusive. By default, the spacing between two grid items follows a linear function: output(spacing) = spacing * 8px, e.g. spacing={2} creates a 16px wide gap.
