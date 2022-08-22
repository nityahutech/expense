import { Layout, Menu } from 'antd';
import React from 'react';
import './newSlidebar.css';
import { useNavigate } from "react-router-dom";
const { Sider } = Layout;

function getItem(label, key, icon, children = null, type = null) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const items = [

    getItem('Dashboard', '1',
        <img
            src="/logo/Dashboard.png" alt='hello'
            className="Dash"

        />
    ),
    getItem('Expense', 'sub1',
        <img
            src="/logo/Expense.png" alt='hello'
            className="Dash"
        />
        , [

            getItem('Add Expense', '5',
                <img
                    src="/logo/dot.png" alt='hello'
                    className="dot"
                />
            ),
            getItem('Expense List', '6',
                <img
                    src="/logo/dot.png" alt='hello'
                    className="dot"
                />),
        ]),
];


const NewSidebar = () => {

    const history = useNavigate()
    const onClick = (e) => {
        let pathkey = e.key
        switch (pathkey) {
            case "5":
                // window.location.href="/ExpenseFrm"
                history("/Expense/AddExpense")
                break;
            case "6":
                // window.location.href = "/Home"
                history("/Expense/ExpenseList")
                break;
            case "1":
                // window.location.href = "/DashBoard"
                history("/DashBoard")
                break;
        }
        console.log('click ', e.key);
    };

    return (<Layout className='sidelayout'>
        <Sider
            breakpoint="lg"
            style={{ backgroundColor: '#05445E' }}
            collapsedWidth="0"
            onBreakpoint={(broken) => {
                console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
                console.log(collapsed, type);
            }}

        >
            <div className='sidebar'>
                <div className='sidebarTittle'>

                    <img style={{

                        background: '#05445E'

                    }} src="/logo/logo_1.png" alt='hello' />

                </div>

                <Menu
                    onClick={onClick}
                    style={{
                        width: '100%',

                    }}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    items={items}
                />

            </div>
        </Sider>
    </Layout>)
}

export default NewSidebar;