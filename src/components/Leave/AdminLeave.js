import { Tabs } from "antd"
import "../../style/Leave.css";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const AdminLeave = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [path, setPath] = useState(location.pathname.split("/").at(-1));

    const leaveTabs = [
        {
          key: "requests",
          label: "Leave Request",
        },
        {
          key: "holidays",
          label: "Holidays",
        },
        {
          key: "type",
          label: "Leave Type",
        },
        {
          key: "approval",
          label: "Approvals",
        },
      ];
      
      useEffect(() => {
        let temp = path
        if (location.pathname.split("/").at(-1) == "") {
            setPath(location.pathname.split("/").at(-2));
            temp = location.pathname.split("/").at(-2)
        }
        if (temp.toLowerCase() == "hr-leave") {
            navigate("requests", { replace: true });
            setPath("requests");
            temp = "requests"
        }
      }, [])

    return (
      <div className="hrtab">
        <Tabs
            className="page-tabs"
            activeKey={path}
            items={leaveTabs}            
            onChange={(e) => {
                setPath(e)
                navigate(e)
            }}
        />
        <Outlet />
       </div>
    )
}

export default AdminLeave