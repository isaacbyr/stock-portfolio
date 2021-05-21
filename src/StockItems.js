import React, { useEffect, useState } from 'react'
import { useGlobalContext, API_URL } from './context'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { FaTrashAlt } from 'react-icons/fa'

const StockItems = () => {
  const { isLoading, ticker, setIsLoading } = useGlobalContext()
  const [stocks, setStocks] = useState([])
  const [favourite, setFavourite] = useState(false)

  const handleDelete = () => {
    setStocks([])
    axios.post('http://localhost:3001/deleteall')
  }

  const removeItem = (id) => {
    const newStocks = stocks.filter((stock) => stock._id !== id)
    setStocks(newStocks)
    axios.post(`http://localhost:3001/delete/${id}`)
  }

  useEffect(async () => {
    const response = await fetch('http://localhost:3001/stocks')
    const data = await response.json()
    setStocks(data)
  }, [stocks])

  return (
    <section className='container-fluid px-0'>
      <div className='stock-container'>
        {stocks.map((item) => {
          return (
            <div key={item._id} className='stock-info'>
              <h3>Symbol {item.symbol}</h3>
              <p>Open {item.open}</p>
              <p>Price {item.price}</p>
              <p>High {item.high}</p>
              <p>Volume {item.volume}</p>
              <p>Change % {item.change}</p>
              {/* <button className='btn' onClick={refresh(item['01. symbol'])}>
              Refresh
            </button> */}
              <button
                className='btn-single-clear'
                onClick={() => removeItem(item._id)}
              >
                <FaTrashAlt />
              </button>
            </div>
          )
        })}
      </div>
      <div className='d-flex justify-content-center'>
        {stocks.length >= 1 ? (
          <button className='btn-clear' onClick={handleDelete}>
            Clear All
          </button>
        ) : (
          ''
        )}
      </div>
    </section>
  )
}

export default StockItems
