import React, { useEffect, useState, } from 'react';
import {
    Col,
    Row,
    Select,
    Radio,
    Table,
    Calendar,
    Modal,
    Tag,
    notification,
    Spin,

} from 'antd';
import { Button } from 'antd';
import { Form, Input, } from 'antd';
import moment from "moment";
import {  DeleteOutlined } from "@ant-design/icons";
import LeaveContext from '../contexts/LeaveContext';
import CompanyHolidayContext from '../contexts/CompanyHolidayContext';
import EmployeeContext from '../contexts/EmployeeContext';
import { useAuth } from '../contexts/AuthContext'
import Notification from "./Notification";
import HolidayList from "./HolidayList";
import "../style/leave.css";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";

const Leave = () => {
    const [dateSelected, setDateSelected] = useState([]);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [leaves, setLeaves] = useState([]);
    const [history, setHistory] = useState([]);
    const [requests, setRequests] = useState([]);
    const [pendingRequests, setPendingRequests] = useState([]);
    const [allRequests, setAllRequests] = useState([]);
    const [dataSource, setDataSource] = useState([]);
    const [duration, setDuration] = useState([]);
    const [noOfDays, setNoOfDays] = useState([]);
    const [isHr, setIsHr] = useState(sessionStorage.getItem("role") === "hr" ? true : false);
    const [isMgr, setIsMgr] = useState(false);
    const { currentUser } = useAuth();
    const format = "D MMM, YYYY"
    const [leavedays, setLeaveDays] = useState({
        'Earn Leave': 0,
        'Sick Leave': 0,
        'Casual Leave': 0,
        'Optional Leave': 0
    })
    const [totaldays, setTotalDays] = useState({
        'Earn Leave': 0,
        'Sick Leave': 0,
        'Casual Leave': 0,
        'Optional Leave': 0
    })
    const [leavetype, setLeavetype] = useState()
    const [validleaverequest, setValidleaverequest] = useState('false')
    const [leaveslot, setLeaveslot] = useState(null)
    const [companyholiday, setCompanyholiday] = useState([])
    const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    const [employeeRecord, setEmployeeRecord] = useState();
    const [repManager, setRepManager] = useState();


    function addNewHoliday() {
        getHoliday()
    }

    const getHoliday = async () => {

        const allData = await CompanyHolidayContext.getAllCompanyHoliday();
            let d = allData.docs.map((doc) => {
                return {
                    ...doc.data(),
                    Date: moment(doc.data()["Date"].seconds * 1000).format(format),
                    id: doc.id,
                };
            });
            setCompanyholiday(d)
    }

    const getListData = (value) => {
        let listData;
        let currdate = value.format(("Do MMM, YYYY"));
        let companyHolidayRecord = companyholiday.filter(record => record.Date == value.format("D MMM, YYYY"));
        if (companyHolidayRecord.length > 0) {
            listData = [
                {
                    type: companyHolidayRecord[0].Name,
                    isOptional: companyHolidayRecord[0]?.optionalHoliday
                }
            ]
        }
        let temp = duration.indexOf(currdate)
        if (temp != -1) {
            if (dataSource[temp] != "Rejected") {
            listData = [
                {
                    type: dataSource[temp] == "Approved"?'On Leave':'Pending',
                    status: dataSource[temp]
                }
            ]}
        }

        return listData || [];
    };

    const getMonthData = (value) => {
        if (value.month() === 8) {
            return 1394;
        }
    };

    const onFinish = values => {
        if (values.leaveNature === "Optional Leave" || dateSelected.length == 1) {

            let optionalHolidays = companyholiday.filter((item) => {
                if (item.optionalHoliday == true) {
                    return true
                }
                else {
                    return false
                }
            })
            let matchOptionalHoliday = optionalHolidays.filter((item) => {
                if (item.Date == dateSelected[0].format(format)) {
                    return true
                }
                else {
                    return false
                }
            })
            if (matchOptionalHoliday.length > 0 && values.leaveNature != "Optional Leave") {


                showNotification("error", "Error", "Optional Leave Can only be apply on Optional Holiday");
                return
            }

        }

        let array = []
        dateSelected.map((date, index) => {
            let temp = date.format("DD-MM-YYYY")
            array.push(moment(temp, "DD-MM-YYYY").format("Do MMM, YYYY"))
        })
        setDateSelected(array)
        let matchingdates = leaves.filter((item) => {
            for (let i = 0; i < array.length; i++) {
                if (item.dateCalc.includes(array[i])) {
                    return true
                }
            }
            return false


        })
        if (matchingdates.length > 0) {
            showNotification("error", "Error", "Allready apply Leave on one of the day");
            return
        }
        let newLeave = {
            empId: employeeRecord.empId,
            approver: values.approver,
            date: array,
            name: currentUser.displayName,
            nature: values.leaveNature,
            slot: values.slot,
            reason: values.reason,
            status: 'Pending'
        }

        LeaveContext.createLeave(newLeave)
            .then(response => {
                getData();
                showNotification("success", "Success", "Leave apply successfuly");

            })
            .catch(error => {
                console.log(error.message);

            })
        form.resetFields();
    };


    const getData = async () => {
        setLoading(true);
        let empRecord = await EmployeeContext.getEmployee(currentUser.uid)
        setRepManager(empRecord.repManager)
        setEmployeeRecord(empRecord)
        setIsMgr(empRecord.isManager)
        let data = await LeaveContext.getAllById(empRecord.empId)
        let d = data.docs.map((doc) => {
            return {
                ...doc.data(),
                id: doc.id,

            };
        });
        setLeaves(d);
        getDateFormatted(d)
        setHistory(d)
        let temp = {
            'Earn Leave': empRecord.earnLeave?empRecord.earnLeave:12,
            'Sick Leave': empRecord.sickLeave?empRecord.sickLeave:6,
            'Casual Leave': empRecord.casualLeave?empRecord.casualLeave:6,
            'Optional Leave': empRecord.optionalLeave?empRecord.optionalLeave:2
        }
        setTotalDays({
            'Earn Leave': empRecord.earnLeave?empRecord.earnLeave:12,
            'Sick Leave': empRecord.sickLeave?empRecord.sickLeave:6,
            'Casual Leave': empRecord.casualLeave?empRecord.casualLeave:6,
            'Optional Leave': empRecord.optionalLeave?empRecord.optionalLeave:2
        })
        let days = await LeaveContext.getLeaveDays(d, temp)
        setLeaveDays(days)
        let array = [];
        let stats = [];
        d.forEach((rec) => {
            array.push(rec.dateCalc)
            for(let i = 0; i < rec.dateCalc.length; i++){
                stats.push(rec.status)
            }
        })
        setDuration([].concat.apply([], array))
        setDataSource(stats)
        setLoading(false);


    }

    const getRequestData = async () => {

        let reqData = await LeaveContext.getAllByApprover(currentUser.displayName)
        let req = reqData.docs.map((doc) => {
            return {
                ...doc.data(),
                id: doc.id
            };
        });
        let temp = []
        getDateFormatted(req)
        req.forEach(dur => {
        if (dur.status == "Pending") {
                temp.push(dur)
            }
        });
        setRequests(req);
        setPendingRequests(temp)
    }

    const getAllRequests = async () => {

        let reqData = await LeaveContext.getLeaves()
        let req = reqData.docs.map((doc) => {
            return {
                ...doc.data(),
                id: doc.id
            };
        });
        getDateFormatted(req)
        setAllRequests(req);
    }

    const onDeleteLeave = (record) => {
        Modal.confirm({
            title: "Are you sure, you want to delete  Leave record?",
            okText: "Yes",
            okType: "danger",

            onOk: () => {
                LeaveContext.deleteLeave(record.id)
                    .then(response => {
                        console.log(response);
                        getData();
                    })
                    .catch(error => {
                        console.log(error.message);

                    })
            },
        });
    };

    const onReset = () => {
        form.resetFields()
        setLeavetype(null)
        setValidleaverequest('false')
        setLeaveslot(null)
    }
    const { Option } = Select;

    const columns = [
        {
            title: 'Duration',
            dataIndex: 'date',
            width: 240,
            align: "left",
            sorter: (a, b) => {
                return a.date !== b.date ? (a.date < b.date ? -1 : 1) : 0;
            },
            sortDirections: ["ascend", "descend"],



        },
        // {
        //     title: 'Employee Name',
        //     dataIndex: 'name',
        //     width: 150,

        // },
        {
            title: 'Nature of Leave',
            dataIndex: 'nature',
            width: 150,
            align: "left",
            sorter: (a, b) => {
                return a.nature !== b.nature ? (a.nature < b.nature ? -1 : 1) : 0;
            },
            sortDirections: ["ascend", "descend"],

        },
        {
            title: 'Slot',
            dataIndex: 'slot',
            width: 100,
            align: "left",
            sorter: (a, b) => {
                return a.slot !== b.slot ? (a.slot < b.slot ? -1 : 1) : 0;
            },
            sortDirections: ["ascend", "descend"],


        },
        {
            title: 'Reason',
            dataIndex: 'reason',
            width: 150,
        },
        {
            title: 'Approver',
            dataIndex: 'approver',
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
            // responsive: ["md"],
            sorter: (a, b) => {
                return a.status !== b.status ? (a.status < b.status ? -1 : 1) : 0;
            },
            sortDirections: ["ascend", "descend"],
            render: (_, { status }) =>
                status !== "" && (
                    <Tag style={{ width: '70px' }}
                        className="statusTag"
                        color={status === "Approved" ? "green" : status === "Pending" ? 'blue' : "volcano"}
                        key={status}
                    >
                        {status}
                    </Tag>
                ),
        },
        {
            title: 'Comment',
            dataIndex: 'comment',
            width: 150,
        },
        {
            key: "5",
            title: "Actions",
            fixed: 'right',
            width: 80,
            render: (record) => {
                return (
                    <>
                        {
                            <>
                                <DeleteOutlined

                                    disabled={record?.status === 'Approved'}
                                    onClick={() => {
                                        if (record?.status !== 'Approved')
                                            onDeleteLeave(record);
                                    }}
                                    style={
                                        record?.status === 'Approved'
                                            ? { color: "green", cursor: "not-allowed", marginLeft: 10 }
                                            : record?.status === 'Pending'
                                                ? { color: "blue", marginLeft: 10 }
                                                : { color: "red", marginLeft: 10 }}
                                />
                            </>

                        }
                    </>
                );
            },
        }

    ];
    useEffect(() => {
        getRequestData();
        if (isHr) getAllRequests();
        getData();
        getHoliday();
    }, []);

    useEffect(() => {
        getRequestData();
        if (isHr) getAllRequests();
    }, [loading]);

    const getDateFormatted = ((data) => {
        data.forEach(dur => {
            let len = dur.date.length
            dur.dateCalc = dur.date
            dur.date = len == 1 ?dur.date[0] : dur.date[0] + " to " + dur.date[len - 1]
        })
    })

    const showNotification = (type, msg, desc) => {
        notification[type]({
            message: msg,
            description: desc,
        });
    };

    const validateLeaveRequest = (noOfDays, leavetype) => {
        if (leavetype != null && dateSelected.length > 0) {
            if (leavedays[leavetype] < noOfDays) {
                showNotification("error", "Error", "Leave requested is more than available leave, will be unpaid");
            }
            else {
                setValidleaverequest('true')
            }
        }
    }

    const onLeaveNatureChange = (value) => {
        setLeavetype(value)
        let noOfDays = dateSelected.length
        if (dateSelected.length == 1 && leaveslot != 'Full Day') {
            noOfDays = 0.5
        }
        validateLeaveRequest(noOfDays, value)
    };

    const onLeaveSlotChange = (e) => {
        setLeaveslot(e.target.value);
        let noOfDays = dateSelected.length
        if (dateSelected.length == 1 && leaveslot != 'Full Day') {
            noOfDays = 0.5
        }
        validateLeaveRequest(noOfDays, leavetype)
    };

    const [date, setDate] = useState(moment());
    const monthCellRender = (value) => {
        const num = getMonthData(value);
        return num ? (
            <div className="notes-month">
                <section>{num}</section>
                <span>Backlog number</span>
            </div>
        ) : null;
    };

    const dateCellRender = (value) => {
        const listData = getListData(value);
        return (
            <div className="events" style={{}} >
                {listData.map((item) => (
                    <div
                        style={
                            item.type === 'On Leave' ? { color: 'rgba(0, 128, 0,  1)', fontSize: '8px', backgroundColor: "rgb(15, 255, 80,0.2)", paddingLeft: '5px', paddingRight: '5px', margin: '0px', borderRadius: '5px', justifyContent: 'center' }: 
                            item.type === 'Pending'? { color: 'rgba(10, 91, 204,  1)', fontSize: '8px', backgroundColor: "rgba(10, 91, 204,0.2)", paddingLeft: '5px', paddingRight: '5px', margin: '0px', borderRadius: '5px', justifyContent: 'center' }:
                            item.isOptional ? { color: "rgba(0, 119, 137, 0.96)", fontSize: '8px', backgroundColor: "rgba(154, 214, 224, 0.96)", paddingLeft: '5px', paddingRight: '5px', margin: '0px', borderRadius: '5px', justifyContent: 'center' }: 
                            { color: "rgba(252, 143, 10, 1)", fontSize: '8px', backgroundColor: "rgba(252, 143, 10,0.2)", paddingLeft: '5px', paddingRight: '5px', margin: '0px', borderRadius: '5px', justifyContent: 'center' }

                        }



                    >
                        <div className='present' > {item.type}  </div>
                    </div>
                ))}
            </div>
        );

    };

    const reqColumns = [
        {
            title: 'Duration',
            dataIndex: 'date',
            width: 240,
            align: "left",
            sorter: (a, b) => {
                return a.date !== b.date ? (a.date < b.date ? -1 : 1) : 0;
            },
            sortDirections: ["ascend", "descend"],


        },
        {
            title: 'Employee Name',
            dataIndex: 'name',
            width: 150,
            sorter: (a, b) => {
                return a.name !== b.name ? (a.name < b.name ? -1 : 1) : 0;
            },
            sortDirections: ["ascend", "descend"],


        },
        {
            title: 'Nature of Leave',
            dataIndex: 'nature',
            width: 150,

        },
        {
            title: 'Slot',
            dataIndex: 'slot',
            width: 150,
            sorter: (a, b) => {
                return a.slot !== b.slot ? (a.slot < b.slot ? -1 : 1) : 0;
            },
            sortDirections: ["ascend", "descend"],
        },
        {
            title: 'Reason',
            dataIndex: 'reason',
            width: 150,
        },
        {
            title: 'Approver',
            dataIndex: 'approver',
            width: 150,
        },
        {
            title: "Status",
            className: "row5",
            key: "status",
            dataIndex: "status",
            align: "left",
            width: 100,
            // responsive: ["md"],
            sorter: (a, b) => {
                return a.status !== b.status ? (a.status < b.status ? -1 : 1) : 0;
            },
            sortDirections: ["ascend", "descend"],
            render: (_, { status }) =>
                status !== "" && (
                    <Tag style={{ width: '70px' }}
                        className="statusTag"
                        color={status === "Approved" ? "green" : status === "Pending" ? 'blue' : "volcano"}
                        key={status}
                    >
                        {status}
                    </Tag>
                ),
        },
        {
            title: 'Comment',
            dataIndex: 'comment',
            width: 150,
        },
        {
            key: "5",
            title: "Actions",
            fixed: 'right',
            width: 80,
            render: (record) => {
                return (
                    <>
                        {
                            <>
                                <DeleteOutlined

                                    // disabled={record?.status === 'Approved'}
                                    onClick={() => {
                                        onDeleteLeave(record);
                                    }}
                                    style={
                                        record?.status === 'Approved'
                                            ? { color: "green", marginLeft: 10 }
                                            : record?.status === 'Pending'
                                                ? { color: "blue", marginLeft: 10 }
                                                : { color: "red", marginLeft: 10 }}
                                />
                            </>

                        }
                    </>
                );
            },
        }

    ];
    function disabledDate(current) {
        return moment(current).day() === 0 || (current).day() === 6
    };

    if (loading) {
        return (
            <div style={{ height: '70vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                < Spin size="large" style={{
                    position: 'absolute',
                    top: '20%',
                    left: '50%',
                    margin: '-10px',
                    zIndex: '100',
                    opacity: '0.7',
                    backgroundColor: 'transparent'
                }} />
            </div>)
    }

    return (
        <>
            <Row
                style={{
                    display: 'none',
                    padding: 24,
                    background: '#fff',
                    minHeight: 150,
                    display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor: '#e9eaea',
                }}
                gutter={[16, 0]}>
                <Col xl={24} lg={24} md={24} sm={24} xs={24}>


                    <div className='leavediv'

                    >
                        {Object.keys(leavedays).map((user, id) => {
                            return (
                                <div
                                    className='Col-2-center' style={{ background: colors[id], color: "#fff" }}

                                >
                                    <p className='heading' style={{
                                        fontWeight: '500', fontSize: '20px'
                                    }}>{user}</p>

                                    <div className='total-leave' style={{
                                        width: '90%'
                                    }}>
                                        <div className='leave-status'>
                                            <p className='leave' Total style={{
                                                fontWeight: '500', fontSize: '15px', margin: '0px',
                                            }}>Total :- </p>
                                            <p style={{
                                                fontWeight: '500', fontSize: '15px', margin: '0px'
                                            }}>{totaldays[user]}</p>
                                        </div>

                                        <div className='leave-status'>
                                            <p className='leave' Total style={{
                                                fontWeight: '500', fontSize: '15px', margin: '0px'
                                            }}>Taken :- </p>
                                            <p style={{
                                                fontWeight: '500', fontSize: '15px', margin: '0px'
                                            }}>{totaldays[user]-leavedays[user]}</p>
                                        </div>

                                        <div className='leave-status'>
                                            <p className='leave' Total style={{
                                                fontWeight: '500', fontSize: '15px', margin: '0px'
                                            }}>Remaining :- </p>
                                            <p style={{
                                                fontWeight: '500', fontSize: '15px', margin: '0px'
                                            }}>{leavedays[user]}</p>
                                        </div>
                                    </div>

                                </div>
                            );
                        })}
                    </div>

                </Col>
                {/* </Col> */}

                <Col xl={12} lg={12} md={12} sm={24} xs={24} span={2} style={{
                    marginTop: '10px'

                }}
                >
                    {/* <HolidayList isHr={isHr} /> */}
                    <HolidayList isHr={isHr} refershCalendar={addNewHoliday} />
                    <div className='calender-div' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div className='badge-div' style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white', justifyContent: 'center', paddingTop: '0px', }}>
                            {/* <Typography.Title level={4} >Calendar</Typography.Title> */}
                            <div className='rep-div' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                {/* <button className='reprentation' style={{ marginRight: '5px', backgroundColor: "rgba(204, 10, 10,0.2)" }} ><h5 style={{ color: "rgba(204, 10, 10, 1)" }} className='rep-text'>Absent</h5></button> */}
                                {/* <button className='reprentation' style={{ marginRight: '5px', backgroundColor: "rgba(204, 94, 10,0.2)" }}><h5 style={{ color: "rgba(204, 94, 10, 1)" }} className='rep-text'>Half Day</h5></button> */}
                                <button className='reprentation' style={{ marginRight: '5px', backgroundColor: "rgba(10, 91, 204,0.2)" }}><h5 style={{ color: "rgba(10, 91, 204,  1)" }} className='rep-text'>Leave</h5></button>
                                <button className='reprentation' style={{ marginRight: '5px', backgroundColor: "rgba(154, 214, 224, 0.96)" }}><h5 style={{ color: "rgba(0, 119, 137, 0.96)", }} className='rep-text'>Optional Holiday</h5></button>
                                <button className='reprentation' style={{ marginRight: '5px', backgroundColor: "rgba(252, 143, 10,0.2)" }}><h5 style={{ color: "rgba(252, 143, 10, 1)" }} className='rep-text'>Official Holiday</h5></button>
                                <button className='reprentation' style={{ marginRight: '5px', backgroundColor: "rgba(74, 67, 67,0.2)" }}><h5 style={{ color: "rgba(74, 67, 67, 1)" }} className='rep-text'>Weekly Off</h5></button>
                            </div>
                            <div className='rep-div2' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '0px' }}>
                                {/* <button className='reprentation' style={{ marginRight: '5px', backgroundColor: "rgba(10, 204, 107,0.2)" }}><h5 style={{ color: "rgba(10, 204, 107, 1)" }} className='rep-text'>Present</h5></button> */}
                            </div>

                        </div>
                        {/* style={holiday.optionalHoliday === false ? {
                                    borderRadius: '5px', marginBottom: '10px', paddingLeft: '10px', justifyContent: 'space-evenly', backgroundColor: 'rgba(204, 204, 10,0.2)', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
                                } : {
                                    borderRadius: '5px', marginBottom: '10px', paddingLeft: '10px', justifyContent: 'space-evenly', backgroundColor: 'rgba(252, 143, 10,0.2)', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
                                }} */}


                        <Calendar


                            style={{ paddingLeft: '10px', paddingRight: '10px', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px' }}
                            value={date}
                            onChange={setDate}
                            dateCellRender={dateCellRender}
                            monthCellRender={monthCellRender}
                            disabledDate={disabledDate}
                        />
                    </div>
                </Col>




                <Row className='apply-leave'
                    style={{
                        marginTop: '10px'

                    }}

                >
                    <Col span={12} style={{
                        display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'flex-start', color: 'black'
                    }}><h3 className='apply-leave'>Apply Leave</h3></Col>

                    <Col xl={24} lg={24} md={24} sm={24} xs={24} style={{
                        background: 'flex', padding: '10px', width: '400px'
                    }} >
                        {/* <Form.Item labelAlign="left"
                                style={{ marginBottom: "20px", }}
                                label={<label style={{ color: "black", fontWeight: '400' }}>Employee Name<span style={{ color: 'red' }}> *</span></label>}
                                name="employeename"

                            >
                                <Input maxLength={20}
                                    onChange={(e) => {
                                        const inputval = e.target.value;
                                        const newVal = inputval.substring(0, 1).toUpperCase() + inputval.substring(1);
                                        form.setFieldsValue({ employeename: newVal });

                                    }}
                                    placeholder="Employee Name" />
                            </Form.Item> */}

                        {/* <Form.Item labelAlign="left"
                                style={{ marginBottom: "20px", color: 'white', }}
                                label={<label style={{ color: "black", fontWeight: '400' }}>Duration<span style={{ color: 'red' }}> *</span></label>}
                                name="durationid"
                                initialValue={'abc'}

                            > */}
                        {/* <Space direction="vertical" size={12} style={{ width: '100%' }}> */}
                        <div class="field required" style={{ backgroundColor: '', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', paddingBottom: '8px' }}>
                            <div className='date-pick-label' style={{ backgroundColor: '', width: '27%', textAlign: 'left' }}>
                                <label for="id_username" style={{ fontWeight: '400', width: '100%' }}>Duration<span style={{ color: 'red' }}> *</span></label>
                            </div>
                            <div className='date-picker' style={{ backgroundColor: '', width: '80%' }}>
                                <DatePicker style={{ width: '92%', backgroundColor: '', marginBottom: '20px', marginLeft: '', height: '32px', borderRadius: '0px', border: '1px solid #d9d9d9', paddingLeft: '10px' }}
                                    // label='Duration'
                                    value={dateSelected}
                                    onChange={setDateSelected}
                                    type='input'
                                    // range
                                    multiple
                                    sort
                                    minDate={new Date()}
                                    format={format}
                                    plugins={[<DatePanel />]}

                                    // placeholder='Pick select Leave Date'

                                    mapDays={({ date }) => {
                                        let props = {}
                                        let isWeekend = [0, 6].includes(date.weekDay.index)
                                        let matchingHolidayList = companyholiday.filter(item => {
                                            return item.Date == date.toString()

                                        })
                                        let comp = date.toString()
                                        let leavedates = leaves.filter((item) => {
                                            if (item.dateCalc.includes(moment(comp, "D MMM, YYYY").format("Do MMM, YYYY"))) {
                                                return true
                                            }
                                            else {
                                                return false
                                            }

                                        })
                                        if (isWeekend) return {
                                            disabled: true,
                                            style: { color: "#ccc" },

                                        }
                                        if (matchingHolidayList.length > 0 && matchingHolidayList[0].optionalHoliday == false) return {

                                            disabled: true,
                                            style: { color: "rgb(252, 143, 1)", backgroundColor: 'rgba(252, 143, 10, 0.2)', },

                                        }
                                        if (matchingHolidayList.length > 0 && matchingHolidayList[0].optionalHoliday == true) return {

                                            disabled: true,
                                            style: { color: "rgba(0, 119, 137, 1)", backgroundColor: "rgba(0, 119, 137, 0.2)" },

                                        }

                                        if (leavedates.length > 0) return {

                                            disabled: true,
                                            style: { color: "rgba(10, 91, 204, 1)", backgroundColor: "rgb(10, 91, 204, 0.2)" },

                                        }


                                        return props
                                    }}
                                />
                            </div>
                        </div>
                        {/* <RangePicker

                                        ranges={{
                                            Today: [moment(), moment()],
                                            "This Month": [moment().startOf("month"), moment().endOf("month")]
                                        }}
                                        // showTime
                                        format="Do MMM, YYYY"
                                        onChange={onLeaveDateChange}
                                        disabledDate={disabledDate}

                                    // dateRender={(current) => {
                                    //     const style = {};

                                    //     if (moment(current).day() === 0) {
                                    //       style.border = "1px solid #1890ff";
                                    //       style.borderRadius = '50%';
                                    //       style.color = "red";
                                    //       style.backgroundColor = "grey";
                                    //     }

                                    //     return (
                                    //       <div className="ant-picker-cell" style={style}>
                                    //         {current.date()}
                                    //       </div>
                                    //     );
                                    //   }}
                                    /> */}

                        {/* </Space> */}
                        {/* </Form.Item> */}

                        <Form
                            {...Leave}
                            labelCol={{
                                span: 6,

                            }}
                            wrapperCol={{
                                span: 16,
                            }}
                            form={form}
                            onFinish={onFinish}

                        // initialValues={{
                        //     remember: true,
                        //     // approver: employeeRecord.repManager



                        // }}
                        >


                            <Form.Item labelAlign="left"
                                name="leaveNature"
                                style={{ marginBottom: "25px", }}
                                label={<label style={{ color: "black", fontWeight: '400' }}>Nature of Leave<span style={{ color: 'red' }}> *</span></label>}

                            >
                                <Select required
                                    placeholder="Select a option "
                                    allowClear
                                    onChange={onLeaveNatureChange}
                                >
                                    {
                                        Object.keys(leavedays).map(u => (
                                            <Option disabled={leavedays[u] <= 0} value={u}>{u}
                                            </Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>

                            <Form.Item labelAlign="left"
                                name="slot"
                                style={{ marginBottom: "25px", }}
                                // label="Slot&nbsp;"
                                className='div-slot'
                                label={<label style={{ color: "black", fontWeight: '400' }}> Slot<span style={{ color: 'red' }}> *</span></label>}
                                rules={[{ message: "Please select an option!" }]}
                                initialValue={"Full Day"}

                            >

                                <Radio.Group defaultValue="Full Day"
                                    onChange={onLeaveSlotChange}


                                >
                                    <Radio style={{ color: "black", fontWeight: '400' }} value="Morning">Morning</Radio>
                                    <Radio style={{ color: "black", fontWeight: '400' }} value="Evening" >Evening</Radio>
                                    <Radio style={{ color: "black", fontWeight: '400' }} value="Full Day" >Full Day</Radio>

                                </Radio.Group>
                            </Form.Item>

                            <Form.Item labelAlign="left"
                                name="reason"
                                style={{ marginBottom: "25px", }}
                                label={<label style={{ color: "black", fontWeight: '400' }}>Reason<span style={{ color: 'red' }}> *</span> </label>}
                            >
                                <Input.TextArea maxLength={20}
                                    onChange={(e) => {

                                        const inputval = e.target.value;
                                        const newVal = inputval.substring(0, 1).toUpperCase() + inputval.substring(1);
                                        form.setFieldsValue({ reason: newVal });

                                    }}
                                    required />
                            </Form.Item>

                            <Form.Item labelAlign="left"
                                name="approver"
                                style={{ marginBottom: "25px", }}
                                label={<label style={{ color: "black", fontWeight: '400' }}>Approver<span style={{ color: 'red' }}> *</span></label>}
                                initialValue={repManager}



                            >
                                <Input maxLength={20}
                                    onChange={(e) => {

                                        const inputval = e.target.value;
                                        const newVal = inputval.substring(0, 1).toUpperCase() + inputval.substring(1);
                                        form.setFieldsValue({ approver: newVal });

                                    }}
                                    // rules={[{ required: true }]}
                                    // placeholder="Reporting Manager" 
                                    disabled
                                />
                            </Form.Item>

                            <Form.Item style={{ paddingTop: "15px", }}
                                wrapperCol={{
                                    offset: 8,
                                    span: 24,
                                }}
                            >

                                <Button type="primary" htmlType="submit" > Submit </Button>
                                <Button htmlType="button" style={{ marginLeft: "10px", }}
                                    onClick={onReset}>
                                    Reset
                                </Button>
                            </Form.Item>

                        </Form>

                    </Col>
                </Row>

                {
                    isMgr
                        ? <Notification data={pendingRequests} />
                        : null
                }

                {
                    isMgr && !isHr ?
                    <Row style={{
                    display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'flex-start', backgroundColor: 'white',
                    borderRadius: '10px', padding: '10px', marginTop: '10px'
                }}
                >
                    <Col span={24} style={{
                        display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'flex-start', color: 'black', width: '100rem'
                    }}><h3>All Requests</h3></Col>

                    <Col xl={24} lg={24} md={24} sm={24} xs={24} style={{
                        background: 'flex', padding: '10px',
                    }} >

                        <div className='history-table' >
                            <Table columns={reqColumns}
                                dataSource={requests}
                                pagination={{
                                    position: ["bottomCenter"],
                                }}
                                scroll={{ x: 600 }}


                                size="small" />
                        </div>

                    </Col>

                </Row> :
                null
                }

                {
                    isHr ?
                    <Row style={{
                    display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'flex-start', backgroundColor: 'white',
                    borderRadius: '10px', padding: '10px', marginTop: '10px'
                }}
                >
                    <Col span={24} style={{
                        display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'flex-start', color: 'black', width: '100rem'
                    }}><h3>All Requests</h3></Col>

                    <Col xl={24} lg={24} md={24} sm={24} xs={24} style={{
                        background: 'flex', padding: '10px',
                    }} >

                        <div className='history-table' >
                            <Table columns={reqColumns}
                                dataSource={allRequests}
                                pagination={{
                                    position: ["bottomCenter"],
                                }}
                                scroll={{ x: 600 }}


                                size="small" />
                        </div>

                    </Col>

                </Row> :
                null
                }


                <Row style={{
                    display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'flex-start', backgroundColor: 'white',
                    borderRadius: '10px', padding: '10px', marginTop: '10px'
                }}
                >
                    <Col span={24} style={{
                        display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'flex-start', color: 'black', width: '100rem'
                    }}><h3>Employee Leave History</h3></Col>

                    <Col xl={24} lg={24} md={24} sm={24} xs={24} style={{
                        background: 'flex', padding: '10px',
                    }} >

                        <div className='history-table' >
                            <Table columns={columns}
                                dataSource={history}
                                pagination={{
                                    position: ["bottomCenter"],
                                }}
                                scroll={{ x: 600 }}


                                size="small" />
                        </div>

                    </Col>

                </Row>
            </Row>
        </>

    )
}

export default Leave
