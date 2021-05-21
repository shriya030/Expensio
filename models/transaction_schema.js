const mongoose = require("mongoose");

const formatDate = date => {
  const d = new Date(date);
  let month = `${d.getMonth() + 1}`;
  let day = `${d.getDate()}`;
  const year = d.getFullYear();

  if (month.length < 2) {
    month = `0${month}`;
  }
  if (day.length < 2) {
    day = `0${day}`;
  }

  return [day, month, year].join("-");
};

const TransactionSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true
  },
  type: {
    type: String,
    trim: true,
    required: [true, "Please add some text"]
  },
  category: {
    type: String,
    required: [true, "Please add some category"]
  },
  amount: {
    type: Number,
    required: [true, "Please add a positive or negative number"]
  },
  date: {
    type: String,
    default: formatDate(new Date())
  }
});

module.exports = mongoose.model("Transaction", TransactionSchema);
