import React from 'react'
import Navbar from '../../components/navbar/Navbar';
import Sidebar from "../../components/sidebar/NewSidebar";
import ExpenceForm from '../../ExpenceForm';


const ExpenseFrm = () => {
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
                <ExpenceForm />
            </div>

        </div>
    </div>
    )
}

export default ExpenseFrm