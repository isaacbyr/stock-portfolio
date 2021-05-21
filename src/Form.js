import React from 'react'
import { useGlobalContext } from './context'

const Form = () => {
  const { ticker, setTicker, setSubmit, submit } = useGlobalContext()

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmit(!submit)
  }

  return (
    <section className='main-container'>
      <h2 className='header'>Stock Portfolio Builder</h2>
      <form onSubmit={handleSubmit} className='form-control-input'>
        <input
          type='text'
          name='stock'
          id='stock'
          placeholder='Enter Ticker'
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
        />
        <button type='submit' className='btn-submit'>
          SEARCH
        </button>
      </form>
    </section>
  )
}

export default Form
