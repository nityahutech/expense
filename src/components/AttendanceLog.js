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
  Divider,
  Radio,
  Switch,
  TimePicker,
  InputNumber
} from "antd";
import "../style/AttendanceLog.css";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";
import AttendanceContext from "../contexts/AttendanceContext";
import CompanyHolidayContext from "../contexts/CompanyHolidayContext";
import EmpInfoContext from "../contexts/EmpInfoContext";
import ConfigureContext from "../contexts/ConfigureContext";
import { showNotification } from "../contexts/CreateContext";

function AttendanceLog(props) {
  const [allEmp, setallEmp] = useState([]);
  const isHr = props.roleView == "admin";
  console.log(props, isHr);
  const page = "attendanceConfig";
  const currentUser = JSON.parse(sessionStorage.getItem("user"));
  const [selectemp, setSelectemp] = useState({ id: "" });
  const [activetab, setActivetab] = useState("1");
  const [loading, setLoading] = useState(false);
  const [empMonthly, setEmpMonthly] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [dateOfJoining, setDateOfJoining] = useState(null);
  const [month, setMonth] = useState();
  const [selectedDay, setSelectedDay] = useState({});
  const [filterCriteria, setFilterCriteria] = useState({
    search: "",
    date: [],
    category: "all",
  });
  const [configurations, setConfigurations] = useState({});

  const handleFinish = (values) => {
    console.log(values?.starttime, values?.endtime, values?.starttime == null && values?.endtime == null)
    if (values?.starttime == null && values?.endtime == null) {
      setConfigurations({
        ...configurations,
        starttime: values?.starttime?.format("HH:mm") || configurations.starttime,
        endtime: values?.endtime?.format("HH:mm") || configurations.endtime,
      });
      console.log({
        ...configurations,
        starttime: values?.starttime?.format("HH:mm") || configurations.starttime,
        endtime: values?.endtime?.format("HH:mm") || configurations.endtime,
      })
      return;
    }
    let attendanceConfig = {
      ...configurations,
      ...values,
      starttime: values?.starttime?.format("HH:mm") || configurations.starttime,
      endtime: values?.endtime?.format("HH:mm") || configurations.endtime,
    };
    console.log(attendanceConfig, attendanceConfig.starttime > attendanceConfig.starttime)
    // if (attendanceConfig.starttime > attendanceConfig.starttime) {
      ConfigureContext.createConfiguration(
        page,
        { attendanceNature: attendanceConfig })
        .then((response) => {
          getAttendanceData();
        })
        .catch((error) => {
          showNotification("error", "Error", error.message);
        });
    // } else {
    //   showNotification("error", "Error", "Start Time cannot be after End Time!")
    // }
  }

  const getAttendanceData = async () => {
    let data = await ConfigureContext.getConfigurations(page);
    if (data != null) {
      setConfigurations(data?.attendanceNature);
    }
  };

  const checkNumbervalue = (event) => {
    if (!/^[0-9]*\.?[0-9]*$/.test(event.key) && event.key !== "Backspace") {
      return true;
    }
  };
  const [filteredEmp, setFilteredEmp] = useState([]);
  const columns = [
    {
      title: "Employee Code",
      dataIndex: "empId",
      className: "code",
      key: "empId",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Employee Name",
      dataIndex: "name",
      key: "nFname",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Project Name",
      dataIndex: "project",
      key: "project",
      ellipsis: true,
    },
    {
      title: "Report",
      key: "report",
      dataIndex: "report",
      ellipsis: true,
      fixed: "right",
    },
  ];
  useEffect(() => {
    getHolidayList();
    getDateOfJoining();
    getAttendanceData();
  }, []);
  useEffect(() => {
    form.resetFields();
    if (!isHr) {
      if (activetab == "1") {
        setSelectemp({ id: currentUser.uid });
        getEmpDetails(currentUser.uid, [
          moment().subtract(30, "days"),
          moment(),
        ]);
      }
    } else {
      if (activetab == "1") {
        allEmpDetails();
      }
    }
  }, [activetab]);
  const [form] = Form.useForm();
  function getFormateDateString() {
    return (
      (new Date().getDate() > 9
        ? new Date().getDate()
        : "0" + new Date().getDate()) +
      "-" +
      (new Date().getMonth() + 1 > 9
        ? new Date().getMonth() + 1
        : "0" + (new Date().getMonth() + 1)) +
      "-" +
      new Date().getFullYear()
    );
  }
  function getFormatTimeString() {
    return (
      (new Date().getHours() > 9
        ? new Date().getHours()
        : "0" + new Date().getHours()) +
      ":" +
      (new Date().getMinutes() > 9
        ? new Date().getMinutes()
        : "0" + new Date().getMinutes()) +
      ":" +
      (new Date().getSeconds() > 9
        ? new Date().getSeconds()
        : "0" + new Date().getSeconds())
    );
  }
  const getHolidayList = async () => {
    let data = await CompanyHolidayContext.getAllCompanyHoliday("compId001");
    // console.log('data', data)
    let req = data.docs.map((doc) => {
      if (!doc.data().optionalHoliday) {
        return doc.data().date;
      }
      return null;
    });
    setHolidays(req);
  };

  const getDateOfJoining = async () => {
    let data = await EmpInfoContext.getEduDetails(currentUser.uid);
    console.log("data", data);
    var doj = moment(data.doj, "DD-MM-YYYY");
    console.log("data", doj);
    setDateOfJoining(doj);
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
  async function getEmpDetails(id, date) {
    setLoading(true);
    let data;
    AttendanceContext.getAllAttendance(id, date).then((userdata) => {
      AttendanceContext.updateLeaves(userdata).then((final) => {
        setHolidayStatus(final);
        data = final;
        setEmpMonthly(final);
        const timer = setTimeout(() => {
          setLoading(false);
        }, 750);
        return () => clearTimeout(timer);
      });
      // getWithLeave(userdata);
    });
    return data;
  }
  function allEmpDetails() {
    setLoading(true);
    AttendanceContext.getAllUsers().then((userdata) => {
      AttendanceContext.updateWithLeave(
        userdata,
        holidays.includes(moment().format("Do MMM, YYYY"))
      ).then((final) => {
        // setHolidayStatus(final)
        setallEmp(final);
        setFilteredEmp(final);
        setEmpMonthly(final);
        const timer = setTimeout(() => {
          setLoading(false);
        }, 750);
        return () => clearTimeout(timer);
      });
      // getWithLeave(userdata);
    });
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
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 80,
    },
    {
      title: "In Time",
      dataIndex: "clockIn",
      key: "clockIn",
      width: 80,
    },
    {
      title: "Out Time",
      key: "clockOut",
      dataIndex: "clockOut",
      width: 80,
    },
    {
      title: "Work Duration",
      key: "duration",
      dataIndex: "duration",
      width: 100,
    },
    {
      title: "Break Time",
      key: "break",
      dataIndex: "break",
      width: 80,
    },
    {
      title: "Project Name",
      dataIndex: "project",
      key: "project",
      ellipsis: true,
      width: 80,
    },
    {
      title: "Report",
      key: "report",
      dataIndex: "report",
      width: 100,
      ellipsis: true,
      fixed: "right",
    },
  ];
  async function onHrDateFilter(value) {
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

  // const disabledDate = (current) => {
  //   return current.month() != moment().month();
  // };s

  const disabledDate = (current) => {
    return (
      current.isBefore(dateOfJoining) ||
      current.isAfter(moment(dateOfJoining).add(2, "months"))
    );
  };

  const workingdays = [
    {days: "Monday"},
    {days: "Tuesday"},
    {days: "Wednesday"},
    {days: "Thursday"},
    {days: "Friday"},
    {days: "Saturday"},
    {days: "Sunday"}
  ];

  const handleRadiochange = (value, data) => {

    console.log(value);
    console.log(data);
    let tempSelectedDay = {
      ...configurations.selectedDay,
      [data.days]: value,
    }
    // console.log('ddddd', selectedDay)
    handleFinish({ selectedDay: tempSelectedDay })
  };

  console.log(configurations.selectedDay);
  const tableHeaders = [
    {
      title: "Days",
      dataIndex: "days",
      key: "days",
    },
    {
      title: "Full Day",
      dataIndex: "fullday",
      key: "fullday",
      align: "center",
      render: (_, data) => {
        return (
          <Radio.Group
            onChange={(e) => handleRadiochange(e.target.value, data)}
            value={configurations.selectedDay[data.days]}
          // value={value4}

          >
            <Radio
              className="radio"
              value={`fullday`}

            />
          </Radio.Group>
        );
      },
    },
    {
      title: "Half Day",
      dataIndex: "halfday",
      key: "halfday",
      align: "center",
      render: (_, data) => {
        return (
          <Radio.Group
            onChange={(e) => handleRadiochange(e.target.value, data)}
            value={configurations.selectedDay[data.days]}
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
      align: "center",
      render: (_, data) => {
        return (
          <Radio.Group
            onChange={(e) => handleRadiochange(e.target.value, data)}
            value={configurations.selectedDay[data.days]}
          >
            <Radio
              className="radio"
              value={`dayoff`}
            />
          </Radio.Group>
        );
      },
    },
  ];

  return (
    <>
      <div className="hrtab">
        <Tabs
          defaultActiveKey={activetab}
          activeKey={activetab}
          className="Tabs"
          onChange={(tabKey) => {
            setActivetab(tabKey);
            setSelectemp({ id: "" });
          }}
        >
          {!isHr ? (
            <>
              <Tabs.TabPane tab="Monthly Log" key="1">
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
              </Tabs.TabPane>
              <Tabs.TabPane
                tab="Add Report"
                key="2"
                className="reportTabs"
              // onClick={() => {
              //   setIsModalOpen(true);
              // }}
              >
                {/* <Button type="primary" onClick={showModal}>
              Open Modal
            </Button> */}
                {/* <Modal
              title="Basic Modal"
              visible={isModalOpen}
              footer={null}
              closeIcon={
                <div
                  onClick={() => {
                    setIsModalOpen(false);
                  }}
                >
                  X
                </div>
              }
            > */}
                <Form
                  labelCol={{
                    span: 8,
                  }}
                  wrapperCol={{
                    span: 16,
                  }}
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
                  <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
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
                <Table
                  //   rowSelection={{
                  //     type: selectionType,
                  //     ...rowSelection,
                  //   }}
                  className="DailyTable"
                  onRow={(record, rowIndex) => {
                    return {
                      onClick: (event) => {
                        setSelectemp({ ...record });
                        getEmpDetails(record.id, [
                          moment().subtract(30, "days"),
                          moment(),
                        ]);
                        setActivetab("2");
                      }, // click row
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
                    className="Range "
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
              </Tabs.TabPane>


              {/* //---------------------------------------------------------- */}


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
                        initialValue={moment(configurations.starttime, "HH:mm")}
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
                          defaultOpenValue={moment("00:00", "HH:mm")}
                        />
                      </Form.Item>

                      <Form.Item
                        initialValue={moment(configurations.endtime, "HH:mm")}
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
                          disabledTime={() => ({
                            disabledHours: () => [0, 1, 2]
                          })}
                          defaultOpenValue={moment("00:00", "HH:mm")}
                        />
                      </Form.Item>
                      <div
                        style={{
                          fontWeight: "600",
                          fontSize: "14px",
                          marginLeft: "41px",
                        }}
                      >
                        Work Days
                      </div>
                      <Divider
                        style={{
                          borderTop: "2px solid #EAEAEA",
                          margin: "10px",
                        }}
                      />
                      <Table
                        className="weekDays"
                        columns={tableHeaders}
                        dataSource={workingdays || []}
                        bordered={false}
                        pagination={false}
                        size="small"
                      />
                      <Form.Item
                        label="Max Break Duration"
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
                        // noStyle
                      >
                        <InputNumber min={0} max={5}
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
            </>
          )}
        </Tabs>
      </div>
    </>
  );
}
export default AttendanceLog;
