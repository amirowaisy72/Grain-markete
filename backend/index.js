const connecToMongoose = require("./db");
const express = require("express");
const app = express();
connecToMongoose();
var cors = require("cors");

const fs = require("fs");

const content = "Hello Amir waisy!";
const fileName = "test.txt";

fs.writeFile(fileName, content, (err) => {
  if (err) {
    console.error("Error creating the file:", err);
  } else {
    console.log(`File "${fileName}" has been created.`);
  }
});

app.use(express.json());
app.use(cors());
//Available Routes
app.use("/accounts", require("./routes/accounts.js"));
app.use("/debitcredit", require("./routes/debitcredit.js"));
app.use("/cashpoints", require("./routes/cashpoints.js"));
app.use("/cashdebitcredit", require("./routes/cashdebitcredit.js"));
app.use("/stock", require("./routes/stock.js"));
app.use("/invoice", require("./routes/invoice.js"));
app.use("/todaytimeline", require("./routes/todaytimeline.js"));
app.use("/expenseFormulas", require("./routes/expenseFormulas.js"));
app.use("/adminRoles", require("./routes/adminRoles.js"));

app.listen(5000, () => {
  console.log("listening at port 5000");
});
