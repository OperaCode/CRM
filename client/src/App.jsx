import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home'
import Landing from './pages/Landing'
import { Route, Routes } from 'react-router-dom'
// import Customers from './pages/Customers'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/dashboard' element={<Home/>}/>
        {/* <Route path='/customers' element={<Customers/>}/> */}
      </Routes>
    </>
  )
}

export default App
