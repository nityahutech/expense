import { ArrowLeftOutlined, EditOutlined, SearchOutlined } from "@ant-design/icons";
import { Badge, Card, Col, DatePicker, Input, Modal, Row, Space, Table, Tooltip } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import CompanyHolidayContext from "../../contexts/CompanyHolidayContext";
import ConfigureContext from "../../contexts/ConfigureContext";
import AttendanceContext from "../../contexts/AttendanceContext";

const MonthlyLog = (props) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [selDate, setSelDate] = useState(moment());
    const [selectedDay, setSelectedDay] = useState({})
    const [empMonthly, setEmpMonthly] = useState([]);
    const [holidays, setHolidays] = useState([]);
    const params = useParams()
    const currentUser = JSON.parse(sessionStorage.getItem("user"));
    const id = params.id || currentUser.uid
    console.log(props, params, id);
    
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: 80,
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 80,
      align: "center",
      render: (_, record) => (
          <>
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
                  record.appStatus == "Reject"
                    ? record.rejectedReason
                    : "Pending"
                }
              >
                <Space style={{ marginLeft: "10px" }}>
                  <Badge
                    className={
                      record.appStatus == "Reject" ? "reject" : "badge"
                    }
                    status="warning"
                  />
                </Space>
              </Tooltip>
            ) : record.status == "Absent" ? (
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
                  }}
                />
              </Tooltip>
            ) : record.status == "Present" && record.type == "Approval" ? (
              <Tooltip placement="bottom" title="Approved">
                <Space style={{ marginLeft: "10px" }}>
                  <Badge status="success" className="approve" />
                </Space>
              </Tooltip>
            ) : null}
          </>
        )
    },
    {
      title: "In Time",
      dataIndex: "clockIn",
      key: "clockIn",
      width: 80,
      align: "center",
      render: (_, record) => {
        return record.clockIn || "-";
      },
    },
    {
      title: "Out Time",
      key: "clockOut",
      dataIndex: "clockOut",
      width: 80,
      align: "center",
      render: (_, record) => {
        return record.clockOut || "-";
      },
    },
    {
      title: "Work Duration",
      key: "duration",
      dataIndex: "duration",
      width: 100,
      align: "center",
      render: (_, record) => {
        return record.duration || "-";
      },
    },
    {
      title: "Break Time",
      key: "break",
      dataIndex: "break",
      width: 80,
      align: "center",
      render: (_, record) => {
        return record.break || "-";
      },
    },
    {
      title: "Project Name",
      dataIndex: "project",
      key: "project",
      ellipsis: true,
      width: 80,
      align: "center",
      render: (_, record) => {
        return record.project || "-";
      },
    },
    {
      title: "Report",
      key: "report",
      dataIndex: "report",
      width: 100,
      ellipsis: true,
      fixed: "right",
      align: "center",
      render: (_, record) => {
        return record.report || "-";
      },
    },
  ];

  useEffect(() => {
    getData()
  }, []);

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
    // allEmpDetails(temp)
    getEmpDetails(
        currentUser.uid,
        [moment().subtract(30, "days"), moment()],
        temp
      );
  }

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
  }

    return (
        <Card className="daily">
        <Row gutter={10} style={{justifyContent:"space-between"}}>
        <Col span={8}>
            <div className="back-arrow" onClick={() => navigate("/attendance/daily-log")} >
                <ArrowLeftOutlined />
                Back
            </div>
        </Col>
        <Col span={8} style={{textAlign: "right"}}>
            <DatePicker
                picker="month"
                // defaultValue={selDate}
                className="daily range"
                bordered={true}
                format="MM-YYYY"
                allowClear
                onChange={(e) => {
                    console.log(e);
                    setSelDate(e);
                    if (e == null) {
                        getEmpDetails(id, [
                            moment().subtract(30, "days"),
                            moment(),
                        ]);
                        // setEmpMonthly(modifiedFilterExpense);
                      } else {
                        const begin = e.clone().startOf("month");
                        const end = e.clone().endOf("month");
                        getEmpDetails(id, [begin, end]);
                        // setEmpMonthly(modifiedFilterExpense);
                      }
                    // getEmpDetails("_", e);
                }}
                disabledDate={(current) => !current.isBetween(moment('2023', 'YYYY'), new Date())}
            />
        </Col>
        </Row>

      <Table
        className="daily daily-table"
        loading={loading}
        columns={columns}
        dataSource={empMonthly}
        pagination={true}
      />
    </Card>
    )
}

export default MonthlyLog