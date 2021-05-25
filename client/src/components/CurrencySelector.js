import React, { useContext } from "react";
import { ExpenseTrackerContext } from "../context/context";

import {
  TextField,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core";

import { currencies } from "../constants/Currencies";
function CurrencySelector() {
  const { setCurr } = useContext(ExpenseTrackerContext);
  return (
    <div style={{ marginLeft: "3%", color: "white" }}>
      <InputLabel style={{ color: "white" }}>Select Your Currency</InputLabel>
      <Select
        style={{ color: "white" }}
        onChange={e => {
          setCurr(e.target.value);
        }}
      >
        {currencies.map(c => (
          <MenuItem key={c.symbol} value={c.symbol}>
            {`${c.symbol} : ${c.name}`}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
}

export default CurrencySelector;
