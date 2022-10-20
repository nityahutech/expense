import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Dropdown, Menu, Space, Button } from "antd";
// import dropDownimg from "../../../public/logo/dropdown.svg"
// import dropDownimg from "/dropdown.png";
// import logoutsvgrepocom from "../../assets/logoutsvgrepocom.png";
// import abstractuserflat4 from "../../assets/abstractuserflat4.png";
import { useAuth } from "../../contexts/AuthContext";
import "./navbar.css";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import ExpenseBreadCrumb from "../ExpenseBreadCrumb";
import AttendanceContext from "../../contexts/AttendanceContext";
import moment from "moment";
import { set } from "react-hook-form";

// ---------------------------------------------------------------------

const Navbar = () => {
  const [size, setSize] = useState("large");
  const [startTime, setStartTime] = useState();
  const [isRunning, setIsRunning] = useState(false);
  const [activePage, setActivePage] = useState("/DashBoard");
  let loc = useLocation();
  const { logout, currentUser } = useAuth();
  const [clockinfo, setClockInfo] = useState()

  const isClockRunning = async () => {
    let res = await AttendanceContext.getStartTime(currentUser.uid);
    console.log(res)
    if (res == null || res.clockOut != null) {
      console.log("heyyyyyyyy")
      setIsRunning(false)
      return false;
    }
    else {
      setIsRunning(true)
      let offset = moment().subtract(res.clockIn)
      let offsettime = res.break ? offset.subtract(res.break) : offset;
      console.log(offsettime.toDate());
      const offsetTime = moment(offsettime, "HH:mm:ss").diff(moment().startOf('day'), 'seconds')
      console.log(offsetTime)
      setStartTime(res.clockIn)
      setClockInfo(offsetTime)
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
              src="/abstractuserflat4.png"
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
            <img src="/logoutsvgrepocom.png"
              alt="downArrow"
              className="avatarimg" />
          ),
        },
      ]}
    />
  );

  useEffect(() => {
    console.log("First");
    setIsRunning(isClockRunning());
  }, [])

  useEffect(() => {
    console.log("BREHHHHHHHHHHHHS", isRunning);
    isClockRunning()
    const timer = setInterval(() => {
      // console.log(isRunning, clockinfo);
      if (isRunning) {
        setClockInfo(clockinfo => clockinfo + 1)
      }
    }, 1000)
    return () => {
      clearInterval(timer);
    };
  }, [isRunning])

  // useEffect(() => {
  //   console.log("BREHHHHHHHHHHHHS");
  //   isClockRunning()
  //   const timer = setInterval(() => {
  //     console.log(isRunning);
  //     if (isRunning) {
  //       setClockInfo(clockinfo => clockinfo + 1)
  //     }
  //   }, 1000)
  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, [isRunning]);


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
    // setClockIn(true);
    let clickedDate = {
      empId: currentUser.uid,
      name: currentUser.displayName,
      date: moment().format("DD-MM-YYYY"),
      clockIn: moment().format("HH:mm:ss"),
      clockOut: null
    }
    console.log(clickedDate)
    await AttendanceContext.addClockData(clickedDate)
    setIsRunning(true)
  };

  const stopClockState = async () => {
    // setClockIn(false);
    let clickedDate = {
      clockOut: moment().format("HH:mm:ss"),
      duration: moment.utc(clockTime * 1000).format('HH:mm:ss')
    }
    // AttendanceContext.updateClockData(clickedDate, currentUser.uid)
    // console.log(rec.data())
    console.log(isRunning);
    await AttendanceContext.updateClockData(currentUser.uid, clickedDate);
    setIsRunning(false)
    setClockInfo(0)
    setStartTime("");
    setButtonText("Web Clock In ");
  };

  const handleClock = () => {
    console.log(isRunning)
    if (isRunning) {
      stopClockState();
      console.log(isRunning);
      console.log(startTime);
    }
    else {
      setClockState();
    }
  }

  // console.log(startTime, clockinfo)
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
              src="/logo.png"
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
              src="/dropdown.png"
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
