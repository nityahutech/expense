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
  
  const { seconds, minutes, hours, isRunning, start, pause, reset } = useStopwatch({
    autoStart: false,
  });
  // const [clockIn, setClockIn] = useState(false);
  const [mouseState, setMouseState] = useState(false);

  const buttonStyle = !isRunning ? {
          padding: "1px",
          background: "red",
          color: "white",
          display: "inline-block",
          width: "200px",
          borderRadius: "2px",
        } : {
          padding: "1px",
          background: "#05445e",
          color: "white",
          display: "inline-block",
          width: "200px",
        };


 const [buttonText, setButtonText] = useState(!isRunning ? "Web Clock In" : `${hours}:${minutes}:${seconds}`);

  
  const onMouseEnter = (event) => {
    if(isRunning){
      event.target.style.background = "orange";
      setButtonText("Web Clock Out");
    }
    else {
      event.target.style.background = "aqua";
    }
  };

  const onMouseLeave = (event) => {
    if(isRunning){
      event.target.style.background = "#05445e";
      setButtonText(`${hours}:${minutes}:${seconds}`);
    }
    else {
      event.target.style.background = "red";
    }
  };

  const setClockState = () => {
      // setClockIn(true);
      let clickedDate = new Date();
      start();
      console.log(clickedDate.toString().substring(16, 25));
  };

  const stopClockState = () => {
    // setClockIn(false);
    let clickedDate = new Date();
    pause();
    console.log(isRunning);
    console.log(clickedDate.toString().substring(16, 25));
    console.log(`${hours}:${minutes}:${seconds}`);
    reset("0:0:0:0", false);
  };

  const handleClock = () => {
    if (isRunning) {
      stopClockState();
      console.log(isRunning);
    }
    else {
      setClockState();
      console.log(isRunning);
    }
  }
  // ----------------------------------------full code for web-clock in
  // const { seconds, minutes, hours, days, start, pause, reset } = useStopwatch({
  //   autoStart: false,
  // });
  // const [clockIn, setClocikIn] = useState(true);
  // const [mouseState, setMouseState] = useState(false);

  // const setClockState = () => {
  //   setClocikIn(false);
  //   let clickedDate = new Date();
  //   localStorage.setItem(
  //     "clicked-tiime",
  //     clickedDate.toString().substring(16, 25)
  //   );
  //   console.log(localStorage.getItem);
  // };
  // const setClockOutState = () => {
  //   setClocikIn(true);
  //   setMouseState(false);
  // };
  // const onMouseEnter = (event) => {
  //   //event.target.style.background = "red";
  //   setMouseState(true);
  // };
  // const onMouseLeave = (event) => {
  //   //event.target.style.background = "blue";
  //   setMouseState(false);
  // };
  // console.log(mouseState);
  // const pushContent = [];
  // if (mouseState == true) {
  //   pushContent.push(
  //     <div
  //       style={{ display: "inline-block" }}
  //       onMouseLeave={onMouseLeave}
  //       onMouseEnter={onMouseEnter}
  //       onClick={start}
  //       onClick={reset}
  //     >
  //       <button
  //         style={{
  //           padding: "1px",
  //           background: "aqua",
  //           color: "white",
  //           display: "inline-block",
  //           width: "200px",
  //         }}
  //         onClick={setClockOutState}
  //       >
  //         WEB CLOCK OUT
  //       </button>
  //     </div>
  //   );
  // } else if (clockIn) {
    // pushContent.push(
    //   <button
    //     style={{
    //       padding: "1px",
    //       background: "#05445e",
    //       color: "white",
    //       display: "inline-block",
    //       width: "200px",
    //       borderRadius: "2px",
    //     }}
    //     onClick={setClockState}
    //   >
    //     Web Clock In
    //   </button>
    // );
  // } else if (clockIn == false) {
  //   pushContent.push(
  //     <div
  //       style={{
  //         padding: "1px",
  //         background: "#70BDF0",
  //         display: "inline-block",
  //         width: "200px",
  //         //   height: "100px",
  //         display: "flex",
  //         justifyContent: "center",
  //         borderRadius: "2px",
  //       }}
  //       onMouseLeave={onMouseLeave}
  //       onMouseEnter={onMouseEnter}
  //       onClick={pause}
  //     >
  //       <div>
  //         <div>
  //           <span>Clocked In</span>
  //           <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:
  //           <span>{seconds}</span>
  //           <span></span>
  //         </div>
  //         {/* <h4>Clocked in</h4>
  //         <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>: */}
  //         {/* <span>{seconds}</span>{" "} */}
  //       </div>
  //     </div>
  //   );
  // } else {
  //   pushContent.push(
  //     <button
  //       style={{
  //         color: "white",
  //         backgroundColor: "DodgerBlue",
  //         padding: "1px",
  //         fontFamily: "Arial",
  //         borderRadius: "2px",
  //       }}
  //       onClick={setClockState}
  //     >
  //       Web Clock Out
  //     </button>
  //   );
  // }

  
  useEffect(() => {
    console.log();
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
            borderRadius: "2px",
            border: "1px solid black",
            backgroundColor: "#05445E",
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
