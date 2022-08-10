import React from 'react'
// import LoginPage from './components/LoginPage'
// import ExpenseList from "./Expenselist";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './components/LoginPage';
import Home from './pages/home/Home';




function App() {
  return (
    <BrowserRouter>


      <Routes>

        <Route path="/" element={<LoginPage />} />
        <Route path="/Home" element={<Home />} />

       
      




      </Routes>


    </BrowserRouter>
  )
  //return <ExpenseList />;
}

export default App