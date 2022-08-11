import React from 'react'
import Navbar from '../../components/navbar/Navbar';
import Sidebar from "../../components/sidebar/Sidebar";



const DashBoard = () => {
    return (
        <div className='home'>
        <Sidebar />
        <div className="homeContainer">
            <Navbar />
            <div className="table">
                <div className="tables">
            
              
                </div>
            </div>

        </div>
    </div>
    )
}

export default DashBoard