import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './Pages/home'
import List from './Pages/list'
import Details from './Pages/detail'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/List" element={<List />} />
          <Route path="/Details/:id" element={<Details />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
