import { Tabs } from "antd"
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AttendanceContext from "../../contexts/AttendanceContext";
import { useAuth } from "../../contexts/AuthContext";
import { getEmpInfo } from "../../contexts/CreateContext";

const UserAttendance = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [path, setPath] = useState(location.pathname.split("/").at(-1));
  const {currentUser} = useAuth()

  const [attTabs, setAttTabs] = useState([
      {
        key: "",
        label: "My Attendance",
      },
      {
        key: "report",
        label: "Add Report",
      }
    ]);
    
    useEffect(() => {
      let temp = path
      console.log(temp);
      if (location.pathname.split("/").at(-1) == "") {
          setPath(location.pathname.split("/").at(-2));
          temp = location.pathname.split("/").at(-2)
      }
      if (temp.toLowerCase() == "my-attendance") {
          navigate("", { replace: true });
          setPath("");
      }
      if (location.pathname.toLowerCase().split("/").includes("daily-log")) {
          setPath("daily-log");
      }
      console.log(temp);
      getManageeList()
    }, [])
    
    const getManageeList = async () => {
      let data = await getEmpInfo(currentUser.uid);
      let list = data?.managees || []
      if (list.length != 0) {
        setAttTabs([
          {
            key: "",
            label: "My Attendance",
          },
          {
            key: "daily-log",
            label: "Daily Log",
          },
          {
            key: "report",
            label: "Add Report",
          }
        ])
      }
    }

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

export default UserAttendance