import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './Home'
import EditTask from './EditTask'

function App() {
  
  return (
    <Routes>
      <Route path='/' element ={<Home/>} />
      <Route path='/edit/:id' element={<EditTask/>} />
    </Routes>
  )
}

export default App
