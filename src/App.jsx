import { useState } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Login from './views/Login'
import Dashboard from './views/Dashboard'
import Images from './views/Images'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter> 
          <Routes>
            <Route path="/" element= {<Login/>}/>
            <Route path="/dashboard" element= {<Dashboard/>}/>
            <Route path="/images" element= {<Images/>}/>
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
