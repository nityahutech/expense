import React, { useState, useEffect } from "react";
import {
  Tabs,
  Layout,
  Table,
  Button,
  Form,
  Input,
  DatePicker,
  notification,
  Spin,
  Pagination,
  Card,
  Divider,
  Radio,
  Select,
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
const dateFormat = "DD-MM-YYYY";


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
  const [starttime, setStarttime] = useState();
  const [endtime, setEndtime] = useState();
  const [maxBreakDuration, setMaxBreakDuration] = useState(0);
  const [inputclock, setInputclock] = useState(true);


  const handleFinish = (values,) => {
    console.log('ddddd', values,)
    let attendanceConfig = {
      starttime: starttime,
      endtime: endtime,
      inputclock: inputclock,
      maxBreakDuration: maxBreakDuration,
      selectedDay: selectedDay

    };

    if (values.starttime != null) {
      // console.log('ddddd', values.starttime.format("HH:mm"))
      setStarttime(values.starttime.format("HH:mm"))
      attendanceConfig.starttime = values.starttime.format("HH:mm")
    }
    if (values.endtime != null) {
      // console.log('ddddd', values.endtime.format("HH:mm"))
      setEndtime(values.endtime.format("HH:mm"))
      attendanceConfig.endtime = values.endtime.format("HH:mm")
    }
    if (values.maxBreakDuration != null) {
      // console.log('ddddd', values.maxBreakDuration)
      setMaxBreakDuration(values.maxBreakDuration)
      attendanceConfig.maxBreakDuration = values.maxBreakDuration
    }
    if (values.inputclock != null) {
      // console.log('ddddd', values.inputclock)
      setInputclock(values.inputclock)
      attendanceConfig.inputclock = values.inputclock
    }

    if (values.selectedDay != null) {
      attendanceConfig.selectedDay = values.selectedDay
    }

    console.log('ddddd', attendanceConfig)
    if (attendanceConfig.starttime != null && attendanceConfig.endtime != null && (Object.keys(attendanceConfig.selectedDay).length) == 7) {
      ConfigureContext.createConfiguration(
        page,
        { attendanceNature: attendanceConfig })
        .then((response) => {
          showNotification(
            "success",
            "Success",
            "Added successfully!"
          );
        })
        .catch((error) => {
          showNotification("error", "Error", error.message);
        });
    }
    else {
      console.log('dddd', (Object.keys(attendanceConfig.selectedDay).length))
    }

  }

  const getAttendanceData = async () => {
    let data = await ConfigureContext.getConfigurations(page);
    console.log('dataAttendance', data)
    setConfigurations(data);
    setSelectedDay(data?.attendanceNature?.selectedDay)
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
    // {
    //   title: "Action",
    //   key: "action",
    // },
  ];
  const showNotification = (type, msg, desc) => {
    notification[type]({
      message: msg,
      description: desc,
    });
  };
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
    var doj = moment(data.doj, dateFormat);
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
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const handleRadiochange = (value, data) => {

    console.log(value);
    console.log(data);
    let tempSelectedDay = {
      ...selectedDay,
      [data.days]: value,
    }
    setSelectedDay(tempSelectedDay);
    // console.log('ddddd', selectedDay)
    handleFinish({ selectedDay: tempSelectedDay })
  };

  console.log(selectedDay);
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
            value={selectedDay[data.days]}
          // value={value4}

          >
            <Radio
              className="radio"
              value={`fullday_${data.key}_${data.days}`}

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
            value={selectedDay[data.days]}
          >
            <Radio
              className="radio"
              value={`halfday_${data.key}_${data.days}`}
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
            value={selectedDay[data.days]}
          >
            <Radio
              className="radio"
              value={`dayoff_${data.key}_${data.days}`}
            />
          </Radio.Group>
        );
      },
    },
  ];
  const timeChange = (time, timeString) => {
    console.log('onchange', 'TimePicker1')
    console.log(time, timeString);
  };

  // const weekData = [
  //   {
  //     key: "1",
  //     days: "Monday",
  //     fullday: "1",
  //     halfday: "1",
  //     dayoff: "1",
  //   },
  // ];

  const weekData = workingdays.map((day, i) => {
    return {
      key: i + 1,
      days: day,
    };
  });

  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };

  const onBreakHrChange = (checked) => {
    console.log(`switch to ${checked}`);
  };



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
                      width: "550px",
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
                        initialValue={moment(configurations?.attendanceNature?.starttime, "hh:mm")}
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
                          // onChange={timeChange}

                          // onChange={(e) => {
                          //   console.log('onchange', 'TimePicker')
                          //   setStarttime(e.target.value);

                          // }}
                          defaultOpenValue={moment("00:00", "HH:mm")}

                        />
                      </Form.Item>

                      <Form.Item
                        initialValue={moment(configurations?.attendanceNature?.endtime, "hh:mm")}
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
                          // onChange={onChange}
                          // onChange={(e) => {
                          //   console.log('onchange', 'TimePicker2')
                          //   setEndtime(e.target.value);

                          // }}
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
                        dataSource={weekData}
                        bordered={false}
                        pagination={false}
                        size="small"
                      />
                      <Form.Item
                        label="Max Break Duration "
                        labelCol={{
                          span: 7,
                          offset: 2,
                        }}
                        wrapperCol={{
                          span: 10,
                          offset: 1,
                        }}

                      >
                        <Form.Item name="maxBreakDuration" initialValue={configurations?.attendanceNature?.maxBreakDuration} noStyle>
                          <InputNumber min={0} max={5}
                            onKeyPress={(event) => {
                              if (checkNumbervalue(event)) {
                                event.preventDefault();
                              }
                            }}
                            
                          // onChange{(e) => {
                          //   console.log('onchange', 'inputNumber', e)
                          //   setInputnumber(e);


                          // }}

                          />
                        </Form.Item>
                        <span className="ant-form-text" style={{ marginLeft: 8 }}>

                        </span>
                      </Form.Item>
                      <Form.Item
                        initialValue={configurations?.attendanceNature?.inputclock}
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
                          defaultChecked={configurations?.attendanceNature?.inputclock}
                        // onChange={(x, e) => {
                        //   console.log('onchange', 'enable')
                        //   setInputclock(e.target.value);

                        // }}
                        // style={{ marginLeft: "13rem" }}
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
