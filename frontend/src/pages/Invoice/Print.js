import React from 'react'
import PropTypes from 'prop-types'
import { Link, useLocation } from 'react-router-dom'

const Print = ({
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
}) => {
  const location = useLocation()

  // Define default values for props
  customer = customer || (location.state && location.state.customer) || 'Default Customer'
  crop = crop || (location.state && location.state.crop) || 'Default Crop'
  quantity = quantity || (location.state && location.state.quantity) || 0
  rate = rate || (location.state && location.state.rate) || 0
  mazduriBoriItems = mazduriBoriItems || (location.state && location.state.mazduriBoriItems) || 0
  allItems = allItems || (location.state && location.state.allItems) || 'Default All Items'
  totalAmount = totalAmount || (location.state && location.state.totalAmount) || 0
  expenseList = expenseList || (location.state && location.state.expenseList) || []
  expenseAmounts = expenseAmounts || (location.state && location.state.expenseAmounts) || {}
  totalExpenses = totalExpenses || (location.state && location.state.totalExpenses) || 0
  totalPayableAmount =
    totalPayableAmount || (location.state && location.state.totalPayableAmount) || 0

  const handlePrint = () => {
    const invoiceContent = document.getElementById('invoice-content')
    const printWindow = window.open('', '', 'width=600,height=600')

    printWindow.document.open()
    printWindow.document.write(`
          <html>
            <head>
              <title>Invoice</title>
              <style type="text/css">
                ${getPrintStyles()} /* Load the print styles */
              </style>
            </head>
            <body>
              ${invoiceContent.innerHTML}
            </body>
          </html>
        `)
    printWindow.document.close()

    printWindow.print()
    printWindow.close()
  }

  const getPrintStyles = () => {
    return `
          body {
            font-family: Arial, sans-serif;
            font-size: 12pt;
            margin: 0;
            padding: 0;
          }
      
          #invoice-content {
            padding: 20px;
            border: 1px solid #ccc;
            margin: 0 auto;
            width: 80%;
            background-color: #fff;
          }
      
          h3 {
            font-size: 18pt;
            margin-top: 0;
          }
      
          p {
            font-size: 12pt;
          }
      
          table {
            width: 100%;
            border-collapse: collapse;
            border: 1px solid #ccc;
          }
      
          th, td {
            padding: 10px;
            text-align: left;
            border: 1px solid #ccc;
          }
      
          th {
            background-color: #f2f2f2;
            font-weight: bold;
          }
      
          .btn {
            display: none; /* Hide the "Print" button when printing */
          }
        `
  }

  return (
    <>
      {location.state?.source === 'Accounts' && (
        <Link className=" mx-5 btn btn-primary" to="/accountledger" state={{ name: customer }}>
          واپس
        </Link>
      )}
      {location.state?.source === 'Stock' && (
        <Link className=" mx-5 btn btn-primary" to="/stockEntries" state={{ crop: crop }}>
          واپس
        </Link>
      )}
      <button className="btn btn-primary" onClick={handlePrint}>
        Print
      </button>
      <div className="mt-4" id="invoice-content">
        <h3>انوائس کی معلومات:</h3>
        <p> {customer},</p>
        <p> براہ کرم مندرجہ ذیل تفصیلات دیکھیں:</p>
        <table className="table">
          <tbody>
            <tr>
              <td>فصل:</td>
              <td>
                {crop === 'Select Crop'
                  ? 'کوئی ایک چنیں'
                  : crop === 'Gandum'
                  ? 'گندم'
                  : crop === 'Kapaas'
                  ? 'کپاس'
                  : crop === 'Sarson'
                  ? 'سرسوں'
                  : crop === 'Mirch'
                  ? 'مرچ'
                  : crop === 'Moonji'
                  ? 'مونجھی'
                  : crop === 'Deegar'
                  ? `دیگر (${crop})`
                  : crop}
              </td>
              <td>وزن :</td>
              <td>من {(quantity / 40).toFixed(2)}</td>
              <td>ریٹ:</td>
              <td>Rs {rate}</td>
            </tr>
            {mazduriBoriItems ? (
              <tr>
                <td>بوریوں کی تعداد:</td>
                <td>{allItems}</td>
              </tr>
            ) : (
              ''
            )}
            <tr>
              <td colSpan="6">کل رقم (Rs):</td>
              <td>Rs {Math.round(totalAmount).toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
        <table className="table">
          <thead>
            <tr>
              <th>خرچہ</th>
              <th>رقم (Rs)</th>
            </tr>
          </thead>
          <tbody>
            {expenseList.map((expense, index) => (
              <tr key={index}>
                <td>
                  {expense === 'Apply Expenses'
                    ? 'اخراجات لگائیں'
                    : expense === 'Comission'
                    ? 'کمیشن'
                    : expense === 'Mazduri'
                    ? 'مزدوری'
                    : expense === 'Mazduri Bori'
                    ? ' مزدوری مکمل بوریاں'
                    : expense === 'Mazduri Tor'
                    ? ' مزدوری ادھوری بوریاں'
                    : expense === 'Brokery'
                    ? 'دلالی'
                    : expense === 'Accountant'
                    ? 'منشیانہ'
                    : expense === 'Markete_Fee'
                    ? 'مارکیٹ فیس'
                    : expense === 'Sootli'
                    ? 'سوتلی'
                    : expense === 'Ghisai'
                    ? 'گھسائی'
                    : expense}
                </td>
                <td>
                  {expenseAmounts[expense] !== undefined && (
                    <>
                      Rs {Math.round(expenseAmounts[expense]).toLocaleString()}{' '}
                      {/* رقم کو مدور شدہ فارمیٹ میں دکھائیں */}
                    </>
                  )}
                </td>
              </tr>
            ))}
            <tr>
              <th>کل خرچہ:</th>
              <th>
                Rs {totalExpenses !== undefined && Math.round(totalExpenses).toLocaleString()}
              </th>
            </tr>
            <tr>
              <th>کل رقم:</th>
              <th>Rs {Math.round(totalAmount).toLocaleString()}</th>
            </tr>
            <tr>
              <th> کل واجب الادا رقم:</th>
              <th>
                Rs{' '}
                {totalPayableAmount !== undefined &&
                  Math.round(totalPayableAmount).toLocaleString()}
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

Print.propTypes = {
  customer: PropTypes.string.isRequired,
  crop: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  rate: PropTypes.number.isRequired,
  mazduriBoriItems: PropTypes.number.isRequired,
  allItems: PropTypes.string.isRequired,
  totalAmount: PropTypes.number.isRequired,
  expenseList: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenseAmounts: PropTypes.object.isRequired,
  totalExpenses: PropTypes.number.isRequired,
  totalPayableAmount: PropTypes.number.isRequired,
  type: PropTypes.number.isRequired,
}

export default Print
