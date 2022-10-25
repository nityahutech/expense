import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Dropdown, Menu, Space, Button } from "antd";
import { useAuth } from "../../contexts/AuthContext";
import "./navbar.css";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import ExpenseBreadCrumb from "../ExpenseBreadCrumb";
import AttendanceContext from "../../contexts/AttendanceContext";
import moment from "moment";

// ---------------------------------------------------------------------

const Navbar = () => {
  const [startTime, setStartTime] = useState();
  const [isRunning, setIsRunning] = useState(false);
  const [activePage, setActivePage] = useState("/DashBoard");
  let loc = useLocation();
  const { logout, currentUser } = useAuth();
  const [clockinfo, setClockInfo] = useState()

  const isClockRunning = async () => {
    let res = await AttendanceContext.getStartTime(currentUser.uid);
    if (res == null || res.clockOut != null) {
      setIsRunning(false)
      return false;
    }
    else {
      setIsRunning(true)
      let offset = moment().subtract(res.clockIn)
      let offsettime = res.break ? offset.subtract(res.break) : offset;
      const offsetTime = moment(offsettime, "HH:mm:ss").diff(moment().startOf('day'), 'seconds')
      setStartTime(res.clockIn)
      setClockInfo(offsetTime)
      return true;
    }
  }

  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <Link
              to="/Setting"
              style={{ color: "#171832", fontWeight: "normal" }}
              rel="noopener noreferrer"
            >
              Settings
            </Link>
          ),
          icon: (
            <img
              // src={abstractuserflat4}
              src={process.env.PUBLIC_URL + "/abstractuserflat4.png"}
              // src="/abstractuserflat4.png"
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
            <img
              src={process.env.PUBLIC_URL + "/logoutsvgrepocom.png"}
              // src="/logoutsvgrepocom.png"
              alt="downArrow"
              className="avatarimg" />
          ),
        },
      ]}
    />
  );

  useEffect(() => {
    setIsRunning(isClockRunning());
  }, [])

  useEffect(() => {
    isClockRunning()
    const timer = setInterval(() => {
      if (isRunning) {
        setClockInfo(clockinfo => clockinfo + 1)
      }
    }, 1000)
    return () => {
      clearInterval(timer);
    };
  }, [isRunning])

  const buttonStyle = !isRunning ? {
    padding: "1px",
    background: "#FF002A",
    color: "white",
    display: "inline-block",
    width: "200px",
    borderRadius: "5px",
    border: "1px solid white",
  } : {
    padding: "1px",
    background: "skyblue",
    color: "white",
    display: "inline-block",
    width: "200px",
    borderRadius: "5px",
    border: "1px solid white",
  };

  const [buttonText, setButtonText] = useState(!isRunning ? "Web Clock In" : "");
  let clockTime = isRunning ? clockinfo : "";

  const onMouseEnter = (event) => {
    event.target.style.background = "#DB0000";
    if (isRunning) {
      setButtonText("Web Clock Out ");
    }
  };

  const onMouseLeave = (event) => {
    if (isRunning) {
      event.target.style.background = "skyblue";
      setButtonText("");
    }
    else {
      setButtonText("Web Clock In ");
      event.target.style.background = "#FF002A";
    }
  };

  const setClockState = async () => {
    let clickedDate = {
      empId: currentUser.uid,
      name: currentUser.displayName,
      date: moment().format("DD-MM-YYYY"),
      clockIn: moment().format("HH:mm:ss"),
      clockOut: null
    }
    await AttendanceContext.addClockData(clickedDate)
    setIsRunning(true)
  };

  const stopClockState = async () => {
    let clickedDate = {
      clockOut: moment().format("HH:mm:ss"),
      duration: moment.utc(clockTime * 1000).format('HH:mm:ss')
    }
    await AttendanceContext.updateClockData(currentUser.uid, clickedDate);
    setIsRunning(false)
    setClockInfo(0)
    setStartTime("");
    setButtonText("Web Clock In ");
  };

  const handleClock = () => {
    if (isRunning) {
      stopClockState();
    }
    else {
      setClockState();
    }
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
            // backgroundColor: "#33e9f2",
            color: "white",
            fontWeight: "400",
            width: "auto",
          }}
          className="stopwatch"
        >
          {/* {`${ctime.hrs}:${ctime.min}:${ctime.sec}`} */}

        </div>
        <button
          style={buttonStyle}
          onClick={handleClock}
          onMouseLeave={onMouseLeave}
          onMouseEnter={onMouseEnter}
        >
          {buttonText ? buttonText : ""} <br />
          {clockinfo && isRunning ? moment.utc(clockTime * 1000).format('HH:mm:ss') : ""}
        </button>
        <div className="image">
          <div className="item">
            <img
              src={process.env.PUBLIC_URL + "/logo.png"}
              // src="/logo.png"
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
              {"  "}Hutech{""}
            </h1>
            <img
              src={process.env.PUBLIC_URL + "/dropdown.png"}
              // src="/dropdown.png"
              alt="downArrow"
              style={{ cursor: "pointer", width: '15px' }}
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
