import React from 'react'
import LoginPage from './components/LoginPage'
import ExpenseList from "./Expenselist";
import "./App.css";

function App() {
  return (
    <div>
      <LoginPage></LoginPage>
      <ExpenseList />
    </div>
  )
  //return <ExpenseList />;
}

export default App