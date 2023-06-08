import {
  ArrowLeftOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Badge,
  Card,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  Space,
  Table,
  Tooltip,
} from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CompanyHolidayContext from "../../contexts/CompanyHolidayContext";
import ConfigureContext from "../../contexts/ConfigureContext";
import AttendanceContext from "../../contexts/AttendanceContext";
import RegularizeModal from "./RegularizeModal";
import { useAuth } from "../../contexts/AuthContext";
import { getEmpInfo, showNotification } from "../../contexts/CreateContext";
import AddReport from "./AddReport";

const MonthlyLog = (props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedDay, setSelectedDay] = useState({});
  const [empMonthly, setEmpMonthly] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [empInfo, setEmpInfo] = useState({});
  const [regularizeOpen, setRegularizeOpen] = useState(false);
  const [date, setDate] = useState(null);
  const [configurations, setConfigurations] = useState(null);
  const location = useLocation();
  console.log(location);
  const { currentUser } = useAuth();
  const id = location.state == null ? currentUser.uid : location.state.id;
  console.log(empInfo, location, id);

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      fixed: "left",
      width: 80,
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "status",
      fixed: "left",
      key: "status",
      width: 90,
      align: "center",
      render: (_, record) => (
        <>
          {console.log(record)}

          <span
            style={
              record.status == "Absent" && record.type == "Approval"
                ? { color: "#000000" }
                : record.status == "Absent"
                ? { color: "red" }
                : {}
            }
          >
            {record.status}
          </span>
          {record.status == "Absent" && record.type == "Approval" ? (
            <Tooltip
              placement="bottom"
              title={
                record.appStatus == "Rejected"
                  ? record.rejectedReason
                  : "Pending"
              }
            >
              <Space style={{ marginLeft: "10px" }}>
                <Badge
                  className={
                    record.appStatus == "Rejected" ? "reject" : "badge"
                  }
                  status="warning"
                />
              </Space>
            </Tooltip>
          ) : record.status == "Absent" ? (
            window.location.href.includes("my-attendance/daily-log") ? null : (
              <Tooltip placement="bottom" title="Regularize Attendance">
                <EditOutlined
                  style={{ marginLeft: "10px" }}
                  onClick={() => {
                    // let temp = filteredEmp.find((id) => id.id === record.empId);
                    // setName(temp.name);
                    // setEmployeeId(temp.empId);
                    // console.log("temp", temp);
                    // setIsEditOpen(true);
                    // console.log(true);
                    // setEditedAbsent(record);
                    setRegularizeOpen(true);
                    setDate(record.date);
                  }}
                />
              </Tooltip>
            )
          ) : record.status == "Present" && record.type == "Approval" ? (
            <Tooltip placement="bottom" title="Approved">
              <Space style={{ marginLeft: "10px" }}>
                <Badge status="success" className="approve" />
              </Space>
            </Tooltip>
          ) : null}
        </>
      ),
    },
    {
      title: "In Time",
      dataIndex: "clockIn",
      key: "clockIn",
      width: 85,
      align: "center",
      render: (_, record) => {
        return record.clockIn || "-";
      },
    },
    {
      title: "Out Time",
      key: "clockOut",
      dataIndex: "clockOut",
      width: 85,
      align: "center",
      render: (_, record) => {
        return record.clockOut || "-";
      },
    },
    {
      title: "Work Duration",
      key: "duration",
      dataIndex: "duration",
      width: 90,
      align: "center",
      render: (_, record) => {
        return record.duration || "-";
      },
    },
    {
      title: "Break Time",
      key: "break",
      dataIndex: "break",
      width: 85,
      align: "center",
      render: (_, record) => {
        return record.break || "-";
      },
    },
    {
      title: "Project Name",
      dataIndex: "project",
      key: "project",
      width: 95,
      align: "center",
      render: (_, record) => {
        return record.project || "-";
      },
    },
    {
      title: "Report",
      key: "report",
      dataIndex: "report",
      width: 150,
      ellipsis: true,
      align: "center",
      render: (_, record) => {
        return record.report || "-";
      },
    },
  ];

  useEffect(() => {
    getData();
    getEmployeeInfo();
  }, []);

  const getEmployeeInfo = async () => {
    let data = await getEmpInfo(id);
    setEmpInfo(data);
    console.log(data, "ghghdghd");
  };

  //   function allEmpDetails(temp, selDate) {
  //     setLoading(true);
  //     let date = selDate || moment()
  //     let dayTemp = temp?.selectedDays || selectedDay,
  //       holTemp = temp?.holidays || holidays;
  //     // console.log(date, temp, dayTemp, holTemp, selectedDay, holidays);
  //     AttendanceContext.getAllUsers(date.format("DD-MM-YYYY")).then(
  //       (userdata) => {
  //         console.log("userDataaa", userdata);
  //         let dayoff = Object.keys(dayTemp).filter(
  //           (day) => dayTemp[`${day}`] == "dayoff"
  //         );
  //         AttendanceContext.updateWithLeave(
  //           userdata,
  //           holTemp.includes(date.format("Do MMM, YYYY")),
  //           dayoff.includes(date.format("dddd"))
  //         ).then((final) => {
  //           console.log(final);
  //           setallEmp(final);
  //           setFilteredEmp(final);
  //         //   setEmpMonthly(final);
  //           const timer = setTimeout(() => {
  //             setLoading(false);
  //           }, 750);
  //           return () => clearTimeout(timer);
  //         });
  //         // getWithLeave(userdata);
  //       }
  //     );
  //   }

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

  const handleFinish = async (values) => {
    console.log(empInfo);
    let addDetails = {
      empId: id,
      empCode: empInfo.empId,
      empName: empInfo.name,
      type: "Approval",
      appStatus: "Pending",
      reason: values.reason,
      date: date,
      rejectedReason: "",
    };
    if (!window.location.href.includes("my-attendance")) {
      addDetails.appStatus = "Approved";
      addDetails.clockIn = configurations.starttime + ":00";
      addDetails.clockOut = configurations.endtime + ":00";
      addDetails.break = configurations.maxBreakDuration + ":00:00";
      addDetails.duration = moment(configurations.endtime, "HH:mm:ss")
        .subtract(configurations.starttime)
        .subtract(configurations.maxBreakDuration + ":00:00")
        .format("HH:mm:ss");
    }
    console.log(addDetails);
    try {
      await AttendanceContext.addRegularize(addDetails);
      setRegularizeOpen(false);
      showNotification("success", "Success", "Reason has been added");
      // form.resetFields();
      await getEmpDetails(empInfo.empId, [
        moment().subtract(30, "days"),
        moment(),
      ]);
    } catch (error) {
      console.log("error", error);
      showNotification("error", "Error", error.message);
    }
  };

  const getData = async () => {
    setLoading(true);
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
      setConfigurations(selTemp.attendanceNature);
      setSelectedDay(selTemp.attendanceNature.selectedDay);
    }
    // allEmpDetails(temp)
    getEmpDetails(id, [moment().subtract(30, "days"), moment()], temp);
  };

  const handleCancel = () => {
    setDate(null);
    setRegularizeOpen(false);
  };

  const getEmpDetails = async (id, date, temp) => {
    setLoading(true);
    let data,
      dayTemp = temp?.selectedDays || selectedDay,
      holTemp = temp?.holidays || holidays;
    console.log("data", id, date);
    AttendanceContext.getAllAttendance(id, date).then((userdata) => {
      console.log("userLeavee", userdata);
      let dayoff = Object.keys(dayTemp).filter(
        (day) => dayTemp[`${day}`] == "dayoff"
      );
      console.log("breh", userdata, holTemp, dayoff);
      AttendanceContext.updateLeaves(userdata, holTemp, dayoff).then(
        (final) => {
          console.log("final:: ", final);
          //   setHolidayStatus(final);
          //   data = final;
          setEmpMonthly(final);
          const timer = setTimeout(() => {
            setLoading(false);
          }, 750);
          return () => clearTimeout(timer);
        }
      );
      // getWithLeave(userdata);
    });
    return data;
  };

  console.log(empMonthly);

  return (
    <Card id="top" className="daily">
      <Row gutter={10} style={{ justifyContent: "space-between" }}>
        <Col span={8}>
          {location.state != null && (
            <div
              className="back-arrow"
              style={{
                margin: "0 15px",
                position: "relative",
                bottom: "5px",
              }}
              onClick={() =>
                navigate(
                  `/${
                    window.location.href.includes("my-")
                      ? "my-attendance"
                      : "attendance"
                  }/daily-log`
                )
              }
            >
              <ArrowLeftOutlined />
              Back
            </div>
          )}
        </Col>
        <Col span={16} style={{ textAlign: "right" }}>
          <DatePicker
            picker="month"
            // defaultValue={selDate}
            className="daily range"
            bordered={true}
            format="MM-YYYY"
            allowClear
            onChange={(e) => {
              console.log(e);
              if (e == null) {
                getEmpDetails(id, [moment().subtract(30, "days"), moment()]);
              } else {
                const begin = e.clone().startOf("month");
                const end = e.clone().endOf("month");
                getEmpDetails(id, [begin, end]);
              }
            }}
            disabledDate={(current) =>
              !current.isBetween(moment("03-2023", "MM-YYYY"), new Date())
            }
          />
        </Col>
      </Row>

      {location.state != null && <Divider>{empInfo.name}</Divider>}

      <Table
        className="daily daily-table"
        loading={loading}
        columns={columns}
        dataSource={empMonthly}
        pagination={true}
        scroll={{ x: 500 }}
        onChange={() =>
          document.getElementById("att-tabs").scrollIntoView(true)
        }
      />
      <RegularizeModal
        regularizeOpen={regularizeOpen}
        name={empInfo.name}
        date={date}
        handleCancel={handleCancel}
        handleFinish={handleFinish}
      />
    </Card>
  );
};

export default MonthlyLog;
