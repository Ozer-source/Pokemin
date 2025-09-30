import { useState } from 'react'
import '../App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// import Home from './Pages/home'
import List from '../Pages/list'
import Details from '../Pages/detail'

function Home() {

  return (
    <>
      <h1>Home</h1>
        <a href="/List">List</a><br />
        <a href="/Details/1">Details</a>
    </>
  )
}

export default Home
