import React, { useState, useEffect } from 'react'
import 'antd/dist/antd.css';
import { Dropdown, Menu, Space,Button } from 'antd';
// import dropDownimg from "../../../public/logo/dropdown.svg"
import dropDownimg from "../../assets/dropdown.svg"
import logoutsvgrepocom from "../../assets/logoutsvgrepocom.svg"
import abstractuserflat4 from "../../assets/abstractuserflat4.svg"
import './navbar.css';
import { useAuth } from "../../contexts/AuthContext"
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ExpenseBreadCrumb from "../ExpenseBreadCrumb";



const Navbar = () => {

    const [size, setSize] = useState('large');

    const [activePage, setActivePage] = useState("/DashBoard")
    let loc = useLocation()
    const { currentUser, logout } = useAuth()


    const menu = (
        <Menu
            items={[
                {
                    key: '1',
                    label: (
                         <Link to="/Profile"     style={{ color: "#171832", fontWeight: 'normal' }} rel="noopener noreferrer" >
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

    useEffect(() => {
        console.log(currentUser);
        setActivePage(loc.pathname);
    }, [loc])

    let time = new Date().toLocaleTimeString();

    const [ctime, setCtime] = useState(time);

    const UpdateTime = () => {
        time = new Date().toLocaleTimeString();
        setCtime(time);
    }


    return (
        <div className='navbar' style={{ background: 'white' }} >
            <div className='wrapper' >
                <div className='image' >
                    <h1 style={{
                        cursor:'pointer', 
                        fontSize: '16px',
                        marginTop:'9px',
                        marginRight:'20px',
                        padding:'5px',
                        border:'1px solid black',
                        backgroundColor:'#05445E',
                        color:'white',
                        fontWeight:'400',
                        width:'auto',   
                    }} 
                    >
                    {ctime}
                    </h1>
                    <Button 
                        style={{
                                backgroundColor:'#05445E', 
                                color:'white'
                               }} 
                        size={size}
                        onClick= {UpdateTime}    
                    >
                        
                        Clock In
                    </Button>
                    {/* <img
                        src="/logo/bell.png" alt='imh'
                        className="bell"
                    /> */}
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
         
            <div className='tittle'>
                <ExpenseBreadCrumb/>
            </div>
        </div>

    )
}

export default Navbar