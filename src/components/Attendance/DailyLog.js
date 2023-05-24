import { SearchOutlined } from "@ant-design/icons";
import { Card, Col, DatePicker, Input, Row, Table } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ConfigureContext from "../../contexts/ConfigureContext";
import CompanyHolidayContext from "../../contexts/CompanyHolidayContext";
import moment from "moment";
import AttendanceContext from "../../contexts/AttendanceContext";
import { useAuth } from "../../contexts/AuthContext";

const DailyLog = (props) => {
  const location = useLocation()
  const navigate = useNavigate();
  const [allEmp, setallEmp] = useState([]);
  const [filteredEmp, setFilteredEmp] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selDate, setSelDate] = useState(moment());
  const [selectedDay, setSelectedDay] = useState({})
  const [holidays, setHolidays] = useState([]);
  const { currentUser } = useAuth()

  const searchChange = (e) => {
    let search = e.target.value;
    if (search) {
      let result = allEmp.filter(ex =>
        ex.name.toLowerCase().includes(search.toLowerCase()) ||
        ex.empId.toLowerCase().includes(search.toLowerCase()) ||
        ex.status.toLowerCase().includes(search.toLowerCase()) ||
        ex.project.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredEmp(result);
    } else {
      setFilteredEmp(allEmp);
    }
  };

  useEffect(() => {
    getData()
  }, []);

  function allEmpDetails(temp, selDate) {
    setLoading(true);
    let date = selDate || moment()
    let dayTemp = temp?.selectedDays || selectedDay,
      holTemp = temp?.holidays || holidays;
      console.log(location.pathname.includes("my-attendance"));
    // console.log(date, temp, dayTemp, holTemp, selectedDay, holidays);
    AttendanceContext.getAllUsers(date.format("DD-MM-YYYY"), location.pathname.includes("my-attendance") ? currentUser.displayName : false).then(
      (userdata) => {
        console.log("userDataaa", userdata);
        let dayoff = Object.keys(dayTemp).filter(
          (day) => dayTemp[`${day}`] == "dayoff"
        );
        AttendanceContext.updateWithLeave(
          userdata,
          holTemp.includes(date.format("Do MMM, YYYY")),
          dayoff.includes(date.format("dddd"))
        ).then((final) => {
          console.log(final);
          setallEmp(final);
          setFilteredEmp(final);
          //   setEmpMonthly(final);
          const timer = setTimeout(() => {
            setLoading(false);
          }, 750);
          return () => clearTimeout(timer);
        });
        // getWithLeave(userdata);
      }
    );
  }

  const getHolidayList = async () => {
    let data = await CompanyHolidayContext.getAllCompanyHoliday();
    let req = [];
    data.forEach((doc) => {
      if (!doc.optionalHoliday) {
        req.push(doc.date);
      }
    });
    setHolidays(req);
    console.log(req);
    return req;
  };

  const getData = async () => {
    setLoading(true)
    let temp = {};
    if (holidays.length == 0) {
      let [holTemp, selTemp] = await Promise.all([
        getHolidayList(),
        ConfigureContext.getConfigurations("attendanceConfig"),
      ]);
      temp = {
        holidays: holTemp,
        selectedDays: selTemp.attendanceNature.selectedDay,
      };
      setSelectedDay(selTemp.attendanceNature.selectedDay)
    }
    allEmpDetails(temp)
  }

  const columns = [
    {
      title: "Employee Code",
      dataIndex: "empId",
      className: "code",
      key: "empId",
      align: "center",
      width: 95,
      fixed: "left",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Employee Name",
      dataIndex: "name",
      key: "nFname",
      align: "center",
      width: 95,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      width: 90,
    },
    {
      title: "Project Name",
      dataIndex: "project",
      key: "project",
      align: "center",
      width: 95,
      render: (_, data) => {
        return data.project || "-";
      },
    },
    {
      title: "Report",
      key: "report",
      dataIndex: "report",
      ellipsis: true,
      align: "center",
      width: 150,
      render: (_, data) => {
        return data.report || "-";
      },
    },
  ];

  return (
    <Card className="daily">
        <Row gutter={[10, 10]} style={{justifyContent:"space-between"}}>
        <Col md={8}>
          <Input
            // className="daily"
            style={{margin: "0 15px", width: "225px"}}     
            placeholder="Search"
            prefix={<SearchOutlined />}
            onChange={searchChange}
          />
        </Col>
        <Col md={8} style={{textAlign: "right"}}>
          <DatePicker
            defaultValue={selDate}
            className="daily range"
            bordered={true}
            format="DD-MM-YYYY"
            allowClear={false}
            onChange={(e) => {
              setSelDate(e);
              allEmpDetails("_", e);
            }}
            disabledDate={(current) => !current.isBetween(moment('05-2023', 'MM-YYYY'), new Date())}
          />
      </Col>

      </Row>

      <Table
        className="daily daily-table"
        loading={loading}
        columns={columns}
        onRow={(record) => {
          return {
            onClick: () => {
              navigate("employee", {state: {id: record.id}});
            },
          };
        }}
        scroll={{ x: 500 }}
        dataSource={filteredEmp}
        pagination={true}
        onChange={() => document.getElementById("att-tabs").scrollIntoView(true)}
      />
    </Card>
  );
};

export default DailyLog;