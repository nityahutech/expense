import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Dropdown, Menu, Space, Button } from "antd";
// import dropDownimg from "../../../public/logo/dropdown.svg"
import dropDownimg from "../../assets/dropdown.svg";
import logoutsvgrepocom from "../../assets/logoutsvgrepocom.svg";
import abstractuserflat4 from "../../assets/abstractuserflat4.svg";
import "./navbar.css";
import { useAuth } from "../../contexts/AuthContext";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import ExpenseBreadCrumb from "../ExpenseBreadCrumb";
import { useStopwatch } from "react-timer-hook";
import AttendanceContext from "../../contexts/AttendanceContext";
import moment from "moment";

const start = new Date().getTime();

// ---------------------------------------------------------------------

const Navbar = () => {
  const [size, setSize] = useState("large");

  const [activePage, setActivePage] = useState("/DashBoard");
  let loc = useLocation();
  const { currentUser, logout } = useAuth();

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
  
  const { seconds, minutes, hours, isRunning, start, pause, reset } = useStopwatch({
    autoStart: false,
  });
  // const [clockIn, setClockIn] = useState(false);
  const [mouseState, setMouseState] = useState(false);
  const clockTime =  isRunning ? `${hours}:${minutes}:${seconds}`: "";
  const buttonStyle = !isRunning ? {
          padding: "1px",
          background: "#ff3300",
          color: "white",
          // display: "inline-block",
          width: "200px",
          borderRadius: "5px",
          border:"1px solid white",
        } : {
          padding: "1px",
          color: "white",
          // display: "inline-block",
          width: "200px",
          borderRadius: "5px",
          border:"1px solid white",
        };

 const [buttonText, setButtonText] = useState(!isRunning ? "Web Clock In" : "");

  
  const onMouseEnter = (event) => {
    if(isRunning){
      event.target.style.background = "#ff3300";
      event.target.style.display = "inline-block";
      setButtonText("Web Clock Out ");
      clockTime = "";
    }
    else {
      event.target.style.background = "#70BDF0";
    }
  };

  const onMouseLeave = (event) => {
    if(isRunning){
      event.target.style.background = "#ff3300";
      setButtonText("");
    }
    else {
      setButtonText("Web Clock In");
      event.target.style.background = "#33F2A3";
    }
  };

  const setClockState = () => {
      // setClockIn(true);
      let clickedDate = {
        empId: currentUser.uid,
        date: moment().format("DD-MM-YYYY"),
        clockIn: moment().format("hh:mm:ss"),
        clockOut: null
      } 
      console.log(clickedDate)
      start();
      AttendanceContext.addClockData(clickedDate)
  };

  const webclock = async () => {
    let rec = await AttendanceContext.getStartTime(currentUser.uid);
    console.log(rec)
  }

  const stopClockState = async () => {
    // setClockIn(false);
    pause();
    let clickedDate = {
      clockOut: moment().format("hh:mm:ss"),
      duration: clockTime
    }
    // AttendanceContext.updateClockData(clickedDate, currentUser.uid)
    let rec = await AttendanceContext.updateClockData(currentUser.uid, clickedDate);
    // console.log(rec.data())
    console.log(isRunning);
    console.log(clickedDate.toString().substring(16, 25));
    console.log("");
    reset("0:0:0:0", false);
  };

  const handleClock = () => {
    if (isRunning) {
      stopClockState();
    }
    else {
      setClockState();
    }
  }
  
  useEffect(() => {
    webclock();
  }, []);

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
          <button
            style={buttonStyle}
          onClick={handleClock}
        onMouseLeave={onMouseLeave}
        onMouseEnter={onMouseEnter}
      >
        {buttonText}
        <div>{clockTime}</div>
      </button>
        </div>

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
