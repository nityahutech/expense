import React from 'react'
import Navbar from '../../components/navbar/Navbar';
import Sidebar from "../../components/sidebar/Sidebar";
import ExpenceForm from '../../ExpenceForm';


const ExpenseFrm = () => {
    return (
        <div className='home'>
        <Sidebar />
        <div className="homeContainer">
            <Navbar />
            <div className="table">
                <div className="tables">
                <ExpenceForm />
              
                </div>
            </div>

        </div>
    </div>
    )
}

export default ExpenseFrm