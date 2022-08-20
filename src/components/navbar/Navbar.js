import React, { useState, useEffect } from 'react'
import 'antd/dist/antd.css';
import { Dropdown, Menu, Space } from 'antd';
// import dropDownimg from "../../../public/logo/dropdown.svg"
import dropDownimg from "../../assets/dropdown.svg"
import logoutsvgrepocom from "../../assets/logoutsvgrepocom.svg"
import abstractuserflat4 from "../../assets/abstractuserflat4.svg"
import './navbar.css';
import { logout } from "../../contexts/AuthContext"
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ExpenseBreadCrumb from "../ExpenseBreadCrumb";




const menu = (
    <Menu
        items={[
            {
                key: '1',
                label: (
                    <Link to target="_blank" style={{ color: "#171832", fontWeight: 'normal' }} rel="noopener noreferrer" >
                        Admin
                    </Link>
                ),
                icon: <img src={abstractuserflat4} alt="downArrow" className="avatarimg" />

            },
            {
                key: '2',
                label: (
                    <Link to="/" onClick={logout} style={{ color: "#171832", fontWeight: 'normal' }} rel="noopener noreferrer" >
                        Logout
                    </Link>
                ),
                icon: <img src={logoutsvgrepocom} alt="downArrow" className="avatarimg" />
            }
        ]}
    />
);

const Navbar = () => {
    const [activePage, setActivePage] = useState("/DashBoard")
    let loc = useLocation()

    useEffect(() => {
        setActivePage(loc.pathname);
    }, [loc])


    return (
        <div className='navbar' style={{ background: 'white' }} >
            <div className='wrapper' >

                <div className='image' >

                    <img
                        src="/logo/bell.png" alt='imh'
                        className="bell"
                    />

                    <div className="item">
                        <img
                            src="/logo/logo.png" alt='imagh'
                            className="avatar"
                            style={{cursor:'pointer'}}
                            
                        />
                    </div>
                </div>

                <Dropdown overlay={menu} >

                    <Space>
                       <h1 style={{cursor:'pointer', fontSize: '16px',marginTop:'10px'}} >  Hutech </h1>

                        <img src={dropDownimg} alt="downArrow"  style={{cursor:'pointer'}} />
                       
                    </Space>

                </Dropdown>

            </div>

            {/* <hr className='line' width="95%" color="#F4F4F4" height="1" padding-left='20' /> */}

            <div className='tittle'>

                <ExpenseBreadCrumb/>
                {/* {
                    activePage === '/DashBoard'
                        ? <h4> <b>Dashboard </b> </h4>
                        : <h4> <b>Expense </b> </h4>

                } */}

            </div>
        </div>

    )
}

export default Navbar
