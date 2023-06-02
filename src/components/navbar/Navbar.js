import { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Dropdown, Menu, Space, Switch, Badge, Avatar } from "antd";
import {
  BellOutlined,
  LoadingOutlined,
  PoweroffOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useAuth } from "../../contexts/AuthContext";
import "./navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ExpenseBreadCrumb from "../ExpenseBreadCrumb";
import AttendanceContext from "../../contexts/AttendanceContext";
import moment from "moment";
import Logo from "../../images/logo.svg";
import dropdown from "../../images/dropdown.png";
import Notifications from "../Notifications";

const Navbar = (props) => {
  const authctx = useAuth();
  const [startTime, setStartTime] = useState();
  const [breakTime, setBreakTime] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [loading, setLoading] = useState(false);
  const { logout } = useAuth();
  const [clockinfo, setClockInfo] = useState();
  const [buttonStatus, setButtonStatus] = useState(false);
  const [buttonTimeout, setButtonTimeout] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const role = sessionStorage.getItem("role");
  const location = useLocation();
  const navigate = useNavigate();
  const paths = {
    admin: [
      "attendance",
      "hr-leave",
      "hr-feedback",
      "company-profile",
      "assets",
      "templates",
      "employees",
      "expenses",
      "travel",
      "invoices",
      "client",
    ],
    emp: ["my-attendance", "leave", "feedback"],
  };
  console.log(location.pathname.split("/")[1]);
  const [roleView, setRoleView] = useState(
    paths.admin.includes(location.pathname.split("/")[1].toLowerCase())
  );
  const [showSwitch, setshowswitch] = useState(false);
  const { currentUser } = useAuth();
  let temp = sessionStorage.getItem("logo");
  const logo = temp == null ? Logo : temp;
  let timer = undefined;
  useEffect(() => {
    if (props?.showSwitch === true) {
      setshowswitch(true);
    } else {
      setshowswitch(false);
    }
  }, [props]);

  const isClockRunning = async () => {
    setLoading(true);
    let res = await AttendanceContext.getStartTime(currentUser.uid);
    setLoading(false);
    if (res == null || res.clockOut != null) {
      setIsRunning(false);
      return false;
    } else {
      localStorage.setItem("lastRefresh", moment().format("x"));
      setButtonText();
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
            <SettingOutlined style={{ color: "#000000", fontSize: "15px" }} />
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
            <PoweroffOutlined style={{ color: "#000000", fontSize: "15px" }} />
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
          icon: <></>,
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
          icon: <></>,
        },
      ]}
    >
      {/* <Menu.Item style={{background: "red"}}>
        Request
      </Menu.Item> */}
    </Menu>
  );

  const eventHandler = (eventType) => {
    localStorage.setItem("lastRefresh", moment().format("x"));
    if (timer) {
      refreshTimer();
    }
  };

  useEffect(() => {
    setIsRunning(isClockRunning());
    localStorage.setItem("lastRefresh", moment().format("x"));
    window.addEventListener("click", eventHandler);
    refreshTimer();
    console.log(location);
    return () => {
      window.removeEventListener("click", eventHandler);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    console.log(
      "location",
      window.location.href,
      location,
      paths.admin.includes(location.pathname.split("/")[1].toLowerCase())
    );
    let temp = paths.admin.includes(
      location.pathname.split("/")[1].toLowerCase()
    );
    setRoleView(temp);
    let path = location.pathname.split("/")[1].toLowerCase();
    let index = paths[temp ? "admin" : "emp"].indexOf(path);
  }, [window.location.href]);

  useEffect(() => {
    console.log("check");
    isClockRunning();
    const timer = setInterval(() => {
      if (isRunning) {
        setClockInfo((clockinfo) => clockinfo + 1);
      }
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [isRunning, refresh]);

  const refreshTimer = () => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      let last = localStorage.getItem("lastRefresh");
      const diff = moment.duration(moment().diff(moment(last, "x")));
      console.log(diff);
      if (diff._milliseconds < 5 * 3600000) {
        refreshTimer();
      } else {
        setRefresh(!refresh);
      }
    }, 1200000 + 1000);
  };

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
  };

  const [buttonText, setButtonText] = useState(
    !isRunning ? "Web Clock In" : ""
  );

  const onMouseEnter = (event) => {
    event.target.style.background = "#DB0000";
    setButtonStatus(false);
    if (buttonStatus) {
      setButtonText("Web Clock Out");
    }
  };

  const onMouseLeave = (event) => {
    if (isRunning) {
      event.target.style.background = "skyblue";
      setButtonText();
      setButtonStatus(true);
    } else {
      event.target.style.background = "#FF002A";
    }
  };

  const setClockState = async () => {
    setLoading(true);
    let clickedDate = {
      empId: currentUser.uid,
      name: currentUser.displayName,
      date: moment().format("DD-MM-YYYY"),
      clockIn: moment().format("HH:mm:ss"),
      clockOut: null,
    };
    await AttendanceContext.addClockData(clickedDate);
    setIsRunning(true);
    setLoading(false);
    props.switchRefresh(true);
  };

  const stopClockState = async () => {
    setLoading(true);
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
    await AttendanceContext.updateClockData(currentUser.uid, clickedDate);
    setIsRunning(false);
    setClockInfo(0);
    setStartTime("");
    setButtonText("Web Clock In ");
    setLoading(false);
    props.switchRefresh(true);
  };

  const handleClock = () => {
    setButtonTimeout(true);
    setTimeout(() => {
      setButtonTimeout(false);
    }, 3000);
    if (isRunning) {
      stopClockState();
    } else {
      setClockState();
    }
  };

  return (
    <div className="navbar" style={{ minHeight: "50px", background: "white" }}>
      <div className="wrapper">
        
          {role === "admin" && showSwitch ? (
            <Switch
              checkedChildren="Admin"
              unCheckedChildren="User"
              defaultChecked={authctx.ischecked}
              // checked={roleView}
              style={{
                marginRight: "10px",
                fontWeight: "bold",
                width: "90px",
              }}
              onChange={(checked) => {
                if (checked) {
                  console.log(checked);
                  authctx.updataisChecked(true);
                  setRoleView(true);
                } else {
                  setRoleView(false);
                  authctx.updataisChecked(false);
                }
                let path = location.pathname.split("/")[1].toLowerCase();
                let index = paths[roleView ? "admin" : "emp"].indexOf(path);
                console.log(path, index);
                if (index == -1 || index > paths.emp.length - 1) {
                  return;
                }
                navigate(`/${paths[!roleView ? "admin" : "emp"][index]}`);
              }}
            />
          ) : null}
        <div className="clockdiv">
        {!authctx.ischecked && loading ? (
          <button style={loadStyle}>
            <LoadingOutlined />
            {"  Loading"}
          </button>
        ) : (
          !authctx.ischecked && (
            <button
              style={buttonStyle}
              onClick={handleClock}
              onMouseLeave={onMouseLeave}
              onMouseEnter={onMouseEnter}
              className="clockButton"
              disabled={buttonTimeout}
            >
              {buttonText ? buttonText : null}{" "}
              {!clockinfo && !buttonStatus ? <br /> : null}
              {clockinfo && isRunning
                ? moment.utc(clockinfo * 1000).format("HH:mm:ss")
                : ""}
            </button>
          )
        )}
        </div>
        {/* ) : null} */}
        {/* <Dropdown overlay={
              <div 
                style={{
                  border: "1px solid #d3d3d3b3",
                  boxShadow: "5px", 
                  backgroundColor: "#F8F8F8",
                  padding:"10px",
                  height:"auto"
                }}
              >
                <Notifications notifications={props.notifications} height={"400px"} />
              </div>
            } className="notificationBell" arrow={{ pointAtCenter: true }}>
          <Badge count={props.total} offset={[-10, 5]} size="small">
            <Avatar
              size={40}
              icon={<BellOutlined className="notificationBell" />}
              className="notificationAvatar"
            />
          </Badge>
        </Dropdown> */}
        <div>
          <img src={logo} alt={"logo not found"} className="profileLogo" />
        </div>
        <Dropdown overlay={menu} arrow={{ pointAtCenter: true }}>
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
