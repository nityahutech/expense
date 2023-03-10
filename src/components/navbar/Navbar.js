import { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Dropdown, Menu, Space, Switch, Badge, Avatar } from "antd";
import { BellOutlined, LoadingOutlined } from "@ant-design/icons";
import { useAuth } from "../../contexts/AuthContext";
import "./navbar.css";
import { Link } from "react-router-dom";
import ExpenseBreadCrumb from "../ExpenseBreadCrumb";
import AttendanceContext from "../../contexts/AttendanceContext";
import moment from "moment";
import settingsIcon from "../../images/NavSettingsIcon.png";
import logoutIcon from "../../images/LogoutIcon.png";
import Logo from "../../images/logo.svg";
import dropdown from "../../images/dropdown.png";

const Navbar = (props) => {
  const [startTime, setStartTime] = useState();
  const [breakTime, setBreakTime] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [loading, setLoading] = useState(false);
  const { logout } = useAuth();
  const [clockinfo, setClockInfo] = useState();
  const [buttonStatus,setButtonStatus]=useState(false);
  const role = sessionStorage.getItem("role");
  const [roleView, setRoleView] = useState(props.roleView || sessionStorage.getItem("role"));
  const currentUser = JSON.parse(sessionStorage.getItem("user"));
  let temp = sessionStorage.getItem("logo");
  const logo = temp == null ? Logo : temp;

  const isClockRunning = async () => {
    setLoading(true)
    let res = await AttendanceContext.getStartTime(currentUser.uid);
    setLoading(false)
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
      setBreakTime(res.break);
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
              src={settingsIcon}
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
              alt="downArrow"
              className="avatarimg"
            />
          ),
        },
      ]}
    />
  );
  
  const notificationMenu = (
    <Menu
      className="notificationMenuDp"
      items={[
        {
          key: "1",
          label: (
            <Link
              // to="/Settings"
              style={{ 
                color: "#171832", 
                fontWeight: "normal",
              }}
              // rel="noopener noreferrer"
            >
              Requests
            </Link>
          ),
          icon: (<></>),
        },
        {
          key: "2",
          label: (
            <Link
              // to="/"
              // onClick={logout}
              style={{ color: "#171832", fontWeight: "normal" }}
              // rel="noopener noreferrer"
            >
              Leaves
            </Link>
          ),
          icon: (<></>),
        },
      ]}
    >
      {/* <Menu.Item style={{background: "red"}}>
        Request
      </Menu.Item> */}
    </Menu>
  );

  useEffect(() => {
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

  const loadStyle = {
    padding: "1px",
    background: "lightgray",
    color: "white",
    display: "inline-block",
    width: "150px",
    borderRadius: "5px",
    border: "1px solid white",
  }

  const [buttonText, setButtonText] = useState(
    !isRunning ? "Web Clock In" : ""
  );
  let clockTime = isRunning ? clockinfo : "";

  const onMouseEnter = (event) => {
    
    event.target.style.background = "#DB0000";
    setButtonStatus(false);
    if (isRunning) {
      setButtonText(" ");
    }
    if(buttonStatus){
      setButtonText("Web clock out");
    }
  };

  const onMouseLeave = (event) => {
    
    if (isRunning) {
      event.target.style.background = "skyblue";
      setButtonText(" ");
      setButtonStatus(true);
    } else {
      event.target.style.background = "#FF002A";
      setButtonText("Web Clock in");
    }
  };
  
  const setClockState = async () => {
    setLoading(true)
    let clickedDate = {
      empId: currentUser.uid,
      name: currentUser.displayName,
      date: moment().format("DD-MM-YYYY"),
      clockIn: moment().format("HH:mm:ss"),
      clockOut: null,
    };
    await AttendanceContext.addClockData(clickedDate);
    setIsRunning(true);
    setLoading(false)
    props.switchRefresh(true)
  };

  const stopClockState = async () => {
    setLoading(true)
    let offset = moment().subtract(startTime);
    let offsettime = breakTime != null ? offset.subtract(breakTime) : offset;
    const offsetTime = moment(offsettime, "HH:mm:ss").diff(
      moment().startOf("day"),
      "seconds"
    );
    let clickedDate = {
      clockOut: moment().format("HH:mm:ss"),
      duration: moment.utc(offsetTime * 1000).format("HH:mm:ss"),
      // duration: moment.utc(clockTime * 1000).format("HH:mm:ss"),
    };
    // console.log(clickedDate)
    await AttendanceContext.updateClockData(currentUser.uid, clickedDate);
    setIsRunning(false);
    setClockInfo(0);
    setStartTime("");
    setButtonText("Web Clock In ");
    setLoading(false)
    props.switchRefresh(true)
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
        {role == "admin" ? (
          <Switch 
            checkedChildren="Admin"
            unCheckedChildren="User"
            defaultChecked = {roleView == "admin"}
            style={{
              marginRight: "10px",
              fontWeight: "bold",
              width:"90px"
            }}
            onChange={()=>{
              setRoleView(roleView == "admin" ? "emp" : "admin")
              props.switchRole(roleView == "admin" ? "emp" : "admin")
              sessionStorage.setItem("roleView", roleView == "admin" ? "emp" : "admin")}
            }
          />
        ) : null}
       {roleView == "emp" ? 
          loading ? (<button style={loadStyle}>
            <LoadingOutlined />
            {"  Loading"}
          </button>) : 
          (
          <button
            style={buttonStyle}
            onClick={handleClock}
            onMouseLeave={onMouseLeave}
            onMouseEnter={onMouseEnter}
            className="clockButton"
          >
            {buttonText ? buttonText : ""} {!buttonStatus ? <br/> : null}
            {clockinfo && isRunning
              ? moment.utc(clockTime * 1000).format("HH:mm:ss")
              : ""}
          </button>
        ) : null}
        {/* <Dropdown overlay={notificationMenu} className="notificationBell">
          <Badge count={5} offset={[-10,5]} size="small">
            <Avatar size={40} icon={<BellOutlined className="notificationBell"/>} className="notificationAvatar" />
          </Badge>
        </Dropdown> */}
        <div>
          <img
            src={logo}
            alt={"logo not found"}
            className="profileLogo"
          />
        </div>
        <Dropdown overlay={menu}>
          <Space>
            <img
              src={dropdown}
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
