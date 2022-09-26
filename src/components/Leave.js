import React, { useEffect, useState, } from 'react';
import {
    Col,
    Row,
    Select,
    Radio,
    Badge,
    Table,
    Calendar,
    Modal,
    Divider,
    Tag,
    notification

} from 'antd';
import { Button } from 'antd';
import { Form, Input, } from 'antd';
import { DatePicker, Space } from "antd";
import moment from "moment";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import LeaveContext from '../contexts/LeaveContext';
import CompanyHolidayContext from '../contexts/CompanyHolidayContext';
import { useAuth } from '../contexts/AuthContext'
import Notification from "./Notification";
import HolidayList from "./HolidayList";
import "../style/leave.css";

let leaveStyle = {
    Present: { height: "5px", width: "0.6rem", borderRadius: '6px', backgroundColor: "green" },
    Absent: { height: "5px", width: "0.6rem", borderRadius: '6px', backgroundColor: "red" },
    Leave: { height: "5px", width: "0.6rem", borderRadius: '6px', backgroundColor: "blue" },
    "Officialy Holiday": { height: "5px", width: "0.6rem", borderRadius: '6px', backgroundColor: "yellow" },
    "Week Off": { height: "5px", width: "0.6rem", borderRadius: '6px', backgroundColor: "grey" },
}

