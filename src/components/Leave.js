import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Select,
  Table,
  Calendar,
  Modal,
  Tag,
  Tabs,
  notification,
  DatePicker,
  Spin,
  Search,
  Card,
  Divider,
  Checkbox,
} from "antd";
import { Button } from "antd";
import { Form, Input } from "antd";
import moment from "moment";
import {
  DeleteOutlined,
  EditOutlined,
  EditFilled,
  CloseOutlined,
  CheckOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import LeaveContext from "../contexts/LeaveContext";
import CompanyHolidayContext from "../contexts/CompanyHolidayContext";
import EmpInfoContext from "../contexts/EmpInfoContext";
import Notification from "./Notification";
import HolidayList from "./HolidayList";
import ApprovalConfig from "./ApprovalConfig";
import "../style/leave.css";
import ConfigureContext from "../contexts/ConfigureContext";
import LeaveCreate from "./LeaveCreate";
import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/lib/input/TextArea";

const Leave = (props) => {
  const page = "leavePage";
  const colors = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#fc03c2",
    "#b103fc",
    "#03d7fc",
  ];

  const isHr = props.roleView == "admin";
  console.log(props, isHr);
  const { Option } = Select;
  const currentUser = JSON.parse(sessionStorage.getItem("user"));
  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  const [loading, setLoading] = useState(false);
  // const isHr = JSON.parse(sessionStorage.getItem("isHr"));
  const isMgr = JSON.parse(sessionStorage.getItem("isMgr"));
  const [leavedays, setLeaveDays] = useState(null); //leave nature & total in obj
  const [totaldays, setTotalDays] = useState(null); //leave nature & taken in obj
  const [date, setDate] = useState(moment()); //date for calendar
  const [companyholiday, setCompanyholiday] = useState([]); //holidays in array of objects
  const [leaves, setLeaves] = useState([]); //all leaves in array of obects
  const [duration, setDuration] = useState([]); //all days of applied leaves in array
  const [durStatus, setDurStatus] = useState([]); //corresponding status of duration in array
  const [repManager, setRepManager] = useState(); //name of currentUser's reporting manager
  const [secondModal, setSecondModal] = useState(false); //boolean to open apply leave modal
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
  const [sickLeave, setSickLeave] = useState(null);
  const [optionalLeave, setOptionalLeave] = useState(null);
  const [lossPay, setLossPay] = useState(null);
  const [editContent, showEditContent] = useState(false);
  const [editLeavesCount, setEditLeavesCount] = useState(false);
  const [editAccrual, setEditAccrual] = useState(false);
  const [editProbation, setEditProbation] = useState(false);
  const [editCarry, setEditCarry] = useState(false);
  const [editOptionalName, setEditOptionalName] = useState(false);
  const [editOptionalLeave, seteditOptionalLeave] = useState(false);
  const [editOptionalAccrual, setEditOptionalAccrual] = useState(false);
  const [editOptionalProbation, setEditOptionalProbation] = useState(false);
  const [editOptionalCarry, setEditOptionalCarry] = useState(false);
  const [editPayLossName, setEditPayLossName] = useState(false);
  const [editPayLossLeave, setEditPayLossLeave] = useState(false);
  const [editPayLossProbation, setEditPayLossProbation] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState("");
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

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const checkNumbervalue = (event) => {
    if (!/^[0-9]*\.?[0-9]*$/.test(event.key) && event.key !== "Backspace") {
      return true;
    }
  };

  const checkAlphabets = (event) => {
    if (!/^[a-zA-Z ]*$/.test(event.key) && event.key !== "Backspace") {
      return true;
    }
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
      setIsEditModalOpen(false);
      return;
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
    let tempdur = duration.filter(
      (dates) => !editedLeave.dateCalc.includes(dates)
    );
    let matchingdates = dateSelected.filter((item) => tempdur.includes(item));
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
        .then((response) => {
          getData();
          showNotification("success", "Success", "Leave edited successfully");
        })
        .catch((error) => {
          showNotification(
            "error",
            "Error",
            "Unable to process leave request!"
          );
        });
      setDateSelected([]);
      setDateStart(null);
      setStartSlot(null);
      setDateEnd(null);
      setEndSlot(null);
      setValidleaverequest(false);
      setIsEditModalOpen(false);
    } else {
      showNotification("error", "Error", "Unable to process leave request!");
    }
  };
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
    let matchingdates = dateSelected.filter((item) => duration.includes(item));
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
        .then((response) => {
          getData();
          showNotification("success", "Success", "Leave apply successfully");
        })
        .catch((error) => {
          showNotification(
            "error",
            "Error",
            "Unable to process leave request!"
          );
        });
      form.resetFields();
      setDateSelected([]);
      setDateStart(null);
      setStartSlot(null);
      setDateEnd(null);
      setEndSlot(null);
      setValidleaverequest(false);
      setSecondModal(false);
    } else {
      showNotification("error", "Error", "Unable to process leave request!");
    }
  };

  const sickLeaveUpdate = (values) => {
    showEditContent(false);
    let sickname = {
      ...data,
      name: values.name,
      describe: values.describe,
    };
    setData(sickname);
  };

  const leavesCountUpdate = (values) => {
    setEditLeavesCount(false);
    let leaveName = {
      ...data,
      year: values.year ? values.weekends : "",
      weekends: values.weekends ? values.weekends : "",
      holidays: values.holidays ? values.holidays : "",
    };
  };

  const accrualUpdate = (values) => {
    setEditAccrual(false);
    let accrualName = {
      ...data,
      creditable: values.creditable,
      frequency: values.frequency,
      period: values.period,
    };
  };

  const carryUpdate = (values) => {
    setEditCarry(false);
    let carryName = {
      ...data,
      carry: values.carry,
    };
  };

  const probationUpdate = (values) => {
    setEditProbation(false);
    let probationName = {
      ...data,
      probation: values.probation,
    };
  };

  const onCheckbox = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const getConfigurations = async () => {
    let data = await ConfigureContext.getConfigurations(page);
    if (Object.keys(data).length == 0) {
      return;
    }
    let sorted = Object.keys(data?.leaveNature).sort((k1, k2) =>
      k1 < k2 ? -1 : k1 > k2 ? 1 : 0
    );
    let temp = {};
    sorted.map((nat) => {
      temp[`${nat}`] = data.leaveNature[`${nat}`];
    });
    setTotalDays(temp);
    getData({ ...temp });
  };
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
            showNotification(
              "success",
              "Success",
              "Leave deleted successfully!"
            );
            getData();
          })
          .catch((error) => {
            showNotification("error", "Error", error.message);
          });
      },
    });
  };

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

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
            style={{ width: "70px", color: "black" }}
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
    let tempDateEnd = dateEnd;
    if (e != undefined) {
      tempDateEnd = e;
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
    } catch (error) {}
    setDateSelected(temp);
  };
  const dateCellRender = (value) => {
    const listData = getListData(value);
    let textVal = value.format("dddd");
    let bgColor =
      textVal == "Sunday" || textVal == "Saturday"
        ? "rgba(74, 67, 67, 0.2)"
        : "rgba(10, 91, 204, 0.2)";
    let color =
      textVal == "Sunday" || textVal == "Saturday"
        ? "rgba(74, 67, 67, 1)"
        : "rgb(10, 91, 204)";

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
            style={{ width: "70px", color: "black" }}
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
    let tempdur = [...duration];
    if (isEditModalOpen) {
      tempdur = duration.filter(
        (dates) => !editedLeave.dateCalc.includes(dates)
      );
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
        form1.setFieldsValue({ dateEnd: null });
      } else {
        form.setFieldsValue({ dateEnd: null });
      }
      return true;
    }
    return false;
  };
  const disableNature = () => {
    if (dateStart == null || dateStart == 0) {
      if (isEditModalOpen) {
        form1.setFieldsValue({ leaveNature: null });
      } else {
        form.setFieldsValue({ leaveNature: null });
      }
      return true;
    }
    if (dateEnd == null || dateEnd == 0) {
      if (isEditModalOpen) {
        form1.setFieldsValue({ leaveNature: null });
      } else {
        form.setFieldsValue({ leaveNature: null });
      }
      return true;
    }
    return false;
  };
  const disableEndSlot = () => {
    if (dateStart == null || dateStart == 0) {
      return true;
    }
    if (
      dateEnd != null && dateEnd != 0
        ? dateStart.format("DDMMYYYY") == dateEnd.format("DDMMYYYY")
        : false
    ) {
      return true;
    }
    return false;
  };
  const disabledLeaveNature = (u) => {
    if (leavedays[u] <= 0) {
      return true;
    }
    if (
      (u == "Optional Leave" || u == "Sick Leave") &&
      dateSelected.length > 1
    ) {
      return true;
    }
    if (u == "Optional Leave" && dateSelected.length == 1) {
      let holidayMatch = companyholiday.filter((hol) =>
        hol.optionalHoliday ? hol.date == dateSelected[0] : false
      );
      return !(holidayMatch.length > 0);
    }
    if (u == "Sick Leave" && dateSelected.length == 1) {
      return dateStart != null || dateStart != undefined
        ? !(
            dateStart.format("DD-MM-yyyy") == moment().format("DD-MM-yyyy") ||
            dateStart.format("DD-MM-yyyy") ==
              moment().add(1, "days").format("DD-MM-yyyy")
          )
        : false;
    }
    return false;
  };
  const { RangePicker } = DatePicker;

  const onSearch = (value) => console.log(value);

  const { Search } = Input;

  return (
    <>
      {props.roleView === "admin" ? (
        <div>
          <Tabs
            defaultActiveKey="1"
            style={{
              display: "none",
              padding: 24,
              display: "flex",
              width: "100%",
            }}
          >
            <Tabs.TabPane tab="Leave Request" key="1">
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
                  <div>
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

              {/* <Row
                gutter={[16, 16]}
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "white",
                  borderRadius: "10px",
                  padding: "10px",
                  marginTop: "10px",
                }}
              >
                <Col span={6}><RangePicker /></Col>
                <Col span={6}>
                  <Search
                    placeholder="input search text"
                    onSearch={onSearch}
                  />
                </Col>
                <Col span={6}>
                  <Form.Item
                    label="Nature of Leave::"
                    style={{ paddingBottom: "0px" }}
                  >
                    <Select
                      defaultValue="Loss Of Pay"
                      options={[
                        {
                          value: 'CL',
                          label: 'CL',
                        },
                        {
                          value: 'EL',
                          label: 'EL',
                        },
                      ]}
                    />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    label="Nature of Leave::"
                  >
                    <Select
                      defaultValue="Loss Of Pay"
                      options={[
                        {
                          value: 'CL',
                          label: 'CL',
                        },
                        {
                          value: 'EL',
                          label: 'EL',
                        },
                      ]}
                    />
                  </Form.Item>
                </Col>
              </Row> */}

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
              {/* 
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
              </Row> */}
            </Tabs.TabPane>
            <Tabs.TabPane tab="Holidays" key="2">
              <card>
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
                    <div
                      className="rep-div"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                      }}
                    >
                      {/* <Button
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
                      </Button> */}
                      <Button
                        className="reprentation"
                        style={{
                          cursor: "default",
                          marginRight: "5px",
                          marginTop: "10px",
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
                          cursor: "default",
                          marginRight: "5px",
                          marginTop: "10px",
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
                          cursor: "default",
                          marginRight: "5px",
                          marginTop: "10px",
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
                      <div>
                        <HolidayList isHr={isHr} refreshCalendar={getHoliday} />
                      </div>
                      {/* <div className="resp-leaveButton" style={{
                        display: 'flex',
                        alignContent: 'center',
                        alignItems: 'center'
                      }}>
                        <div>
                          <LeaveCreate isHr={isHr} refresh={getConfigurations} />
                        </div>
                        <Button className="button-applyleave"
                          style={{ borderRadius: '15px', width: '105px', marginRight: "10px", marginTop: '0px' }}
                          type="default" onClick={() => { setSecondModal(true) }}>
                          Apply Leave
                        </Button>
                      </div> */}
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
              </card>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Leave Type" key="3">
              <div>
                <Row>
                  <Col xs={24} sm={22} md={6}>
                    <ul className="sidecard">
                      <li>
                        <Card
                          hoverable={true}
                          bordered={false}
                          style={{
                            borderTopRightRadius: "5px",
                            borderBottomRightRadius: "5px",
                            marginBottom: "10px",
                            height: "65px",
                          }}
                          className="sickLeave"
                          onClick={() => {
                            setSickLeave(true);
                            setOptionalLeave(false);
                            setLossPay(false);
                          }}
                        >
                          <div
                            style={{
                              fontSize: "14px",
                              fontWeight: "600",
                              lineHeight: "18px",
                            }}
                            className="sickLabel"
                          >
                            Sick Leaves
                          </div>
                          <div>No Employees</div>
                        </Card>
                      </li>
                      <li>
                        <Card
                          hoverable={true}
                          bordered={true}
                          style={{
                            borderTopRightRadius: "5px",
                            borderBottomRightRadius: "5px",
                            marginBottom: "10px",
                            height: "65px",
                          }}
                          className="optionalLeave"
                          onClick={() => {
                            setSickLeave(false);
                            setOptionalLeave(true);
                            setLossPay(false);
                          }}
                        >
                          <div
                            style={{
                              fontSize: "14px",
                              fontWeight: "600",
                              lineHeight: "18px",
                            }}
                            className="sickLabel"
                          >
                            Optional Leave
                          </div>
                          <div>No Employees</div>
                        </Card>
                      </li>
                      <li>
                        <Card
                          hoverable={true}
                          bordered={true}
                          style={{
                            borderTopRightRadius: "5px",
                            borderBottomRightRadius: "5px",
                            marginBottom: "10px",
                            height: "65px",
                          }}
                          className="lossPay"
                          onClick={() => {
                            setSickLeave(false);
                            setOptionalLeave(false);
                            setLossPay(true);
                          }}
                        >
                          <div
                            style={{
                              fontSize: "14px",
                              fontWeight: "600",
                              lineHeight: "18px",
                            }}
                            className="sickLabel"
                          >
                            Loss of Pay
                          </div>
                          <div>No Employees</div>
                        </Card>
                      </li>
                      <li>
                        <Card
                          hoverable={true}
                          bordered={true}
                          style={{
                            borderRadius: "4px",
                            // marginBottom: "10px",
                            height: "40px",
                            marginTop: "15rem",
                          }}
                          className="createButton"
                          // onClick={() => {
                          //   setSickLeave(false);
                          //   setOptionalLeave(false);
                          //   setLossPay(true);
                          // }}
                        >
                          <Button
                            className="create"
                            style={{ border: "none", width: "100px" }}
                            onClick={showModal}
                          >
                            <PlusCircleOutlined />
                            Create New Rule
                          </Button>
                          <Modal
                            title="Create New Rule"
                            open={isModalOpen}
                            onOk={handleOk}
                            onCancel={handleCancel}
                          >
                            <Form
                              name="basic"
                              labelCol={{
                                span: 8,
                                offset: 4,
                              }}
                              wrapperCol={{
                                span: 16,
                                offset: 4,
                              }}
                              initialValues={{
                                remember: true,
                              }}
                              autoComplete="off"
                              layout="vertical"
                            >
                              <Form.Item
                                label="Name"
                                name="name"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please Enter Name",
                                  },
                                  {
                                    message: "Please Enter Valid Name",
                                    pattern: /^[a-zA-Z\s]*$/,
                                  },
                                ]}
                                onKeyPress={(event) => {
                                  if (checkAlphabets(event)) {
                                    event.preventDefault();
                                  }
                                }}
                              >
                                <Input maxLength={20} />
                              </Form.Item>

                              <Form.Item
                                label="Description"
                                name="description"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please Enter Description",
                                  },
                                ]}
                              >
                                <TextArea rows={2} />
                              </Form.Item>
                              <Form.Item
                                label="Leave Count"
                                name="count"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please Enter Leave Count",
                                  },
                                  {
                                    pattern: /^[0-9\b]+$/,
                                    message: "Please Enter  Number",
                                  },
                                ]}
                                onKeyPress={(event) => {
                                  console.log(checkNumbervalue(event));
                                  if (checkNumbervalue(event)) {
                                    event.preventDefault();
                                  }
                                }}
                              >
                                <Input maxLength={3} />
                              </Form.Item>
                            </Form>
                          </Modal>
                        </Card>
                      </li>
                    </ul>
                  </Col>
                  <Col xs={24} sm={22} md={18}>
                    {sickLeave ? (
                      <Card
                        className="sickCard"
                        title="Sick Leave"
                        bordered={true}
                        style={{
                          marginLeft: "30px",

                          cursor: "default",
                        }}
                      >
                        <Form
                          // form={form}
                          labelcol={{
                            span: 4,
                          }}
                          wrappercol={{
                            span: 14,
                          }}
                          initialValues={{
                            remember: true,
                          }}
                          autoComplete="off"
                          onFinish={sickLeaveUpdate}
                        >
                          <div className="personalCardDiv">
                            <Row>
                              <Col xs={24} sm={24} md={15}>
                                <div>
                                  <Row>
                                    <Col xs={24} sm={24} md={23}>
                                      <div
                                        style={{
                                          fontSize: "14px",
                                          fontWeight: "600",
                                          lineHeight: "18px",
                                          color: "#07182B",
                                          fontFamily: "Open Sans,sans-serif",
                                          marginBottom: "7px",
                                        }}
                                      >
                                        Name
                                      </div>
                                      <div style={{ marginBottom: "13px" }}>
                                        Sick Leave
                                      </div>
                                    </Col>
                                  </Row>
                                </div>
                              </Col>
                              <Col xs={24} sm={22} md={18}>
                                <div>
                                  <div
                                    style={{
                                      fontWeight: 600,
                                      lineHeight: "18px",
                                      color: "#07182b",
                                      fontSize: "15px",
                                      fontFamily: "Open Sans,sans-serif",
                                      marginBottom: "6px",
                                    }}
                                  >
                                    Description
                                  </div>
                                  <div>
                                    These are one-day leaves taken for
                                    health-related reasons. This can only be
                                    taken for the current day or the next (1 day
                                    in advance).
                                  </div>
                                </div>
                              </Col>
                            </Row>
                          </div>
                        </Form>
                        <Divider />
                        <Form
                          // form={form}
                          labelcol={{
                            span: 4,
                          }}
                          wrappercol={{
                            span: 14,
                          }}
                          initialValues={{
                            remember: true,
                          }}
                          autoComplete="off"
                          onFinish={leavesCountUpdate}
                        >
                          <div className="leavesCount">
                            <Row>
                              <Col xs={24} sm={20} md={7}>
                                <div
                                  style={{
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    lineHeight: "18px",
                                    color: "#07182B",
                                    fontFamily: "Open Sans,sans-serif",
                                    marginBottom: "13px",
                                  }}
                                >
                                  Leaves Count
                                </div>
                              </Col>
                              <Col xs={24} sm={20} md={8}>
                                <div
                                  style={{
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    lineHeight: "18px",
                                    color: "#07182B",
                                    fontFamily: "Open Sans,sans-serif",
                                    marginBottom: "7px",
                                  }}
                                >
                                  Leaves Allowed in a Year
                                </div>
                                {editLeavesCount === false ? (
                                  <div>{data?.year ? data.year : "18.0"}</div>
                                ) : (
                                  <Form.Item
                                    initialValue={data?.year ? data.year : null}
                                    name="year"
                                  >
                                    <Input
                                      style={{
                                        // marginTop: "10px",
                                        width: "200px",
                                        borderBottom: "1px solid #ccc ",
                                        paddingLeft: "0px",
                                      }}
                                      bordered={false}
                                      initialValue={
                                        data.year ? data.year : null
                                      }
                                    />
                                  </Form.Item>
                                )}
                              </Col>
                              <Col xs={24} sm={20} md={8}>
                                <div
                                  style={{
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    lineHeight: "18px",
                                    color: "#07182B",
                                    fontFamily: "Open Sans,sans-serif",
                                    marginBottom: "7px",
                                  }}
                                >
                                  Weekends Between Leave
                                </div>
                                {editLeavesCount === false ? (
                                  <div>
                                    {data?.weekends
                                      ? data.weekends
                                      : "Not Considered"}
                                  </div>
                                ) : (
                                  <Form.Item
                                    initialValue={
                                      data?.weekends ? data.weekends : null
                                    }
                                    name="weekends"
                                  >
                                    <Checkbox onChange={onCheckbox}>
                                      Count as Leave
                                    </Checkbox>
                                  </Form.Item>
                                )}
                              </Col>
                              {editLeavesCount === false ? (
                                <Col xs={24} sm={24} md={1}>
                                  <Button
                                    className="leaves"
                                    type="text"
                                    bordered={false}
                                    style={{
                                      // color: "#ffff",
                                      display: "none",
                                      // paddingTop: "7px",
                                      // paddingRight: "7px",
                                      // position: "absolute",
                                      // left: "17rem",
                                      // top: 10,
                                    }}
                                    onClick={() =>
                                      setEditLeavesCount(!editLeavesCount)
                                    }
                                  >
                                    <EditFilled />
                                  </Button>
                                </Col>
                              ) : null}
                            </Row>
                            <Row>
                              <Col xs={24} sm={24} md={19}>
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                  }}
                                >
                                  <div
                                    style={{
                                      fontSize: "14px",
                                      fontWeight: "600",
                                      lineHeight: "18px",
                                      color: "#07182B",
                                      fontFamily: "Open Sans,sans-serif",
                                      marginTop: "15px",
                                    }}
                                  >
                                    Holidays Between Leave
                                  </div>
                                  {editLeavesCount === false ? (
                                    <div
                                      style={{
                                        marginTop: "5px",
                                        marginRight: "4rem",
                                      }}
                                    >
                                      {data?.holidays
                                        ? data.holidays
                                        : "Not Considered"}
                                    </div>
                                  ) : (
                                    <Form.Item
                                      initialValue={
                                        data?.holidays ? data.holidays : null
                                      }
                                      name="holidays"
                                    >
                                      <Checkbox onChange={onCheckbox}>
                                        Count as Leave
                                      </Checkbox>
                                    </Form.Item>
                                  )}
                                </div>
                              </Col>
                            </Row>
                            {editLeavesCount === true ? (
                              <Row
                                style={{
                                  display: "flex",
                                  justifyContent: "flex-end",
                                  marginTop: "3%",
                                }}
                              >
                                <Button
                                  onClick={() => {
                                    form.resetFields();
                                    setEditLeavesCount(false);
                                  }}
                                  type="text"
                                  style={{ fontSize: 15 }}
                                >
                                  <CloseOutlined /> CANCEL
                                </Button>
                                <Col>
                                  <Button
                                    type="primary"
                                    htmlType="submit"
                                    style={{
                                      marginLeft: "10px",
                                      background: "#1963A6",
                                      width: "90px",
                                    }}
                                    onClick={() => {
                                      form.submit();
                                    }}
                                  >
                                    <CheckOutlined />
                                    SAVE
                                  </Button>
                                </Col>
                              </Row>
                            ) : null}
                          </div>
                        </Form>
                        <Divider />
                        <Form
                          labelcol={{
                            span: 4,
                          }}
                          wrappercol={{
                            span: 14,
                          }}
                          initialValues={{
                            remember: true,
                          }}
                          autoComplete="off"
                          onFinish={accrualUpdate}
                        >
                          <div className="leavesCount">
                            <Row>
                              <Col xs={24} sm={20} md={7}>
                                <div
                                  style={{
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    lineHeight: "18px",
                                    color: "#07182B",
                                    fontFamily: "Open Sans,sans-serif",
                                    marginBottom: "13px",
                                  }}
                                >
                                  Accrual
                                </div>
                              </Col>
                              <Col xs={24} sm={20} md={16}>
                                {editAccrual === false ? (
                                  <>
                                    <div
                                      style={{
                                        fontSize: "14px",
                                        fontWeight: "600",
                                        lineHeight: "18px",
                                        color: "#07182B",
                                        fontFamily: "Open Sans,sans-serif",
                                        marginBottom: "7px",
                                      }}
                                    >
                                      Creditable on Accrual Basis
                                    </div>
                                    <div style={{ marginBottom: "13px" }}>
                                      {data?.creditable
                                        ? data.creditable
                                        : "Yes"}
                                    </div>
                                  </>
                                ) : (
                                  <Form.Item
                                    initialValue={
                                      data?.creditable ? data.creditable : null
                                    }
                                    name="creditable"
                                  >
                                    <Checkbox
                                      onChange={onCheckbox}
                                      style={{
                                        fontSize: "14px",
                                        fontWeight: "600",
                                        lineHeight: "18px",
                                        color: "#07182B",
                                        fontFamily: "Open Sans,sans-serif",
                                      }}
                                    >
                                      Creditable on Accrual Basis
                                    </Checkbox>
                                  </Form.Item>
                                )}
                              </Col>
                              {editAccrual === false ? (
                                <Col xs={24} sm={24} md={1}>
                                  <Button
                                    className="leaves"
                                    type="text"
                                    bordered={false}
                                    style={{
                                      // color: "#ffff",
                                      display: "none",
                                      // paddingTop: "7px",
                                      // paddingRight: "7px",
                                      // position: "absolute",
                                      // left: "17rem",
                                      // top: 10,
                                    }}
                                    onClick={() => setEditAccrual(!editAccrual)}
                                  >
                                    <EditFilled />
                                  </Button>
                                </Col>
                              ) : null}
                            </Row>
                            <Row>
                              <Col xs={24} sm={22} md={7}></Col>
                              <Col xs={24} sm={22} md={8}>
                                <div
                                  style={{
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    lineHeight: "18px",
                                    color: "#07182B",
                                    fontFamily: "Open Sans,sans-serif",
                                    marginBottom: "7px",
                                  }}
                                >
                                  Accrual Frequency
                                </div>
                                {editAccrual === false ? (
                                  <div>
                                    {data?.frequency
                                      ? data.frequency
                                      : "Monthly"}
                                  </div>
                                ) : (
                                  <Form.Item
                                    initialValue={
                                      data?.frequency ? data.frequency : null
                                    }
                                    name="frequency"
                                  >
                                    <Select
                                      style={{
                                        // marginTop: "10px",
                                        width: "200px",
                                        borderBottom: "1px solid #ccc ",
                                        padding: "2px",
                                      }}
                                      bordered={false}
                                    >
                                      <Option value="Monthly">Monthly</Option>
                                      <Option value="Quarterly">
                                        Quarterly
                                      </Option>
                                      <Option value="Half Yearly">
                                        Half Yearly
                                      </Option>
                                    </Select>
                                  </Form.Item>
                                )}
                              </Col>
                              <Col xs={24} sm={22} md={9}>
                                <div
                                  style={{
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    lineHeight: "18px",
                                    color: "#07182B",
                                    fontFamily: "Open Sans,sans-serif",
                                    marginBottom: "7px",
                                  }}
                                >
                                  Accrual Period
                                </div>
                                {editAccrual === false ? (
                                  <div>
                                    {data?.period ? data.period : "start"}
                                  </div>
                                ) : (
                                  <Form.Item
                                    initialValue={
                                      data?.period ? data.period : null
                                    }
                                    name="period"
                                  >
                                    <Select
                                      style={{
                                        // marginTop: "10px",
                                        width: "200px",
                                        borderBottom: "1px solid #ccc ",
                                        padding: "2px",
                                      }}
                                      bordered={false}
                                    >
                                      <Option value="Start">Start</Option>
                                      <Option value="End">End</Option>
                                    </Select>
                                  </Form.Item>
                                )}
                              </Col>
                            </Row>
                            {editAccrual === true ? (
                              <Row
                                style={{
                                  display: "flex",
                                  justifyContent: "flex-end",
                                  marginTop: "3%",
                                }}
                              >
                                <Button
                                  onClick={() => {
                                    form.resetFields();
                                    setEditAccrual(false);
                                  }}
                                  type="text"
                                  style={{ fontSize: 15 }}
                                >
                                  <CloseOutlined /> CANCEL
                                </Button>
                                <Col>
                                  <Button
                                    type="primary"
                                    htmlType="submit"
                                    style={{
                                      marginLeft: "10px",
                                      background: "#1963A6",
                                      width: "90px",
                                    }}
                                    onClick={() => {
                                      form.submit();
                                    }}
                                  >
                                    <CheckOutlined />
                                    SAVE
                                  </Button>
                                </Col>
                              </Row>
                            ) : null}
                          </div>
                        </Form>
                        <Divider />
                        <Form
                          labelcol={{
                            span: 4,
                          }}
                          wrappercol={{
                            span: 14,
                          }}
                          initialValues={{
                            remember: true,
                          }}
                          autoComplete="off"
                          onFinish={probationUpdate}
                        >
                          <div className="leavesCount">
                            <Row>
                              <Col xs={24} sm={20} md={7}>
                                <div
                                  style={{
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    lineHeight: "18px",
                                    color: "#07182B",
                                    fontFamily: "Open Sans,sans-serif",
                                    marginBottom: "13px",
                                  }}
                                >
                                  Applicability
                                </div>
                              </Col>
                              <Col xs={24} sm={20} md={16}>
                                {editProbation === false ? (
                                  <>
                                    <div
                                      style={{
                                        fontSize: "14px",
                                        fontWeight: "600",
                                        lineHeight: "18px",
                                        color: "#07182B",
                                        fontFamily: "Open Sans,sans-serif",
                                        marginBottom: "7px",
                                      }}
                                    >
                                      Allowed Under Probation
                                    </div>
                                    <div style={{ marginBottom: "13px" }}>
                                      {data?.probation ? data.probation : "Yes"}
                                    </div>
                                  </>
                                ) : (
                                  <Form.Item
                                    initialValue={
                                      data?.probation ? data.probation : null
                                    }
                                    name="probation"
                                  >
                                    <Checkbox
                                      onChange={onCheckbox}
                                      style={{
                                        fontSize: "14px",
                                        fontWeight: "600",
                                        lineHeight: "18px",
                                        color: "#07182B",
                                        fontFamily: "Open Sans,sans-serif",
                                      }}
                                    >
                                      Allowed Under Probation
                                    </Checkbox>
                                  </Form.Item>
                                )}
                              </Col>
                              {editProbation === false ? (
                                <Col xs={24} sm={24} md={1}>
                                  <Button
                                    className="leaves"
                                    type="text"
                                    bordered={false}
                                    style={{
                                      // color: "#ffff",
                                      display: "none",
                                      // paddingTop: "7px",
                                      // paddingRight: "7px",
                                      // position: "absolute",
                                      // left: "17rem",
                                      // top: 10,
                                    }}
                                    onClick={() =>
                                      setEditProbation(!editProbation)
                                    }
                                  >
                                    <EditFilled />
                                  </Button>
                                </Col>
                              ) : null}
                            </Row>
                            {editProbation === true ? (
                              <Row
                                style={{
                                  display: "flex",
                                  justifyContent: "flex-end",
                                  marginTop: "3%",
                                }}
                              >
                                <Button
                                  onClick={() => {
                                    form.resetFields();
                                    setEditProbation(false);
                                  }}
                                  type="text"
                                  style={{ fontSize: 15 }}
                                >
                                  <CloseOutlined /> CANCEL
                                </Button>
                                <Col>
                                  <Button
                                    type="primary"
                                    htmlType="submit"
                                    style={{
                                      marginLeft: "10px",
                                      background: "#1963A6",
                                      width: "90px",
                                    }}
                                    onClick={() => {
                                      form.submit();
                                    }}
                                  >
                                    <CheckOutlined />
                                    SAVE
                                  </Button>
                                </Col>
                              </Row>
                            ) : null}
                          </div>
                        </Form>
                        <Divider />
                        <Form
                          labelcol={{
                            span: 4,
                          }}
                          wrappercol={{
                            span: 14,
                          }}
                          initialValues={{
                            remember: true,
                          }}
                          autoComplete="off"
                          onFinish={carryUpdate}
                        >
                          <div className="leavesCount">
                            <Row>
                              <Col xs={24} sm={20} md={7}>
                                <div
                                  style={{
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    lineHeight: "18px",
                                    color: "#07182B",
                                    fontFamily: "Open Sans,sans-serif",
                                    marginBottom: "13px",
                                  }}
                                >
                                  Carry Forward
                                </div>
                              </Col>
                              <Col xs={24} sm={20} md={16}>
                                {editCarry === false ? (
                                  <>
                                    <div
                                      style={{
                                        fontSize: "14px",
                                        fontWeight: "600",
                                        lineHeight: "18px",
                                        color: "#07182B",
                                        fontFamily: "Open Sans,sans-serif",
                                        marginBottom: "7px",
                                      }}
                                    >
                                      Carry Forward Enabled
                                    </div>
                                    <div style={{ marginBottom: "13px" }}>
                                      {data?.carry ? data.carry : "Yes"}
                                    </div>
                                  </>
                                ) : (
                                  <Form.Item
                                    initialValue={
                                      data?.carry ? data.carry : null
                                    }
                                    name="carry"
                                  >
                                    <Checkbox
                                      onChange={onCheckbox}
                                      style={{
                                        fontSize: "14px",
                                        fontWeight: "600",
                                        lineHeight: "18px",
                                        color: "#07182B",
                                        fontFamily: "Open Sans,sans-serif",
                                      }}
                                    >
                                      Carry Forward Enabled
                                    </Checkbox>
                                  </Form.Item>
                                )}
                              </Col>
                              {editCarry === false ? (
                                <Col xs={24} sm={24} md={1}>
                                  <Button
                                    className="leaves"
                                    type="text"
                                    bordered={false}
                                    style={{
                                      // color: "#ffff",
                                      display: "none",
                                      // paddingTop: "7px",
                                      // paddingRight: "7px",
                                      // position: "absolute",
                                      // left: "17rem",
                                      // top: 10,
                                    }}
                                    onClick={() => setEditCarry(!editCarry)}
                                  >
                                    <EditFilled />
                                  </Button>
                                </Col>
                              ) : null}
                            </Row>
                            {editCarry === true ? (
                              <Row
                                style={{
                                  display: "flex",
                                  justifyContent: "flex-end",
                                  marginTop: "3%",
                                }}
                              >
                                <Button
                                  onClick={() => {
                                    form.resetFields();
                                    setEditCarry(false);
                                  }}
                                  type="text"
                                  style={{ fontSize: 15 }}
                                >
                                  <CloseOutlined /> CANCEL
                                </Button>
                                <Col>
                                  <Button
                                    type="primary"
                                    htmlType="submit"
                                    style={{
                                      marginLeft: "10px",
                                      background: "#1963A6",
                                      width: "90px",
                                    }}
                                    onClick={() => {
                                      form.submit();
                                    }}
                                  >
                                    <CheckOutlined />
                                    SAVE
                                  </Button>
                                </Col>
                              </Row>
                            ) : null}
                          </div>
                        </Form>
                      </Card>
                    ) : null}
                    {optionalLeave ? (
                      <Card
                        className="sickCard"
                        title="Optional Leave"
                        bordered={true}
                        style={{
                          marginLeft: "30px",

                          cursor: "default",
                        }}
                      >
                        <Form
                          // form={form}
                          labelcol={{
                            span: 4,
                          }}
                          wrappercol={{
                            span: 14,
                          }}
                          initialValues={{
                            remember: true,
                          }}
                          autoComplete="off"
                          onFinish={sickLeaveUpdate}
                        >
                          <div className="personalCardDiv">
                            <Row>
                              <Col xs={24} sm={24} md={15}>
                                <div>
                                  <Row>
                                    <Col xs={24} sm={24} md={23}>
                                      <div
                                        style={{
                                          fontSize: "14px",
                                          fontWeight: "600",
                                          lineHeight: "18px",
                                          color: "#07182B",
                                          fontFamily: "Open Sans,sans-serif",
                                          marginBottom: "7px",
                                        }}
                                      >
                                        Name
                                      </div>
                                      <div style={{ marginBottom: "13px" }}>
                                        Optional Leave
                                      </div>
                                    </Col>
                                  </Row>
                                </div>
                              </Col>
                              <Col xs={24} sm={22} md={18}>
                                <div>
                                  <div
                                    style={{
                                      fontWeight: 600,
                                      lineHeight: "18px",
                                      color: "#07182b",
                                      fontSize: "15px",
                                      fontFamily: "Open Sans,sans-serif",
                                      marginBottom: "6px",
                                    }}
                                  >
                                    Description
                                  </div>
                                  <div>
                                    Optional holidays are those that the
                                    employee can choose to avail.
                                  </div>
                                </div>
                              </Col>
                            </Row>
                          </div>
                        </Form>
                        <Divider />
                        <Form
                          // form={form}
                          labelcol={{
                            span: 4,
                          }}
                          wrappercol={{
                            span: 14,
                          }}
                          initialValues={{
                            remember: true,
                          }}
                          autoComplete="off"
                          onFinish={leavesCountUpdate}
                        >
                          <div className="leavesCount">
                            <Row>
                              <Col xs={24} sm={20} md={7}>
                                <div
                                  style={{
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    lineHeight: "18px",
                                    color: "#07182B",
                                    fontFamily: "Open Sans,sans-serif",
                                    marginBottom: "13px",
                                  }}
                                >
                                  Leaves Count
                                </div>
                              </Col>
                              <Col xs={24} sm={20} md={8}>
                                <div
                                  style={{
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    lineHeight: "18px",
                                    color: "#07182B",
                                    fontFamily: "Open Sans,sans-serif",
                                    marginBottom: "7px",
                                  }}
                                >
                                  Leaves Allowed in a Year
                                </div>
                                {editOptionalLeave === false ? (
                                  <div>{data?.year ? data.year : "18.0"}</div>
                                ) : (
                                  <Form.Item
                                    initialValue={data?.year ? data.year : null}
                                    name="year"
                                  >
                                    <Input
                                      style={{
                                        // marginTop: "10px",
                                        width: "200px",
                                        borderBottom: "1px solid #ccc ",
                                        paddingLeft: "0px",
                                      }}
                                      bordered={false}
                                      initialValue={
                                        data.year ? data.year : null
                                      }
                                    />
                                  </Form.Item>
                                )}
                              </Col>
                              <Col xs={24} sm={20} md={8}>
                                <div
                                  style={{
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    lineHeight: "18px",
                                    color: "#07182B",
                                    fontFamily: "Open Sans,sans-serif",
                                    marginBottom: "7px",
                                  }}
                                >
                                  Weekends Between Leave
                                </div>
                                {editOptionalLeave === false ? (
                                  <div>
                                    {data?.weekends
                                      ? data.weekends
                                      : "Not Considered"}
                                  </div>
                                ) : (
                                  <Form.Item
                                    initialValue={
                                      data?.weekends ? data.weekends : null
                                    }
                                    name="weekends"
                                  >
                                    <Checkbox onChange={onCheckbox}>
                                      Count as Leave
                                    </Checkbox>
                                  </Form.Item>
                                )}
                              </Col>
                              {editOptionalLeave === false ? (
                                <Col xs={24} sm={24} md={1}>
                                  <Button
                                    className="leaves"
                                    type="text"
                                    bordered={false}
                                    style={{
                                      // color: "#ffff",
                                      display: "none",
                                      // paddingTop: "7px",
                                      // paddingRight: "7px",
                                      // position: "absolute",
                                      // left: "17rem",
                                      // top: 10,
                                    }}
                                    onClick={() =>
                                      seteditOptionalLeave(!editOptionalLeave)
                                    }
                                  >
                                    <EditFilled />
                                  </Button>
                                </Col>
                              ) : null}
                            </Row>
                            <Row>
                              <Col xs={24} sm={24} md={19}>
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                  }}
                                >
                                  <div
                                    style={{
                                      fontSize: "14px",
                                      fontWeight: "600",
                                      lineHeight: "18px",
                                      color: "#07182B",
                                      fontFamily: "Open Sans,sans-serif",
                                      marginTop: "15px",
                                    }}
                                  >
                                    Holidays Between Leave
                                  </div>
                                  {editOptionalLeave === false ? (
                                    <div
                                      style={{
                                        marginTop: "5px",
                                        marginRight: "4rem",
                                      }}
                                    >
                                      {data?.holidays
                                        ? data.holidays
                                        : "Not Considered"}
                                    </div>
                                  ) : (
                                    <Form.Item
                                      initialValue={
                                        data?.holidays ? data.holidays : null
                                      }
                                      name="holidays"
                                    >
                                      <Checkbox onChange={onCheckbox}>
                                        Count as Leave
                                      </Checkbox>
                                    </Form.Item>
                                  )}
                                </div>
                              </Col>
                            </Row>
                            {editOptionalLeave === true ? (
                              <Row
                                style={{
                                  display: "flex",
                                  justifyContent: "flex-end",
                                  marginTop: "3%",
                                }}
                              >
                                <Button
                                  onClick={() => {
                                    form.resetFields();
                                    seteditOptionalLeave(false);
                                  }}
                                  type="text"
                                  style={{ fontSize: 15 }}
                                >
                                  <CloseOutlined /> CANCEL
                                </Button>
                                <Col>
                                  <Button
                                    type="primary"
                                    htmlType="submit"
                                    style={{
                                      marginLeft: "10px",
                                      background: "#1963A6",
                                      width: "90px",
                                    }}
                                    onClick={() => {
                                      form.submit();
                                    }}
                                  >
                                    <CheckOutlined />
                                    SAVE
                                  </Button>
                                </Col>
                              </Row>
                            ) : null}
                          </div>
                        </Form>
                        <Divider />
                        <Form
                          labelcol={{
                            span: 4,
                          }}
                          wrappercol={{
                            span: 14,
                          }}
                          initialValues={{
                            remember: true,
                          }}
                          autoComplete="off"
                          onFinish={accrualUpdate}
                        >
                          <div className="leavesCount">
                            <Row>
                              <Col xs={24} sm={20} md={7}>
                                <div
                                  style={{
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    lineHeight: "18px",
                                    color: "#07182B",
                                    fontFamily: "Open Sans,sans-serif",
                                    marginBottom: "13px",
                                  }}
                                >
                                  Accrual
                                </div>
                              </Col>
                              <Col xs={24} sm={20} md={16}>
                                {editOptionalAccrual === false ? (
                                  <>
                                    <div
                                      style={{
                                        fontSize: "14px",
                                        fontWeight: "600",
                                        lineHeight: "18px",
                                        color: "#07182B",
                                        fontFamily: "Open Sans,sans-serif",
                                        marginBottom: "7px",
                                      }}
                                    >
                                      Creditable on Accrual Basis
                                    </div>
                                    <div style={{ marginBottom: "13px" }}>
                                      {data?.creditable
                                        ? data.creditable
                                        : "Yes"}
                                    </div>
                                  </>
                                ) : (
                                  <Form.Item
                                    initialValue={
                                      data?.creditable ? data.creditable : null
                                    }
                                    name="creditable"
                                  >
                                    <Checkbox
                                      onChange={onCheckbox}
                                      style={{
                                        fontSize: "14px",
                                        fontWeight: "600",
                                        lineHeight: "18px",
                                        color: "#07182B",
                                        fontFamily: "Open Sans,sans-serif",
                                      }}
                                    >
                                      Creditable on Accrual Basis
                                    </Checkbox>
                                  </Form.Item>
                                )}
                              </Col>
                              {editOptionalAccrual === false ? (
                                <Col xs={24} sm={24} md={1}>
                                  <Button
                                    className="leaves"
                                    type="text"
                                    bordered={false}
                                    style={{
                                      // color: "#ffff",
                                      display: "none",
                                      // paddingTop: "7px",
                                      // paddingRight: "7px",
                                      // position: "absolute",
                                      // left: "17rem",
                                      // top: 10,
                                    }}
                                    onClick={() =>
                                      setEditOptionalAccrual(
                                        !editOptionalAccrual
                                      )
                                    }
                                  >
                                    <EditFilled />
                                  </Button>
                                </Col>
                              ) : null}
                            </Row>
                            <Row>
                              <Col xs={24} sm={22} md={7}></Col>
                              <Col xs={24} sm={22} md={8}>
                                <div
                                  style={{
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    lineHeight: "18px",
                                    color: "#07182B",
                                    fontFamily: "Open Sans,sans-serif",
                                    marginBottom: "7px",
                                  }}
                                >
                                  Accrual Frequency
                                </div>
                                {editOptionalAccrual === false ? (
                                  <div>
                                    {data?.frequency
                                      ? data.frequency
                                      : "Monthly"}
                                  </div>
                                ) : (
                                  <Form.Item
                                    initialValue={
                                      data?.frequency ? data.frequency : null
                                    }
                                    name="frequency"
                                  >
                                    <Select
                                      style={{
                                        // marginTop: "10px",
                                        width: "200px",
                                        borderBottom: "1px solid #ccc ",
                                        padding: "2px",
                                      }}
                                      bordered={false}
                                    >
                                      <Option value="Monthly">Monthly</Option>
                                      <Option value="Quarterly">
                                        Quarterly
                                      </Option>
                                      <Option value="Half Yearly">
                                        Half Yearly
                                      </Option>
                                    </Select>
                                  </Form.Item>
                                )}
                              </Col>
                              <Col xs={24} sm={22} md={9}>
                                <div
                                  style={{
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    lineHeight: "18px",
                                    color: "#07182B",
                                    fontFamily: "Open Sans,sans-serif",
                                    marginBottom: "7px",
                                  }}
                                >
                                  Accrual Period
                                </div>
                                {editOptionalAccrual === false ? (
                                  <div>
                                    {data?.period ? data.period : "start"}
                                  </div>
                                ) : (
                                  <Form.Item
                                    initialValue={
                                      data?.period ? data.period : null
                                    }
                                    name="period"
                                  >
                                    <Select
                                      style={{
                                        // marginTop: "10px",
                                        width: "200px",
                                        borderBottom: "1px solid #ccc ",
                                        padding: "2px",
                                      }}
                                      bordered={false}
                                    >
                                      <Option value="Start">Start</Option>
                                      <Option value="End">End</Option>
                                    </Select>
                                  </Form.Item>
                                )}
                              </Col>
                            </Row>
                            {editOptionalAccrual === true ? (
                              <Row
                                style={{
                                  display: "flex",
                                  justifyContent: "flex-end",
                                  marginTop: "3%",
                                }}
                              >
                                <Button
                                  onClick={() => {
                                    form.resetFields();
                                    setEditOptionalAccrual(false);
                                  }}
                                  type="text"
                                  style={{ fontSize: 15 }}
                                >
                                  <CloseOutlined /> CANCEL
                                </Button>
                                <Col>
                                  <Button
                                    type="primary"
                                    htmlType="submit"
                                    style={{
                                      marginLeft: "10px",
                                      background: "#1963A6",
                                      width: "90px",
                                    }}
                                    onClick={() => {
                                      form.submit();
                                    }}
                                  >
                                    <CheckOutlined />
                                    SAVE
                                  </Button>
                                </Col>
                              </Row>
                            ) : null}
                          </div>
                        </Form>
                        <Divider />
                        <Form
                          labelcol={{
                            span: 4,
                          }}
                          wrappercol={{
                            span: 14,
                          }}
                          initialValues={{
                            remember: true,
                          }}
                          autoComplete="off"
                          onFinish={probationUpdate}
                        >
                          <div className="leavesCount">
                            <Row>
                              <Col xs={24} sm={20} md={7}>
                                <div
                                  style={{
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    lineHeight: "18px",
                                    color: "#07182B",
                                    fontFamily: "Open Sans,sans-serif",
                                    marginBottom: "13px",
                                  }}
                                >
                                  Applicability
                                </div>
                              </Col>
                              <Col xs={24} sm={20} md={16}>
                                {editOptionalProbation === false ? (
                                  <>
                                    <div
                                      style={{
                                        fontSize: "14px",
                                        fontWeight: "600",
                                        lineHeight: "18px",
                                        color: "#07182B",
                                        fontFamily: "Open Sans,sans-serif",
                                        marginBottom: "7px",
                                      }}
                                    >
                                      Allowed Under Probation
                                    </div>
                                    <div style={{ marginBottom: "13px" }}>
                                      {data?.probation ? data.probation : "Yes"}
                                    </div>
                                  </>
                                ) : (
                                  <Form.Item
                                    initialValue={
                                      data?.probation ? data.probation : null
                                    }
                                    name="probation"
                                  >
                                    <Checkbox
                                      onChange={onCheckbox}
                                      style={{
                                        fontSize: "14px",
                                        fontWeight: "600",
                                        lineHeight: "18px",
                                        color: "#07182B",
                                        fontFamily: "Open Sans,sans-serif",
                                      }}
                                    >
                                      Allowed Under Probation
                                    </Checkbox>
                                  </Form.Item>
                                )}
                              </Col>
                              {editOptionalProbation === false ? (
                                <Col xs={24} sm={24} md={1}>
                                  <Button
                                    className="leaves"
                                    type="text"
                                    bordered={false}
                                    style={{
                                      // color: "#ffff",
                                      display: "none",
                                      // paddingTop: "7px",
                                      // paddingRight: "7px",
                                      // position: "absolute",
                                      // left: "17rem",
                                      // top: 10,
                                    }}
                                    onClick={() =>
                                      setEditOptionalProbation(
                                        !editOptionalProbation
                                      )
                                    }
                                  >
                                    <EditFilled />
                                  </Button>
                                </Col>
                              ) : null}
                            </Row>
                            {editOptionalProbation === true ? (
                              <Row
                                style={{
                                  display: "flex",
                                  justifyContent: "flex-end",
                                  marginTop: "3%",
                                }}
                              >
                                <Button
                                  onClick={() => {
                                    form.resetFields();
                                    setEditOptionalProbation(false);
                                  }}
                                  type="text"
                                  style={{ fontSize: 15 }}
                                >
                                  <CloseOutlined /> CANCEL
                                </Button>
                                <Col>
                                  <Button
                                    type="primary"
                                    htmlType="submit"
                                    style={{
                                      marginLeft: "10px",
                                      background: "#1963A6",
                                      width: "90px",
                                    }}
                                    onClick={() => {
                                      form.submit();
                                    }}
                                  >
                                    <CheckOutlined />
                                    SAVE
                                  </Button>
                                </Col>
                              </Row>
                            ) : null}
                          </div>
                        </Form>
                        <Divider />
                        <Form
                          labelcol={{
                            span: 4,
                          }}
                          wrappercol={{
                            span: 14,
                          }}
                          initialValues={{
                            remember: true,
                          }}
                          autoComplete="off"
                          onFinish={carryUpdate}
                        >
                          <div className="leavesCount">
                            <Row>
                              <Col xs={24} sm={20} md={7}>
                                <div
                                  style={{
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    lineHeight: "18px",
                                    color: "#07182B",
                                    fontFamily: "Open Sans,sans-serif",
                                    marginBottom: "13px",
                                  }}
                                >
                                  Carry Forward
                                </div>
                              </Col>
                              <Col xs={24} sm={20} md={16}>
                                {editOptionalCarry === false ? (
                                  <>
                                    <div
                                      style={{
                                        fontSize: "14px",
                                        fontWeight: "600",
                                        lineHeight: "18px",
                                        color: "#07182B",
                                        fontFamily: "Open Sans,sans-serif",
                                        marginBottom: "7px",
                                      }}
                                    >
                                      Carry Forward Enabled
                                    </div>
                                    <div style={{ marginBottom: "13px" }}>
                                      {data?.carry ? data.carry : "Yes"}
                                    </div>
                                  </>
                                ) : (
                                  <Form.Item
                                    initialValue={
                                      data?.carry ? data.carry : null
                                    }
                                    name="carry"
                                  >
                                    <Checkbox
                                      onChange={onCheckbox}
                                      style={{
                                        fontSize: "14px",
                                        fontWeight: "600",
                                        lineHeight: "18px",
                                        color: "#07182B",
                                        fontFamily: "Open Sans,sans-serif",
                                      }}
                                    >
                                      Carry Forward Enabled
                                    </Checkbox>
                                  </Form.Item>
                                )}
                              </Col>
                              {editOptionalCarry === false ? (
                                <Col xs={24} sm={24} md={1}>
                                  <Button
                                    className="leaves"
                                    type="text"
                                    bordered={false}
                                    style={{
                                      // color: "#ffff",
                                      display: "none",
                                      // paddingTop: "7px",
                                      // paddingRight: "7px",
                                      // position: "absolute",
                                      // left: "17rem",
                                      // top: 10,
                                    }}
                                    onClick={() =>
                                      setEditOptionalCarry(!editOptionalCarry)
                                    }
                                  >
                                    <EditFilled />
                                  </Button>
                                </Col>
                              ) : null}
                            </Row>
                            {editOptionalCarry === true ? (
                              <Row
                                style={{
                                  display: "flex",
                                  justifyContent: "flex-end",
                                  marginTop: "3%",
                                }}
                              >
                                <Button
                                  onClick={() => {
                                    form.resetFields();
                                    setEditOptionalCarry(false);
                                  }}
                                  type="text"
                                  style={{ fontSize: 15 }}
                                >
                                  <CloseOutlined /> CANCEL
                                </Button>
                                <Col>
                                  <Button
                                    type="primary"
                                    htmlType="submit"
                                    style={{
                                      marginLeft: "10px",
                                      background: "#1963A6",
                                      width: "90px",
                                    }}
                                    onClick={() => {
                                      form.submit();
                                    }}
                                  >
                                    <CheckOutlined />
                                    SAVE
                                  </Button>
                                </Col>
                              </Row>
                            ) : null}
                          </div>
                        </Form>
                      </Card>
                    ) : null}
                    {lossPay ? (
                      <Card
                        className="sickCard"
                        title="Loss of Pay"
                        bordered={true}
                        style={{
                          marginLeft: "30px",

                          cursor: "default",
                        }}
                      >
                        <Form
                          // form={form}
                          labelcol={{
                            span: 4,
                          }}
                          wrappercol={{
                            span: 14,
                          }}
                          initialValues={{
                            remember: true,
                          }}
                          autoComplete="off"
                          onFinish={sickLeaveUpdate}
                        >
                          <div className="personalCardDiv">
                            <Row>
                              <Col xs={24} sm={24} md={15}>
                                <div>
                                  <Row>
                                    <Col xs={24} sm={24} md={23}>
                                      <div
                                        style={{
                                          fontSize: "14px",
                                          fontWeight: "600",
                                          lineHeight: "18px",
                                          color: "#07182B",
                                          fontFamily: "Open Sans,sans-serif",
                                          marginBottom: "7px",
                                        }}
                                      >
                                        Name
                                      </div>

                                      <div style={{ marginBottom: "13px" }}>
                                        Loss of Pay
                                      </div>
                                    </Col>
                                  </Row>
                                </div>
                              </Col>
                              <Col xs={24} sm={22} md={18}>
                                <div>
                                  <div
                                    style={{
                                      fontWeight: 600,
                                      lineHeight: "18px",
                                      color: "#07182b",
                                      fontSize: "15px",
                                      fontFamily: "Open Sans,sans-serif",
                                      marginBottom: "6px",
                                    }}
                                  >
                                    Description
                                  </div>

                                  <div>
                                    Employees taking leave under loss of pay
                                    will not be compensated for the missing days
                                    in their salary.
                                  </div>
                                </div>
                              </Col>
                            </Row>
                          </div>
                        </Form>
                        <Divider />
                        <Form
                          // form={form}
                          labelcol={{
                            span: 4,
                          }}
                          wrappercol={{
                            span: 14,
                          }}
                          initialValues={{
                            remember: true,
                          }}
                          autoComplete="off"
                          onFinish={leavesCountUpdate}
                        >
                          <div className="leavesCount">
                            <Row>
                              <Col xs={24} sm={20} md={7}>
                                <div
                                  style={{
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    lineHeight: "18px",
                                    color: "#07182B",
                                    fontFamily: "Open Sans,sans-serif",
                                    marginBottom: "13px",
                                  }}
                                >
                                  Leaves Count
                                </div>
                              </Col>

                              <Col xs={24} sm={20} md={8}>
                                <div
                                  style={{
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    lineHeight: "18px",
                                    color: "#07182B",
                                    fontFamily: "Open Sans,sans-serif",
                                    marginBottom: "7px",
                                  }}
                                >
                                  Weekends Between Leave
                                </div>
                                {editPayLossLeave === false ? (
                                  <div>
                                    {data?.weekends
                                      ? data.weekends
                                      : "Not Considered"}
                                  </div>
                                ) : (
                                  <Form.Item
                                    initialValue={
                                      data?.weekends ? data.weekends : null
                                    }
                                    name="weekends"
                                  >
                                    <Checkbox onChange={onCheckbox}>
                                      Count as Leave
                                    </Checkbox>
                                  </Form.Item>
                                )}
                              </Col>
                              <Col xs={24} sm={24} md={8}>
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                  }}
                                >
                                  <div
                                    style={{
                                      fontSize: "14px",
                                      fontWeight: "600",
                                      lineHeight: "18px",
                                      color: "#07182B",
                                      fontFamily: "Open Sans,sans-serif",
                                      // marginTop: "15px",
                                    }}
                                  >
                                    Holidays Between Leave
                                  </div>
                                  {editPayLossLeave === false ? (
                                    <div
                                      style={{
                                        marginTop: "5px",
                                        marginRight: "4rem",
                                      }}
                                    >
                                      {data?.holidays
                                        ? data.holidays
                                        : "Not Considered"}
                                    </div>
                                  ) : (
                                    <Form.Item
                                      initialValue={
                                        data?.holidays ? data.holidays : null
                                      }
                                      name="holidays"
                                    >
                                      <Checkbox onChange={onCheckbox}>
                                        Count as Leave
                                      </Checkbox>
                                    </Form.Item>
                                  )}
                                </div>
                              </Col>
                              {editPayLossLeave === false ? (
                                <Col xs={24} sm={24} md={1}>
                                  <Button
                                    className="leaves"
                                    type="text"
                                    bordered={false}
                                    style={{
                                      // color: "#ffff",
                                      display: "none",
                                      // paddingTop: "7px",
                                      // paddingRight: "7px",
                                      // position: "absolute",
                                      // left: "17rem",
                                      // top: 10,
                                    }}
                                    onClick={() =>
                                      setEditPayLossLeave(!editPayLossLeave)
                                    }
                                  >
                                    <EditFilled />
                                  </Button>
                                </Col>
                              ) : null}
                            </Row>

                            {editPayLossLeave === true ? (
                              <Row
                                style={{
                                  display: "flex",
                                  justifyContent: "flex-end",
                                  marginTop: "3%",
                                }}
                              >
                                <Button
                                  onClick={() => {
                                    form.resetFields();
                                    setEditPayLossLeave(false);
                                  }}
                                  type="text"
                                  style={{ fontSize: 15 }}
                                >
                                  <CloseOutlined /> CANCEL
                                </Button>
                                <Col>
                                  <Button
                                    type="primary"
                                    htmlType="submit"
                                    style={{
                                      marginLeft: "10px",
                                      background: "#1963A6",
                                      width: "90px",
                                    }}
                                    onClick={() => {
                                      form.submit();
                                    }}
                                  >
                                    <CheckOutlined />
                                    SAVE
                                  </Button>
                                </Col>
                              </Row>
                            ) : null}
                          </div>
                        </Form>
                        <Divider />
                        <Form
                          labelcol={{
                            span: 4,
                          }}
                          wrappercol={{
                            span: 14,
                          }}
                          initialValues={{
                            remember: true,
                          }}
                          autoComplete="off"
                          onFinish={probationUpdate}
                        >
                          <div className="leavesCount">
                            <Row>
                              <Col xs={24} sm={20} md={7}>
                                <div
                                  style={{
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    lineHeight: "18px",
                                    color: "#07182B",
                                    fontFamily: "Open Sans,sans-serif",
                                    marginBottom: "13px",
                                  }}
                                >
                                  Applicability
                                </div>
                              </Col>
                              <Col xs={24} sm={20} md={16}>
                                {editPayLossProbation === false ? (
                                  <>
                                    <div
                                      style={{
                                        fontSize: "14px",
                                        fontWeight: "600",
                                        lineHeight: "18px",
                                        color: "#07182B",
                                        fontFamily: "Open Sans,sans-serif",
                                        marginBottom: "7px",
                                      }}
                                    >
                                      Allowed Under Probation
                                    </div>
                                    <div style={{ marginBottom: "13px" }}>
                                      {data?.probation ? data.probation : "Yes"}
                                    </div>
                                  </>
                                ) : (
                                  <Form.Item
                                    initialValue={
                                      data?.probation ? data.probation : null
                                    }
                                    name="probation"
                                  >
                                    <Checkbox
                                      onChange={onCheckbox}
                                      style={{
                                        fontSize: "14px",
                                        fontWeight: "600",
                                        lineHeight: "18px",
                                        color: "#07182B",
                                        fontFamily: "Open Sans,sans-serif",
                                      }}
                                    >
                                      Allowed Under Probation
                                    </Checkbox>
                                  </Form.Item>
                                )}
                              </Col>
                              {editPayLossProbation === false ? (
                                <Col xs={24} sm={24} md={1}>
                                  <Button
                                    className="leaves"
                                    type="text"
                                    bordered={false}
                                    style={{
                                      // color: "#ffff",
                                      display: "none",
                                      // paddingTop: "7px",
                                      // paddingRight: "7px",
                                      // position: "absolute",
                                      // left: "17rem",
                                      // top: 10,
                                    }}
                                    onClick={() =>
                                      setEditPayLossProbation(
                                        !editPayLossProbation
                                      )
                                    }
                                  >
                                    <EditFilled />
                                  </Button>
                                </Col>
                              ) : null}
                            </Row>
                            {editPayLossProbation === true ? (
                              <Row
                                style={{
                                  display: "flex",
                                  justifyContent: "flex-end",
                                  marginTop: "3%",
                                }}
                              >
                                <Button
                                  onClick={() => {
                                    form.resetFields();
                                    setEditPayLossProbation(false);
                                  }}
                                  type="text"
                                  style={{ fontSize: 15 }}
                                >
                                  <CloseOutlined /> CANCEL
                                </Button>
                                <Col>
                                  <Button
                                    type="primary"
                                    htmlType="submit"
                                    style={{
                                      marginLeft: "10px",
                                      background: "#1963A6",
                                      width: "90px",
                                    }}
                                    onClick={() => {
                                      form.submit();
                                    }}
                                  >
                                    <CheckOutlined />
                                    SAVE
                                  </Button>
                                </Col>
                              </Row>
                            ) : null}
                          </div>
                        </Form>
                        <Divider />
                      </Card>
                    ) : null}
                  </Col>
                </Row>
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Approvals" key="4">
              <ApprovalConfig />
            </Tabs.TabPane>
          </Tabs>
        </div>
      ) : (
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
                {leavedays != null
                  ? Object.keys(leavedays).map((user, id) => {
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
                    })
                  : null}
              </div>
            </Col>

            <Col
              xl={24}
              lg={24}
              md={24}
              sm={24}
              xs={24}
              span={2}
              style={{
                marginTop: "10px",
              }}
            >
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
                        cursor: "default",
                        marginLeft: "10px",
                        marginRight: "5px",
                        marginTop: "10px",
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
                        cursor: "default",
                        marginRight: "5px",
                        marginTop: "10px",
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
                        cursor: "default",
                        marginRight: "5px",
                        marginTop: "10px",
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
                        cursor: "default",
                        marginRight: "5px",
                        marginTop: "10px",
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
                    <div>
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
                      <div>
                        <LeaveCreate isHr={isHr} refresh={getConfigurations} />
                      </div>
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
                          setSecondModal(true);
                        }}
                      >
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

            <Modal
              className="viewAppraisal"
              bodyStyle={{
                overflowY: "auto",
                maxHeight: "calc(100vh - 200px)",
              }}
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
                  >
                    <Row
                      gutter={[16, 0]}
                      className="row-one-div"
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                    >
                      <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                        <Form.Item
                          required={false}
                          labelAlign="left"
                          style={{
                            marginBottom: "20px",
                            color: "white",
                            minWidth: "70px",
                          }}
                          label={
                            <label
                              style={{ color: "black", fontWeight: "400" }}
                            >
                              Start Date<span style={{ color: "red" }}> *</span>
                            </label>
                          }
                          name="dateStart"
                          rules={[
                            {
                              required: true,
                              message: "Please Select Date",
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
                      <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                        <Form.Item
                          labelAlign="left"
                          name="slotStart"
                          style={{ marginBottom: "25px" }}
                          className="div-slot"
                          label={
                            <label
                              style={{ color: "black", fontWeight: "400" }}
                            >
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

                    <Row
                      gutter={[16, 0]}
                      className="row-one-div"
                      style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                        <Form.Item
                          required={false}
                          labelAlign="left"
                          style={{ marginBottom: "20px", color: "white" }}
                          label={
                            <label
                              style={{ color: "black", fontWeight: "400" }}
                            >
                              End Date<span style={{ color: "red" }}> *</span>
                            </label>
                          }
                          name="dateEnd"
                          rules={[
                            {
                              required: true,
                              message: "Please Select Date",
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

                      <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                        <Form.Item
                          labelAlign="left"
                          name="slotEnd"
                          style={{ marginBottom: "25px" }}
                          className="div-slot"
                          label={
                            <label
                              style={{ color: "black", fontWeight: "400" }}
                            >
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

                    <Form.Item
                      required={false}
                      labelAlign="left"
                      name="leaveNature"
                      style={{ marginBottom: "20px" }}
                      label={
                        <label style={{ color: "black", fontWeight: "400" }}>
                          Nature of Leave
                          <span style={{ color: "red" }}> *</span>
                        </label>
                      }
                      rules={[
                        {
                          required: true,
                          message: "Select Nature of Leave",
                        },
                      ]}
                    >
                      <Select
                        placeholder="Select an option"
                        allowClear
                        disabled={disableNature()}
                        onChange={onLeaveNatureChange}
                      >
                        {leavedays != null
                          ? Object.keys(leavedays).map((u) => (
                              <Option
                                disabled={disabledLeaveNature(u)}
                                value={u}
                              >
                                {u}
                              </Option>
                            ))
                          : null}
                        <Option value={"Loss of Pay"}>Loss of Pay</Option>
                      </Select>
                    </Form.Item>

                    <Form.Item
                      required={false}
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
                          message: "Please Enter a Reason",
                        },
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
                      <Input disabled />
                    </Form.Item>

                    <Form.Item
                      style={{ paddingTop: "px" }}
                      wrapperCol={{
                        offset: 8,
                        span: 24,
                      }}
                    >
                      <Button type="primary" htmlType="submit">
                        Submit
                      </Button>
                      <Button
                        htmlType="button"
                        type="default"
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
                  <div>
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
            {!isHr ? (
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
            ) : null}
          </Row>

          <Modal
            // bodyStyle={{ overflowY: 'scroll' }}
            // style={{ height: 'calc(100vh - 200px)' }}
            bodyStyle={{ overflowY: "auto", maxHeight: "calc(100vh - 200px)" }}
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
              <Col
                xl={24}
                lg={24}
                md={24}
                sm={24}
                xs={24}
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
                  <Row
                    gutter={[16, 0]}
                    className="row-one-div"
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                      <Form.Item
                        required={false}
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
                            message: "Please Select Date",
                          },
                        ]}
                        initialValue={
                          editedLeave.dateCalc == null
                            ? null
                            : moment(editedLeave.dateCalc[0], "Do MMM, YYYY")
                        }
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

                    <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                      <Form.Item
                        labelAlign="left"
                        name="slotStart"
                        style={{ marginBottom: "25px" }}
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

                  <Row
                    gutter={[16, 0]}
                    className="row-one-div"
                    style={{ display: "flex", justifyContent: "space-evenly" }}
                  >
                    <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                      <Form.Item
                        required={false}
                        labelAlign="left"
                        style={{ marginBottom: "20px", color: "white" }}
                        label={
                          <label style={{ color: "black", fontWeight: "400" }}>
                            End Date<span style={{ color: "red" }}> *</span>
                          </label>
                        }
                        name="dateEnd"
                        rules={[
                          {
                            required: true,
                            message: "Please Select Date",
                          },
                        ]}
                        initialValue={
                          editedLeave.dateCalc == null
                            ? null
                            : moment(
                                editedLeave.dateCalc[
                                  editedLeave.dateCalc.length - 1
                                ],
                                "Do MMM, YYYY"
                              )
                        }
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
                    <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                      <Form.Item
                        labelAlign="left"
                        name="slotEnd"
                        style={{ marginBottom: "25px" }}
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
                  <Form.Item
                    required={false}
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
                        message: "Select Nature of Leave",
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
                      {leavedays != null
                        ? Object.keys(leavedays).map((u) => (
                            <Option disabled={disabledLeaveNature(u)} value={u}>
                              {u}
                            </Option>
                          ))
                        : null}
                      <Option value={"Loss of Pay"}>Loss of Pay</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    required={false}
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
                        message: "Please Enter a Reason",
                      },
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
                    <Input disabled />
                  </Form.Item>

                  <Form.Item
                    style={{ paddingTop: "px" }}
                    wrapperCol={{
                      offset: 8,
                      span: 24,
                    }}
                  >
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                    <Button
                      htmlType="button"
                      type="default"
                      style={{ marginLeft: "10px" }}
                      onClick={() => {
                        form1.resetFields();
                        setDateSelected(editedLeave.dateCalc);
                        setDateStart(
                          moment(editedLeave.dateCalc, "Do MMM, YYYY")
                        );
                        setStartSlot(editedLeave.slotStart);
                        setDateEnd(
                          moment(editedLeave.dateCalc, "Do MMM, YYYY")
                        );
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
      )}
    </>
  );
};

export default Leave;
