import React, { useState } from 'react'
import context from './contextCreator'
import PropTypes from 'prop-types' // Import PropTypes

export const AllStates = (props) => {
  //Host
  // const host = 'http://localhost:5000'
  const host = 'https://helpful-wetsuit-dove.cyclic.cloud'
  //   const host = ""
  //States
  const [accounts, setAccounts] = useState([])
  const [cashPoints, setCashPoints] = useState([])
  const [dc, setDc] = useState([])
  const [cashEntries, setCashEntries] = useState([])
  const [stock, setStock] = useState([])
  const [stockEntries, setStockEntries] = useState([])

  //Accounts API
  //Create Account
  const createAccount = async (name, mobileNumbers, address, guarranter, idCardNumber, status) => {
    //API Call
    const response = await fetch(`${host}/accounts/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, mobileNumbers, address, guarranter, idCardNumber, status }),
    })
    const json = await response.json()
    return json
  }

  //Search account
  const searchAccount = async (name) => {
    //API Call
    const response = await fetch(`${host}/accounts/search/${name}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const json = await response.json()
    return json
  }

  //Search account
  const searchAccountAll = async (name) => {
    //API Call
    const response = await fetch(`${host}/accounts/searchAll/${name}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const json = await response.json()
    setAccounts(json.accounts)
  }

  //Get All Accounts
  const getAccounts = async (name) => {
    try {
      //API Call
      const response = await fetch(`${host}/accounts/read`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const json = await response.json()
      setAccounts(json)
    } catch (error) {
      //
    }
  }

  //Get All Stock
  const getStocks = async () => {
    try {
      //API Call
      const response = await fetch(`${host}/stock/read`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const json = await response.json()
      if (json.success) {
        setStock(json.cropQuantities)
      }
    } catch (error) {
      //
    }
  }

  //Get All Stock
  const getStockEntries = async (crop) => {
    //API Call
    const response = await fetch(`${host}/stock/entries/${crop}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const json = await response.json()
    setStockEntries(json)
  }

  //Update Account
  const updateAccount = async (
    id,
    name,
    mobileNumbers,
    address,
    guarranter,
    titleChange,
    idCard,
    status,
  ) => {
    //API Call
    const response = await fetch(`${host}/accounts/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        mobileNumbers,
        address,
        guarranter,
        titleChange,
        idCard,
        status,
      }),
    })
    const json = await response.json()
    return json
  }

  //Delete service
  const deleteAccount = async (id) => {
    //API Call
    const response = await fetch(`${host}/accounts/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const json = await response.json()
    return json.success
  }

  //Delete Stock Entry
  const deleteStock = async (id) => {
    //API Call
    const response = await fetch(`${host}/stock/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const json = await response.json()
    return json.success
  }

  //Accounts API END

  //Cash Points API
  //Create Cash Point
  const createCashPoint = async (name, balance) => {
    //API Call
    const response = await fetch(`${host}/cashpoints/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, balance }),
    })
    const json = await response.json()
    return json
  }

  //Search Cash Point
  const searchCashPoint = async (name) => {
    //API Call
    const response = await fetch(`${host}/cashpoints/search/${name}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const json = await response.json()
    return json
  }

  //Search All Cash Points
  const searchCashPointsAll = async (name) => {
    //API Call
    const response = await fetch(`${host}/cashpoints/searchAll/${name}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const json = await response.json()
    setCashPoints(json.cashpoints)
  }

  //Get All Cash Points
  const getCashPoints = async (name) => {
    try {
      //API Call
      const response = await fetch(`${host}/cashpoints/read`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const json = await response.json()
      setCashPoints(json)
    } catch (error) {
      //
    }
  }

  //Update a Cash Point
  const updateCashPoint = async (id, name, balance) => {
    //API Call
    const response = await fetch(`${host}/cashpoints/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, balance }),
    })
    const json = await response.json()
    return json
  }

  //Delete a Cash Point
  const deleteCashPoint = async (id) => {
    //API Call
    const response = await fetch(`${host}/cashpoints/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const json = await response.json()
    return json.success
  }

  //Cash Points API END

  //Create Debit/Credit
  const createDc = async (name, detail, amount, DbCr, selectedDate) => {
    //API Call
    const response = await fetch(`${host}/debitcredit/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, detail, amount, DbCr, selectedDate }),
    })
    const json = await response.json()
    return json
  }

  //Get All Entries of an account
  const getEntries = async (name) => {
    //API Call
    const response = await fetch(`${host}/debitcredit/search/${name}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const json = await response.json()
    setDc(json.dc)
  }

  //Search account for Debit/Credit
  const searchDcAccount = async (name) => {
    //API Call
    const response = await fetch(`${host}/debitcredit/searchSingle/${name}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const json = await response.json()
    return json
  }

  //Update Entry
  const updateEntry = async (id, name, detail, amount, DbCr) => {
    //API Call
    const response = await fetch(`${host}/debitcredit/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, detail, amount, DbCr }),
    })
    const json = await response.json()
    return json
  }

  //Delete Debit/Credit Entry
  const deleteDc = async (id) => {
    //API Call
    const response = await fetch(`${host}/debitcredit/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const json = await response.json()
    return json.success
  }

  //Cash Debit/Credit Create endpoint
  const createCashDc = async (
    cashPoint,
    transactionType,
    amount,
    source,
    customerName,
    description,
    selectedDate,
  ) => {
    //API Call
    const response = await fetch(`${host}/cashdebitcredit/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cashPoint,
        transactionType,
        amount,
        source,
        customerName,
        description,
        selectedDate,
      }),
    })
    const json = await response.json()
    return json
  }

  //Cash Debit/Credit read endpoint
  //Get All Cash Points
  const getCashDCs = async (cashPoint) => {
    //API Call
    const response = await fetch(`${host}/cashdebitcredit/read/${cashPoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const json = await response.json()
    setCashEntries(json)
  }

  //Delete a Cash Debit/Credit Entry
  const deleteCashDC = async (id, cashPoint) => {
    //API Call
    const response = await fetch(`${host}/cashdebitcredit/delete/${id}/${cashPoint}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const json = await response.json()
    return json
  }

  //Stock endpoints start from here
  const getStock = async (crop) => {
    const response = await fetch(`${host}/stock/quantity/${crop}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const json = await response.json()
    return json
  }

  //Get others crops names
  const getOthers = async (crop) => {
    try {
      const response = await fetch(`${host}/stock/getOthers`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const json = await response.json()
      return json
    } catch (error) {
      //
    }
  }

  //Invoice operations start
  //createOnlySeller create operation
  const createOnlySeller = async (
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
  ) => {
    const response = await fetch(`${host}/invoice/createOnlySeller`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
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
      }),
    })
    const json = await response.json()
    return json
  }

  //createBuyerSeller create operation
  const createBuyerSeller = async (allInvoices) => {
    const response = await fetch(`${host}/invoice/createBuyerSeller`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        allInvoices,
      }),
    })
    const json = await response.json()
    return json
  }

  //Create Stock Manual
  const createStockManual = async (crop, inout, quantity, description) => {
    //API Call
    const response = await fetch(`${host}/stock/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ crop, inout, quantity, description }),
    })
    const json = await response.json()
    return json
  }

  //Dashboar API's Start
  //States about Dashboard
  const [dashboardAccounts, setDashboardAccounts] = useState({})
  const [timeline, setTimeLine] = useState([])
  //Get others crops names
  const accountsBlock = async (crop) => {
    try {
      const response = await fetch(`${host}/accounts/accountsBlock`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const json = await response.json()
      setDashboardAccounts(json)
    } catch (error) {
      //
    }
  }

  //Timeline
  const getTimeline = async () => {
    const response = await fetch(`${host}/todaytimeline/read`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const json = await response.json()
    setTimeLine(json)
  }

  return (
    <>
      <context.Provider
        value={{
          accounts,
          cashPoints,
          dc,
          cashEntries,
          stock,
          stockEntries,
          dashboardAccounts,
          timeline,
          createAccount,
          searchAccount,
          createDc,
          searchDcAccount,
          getAccounts,
          searchAccountAll,
          updateAccount,
          deleteAccount,
          getEntries,
          updateEntry,
          deleteDc,
          createCashPoint,
          searchCashPoint,
          getCashPoints,
          searchCashPointsAll,
          updateCashPoint,
          deleteCashPoint,
          createCashDc,
          getCashDCs,
          deleteCashDC,
          getStock,
          getOthers,
          createOnlySeller,
          createBuyerSeller,
          getStocks,
          getStockEntries,
          createStockManual,
          deleteStock,
          accountsBlock,
          getTimeline,
        }}
      >
        {props.children}
      </context.Provider>
    </>
  )
}

// Define propTypes for your component
AllStates.propTypes = {
  children: PropTypes.node.isRequired, // Ensure 'children' is a required node
}

export default AllStates
