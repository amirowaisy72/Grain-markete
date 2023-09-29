const mongoose = require("mongoose");
const { Schema } = mongoose;

const DcSchema = new Schema({
  //Primary key --> Foriegn Key Definition
  // user:{
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'model name'
  // },
  //All required fields here
  name: {
    type: String,
    index: true,
  },
  detail: {
    type: String,
  },
  amount: {
    type: Number,
  },
  DbCr: {
    type: String,
  },
  crop: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  rate: {
    type: Number,
  },
  allItems: {
    type: String,
  },
  mazduriBoriItems: {
    type: String,
  },
  totalAmount: {
    type: Number,
  },
  expenseList: {
    type: [String],
  },
  expenseAmounts: {
    type: Object,
  },
  totalExpenses: {
    type: Number,
  },
  totalPayableAmount: {
    type: Number,
  },
  date: {
    type: Date,
  },
});

module.exports = mongoose.model("Dc", DcSchema);
