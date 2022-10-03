import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Dropdown, Menu, Space, Button } from "antd";
// import dropDownimg from "../../../public/logo/dropdown.svg"
import dropDownimg from "../../assets/dropdown.svg";
import logoutsvgrepocom from "../../assets/logoutsvgrepocom.svg";
import abstractuserflat4 from "../../assets/abstractuserflat4.svg";
import { useAuth } from "../../contexts/AuthContext";
import "./navbar.css";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import ExpenseBreadCrumb from "../ExpenseBreadCrumb";
import AttendanceContext from "../../contexts/AttendanceContext";
import moment from "moment";
import WebClock from "./WebClock";

const start = new Date().getTime();

// ---------------------------------------------------------------------

const Navbar = () => {
  const [size, setSize] = useState("large");

  const [activePage, setActivePage] = useState("/DashBoard");
  let loc = useLocation();
  const { logout, currentUser } = useAuth();
  const [clockinfo, setClockInfo] = useState({
    id: currentUser.uid,
    name: currentUser.displayName,
    autoStart: false,
    secs: 0
  });


  const isClockRunning = async () => {
    console.log("isClockRunning")
    let res = await AttendanceContext.getStartTime(currentUser.uid);
    console.log(res)
    if (res == undefined) {
      console.log("heyyyyyyyy")
      return false;
    }
    else {
      let offset = moment().subtract(res)
      console.log(offset.toDate());
      const offsetTime = moment(offset, "HH:mm:ss").diff(moment().startOf('day'), 'seconds')
      console.log(offsetTime)
      setClockInfo({
        ...clockinfo,
        autoStart: true,
        secs: offsetTime
      })
      console.log(clockinfo)
      return true;
    }
  }  
  // const offset = isClockRunning().then((num) => {
  //   console.log(stopwatchOffset)
  // });

    
    

  // const runClock = async () => {
  //   let cond = await isClockRunning();
  //   if(cond) {
  //     console.log(true, clockinfo)
  //     return;
  //   }
  //     console.log(false, clockinfo)
  //     return;
  // }

  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <Link
              to="/Profile"
              style={{ color: "#171832", fontWeight: "normal" }}
              rel="noopener noreferrer"
            >
              Admin
            </Link>
          ),
          icon: (
            <img
              src={abstractuserflat4}
              alt="downArrow"
              className="avatarimg"
            />
          ),
        },
        {
          key: "2",
          label: (
            <Link
              to="/"
              onClick={logout}
              style={{ color: "#171832", fontWeight: "normal" }}
              rel="noopener noreferrer"
            >
              Logout
            </Link>
          ),
          icon: (
            <img src={logoutsvgrepocom} alt="downArrow" className="avatarimg" />
          ),
        },
      ]}
    />
  );
  useEffect(() => {
    console.log("BREHHHHHHHHHHHHS")
    isClockRunning();
  }, [clockinfo]);
  
  // useEffect(() => {
  // }, []);
  console.log(clockinfo)
  return (
    <div className="navbar" style={{ background: "white" }}>
      <div className="wrapper">
        {/* --------------------------------stopwatch */}
        <div
          style={{
            cursor: "pointer",
            fontSize: "16px",
            // marginTop:'9px',
            marginRight: "20px",
            // padding: "5px",
            borderRadius: "5px",
            border: "1px solid white",
            // backgroundColor: "#33e9f2",
            color: "white",
            fontWeight: "400",
            width: "auto",
          }}
          className="stopwatch"
        >
          {/* {`${ctime.hrs}:${ctime.min}:${ctime.sec}`} */}
          
        </div><WebClock 
            record = {{...clockinfo}}
          />
        <div className="image">
          <div className="item">
            <img
              src="/logo/logo.png"
              alt="imagh"
              className="avatar"
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>

        <Dropdown overlay={menu}>
          <Space>
            <h1
              style={{ 
                cursor: "pointer", 
                fontSize: "16px", 
                marginTop: "10px" 
              }}
            >
              {" "}Hutech{" "}
            </h1>
            <img
              src={dropDownimg}
              alt="downArrow"
              style={{ cursor: "pointer" }}
            />
          </Space>
        </Dropdown>
      </div>

      <div className="tittle">
        <ExpenseBreadCrumb />
      </div>
    </div>
  );
};

export default Navbar;
