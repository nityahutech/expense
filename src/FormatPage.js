import Navbar from "./components/navbar/Navbar";
import NewSidebar from "./components/sidebar/NewSidebar";
import "./style/home.css";
import { useEffect, useState } from "react";
import IdleTimeOutHandler from "./IdleTimeoutHandler";
import AttendanceContext from "./contexts/AttendanceContext";
import LeaveContext from "./contexts/LeaveContext";
import CompanyHolidayContext from "./contexts/CompanyHolidayContext";
import EmpInfoContext from "./contexts/EmpInfoContext";
import { AlertTwoTone } from "@ant-design/icons";
import moment from "moment";

const FormatPage = (props) => {
    const [roleView, setRoleView] = useState(sessionStorage.getItem("roleView"))
    const [refresh, setRefresh] = useState(false)
    const [data, setData] = useState({})
    const [notifications, setNotifications] = useState([])
    let accessToken = sessionStorage.getItem("accessToken");
    let role = sessionStorage.getItem("role");
    const curr = [moment().format("DD-MM-YYYY"), moment().week()]

    useEffect(() => {
      getData();
    }, [])

    const getData = async () => {    
      let [att, req, hols, days] = await Promise.all([
        AttendanceContext.getPending(),
        LeaveContext.getPending(),
        CompanyHolidayContext.getAllCompanyHoliday(),
        EmpInfoContext.getBdayAnniversary(),
        //TravelContext.getPending()
      ]);
      // console.log(att, req, hols, days);
      setData({
        att: att,
        leave: req,
        holidays: hols,
        days: days,
      })
      let notes = []
      // {
      //   name: "Leave Request",
      //   description: "This is the description.",
      //   badge: 2,
      //   ref: ["/Leave"],
      //   icon: <CalendarTwoTone style={{fontSize: "20px"}} />
      // },
      // {
      //   name: "Regularize Attendance",
      //   description: "This is the description.",
      //   badge: 2,
      //   ref: ["/Attendance"],
      //   icon: <ScheduleTwoTone style={{fontSize: "20px"}} />
      // },
      // {
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
      // },
      // {
      //   name: "Payslip",
      //   description: `Your latest payslip is available. `,
      //   badge: 0,
      //   ref: ["/Profile", { state: { active: "8" }}],
      //   icon: <AlertTwoTone twoToneColor="#fa8128" style={{fontSize: "20px"}} />
      // }
      // Object.keys(days).forEach(date => {
      //    if (moment(date, "DD-MM-YYYY").week() == curr[1]) {
      //     let rec = false;
      //     if (role == "admin") {
      //     }
      //     if (date == curr[0]) {
      //       switch(Object.keys(days[date])[0]) {
      //         case "birthday": rec = {
      //           name: "Birthday",
      //           description: `Happy Birthday${(" " + days[date].birthday || "") + "!"} Have a wonderful year!`,
      //           icon: <AlertTwoTone twoToneColor="#fa8128" style={{fontSize: "20px"}} />
      //         }
      //           break;
      //         case "anniversary": 
      //       }
      //       notes.push()
      //     }
      //    }
      // })
      req.forEach(rec => notes.push())
      // console.log("notesss", notes);
    }
  
    const switchRole = (role) => {
      setRoleView(role);
    };
  
    const switchRefresh = (value) => {
      setRefresh(value);
    };
    
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
            />
          </div>
          <div className="tables">
            <props.main roleView={roleView} switchRole={switchRole} refresh={refresh} switchRefresh={switchRefresh} data={data} holidays={[]} />
          </div>
        </div>
      </div>
    ) : window.location.href = "/";
}

export default FormatPage;