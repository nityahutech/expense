import { useState, useEffect } from "react";
import {
  Tabs,
  Table,
  Button,
  Form,
  Input,
  DatePicker,
  Spin,
  Card,
  Radio,
  Switch,
  TimePicker,
  InputNumber,
  Tooltip,
  Modal,
  Row,
  Col,
  Space,
  Badge,
} from "antd";
import "../style/Attendance.css";
import { SearchOutlined, EditOutlined, DeleteFilled } from "@ant-design/icons";
import moment from "moment";
import AttendanceContext from "../contexts/AttendanceContext";
import CompanyHolidayContext from "../contexts/CompanyHolidayContext";
import EmpInfoContext from "../contexts/EmpInfoContext";
import ConfigureContext from "../contexts/ConfigureContext";
import {
  checkNumbervalue,
  showNotification,
  checkAlphabets,
  capitalize,
} from "../contexts/CreateContext";
import { webClock } from "../contexts/EmailContext";
import RegularizeAttendance from "./Attendance/RegularizeAttendance";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

function AttendanceLog(props) {
  const [allEmp, setallEmp] = useState([]);
  const isAdmin = props.roleView == "admin";
  const [form] = Form.useForm();
  const page = "attendanceConfig";
  const currentUser = JSON.parse(sessionStorage.getItem("user"));
  const isHr = JSON.parse(sessionStorage.getItem("isHr"));
  const isManager = JSON.parse(sessionStorage.getItem("isMgr"));
  const [selectemp, setSelectemp] = useState({ id: "" });
  const [activetab, setActivetab] = useState("1");
  const [loading, setLoading] = useState(true);
  const [empMonthly, setEmpMonthly] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [dateOfJoining, setDateOfJoining] = useState(null);
  const [month, setMonth] = useState();
  const [selDate, setSelDate] = useState();
  const [selectedDay, setSelectedDay] = useState({});
  const [filterCriteria, setFilterCriteria] = useState({
    search: "",
    date: [],
    category: "all",
  });
  const [configurations, setConfigurations] = useState({});
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [empCode, setEmpCode] = useState(null);
  const [editedAbsent, setEditedAbsent] = useState({});
  const [name, setName] = useState(null);
  const [employeeId, setEmployeeId] = useState(null);
  const [recordId, setRecordId] = useState(null);
  const [filteredEmp, setFilteredEmp] = useState([]);

  console.log(filteredEmp);

  const attendanceReason = async (values) => {
    const addDetails = {
      empId: currentUser.uid,
      empCode: empCode,
      empName: currentUser.displayName,
      type: "Approval",
      appStatus: "Pending",
      reason: values.absentReason,
      date: editedAbsent.date,
      rejectedReason: "",
    };

    try {
      await AttendanceContext.addRegularize(addDetails);
      setIsEditOpen(false);
      showNotification("success", "Success", "Reason has been added");
      form.resetFields();
      await getEmpDetails(editedAbsent.empId, [
        moment().subtract(30, "days"),
        moment(),
      ]);
    } catch (error) {
      console.log("error", error);
      showNotification("error", "Error", error.message);
    }
  };

  const adminApprovalAtt = async (values) => {
    const addUserReason = {
      empId: editedAbsent.empId,
      empCode: employeeId,
      empName: name,
      type: "Approval",
      appStatus: "Approved",
      reason: values.absentReason,
      date: editedAbsent.date,
      rejectedReason: "",
      clockIn: configurations.starttime + ":00",
      clockOut: configurations.endtime + ":00",
      break: configurations.maxBreakDuration + ":00:00",
      duration: moment(configurations.endtime, "HH:mm:ss")
        .subtract(configurations.starttime)
        .subtract(configurations.maxBreakDuration + ":00:00")
        .format("HH:mm:ss"),
    };

    try {
      await AttendanceContext.addRegularize(addUserReason);
      setIsEditOpen(false);
      showNotification("success", "Success", "Approved");
      form.resetFields();
      await getEmpDetails(editedAbsent.empId, [
        moment().subtract(30, "days"),
        moment(),
      ]);
    } catch (error) {
      console.log("error", error);
      showNotification("error", "Error", error.message);
    }
  };

  const handleCancel = () => {
    setIsEditOpen(false);
    setEditedAbsent({});
    setName(null);
    setEmployeeId(null);
    setRecordId(null);
  };

  const handleFinish = (values) => {
    let temp = Object.keys(values);
    if (
      (temp.includes("starttime") || temp.includes("endtime")) &&
      values?.starttime == null &&
      values?.endtime == null
    ) {
      return;
    }
    let attendanceConfig = {
      ...configurations,
      ...values,
      starttime: values?.starttime?.format("HH:mm") || startTime,
      endtime: values?.endtime?.format("HH:mm") || endTime,
    };
    setStartTime(values?.starttime?.format("HH:mm") || startTime);
    setEndTime(values?.endtime?.format("HH:mm") || endTime);
    ConfigureContext.createConfiguration(page, {
      attendanceNature: attendanceConfig,
    })
      .then((response) => {
        getAttendanceData();
        webClock();
      })
      .catch((error) => {
        showNotification("error", "Error", error.message);
      });
    // } else {
    //   showNotification("error", "Error", "Start Time cannot be after End Time!")
    // }
  };

  const getAttendanceData = async () => {
    let data = await ConfigureContext.getConfigurations(page);
    setConfigurations(data?.attendanceNature);
    setSelectedDay(data?.attendanceNature?.selectedDay);
    setStartTime(data?.attendanceNature?.starttime);
    setEndTime(data?.attendanceNature?.endtime);
    return data?.attendanceNature?.selectedDay;
  };

  const columns = [
    {
      title: "Employee Code",
      dataIndex: "empId",
      className: "code",
      key: "empId",
      align: "center",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Employee Name",
      dataIndex: "name",
      key: "nFname",
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
    },
    {
      title: "Project Name",
      dataIndex: "project",
      key: "project",
      ellipsis: true,
      align: "center",
      render: (_, data) => {
        return data.project || "-";
      },
    },
    {
      title: "Report",
      key: "report",
      dataIndex: "report",
      ellipsis: true,
      fixed: "right",
      align: "center",
      render: (_, data) => {
        return data.report || "-";
      },
    },
  ];

  useEffect(() => {
    getDateOfJoining();
  }, [isAdmin]);

  useEffect(() => {
    form.resetFields();
    getData();
    props.switchRefresh(false);
  }, [activetab, isAdmin, props.refresh]);

  const getData = async () => {
    let temp = {};
    if (holidays.length == 0) {
      let [holTemp, selTemp] = await Promise.all([
        getHolidayList(),
        getAttendanceData(),
      ]);
      temp = {
        holidays: holTemp,
        selectedDays: selTemp,
      };
    }
    if (activetab == "1") {
      if (!isAdmin) {
        setSelectemp({ id: currentUser.uid });
        getEmpDetails(
          currentUser.uid,
          [moment().subtract(30, "days"), moment()],
          temp
        );
      } else {
        allEmpDetails(temp);
      }
    }
  };

  useEffect(() => {
    if (configurations.inputclock) {
      AttendanceContext.fixNullClock(
        endTime + ":00",
        isAdmin ? false : currentUser
      );
    }
  }, [configurations.inputclock]);

  const getHolidayList = async () => {
    let data = await CompanyHolidayContext.getAllCompanyHoliday();
    let req = [];
    data.forEach((doc) => {
      if (!doc.optionalHoliday) {
        req.push(doc.date);
      }
    });
    setHolidays(req);
    return req;
  };

  const getDateOfJoining = async (id) => {
    let data = await EmpInfoContext.getEduDetails(id || currentUser.uid);
    var doj = moment(data.doj, "DD-MM-YYYY");
    var code = data.empId;
    setDateOfJoining(doj);
    setEmpCode(code);
  };

  const setHolidayStatus = (data) => {
    data.forEach((rec) => {
      if (
        holidays.includes(
          moment(rec.date, "DD-MM-YYYY").format("Do MMM, YYYY")
        ) &&
        rec.status != "Present"
      ) {
        rec.status = "Holiday";
      }
    });
    return data;
  };
  const onFinish = (values) => {
    const newData = {
      report: values?.project_details || "-",
      project: values?.project_name || "-",
    };
    AttendanceContext.updateAttendance(currentUser.uid, values.date, newData)
      .then((response) => {
        getEmpDetails(currentUser.uid, [
          moment().subtract(30, "days"),
          moment(),
        ]);
        showNotification("success", "Success", "Record updated successfuly");
      })
      .catch((error) => {
        showNotification("error", "Error", "No records exist for this day");
      });
    setActivetab("1");
  };
  if (loading) {
    return (
      <div
        style={{
          height: "70vh",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Spin
          size="large"
          style={{
            position: "absolute",
            top: "20%",
            left: "50%",
            margin: "-10px",
            zIndex: "100",
            opacity: "0.7",
            backgroundColor: "transparent",
          }}
        />
      </div>
    );
  }
  async function getEmpDetails(id, date, temp) {
    setLoading(true);
    let data,
      dayTemp = temp?.selectedDays || selectedDay,
      holTemp = temp?.holidays || holidays;
    AttendanceContext.getAllAttendance(id, date).then((userdata) => {
      console.log("userLeavee", userdata);
      let dayoff = Object.keys(dayTemp).filter(
        (day) => dayTemp[`${day}`] == "dayoff"
      );
      console.log("breh", userdata, holTemp, dayoff);
      AttendanceContext.updateLeaves(userdata, holTemp, dayoff).then(
        (final) => {
          console.log("final:: ", final);
          setHolidayStatus(final);
          data = final;
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

  // console.log("empdetails", empMonthly);
  function allEmpDetails(temp, selDate) {
    setLoading(true);
    let date = selDate || moment();
    let dayTemp = temp?.selectedDays || selectedDay,
      holTemp = temp?.holidays || holidays;
    // console.log(date, temp, dayTemp, holTemp, selectedDay, holidays);
    AttendanceContext.getAllUsers(date.format("DD-MM-YYYY")).then(
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
          setEmpMonthly(final);
          const timer = setTimeout(() => {
            setLoading(false);
          }, 750);
          return () => clearTimeout(timer);
        });
        // getWithLeave(userdata);
      }
    );
  }
  const onReset = () => {
    form.resetFields();
  };
  const columns1 = [
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
                    let temp = filteredEmp.find((id) => id.id === record.empId);
                    setName(temp.name);
                    setEmployeeId(temp.empId);
                    console.log("temp", temp);
                    setIsEditOpen(true);
                    console.log(true);
                    setEditedAbsent(record);
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
  async function onHrDateFilter(value) {
    console.log(value);
    setMonth(value);
    if (value == null) {
      const modifiedFilterExpense = await getEmpDetails(selectemp.id, [
        moment().subtract(30, "days"),
        moment(),
      ]);
      setEmpMonthly(modifiedFilterExpense);
    } else {
      const begin = value.clone().startOf("month");
      const end = value.clone().endOf("month");
      let date = [begin, end];
      const modifiedFilterExpense = await getEmpDetails(selectemp.id, date);
      setEmpMonthly(modifiedFilterExpense);
    }
  }
  const searchChange = (e) => {
    let search = e.target.value;
    setFilterCriteria({ ...filterCriteria, search: search });
    if (search) {
      let result = allEmp.filter((ex) =>
        ex.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredEmp(result);
    } else {
      setFilteredEmp(allEmp);
    }
  };

  const disabledDate = (current) => {
    return !current.isBetween(dateOfJoining, new Date());
  };

  // const disabledDatetwo = (current) => {
  //   return current.isBefore(dateOfJoining);
  //   // ||
  //   // current.isAfter(moment(dateOfJoining).add(2, "months"))
  // };

  const workingdays = [
    { days: "Monday" },
    { days: "Tuesday" },
    { days: "Wednesday" },
    { days: "Thursday" },
    { days: "Friday" },
    { days: "Saturday" },
    { days: "Sunday" },
  ];

  const handleRadiochange = (value, data) => {
    let tempSelectedDay = {
      ...selectedDay,
      [data.days]: value,
    };
    setSelectedDay(tempSelectedDay);
    handleFinish({ selectedDay: tempSelectedDay });
  };

  const tableHeaders = [
    {
      title: "Days",
      dataIndex: "days",
      key: "days",
      align: "left",
    },
    {
      title: "Full Day",
      dataIndex: "fullday",
      key: "fullday",
      align: "left",
      render: (_, data) => {
        return (
          <Radio.Group
            onChange={(e) => handleRadiochange(e.target.value, data)}
            value={selectedDay[data.days]}
            // value={value4}
          >
            <Radio className="radio" value={`fullday`} />
          </Radio.Group>
        );
      },
    },
    {
      title: "Half Day",
      dataIndex: "halfday",
      key: "halfday",
      align: "left",
      render: (_, data) => {
        return (
          <Radio.Group
            onChange={(e) => handleRadiochange(e.target.value, data)}
            value={selectedDay[data.days]}
          >
            <Radio
              className="radio"
              // value={`halfday_${data.key}_${data.days}`}
              value={`halfday`}
            />
          </Radio.Group>
        );
      },
    },
    {
      title: "Dayoff",
      dataIndex: "dayoff",
      key: "dayoff",
      align: "left",
      render: (_, data) => {
        return (
          <Radio.Group
            onChange={(e) => handleRadiochange(e.target.value, data)}
            value={selectedDay[data.days]}
          >
            <Radio className="radio" value={`dayoff`} />
          </Radio.Group>
        );
      },
    },
  ];
  console.log("fiteredemp", name);

  return (
    <>
      <div className="hrtab">
        <Tabs
          defaultActiveKey={activetab}
          activeKey={activetab}
          className="page-tabs"
          onChange={(tabKey) => {
            setActivetab(tabKey);
            setSelectemp({ id: "" });
          }}
        >
          {!isAdmin ? (
            <>
              <Tabs.TabPane tab="My Attendance" key="1">
                <div className="monthColor">
                  <DatePicker
                    picker="month"
                    placeholder="Select Month"
                    className="Range"
                    bordered={true}
                    value={month}
                    defaultValue={month ? month : null}
                    format="MM-YYYY"
                    style={{
                      background: "#1963A6",
                      cursor: "pointer",
                      marginLeft: "15rem",
                    }}
                    allowClear
                    onChange={onHrDateFilter}
                    disabledDate={disabledDate}
                  />
                </div>
                <Table
                  loading={loading}
                  className="monthly"
                  columns={columns1}
                  dataSource={empMonthly || []}
                  scroll={{ x: 600 }}
                />

                <Modal
                  className="regularize"
                  title="Regularize Attendance"
                  open={isEditOpen}
                  footer={null}
                  closeIcon={
                    <div onClick={handleCancel} style={{ color: "#ffffff" }}>
                      X
                    </div>
                  }
                >
                  <Form form={form} onFinish={attendanceReason}>
                    <Row gutter={[0, 24]}>
                      <Col span={24}>
                        <span className="approvalText">
                          Get Approval For Attendance on {editedAbsent?.date}
                        </span>
                      </Col>
                      {/* <Col span={24}>
                      <DatePicker />
                    </Col> */}
                      <Col span={24}>
                        <span style={{ fontWeight: "600", fontSize: "16px" }}>
                          Reason
                        </span>
                      </Col>
                      <Col span={24}>
                        <Form.Item
                          name="absentReason"
                          onKeyPress={(event) => {
                            if (checkAlphabets(event)) {
                              event.preventDefault();
                            }
                          }}
                        >
                          <Input
                            onChange={(e) => {
                              const str = e.target.value;
                              const caps = str
                                .split(" ")
                                .map(capitalize)
                                .join(" ");
                              form.setFieldsValue({
                                absentReason: caps,
                              });
                            }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "end",
                            marginRight: "7px",
                          }}
                        >
                          <Space>
                            <Form.Item>
                              <Button
                                onClick={handleCancel}
                                style={{
                                  border: "1px solid #1963a6",
                                  color: "#1963a6",
                                  fontWeight: "600",
                                  fontSize: "14px",
                                  lineHeight: "17px",
                                  width: "99px",
                                }}
                              >
                                Cancel
                              </Button>
                            </Form.Item>
                            <Form.Item>
                              <Button
                                htmlType="submit"
                                style={{
                                  border: "1px solid #1963a6",
                                  background: "#1963a6",
                                  color: "#ffffff",
                                  fontWeight: "600",
                                  fontSize: "14px",
                                  lineHeight: "17px",
                                  width: "99px",
                                }}
                              >
                                Submit
                              </Button>
                            </Form.Item>
                          </Space>
                        </div>
                      </Col>
                    </Row>
                  </Form>
                </Modal>
              </Tabs.TabPane>
              <Tabs.TabPane
                tab="Add Report"
                key="4"
                className="reportTabs"
                // onClick={() => {
                //   setIsModalOpen(true);
                // }}
              >
                <Form
                  {...layout}
                  form={form}
                  name="control-hooks"
                  onFinish={onFinish}
                  className="formItem"
                >
                  <Form.Item
                    name="date"
                    label="Date"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                    className="pname"
                  >
                    <DatePicker
                      disabledDate={(current) => current.isAfter(moment())}
                      format={"DD-MM-YYYY"}
                      style={{ width: "50%" }}
                    />
                  </Form.Item>
                  <Form.Item
                    name="project_name"
                    label="Project Name"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                    className="pname"
                  >
                    <Input className="name" />
                  </Form.Item>
                  <Form.Item
                    name="project_details"
                    label="Project Details"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                    className="pname"
                  >
                    <Input className="name" />
                  </Form.Item>
                  <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" className="submit">
                      Submit
                    </Button>
                    <Button
                      htmlType="button"
                      onClick={onReset}
                      className="reset"
                    >
                      Reset
                    </Button>
                  </Form.Item>
                </Form>
                {/* </Modal> */}
              </Tabs.TabPane>
            </>
          ) : (
            <>
              <Tabs.TabPane tab="Daily Log" key="1" forceRender="true">
                <Input
                  className="Daily"
                  placeholder="Search"
                  prefix={<SearchOutlined />}
                  onChange={searchChange}
                  // style={{ width: "95%" }}
                />
                <div className="monthColor">
                  <DatePicker
                    defaultValue={selDate}
                    className="Range Daily"
                    bordered={true}
                    format="DD-MM-YYYY"
                    style={{
                      background: "#1963A6",
                      cursor: "pointer",
                      marginLeft: "15rem",
                      width: "10%",
                    }}
                    allowClear
                    onChange={(e) => {
                      setSelDate(e);
                      allEmpDetails("_", e);
                    }}
                  />
                </div>
                <Table
                  //   rowSelection={{
                  //     type: selectionType,
                  //     ...rowSelection,
                  //   }}
                  className="DailyTable"
                  onRow={(record, rowIndex) => {
                    return {
                      onClick: async (event) => {
                        setSelectemp({ ...record });
                        await getEmpDetails(record.id, [
                          moment().subtract(30, "days"),
                          moment(),
                        ]);
                        setActivetab("2");
                      },
                    };
                  }}
                  loading={loading}
                  columns={columns}
                  dataSource={filteredEmp}
                />
              </Tabs.TabPane>
              <Tabs.TabPane disabled={!selectemp.id} tab="Monthly Log" key="2">
                <div className="monthColor">
                  <DatePicker
                    picker="month"
                    placeholder="Select Month"
                    className="Range"
                    value={month}
                    defaultValue={month ? month : null}
                    format={"MM-YYYY"}
                    style={{
                      background: "#1963A6",
                      cursor: "pointer",
                      marginLeft: "12rem",
                    }}
                    allowClear
                    onChange={onHrDateFilter}
                    disabledDate={disabledDate}
                  />
                </div>
                <Table
                  loading={loading}
                  className="monthly"
                  columns={columns1}
                  dataSource={empMonthly}
                  pagination={true}
                />
                <Modal
                  className="regularize"
                  title="Regularize Attendance"
                  open={isEditOpen}
                  footer={null}
                  closeIcon={
                    <div onClick={handleCancel} style={{ color: "#ffffff" }}>
                      X
                    </div>
                  }
                >
                  <Form form={form} onFinish={adminApprovalAtt}>
                    <Row gutter={[0, 24]}>
                      <Col span={24}>
                        <span className="approvalText">
                          {"Get Approval For" +
                            " " +
                            `${name}` +
                            " " +
                            "on" +
                            " " +
                            `${editedAbsent?.date}`}
                        </span>
                      </Col>
                      {/* <Col span={24}>
                      <DatePicker />
                    </Col> */}
                      <Col span={24}>
                        <span style={{ fontWeight: "600", fontSize: "16px" }}>
                          Reason
                        </span>
                      </Col>
                      <Col span={24}>
                        <Form.Item
                          name="absentReason"
                          onKeyPress={(event) => {
                            if (checkAlphabets(event)) {
                              event.preventDefault();
                            }
                          }}
                        >
                          <Input
                            onChange={(e) => {
                              const str = e.target.value;
                              const caps = str
                                .split(" ")
                                .map(capitalize)
                                .join(" ");
                              form.setFieldsValue({
                                absentReason: caps,
                              });
                            }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "end",
                            marginRight: "7px",
                          }}
                        >
                          <Space>
                            <Form.Item>
                              <Button
                                onClick={handleCancel}
                                style={{
                                  border: "1px solid #1963a6",
                                  color: "#1963a6",
                                  fontWeight: "600",
                                  fontSize: "14px",
                                  lineHeight: "17px",
                                  width: "99px",
                                }}
                              >
                                Cancel
                              </Button>
                            </Form.Item>
                            <Form.Item>
                              <Button
                                htmlType="submit"
                                style={{
                                  border: "1px solid #1963a6",
                                  background: "#1963a6",
                                  color: "#ffffff",
                                  fontWeight: "600",
                                  fontSize: "14px",
                                  lineHeight: "17px",
                                  width: "99px",
                                }}
                              >
                                Submit
                              </Button>
                            </Form.Item>
                          </Space>
                        </div>
                      </Col>
                    </Row>
                  </Form>
                </Modal>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Configure" key="3">
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Card
                    style={{
                      width: "80%",
                      borderRadius: "5px",
                      marginBottom: "25px",
                    }}
                  >
                    <Form
                      labelCol={{
                        span: 4,
                        offset: 2,
                      }}
                      wrapperCol={{
                        span: 14,
                        offset: 1,
                      }}
                      layout="horizontal"
                      initialValues={{
                        remember: true,
                      }}
                      onValuesChange={handleFinish}
                    >
                      <Form.Item
                        initialValue={moment(startTime, "HH:mm")}
                        name="starttime"
                        className="time"
                        label="Start Time"
                        rules={[
                          {
                            required: true,
                            message: "Please Enter Start Date",
                          },
                        ]}
                      >
                        <TimePicker
                          onChange={(e) => {
                            setStartTime(e == null ? "" : e.format("HH:mm"));
                            // handleFinish({ starttime: e });
                          }}
                          disabled={!endTime}
                          disabledTime={() => ({
                            disabledHours: () => {
                              let temp = [
                                ...Array(
                                  Number(endTime.substring(0, 2))
                                ).keys(),
                              ];
                              return [...Array(24).keys()].filter(
                                (i) => !temp.includes(i)
                              );
                            },
                          })}
                          defaultOpenValue={moment("00:00", "HH:mm")}
                        />
                      </Form.Item>

                      <Form.Item
                        initialValue={moment(endTime, "HH:mm")}
                        name="endtime"
                        className="time"
                        label="End Time"
                        rules={[
                          {
                            required: true,
                            message: "Please Enter End Date",
                          },
                        ]}
                      >
                        <TimePicker
                          onChange={(e) => {
                            setEndTime(e == null ? "" : e.format("HH:mm"));
                            // handleFinish({ endtime: e });
                          }}
                          disabled={!startTime}
                          disabledTime={() => ({
                            disabledHours: () => [
                              ...Array(
                                Number(startTime.substring(0, 2)) + 1
                              ).keys(),
                            ],
                          })}
                          defaultOpenValue={moment("00:00", "HH:mm")}
                        />
                      </Form.Item>
                      {/* <div
                        style={{
                          fontWeight: "600",
                          fontSize: "14px",
                          marginLeft: "41px",
                        }}
                      >
                        Work Days
                      </div> */}
                      {/* <Divider
                        style={{
                          borderTop: "2px solid #EAEAEA",
                          margin: "10px",
                        }}
                      /> */}
                      
                      <Form.Item
                        // initialValue={moment(endTime, "HH:mm")}
                        name="days"
                        // className="time"
                        label="Work Days"
                        // rules={[
                        //   {
                        //     required: true,
                        //     message: "Please Enter End Date",
                        //   },
                        // ]}
                      >
                      <Table
                        className="weekDays"
                        columns={tableHeaders}
                        dataSource={workingdays || []}
                        bordered
                        pagination={false}
                        size="small"
                      />
                      </Form.Item>
                      <Form.Item
                        label="Max Break Duration (hr)"
                        name="maxBreakDuration"
                        labelCol={{
                          span: 7,
                          offset: 2,
                        }}
                        wrapperCol={{
                          span: 10,
                          offset: 1,
                        }}
                        initialValue={configurations.maxBreakDuration}
                      >
                        <InputNumber
                          min={0}
                          max={5}
                          onKeyPress={(event) => {
                            if (checkNumbervalue(event)) {
                              event.preventDefault();
                            }
                          }}
                        />
                      </Form.Item>
                      <Form.Item
                        initialValue={configurations.inputclock}
                        name="inputclock"
                        label="Auto Clock Out"
                        labelCol={{
                          span: 6,
                          offset: 2,
                        }}
                        wrapperCol={{
                          span: 10,
                          offset: 2,
                        }}
                      >
                        <Switch
                          checkedChildren="Enabled"
                          unCheckedChildren="Disabled"
                          defaultChecked={configurations.inputclock}
                        />
                      </Form.Item>
                    </Form>
                  </Card>
                </div>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Regularize Attendance" key="4">
                <RegularizeAttendance configurations={configurations} />
              </Tabs.TabPane>
            </>
          )}
        </Tabs>
      </div>
    </>
  );
}
export default AttendanceLog;
