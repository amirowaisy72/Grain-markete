const express = require("express");
const mongoose = require("mongoose");
const Accounts = require("../models/Accounts");
const Dc = require("../models/Dc");
const Stock = require("../models/Stock");
const router = express.Router();

router.post("/createOnlySeller", async (req, res) => {
  let success = false;
  let errorOccured = "Could not find error";
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Get Data from user
    let {
      customer,
      crop,
      quantity,
      rate,
      mazduriBoriItems,
      allItems,
      totalAmount,
      expenseList,
      expenseAmounts,
      totalExpenses,
      totalPayableAmount,
    } = req.body;

    totalPayableAmount = Math.round(totalPayableAmount);

    // First check if the account exists or not
    const accountExist = await Accounts.findOne({ name: customer }).session(
      session
    );

    if (!accountExist) {
      success = false;
      errorOccured =
        "یہ اکاؤنٹ موجود نہیں ہے۔ برائے مہربانی پہلے اس اکاؤنٹ کو رجسٹر کریں۔";
    } else {
      // Next step: post data into Dc Model
      const dc = await Dc.create(
        [
          {
            name: customer,
            detail: "انوائس",
            amount: totalPayableAmount,
            DbCr: "Credit",
            crop: crop,
            quantity: quantity,
            rate: rate,
            mazduriBoriItems: mazduriBoriItems,
            allItems: allItems,
            totalAmount: totalAmount,
            expenseList: expenseList,
            expenseAmounts: expenseAmounts,
            totalExpenses: totalExpenses,
            totalPayableAmount: totalPayableAmount,
            date: Date.now(),
          },
        ],
        { session }
      );
      if (!dc) {
        success = false;
        errorOccured = "Some Problem Occured while creating Dc entry";
      } else {
        // Next: Stock entry. Proceed only if previously success is true
        const stock = await Stock.create(
          [
            {
              crop: crop,
              inout: "In",
              quantity: quantity,
              description: "انوائس",
              customer: customer,
              rate: rate,
              mazduriBoriItems: mazduriBoriItems,
              allItems: allItems,
              totalAmount: totalAmount,
              expenseList: expenseList,
              expenseAmounts: expenseAmounts,
              totalExpenses: totalExpenses,
              totalPayableAmount: totalPayableAmount,
            },
          ],
          { session }
        );

        if (!stock) {
          success = false;
          errorOccured = "Some Problem Occured while creating Stock entry";
          await session.abortTransaction();
        } else {
          // Create Expense Accounts after successful Stock creation
          const specifiedExpenses = [
            "Comission",
            "Mazduri",
            "Brokery",
            "Accountant",
            "Markete_Fee",
          ];

          // Preprocess expenseList and expenseAmounts
          const filteredExpenseList = [];
          const updatedExpenseAmounts = {};

          for (let i = 0; i < expenseList.length; i++) {
            const currentExpense = expenseList[i];

            // Check if the currentExpense is one of the variations of Mazduri
            if (
              currentExpense === "Mazduri Bori" ||
              currentExpense === "Mazduri Tor"
            ) {
              // If it's one of the variations, add its amount to the corresponding Mazduri entry
              updatedExpenseAmounts["Mazduri"] =
                (updatedExpenseAmounts["Mazduri"] || 0) +
                expenseAmounts[currentExpense];
            } else {
              // If it's not one of the variations, keep it as is
              filteredExpenseList.push(currentExpense);
              updatedExpenseAmounts[currentExpense] =
                expenseAmounts[currentExpense];
            }
          }

          // Include "Mazduri" if it has an amount
          if (updatedExpenseAmounts["Mazduri"] !== undefined) {
            // Include "Mazduri" if it is not already present in filteredExpenseList
            if (!filteredExpenseList.includes("Mazduri")) {
              filteredExpenseList.push("Mazduri");
            }
          }

          // Update expenseList and expenseAmounts
          expenseList = filteredExpenseList;
          expenseAmounts = updatedExpenseAmounts;

          // Now you can run your loop with the updated expenseList and expenseAmounts
          for (let i = 0; i < expenseList.length; i++) {
            const currentExpense = expenseList[i];

            if (specifiedExpenses.includes(currentExpense)) {
              // Check if an account with the expense name already exists
              const existingAccount = await Accounts.findOne({
                name: currentExpense,
              }).session(session);

              if (!existingAccount) {
                // Create a new account for the expense with the name
                await Accounts.create(
                  [
                    {
                      name: currentExpense, // Add the name of the expense
                      status: "Regular",
                    },
                  ],
                  { session }
                );
              }

              await Dc.create(
                [
                  {
                    name: currentExpense,
                    detail: "انوائس",
                    amount: Math.round(expenseAmounts[currentExpense]),
                    DbCr: "Credit",
                    crop: crop,
                    quantity: quantity,
                    rate: rate,
                    mazduriBoriItems: mazduriBoriItems,
                    allItems: allItems,
                    totalAmount: totalAmount,
                    expenseList: expenseList,
                    expenseAmounts: expenseAmounts,
                    totalExpenses: totalExpenses,
                    totalPayableAmount: totalPayableAmount,
                    date: Date.now(),
                  },
                ],
                { session }
              );
            }
          }

          let commit = await session.commitTransaction();
          if (!commit) {
            success = false;
            errorOccured = "Some Problem Occured while making transaction";
          } else {
            success = true;
          }
        }
      }
    }

    if (success) {
      res.send({ success, message: "انٹری کامیابی سے کر دی گئی ہے۔" });
    } else {
      res.send({ success, error: errorOccured });
    }
  } catch (error) {
    success = false;
    errorOccured = error.message;
    await session.abortTransaction();
    res.status(500).json({ success, error: errorOccured });
  } finally {
    session.endSession();
  }
});

