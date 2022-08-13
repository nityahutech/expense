import React,{useState,useEffect} from 'react'
import 'antd/dist/antd.css';
import { Dropdown, Menu, Space,  } from 'antd';
// import dropDownimg from "../../../public/logo/dropdown.svg"
import dropDownimg from "../../assets/dropdown.svg"
import logoutsvgrepocom from "../../assets/logoutsvgrepocom.svg"
import abstractuserflat4 from "../../assets/abstractuserflat4.svg"
import './navbar.css';
import { useLocation } from 'react-router-dom';


const menu = (
    <Menu
        items={[
            {
                key: '1',
                label: (
                    <link target="_blank" style={{ color: "#171832", fontWeight: 'normal' }} rel="noopener noreferrer" >
                        Admin
                    </link>
                ),
                icon: <img src={abstractuserflat4} alt="downArrow" className="avatarimg" />,

            },
            {
                key: '2',
                label: (
                    <link target="_blank" style={{ color: "#171832", fontWeight: 'normal' }} rel="noopener noreferrer" >
                        Logout
                    </link>
                ),
                icon: <img src={logoutsvgrepocom} alt="downArrow" className="avatarimg" />,
            },
        ]}
    />
);

const Navbar = () => {
    const [activePage, setActivePage] = useState("/DashBoard")
    let loc=useLocation()

    useEffect(() => {
    setActivePage(loc.pathname);
    }, [loc])
    

    return (
        <div className='navbar'>
            <div className='wrapper' >
                
                <div className='image' >

                    <img
                        src="logo/bell.png"
                        className="bell"
                    />

                    <div className="item">
                        <img
                            src="logo/logo.png"
                            className="avatar"
                        />
                    </div>
                </div>

                <Dropdown overlay={menu} >
                   
                        <Space>
                            Hutech
                  
                            <img src={dropDownimg} alt="downArrow" />
                        </Space>
                
                </Dropdown>
                
            </div>

            <hr className='line' width="95%" color="#F4F4F4" height="1" padding-left='20' />

            <div className='tittle'>
                {
                    activePage=='/DashBoard'
                    ?<h4> <b>Dashboard </b> </h4>
                    :<h4> <b>Expense </b>/Add Expense </h4>
                    
                }
                               
                
            </div>
        </div>





    )
}

export default Navbar