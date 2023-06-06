import { Tabs } from "antd";
import "../../style/leave.css";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { getEmpInfo } from "../../contexts/CreateContext";

const UserLeave = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [path, setPath] = useState(location.pathname.split("/").at(-1));
  const { currentUser } = useAuth()

  const [leaveTabs, setLeaveTabs] = useState([
    {
      key: "",
      label: "Calendar",
    },
    {
      key: "history",
      label: "Leave History",
    },
  ]);

  useEffect(() => {
    let temp = path;
    if (location.pathname.split("/").at(-1) == "") {
      setPath(location.pathname.split("/").at(-2));
      temp = location.pathname.split("/").at(-2);
    }
    if (temp.toLowerCase() == "leave") {
      navigate("", { replace: true });
      setPath("");
      temp = "requests";
    }
    getManageeList()
  }, []);
  const getManageeList = async () => {
    let data = await getEmpInfo(currentUser.uid);
    let list = data?.managees || []
    if (list.length != 0) {
        setLeaveTabs([
        {
          key: "",
          label: "Calendar",
        },
        {
          key: "approval",
          label: "Manager Approval",
        },
        {
          key: "history",
          label: "Leave History",
        }])
    }
  }

  return (
    <div className="hrtab">
      <Tabs
        className="page-tabs"
        activeKey={path}
        items={leaveTabs}
        onChange={(e) => {
          setPath(e);
          navigate(e);
        }}
      />
      <Outlet data={props.data} />
    </div>
  );
};

export default UserLeave;