router.post("/createBuyerSeller", async (req, res) => {
  let success = true; // Assume success initially
  let errorOccured = "Could not find error";
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Get Data from user
    const { allInvoices } = req.body;

    for (const invoice of allInvoices) {
      // Destructure invoice data
      let {
        customerType,
        customer,
        crop,
        quantity,
        rate,
        mazduriBoriItems,
        allItems,
        totalAmount,
        expenseList,
        expenseAmounts,
        totalExpenses,
        totalPayableAmount,
      } = invoice;

      totalPayableAmount = Math.round(totalPayableAmount);

      // First check if the account exists or not
      const accountExist = await Accounts.findOne({ name: customer }).session(
        session
      );

      if (!accountExist) {
        success = false;
        errorOccured =
          "یہ اکاؤنٹ موجود نہیں ہے۔ برائے مہربانی پہلے اس اکاؤنٹ کو رجسٹر کریں۔";
        break; // Exit the loop on the first error
      }

      // Next step: post data into Dc Model
      const dc = await Dc.create(
        [
          {
            name: customer,
            detail: "انوائس",
            amount: totalPayableAmount,
            DbCr: customerType === "Seller" ? "Credit" : "Debit",
            crop: crop,
            quantity: quantity,
            rate: rate,
            mazduriBoriItems: mazduriBoriItems,
            allItems: allItems,
            totalAmount: totalAmount,
            expenseList: expenseList,
            expenseAmounts: expenseAmounts,
            totalExpenses: totalExpenses,
            totalPayableAmount: totalPayableAmount,
            date: Date.now(),
          },
        ],
        { session }
      );

      if (!dc) {
        success = false;
        errorOccured = "Some Problem Occured while creating Dc entry";
        break; // Exit the loop on the first error
      }

      let stock = "check if it is necessary or not";
      // Check if the length of allInvoices is greater than 1
      if (allInvoices.length < 1) {
        // Next: Stock entry. Proceed only if previously success is true
        stock = await Stock.create(
          [
            {
              crop: crop,
              inout: "Out",
              quantity: quantity,
              description: "انوائس",
              customer: customer,
              rate: rate,
              mazduriBoriItems: mazduriBoriItems,
              allItems: allItems,
              totalAmount: totalAmount,
              expenseList: expenseList,
              expenseAmounts: expenseAmounts,
              totalExpenses: totalExpenses,
              totalPayableAmount: totalPayableAmount,
            },
          ],
          { session }
        );
      }

      if (!stock) {
        success = false;
        errorOccured = "Some Problem Occured while creating Stock entry";
        break; // Exit the loop on the first error
      }

      // Create Expense Accounts after successful Stock creation
      const specifiedExpenses = [
        "Comission",
        "Mazduri",
        "Brokery",
        "Accountant",
        "Markete_Fee",
      ];

      // Preprocess expenseList and expenseAmounts
      const filteredExpenseList = [];
      const updatedExpenseAmounts = {};

      for (let i = 0; i < expenseList.length; i++) {
        const currentExpense = expenseList[i];

        // Check if the currentExpense is one of the variations of Mazduri
        if (
          currentExpense === "Mazduri Bori" ||
          currentExpense === "Mazduri Tor"
        ) {
          // If it's one of the variations, add its amount to the corresponding Mazduri entry
          updatedExpenseAmounts["Mazduri"] =
            (updatedExpenseAmounts["Mazduri"] || 0) +
            expenseAmounts[currentExpense];
        } else {
          // If it's not one of the variations, keep it as is
          filteredExpenseList.push(currentExpense);
          updatedExpenseAmounts[currentExpense] =
            expenseAmounts[currentExpense];
        }
      }

      // Include "Mazduri" if it has an amount
      if (updatedExpenseAmounts["Mazduri"] !== undefined) {
        // Include "Mazduri" if it is not already present in filteredExpenseList
        if (!filteredExpenseList.includes("Mazduri")) {
          filteredExpenseList.push("Mazduri");
        }
      }

      // Update expenseList and expenseAmounts
      expenseList = filteredExpenseList;
      expenseAmounts = updatedExpenseAmounts;

      // Now you can run your loop with the updated expenseList and expenseAmounts
      for (let i = 0; i < expenseList.length; i++) {
        const currentExpense = expenseList[i];

        if (specifiedExpenses.includes(currentExpense)) {
          // Check if an account with the expense name already exists
          const existingAccount = await Accounts.findOne({
            name: currentExpense,
          }).session(session);

          if (!existingAccount) {
            // Create a new account for the expense with the name
            await Accounts.create(
              [
                {
                  name: currentExpense, // Add the name of the expense
                  status: "Regular",
                },
              ],
              { session }
            );
          }

          await Dc.create(
            [
              {
                name: currentExpense,
                detail: "انوائس",
                amount: Math.round(expenseAmounts[currentExpense]),
                DbCr: "Credit",
                crop: crop,
                quantity: quantity,
                rate: rate,
                mazduriBoriItems: mazduriBoriItems,
                allItems: allItems,
                totalAmount: totalAmount,
                expenseList: expenseList,
                expenseAmounts: expenseAmounts,
                totalExpenses: totalExpenses,
                totalPayableAmount: totalPayableAmount,
                date: Date.now(),
              },
            ],
            { session }
          );
        }
      }
    }

    if (success) {
      await session.commitTransaction();
      res.send({ success: true, message: "انٹری کامیابی سے کر دی گئی ہے۔" });
    } else {
      await session.abortTransaction();
      res.status(500).json({ success: false, error: errorOccured });
    }
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({ success: false, error: error.message });
  } finally {
    session.endSession();
  }
});

module.exports = router;
