import './App.css'
import React, { useState, useEffect } from 'react'
import StockItems from './StockItems'
import Home from './Home'
import { Switch, Route } from 'react-router-dom'

function App() {
  return (
    <Switch>
      <Route>
        <Home path='/' exact />
      </Route>
    </Switch>
  )
}

export default App
