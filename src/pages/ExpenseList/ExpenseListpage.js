import React from 'react'
import Navbar from '../../components/navbar/Navbar';
import Sidebar from "../../components/sidebar/NewSidebar";
import Expenselist from "../../components/Expenselist";
import "../home/home.css";


const ExpenseListpage = () => {
    return (
        <div className="home">

        <div className="sidecontainer">

            <Sidebar />
        </div>

        <div className="homeContainer">
            <div className="table" >
                <Navbar />
            </div>

            <div className="tables">
            <Expenselist />
            </div>

        </div>
    </div>
    )
}

export default ExpenseListpage