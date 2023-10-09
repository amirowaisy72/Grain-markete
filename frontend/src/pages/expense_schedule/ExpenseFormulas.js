import React, { useContext, useEffect, useState } from 'react'
import contextCreator from '../context/contextCreator'
import { Table, Alert, Button } from 'react-bootstrap' // Import Bootstrap components
import { Link } from 'react-router-dom'
import { FaBook, FaPencilAlt, FaTrash } from 'react-icons/fa'

const ExpenseFormulas = () => {
  const context = useContext(contextCreator)
  const { getExpenseFormulas, expenses, setExpenses } = context
  const [wait, setWait] = useState(null)
  const [editingFormula, setEditingFormula] = useState(null) // Track which formula is being edited
  const [editingKey, setEditingKey] = useState(null) // Track which formula's specific key element is being edited. This is for objects type formulas
  const [updateEnable, setUpdateEnable] = useState(true)

  useEffect(() => {
    try {
      async function fetchExpenseFormulas() {
        setWait('فارمولا لوڈ ہو رہے ہیں')
        const response = await getExpenseFormulas()
        // Assuming response is a valid object
        // ...
        setWait('')
      }
      fetchExpenseFormulas()
    } catch (error) {
      setWait('Some other problem occurred')
    }
  }, [])

  const handleEditFormula = (formulaKey, key) => {
    // Set the editingFormula state to the key of the formula being edited
    setEditingFormula(formulaKey)
    setEditingKey(key)
  }

  const handleUpdateFormula = (expenseCategory, sideType, cropName, editedValue, key) => {
    //Show Update button
    setUpdateEnable(false)

    // Create a deep copy of the expenses object
    const updatedExpenses = { ...expenses }

    // Update the formula value at the specified location
    //if it is object type Formula, use key to // Traverse through the nested structure to reach the specific property you want to update
    if (key) {
      updatedExpenses[expenseCategory][sideType][cropName].Formula[key] = editedValue
    } else {
      // No need to use key because it is not object type Formula
      updatedExpenses[expenseCategory][sideType][cropName].Formula = editedValue
    }

    // Assuming you have a setExpenses function to update the state
    setExpenses(updatedExpenses) // Ensure to spread the updatedExpenses

    // Clear the editingFormula state
    setEditingFormula(null)
  }

  const renderCropTable = (sideType) => {
    if (!expenses || !expenses.Commission || !expenses.Commission[sideType]) {
      return null
    }

    const cropNames = Object.keys(expenses.Commission[sideType])

    return (
      <Table responsive striped bordered hover key={sideType}>
        <thead>
          <tr>
            <th colSpan={cropNames.length + 1}>{sideType} Side</th>
          </tr>
          <tr>
            <th>Expense Type</th>
            {cropNames.map((cropName) => (
              <th key={cropName}>{cropName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.keys(expenses).map((expenseCategory) => {
            if (
              !expenses[expenseCategory][sideType] ||
              !cropNames.some((cropName) => expenses[expenseCategory][sideType][cropName])
            ) {
              return null // Skip the entire row if data is not available
            }
            return (
              <tr key={expenseCategory}>
                <td>{expenseCategory}</td>
                {cropNames.map((cropName) => {
                  const cropData = expenses[expenseCategory][sideType][cropName]
                  const formulaKey = `${expenseCategory}_${sideType}_${cropName}`
                  if (cropData) {
                    if (cropData.Formula && typeof cropData.Formula === 'object') {
                      return (
                        <td key={cropName}>
                          <div>
                            Formula:
                            <ul>
                              {Object.entries(cropData.Formula).map(([key, value]) => (
                                <li key={key}>
                                  {key}:{' '}
                                  {value ? (
                                    <>
                                      {/* Conditionally render either the formula or an input field */}
                                      {editingFormula === formulaKey && editingKey === key ? (
                                        <div>
                                          <input
                                            type="text"
                                            defaultValue={value}
                                            onBlur={(e) =>
                                              handleUpdateFormula(
                                                expenseCategory,
                                                sideType,
                                                cropName,
                                                e.target.value,
                                                key,
                                              )
                                            }
                                          />
                                        </div>
                                      ) : (
                                        <>
                                          {value}
                                          <FaPencilAlt
                                            className="mx-2 mb-2"
                                            onClick={() => handleEditFormula(formulaKey, key)}
                                          />
                                        </>
                                      )}
                                    </>
                                  ) : (
                                    'N/A'
                                  )}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>Info: {cropData.Info ? cropData.Info : 'N/A'}</div>
                        </td>
                      )
                    } else {
                      return (
                        <td key={cropName}>
                          <div>
                            Formula:{' '}
                            {cropData.Formula ? (
                              <>
                                {/* Conditionally render either the formula or an input field */}
                                {editingFormula === formulaKey ? (
                                  <div>
                                    <input
                                      type="text"
                                      defaultValue={cropData.Formula}
                                      onBlur={(e) =>
                                        handleUpdateFormula(
                                          expenseCategory,
                                          sideType,
                                          cropName,
                                          e.target.value,
                                        )
                                      }
                                    />
                                  </div>
                                ) : (
                                  <>
                                    {cropData.Formula}
                                    <FaPencilAlt
                                      onClick={() => handleEditFormula(formulaKey)}
                                      className="mx-2 mb-2"
                                    />
                                  </>
                                )}
                              </>
                            ) : (
                              'N/A'
                            )}
                          </div>
                          <div>Info: {cropData.Info ? cropData.Info : 'N/A'}</div>
                        </td>
                      )
                    }
                  } else {
                    return <td key={cropName}>N/A</td>
                  }
                })}
              </tr>
            )
          })}
        </tbody>
      </Table>
    )
  }

  return (
    <div>
      <h2>
        Expense Data
        <center>
          <button hidden={updateEnable} className="btn btn-success">
            Update
          </button>
        </center>
      </h2>
      {wait && <Alert variant="info">{wait}</Alert>}
      {expenses !== null ? (
        <>
          {renderCropTable('Seller')}
          {renderCropTable('Buyer')}
        </>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  )
}

export default ExpenseFormulas