const userrole = ''
const Leave = () => {
    const [form] = Form.useForm();
    const [leaves, setLeaves] = useState([]);
    const [history, setHistory] = useState([]);
    const [requests, setRequests] = useState([]);
    const [dataSource, setDataSource] = useState([]);
    const [duration, setDuration] = useState([]);
    const [noOfDays, setNoOfDays] = useState([]);
    const [ishr, setIsHr] = useState(sessionStorage.getItem(null) || true);
    const [role, setRole] = useState(null);
    const { currentUser } = useAuth();

    let leaveDays = "";
    // const [userDetails, setUserDetails] = useState(sessionStorage.getItem("user")?JSON.parse(sessionStorage.getItem("user")):null)
    const [users, setUsers] = useState([])
    const [leavetype, setLeavetype] = useState()
    const [validleaverequest, setValidleaverequest] = useState('false')
    const [leaveslot, setLeaveslot] = useState(null)
    const [companyholiday, setCompanyholiday] = useState([])
    const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    const getHoliday = async () => {

        const allData = await CompanyHolidayContext.getAllCompanyHoliday();
        console.log('allCompanyHoliday', allData)  
        allData.docs.map((doc) => {
            console.log('allCompanyHoliday2', doc)
            let d = allData.docs.map((doc) => {

                return {
                    ...doc.data(),
                    id: doc.id,
                };
            });
            setCompanyholiday(d)
            console.log('allCompanyHoliday3', d)

        });
    }

    const getListData = (value) => {
        let listData;
        let currdate = value.format('Do MMM, YYYY');
        let leaveRecord = companyholiday.filter(record => record.Date == currdate);
        console.log('calendervvvvv', currdate);
        console.log('calendervvvvv2', leaveRecord.length);
        if (leaveRecord.length > 0) {
            listData = [
                {
                    type: leaveRecord[0].Name,            
                }
            ]
        }

        return listData || [];
    };

    const getMonthData = (value) => {
        if (value.month() === 8) {
            return 1394;
        }
    };

    const onFinish = values => {
        console.log("Success:", values);

        if (validleaverequest == 'false') {
            showNotification("error", "Error", "Leave requested is more than available Leave");
            return;
        }

        let newLeave = {
            empId: currentUser.uid,
            approver: values.approver,
            date: duration,
            name: currentUser.displayName,
            nature: values.leaveNature,
            slot: values.slot,
            reason: values.reason,
            status: 'Pending'
        }
        // let matchingLeaveList = newLeave.filter(item => item.date == newLeave.date)
        // if(matchingLeaveList.length > 0){
        //     //errormodal
        //     console.log('Leave allready Exist')
        // }
        LeaveContext.createLeave(newLeave)
            .then(response => {
                form.resetFields()
                getData();

            })
            .catch(error => {
                console.log(error.message);

            })
        form.resetFields();
    };


    const getData = async () => {
        let data = await LeaveContext.getAllById(currentUser.uid)
        // console.log("data", JSON.stringify(data.docs), currentUser.uid);

        let d = data.docs.map((doc) => {
            console.log("123", { ...doc.data() })
            return {
                ...doc.data(),
                id: doc.id,

            };
        });
        console.log("data", d);
        setLeaves(d);
        getDateFormatted(d)
        leaveDays = LeaveContext.getLeaveDays(d, currentUser.uid)
            .then(response => {
                console.log('leaveDays:', response)
                let UsersLeaves = [
                    {
                        id: 1,
                        leavetype: "Earn Leave",
                        leave: response["Earn Leave"],

                    },
                    {
                        id: 2,
                        leavetype: "Sick Leave",
                        leave: response["Sick Leave"],

                    },
                    {
                        id: 3,
                        leavetype: "Casual Leave",
                        leave: response["Casual Leave"],

                    },
                    {
                        id: 4,
                        leavetype: "Optional Leave",
                        leave: response["Optional Leave"],

                    },
                ];
                setUsers(UsersLeaves)
            })
            .catch(error => {
                console.log(error.message);
            })
        console.log(role)
        setHistory(d)
    }

    const getRequestData = async () => {
        let reqData = await LeaveContext.getAllByApprover(currentUser.displayName)
        let req = reqData.docs.map((doc) => {
            return {
                ...doc.data(),
                id: doc.id
            };
        });
        req.forEach(dur => {
            dur.dateCalc = [dur.date[0], dur.date[1]]
            dur.date = dur.date[0] + " to " + dur.date[1]
        });
        setRequests(req);
        console.log(req)
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

    // const matchDate = (current) => {
    //     //cannot select existing leave
    //     let matchingLeaveList = users.filter(item => item.Date == current.format('Do MMM, YYYY'))
    //     return matchingLeaveList.length > 0;
    // };

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

        },
        {
            title: 'Slot',
            dataIndex: 'slot',
            width: 150,
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
            // responsive: ["md"],
            sorter: (a, b) => a.status - b.status,
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
        let role = sessionStorage.getItem("role");
        setRole(role)
        setIsHr(role === "hr")
        getData();
        getHoliday();
        if (role == "hr") getRequestData();
    }, []);

    const getDateFormatted = ((data) => {
        data.forEach(dur => {
            dur.dateCalc = [dur.date[0], dur.date[1]]
            dur.date = dur.date[0] + " to " + dur.date[1]
        })
        setHistory(data)
    })

    const { RangePicker } = DatePicker;

    const showNotification = (type, msg, desc) => {
        notification[type]({
            message: msg,
            description: desc,
        });
    };

    const validateLeaveRequest = (noOfDays, leavetype) => {
        console.log('validate leave evoke', noOfDays);
        console.log('validate leave evoke', leavetype);

        if (leavetype != null && noOfDays > 0) {

            let leaveRecord = users.filter(record => record.leavetype == leavetype);
            console.log('validate leave evoke', leaveRecord[0].leave);
            if (leaveRecord[0].leave < noOfDays ) {
                setValidleaverequest('false')
                showNotification("error", "Error", "Leave requested is more than available Leave");

            }
            else {
                console.log('validate setting leave to true', noOfDays);

                setValidleaverequest('true')
            }
        }
        console.log('validate ', validleaverequest);
    }

    const onLeaveNatureChange = (value) => {
        console.log('fffff', value);
        setLeavetype(value)
        validateLeaveRequest(noOfDays, value)
    };

    const onLeaveSlotChange = (e) => {
        console.log('fffff', e.target.value);
        setLeaveslot(e.target.value);
        let dur = noOfDays
        if (dur === 1 && e.target.value != null) {
            dur = 0.5;
        }
        validateLeaveRequest(dur, leavetype)
    };

    const onLeaveDateChange = (dates, dateStrings) => {
        console.log("dateStrings: ", leaveslot);
        if (dates) {
            let fromDate = dates[0];
            let toDate = dates[1];
            let noOfDays = toDate.diff(fromDate, 'days') + 1;
            if (noOfDays === 1 && leaveslot != null) {
                noOfDays = 0.5;
            }
            console.log("dateStrings: ", dateStrings);
            console.log("dateStrings: ", noOfDays);

            setDuration(dateStrings);
            setNoOfDays(noOfDays)
            validateLeaveRequest(noOfDays, leavetype)
        } else {
            console.log("Clear");
        }
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

    const handleOk = () => {
        console.log('hiii')

        showNotification("success", "Success", "Leave apply successfuly");
    };

    const dateCellRender = (value) => {
        const listData = getListData(value);     
        return (
            <ul className="events"  >
                {listData.map((item) => (
                    <li >
                        <li className='present' > {item.type}</li>
                        <li className='intime' >{item.intime}</li>
                        <li className='outtime' >{item.outtime}</li>
                        <div style={leaveStyle[item.type]}></div>

                    </li>
                ))}

            </ul>
        );

    };
  

    function disabledDate(current) { 
        //allL=['Mon Sep 26 2022','Mon Sep 26 2022']  get all leave date in formate of Mon Sep 26 2022
        let aa=new Date(current).toDateString()
        //get current date: calandar: aa
        
        console.log("********",aa,aa==='Mon Sep 26 2022');
        let matchingHolidayList = companyholiday.filter(item => item.Date == current.format('Do MMM, YYYY'))
        return moment(current).day() === 0 || (current).day() === 6 || matchingHolidayList.length > 0 || aa==='Mon Sep 26 2022'
        //  allL.includes(aa)
    }

    return (
        <>
            <Row
                style={{
                    padding: 24,
                    background: '#fff',
                    minHeight: 150,
                    display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor: '#e9eaea',
                }}
                gutter={[16, 16]}>
                <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                    <div className='leavediv'

                    >
                        {users.map((user, id) => {
                            return (
                                <div className='Col-2-center' style={{ background: colors[id], color: "#fff" }}

                                >
                                    <p className='heading' style={{
                                        fontWeight: '500',
                                    }}>{user.leavetype}</p>
                                    {/* {JSON.stringify(colors[id])} */}
                                    <p className='leave' style={{
                                        fontWeight: '500',
                                    }}>{user.leave}</p>

                                </div>
                            );
                        })}
                    </div>

                </Col>
                {/* </Col> */}

                <Col xl={12} lg={12} md={12} sm={24} xs={24} span={12}  >
                    <HolidayList />
                    <div className='calender-div' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div className='badge-div' style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white', justifyContent: 'center', paddingTop: '10px', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', }}>
                            {/* <Typography.Title level={4} >Calendar</Typography.Title> */}
                            <div className='rep-div' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                {/* <button className='reprentation' style={{ marginRight: '5px', backgroundColor: "rgba(204, 10, 10,0.2)" }} ><h5 style={{ color: "rgba(204, 10, 10, 1)" }} className='rep-text'>Absent</h5></button> */}
                                {/* <button className='reprentation' style={{ marginRight: '5px', backgroundColor: "rgba(204, 94, 10,0.2)" }}><h5 style={{ color: "rgba(204, 94, 10, 1)" }} className='rep-text'>Half Day</h5></button> */}
                                <button className='reprentation' style={{ marginRight: '5px', backgroundColor: "rgba(10, 91, 204,0.2)" }}><h5 style={{ color: "rgba(10, 91, 204,  1)" }} className='rep-text'>Leave</h5></button>
                                <button className='reprentation' style={{ marginRight: '5px', backgroundColor: "rgba(204, 204, 10,0.2)" }}><h5 style={{ color: "rgba(204, 204, 10, 1)", }} className='rep-text'>Optional Holiday</h5></button>
                                <button className='reprentation' style={{ marginRight: '5px', backgroundColor: "rgba(252, 143, 10,0.2)" }}><h5 style={{ color: "rgba(252, 143, 10, 1)" }} className='rep-text'>Official Holiday</h5></button>
                                <button className='reprentation' style={{ marginRight: '5px', backgroundColor: "rgba(74, 67, 67,0.2)" }}><h5 style={{ color: "rgba(74, 67, 67, 1)" }} className='rep-text'>Weekly Off</h5></button>
                            </div>
                            <div className='rep-div2' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '10px' }}>
                                {/* <button className='reprentation' style={{ marginRight: '5px', backgroundColor: "rgba(10, 204, 107,0.2)" }}><h5 style={{ color: "rgba(10, 204, 107, 1)" }} className='rep-text'>Present</h5></button> */}
                            </div>

                        </div>

                        <Calendar style={{ padding: '10px', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px' }}
                            value={date}
                            onChange={setDate}
                            dateCellRender={dateCellRender}
                            monthCellRender={monthCellRender}
                            disabledDate={disabledDate}
                        />
                        {
                            ishr
                                ? <Notification data={requests} />
                                : null
                        }
                    </div>
                </Col>

                <Row style={{
                    display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'flex-start', backgroundColor: 'white',
                    borderRadius: '10px', padding: '10px'
                }}
                >
                    <Col span={24} style={{
                        display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'flex-start', color: 'black'
                    }}><h3>Apply Leave</h3></Col>

                    <Col xl={24} lg={24} md={24} sm={24} xs={24} style={{
                        background: 'flex', padding: '10px', width: '400px'
                    }} >
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
                        >
                            <Form.Item labelAlign="left"
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
                            </Form.Item>

                            <Form.Item labelAlign="left"
                                style={{ marginBottom: "20px", color: 'white', }}
                                label={<label style={{ color: "black", fontWeight: '400' }}>Duration<span style={{ color: 'red' }}> *</span></label>}
                                name="durationid"

                            >
                                <Space direction="vertical" size={12}
                                >
                                    <RangePicker
                                    
                                        ranges={{
                                            Today: [moment(), moment()],
                                            "This Month": [moment().startOf("month"), moment().endOf("month")]
                                        }}
                                        showTime
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
                                    />
                                </Space>
                            </Form.Item>

                            <Form.Item labelAlign="left"
                                name="leaveNature"
                                style={{ marginBottom: "20px" }}
                                label={<label style={{ color: "black", fontWeight: '400' }}>Nature of Leave<span style={{ color: 'red' }}> *</span></label>}

                            >
                                <Select required
                                    placeholder="Select a option "
                                    allowClear
                                    onChange={onLeaveNatureChange}
                                >
                                    {
                                        users.map(u => (
                                            <Option disabled={u.leave <= 0} value={u.leavetype}>{u.leavetype}
                                            </Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>

                            <Form.Item labelAlign="left"
                                name="slot"
                                style={{ marginBottom: "20px" }}
                                label={<label style={{ color: "black", fontWeight: '400' }}> Slot<span style={{ color: 'red' }}> *</span></label>}
                            >

                                <Radio.Group
                                    onChange={onLeaveSlotChange}
                                >
                                    <Radio style={{ color: "black", fontWeight: '400' }} value="Morning">Morning</Radio>
                                    <Radio style={{ color: "black", fontWeight: '400' }} value="Evening" >Evening</Radio>
                                    <Radio style={{ color: "black", fontWeight: '400' }} value="Full Day" >Full Day</Radio>

                                </Radio.Group>
                            </Form.Item>

                            <Form.Item labelAlign="left"
                                name="reason"
                                style={{ marginBottom: "20px" }}
                                label={<label style={{ color: "black", fontWeight: '400' }}>Reason</label>}
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
                                style={{ marginBottom: "20px" }}
                                label={<label style={{ color: "black", fontWeight: '400' }}>Approver<span style={{ color: 'red' }}> *</span></label>}


                            >
                                <Input maxLength={20}
                                    onChange={(e) => {

                                        const inputval = e.target.value;
                                        const newVal = inputval.substring(0, 1).toUpperCase() + inputval.substring(1);
                                        form.setFieldsValue({ approver: newVal });

                                    }}
                                    rules={[{ required: true }]}
                                    placeholder="Reporting Manager" required />
                            </Form.Item>

                            <Form.Item
                                wrapperCol={{
                                    offset: 8,
                                    span: 16,
                                }}
                            >

                                <Button type="primary" htmlType="submit" onClick={handleOk} disabled={validleaverequest == 'false'}> Submit </Button>
                                <Button htmlType="button" style={{ marginLeft: "10px", }}
                                    onClick={onReset}>
                                    Reset
                                </Button>
                            </Form.Item>
                            <Col span={24} style={{

                            }}><Divider><h3>History</h3></Divider></Col>

                            <div>
                                <Table columns={columns}
                                    dataSource={history}
                                    pagination={{
                                        position: ["bottomCenter"],
                                    }}
                                    size="small" scroll={{
                                        x: 1000,
                                    }} />
                            </div>

                        </Form>

                    </Col>
                </Row>
            </Row>
        </>

    )
}

export default Leave