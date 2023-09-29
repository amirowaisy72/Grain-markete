import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link, useLocation } from 'react-router-dom'
import Print from './Print'
import { useContext } from 'react'
import contextCreator from '../context/contextCreator'

function Buyer() {
  const [createDone, setCreateDone] = useState(true)
  const location = useLocation()
  const context = useContext(contextCreator)
  const { createBuyerSeller, searchAccount, createStockManual } = context
  const [suggestName, setSuggestName] = useState('')
  const [postEntryUpdate, setPostEntryUpdate] = useState('')
  const [invoicesButtonDisabled, setInvoicesButtonDisabled] = useState('')
  const [buyerName, setBuyerName] = useState('')
  // Custom expense input fields state
  const [customExpenseName, setCustomExpenseName] = useState('')
  const [customExpenseFormula, setCustomExpenseFormula] = useState('')
  const [customExpenseAmount, setCustomExpenseAmount] = useState(0)

  const validCrops = ['Gandum', 'Kapaas', 'Sarson', 'Mirch', 'Moonji']

  const initialCrop = location.state?.crop
  const defaultCrop = validCrops.includes(initialCrop) ? initialCrop : 'Deegar'

  const [crop, setCrop] = useState(location.state ? defaultCrop : 'Select Crop')
  const [quantity, setQuantity] = useState(location.state.quantity)
  const [rate, setRate] = useState(location.state.rate)
  const [selectedExpense, setSelectedExpense] = useState('Apply Expenses')
  const [selectedSubExpense, setSelectedSubExpense] = useState('Mazduri Bori')
  const [expenseList, setExpenseList] = useState([])
  const [expenseAmounts, setExpenseAmounts] = useState({})
  const [totalAmount, setTotalAmount] = useState(0)
  const [numberOfItems, setNumberOfItems] = useState(location.state.numberOfItems)
  const [buyerInvoices, setBuyerInvoices] = useState([])
  const [sellButtonDisabled, setSellButtonDisabled] = useState(false)
  const [remainingQuantity, setRemainingQuantity] = useState(location.state.quantity)
  const [rateError, setRateError] = useState('') // Step 1: Add error state
  const [mazduriBoriItems, setMazduriBoriItems] = useState(
    location.state.mazduriBoriItems ? location.state.mazduriBoriItems : 0,
  )
  const [mazduriTorItems, setMazduriTorItems] = useState(
    location.state.mazduriTorItems ? location.state.mazduriTorItems : 0,
  )
  let allItems = ''
  if (mazduriBoriItems) {
    allItems = `(${mazduriBoriItems} مکمل بوری )`
    if (mazduriTorItems) {
      allItems = allItems + ' (' + mazduriTorItems + ' ادھوری بوری)'
    }
  } else {
    allItems = `${numberOfItems} items`
  }
  // State to store all generated invoices
  const [invoices, setInvoices] = useState([])
  //List of formulas applied on expenses
  //Factors affecting it:
  //handleFormulaChange
  const [expenseFormulas, setExpenseFormulas] = useState({
    // Calculate the default Comission formula based on the initial crop value
    Comission: (() => {
      switch (crop) {
        case 'Gandum':
          return '0.005'
        case 'Kapaas':
          return '0.01'
        case 'Deegar':
          return '0.015'
        default:
          return '0' // Default formula for other crops
      }
    })(),
    Mazduri: (() => {
      switch (crop) {
        case 'Kapaas':
          return '3'
        default:
          return '0' // Default formula for other crops
      }
    })(),
    'Mazduri Bori': (() => {
      switch (crop) {
        case 'Gandum':
          return '10'
        case 'Deegar':
          return '5'
      }
    })(),
    'Mazduri Tor': (() => {
      switch (crop) {
        case 'Gandum':
          return '6'
        case 'Deegar':
          return '0'
      }
    })(),
    Markete_Fee: '2',
    Sootli: 0,
    Ghisai: (() => {
      switch (crop) {
        case 'Kapaas':
          return '4'
      }
    })(),
    Kaat_Bardana: '',
  })

  //State variables END
  // Function to add a custom expense to the expense list
  const addCustomExpense = () => {
    if (customExpenseName.trim() === '' || customExpenseFormula.trim() === '') {
      return // Don't add if name or formula is empty
    }

    // Create a new custom expense object
    const customExpense = customExpenseName
    setExpenseList([...expenseList, customExpense])

    // Update the expense formula with the custom expense
    setExpenseFormulas((prevFormulas) => ({
      ...prevFormulas,
      [customExpense]: customExpenseFormula,
    }))

    // Clear the custom expense input fields
    setCustomExpenseName('')
    setCustomExpenseFormula('')
  }

  // Function to calculate the custom expense amount when formula or quantity changes
  useEffect(() => {
    try {
      const amount = eval(customExpenseFormula) // Calculate amount based on the formula
      setCustomExpenseAmount(amount)
    } catch (error) {
      setCustomExpenseAmount(0) // Handle formula errors by setting amount to 0
    }
  }, [customExpenseFormula])

  useEffect(() => {
    // Determine whether to disable the "Add" button
    const isAddButtonDisabled =
      remainingQuantity <= 0 ||
      !buyerName || // Buyer name is empty
      !quantity || // Quantity is empty
      !rate || // Rate is empty
      isNaN(parseFloat(quantity)) || // Quantity is not a valid number
      isNaN(parseFloat(rate)) // Rate is not a valid number

    const isInvoicesButtonDisabled = remainingQuantity === 0

    setInvoicesButtonDisabled(isInvoicesButtonDisabled)

    setSellButtonDisabled(isAddButtonDisabled)

    const totalAmountInRupees = (quantity / 40) * rate
    setTotalAmount(totalAmountInRupees)

    const calculatedAmounts = {}
    for (const expense of expenseList) {
      try {
        let formula = expenseFormulas[expense]
        let amount = 0
        // Check if the expense is Mazduri, Mazduri Bori, or Mazduri Tor.
        if (expense === 'Mazduri' || expense === 'Mazduri Bori' || expense === 'Mazduri Tor') {
          if (expense === 'Mazduri Bori') {
            amount = eval(formula) * mazduriBoriItems
          } else if (expense === 'Mazduri Tor') {
            amount = eval(formula) * mazduriTorItems
          } else if (crop === 'Kapaas' && expense === 'Mazduri') {
            amount = eval(formula) * (quantity / 40)
          } else {
            amount = eval(formula) * numberOfItems
          }
        } else if (expense === 'Sootli') {
          amount = eval(formula)
        } else if (expense === 'Markete_Fee') {
          amount = (formula / 100) * totalAmount
        } else if (expense === 'Ghisai') {
          if (crop === 'Kapaas') {
            amount = (quantity / 40) * 4
          } else {
            amount = 0
          }
        } else if (
          expense !== 'Comission' &&
          expense !== 'Mazduri' &&
          expense !== 'Mazduri Bori' &&
          expense !== 'Mazduri Tor' &&
          expense !== 'Brokery' &&
          expense !== 'Brokery' &&
          expense !== 'Accountant'
        ) {
          amount = eval(formula)
        } else {
          // For other expenses, calculate by multiplying with totalAmountInRupees.
          amount = eval(formula) * totalAmountInRupees
        }
        calculatedAmounts[expense] = amount
      } catch (error) {
        calculatedAmounts[expense] = 0
      }
    }
    setExpenseAmounts(calculatedAmounts)
  }, [
    expenseFormulas,
    expenseList,
    quantity,
    rate,
    numberOfItems,
    mazduriBoriItems,
    mazduriTorItems,
    location.state.quantity,
    remainingQuantity,
  ])

  const addBuyer = () => {
    if (remainingQuantity > 0) {
      const soldQuantity = parseFloat(quantity) || 0
      setRemainingQuantity((prevQuantity) => prevQuantity - soldQuantity)

      //Add buyer object in array
      const buyerInvoice = {
        customerType: 'Buyer',
        customer: buyerName,
        crop: crop === 'Deegar' ? location.state.crop : crop,
        quantity,
        allItems,
        rate,
        expenseList,
        expenseFormulas,
        expenseAmounts,
        totalAmount,
        totalExpenses,
        totalPayableAmount,
        mazduriBoriItems,
        mazduriTorItems,
        numberOfItems,
      }

      setBuyerInvoices([...buyerInvoices, buyerInvoice])

      setBuyerName('')
      setCrop(location.state.crop || 'Select Crop')
      setQuantity()
      setRate(location.state.rate)
      setSelectedExpense('Apply Expenses')
      setExpenseList([])
      setExpenseAmounts({})
      setTotalAmount(0)
      setNumberOfItems(0)
      setExpenseFormulas({
        // Calculate the default Comission formula based on the initial crop value
        Comission: (() => {
          switch (crop) {
            case 'Gandum':
              return '0.005'
            case 'Kapaas':
              return '0.01'
            case 'Deegar':
              return '0.015'
            default:
              return '0' // Default formula for other crops
          }
        })(),
        Mazduri: (() => {
          switch (crop) {
            case 'Kapaas':
              return '3'
            default:
              return '0' // Default formula for other crops
          }
        })(),
        'Mazduri Bori': (() => {
          switch (crop) {
            case 'Gandum':
              return '10'
            case 'Deegar':
              return '5'
          }
        })(),
        'Mazduri Tor': (() => {
          switch (crop) {
            case 'Gandum':
              return '6'
            case 'Deegar':
              return '0'
          }
        })(),
        Markete_Fee: '2',
        Sootli: '0',
        Ghisai: (() => {
          switch (crop) {
            case 'Kapaas':
              return '4'
          }
        })(),
        Kaat_Bardana: '',
      })
      setMazduriBoriItems('')
      setMazduriTorItems('')
      setNumberOfItems('')
    }
  }

  const cropOptions = ['Select Crop', 'Gandum', 'Kapaas', 'Sarson', 'Mirch', 'Moonji', 'Deegar']
  function getAvailableExpenseOptions(selectedCrop) {
    const baseOptions = [
      'Apply Expenses',
      'Comission',
      'Mazduri',
      'Markete_Fee', // New expense: Markete Fee
      'Sootli', // New expense: Sootli
      'Ghisai', // New expense: Ghisai
    ]

    switch (selectedCrop) {
      case 'Gandum':
        return baseOptions.filter((option) => option !== 'Ghisai')
      case 'Kapaas':
        return baseOptions.filter((option) => option !== 'Sootli')
      case 'Deegar':
        return baseOptions.filter((option) => option !== 'Ghisai')
      default:
        return baseOptions
    }
  }

  const subExpenseOptions = ['Mazduri Bori', 'Mazduri Tor']

  const handleCropChange = (e) => {
    setCrop(e.target.value)
  }

  const handleQuantityChange = (e) => {
    const enteredQuantity = parseFloat(e.target.value) || 0
    if (enteredQuantity <= remainingQuantity) {
      setQuantity(enteredQuantity)
    }
  }

  const handleRateChange = (e) => {
    setRate(e.target.value)
    const newRate = e.target.value
    setRate(newRate)
    // Step 2: Add validation function
    if (!newRate.match(/^\d+(\.\d{1,2})?$/)) {
      setRateError('Please enter a valid Rate Value (e.g., 100 or 100.50)')
    } else {
      setRateError('') // Clear the error message
    }
  }

  const handleRemoveExpense = (expense) => {
    const updatedExpenses = expenseList.filter((item) => item !== expense)
    setExpenseList(updatedExpenses)
    if (expense === 'Mazduri') {
      setNumberOfItems(0)
    }
  }

  const handleFormulaChange = (expense, formula) => {
    setExpenseFormulas({ ...expenseFormulas, [expense]: formula })
  }

  const totalExpenses = Object.values(expenseAmounts).reduce((total, amount) => total + amount, 0)
  const totalPayableAmount = eval(totalAmount) + eval(totalExpenses)
  console.log(expenseAmounts['Sootli'])

  const remainingQuantityMessage =
    remainingQuantity > 0 ? `(${remainingQuantity} کلو گرام باقی بچ گئے ہیں)` : ''

  // Function to generate and display invoices
  const generateInvoices = () => {
    // Initialize an array for all invoices
    let allInvoices = []

    // Define landlordInvoice as an empty object initially
    let landlordInvoice = {}

    if (location.state.source === 'Landlord') {
      // Generate the landlord invoice
      landlordInvoice = {
        customerType: 'Seller',
        customer: location.state.landlordName,
        crop: location.state.crop,
        quantity: location.state.quantity,
        allItems: location.state.allItems,
        mazduriBoriItems: location.state.mazduriBoriItems,
        mazduriTorItems: location.state.mazduriTorItems,
        numberOfItems: location.state.numberOfItems,
        rate: location.state.rate,
        expenseList: location.state.expenseList,
        expenseFormulas: location.state.expenseFormulas,
        totalAmount: location.state.totalAmount,
        expenseAmounts: location.state.expenseAmounts,
        totalExpenses: location.state.totalExpenses,
        totalPayableAmount: location.state.totalPayableAmount,
      }
      allInvoices.push(landlordInvoice)
    }

    // Add buyerInvoices to allInvoices
    allInvoices = [...allInvoices, ...buyerInvoices]

    // Set the invoices to state to display all invoices
    setInvoices(allInvoices)
  }

  // Function to capitalize the first letter of every word
  const capitalizeFirstLetter = (str) => {
    return str
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  //Apply all expenses automatically
  const applyExpensesAuto = () => {
    let expenseOptions = getAvailableExpenseOptions(crop)
    expenseOptions.forEach((expense) => {
      if (expense !== 'Apply Expenses') {
        let newExpense = expense
        if (expense === 'Mazduri') {
          if (crop === 'Gandum') {
            setExpenseList((prevExpenseList) => [...prevExpenseList, 'Mazduri Bori'])
            setExpenseList((prevExpenseList) => [...prevExpenseList, 'Mazduri Tor'])
            handleFormulaChange('Mazduri Bori', '10')
            handleFormulaChange('Mazduri Tor', '6')
          } else if (crop === 'Deegar') {
            setExpenseList((prevExpenseList) => [...prevExpenseList, 'Mazduri Bori'])
            handleFormulaChange('Mazduri', '5')
          } else if (crop === 'Kapaas' || crop === 'Mirch' || crop === 'Moonji') {
            setExpenseList((prevExpenseList) => [...prevExpenseList, 'Mazduri'])
          }
        } else {
          setExpenseList((prevExpenseList) => [...prevExpenseList, newExpense])
        }
      }
    })
  }

  const handleBuyerName = async (e) => {
    let name = capitalizeFirstLetter(e.target.value)
    setBuyerName(name)
    setPostEntryUpdate('مشابہ اکاؤنٹ چیک کر رہا ہے...')
    try {
      let data = await searchAccount(e.target.value)
      setPostEntryUpdate('')
      if (data.success) {
        setSuggestName(data.accounts.name)
      }
    } catch (error) {
      setPostEntryUpdate('')
    }
  }

  const postEntryHandler = async () => {
    //Summarize all data
    // Initialize an array for all invoices
    let allInvoices = []

    // Define landlordInvoice as an empty object initially
    let landlordInvoice = {}

    if (location.state.source === 'Landlord') {
      // Generate the landlord invoice
      landlordInvoice = {
        customerType: 'Seller',
        customer: location.state.landlordName,
        crop: location.state.crop,
        quantity: location.state.quantity,
        allItems: location.state.allItems,
        mazduriBoriItems: location.state.mazduriBoriItems,
        mazduriTorItems: location.state.mazduriTorItems,
        numberOfItems: location.state.numberOfItems,
        rate: location.state.rate,
        expenseList: location.state.expenseList,
        expenseFormulas: location.state.expenseFormulas,
        totalAmount: location.state.totalAmount,
        expenseAmounts: location.state.expenseAmounts,
        totalExpenses: location.state.totalExpenses,
        totalPayableAmount: location.state.totalPayableAmount,
      }
      allInvoices.push(landlordInvoice)
    }

    // Add buyerInvoices to allInvoices
    allInvoices = [...allInvoices, ...buyerInvoices]

    // Set the invoices to state to display all invoices
    setInvoices(allInvoices)

    try {
      setPostEntryUpdate('انٹری کی جا رہی ہے۔ برائے مہربانی انتظار فرمائیں')
      setCreateDone(false)
      if (location.state?.source === 'Stock') {
        const sellStock = await createStockManual(
          crop,
          'Out',
          location.state.quantity,
          'اسٹاک بیچا',
        )
      }
      const response = await createBuyerSeller(allInvoices)
      if (response.success) {
        setPostEntryUpdate(response.message)
      } else {
        setPostEntryUpdate(response.error)
      }
    } catch (error) {
      setPostEntryUpdate(error.message)
    }

    setBuyerName('')
    setCrop(location.state.crop || 'Select Crop')
    setQuantity()
    setRate(location.state.rate)
    setSelectedExpense('Apply Expenses')
    setExpenseList([])
    setExpenseAmounts({})
    setTotalAmount(0)
    setNumberOfItems(0)
  }

  return (
    <div className="container mt-4">
      {location.state?.source === 'Stock' && (
        <Link className="btn btn-primary" to="/stock/inout">
          اسٹاک والے پیج پر واپس جائیں۔
        </Link>
      )}
      {location.state?.source === 'Landlord' && (
        <Link className="btn btn-primary" to="/invoice">
          زمیندار والے پیج پر واپس جائیں
        </Link>
      )}
      <div
        style={{
          position: 'fixed',
          top: '10%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1000,
        }}
      >
        {postEntryUpdate && <div className="alert alert-info">{postEntryUpdate}</div>}
      </div>
      <h2>
        خریدار کا بل بنائیں
        {/* Button to generate invoices */}
        <center>
          <button
            className="btn btn-success"
            disabled={!invoicesButtonDisabled}
            onClick={generateInvoices}
          >
            بل بنائیں
          </button>
          <button
            className="mx-5 btn btn-success"
            disabled={!invoicesButtonDisabled || !createDone}
            onClick={postEntryHandler}
          >
            انٹری پوسٹ کر دیں
          </button>
        </center>
        <button disabled={sellButtonDisabled} onClick={addBuyer} className="btn btn-success">
          مکمل کریں
        </button>
        {remainingQuantityMessage}
      </h2>
      <div className="form-group">
        <button
          onClick={() => {
            setBuyerName(suggestName)
          }}
          className="btn btn-primary"
        >
          {suggestName}
        </button>
        <br />
        <label>خریدار کا نام لکھیں</label>
        <input
          type="text"
          className="form-control"
          placeholder=""
          value={buyerName}
          onChange={handleBuyerName}
        />
      </div>
      {buyerName && (
        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <label>
                {location.state.customCropName !== '' ? location.state.customCropName : 'فصل'}{' '}
              </label>
              <select className="form-control" value={crop} onChange={handleCropChange} disabled>
                {cropOptions.map((option) => (
                  <option key={option} value={option}>
                    {option === 'Select Crop'
                      ? 'کوئی ایک چنیں'
                      : option === 'Gandum'
                      ? 'گندم'
                      : option === 'Kapaas'
                      ? 'کپاس'
                      : option === 'Sarson'
                      ? 'سرسوں'
                      : option === 'Mirch'
                      ? 'مرچ'
                      : option === 'Moonji'
                      ? 'مونجھی'
                      : option === 'Deegar'
                      ? location.state.crop
                      : location.state.crop}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label>وزن (کلو گرام) میں بتائیں</label>
              <input
                disabled={location.state?.source === 'Stock' ? true : false}
                type="text"
                className="form-control"
                placeholder="Enter quantity"
                value={quantity}
                onChange={handleQuantityChange}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label>ریٹ (فی من)</label>
              <input
                type="text"
                className={`form-control ${rateError ? 'is-invalid' : ''}`} // Add Bootstrap's "is-invalid" class on error
                placeholder="Enter rate"
                value={rate}
                onChange={handleRateChange}
              />
              {/* Step 3: Display validation message */}
              {rateError && <div className="invalid-feedback">{rateError}</div>}
            </div>
          </div>
        </div>
      )}
      {buyerName && crop !== 'Select Crop' && quantity && rate && (
        <div className="form-group">
          <label>اخراجات</label>
          <div className="d-flex">
            <button className="btn btn-primary" onClick={applyExpensesAuto}>
              خرچے لگائیں
            </button>
            {/* Custom expense input fields */}
            <input
              type="text"
              className="form-control ml-2"
              placeholder="خرچے کا نام"
              value={customExpenseName}
              onChange={(e) => setCustomExpenseName(e.target.value)}
            />
            <input
              type="text"
              className="form-control ml-2"
              placeholder="خرچے کی رقم"
              value={customExpenseFormula}
              onChange={(e) => setCustomExpenseFormula(e.target.value)}
            />
            <button className="btn btn-success" onClick={addCustomExpense}>
              اضافہ کریں
            </button>
          </div>
          <table className="table mt-2">
            <thead>
              <tr>
                <th>Expense</th>
                <th>Formula</th>
                <th>Amount (Rs)</th>
                <th>Action</th>
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
                    <div className="d-flex">
                      <input
                        type="text"
                        className="form-control mr-2"
                        value={expenseFormulas[expense]}
                        onChange={(e) => handleFormulaChange(expense, e.target.value)}
                        placeholder={`${expenseFormulas[expense]}`}
                      />
                      {(expense === 'Mazduri' ||
                        expense === 'Mazduri Bori' ||
                        expense === 'Mazduri Tor') && (
                        <input
                          type="text"
                          className="form-control"
                          value={
                            crop === 'Kapaas'
                              ? quantity / 40
                              : expense === 'Mazduri Bori'
                              ? mazduriBoriItems
                              : expense === 'Mazduri Tor'
                              ? mazduriTorItems
                              : numberOfItems
                          }
                          onChange={(e) => {
                            if (expense === 'Mazduri Bori') {
                              setMazduriBoriItems(e.target.value)
                            } else if (expense === 'Mazduri Tor') {
                              setMazduriTorItems(e.target.value)
                            } else {
                              setNumberOfItems(e.target.value)
                            }
                          }}
                          placeholder="تعداد بتائیں"
                        />
                      )}
                    </div>
                  </td>
                  <td>
                    {expenseAmounts[expense] !== undefined && (
                      <>
                        Rs {Math.round(expenseAmounts[expense]).toLocaleString()}{' '}
                        {/* Display expense amounts in rounded-off format */}
                      </>
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleRemoveExpense(expense)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {buyerName && crop !== 'Select Crop' && quantity && rate && (
        <Print
          customer={buyerName}
          crop={crop}
          quantity={quantity}
          rate={rate}
          mazduriBoriItems={mazduriBoriItems}
          allItems={allItems}
          totalAmount={totalAmount}
          expenseList={expenseList}
          expenseAmounts={expenseAmounts}
          totalExpenses={totalExpenses}
          totalPayableAmount={totalPayableAmount}
        />
      )}

      {/* Display invoices */}
      {invoices.length > 0 && (
        <>
          {invoices.map((invoice, index) => (
            <Print
              key={index}
              customer={invoice.customer}
              crop={invoice.crop}
              quantity={invoice.quantity}
              rate={invoice.rate}
              mazduriBoriItems={invoice.mazduriBoriItems}
              allItems={invoice.allItems}
              totalAmount={invoice.totalAmount}
              expenseList={invoice.expenseList}
              expenseAmounts={invoice.expenseAmounts}
              totalExpenses={invoice.totalExpenses}
              totalPayableAmount={invoice.totalPayableAmount}
            />
          ))}
        </>
      )}
    </div>
  )
}

export default Buyer
