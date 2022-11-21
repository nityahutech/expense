import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Select,
  Table,
  Calendar,
  Modal,
  Tag,
  notification,
  DatePicker,
  Spin
} from "antd";
import { Button } from "antd";
import { Form, Input } from "antd";
import moment from "moment";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import LeaveContext from "../contexts/LeaveContext";
import CompanyHolidayContext from "../contexts/CompanyHolidayContext";
import EmpInfoContext from "../contexts/EmpInfoContext";
import Notification from "./Notification";
import HolidayList from "./HolidayList";
import "../style/leave.css";
import ConfigureContext from "../contexts/ConfigureContext";
import LeaveCreate from "./LeaveCreate";

const Leave = () => {
  const page = "leavePage"
  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  const { Option } = Select;
  const currentUser = JSON.parse(sessionStorage.getItem("user"));
  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const isHr = JSON.parse(sessionStorage.getItem("isHr"));
  const isMgr = JSON.parse(sessionStorage.getItem("isMgr"));
  const [leavedays, setLeaveDays] = useState(null); //leave nature & total in obj
  const [totaldays, setTotalDays] = useState(null); //leave nature & taken in obj
  const [date, setDate] = useState(moment()); //date for calendar
  const [companyholiday, setCompanyholiday] = useState([]); //holidays in array of objects
  const [leaves, setLeaves] = useState([]); //all leaves in array of obects
  const [duration, setDuration] = useState([]); //all days of applied leaves in array
  const [durStatus, setDurStatus] = useState([]); //corresponding status of duration in array
  const [repManager, setRepManager] = useState(); //name of currentUser's reporting manager
  const [secondModal, setSecondModal] = useState(false) //boolean to open apply leave modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); //boolean to open edit leave modal
  const [editedLeave, setEditedLeave] = useState({}); //leave record to be edited
  const [requests, setRequests] = useState([]); //leave requests for managers in array of objects
  const [allRequests, setAllRequests] = useState([]); //leave requests for hr in array of objects
  const [dateSelected, setDateSelected] = useState([]);
  const [dateStart, setDateStart] = useState(null);
  const [dateEnd, setDateEnd] = useState(null);
  const [startSlot, setStartSlot] = useState(null);
  const [endSlot, setEndSlot] = useState(null);
  const [validleaverequest, setValidleaverequest] = useState("false");
  const getHoliday = async () => {
    const allData = await CompanyHolidayContext.getAllCompanyHoliday();
    let d = allData.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    });
    setCompanyholiday(d);
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
  const onFinishEditLeave = (values) => {
    if (
      editedLeave.dateCalc === dateSelected &&
      editedLeave.nature === values.leaveNature &&
      editedLeave.reason === values.reason &&
      editedLeave.slotEnd === values.slotEnd &&
      editedLeave.slotStart === values.slotStart
    ) {
      setIsEditModalOpen(false)
      return
    }
    if (values.leaveNature === "Optional Leave") {
      let optionalHolidays = companyholiday.filter((item) => {
        return item.optionalHoliday;
      });
      let matchOptionalHoliday = optionalHolidays.filter((item) => {
        return item.date == dateSelected[0];
      });
      if (
        matchOptionalHoliday.length > 0 &&
        values.leaveNature != "Optional Leave"
      ) {
        showNotification(
          "error",
          "Error",
          "Optional Leave Can only be apply on Optional Holiday"
        );
        return;
      }
    }
    let tempdur = duration.filter(dates => !editedLeave.dateCalc.includes(dates))
    let matchingdates = dateSelected.filter(item => tempdur.includes(item))
    if (matchingdates.length > 0) {
      showNotification(
        "error",
        "Error",
        "Leave already applied on one of the days"
      );
      return;
    }
    let newLeave = {
      empId: currentUser.uid,
      approver: values.approver,
      date: dateSelected,
      name: currentUser.displayName,
      nature: values.leaveNature,
      slotStart: values.slotStart,
      slotEnd: dateSelected.length == 1 ? values.slotStart : values.slotEnd,
      reason: values.reason,
      status: "Pending",
    };
    if (validleaverequest) {
      LeaveContext.updateLeaves(editedLeave.id, newLeave)
        .then(response => {
          getData();
          showNotification("success", "Success", "Leave edited successfully");
        })
        .catch(error => {
          showNotification(
            "error",
            "Error",
            "Unable to process leave request!"
          );
        })
      setDateSelected([]);
      setDateStart(null);
      setStartSlot(null);
      setDateEnd(null);
      setEndSlot(null);
      setValidleaverequest(false);
      setIsEditModalOpen(false)
    } else {
      showNotification(
        "error",
        "Error",
        "Unable to process leave request!"
      );
    }
  }
  const onFinish = (values) => {
    if (values.leaveNature === "Optional Leave") {
      let optionalHolidays = companyholiday.filter((item) => {
        return item.optionalHoliday;
      });
      let matchOptionalHoliday = optionalHolidays.filter((item) => {
        return item.date == dateSelected[0];
      });
      if (
        matchOptionalHoliday.length > 0 &&
        values.leaveNature != "Optional Leave"
      ) {
        showNotification(
          "error",
          "Error",
          "Optional Leave Can only be apply on Optional Holiday"
        );
        return;
      }
    }
    let matchingdates = dateSelected.filter(item => duration.includes(item))
    if (matchingdates.length > 0) {
      showNotification(
        "error",
        "Error",
        "Leave already applied on one of the days"
      );
      return;
    }
    let newLeave = {
      empId: currentUser.uid,
      approver: values.approver,
      date: dateSelected,
      name: currentUser.displayName,
      nature: values.leaveNature,
      slotStart: values.slotStart,
      slotEnd: dateSelected.length == 1 ? values.slotStart : values.slotEnd,
      reason: values.reason,
      status: "Pending",
    };
    if (validleaverequest) {
      LeaveContext.createLeave(newLeave)
        .then(response => {
          getData();
          showNotification("success", "Success", "Leave apply successfully");
        })
        .catch(error => {
          showNotification(
            "error",
            "Error",
            "Unable to process leave request!"
          );
        })
      form.resetFields();
      setDateSelected([]);
      setDateStart(null);
      setStartSlot(null);
      setDateEnd(null);
      setEndSlot(null);
      setValidleaverequest(false);
      setSecondModal(false);
    } else {
      showNotification(
        "error",
        "Error",
        "Unable to process leave request!"
      );
    }
  };
  const getConfigurations = async () => {
    let data = await ConfigureContext.getConfigurations(page)
    let sorted = Object.keys(data?.leaveNature).sort((k1, k2) => k1 < k2 ? -1 : k1 > k2 ? 1 : 0)
    let temp = {}
    sorted.map((nat) => {
      temp[`${nat}`] = data.leaveNature[`${nat}`]
    })
    setTotalDays(temp)
    getData({ ...temp })
  }
  const getData = async (temp) => {
    setLoading(true);
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
    let tempDays = temp ? temp : { ...totaldays }
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
    setDuration([].concat.apply([], array));
    setDurStatus(stats);
  };
  const getRequestData = async () => {
    let reqData = await LeaveContext.getAllByApprover(currentUser.displayName);
    let req = reqData.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    });
    getDateFormatted(req);
    getDateSorted(req);
    setRequests(req);
  };
  const getAllRequests = async () => {
    let reqData = await LeaveContext.getLeaves();
    let req = reqData.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    });
    getDateFormatted(req);
    getDateSorted(req);
    setAllRequests(req);
  };
  const onDeleteLeave = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete Leave record?",
      okText: "Yes",
      okType: "danger",

      onOk: () => {
        LeaveContext.deleteLeave(record.id)
          .then((response) => {
            showNotification("success", "Success", "Leave deleted successfully!")
            getData();
          })
          .catch((error) => {
            showNotification("error", "Error", error.message)
          });
      },
    });
  };
  const columns = [
    {
      title: "Duration",
      dataIndex: "date",
      width: 240,
      align: "left",
      sorter: (c, d) => {
        let a = moment(c.dateCalc[0], "Do MMM, YYYY");
        let b = moment(d.dateCalc[0], "Do MMM, YYYY");
        return a - b;
      },
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Nature of Leave",
      dataIndex: "nature",
      width: 150,
      align: "left",
      sorter: (a, b) => {
        return a.nature !== b.nature ? (a.nature < b.nature ? -1 : 1) : 0;
      },
      sortDirections: ["ascend", "descend"],
    },
    // {
    //     title: 'Slot',
    //     dataIndex: 'slot',
    //     width: 100,
    //     align: "left",
    //     sorter: (a, b) => {
    //         return a.slot !== b.slot ? (a.slot < b.slot ? -1 : 1) : 0;
    //     },
    //     sortDirections: ["ascend", "descend"],

    // },
    {
      title: "No. Of Days",
      dataIndex: "len",
      width: 150,
      align: "left",
      sorter: (a, b) => {
        return a.len !== b.len ? (a.len < b.len ? -1 : 1) : 0;
      },
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Reason",
      dataIndex: "reason",
      width: 150,
    },
    {
      title: "Approver",
      dataIndex: "approver",
      align: "left",
      width: 150,
    },
    {
      title: "Status",
      className: "row5",
      key: "status",
      dataIndex: "status",
      align: "left",
      width: 100,
      sorter: (a, b) => {
        return a.status !== b.status ? (a.status < b.status ? -1 : 1) : 0;
      },
      sortDirections: ["ascend", "descend"],
      render: (_, { status }) =>
        status !== "" && (
          <Tag
            style={{ width: "70px", color: 'black' }}
            className="statusTag"
            color={
              status === "Approved"
                ? "rgba(15, 255, 80, 0.2)"
                : status === "Pending"
                  ? "rgba(205, 227, 36, 0.25)"
                  : "volcano"
            }
            key={status}
          >
            {status}
          </Tag>
        ),
    },
    {
      title: "Comment",
      dataIndex: "comment",
      width: 150,
    },
    {
      key: "5",
      title: "Actions",
      fixed: "right",
      width: 80,
      render: (record) => {
        return (
          <>
            <DeleteOutlined
              disabled={record?.status === "Approved"}
              onClick={() => {
                if (record?.status !== "Approved") onDeleteLeave(record);
              }}
              style={
                record?.status === "Approved"
                  ? {
                    color: "green",
                    cursor: "not-allowed",
                    marginLeft: 10,
                  }
                  : record?.status === "Pending"
                    ? { color: "blue", marginLeft: 10 }
                    : { color: "red", marginLeft: 10 }
              }
            />
            <EditOutlined
              disabled={record?.status === "Approved"}
              onClick={() => {
                if (record?.status !== "Approved") {
                  setEditedLeave(record);
                  setIsEditModalOpen(true);
                  setDateSelected(record.dateCalc);
                  setDateStart(moment(record.dateCalc, "Do MMM, YYYY"));
                  setStartSlot(record.slotStart);
                  setDateEnd(moment(record.dateCalc, "Do MMM, YYYY"));
                  setEndSlot(record.slotEnd);
                  setValidleaverequest(true);
                }
              }}
              style={
                record?.status === "Approved"
                  ? {
                    color: "green",
                    cursor: "not-allowed",
                    marginLeft: 10,
                  }
                  : record?.status === "Pending"
                    ? { color: "blue", marginLeft: 10 }
                    : { color: "red", marginLeft: 10 }
              }
            />
          </>
        );
      },
    },
  ];
  useEffect(() => {
    setLoading(true);
    getConfigurations();
    getHoliday();
    const timer = setTimeout(() => {
      setLoading(false);
    }, 750);
    if (isHr) getAllRequests();
    if (isMgr) getRequestData();
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isHr) getAllRequests();
    if (isMgr) getRequestData();
  }, [loading]);
  const getDateFormatted = (data) => {
    data.forEach((dur) => {
      let len = dur.date.length;
      dur.len = len - (dur.slotStart == 'Full Day' ? 0 : 0.5) - (dur.date.length == 1 ? 0 : (dur.slotEnd == 'Full Day' ? 0 : 0.5));
      dur.dateCalc = dur.date;
      dur.date =
        dur.date.length == 1 ? dur.date[0] : dur.date[0] + " to " + dur.date[dur.date.length - 1];
    });
  };
  const getDateSorted = (data) => {
    data.sort(function (c, d) {
      let a = moment(c.dateCalc[0], "Do MMM, YYYY");
      let b = moment(d.dateCalc[0], "Do MMM, YYYY");
      return a - b;
    });
  };
  const showNotification = (type, msg, desc) => {
    notification[type]({
      message: msg,
      description: desc,
    });
  };
  const validateLeaveRequest = (noOfDays, leavetype) => {
    if (leavetype != null && dateSelected.length - noOfDays > 0) {
      if (leavedays[leavetype] < dateSelected.length - noOfDays) {
        showNotification(
          "error",
          "Error",
          "Leave requested is more than available leave"
        );
        setValidleaverequest(false);
      } else {
        setValidleaverequest(true);
      }
    }
  };
  const onLeaveNatureChange = (value) => {
    if (value == "Optional Leave") {
      if (dateSelected.length == 1) {
        validateLeaveRequest(1, value);
      } else {
        setValidleaverequest(false);
        showNotification(
          "error",
          "Error",
          "Optional Leave can only be for 1 full day!"
        );
      }
    }
    let noOfDays = 0;
    if (endSlot != "Full Day") {
      noOfDays = 0.5;
    }
    if (startSlot != "Full Day") {
      noOfDays += 0.5;
    }
    validateLeaveRequest(noOfDays, value);
  };
  const onLeaveDateChange = (e) => {
    let tempDateEnd = dateEnd
    if (e != undefined) {
      tempDateEnd = e
    }
    let holidayList = companyholiday.map((hol) => {
      return !hol.optionalHoliday ? hol.date : null;
    });
    let temp = [];
    try {
      for (
        let i = dateStart.clone();
        i.isSameOrBefore(tempDateEnd);
        i = i.clone().add(1, "days")
      ) {
        let day = i.format("dddd");
        if (!(day == "Saturday" || day == "Sunday")) {
          if (
            !holidayList.includes(i.format("Do MMM, YYYY")) &&
            !duration.includes(i.format("Do MMM, YYYY"))
          ) {
            temp.push(i.format("Do MMM, YYYY"));
          }
        }
      }
    } catch (error) {
    }
    setDateSelected(temp);
  };
  const dateCellRender = (value,) => {
    const listData = getListData(value);
    let textVal = value.format("dddd");
    let bgColor = textVal == "Sunday" || textVal == "Saturday" ? "rgba(74, 67, 67, 0.2)" : "rgba(10, 91, 204, 0.2)";
    let color = textVal == "Sunday" || textVal == "Saturday" ? "rgba(74, 67, 67, 1)" : "rgb(10, 91, 204)";

    if (!(listData.length == 0)) {
      textVal = listData[0].type;
      color = listData[0].type == "On Leave" ?
        "rgba(0, 128, 0,  1)" : listData[0].type === "Pending" ?
          "rgb(166 168 69)" : listData[0].isOptional ?
            "rgba(0, 119, 137, 0.96)" : "rgba(252, 143, 10, 1)";
      bgColor = listData[0].type == "On Leave" ?
        "rgb(15, 255, 80,0.2)" : listData[0].type === "Pending" ?
          "rgb(205 227 36 / 25%)" : listData[0].isOptional ?
            "rgba(154, 214, 224, 0.96)" : "rgba(252, 143, 10,0.2)";
    }

    return (
      <div >
        <div className="events"
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
    );
  };
  const reqColumns = [
    {
      title: "Duration",
      dataIndex: "date",
      width: 240,
      align: "left",
      sorter: (c, d) => {
        let a = moment(c.dateCalc[0], "Do MMM, YYYY");
        let b = moment(d.dateCalc[0], "Do MMM, YYYY");
        return a - b;
      },
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Employee Name",
      dataIndex: "name",
      width: 150,
      sorter: (a, b) => {
        return a.name !== b.name ? (a.name < b.name ? -1 : 1) : 0;
      },
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Nature of Leave",
      dataIndex: "nature",
      width: 150,
    },
    // {
    //     title: 'Slot',
    //     dataIndex: 'slot',
    //     width: 100,
    //     align: "left",
    //     sorter: (a, b) => {
    //         return a.slot !== b.slot ? (a.slot < b.slot ? -1 : 1) : 0;
    //     },
    //     sortDirections: ["ascend", "descend"],

    // },
    {
      title: "No. Of Days",
      dataIndex: "len",
      width: 150,
      align: "left",
      sorter: (a, b) => {
        return a.len !== b.len ? (a.len < b.len ? -1 : 1) : 0;
      },
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Reason",
      dataIndex: "reason",
      width: 150,
    },
    {
      title: "Approver",
      dataIndex: "approver",
      width: 150,
    },
    {
      title: "Status",
      className: "row5",
      key: "status",
      dataIndex: "status",
      align: "left",
      width: 100,
      sorter: (a, b) => {
        return a.status !== b.status ? (a.status < b.status ? -1 : 1) : 0;
      },
      sortDirections: ["ascend", "descend"],
      render: (_, { status }) =>
        status !== "" && (
          <Tag

            style={{ width: "70px", color: 'black' }}
            className="statusTag"
            color={
              status === "Approved"
                ? "rgba(15, 255, 80, 0.2)"
                : status === "Pending"
                  ? "rgba(205, 227, 36, 0.25)"
                  : "volcano"
            }
            key={status}
          >
            {status}
          </Tag>
        ),
    },
    {
      title: "Comment",
      dataIndex: "comment",
      width: 150,
    },
    {
      key: "5",
      title: "Actions",
      fixed: "right",
      width: 80,
      render: (record) => {
        return (
          <>
            {
              <>
                <DeleteOutlined
                  onClick={() => {
                    onDeleteLeave(record);
                  }}
                  style={
                    record?.status === "Approved"
                      ? { color: "green", marginLeft: 10 }
                      : record?.status === "Pending"
                        ? { color: "blue", marginLeft: 10 }
                        : { color: "red", marginLeft: 10 }
                  }
                />
              </>
            }
          </>
        );
      },
    },
  ];
  function disabledDate(current) {
    if (
      moment(current).day() === 0 ||
      current.day() === 6 ||
      moment(current).isBefore(moment().startOf("day"))
    ) {
      return true;
    }
    if (
      dateStart != null && dateStart != 0
        ? moment(current).isBefore(dateStart.startOf("day"))
        : false
    ) {
      return true;
    }
    let tempdur = [...duration]
    if (isEditModalOpen) {
      tempdur = duration.filter(dates => !editedLeave.dateCalc.includes(dates))
    }
    if (tempdur.includes(moment(current).format("Do MMM, YYYY"))) {
      return true;
    }
    let matchOptionalHoliday = companyholiday.filter((item) => {
      return item.optionalHoliday
        ? false
        : item.date == moment(current).format("Do MMM, YYYY");
    });
    if (matchOptionalHoliday.length != 0) {
      return true;
    }
    return false;
  }
  const disabledCalendarDate = (current) => {
    return moment(current).day() === 0 || current.day() === 6;
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
  const disableEnd = () => {
    if (dateStart == null || dateStart == 0) {
      if (isEditModalOpen) {
        form1.setFieldsValue({ dateEnd: null })
      } else {
        form.setFieldsValue({ dateEnd: null })
      }
      return true
    }
    return false
  }
  const disableNature = () => {
    if (dateStart == null || dateStart == 0) {
      if (isEditModalOpen) {
        form1.setFieldsValue({ leaveNature: null })
      } else {
        form.setFieldsValue({ leaveNature: null })
      }
      return true
    }
    if (dateEnd == null || dateEnd == 0) {
      if (isEditModalOpen) {
        form1.setFieldsValue({ leaveNature: null })
      } else {
        form.setFieldsValue({ leaveNature: null })
      }
      return true
    }
    return false
  }
  const disableEndSlot = () => {
    if (dateStart == null || dateStart == 0) {
      return true
    }
    if (dateEnd != null && dateEnd != 0 ?
      dateStart.format("DDMMYYYY") == dateEnd.format("DDMMYYYY") : false
    ) {
      return true
    }
    return false
  }
  const disabledLeaveNature = (u) => {
    if (leavedays[u] <= 0) {
      return true
    }
    if ((u == "Optional Leave" || u == "Sick Leave") && dateSelected.length > 1) {
      return true
    }
    if (u == "Optional Leave" && dateSelected.length == 1) {
      let holidayMatch = companyholiday.filter((hol) => hol.optionalHoliday ? hol.date == dateSelected[0] : false)
      return !(holidayMatch.length > 0)
    }
    if (u == "Sick Leave" && dateSelected.length == 1) {
      return dateStart != null || dateStart != undefined ? !(dateStart.format("DD-MM-yyyy") == moment().format("DD-MM-yyyy") || dateStart.format("DD-MM-yyyy") == moment().add(1, 'days').format("DD-MM-yyyy")) : false
    }
    return false
  }
  return (
    <>
      <Row
        style={{
          display: "none",
          padding: 24,
          background: "#fff",
          minHeight: 150,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          backgroundColor: "#e9eaea",
        }}
        gutter={[16, 0]}
      >
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <div className="leavediv">
            {leavedays != null ?
              (Object.keys(leavedays).map((user, id) => {
                return (
                  <div
                    className="Col-2-center"
                    style={{ background: colors[id], color: "#fff" }}
                  >
                    <p
                      className="heading"
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
              }))
              : null}

          </div>
        </Col>
        {/* </Col> */}

        <Col
          xl={24} lg={24} md={24} sm={24} xs={24} span={2}
          style={{
            marginTop: "10px",
          }}
        >
          {/* <HolidayList isHr={isHr} refreshCalendar={addNewHoliday} /> */}
          <div
            className="calender-div"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",

            }}
          >
            <div
              className="badge-div"
              style={{
                display: "flex",
                flexDirection: "row",
                backgroundColor: "white",
                justifyContent: "space-between",
                paddingTop: "0px",
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
              }}
            >
              {/* <Typography.Title level={4} >Calendar</Typography.Title> */}
              <div
                className="rep-div"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <Button
                  className="reprentation"
                  style={{
                    cursor: 'default',
                    marginLeft: '10px',
                    marginRight: "5px", marginTop: '10px',
                    backgroundColor: "rgba(15, 255, 80, 0.2)",
                  }}
                >
                  <h5
                    style={{ color: "rgb(0, 128, 0)" }}
                    className="rep-text"
                  >
                    Leave
                  </h5>
                </Button>
                <Button
                  className="reprentation"
                  style={{
                    cursor: 'default',
                    marginRight: "5px", marginTop: '10px',
                    backgroundColor: "rgba(154, 214, 224, 0.96)",
                  }}
                >
                  <h5
                    style={{ color: "rgba(0, 119, 137, 0.96)" }}
                    className="rep-text"
                  >
                    Optional Holiday
                  </h5>
                </Button>
                <Button
                  className="reprentation"
                  style={{
                    cursor: 'default',
                    marginRight: "5px", marginTop: '10px',
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
                  className="reprentation"
                  style={{
                    cursor: 'default',
                    marginRight: "5px", marginTop: '10px',
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
              <div className='holiday-button' style={{ display: 'flex' }}>
                <div>
                  <HolidayList isHr={isHr} refreshCalendar={getHoliday} />
                </div>
                <div className="resp-leaveButton" style={{
                  display: 'flex',
                  alignContent: 'center',
                  alignItems: 'center'
                }}>
                  <div>
                    <LeaveCreate isHr={isHr}
                    // refreshCalendar={getHoliday}
                    />
                  </div>
                  <Button className="button-applyleave"
                    style={{ borderRadius: '15px', width: '105px', marginRight: "10px", marginTop: '0px' }}
                    type="default" onClick={() => { setSecondModal(true) }}>
                    Apply Leave
                  </Button>
                </div>
              </div>
            </div>

            <Calendar
              style={{
                paddingLeft: "10px",
                paddingRight: "10px",
                borderBottomLeftRadius: "10px",
                borderBottomRightRadius: "10px",
              }}
              value={date}
              onChange={setDate}
              dateCellRender={dateCellRender}
              disabledDate={disabledCalendarDate}

            />

          </div>
        </Col>

        <Modal className='viewAppraisal'
          bodyStyle={{ overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }}
          footer={null}
          title="Apply Leave"
          centered
          visible={secondModal}
          width={450}
          closeIcon={
            <div
              onClick={() => {
                setSecondModal(false);
              }}
              style={{ color: "#ffffff" }}
            >
              X
            </div>
          }
        >
          <Row
            className="apply-leave"
            style={{
              marginTop: "10px",
            }}
          >
            <Col xl={24} lg={24} md={24} sm={24} xs={24}
              style={{
                background: "flex",
                padding: "10px",
                // width: "400px",
              }}
            >
              <Form
                {...Leave}
                labelCol={{
                  span: 8,
                }}
                wrapperCol={{
                  span: 16,
                }}
                form={form}
                onFinish={onFinish}
              // layout="vertical"
              >

                <Row gutter={[16, 0]} className='row-one-div' style={{ display: 'flex', justifyContent: 'space-around' }}>
                  <Col xl={24} lg={24} md={24} sm={24} xs={24} >
                    <Form.Item required={false}
                      labelAlign="left"
                      style={{
                        marginBottom: "20px",
                        color: "white",
                        minWidth: "70px",
                      }}
                      label={
                        <label style={{ color: "black", fontWeight: "400" }}>
                          Start Date<span style={{ color: "red" }}> *</span>
                        </label>
                      }
                      name="dateStart"
                      rules={[
                        {
                          required: true,
                          message: 'Please Select Date',
                        },
                      ]}
                    >
                      <DatePicker
                        style={{ width: "100%" }}
                        format="Do MMM, YYYY"
                        onChange={(e) => {
                          setDateStart(e);
                          onLeaveDateChange();
                        }}
                        disabledDate={disabledDate}
                      />
                    </Form.Item>
                  </Col>
                  <Col xl={24} lg={24} md={24} sm={24} xs={24} >
                    <Form.Item
                      labelAlign="left"
                      name="slotStart"
                      style={{ marginBottom: "25px", }}
                      className="div-slot"
                      label={
                        <label style={{ color: "black", fontWeight: "400" }}>
                          Start Slot<span style={{ color: "red" }}> *</span>
                        </label>
                      }
                      initialValue={"Full Day"}
                    >
                      <Select
                        style={{ width: "100%" }}
                        onChange={(e) => {
                          setStartSlot(e);
                          onLeaveDateChange();
                        }}
                      >
                        <Option value="Full Day">Full Day</Option>
                        <Option value="Half Day">Half Day</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={[16, 0]} className='row-one-div' style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                  <Col xl={24} lg={24} md={24} sm={24} xs={24} >
                    <Form.Item required={false}
                      labelAlign="left"
                      style={{ marginBottom: "20px", color: "white", }}
                      label={
                        <label style={{ color: "black", fontWeight: "400" }}>
                          End Date<span style={{ color: "red" }}> *</span>
                        </label>
                      }
                      name="dateEnd"
                      rules={[
                        {
                          required: true,
                          message: 'Please Select Date',
                        },
                      ]}
                    >
                      <DatePicker
                        style={{ width: "100%" }}
                        format="Do MMM, YYYY"
                        onChange={(e) => {
                          setDateEnd(e);
                          onLeaveDateChange(e);
                        }}
                        disabledDate={disabledDate}
                        disabled={disableEnd()}
                      />
                    </Form.Item>
                  </Col>

                  <Col xl={24} lg={24} md={24} sm={24} xs={24} >
                    <Form.Item
                      labelAlign="left"
                      name="slotEnd"
                      style={{ marginBottom: "25px", }}
                      className="div-slot"
                      label={
                        <label style={{ color: "black", fontWeight: "400" }}>
                          End Slot<span style={{ color: "red" }}> *</span>
                        </label>
                      }
                      initialValue={"Full Day"}
                    >
                      <Select
                        style={{ width: "100%" }}
                        disabled={disableEndSlot()}
                        onChange={(e) => {
                          setEndSlot(e);
                          onLeaveDateChange();
                        }}
                      >
                        <Option value="Full Day">Full Day</Option>
                        <Option value="Half Day">Half Day</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item required={false}
                  labelAlign="left"
                  name="leaveNature"
                  style={{ marginBottom: "20px" }}
                  label={
                    <label style={{ color: "black", fontWeight: "400" }}>
                      Nature of Leave<span style={{ color: "red" }}> *</span>
                    </label>
                  }
                  rules={[
                    {
                      required: true,
                      message: 'Select Nature of Leave',
                    },
                  ]}
                >
                  <Select
                    placeholder="Select an option"
                    allowClear
                    disabled={disableNature()}
                    onChange={onLeaveNatureChange}
                  >
                    {leavedays != null ?
                      (Object.keys(leavedays).map((u) => (
                        <Option
                          disabled={disabledLeaveNature(u)}
                          value={u}
                        >
                          {u}
                        </Option>
                      )))
                      : null}
                    <Option value={"Loss of Pay"}>Loss of Pay</Option>
                  </Select>
                </Form.Item>

                <Form.Item required={false}
                  labelAlign="left"
                  name="reason"
                  style={{ marginBottom: "20px" }}
                  label={
                    <label style={{ color: "black", fontWeight: "400" }}>
                      Reason<span style={{ color: "red" }}> *</span>{" "}
                    </label>
                  }
                  rules={[
                    {
                      required: true,
                      message: "Please Enter a Reason"
                    }
                  ]}
                >
                  <Input.TextArea
                    maxLength={60}
                    onChange={(e) => {
                      const inputval = e.target.value;
                      const newVal =
                        inputval.substring(0, 1).toUpperCase() +
                        inputval.substring(1);
                      form.setFieldsValue({ reason: newVal });
                    }}
                  />
                </Form.Item>

                <Form.Item
                  labelAlign="left"
                  name="approver"
                  style={{ marginBottom: "20px" }}
                  label={
                    <label style={{ color: "black", fontWeight: "400" }}>
                      Approver<span style={{ color: "red" }}> *</span>
                    </label>
                  }
                  initialValue={repManager}
                >
                  <Input
                    disabled
                  />
                </Form.Item>

                <Form.Item
                  style={{ paddingTop: "px" }}
                  wrapperCol={{
                    offset: 8,
                    span: 24,
                  }}
                >
                  <Button type="primary" htmlType="submit" >
                    Submit
                  </Button>
                  <Button
                    htmlType="button"
                    type='default'
                    style={{ marginLeft: "10px" }}
                    onClick={() => {
                      form.resetFields();
                      setDateSelected([]);
                      setDateStart(null);
                      setStartSlot(null);
                      setDateEnd(null);
                      setEndSlot(null);
                      setValidleaverequest(false);
                    }}
                  >
                    Reset
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Modal>

        {isMgr ? <Notification data={[...requests]} /> : null}

        {isMgr && !isHr ? (
          <Row
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignContent: "flex-start",
              backgroundColor: "white",
              borderRadius: "10px",
              padding: "10px",
              marginTop: "10px",
            }}
          >
            <Col
              span={24}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignContent: "flex-start",
                color: "black",
                width: "100rem",
              }}
            >
              <h3>All Requests</h3>
            </Col>

            <Col
              xl={24}
              lg={24}
              md={24}
              sm={24}
              xs={24}
              style={{
                background: "flex",
                padding: "10px",
              }}
            >
              <div >
                <Table
                  className="leaveTable"
                  columns={reqColumns}
                  dataSource={requests}
                  pagination={{
                    position: ["bottomCenter"],
                  }}
                  scroll={{ x: 600 }}
                  size="small"

                />
              </div>
            </Col>
          </Row>
        ) : null}
        {isHr ? (
          <Row
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignContent: "flex-start",
              backgroundColor: "white",
              borderRadius: "10px",
              padding: "10px",
              marginTop: "10px",
            }}
          >
            <Col
              span={24}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignContent: "flex-start",
                color: "black",
                width: "100rem",
              }}
            >
              <h3>All Requests</h3>
            </Col>

            <Col
              xl={24}
              lg={24}
              md={24}
              sm={24}
              xs={24}
              style={{
                background: "flex",
                padding: "10px",
              }}
            >
              <div className="history-table">
                <Table
                  className="leaveTable"
                  columns={reqColumns}
                  dataSource={allRequests}
                  pagination={{
                    position: ["bottomCenter"],
                  }}
                  scroll={{ x: 600 }}
                  size="small"
                />
              </div>
            </Col>
          </Row>
        ) : null}

        <Row
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignContent: "flex-start",
            backgroundColor: "white",
            borderRadius: "10px",
            padding: "10px",
            marginTop: "10px",
          }}
        >
          <Col
            span={24}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignContent: "flex-start",
              color: "black",
              width: "100rem",
            }}
          >
            <h3>Employee Leave History</h3>
          </Col>

          <Col
            xl={24}
            lg={24}
            md={24}
            sm={24}
            xs={24}
            style={{
              background: "flex",
              padding: "10px",
            }}
          >
            <div className="history-table">
              <Table
                className="leaveTable "
                columns={columns}
                dataSource={leaves}
                pagination={{
                  position: ["bottomCenter"],
                }}
                scroll={{ x: 600 }}
                size="small"
              />
            </div>
          </Col>
        </Row>
      </Row>
      <Modal
        // bodyStyle={{ overflowY: 'scroll' }}
        // style={{ height: 'calc(100vh - 200px)' }}
        bodyStyle={{ overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }}
        className="viewAppraisal"
        centered
        width={450}
        visible={isEditModalOpen}
        footer={null}
        destroyOnClose
        title="Edit Applied Leave"
        closeIcon={
          <div
            onClick={() => {
              setDateSelected([]);
              setDateStart(null);
              setStartSlot(null);
              setDateEnd(null);
              setEndSlot(null);
              setValidleaverequest(false);
              setIsEditModalOpen(false);
            }}
            style={{ color: "#ffffff" }}
          >
            X
          </div>
        }
      >
        <Row
          className="apply-leave"
          style={{
            marginTop: "10px",
          }}
        >
          <Col xl={24} lg={24} md={24} sm={24} xs={24}
            style={{
              background: "flex",
              padding: "10px",
              // width: "400px",
            }}
          >
            <Form
              {...Leave}
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              initialValues={{
                remember: true,
              }}
              form={form1}
              onFinish={onFinishEditLeave}
            >

              <Row gutter={[16, 0]} className='row-one-div' style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Col xl={24} lg={24} md={24} sm={24} xs={24} >
                  <Form.Item required={false}

                    labelAlign="left"
                    style={{
                      marginBottom: "20px",
                      color: "white",

                      minWidth: "70px",
                    }}
                    label={
                      <label style={{ color: "black", fontWeight: "400" }}>
                        Start Date<span style={{ color: "red" }}> *</span>
                      </label>
                    }
                    name="dateStart"
                    rules={[
                      {
                        required: true,
                        message: 'Please Select Date',
                      },
                    ]}
                    initialValue={editedLeave.dateCalc == null ? null : moment(editedLeave.dateCalc[0], 'Do MMM, YYYY')}
                  >
                    <DatePicker
                      style={{ width: "100%" }}
                      format="Do MMM, YYYY"
                      onChange={(e) => {
                        setDateStart(e);
                        onLeaveDateChange();
                      }}
                      disabledDate={disabledDate}
                    />
                  </Form.Item>
                </Col>

                <Col xl={24} lg={24} md={24} sm={24} xs={24} >
                  <Form.Item
                    labelAlign="left"
                    name="slotStart"
                    style={{ marginBottom: "25px", }}
                    className="div-slot"
                    label={
                      <label style={{ color: "black", fontWeight: "400" }}>
                        Start Slot<span style={{ color: "red" }}> *</span>
                      </label>
                    }
                    initialValue={editedLeave.slotStart}
                  >
                    <Select
                      style={{ width: "100%" }}
                      onChange={(e) => {
                        setStartSlot(e);
                        onLeaveDateChange();
                      }}
                    >
                      <Option value="Full Day">Full Day</Option>
                      <Option value="Half Day">Half Day</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[16, 0]} className='row-one-div' style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <Col xl={24} lg={24} md={24} sm={24} xs={24} >
                  <Form.Item required={false}
                    labelAlign="left"
                    style={{ marginBottom: "20px", color: "white", }}
                    label={
                      <label style={{ color: "black", fontWeight: "400" }}>
                        End Date<span style={{ color: "red" }}> *</span>
                      </label>
                    }
                    name="dateEnd"
                    rules={[
                      {
                        required: true,
                        message: 'Please Select Date',
                      },
                    ]}
                    initialValue={editedLeave.dateCalc == null ? null : moment(editedLeave.dateCalc[editedLeave.dateCalc.length - 1], 'Do MMM, YYYY')}
                  >
                    <DatePicker
                      style={{ width: "100%" }}
                      format="Do MMM, YYYY"
                      onChange={(e) => {
                        setDateEnd(e);
                        onLeaveDateChange(e);
                      }}
                      disabledDate={disabledDate}
                      disabled={disableEnd()}
                    />
                  </Form.Item>
                </Col>
                <Col xl={24} lg={24} md={24} sm={24} xs={24} >
                  <Form.Item
                    labelAlign="left"
                    name="slotEnd"
                    style={{ marginBottom: "25px", }}
                    className="div-slot"
                    label={
                      <label style={{ color: "black", fontWeight: "400" }}>
                        End Slot<span style={{ color: "red" }}> *</span>
                      </label>
                    }
                    initialValue={editedLeave.slotEnd}
                  >
                    <Select
                      style={{ width: "100%" }}
                      disabled={disableEndSlot()}
                      onChange={(e) => {
                        setEndSlot(e);
                        onLeaveDateChange();
                      }}
                    >
                      <Option value="Full Day">Full Day</Option>
                      <Option value="Half Day">Half Day</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item required={false}
                labelAlign="left"
                name="leaveNature"
                style={{ marginBottom: "20px" }}
                label={
                  <label style={{ color: "black", fontWeight: "400" }}>
                    Nature of Leave<span style={{ color: "red" }}> *</span>
                  </label>
                }
                rules={[
                  {
                    required: true,
                    message: 'Select Nature of Leave',
                  },
                ]}
                initialValue={editedLeave.nature}
              >
                <Select
                  placeholder="Select an option"
                  allowClear
                  disabled={disableNature()}
                  onChange={onLeaveNatureChange}
                >
                  {leavedays != null ?
                    (Object.keys(leavedays).map((u) => (
                      <Option
                        disabled={disabledLeaveNature(u)}
                        value={u}
                      >
                        {u}
                      </Option>
                    )))
                    : null}
                  <Option value={"Loss of Pay"}>Loss of Pay</Option>
                </Select>
              </Form.Item>

              <Form.Item required={false}
                initialValue={editedLeave.reason}
                labelAlign="left"
                name="reason"
                style={{ marginBottom: "20px" }}
                label={
                  <label style={{ color: "black", fontWeight: "400" }}>
                    Reason<span style={{ color: "red" }}> *</span>{" "}
                  </label>
                }
                rules={[
                  {
                    required: true,
                    message: "Please Enter a Reason"
                  }
                ]}
              >
                <Input.TextArea
                  maxLength={60}
                  onChange={(e) => {
                    const inputval = e.target.value;
                    const newVal =
                      inputval.substring(0, 1).toUpperCase() +
                      inputval.substring(1);
                    form1.setFieldsValue({ reason: newVal });
                  }}
                  required
                />
              </Form.Item>

              <Form.Item
                labelAlign="left"
                name="approver"
                style={{ marginBottom: "20px" }}
                label={
                  <label style={{ color: "black", fontWeight: "400" }}>
                    Approver<span style={{ color: "red" }}> *</span>
                  </label>
                }
                initialValue={repManager}
              >
                <Input
                  disabled
                />
              </Form.Item>

              <Form.Item
                style={{ paddingTop: "px" }}
                wrapperCol={{
                  offset: 8,
                  span: 24,
                }}
              >
                <Button type="primary" htmlType="submit" >
                  Submit
                </Button>
                <Button
                  htmlType="button"
                  type='default'
                  style={{ marginLeft: "10px" }}
                  onClick={() => {
                    form1.resetFields();
                    setDateSelected(editedLeave.dateCalc);
                    setDateStart(moment(editedLeave.dateCalc, "Do MMM, YYYY"));
                    setStartSlot(editedLeave.slotStart);
                    setDateEnd(moment(editedLeave.dateCalc, "Do MMM, YYYY"));
                    setEndSlot(editedLeave.slotEnd);
                    setValidleaverequest(true);
                  }}
                >
                  Reset
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default Leave;
