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
  // ----------------------------------------full code for web-clock in
  const { seconds, minutes, hours, days, start, pause, reset } = useStopwatch({
    autoStart: true,
    value:{minutes:4}
  });
  const [clockIn, setClocikIn] = useState(true);
  const [mouseState, setMouseState] = useState(false);

  const setClockState = () => {
    setClocikIn(false);
    let clickedDate = new Date();
    // localStorage.setItem(
    //   "clicked-tiime",
    //   clickedDate.toString().substring(16, 25)
    // );
    localStorage.setItem(
      "clicked-time",
      JSON.stringify({date:new Date().getTime(), login_time:clickedDate.toString().substring(16, 25), logout_time:null})
    );
    console.log(localStorage.getItem);
  };
  const setClockOutState = () => {
    setClocikIn(true);
    setMouseState(false);
  };
  const onMouseEnter = (event) => {
    //event.target.style.background = "red";
    setMouseState(true);
  };
  const onMouseLeave = (event) => {
    //event.target.style.background = "blue";
    setMouseState(false);
  };
  console.log(mouseState);
  const pushContent = [];
  if (mouseState == true) {
    pushContent.push(
      <div
        style={{ display: "inline-block" }}
        onMouseLeave={onMouseLeave}
        onMouseEnter={onMouseEnter}
        onClick={start}
        onClick={reset}
      >
        <button
          style={{
            padding: "1px",
            background: "#cc3e25",
            color: "white",
            display: "inline-block",
            width: "200px",
            cursor:"pionter",
            border:"1px solid #cc3e25",
            borderRadius:"5px"
          }}
          onClick={setClockOutState}
        >
          WEB CLOCK OUT
        </button>
      </div>
    );
  } else if (clockIn) {
    pushContent.push(
      <button
        style={{
          padding: "1px",
          background: "#33f2a3",
          color: "white",
          display: "inline-block",
          width: "200px",
          borderRadius: "5px",
          cursor:"pointer",
          border:"1px solid #33f2a3"
        }}
        onClick={setClockState}
      >
        Web Clock In
      </button>
    );
  } else if (clockIn == false) {
    pushContent.push(
      <div
        style={{
          padding: "1px",
          background: "#70BDF0",
          display: "inline-block",
          width: "200px",
          //   height: "100px",
          display: "flex",
          justifyContent: "center",
          borderRadius: "5px",
          cursor:"pointer",
          border:"1px solid #70BDF0",
        }}
        onMouseLeave={onMouseLeave}
        onMouseEnter={onMouseEnter}
        onClick={pause}
      >
        <div>
          <div>
            <span>Clocked In </span>
            <span></span>
            <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:
            <span>{seconds}</span>
            <span></span>
          </div>
          {/* <h4>Clocked in</h4>
          <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>: */}
          {/* <span>{seconds}</span>{" "} */}
        </div>
      </div>
    );
  } else {
    pushContent.push(
      <button
        style={{
          color: "white",
          backgroundColor: "DodgerBlue",
          padding: "1px",
          fontFamily: "Arial",
          borderRadius: "5px",
          cursor:"pointer",
          border:"1px solid white"
        }}
        onClick={setClockState}
      >
        Web Clock Out
      </button>
    );
  }

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
            backgroundColor: "#33e9f2",
            color: "white",
            fontWeight: "400",
            width: "auto",
          }}
          className="stopwatch"
        >
          {/* {`${ctime.hrs}:${ctime.min}:${ctime.sec}`} */}
          {pushContent}
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
