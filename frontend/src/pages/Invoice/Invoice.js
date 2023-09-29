import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link, useLocation } from 'react-router-dom'
import Print from './Print'
import { useContext } from 'react'
import contextCreator from '../context/contextCreator'

function Invoice() {
  const [createDone, setCreateDone] = useState(true)
  const context = useContext(contextCreator)
  const { createOnlySeller, searchAccount } = context
  const [suggestName, setSuggestName] = useState('')
  const [postEntryUpdate, setPostEntryUpdate] = useState('')
  const location = useLocation()
  const [mazduriBoriItems, setMazduriBoriItems] = useState('')
  const [mazduriTorItems, setMazduriTorItems] = useState('')
  const [numberOfItems, setNumberOfItems] = useState('')
  const [quantityError, setQuantityError] = useState('')
  const [rateError, setRateError] = useState('')
  const [landlordName, setLandlordName] = useState('')
  const validCrops = ['Gandum', 'Kapaas', 'Sarson', 'Mirch', 'Moonji']

  const initialCrop = location.state?.crop
  const defaultCrop = validCrops.includes(initialCrop) ? initialCrop : 'Deegar'

  const [crop, setCrop] = useState(location.state ? defaultCrop : 'Select Crop')

  // Custom expense input fields state
  const [customExpenseName, setCustomExpenseName] = useState('')
  const [customExpenseFormula, setCustomExpenseFormula] = useState('')
  const [customExpenseAmount, setCustomExpenseAmount] = useState(0)

  const [quantity, setQuantity] = useState(location.state?.quantity ? location.state.quantity : '')
  const [rate, setRate] = useState('')
  const [expenseList, setExpenseList] = useState([])
  const [customCropName, setCustomCropName] = useState(defaultCrop === 'Deegar' ? initialCrop : '')
  const [expenseFormulas, setExpenseFormulas] = useState({
    // Calculate the default Comission formula based on the initial crop value
    Comission: (() => {
      switch (crop) {
        case 'Gandum':
        case 'Kapaas':
          return '0.01'
        case 'Sarson':
          return '0.025'
        case 'Mirch':
          return '0.05'
        case 'Moonji':
        case 'Deegar':
          return '0.03'
        default:
          return '0.01' // Default formula for other crops
      }
    })(),
    Mazduri: '0',
    Brokery: '0.001',
    Accountant: '0.007',
    'Mazduri Bori': '20',
    'Mazduri Tor': '12',
  })
  const [expenseAmounts, setExpenseAmounts] = useState({})
  const [totalAmount, setTotalAmount] = useState(0)
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

  //Other stuff
  let allItems = ''
  if (mazduriBoriItems) {
    allItems = `(${mazduriBoriItems} مکمل بوری )`
    if (mazduriTorItems) {
      allItems = allItems + ' (' + mazduriTorItems + ' ادھوری بوری)'
    }
  } else {
    allItems = `${numberOfItems} items`
  }
  //Other stuff END

  // Function to calculate the "Mazduri" formula based on the selected crop
  const calculateMazduriFormula = (selectedCrop) => {
    switch (selectedCrop) {
      case 'Kapaas':
        return '17'
      case 'Mirch':
        return '2'
      case 'Moonji':
        return '15'
      default:
        return '17' // Default formula for other crops
    }
  }

  useEffect(() => {
    // Calculate the total amount in rupees based on Quantity (in kgs) and Rate.
    const totalAmountInRupees = (quantity / 40) * rate
    setTotalAmount(totalAmountInRupees)

    // Calculate the amount for each expense based on the formula and update the state.
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
    crop,
    expenseFormulas,
    expenseList,
    quantity,
    rate,
    numberOfItems,
    mazduriBoriItems,
    mazduriTorItems,
  ])

  const cropOptions = ['Select Crop', 'Gandum', 'Kapaas', 'Sarson', 'Mirch', 'Moonji', 'Deegar']
  const expenseOptions = ['Apply Expenses', 'Comission', 'Mazduri', 'Brokery', 'Accountant']

  const handleLanslordName = async (e) => {
    let name = capitalizeFirstLetter(e.target.value)
    setLandlordName(name)
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

  const handleCropChange = (e) => {
    const selectedCrop = e.target.value
    setCrop(selectedCrop)

    // If the selected crop is 'Deegar', reset the custom crop name input field
    if (selectedCrop === 'Deegar') {
      setCustomCropName('')
    }
  }

  const handleQuantityChange = (e) => {
    const newQuantity = e.target.value
    setQuantity(newQuantity)

    // Step 2: Add validation function
    if (!newQuantity.match(/^\d+(\.\d{1,2})?$/)) {
      setQuantityError('براے مہربانی درست وزن بتائیں۔ جیسا کہ 100 یا 500.1')
    } else {
      setQuantityError('') // Clear the error message
    }
  }

  const handleRateChange = (e) => {
    setRate(e.target.value)
    const newRate = e.target.value
    setRate(newRate)
    // Step 2: Add validation function
    if (!newRate.match(/^\d+(\.\d{1,2})?$/)) {
      setRateError('برائے مہربانی ریٹ کا درست نمبر بتائیں۔ جیسا کہ 100 یا 500')
    } else {
      setRateError('') // Clear the error message
    }
  }

  const handleRemoveExpense = (expense) => {
    const updatedExpenses = expenseList.filter((item) => item !== expense)
    setExpenseList(updatedExpenses)
    // If "Mazduri" is removed, reset the number of items.
    if (expense === 'Mazduri' || expense === 'Mazduri Bori' || expense === 'Mazduri Tor') {
      setNumberOfItems(0)
    }
  }

  const handleFormulaChange = (expense, formula) => {
    setExpenseFormulas({ ...expenseFormulas, [expense]: formula })
  }

  const totalExpenses = Object.values(expenseAmounts).reduce((total, amount) => total + amount, 0)
  const totalPayableAmount = totalAmount - totalExpenses

  // Function to capitalize the first letter of every word
  const capitalizeFirstLetter = (str) => {
    return str
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  // Function to check if all required fields are filled
  const isFormComplete = () => {
    return landlordName.trim() !== '' && crop !== 'Select Crop' && quantity !== '' && rate !== ''
  }

  useEffect(() => {
    // Update the Comission formula based on the selected crop
    let comissionFormula
    switch (crop) {
      case 'Gandum':
      case 'Kapaas':
        comissionFormula = '0.01'
        break
      case 'Sarson':
        comissionFormula = '0.025'
        break
      case 'Mirch':
        comissionFormula = '0.05'
        break
      case 'Moonji':
      case 'Deegar':
        comissionFormula = '0.03'
        break
      default:
        comissionFormula = '0.01' // Default formula for other crops
    }
    const updatedMazduriFormula = calculateMazduriFormula(crop)
    setExpenseFormulas((prevFormulas) => ({
      ...prevFormulas,
      Comission: comissionFormula,
      Mazduri: updatedMazduriFormula,
    }))
  }, [crop])

  //Apply all expenses automatically
  const applyExpensesAuto = () => {
    expenseOptions.forEach((expense) => {
      if (expense !== 'Apply Expenses') {
        let newExpense = expense
        if (expense === 'Mazduri') {
          if (crop === 'Gandum' || crop === 'Sarson' || crop === 'Deegar') {
            setExpenseList((prevExpenseList) => [...prevExpenseList, 'Mazduri Bori'])
            setExpenseList((prevExpenseList) => [...prevExpenseList, 'Mazduri Tor'])
          } else if (crop === 'Kapaas' || crop === 'Mirch' || crop === 'Moonji') {
            setExpenseList((prevExpenseList) => [...prevExpenseList, 'Mazduri'])
          }
        } else {
          setExpenseList((prevExpenseList) => [...prevExpenseList, newExpense])
        }
      }
    })
  }

  const postEntryHandler = async () => {
    try {
      setPostEntryUpdate('انٹری کی جا رہی ہے۔ برائے مہربانی انتظار فرمائیں')
      setCreateDone(false)
      const response = await createOnlySeller(
        landlordName,
        crop === 'Deegar' ? customCropName : crop, // Conditionally set crop here
        quantity,
        rate,
        mazduriBoriItems,
        allItems,
        totalAmount,
        expenseList,
        expenseAmounts,
        totalExpenses,
        totalPayableAmount,
      )
      setCreateDone(true)
      if (response.success) {
        setPostEntryUpdate(response.message)
      } else {
        setPostEntryUpdate(response.error)
      }
    } catch (error) {
      setPostEntryUpdate(error.message)
    }
  }

  const handleCustomCropName = (e) => {
    setCustomCropName(e.target.value)
  }

  return (
    <div className="container mt-4">
      {location.state?.source === 'Stock' && (
        <Link className="btn btn-primary" to="/stock/inout">
          اسٹاک والے پیج پر واپس جائیں۔
        </Link>
      )}
      {!location.state?.source && (
        <Link className="btn btn-primary" to="/dashboard">
          ڈیش بورڈ
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
        زمیندار کا بل بنائیں
        <center>
          {location.state?.crop && (
            <button
              disabled={!createDone ? true : false}
              onClick={postEntryHandler}
              className={`btn btn-success ${!isFormComplete() ? 'disabled' : ''}`}
            >
              انٹری پوسٹ کر دیں
            </button>
          )}
          {!location.state?.crop && (
            <Link
              className={`btn btn-success ${!isFormComplete() ? 'disabled' : ''}`}
              to="/buyer"
              state={{
                source: 'Landlord',
                landlordName,
                crop: crop === 'Deegar' ? customCropName : crop,
                customCropName,
                quantity,
                rate,
                expenseList,
                expenseFormulas,
                totalAmount,
                expenseAmounts,
                totalExpenses,
                totalPayableAmount,
                mazduriBoriItems,
                mazduriTorItems,
                numberOfItems,
                allItems,
              }}
            >
              بیچ دیں
            </Link>
          )}
        </center>
      </h2>
      <div className="form-group">
        <button
          onClick={() => {
            setLandlordName(suggestName)
          }}
          className="btn btn-primary"
        >
          {suggestName}
        </button>
        <br />
        <label>زمیندار کا نام لکھیں</label>
        <input
          type="text"
          className="form-control"
          placeholder=""
          value={landlordName}
          onChange={handleLanslordName}
        />
      </div>
      {landlordName && (
        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <label>فصل کا انتخاب کریں</label>
              <select
                disabled={location.state?.crop ? true : false}
                className="form-control"
                value={crop}
                onChange={handleCropChange}
              >
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
                      ? 'دیگر'
                      : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {crop === 'Deegar' && (
            <div className="col-md-4">
              <div className="form-group">
                <label>نام فصل درج کریں</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="نام فصل درج کریں"
                  value={customCropName}
                  onChange={handleCustomCropName}
                />
              </div>
            </div>
          )}
          <div className="col-md-4">
            <div className="form-group">
              <label>وزن (کلو گرام) میں بتائیں</label>
              <input
                type="text"
                className={`form-control ${quantityError ? 'is-invalid' : ''}`} // Add Bootstrap's "is-invalid" class on error
                placeholder="Enter quantity"
                value={quantity}
                onChange={handleQuantityChange}
              />
              {/* Step 3: Display validation message */}
              {quantityError && <div className="invalid-feedback">{quantityError}</div>}
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
      {landlordName && crop !== 'Select Crop' && quantity && rate && (
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
                <th>خرچے کا نام</th>
                <th>فارمولا</th>
                <th>قیمت</th>
                <th></th>
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
                      ? 'مکمل بوریاں'
                      : expense === 'Mazduri Tor'
                      ? 'ادھوری بوریاں'
                      : expense === 'Brokery'
                      ? 'دلالی'
                      : expense === 'Accountant'
                      ? 'منشیانہ'
                      : expense}
                  </td>
                  <td>
                    <div className="d-flex">
                      <input
                        type="text"
                        className="form-control mr-2"
                        value={expenseFormulas[expense]}
                        onChange={(e) => handleFormulaChange(expense, e.target.value)}
                        placeholder={`Enter ${
                          (expense === 'Mazduri' ||
                            expense === 'Mazduri Bori' ||
                            expense === 'Mazduri Tor') &&
                          crop !== 'Select Crop'
                            ? 'Formula Value'
                            : 'Integer'
                        }`}
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
                      ختم کریں
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {landlordName && crop !== 'Select Crop' && quantity && rate && (
        <>
          <Print
            type="seller"
            customer={landlordName}
            crop={crop === 'Deegar' ? customCropName : crop}
            quantity={quantity}
            rate={rate}
            mazduriBoriItems={mazduriBoriItems === '' ? 0 : mazduriBoriItems}
            allItems={allItems}
            totalAmount={totalAmount}
            expenseList={expenseList}
            expenseAmounts={expenseAmounts}
            totalExpenses={totalExpenses}
            totalPayableAmount={totalPayableAmount}
          />
        </>
      )}
    </div>
  )
}

export default Invoice
