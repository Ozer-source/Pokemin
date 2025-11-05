import { useState } from 'react';
import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';

import Home from './Pages/home';
import List from './Pages/list';
import Details from './Pages/detail';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/List" element={<List />} />
        <Route path="/Details/:id" element={<Details />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
