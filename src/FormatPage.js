import Navbar from "./components/navbar/Navbar";
import NewSidebar from "./components/sidebar/NewSidebar";
import "./style/home.css";
import { useEffect, useState } from "react";
import IdleTimeOutHandler from "./IdleTimeoutHandler";
import AttendanceContext from "./contexts/AttendanceContext";
import LeaveContext from "./contexts/LeaveContext";
import CompanyHolidayContext from "./contexts/CompanyHolidayContext";
import EmpInfoContext from "./contexts/EmpInfoContext";
import { AlertTwoTone, CalendarTwoTone, ScheduleTwoTone, StarTwoTone } from "@ant-design/icons";
import moment from "moment";
import { useAuth } from "./contexts/AuthContext";
import { useLocation } from "react-router-dom";

const FormatPage = (props) => {
    const [roleView, setRoleView] = useState(sessionStorage.getItem("roleView"))
    const [refresh, setRefresh] = useState(false)
    const [data, setData] = useState({})
    const [notifications, setNotifications] = useState([])
    const [total, setTotal] = useState(0)
    let accessToken = sessionStorage.getItem("accessToken");
    let role = sessionStorage.getItem("role");
    const { currentUser } = useAuth();
    const location = useLocation()
    const curr = [moment().format("DD-MM-YYYY"), moment().week()]
  console.log(props);
    useEffect(() => {
      getData();
    }, [])

    const getData = async () => {    
      let [att, req, hols, days] = await Promise.all([
        role == "admin" ? AttendanceContext.getPending() : [],
        role == "admin" ? LeaveContext.getPending() : LeaveContext.getPending(currentUser.displayName),
        CompanyHolidayContext.getAllCompanyHoliday(),
        EmpInfoContext.getBdayAnniversary(),
        //TravelContext.getPending()
      ]);
      console.log(att, req, hols, days);
      setData({
        att: att,
        leave: req,
        holidays: hols,
        days: days,
      })
      let notes = []
      let count = req?.length || 0 + att?.length || 0
      let bdayTrue = days[moment().format("DD-MM")]?.birthday.includes(currentUser.displayName)
      let anniTrue = days[moment().format("DD-MM")]?.anniversary.includes(currentUser.displayName)
      if (bdayTrue || anniTrue) {
        count += 1
        notes.push({
            name: (bdayTrue ? "Happy Birthday " : "")
            + (bdayTrue && anniTrue ? "and " : "")
            + (anniTrue ? "Congratulations on your Work Anniversary " : "")
            +`${currentUser.displayName}!`,
            icon: <StarTwoTone twoToneColor="#fa8128" style={{fontSize: "20px"}} />
          })
      }
      let holDates = hols.find(x => x.date == moment().format("Do MMM, YYYY"))
      console.log(holDates);
      if (holDates) {
        count += 1
        notes.push({
            name: `Happy ${holDates.name}!`,
            icon: <CalendarTwoTone twoToneColor="#fa8128" style={{fontSize: "20px"}} />
          })
      }
      if (role == "admin") {

      }
      if (moment().format("D") == "1") {
        count += 1
        notes.push({
            name: "Payslip",
            description: `Your latest payslip is available. `,
            badge: 0,
            ref: ["/Profile", { state: { active: "8" }}],
            icon: <AlertTwoTone twoToneColor="#fa8128" style={{fontSize: "20px"}} />
        })
      }
      notes.push(req.length == 0 ? null : {
          name: "Leave Request",
          // description: "Approval Required",
          badge: req.length,
          ref: ["/Leave"],
          icon: <CalendarTwoTone style={{fontSize: "20px"}} />
        },
        att.length == 0 ? null : {
          name: "Regularize Attendance",    
          // description: "Approval Required",
          badge: att.length,
          ref: ["/Attendance", { state: { active: "4" }}],
          icon: <ScheduleTwoTone style={{fontSize: "20px"}} />
      })
      // notes.push({
      //   name: "Birthday",
      //   description: `Happy Birthday${(" " + false || "") + "!"} Have a wonderful year!`,
      //   badge: 1,
      //   icon: <AlertTwoTone twoToneColor="#fa8128" style={{fontSize: "20px"}} />
      // },
      // {
      //   name: "Work Anniversary",
      //   description: `Today is the Work Anniversary of ${false || "-"}. Congrtulations!`,
      //   badge: 0,
      //   icon: <AlertTwoTone twoToneColor="#fa8128" style={{fontSize: "20px"}} />
      // },)
      console.log("notesss", notes);
      setNotifications(notes)
      setTotal(count)
    }
  
    const switchRole = (role) => {
      setRoleView(role);
    };
  
    const switchRefresh = (value) => {
      setRefresh(value);
    };
    
    if (role != "admin" && ["expense", "employee", "attendance", "hr-leave"].includes(location.pathname.split('/')[1].toLowerCase())) {
      window.location.href = "/"
    }
    
    return accessToken && !(accessToken == "null") ? (
      <div className="home">
        <IdleTimeOutHandler switchRefresh={switchRefresh} />
        <div className="sidecontainer">
          <NewSidebar
            activeSubMenu={props.activeSubMenu}
            activeMenu={props.activeMenu}
          />
        </div>
        <div className="homeContainer">
          <div className="table">
            <Navbar
              roleView={roleView}
              switchRefresh={switchRefresh}
              switchRole={switchRole}
              notifications={[]}
              total={total}
            />
          </div>
          <div className="tables">
            <props.main roleView={roleView} switchRole={switchRole} refresh={refresh} switchRefresh={switchRefresh} data={data} notifications={notifications} />
          </div>
        </div>
      </div>
    ) : window.location.href = "/";
}

export default FormatPage;