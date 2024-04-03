import React from 'react'
import ReactDOM from 'react-dom/client'
import HomeLayout from '../layout/Home.layout'
import ChequeDeposit from '../components/ChequeDeposit'
import Deposit from '../components/Deposit'
import Register from '../components/Register'
import Withdraw from '../components/Withdraw'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HomeLayout/>
  </React.StrictMode>,
)
