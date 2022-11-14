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
import settingsIcon from "../../images/abstractuserflat4.png";
import logoutIcon from "../../images/logoutsvgrepocom.png";
import Logo from "../../images/smallerLogo.png";
import dropdown from "../../images/dropdown.png";
import CompanyProContext from "../../contexts/CompanyProContext";
// ---------------------------------------------------------------------

const Navbar = () => {
  const isHr = sessionStorage.getItem("role");

  const [startTime, setStartTime] = useState();
  const [isRunning, setIsRunning] = useState(false);
  const [activePage, setActivePage] = useState("/DashBoard");
  let loc = useLocation();
  const { logout, currentUser } = useAuth();
  const [clockinfo, setClockInfo] = useState();
  const role = sessionStorage.getItem("role");
  const user = JSON.parse(sessionStorage.getItem("user"));
  let temp = sessionStorage.getItem("logo");
  const logo = temp == null ? Logo : temp;
  console.log(logo);

  const isClockRunning = async () => {
    let res = await AttendanceContext.getStartTime(currentUser.uid);
    if (res == null || res.clockOut != null) {
      setIsRunning(false);
      return false;
    } else {
      setIsRunning(true);
      let offset = moment().subtract(res.clockIn);
      let offsettime = res.break ? offset.subtract(res.break) : offset;
      const offsetTime = moment(offsettime, "HH:mm:ss").diff(
        moment().startOf("day"),
        "seconds"
      );
      setStartTime(res.clockIn);
      setClockInfo(offsetTime);
      return true;
    }
  };

  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <Link
              to="/Settings"
              style={{ color: "#171832", fontWeight: "normal" }}
              rel="noopener noreferrer"
            >
              Settings
            </Link>
          ),
          icon: (
            <img
              // src={abstractuserflat4}
              src={settingsIcon}
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
              src={logoutIcon}
              // src="/logoutsvgrepocom.png"
              alt="downArrow"
              className="avatarimg"
            />
          ),
        },
      ]}
    />
  );

  useEffect(() => {
    console.log(role, user);
    setIsRunning(isClockRunning());
  }, []);

  useEffect(() => {
    isClockRunning();
    const timer = setInterval(() => {
      if (isRunning) {
        setClockInfo((clockinfo) => clockinfo + 1);
      }
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [isRunning]);

  const buttonStyle = !isRunning
    ? {
        padding: "1px",
        background: "#FF002A",
        color: "white",
        display: "inline-block",
        width: "150px",
        borderRadius: "5px",
        border: "1px solid white",
      }
    : {
        padding: "1px",
        background: "#3ab8eb",
        color: "white",
        display: "inline-block",
        width: "150px",
        borderRadius: "5px",
        border: "1px solid white",
      };

  const [buttonText, setButtonText] = useState(
    !isRunning ? "Web Clock In" : ""
  );
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
      setButtonText("Web Clock In");
    } else {
      setButtonText("Web Clock In");
      event.target.style.background = "#FF002A";
    }
  };

  const setClockState = async () => {
    let clickedDate = {
      empId: currentUser.uid,
      name: currentUser.displayName,
      date: moment().format("DD-MM-YYYY"),
      clockIn: moment().format("HH:mm:ss"),
      clockOut: null,
    };
    await AttendanceContext.addClockData(clickedDate);
    setIsRunning(true);
  };

  const stopClockState = async () => {
    let clickedDate = {
      clockOut: moment().format("HH:mm:ss"),
      duration: moment.utc(clockTime * 1000).format("HH:mm:ss"),
    };
    await AttendanceContext.updateClockData(currentUser.uid, clickedDate);
    setIsRunning(false);
    setClockInfo(0);
    setStartTime("");
    setButtonText("Web Clock In ");
  };

  const handleClock = () => {
    if (isRunning) {
      stopClockState();
    } else {
      setClockState();
    }
  };

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
        {isHr == "super" ? null : (
          <button
            style={buttonStyle}
            onClick={handleClock}
            onMouseLeave={onMouseLeave}
            onMouseEnter={onMouseEnter}
          >
            {buttonText ? buttonText : ""} <br />
            {clockinfo && isRunning
              ? moment.utc(clockTime * 1000).format("HH:mm:ss")
              : ""}
          </button>
        )}

        <div className="image">
          <div className="item">
            <img
              src={logo}
              // src="/logo.png"
              alt="imagh"
              className="avatar"
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>

        <Dropdown overlay={menu}>
          <Space>
            <img
              src={dropdown}
              // src="/dropdown.png"
              alt="downArrow"
              style={{ cursor: "pointer", width: "15px" }}
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
