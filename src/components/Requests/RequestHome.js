import { Tabs } from "antd"
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const RequestHome = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [path, setPath] = useState(location.pathname.split("/").at(-1));

    const reqTabs = [
        {
          key: "view",
          label: "All Requests",
        },
        {
          key: "forms",
          label: "Create Request",
        },
      ];
      
      useEffect(() => {
        let temp = path
        if (location.pathname.split("/").at(-1) == "") {
            setPath(location.pathname.split("/").at(-2));
            temp = location.pathname.split("/").at(-2)
        }
        if (temp.toLowerCase() == "requests") {
            navigate("view", { replace: true });
            setPath("view");
        }
        if (location.pathname.toLowerCase().split("/").includes("daily-log")) {
            setPath("view");
        }
      }, [])

    return (
        <div className="hrtab">
          <Tabs
              className="page-tabs"
              activeKey={path}
              items={reqTabs}
              onChange={(e) => {
                  setPath(e)
                  navigate(e)
              }}
          />
          <Outlet />
        </div>
    )
}

export default RequestHome