import React from 'react'

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import 'antd/dist/antd.css';
import { Dropdown, Menu, Space,Divider } from 'antd';
// import dropDownimg from "../../../public/logo/dropdown.svg"
import dropDownimg from "../../assets/dropdown.svg"

import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';



import './navbar.css';

const menu = (
    <Menu
        items={[
            {
                key: '1',
                label: (
                    <a target="_blank" style={{ color: "#171832" }} rel="noopener noreferrer" href="https://www.antgroup.com">
                        Admin
                    </a>


                ),
                icon: <AccountCircleIcon style={{ color: "#171832" }} />,
            },
            {
                key: '2',
                label: (
                    <a target="_blank" style={{ color: "#171832" }} rel="noopener noreferrer" href="https://www.aliyun.com">
                        Logout
                    </a>
                ),
                icon: <LogoutOutlinedIcon style={{ color: "#171832" }} />,

            },


        ]}
    />
);

const Navbar = () => {
    return (
        <div className='navbar'>
            <div className='wrapper' >
                <div className='image' >

                    <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path opacity="0.2" d="M15.6636 12.4276C15.5945 12.3473 15.5267 12.2669 15.4601 12.1894C14.5442 11.1202 13.9901 10.475 13.9901 7.4483C13.9901 5.88134 13.6016 4.59562 12.836 3.63134C12.2715 2.91897 11.5084 2.37857 10.5026 1.9792C10.4896 1.97225 10.4781 1.96313 10.4684 1.95228C10.1067 0.78308 9.11666 0 8.0001 0C6.88354 0 5.89396 0.78308 5.53218 1.95107C5.52253 1.96153 5.51113 1.97036 5.49846 1.97719C3.15128 2.90973 2.01057 4.69888 2.01057 7.4471C2.01057 10.475 1.45729 11.1202 0.540562 12.1882C0.473952 12.2657 0.406092 12.3445 0.336984 12.4264C0.158468 12.6342 0.0453637 12.887 0.0110561 13.1549C-0.0232514 13.4227 0.0226739 13.6945 0.143397 13.9379C0.400264 14.4603 0.947719 14.7845 1.57261 14.7845H14.4322C15.0542 14.7845 15.5979 14.4607 15.8556 13.9408C15.9768 13.6972 16.0232 13.4253 15.9892 13.1571C15.9551 12.8889 15.8422 12.6357 15.6636 12.4276V12.4276ZM8.0001 18C8.60169 17.9995 9.19194 17.8419 9.70823 17.5439C10.2245 17.2459 10.6476 16.8186 10.9326 16.3073C10.9461 16.2828 10.9527 16.2553 10.9519 16.2276C10.9511 16.1999 10.9429 16.1729 10.928 16.1491C10.9132 16.1254 10.8922 16.1058 10.8672 16.0922C10.8422 16.0785 10.814 16.0714 10.7853 16.0714H5.21579C5.18703 16.0713 5.15874 16.0784 5.13366 16.092C5.10859 16.1056 5.08759 16.1252 5.07271 16.149C5.05782 16.1727 5.04957 16.1998 5.04874 16.2275C5.04792 16.2553 5.05455 16.2827 5.06799 16.3073C5.35298 16.8185 5.776 17.2458 6.29221 17.5438C6.80843 17.8418 7.39858 17.9995 8.0001 18Z" fill="#171832" />
                    </svg>

                    <div className="item">
                        <img
                            src="logo/logo.png" alt="image"

                            className="avatar"
                        />
                    </div>
                </div>

                <Dropdown overlay={menu} >
                    <a onClick={(e) => e.preventDefault()}>
                        <Space>

                            Hutech
                            {/* <DownOutlined suffixIcon={<img src={dropDownimg} alt="downArrow" />} /> */}
                            <img src={dropDownimg} alt="downArrow" />


                        </Space>
                    </a>
                </Dropdown>


            </div>

        
       <hr width="95%" color="#F4F4F4" height="1" padding-left='20' />



            <div className='tittle'>
                <p> <b>Dashboard / Expense /</b> Add Expense </p>
            </div>


        </div>





    )
}

export default Navbar