import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
require('dotenv').config()

export const API_URL =
  'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&'
const AppContext = React.createContext()
const AppProvider = ({ children }) => {
  const [ticker, setTicker] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState({
    data: '',
  })
  const [stock, setStock] = useState([])
  const [submit, setSubmit] = useState(false)

  const fetchStock = async (url) => {
    try {
      setIsLoading(true)
      const response = await fetch(url)
      var data = await response.json()
      data = data['Global Quote']
      setData({ data })
      if (data) {
        setIsLoading(false)
        setStock([...stock, data])
        console.log(stock)
        const newStock = {
          symbol: data['01. symbol'],
          open: data['02. open'],
          high: data['03. high'],
          low: data['04. low'],
          price: data['05. price'],
          volume: data['06. volume'],
          change: data['10. change percent'],
        }
        axios.post('http://localhost:3001/newstock', newStock)
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchStock(
      `${API_URL}symbol=${ticker}&apikey=${process.env.REACT_APP_API_KEY}`
    )
  }, [submit])

  return (
    <AppContext.Provider
      value={{
        isLoading,
        stock,
        setTicker,
        setSubmit,
        submit,
        ticker,
        setIsLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
