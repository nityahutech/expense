import { Tabs } from "antd"
import "../../style/Attendance.css";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const AdminAttendance = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [path, setPath] = useState(location.pathname.split("/").at(-1));

    const attTabs = [
        {
          key: "daily-log",
          label: "Daily Log",
        },
        {
          key: "configurations",
          label: "Configure",
        },
        {
          key: "regularize",
          label: "Regularize Attendance",
        },
      ];
      
      useEffect(() => {
        let temp = path
        if (location.pathname.split("/").at(-1) == "") {
            setPath(location.pathname.split("/").at(-2));
            temp = location.pathname.split("/").at(-2)
        }
        if (temp.toLowerCase() == "attendance") {
            navigate("daily-log", { replace: true });
            setPath("daily-log");
        }
        if (location.pathname.toLowerCase().split("/").includes("daily-log")) {
            setPath("daily-log");
        }
      }, [])

    return (
      <div className="hrtab">
        <Tabs
            id="att-tabs"
            className="page-tabs"
            activeKey={path}
            items={attTabs}
            onChange={(e) => {
                setPath(e)
                navigate(e)
            }}
        />
        <Outlet />
       </div>
    )
}

export default AdminAttendance