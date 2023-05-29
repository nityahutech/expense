import { useEffect, useState } from "react";
import {
  Col,
  Row,
  Select,
  Table,
  Calendar,
  Modal,
  Tag,
  Tabs,
  DatePicker,
  Spin,
  AutoComplete,
} from "antd";
import { Button } from "antd";
import { Form, Input } from "antd";
import moment from "moment";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import LeaveContext from "../contexts/LeaveContext";
import CompanyHolidayContext from "../contexts/CompanyHolidayContext";
import EmpInfoContext from "../contexts/EmpInfoContext";
import HolidayList from "./HolidayList";
import ApprovalConfig from "./ApprovalConfig";
import LeaveType from "./LeaveType";
import "../style/leave.css";
import ConfigureContext from "../contexts/ConfigureContext";
import {
  capitalize,
  getUsers,
  showNotification,
} from "../contexts/CreateContext";
import LeaveRequests from "./LeaveRequests";

const Leave = (props) => {
  const { RangePicker } = DatePicker;
  const { Option } = Select;
  const dateFormat = "Do MMM, YYYY";
  const isAdmin = props.roleView == "admin";
  const isHr = JSON.parse(sessionStorage.getItem("isHr"));
  const currentUser = JSON.parse(sessionStorage.getItem("user"));
  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const isMgr = JSON.parse(sessionStorage.getItem("isMgr"));
  const [leavedays, setLeaveDays] = useState(null); //leave nature & total in obj
  const [totaldays, setTotalDays] = useState([]); //leave nature & taken in obj
  const [date, setDate] = useState(moment()); //date for calendar
  const [companyholiday, setCompanyholiday] = useState([]); //holidays in array of objects
  const [configurations, setConfigurations] = useState([]); //leave type configurations in array of obhects
  const [leaves, setLeaves] = useState([]); //all leaves in array of obects
  const [duration, setDuration] = useState([]); //all days of applied leaves in array
  const [tempDur, setTempDur] = useState([]); //all days of applied leaves in array (temp for edit)
  const [durStatus, setDurStatus] = useState([]); //corresponding status of duration in array
  const [repManager, setRepManager] = useState(); //name of currentUser's reporting manager
  const [secondModal, setSecondModal] = useState(false); //boolean to open apply leave modal
  const [adminLeave, setAdminLeave] = useState(false); //boolean to open apply leave modal for admin
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); //boolean to open edit leave modal
  const [editedLeave, setEditedLeave] = useState({}); //leave record to be edited
  const [requests, setRequests] = useState([]); //leave requests for managers in array of objects
  const [allRequests, setAllRequests] = useState([]); //leave requests for hr in array of objects
  const [filterRequest, setFilterRequest] = useState([]);
  const [dateSelected, setDateSelected] = useState([]);
  const [dateStart, setDateStart] = useState(null);
  const [dateEnd, setDateEnd] = useState(null);
  const [startSlot, setStartSlot] = useState("Full Day");
  const [endSlot, setEndSlot] = useState("Full Day");
  const [validleaverequest, setValidleaverequest] = useState("false");
  const [options, setOptions] = useState([]);
  const [allEmpName, setAllEmpName] = useState([]);
  const [allEmpMap, setAllEmpMap] = useState({});
  const [empApply, setEmpApply] = useState(null);

  const [filterCriteria, setFilterCriteria] = useState({
    search: "",
    date: [],
    category: "all",
  });

  const getHoliday = async () => {
    let data = await CompanyHolidayContext.getAllCompanyHoliday();
    setCompanyholiday(data);
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
    let matchingdates = dateSelected.filter((item) => tempDur.includes(item));
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
      approver: values.approver || currentUser.displayName,
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
      approver: values.approver || currentUser.displayName,
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
          console.log(error);
          showNotification(
            "error",
            "Error",
            "Unable to process leave request!"
          );
        });
      form.resetFields();
      setDateSelected([]);
      setDateStart(null);
      setStartSlot("Full Day");
      setDateEnd(null);
      setEndSlot("Full Day");
      setValidleaverequest(false);
      setSecondModal(false);
    } else {
      console.log("error");
      showNotification("error", "Error", "Unable to process leave request!");
    }
  };

  useEffect(() => {
    if (empApply != null) getAdminData(empApply);
  }, [empApply]);

  const getAdminData = (emp) => {
    let id = allEmpMap[`${emp}`][0];
    let array = [];
    let userReq = allRequests.filter((x) => {
      if (x.empId == id) {
        array.push(x.dateCalc);
        return true;
      }
    });
    setTempDur([].concat.apply([], array));
    // console.log(userReq, [].concat.apply([], array))
  };
  // console.log(empApply, tempDur)
  useEffect(() => {
    getAllUser();
  }, []);

  const onSearch = (searchText) => {
    if (searchText == "") {
      setEmpApply(null);
      form.resetFields();
      setDateStart(null);
      setEndSlot("Full Day");
      setValidleaverequest(false);
      onLeaveDateChange();
      return;
    }
    let matchingName = allEmpName.filter((ex) => {
      return ex.value.toLowerCase().includes(searchText.toLowerCase());
    });
    setOptions(!searchText ? [] : matchingName);
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
    setAllEmpMap(userMap);
    setAllEmpName(allUsers);
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
    setFilterRequest(req);
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
  useEffect(() => {
    setLoading(true);
    getConfigurations(true);
    getHoliday();
    const timer = setTimeout(() => {
      setLoading(false);
    }, 750);
    if (isHr) getAllRequests();
    if (isMgr) getRequestData();
    return () => clearTimeout(timer);
  }, [props.roleView]);

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

  const searchChange = (e) => {
    let search = e.target.value;
    if (search) {
      let result = allRequests.filter(
        (req) =>
          req.name.toLowerCase().includes(search.toLowerCase()) ||
          req.nature.toLowerCase().includes(search.toLowerCase()) ||
          req.date.includes(search)
      );
      const reqestALL = [...result];
      setFilterRequest(reqestALL);
    } else {
      setFilterRequest(allRequests);
    }
  };

  const onLeaveNatureChange = (value) => {
    if (value == "Optional Leave" || value == "Sick Leave") {
      if (dateSelected.length == 1) {
        validateLeaveRequest(endSlot == "Full Day" ? 0 : 0.5, value);
      } else {
        setValidleaverequest(false);
        showNotification(
          "error",
          "Error",
          `${value} can only be for 1 full day!`
        );
      }
      return;
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
    form.setFieldsValue({ leaveNature: null });
    form1.setFieldsValue({ leaveNature: null });
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
            !tempDur.includes(i.format("Do MMM, YYYY"))
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
  const monthCellRender = (value) => {
    const listData = [];
    companyholiday.forEach((hol) => {
      if (
        value.format("MMM, YYYY") ==
        moment(hol.date, "Do MMM, YYYY").format("MMM, YYYY")
      ) {
        listData.push({
          name: hol.name,
          optionalHoliday: hol.optionalHoliday,
        });
      }
    });
    let color,
      bgColor,
      scroll =
        listData.length > 2 ? { height: "40px", overflowY: "scroll" } : null;
    return (
      <ul style={scroll}>
        {listData.map((d) => {
          color = d.optionalHoliday
            ? "rgba(0, 119, 137, 0.96)"
            : "rgba(252, 143, 10, 1)";
          bgColor = d.optionalHoliday
            ? "rgba(154, 214, 224, 0.96)"
            : "rgba(252, 143, 10,0.2)";
          return (
            <li
              style={{
                backgroundColor: bgColor,
                color: color,
                fontSize: "12px",
                paddingLeft: "5px",
                paddingRight: "5px",
                margin: "0px",
                borderRadius: "100px",
                justifyContent: "center",
                marginBottom: "3px",
              }}
            >
              {d.name}
            </li>
          );
        })}
      </ul>
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
      align: "left",
      width: 150,
      sorter: (a, b) => {
        return a.name !== b.name ? (a.name < b.name ? -1 : 1) : 0;
      },
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Nature of Leave",
      dataIndex: "nature",
      align: "left",
      width: 150,
    },
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
      align: "left",
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
            style={{ width: "80px", color: "black", textAlign: "center" }}
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
      align: "left",
      width: 150,
    },
    {
      key: "5",
      title: "Actions",
      fixed: "right",
      align: "left",
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
      align: "left",
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
      align: "left",
    },
    {
      key: "5",
      title: "Actions",
      fixed: "right",
      align: "left",
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
                  form1.resetFields();
                  setEditedLeave(record);
                  setTempDur(
                    duration.filter((x) => !record.dateCalc.includes(x))
                  );
                  setIsEditModalOpen(true);
                  setDateSelected(record.dateCalc);
                  setDateStart(moment(record.dateCalc[0], "Do MMM, YYYY"));
                  setStartSlot(record.slotStart);
                  setDateEnd(
                    moment(record.dateCalc[record.len - 1], "Do MMM, YYYY")
                  );
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
    if (tempDur.includes(moment(current).format("Do MMM, YYYY"))) {
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
    if (dateStart == null) {
      if (isEditModalOpen) {
        form1.setFieldsValue({ dateEnd: null });
        form1.setFieldsValue({ sloltEnd: "Full Day" });
      } else {
        form.setFieldsValue({ dateEnd: null });
        form.setFieldsValue({ slotEnd: "Full Day" });
      }
      return true;
    }
    return false;
  };
  const disableNature = () => {
    if (dateStart == null || dateEnd == null) {
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
  //-----------------------------------------filter-------------------------
  const onChange = (date) => {
    setFilterCriteria({ ...filterCriteria, date });
    if (date) {
      let result = allRequests.filter((ex) => {
        return (
          moment(ex.dateCalc[0], dateFormat).isSame(date[0], "day") ||
          moment(ex.dateCalc[0], dateFormat).isSame(date[1], "day") ||
          (moment(ex.date, dateFormat).isSameOrAfter(date[0]) &&
            moment(ex.date, dateFormat).isSameOrBefore(date[1])) ||
          moment(ex.dateCalc[ex.len - 1], dateFormat).isSame(date[0], "day") ||
          moment(ex.dateCalc[ex.len - 1], dateFormat).isSame(date[1], "day")
        );
      });

      const modifiedFilterExpense = [...result];
      setFilterRequest(modifiedFilterExpense);
    } else {
      setFilterRequest(allRequests);
    }
  };

  // console.log(dateSelected);
  // console.log(empApply);

  return (
    <>
      {isAdmin ? (
        <div className="leavePageDiv">
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

                <Col span={24}>
                  <Row
                    gutter={[24, 8]}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: "white",
                      borderRadius: "10px",
                      padding: "10px",
                      marginTop: "10px",
                      marginLeft: "5px",
                    }}
                  >
                    <Col xs={24} sm={22} md={6}>
                      <Input
                        className="searchBar"
                        placeholder="Search"
                        prefix={<SearchOutlined />}
                        onChange={searchChange}
                        style={{ width: "100%" }}
                      />
                    </Col>
                    <Col xs={24} sm={22} md={7}>
                      <RangePicker
                        style={{ width: "100%" }}
                        format={dateFormat}
                        onChange={onChange}
                      />
                    </Col>
                    <Col xs={24} sm={22} md={6}>
                      <Form.Item style={{ marginBottom: "0px" }}>
                        <Select
                          allowClear
                          placeholder="Nature of Leave"
                          onChange={(e) => {
                            if (!e) {
                              setFilterRequest(allRequests);
                              return;
                            }
                            const filteredLeave = allRequests.filter(
                              (leaveNat) => leaveNat.nature.includes(e)
                            );
                            setFilterRequest(filteredLeave);
                          }}
                          options={[
                            ...Object.keys(totaldays).map((day) => {
                              return {
                                value: day,
                                label: day,
                              };
                            }),
                            {
                              value: "Loss Of Pay",
                              label: "Loss Of Pay",
                            },
                          ]}
                        />
                      </Form.Item>
                    </Col>
                    <Col
                      xs={24}
                      sm={22}
                      md={5}
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <Button
                        className="button-applyleave"
                        style={{
                          borderRadius: "15px",
                          width: "120px",
                          marginTop: "0px",
                          backgroundColor: "#1963a6",
                          borderColor: "#1963a6",
                        }}
                        type="primary"
                        onClick={() => {
                          // console.log(true)
                          setAdminLeave(true);
                        }}
                      >
                        Apply Leave
                      </Button>
                    </Col>
                  </Row>
                </Col>

                <Col
                  xl={24}
                  lg={24}
                  md={24}
                  sm={24}
                  xs={24}
                  style={{
                    background: "flex",
                    paddingTop: "10px",
                  }}
                >
                  <div className="history-table">
                    <Table
                      className="leaveTable"
                      columns={reqColumns}
                      dataSource={filterRequest}
                      pagination={{
                        position: ["bottomCenter"],
                      }}
                      scroll={{ x: 600 }}
                      size="small"
                    />
                  </div>
                </Col>
              </Row>

              <Modal
                className="viewAppraisal"
                bodyStyle={{
                  overflowY: "auto",
                  maxHeight: "calc(100vh - 200px)",
                }}
                footer={null}
                title="Apply Employee Leave"
                centered
                open={adminLeave}
                width={450}
                closeIcon={
                  <div
                    onClick={() => {
                      setAdminLeave(false);
                      setEmpApply(null);
                      form.resetFields();
                      setDateSelected([]);
                      setDateStart(null);
                      setStartSlot(null);
                      setDateEnd(null);
                      setEndSlot(null);
                      setValidleaverequest(false);
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
                                Employee Name
                                <span style={{ color: "red" }}> *</span>
                              </label>
                            }
                            name="name"
                            rules={[
                              {
                                required: true,
                                message: "Please Enter Name",
                              },
                            ]}
                          >
                            <AutoComplete
                              // bordered={false}
                              allowClear
                              options={options}
                              onSearch={onSearch}
                              onSelect={(e) => {
                                onLeaveDateChange();
                                // console.log(e)
                                setEmpApply(e);
                                if (e == null) {
                                  form.setFieldsValue({ dateStart: null });
                                  setEndSlot("Full Day");
                                  form.setFieldsValue({ approver: "" });
                                  setValidleaverequest(false);
                                } else {
                                  form.setFieldsValue({
                                    approver: allEmpMap[`${e}`][1],
                                  });
                                }
                              }}
                            />
                            {/* <DatePicker
                            style={{ width: "100%", backgroundColor: "#ffffff" }}
                            format="Do MMM, YYYY"
                            onChange={(e) => {
                              setDateStart(e);
                              onLeaveDateChange();
                              if (e == null) {
                                setDateEnd(e);
                                setEndSlot("Full Day");
                                setValidleaverequest(false)
                              }
                            }}
                            disabledDate={disabledDate}
                          /> */}
                          </Form.Item>
                        </Col>
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
                                Start Date
                                <span style={{ color: "red" }}> *</span>
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
                                if (e == null) {
                                  setDateEnd(e);
                                  setEndSlot("Full Day");
                                  setValidleaverequest(false);
                                }
                              }}
                              disabled={empApply == null}
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
                                Start Slot
                                <span style={{ color: "red" }}> *</span>
                              </label>
                            }
                            initialValue={"Full Day"}
                          >
                            <Select
                              style={{ width: "100%" }}
                              disabled={empApply == null}
                              onChange={(e) => {
                                setStartSlot(e);
                                onLeaveDateChange();
                              }}
                            >
                              <Option value="Full Day">Full Day</Option>
                              <Option value="Half Day (First Half)">
                                Half Day (First Half)
                              </Option>
                              <Option value="Half Day (Second Half)">
                                Half Day (Second Half)
                              </Option>
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
                              <Option value="Half Day (First Half)">
                                Half Day (First Half)
                              </Option>
                              <Option value="Half Day (Second Half)">
                                Half Day (Second Half)
                              </Option>
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
                            const str = e.target.value;
                            const caps = str
                              .split(". ")
                              .map(capitalize)
                              .join(". ");
                            form.setFieldsValue({ reason: caps });
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
                        // initialValue={empApply != null ? allEmpMap[`${empApply}`][1] : ""}
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
                        <HolidayList
                          role={props.roleView}
                          refreshCalendar={getHoliday}
                        />
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
                    monthCellRender={monthCellRender}
                  />
                </div>
              </card>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Leave Type" key="3">
              <LeaveType data={configurations} getData={getConfigurations} />
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
                          style={{ background: "#1963A6", color: "white" }}
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
                  monthCellRender={monthCellRender}
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
              open={secondModal}
              width={450}
              closeIcon={
                <div
                  onClick={() => {
                    setSecondModal(false);
                    form.resetFields();
                    setDateSelected([]);
                    setDateStart(null);
                    setStartSlot(null);
                    setDateEnd(null);
                    setEndSlot(null);
                    setValidleaverequest(false);
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
                            style={{
                              width: "100%",
                              backgroundColor: "#ffffff",
                            }}
                            format="Do MMM, YYYY"
                            onChange={(e) => {
                              setDateStart(e);
                              onLeaveDateChange();
                              if (e == null) {
                                setDateEnd(e);
                                setEndSlot("Full Day");
                                setValidleaverequest(false);
                              }
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
                            <Option value="Half Day (First Half)">
                              Half Day (First Half)
                            </Option>
                            <Option value="Half Day (Second Half)">
                              Half Day (Second Half)
                            </Option>
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
                            <Option value="Half Day (First Half)">
                              Half Day (First Half)
                            </Option>
                            <Option value="Half Day (Second Half)">
                              Half Day (Second Half)
                            </Option>
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
                          const str = e.target.value;
                          const caps = str
                            .split(". ")
                            .map(capitalize)
                            .join(". ");
                          form.setFieldsValue({ reason: caps });
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

            {isMgr ? (
              <LeaveRequests data={[...requests]} getData={getData} />
            ) : null}

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
            bodyStyle={{ overflowY: "auto", maxHeight: "calc(100vh - 200px)" }}
            className="viewAppraisal"
            centered
            width={450}
            open={isEditModalOpen}
            footer={null}
            destroyOnClose
            title="Edit Applied Leave"
            closeIcon={
              <div
                onClick={() => {
                  form1.resetFields();
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
                          style={{ width: "100%", backgroundColor: "#ffffff" }}
                          format="Do MMM, YYYY"
                          onChange={(e) => {
                            setDateStart(e);
                            onLeaveDateChange();
                            if (e == null) {
                              setDateEnd(e);
                              setEndSlot("Full Day");
                              setValidleaverequest(false);
                            }
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
                          <Option value="Half Day (First Half)">
                            Half Day (First Half)
                          </Option>
                          <Option value="Half Day (Second Half)">
                            Half Day (Second Half)
                          </Option>
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
                                editedLeave.dateCalc[editedLeave.len - 1],
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
                          <Option value="Half Day (First Half)">
                            Half Day (First Half)
                          </Option>
                          <Option value="Half Day (Second Half)">
                            Half Day (Second Half)
                          </Option>
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
                    // initialValues
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
                        const str = e.target.value;
                        const caps = str.split(". ").map(capitalize).join(". ");
                        form1.setFieldsValue({ reason: caps });
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
                        form1.resetFields();
                        setDateSelected(editedLeave.dateCalc);
                        setDateStart(
                          moment(editedLeave.dateCalc[0], "Do MMM, YYYY")
                        );
                        setStartSlot(editedLeave.slotStart);
                        setDateEnd(
                          moment(
                            editedLeave.dateCalc[editedLeave.len - 1],
                            "Do MMM, YYYY"
                          )
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
