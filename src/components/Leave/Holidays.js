import {
  Avatar,
  Space,
  Radio,
  Button,
  Calendar,
  Card,
  Col,
  Drawer,
  Row,
  Spin,
  Tooltip,
  Typography,
  Modal,
  Form,
  Input,
  DatePicker,
} from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import ConfigureContext from "../../contexts/ConfigureContext";
import EmpInfoContext from "../../contexts/EmpInfoContext";
import { useAuth } from "../../contexts/AuthContext";
import LeaveContext from "../../contexts/LeaveContext";
import CompanyHolidayContext from "../../contexts/CompanyHolidayContext";
import { DeleteOutlined, DownloadOutlined } from "@ant-design/icons";
import {
  capitalize,
  downloadFile,
  getUsers,
  showNotification,
} from "../../contexts/CreateContext";
import { useCSVReader } from "react-papaparse";
import ApplyLeave from "./ApplyLeave";

const { Text } = Typography;

const Holidays = (props) => {
  const { currentUser } = useAuth();
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState([
    moment().format("Do MMM, YYYY"),
    moment().format("MMM, YYYY"),
  ]);
  const [configurations, setConfigurations] = useState([]); //leave type configurations in array of obhects
  const [leavedays, setLeaveDays] = useState(null); //leave nature & total in obj
  const [totaldays, setTotalDays] = useState([]); //leave nature & taken in obj
  const [leaves, setLeaves] = useState([]); //all leaves in array of obects
  const [duration, setDuration] = useState([]); //all days of applied leaves in array
  const [applyModal, setApplyModal] = useState(false);
  const [tempDur, setTempDur] = useState([]); //all days of applied leaves in array (temp for edit)
  const [durStatus, setDurStatus] = useState([]); //corresponding status of duration in array
  const [dateSelected, setDateSelected] = useState([]);
  const [repManager, setRepManager] = useState(); //name of currentUser's reporting manager
  const [loading, setLoading] = useState(false);
  const [allEmpName, setAllEmpName] = useState([]);
  const [allEmpMap, setAllEmpMap] = useState({});
  const [open, setOpen] = useState(false);
  const [companyholiday, setCompanyholiday] = useState([]); //holidays in array of objects
  let role = window.location.href.includes("hr-leave");
  console.log(props);
  const { CSVReader } = useCSVReader();
  const [errorFile, setErrorFile] = useState(null);
  const [enableBulk, setEnableBulk] = useState(false);
  const [isBulkOpen, setIsBulkOpen] = useState(false);
  const [holidays, setHolidays] = useState([]);
  const [head, setHead] = useState([]);
  const template = [
    ["Name", "Date", "Type"],
    ["New Year's Day", "YYYY-MM-DD", "Official Holiday/Optional Holiday"],
  ];
  const styles = {
    csvReader: {
      display: "flex",
      flexDirection: "row",
      marginBottom: 10,
    },
    browseFile: {
      width: "20%",
    },
    acceptedFile: {
      border: "1px solid #ccc",
      lineHeight: 2.5,
      paddingLeft: 10,
      width: "80%",
    },
    remove: {
      borderRadius: 0,
      padding: "0 20px",
    },
    progressBarBackgroundColor: {
      backgroundColor: "red",
    },
  };

  const handleBulkOnboard = () => {
    let temp = [...holidays];
    let name = head.indexOf("Name");
    let date = head.indexOf("Date");
    let type = head.indexOf("Type");
    temp.forEach((hol) => {
      let matchingHolidayList = companyholiday.filter((item) => {
        return (
          item.name == hol[name] ||
          item.date == moment(hol[date], "YYYY-MM-DD").format("Do MMM, YYYY")
        );
      });
      if (matchingHolidayList.length > 0) {
        return;
      }
      let newHol = {
        name: hol[name],
        date: moment(hol[date], "YYYY-MM-DD").format("Do MMM, YYYY"),
        optionalHoliday: hol[type] === "Official" ? false : true,
      };
      CompanyHolidayContext.createHoliday(newHol)
        .then((response) => {
          showNotification("success", "Success", "Holiday Created successfuly");
          getData();
        })
        .catch((error) => {
          showNotification("error", "Error", "Unable to create holiday!");
        });
    });
    setEnableBulk(false);
  };

  const validateCSV = async (data, headers, model) => {
    let errors = [["Email Id", "Field", "Error"]];
    let name = headers.indexOf("Name");
    let date = headers.indexOf("Date");
    let type = headers.indexOf("Type");
    data.forEach(async (hol, i) => {
      if (i == data.length - 1) {
        return;
      }
      hol.forEach((field, i) => {
        hol[i] = field.trim();
      });
      hol[name] = hol[name]
        .split(" ")
        .map((x) => capitalize(x.toLowerCase()))
        .join(" ");
      hol[type] = capitalize(hol[type].split(" ")[0].toLowerCase());
      let typevalid = hol[type] == "Official" || hol[type] == "Optional";
      if (!typevalid) {
        errors.push([hol[name], "Type", "Should Be 'Official' or 'Optional'"]);
      }
      let valid = moment(hol[date], "YYYY-MM-DD").isSame(moment(), "year");
      if (!valid) {
        errors.push([hol[name], "Date", "Incorrect Year"]);
      }
    });
    if (data[data.length - 1].length == 1) {
      data.pop();
    }
    setErrorFile(null);
    const timer = setTimeout(() => {
      if (errors.length > 1) {
        showNotification(
          "error",
          "Error",
          "Please correct errors in upload file!"
        );
        setErrorFile(
          <Button
            style={{ marginRight: "10px" }}
            onClick={() => downloadFile(errors, "errorFile")}
          >
            {" "}
            Download Error File
          </Button>
        );
        return;
      }
      showNotification("success", "Success", "All Fields Valid!");
      setEnableBulk(true);
      setHolidays(data);
      setHead(headers);
    }, [2000]);
  };

  useEffect(() => {
    getAllUser();
    getHoliday();
    getConfigurations(true);
  }, []);

  const getDateFormatted = (data) => {
    data.forEach((dur) => {
      let len = dur.date.length;
      dur.len =
        len -
        (dur.slotStart == "Full Day" ? 0 : 0.5) -
        (dur.date.length == 1 ? 0 : dur.slotEnd == "Full Day" ? 0 : 0.5);
      dur.dateCalc = dur.date;
      dur.date =
        dur.date.length == 1
          ? dur.date[0]
          : dur.date[0] + " to " + dur.date[dur.date.length - 1];
    });
  };
  const getDateSorted = (data) => {
    data.sort(function (c, d) {
      let a = moment(c.dateCalc[0], "Do MMM, YYYY");
      let b = moment(d.dateCalc[0], "Do MMM, YYYY");
      return a - b;
    });
  };

  const getAllUser = async () => {
    const allData = await getUsers();
    let userMap = {};
    let allUsers = allData.docs.map((doc, i) => {
      userMap[`${doc.data().name}`] = [doc.id, doc.data()?.repManager || ""];
      return {
        value: doc.data().name,
      };
    });
    console.log(userMap, allUsers);
    setAllEmpMap(userMap);
    setAllEmpName(allUsers);
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

  const getData = async (temp) => {
    setLoading(true);
    console.log("ffffffffff");
    let empRecord = await EmpInfoContext.getEduDetails(currentUser.uid);
    setRepManager(empRecord?.repManager);
    let data = await LeaveContext.getAllById(currentUser.uid);
    let d = data.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    });
    getDateFormatted(d);
    getDateSorted(d);
    setLeaves(d);
    setLoading(false);
    // let temps = await LeaveContext.carryForward()
    let tempDays = temp ? temp : { ...totaldays };
    let days = await LeaveContext.getLeaveDays(d, tempDays);
    setLeaveDays(days);
    let array = [];
    let stats = [];
    d.forEach((rec) => {
      array.push(rec.dateCalc);
      for (let i = 0; i < rec.dateCalc.length; i++) {
        stats.push(rec.status);
      }
    });
    setTempDur([].concat.apply([], array));
    setDuration([].concat.apply([], array));
    setDurStatus(stats);
  };

  const getConfigurations = async (load) => {
    let data = await ConfigureContext.getConfigurations("leaveType");
    let temp = Object.keys(data).map((type, i) => {
      return {
        ...data[`${type}`],
        name: type,
      };
    });
    temp.sort((k1, k2) => {
      return k1.name < k2.name ? -1 : k1.name > k2 ? 1 : 0;
    });
    let cards = {};
    let index = temp.indexOf(
      temp.filter((x) => {
        if (x.name == "Loss Of Pay") {
          return true;
        }
        cards[`${x.name}`] = data[`${x.name}`].count;
        return false;
      })[0]
    );
    let lop = temp.splice(index, 1);
    temp.push(lop[0]);
    setConfigurations(temp);
    setTotalDays(cards);
    if (load) {
      getData({ ...cards });
    }
  };

  const disabledCalendarDate = (current) => {
    return moment(current).day() === 0 || current.day() === 6;
  };

  const monthCellRender = (value) => {
    const listData = [];
    let currdate = value.format("MMM, YYYY");
    companyholiday.forEach((hol) => {
      if (currdate == moment(hol.date, "Do MMM, YYYY").format("MMM, YYYY")) {
        listData.push({
          name: hol.name,
          optionalHoliday: hol.optionalHoliday,
        });
      }
    });
    let textVal = "";
    let bgColor = "#ffffff";
    let color = "#ffffff";
    let borderColor =
      currdate == moment().format("MMM, YYYY") ? "#1890ff" : "#e6e8eb";
    let bgSel = selected[1] == currdate ? " bg-sel" : "";
    return (
      // <div className="ant-calendar-date" title="">
      //   { listData.map((d) => {
      //     color = d.optionalHoliday
      //         ? "rgba(0, 119, 137, 0.96)"
      //         : "rgba(252, 143, 10, 1)"
      //     bgColor = d.optionalHoliday
      //       ? "rgba(154, 214, 224, 0.96)"
      //         : "rgba(252, 143, 10,0.2)"
      //         return(
      //     // <li style={{
      //     //   backgroundColor: bgColor,
      //     //   color: color,
      //     //   fontSize: "12px",
      //     //   paddingLeft: "5px",
      //     //   paddingRight: "5px",
      //     //   margin: "0px",
      //     //   borderRadius: "100px",
      //     //   justifyContent: "center",
      //     //   marginBottom: "3px"
      //     // }}>{d.name}</li>
      //     <Tooltip title={d.name} color={color}>
      //       <Badge color={color} />
      //     </Tooltip>
      //   )})}
      // </div>
      <div
        className={"ant-calendar-date" + bgSel}
        title=""
        style={{
          width: "90%",
          height: "70px",
          margin: "auto",
          // borderLength: "90%",
          padding: "5px",
          borderTop: "2px solid #f0f0f0",
          borderTopColor: borderColor,
          // backgroundColor: bgSel,
          // bottom: "0",
          // margin: "0",
          // border-left: 2px solid #f51c40,
        }}
      >
        {value.format("MMM")}
        <div
          style={{
            height: "30px",
            width: "85%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          {listData.map((d) => {
            color = d.optionalHoliday
              ? "rgba(0, 119, 137, 0.96)"
              : "rgba(252, 143, 10, 1)";
            bgColor = d.optionalHoliday
              ? "rgba(154, 214, 224, 0.96)"
              : "rgba(252, 143, 10,0.2)";
            return (
              // <li style={{
              //   backgroundColor: bgColor,
              //   color: color,
              //   fontSize: "12px",
              //   paddingLeft: "5px",
              //   paddingRight: "5px",
              //   margin: "0px",
              //   borderRadius: "100px",
              //   justifyContent: "center",
              //   marginBottom: "3px"
              // }}>{d.name}</li>
              <Tooltip title={d.name} color={color}>
                {/* <Badge color={color} /> */}
                <Avatar size={10} style={{ backgroundColor: color }}></Avatar>
              </Tooltip>
            );
          })}
        </div>
      </div>
    );
  };
  const getListData = (value) => {
    let listData = [];
    let currdate = value.format("Do MMM, YYYY");
    let companyHolidayRecord = companyholiday.filter(
      (record) => record.date == currdate
    );
    if (companyHolidayRecord.length > 0) {
      listData = [
        {
          type: companyHolidayRecord[0].name,
          isOptional: companyHolidayRecord[0]?.optionalHoliday,
        },
      ];
    }
    let temp = duration.indexOf(currdate);
    if (temp != -1) {
      if (durStatus[temp] != "Rejected") {
        listData = [
          {
            type: durStatus[temp] == "Approved" ? "On Leave" : "Pending",
            status: durStatus[temp],
          },
        ];
      }
    }
    return listData;
  };

  const onFinish = (values) => {
    let newHoliday = {
      name: values.holidayname,
      date: values.holidaydate.format("Do MMM, YYYY"),
      optionalHoliday: values.holidaytype === "Official" ? false : true,
    };
    let matchingHolidayList = companyholiday.filter((item) => {
      return item.name == newHoliday.name;
    });
    if (!(matchingHolidayList.length > 0)) {
      CompanyHolidayContext.createHoliday(newHoliday)
        .then((response) => {
          showNotification("success", "Success", "Holiday Created successfuly");
          getData();
        })
        .catch((error) => {
          showNotification("error", "Error", "Unable to create holiday!");
        });
      form.resetFields();
    } else {
      showNotification("error", "Error", "This holiday name already exists!");
      form.resetFields();
    }
    setIsModalOpen(false);
  };

  const disabledDate = (current) => {
    let isCurrentYear = current.year() !== new Date().getFullYear();
    let matchingHolidayList = companyholiday.filter(
      (item) => item.date == current.format("Do MMM, YYYY")
    );
    return matchingHolidayList.length > 0 || isCurrentYear;
  };

  const dateCellRender = (value) => {
    const listData = getListData(value);
    let currdate = value.format("Do MMM, YYYY");
    // let companyHolidayRecord = companyholiday?.filter(
    //   (record) => record.date == currdate
    // ) || [];
    // if (companyHolidayRecord.length > 0) {
    //   listData = [
    //     {
    //       type: companyHolidayRecord[0].name,
    //       isOptional: companyHolidayRecord[0]?.optionalHoliday,
    //     },
    //   ];
    // }
    let textVal = value.format("dddd");
    let bgColor =
      textVal == "Sunday" || textVal == "Saturday"
        ? "rgba(74, 67, 67, 0.2)"
        : "rgba(10, 91, 204, 0.2)";
    let color =
      textVal == "Sunday" || textVal == "Saturday"
        ? "rgba(74, 67, 67, 1)"
        : "rgb(10, 91, 204)";
    let borderColor =
      currdate == moment().format("Do MMM, YYYY") ? "#1890ff" : "#e6e8eb";
    let bgSel = selected[0] == currdate ? " bg-sel" : "";
    // rgba(74, 67, 67, 0.2)
    if (!(listData.length == 0)) {
      textVal = listData[0].type;
      color =
        listData[0].type == "On Leave"
          ? "rgba(0, 128, 0,  1)"
          : listData[0].type === "Pending"
          ? "rgb(166 168 69)"
          : listData[0].isOptional
          ? "rgba(0, 119, 137, 0.96)"
          : "rgba(252, 143, 10, 1)";
      bgColor =
        listData[0].type == "On Leave"
          ? "rgb(15, 255, 80,0.2)"
          : listData[0].type === "Pending"
          ? "rgb(205 227 36 / 25%)"
          : listData[0].isOptional
          ? "rgba(154, 214, 224, 0.96)"
          : "rgba(252, 143, 10,0.2)";
    }

    return (
      <div
        className={"ant-calendar-date" + bgSel}
        title=""
        style={{
          width: "90%",
          height: "70px",
          margin: "auto",
          padding: "5px",
          borderTop: "2px solid #f0f0f0",
          borderTopColor: borderColor,
        }}
      >
        {value.format("DD")}
        {/* {textVal == "" ? null : (
          <div style={{height: "30px", width: "85%", display: "flex",  alignItems: "center", justifyContent:"space-evenly"}}>
          <Tooltip title={textVal} color={color}>
                <Avatar size={10} style={{ backgroundColor: color }}></Avatar>
         </Tooltip>
        </div>
        )} */}

        <div>
          <div
            className="events"
            style={{
              backgroundColor: bgColor,
              color: color,
              fontSize: "12px",
              paddingLeft: "5px",
              paddingRight: "5px",
              margin: "0px",
              borderRadius: "100px",
              justifyContent: "center",
            }}
          >
            <div className="present"> {textVal} </div>
          </div>
        </div>
      </div>
    );
  };

  const getHoliday = async () => {
    let data = await CompanyHolidayContext.getAllCompanyHoliday();
    data.sort((a, b) => {
      const dateA = moment(a.date, "Do MMM, YYYY");
      const dateB = moment(b.date, "Do MMM, YYYY");
      return dateA - dateB;
    });

    console.log("all holidays:", data);
    setCompanyholiday(data);
  };
  console.log(totaldays, leavedays);
  return (
    <>
      {role ? null : (
        <Card className="daily">
          <Row gutter={[10, 10]}>
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <div className="leavediv">
                {leavedays != null
                  ? Object.keys(leavedays).map((user, id) => {
                      console.log(user);
                      if (user == "Loss of Pay") {
                        return;
                      }
                      return (
                        <div
                          className="Col-2-center"
                          style={{ background: "#1963A6", color: "white" }}
                        >
                          <p
                            // className="heading"
                            style={{
                              fontWeight: "500",
                              fontSize: "20px",
                            }}
                          >
                            {user}
                          </p>

                          <div
                            className="total-leave"
                            style={{
                              width: "90%",
                            }}
                          >
                            <div className="leave-status">
                              <p
                                className="leave"
                                Total
                                style={{
                                  fontWeight: "500",
                                  fontSize: "15px",
                                  margin: "0px",
                                }}
                              >
                                Total
                              </p>
                              <p
                                style={{
                                  fontWeight: "500",
                                  fontSize: "15px",
                                  margin: "0px",
                                }}
                              >
                                {totaldays[user]}
                              </p>
                            </div>

                            <div className="leave-status">
                              <p
                                className="leave"
                                Total
                                style={{
                                  fontWeight: "500",
                                  fontSize: "15px",
                                  margin: "0px",
                                }}
                              >
                                Availed
                              </p>
                              <p
                                style={{
                                  fontWeight: "500",
                                  fontSize: "15px",
                                  margin: "0px",
                                }}
                              >
                                {totaldays[user] - leavedays[user]}
                              </p>
                            </div>

                            <div className="leave-status">
                              <p
                                className="leave"
                                Total
                                style={{
                                  fontWeight: "500",
                                  fontSize: "15px",
                                  margin: "0px",
                                }}
                              >
                                Remaining
                              </p>
                              <p
                                style={{
                                  fontWeight: "500",
                                  fontSize: "15px",
                                  margin: "0px",
                                }}
                              >
                                {leavedays[user]}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  : null}
              </div>
            </Col>
          </Row>
        </Card>
      )}
      <Card className="daily">
        <Row gutter={[10, 10]}>
          <div
            className="badge-div"
            style={{
              display: "flex",
              flexDirection: "row",
              backgroundColor: "white",
              justifyContent: "space-between",
              paddingTop: "0px",
              borderTopLeftRadius: "10px",
              width: "100%",
              borderTopRightRadius: "10px",
            }}
          >
            <div
              className="rep-div"
              style={{
                display: "flex",
                flexDirection: "row",
                marginBottom: "15px",
                justifyContent: "center",
              }}
            >
              {role ? null : (
                <Button
                  className="calendar-button"
                  style={{
                    cursor: "default",
                    margin: "0 5px 0 0",
                    backgroundColor: "rgba(15, 255, 80, 0.2)",
                  }}
                  disabled
                >
                  <h5 style={{ color: "rgb(0, 128, 0)" }} className="rep-text">
                    Leave
                  </h5>
                </Button>
              )}
              <Button
                className="calendar-button"
                style={{
                  cursor: "default",
                  margin: "0 5px 0 0",
                  backgroundColor: "rgba(154, 214, 224, 0.96)",
                }}
                disabled
              >
                <h5
                  style={{ color: "rgba(0, 119, 137, 0.96)" }}
                  className="rep-text"
                >
                  Optional Holiday
                </h5>
              </Button>
              <Button
                disabled
                className="calendar-button"
                style={{
                  cursor: "default",
                  margin: "0 5px 0 0",
                  backgroundColor: "rgba(252, 143, 10,0.2)",
                }}
              >
                <h5
                  style={{ color: "rgba(252, 143, 10, 1)" }}
                  className="rep-text"
                >
                  Official Holiday
                </h5>
              </Button>
              <Button
                className="calendar-button"
                disabled
                style={{
                  cursor: "default",
                  margin: "0 5px 0 0",
                  backgroundColor: "rgba(74, 67, 67,0.2)",
                }}
              >
                <h5
                  style={{ color: "rgba(74, 67, 67, 1)" }}
                  className="rep-text"
                >
                  Weekly Off
                </h5>
              </Button>
            </div>
            <div className="holiday-button" style={{ display: "flex" }}>
              {/* <div>
                      <HolidayList isHr={isHr} refreshCalendar={getHoliday} />
                    </div> 
                    <div
                      className="resp-leaveButton"
                      style={{
                        display: "flex",
                        alignContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Button
                        className="button-applyleave"
                        style={{
                          borderRadius: "15px",
                          width: "105px",
                          marginRight: "10px",
                          marginTop: "0px",
                        }}
                        type="default"
                        onClick={() => {
                        //   setSecondModal(true);
                        }}
                      >
                        Apply Leave
                      </Button>
                    </div> */}
              <Button
                className="button-white"
                style={{ borderRadius: "15px", marginRight: "5px" }}
                onClick={() => setOpen(true)}
              >
                Holiday List
              </Button>
              {role ? (
                <div>
                  <Button
                    className="button-color"
                    style={{
                      marginLeft: "10px",
                      borderRadius: "15px",
                    }}
                    onClick={() => setIsModalOpen(true)}
                  >
                    Create Holiday
                  </Button>
                  <Modal
                    className="viewAppraisal"
                    title=" Create Holiday"
                    maskClosable={false}
                    footer={null}
                    open={isModalOpen}
                    onCancel={() => setIsModalOpen(false)}
                    closeIcon={
                      <div
                        onClick={() => {
                          setIsModalOpen(false);
                        }}
                        style={{ color: "#ffffff" }}
                      >
                        X
                      </div>
                    }
                  >
                    <Form
                      labelCol={{
                        span: 8,
                      }}
                      wrapperCol={{
                        span: 16,
                      }}
                      initialValues={{
                        remember: true,
                      }}
                      onFinish={onFinish}
                      form={form}
                      autoComplete="off"
                    >
                      <Form.Item
                        labelAlign="left"
                        style={{ marginBottom: "10px" }}
                        label="Holiday Name"
                        name="holidayname"
                        rules={[
                          {
                            required: true,
                            message: "Please Type Holiday Name",
                          },
                        ]}
                      >
                        <Input placeholder="Please Type Holiday Name" />
                      </Form.Item>
                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: "Please Type Holiday Date",
                          },
                        ]}
                        label="Date"
                        name="holidaydate"
                        labelAlign="left"
                        style={{ marginBottom: "10px", width: "100% " }}
                      >
                        <DatePicker
                          style={{ width: "100% " }}
                          disabledDate={disabledDate}
                          // disabledYear={disabledYear}
                          format="Do MMM, YYYY"
                        />
                      </Form.Item>
                      <Form.Item
                        label="Type Of Leave"
                        name="holidaytype"
                        labelAlign="left"
                        style={{ marginBottom: "10px" }}
                        initialValue="Official"
                      >
                        <Radio.Group defaultValue="Official">
                          <Radio value="Optional"> Optional </Radio>
                          <Radio value="Official"> Official </Radio>
                        </Radio.Group>
                      </Form.Item>
                      <div style={{ textAlign: "center" }}>
                        <Button
                          className="button-white"
                          type="default"
                          // style={buttonStyle}
                          onClick={() => form.resetFields()}
                        >
                          Reset
                        </Button>
                        <Button
                          className="button-color"
                          style={{ marginLeft: "5px" }}
                          htmlType="submit"
                          type="primary"
                        >
                          Create New Holiday
                        </Button>
                      </div>
                    </Form>
                  </Modal>
                </div>
              ) : (
                <>
                  <Button
                    className="button-color"
                    style={{ borderRadius: "15px" }}
                    onClick={() => {
                      setApplyModal(true);
                    }}
                  >
                    Apply Leave
                  </Button>

                  <ApplyLeave
                    duration={duration}
                    name={currentUser.displayName}
                    applyModal={applyModal}
                    setApplyModal={setApplyModal}
                    leavedays={leavedays}
                    holidays={companyholiday}
                    tempDur={tempDur}
                    allEmpMap={allEmpMap}
                    allEmpName={allEmpName}
                  />
                </>
              )}
              {role ? (
                <div>
                  <Button
                    className="button-color"
                    style={{
                      marginLeft: "10px",
                      borderRadius: "15px",
                    }}
                    onClick={() => setIsBulkOpen(true)}
                  >
                    Bulk Upload
                  </Button>
                  <Modal
                    className="viewAppraisal"
                    title="Create Holiday"
                    maskClosable={false}
                    footer={null}
                    open={isBulkOpen}
                    onCancel={() => setIsBulkOpen(false)}
                    closeIcon={
                      <div
                        onClick={() => {
                          setIsBulkOpen(false);
                        }}
                        style={{ color: "#ffffff" }}
                      >
                        X
                      </div>
                    }
                  >
                    <Button
                      style={{ marginTop: "10px", marginBottom: "20px" }}
                      onClick={() => downloadFile(template, "template")}
                    >
                      <DownloadOutlined />
                      Download File Template
                    </Button>
                    <CSVReader
                      onUploadAccepted={(results) => {
                        setEnableBulk(false);
                        let temp = [...results.data];
                        let headers = temp.shift();
                        let model = temp.shift();
                        validateCSV(temp, headers, model);
                      }}
                    >
                      {({
                        getRootProps,
                        acceptedFile,
                        ProgressBar,
                        getRemoveFileProps,
                      }) => (
                        <>
                          <div style={styles.csvReader}>
                            <button
                              type="button"
                              {...getRootProps()}
                              style={styles.browseFile}
                            >
                              Browse file
                            </button>
                            <div style={styles.acceptedFile}>
                              {acceptedFile && acceptedFile.name}
                              {!acceptedFile && setEnableBulk(false)}
                              {!acceptedFile && setErrorFile(null)}
                            </div>
                            <button
                              {...getRemoveFileProps()}
                              style={styles.remove}
                            >
                              Remove
                            </button>
                          </div>
                          <ProgressBar
                            style={styles.progressBarBackgroundColor}
                          />
                        </>
                      )}
                    </CSVReader>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginTop: "30px",
                        marginBottom: "30px",
                      }}
                    >
                      {errorFile}
                      <Button
                        className="listExpense"
                        disabled={!enableBulk}
                        type="primary"
                        onClick={handleBulkOnboard}
                        style={{
                          backgroundColor: "#1963A6",
                          borderRadius: "5px",
                        }}
                      >
                        Bulk Upload Holidays
                      </Button>
                    </div>
                  </Modal>
                </div>
              ) : null}
            </div>
          </div>
        </Row>
        <Calendar
          style={{ margin: "auto", marginTop: "30px" }}
          // value={date}
          // onChange={setDate}
          onSelect={(e) =>
            setSelected([e.format("Do MMM, YYYY"), e.format("MMM, YYYY")])
          }
          dateFullCellRender={dateCellRender}
          disabledDate={disabledCalendarDate}
          monthFullCellRender={monthCellRender}
        />
      </Card>

      <Drawer
        width={300}
        title="List of Holiday"
        placement="right"
        onClose={() => setOpen(false)}
        open={open}
      >
        {/* <Table columns={columns} dataSource={holidaylist} > */}
        {/* {JSON.stringify(colors[id])} */}
        {companyholiday.map((holiday, id) => {
          return (
            // colors={}

            <div
              className="holiday-div"
              style={
                holiday.optionalHoliday === true
                  ? {
                      borderRadius: "5px",
                      marginBottom: "10px",
                      paddingRight: "10px",
                      paddingLeft: "10px",
                      justifyContent: "space-evenly",
                      backgroundColor: "rgba(154, 214, 224, 0.96)",
                      boxShadow:
                        " rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset",
                    }
                  : {
                      borderRadius: "5px",
                      marginBottom: "10px",
                      paddingRight: "10px",
                      paddingLeft: "10px",
                      justifyContent: "space-evenly",
                      backgroundColor: "rgba(252, 143, 10,0.2)",
                      boxShadow:
                        "rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset",
                    }
              }
            >
              <Space
                className="holiday-div-image"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0px",
                  justifyContent: "space-evenly",
                }}
                direction="vertical"
              >
                <div
                  className="holiday-div-holiday"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "0px",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    className="holiday-name"
                    style={
                      holiday.optionalHoliday === true
                        ? { color: "rgba(0, 119, 137, 0.96)" }
                        : { color: "rgba(252, 143, 10, 1)" }
                    }
                  >
                    {holiday.name}
                  </Text>
                  {role ? (
                    <DeleteOutlined
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginLeft: "5px",
                        paddingTop: "5px",
                        color: "red",
                      }}
                      onClick={() => {
                        // if (record?.status !== 'Approved')
                        // onDeleteLeave(holiday);
                      }}
                    />
                  ) : null}
                </div>

                <Text
                  style={
                    holiday.optionalHoliday === true
                      ? { color: "rgba(0, 119, 137, 0.96)" }
                      : { color: "rgba(252, 143, 10, 1)" }
                  }
                  type="secondary"
                >
                  {holiday.date} /{" "}
                  {holiday.optionalHoliday === true ? (
                    <span>Optional </span>
                  ) : (
                    <span>Official</span>
                  )}
                </Text>
              </Space>
            </div>
          );
        })}
      </Drawer>
    </>
  );
};

export default Holidays;
