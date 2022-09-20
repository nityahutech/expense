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
    Divider
} from 'antd';
import { Button } from 'antd';
import { Form, Input, } from 'antd';
import { DatePicker, Space } from "antd";
import moment from "moment";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import LeaveContext from '../contexts/LeaveContext'
import { useAuth } from '../contexts/AuthContext'
import "../style/leave.css";

let leaveStyle = {
    Present: { height: "5px", width: "0.6rem", borderRadius: '6px', backgroundColor: "green" },
    Absent: { height: "5px", width: "0.6rem", borderRadius: '6px', backgroundColor: "red" },
    Leave: { height: "5px", width: "0.6rem", borderRadius: '6px', backgroundColor: "blue" },
    "Officialy Holiday": { height: "5px", width: "0.6rem", borderRadius: '6px', backgroundColor: "yellow" },
    "Week Off": { height: "5px", width: "0.6rem", borderRadius: '6px', backgroundColor: "grey" },
}

const getListData = (value) => {
    let listData;
    console.log(value.date());
    switch (value.date()) {
        case 8:
            listData = [
                {
                    type: "Absent",
                    intime: "In : ",
                    outtime: "Out : "

                },

            ];
            break
        case 9:
            listData = [
                {
                    type: "Present",
                    intime: "In : 9:00Am",
                    outtime: "Out : 9:00Pm"

                },

            ];
            break
        case 10:
            listData = [
                {
                    type: "Officialy Holiday",
                    intime: "In : ",
                    outtime: "Out : "

                },

            ];
            break
        case 11:
            listData = [
                {
                    type: "Week Off",
                    intime: "In : ",
                    outtime: "Out : "

                },

            ];
            break
        case 12:
            listData = [
                {
                    type: "Leave",
                    intime: "In : ",
                    outtime: "Out : "

                },

            ];
            break


        default:

    }

    return listData || [];
};

const getMonthData = (value) => {
    if (value.month() === 8) {
        return 1394;
    }
};


const Leave = () => {
    const [form] = Form.useForm();
    const [leaves, setLeaves] = useState([]);
    const [history, setHistory] = useState([]);
    const [dataSource, setDataSource] = useState([]);
    const [duration, setDuration] = useState([]);
    const { currentUser, role } = useAuth();
    let leaveDays = "";
    // const [userDetails, setUserDetails] = useState(sessionStorage.getItem("user")?JSON.parse(sessionStorage.getItem("user")):null)
    const [users, setUsers] = useState([
        {
            id: 1,
            leavetype: "Earn Leave",
            leave: 0,


        },
        {
            id: 2,
            leavetype: "Sick Leave",
            leave: 7,

        },
        {
            id: 3,
            leavetype: "Casual Leave",
            leave: 7,

        },
        {
            id: 4,
            leavetype: "Optional Leave",
            leave: 2,


        },
        // {
        //     id: 5,
        //     leavetype: "Compensatory Off",
        //     leave: 2,

        // },

    ] || [])


    const onFinish = values => {
        console.log("Success:", values);
        console.log(duration)
        let newLeave = {
            empId: currentUser.uid,
            status:"Pending",
            approver: values.approver,
            date: duration,
            name: currentUser.displayName,
            nature: values.leaveNature,
            slot: values.slot == null ? "Full Day" : values.slot,
            reason: values.reason,
        }


        LeaveContext.createLeave(newLeave)
            .then(response => {
                // console.log(response.success);
                // if(response.success){
                //     getData();
                // }else{
                //     // err
                // }
                console.log(response);
                getData();
                // getDateFormatted([newLeave, ...leaves])

            })
            .catch(error => {
                console.log(error.message);

            })

        setLeaves([newLeave, ...leaves]);
        let tempUser = [...users]
        let newLeaves = tempUser.map(leave => {
            if (leave.leavetype?.toLowerCase() === values?.leaveNature.toLowerCase()) {
                leave.leave -= 1;
            }
            return leave
        })

        setUsers(newLeaves)
        form.resetFields()
    };


    const getData = async () => {
        let data = await LeaveContext.getAllById(currentUser.uid)
        console.log(data)
       let d = data.docs.map((doc) => {
       return {
         ...doc.data(),
         id: doc.id
       };
     });
       console.log(d);
       setLeaves(d);
       getDateFormatted(d)
       leaveDays = LeaveContext.getLeaveDays(d,currentUser.uid)
       console.log(role)
       // setHistory(d)

    }



    const onDeleteLeave = (record) => {
        Modal.confirm({
            title: "Are you sure, you want to delete Leave record?",
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

    const onApproveLeave = (record) => {
        Modal.confirm({
            title: "Are you sure, you want to approve Leave record?",
            okText: "Yes",
            okType: "primary",
            onOk: () => {
                LeaveContext.approveLeave(record.id)
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

    const onRejectedLeave = (record) => {
        Modal.confirm({
            title: "Are you sure, you want to Reject Leave record?",
            okText: "Yes",
            okType: "danger",
            onOk: () => {
                LeaveContext.rejectLeave(record.id)
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
    }
    const { Option } = Select;

    const columns = [
        {
            title: 'Duration',
            dataIndex: 'date',
            width: 150,

        },
        {
            title: 'Employee Name',
            dataIndex: 'name',
        },
        {
            title: 'Nature of Leave',
            dataIndex: 'nature',
            width: 150,

        },
        {
            title: 'Slot',
            dataIndex: 'slot',
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
            key: "5",
            title: "Actions",
            fixed: 'right',
            width: 100,
            render: (record) => {
                return (
                    <>
                    {
                        role == "hr"
                        ?<>
                         <img
                            style={{ color: "white", width: '20px',marginRight: 10 }}
                            src="../logo/checkmark.png"
                            alt="profile"
                            className="Dash"
                            onClick={() => {
                                onApproveLeave(record);
                            }}
                        />
                                <img
                            style={{ color: "white", width: '20px' }}
                            src="../logo/rejected.png"
                            alt="profile"
                            className="Dash"
                            onClick={() => {
                                onRejectedLeave(record);
                            }}

                        />
                        </>
                        : <DeleteOutlined
                        onClick={() => {
                            onDeleteLeave(record);
                        }}
                        style={{ color: "red", marginLeft: 0 }}
                    />
                    }
                       
                       
                    </>
                );
            },
        }

    ];
    useEffect(() => {
        getData();
       // LeaveContext.getInitalLeaveById(currentUser.uid)
    }, []);

    const getDateFormatted = ((data) => {
        data.forEach(dur => {
            dur.dateCalc = [dur.date[0], dur.date[1]]
            dur.date = dur.date[0] + " to " + dur.date[1]
        })
        setHistory(data)
    })

    const { RangePicker } = DatePicker;

    const onChange = (dates, dateStrings) => {
        if (dates) {
            console.log("From: ", dates[0], ", to: ", dates[1]);
            console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
            setDuration(dateStrings)
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

    const dateCellRender = (value) => {
        const listData = getListData(value);
        let currentMonth = new Date().getMonth()
        let date = new Date(value['_d'])
        return currentMonth == date.getMonth() ? (
            <ul className="events" >
                {listData.map((item) => (
                    <li >

                        <li className='present' > {item.type}</li>
                        <li className='intime' >{item.intime}</li>
                        <li className='outtime' >{item.outtime}</li>
                        <div style={leaveStyle[item.type]}></div>

                    </li>
                ))}

            </ul>
        ) : null;
    };



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

                <Col id="responsive-input1" span={24} style={{
                    display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: 'white',
                    borderRadius: '10px', alignItems: 'center'

                }} >

                    <div className='Col-1-center' style={{
                        display: 'flex', flexDirection: 'row', justifyContent: 'space-between', color: 'black', height: '40px', alignItems: 'center', backgroundColor: 'white',

                    }}><h3>Leave Available</h3>
                    {/* <Button>Add Leave</Button> */}
                    </div>
                    <div className='leavediv'

                    >
                        {users.map((user) => {
                            return (
                                <div className='Col-2-center'

                                >

                                    <p className='heading' style={{
                                        color: '#05445E', fontWeight: '500'
                                    }}>{user.leavetype}</p>
                                    <p className='leave' style={{
                                        color: '#05445E', fontWeight: '500'
                                    }}>{user.leave}</p>

                                </div>
                            );
                        })}
                    </div>
                </Col>

                <Col xl={12} lg={12} md={12} sm={24} xs={24} span={12} >
                    <div className='calender-div' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div className='badge-div' style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white', justifyContent: 'center', paddingTop: '10px' }}>
                            {/* <Typography.Title level={4} >Calendar</Typography.Title> */}
                            <div className='rep-div' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                <button className='reprentation' style={{ marginRight: '5px', backgroundColor: "rgba(204, 10, 10,0.2)" }} ><h5 style={{ color: "rgba(204, 10, 10, 1)" }} className='rep-text'>Absent</h5></button>
                                {/* <button className='reprentation' style={{ marginRight: '5px', backgroundColor: "rgba(204, 94, 10,0.2)" }}><h5 style={{ color: "rgba(204, 94, 10, 1)" }} className='rep-text'>Half Day</h5></button> */}
                                <button className='reprentation' style={{ marginRight: '5px', backgroundColor: "rgba(10, 91, 204,0.2)" }}><h5 style={{ color: "rgba(10, 91, 204,  1)" }} className='rep-text'>Leave</h5></button>
                                {/* <button className='reprentation' style={{ marginRight: '5px', backgroundColor: "rgba(252, 143, 10,0.2)" }}><h5 style={{ color: "rgba(252, 143, 10, 1)" }} className='rep-text'>Late Arrival</h5></button> */}
                            </div>
                            <div className='rep-div2' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '10px' }}>
                                {/* <button className='reprentation' style={{ marginRight: '5px', backgroundColor: "rgba(10, 204, 107,0.2)" }}><h5 style={{ color: "rgba(10, 204, 107, 1)" }} className='rep-text'>Present</h5></button> */}
                                <button className='reprentation' style={{ marginRight: '5px', backgroundColor: "rgba(204, 204, 10,0.2)" }}><h5 style={{ color: "rgba(204, 204, 10, 1)", }} className='rep-text'>Official Holiday</h5></button>
                                <button className='reprentation' style={{ marginRight: '5px', backgroundColor: "rgba(74, 67, 67,0.2)" }}><h5 style={{ color: "rgba(74, 67, 67, 1)" }} className='rep-text'>Weekly Off</h5></button>
                            </div>

                        </div>
                        <Calendar style={{ padding: '10px', }}

                            value={date}
                            onChange={setDate}
                            dateCellRender={dateCellRender}
                            monthCellRender={monthCellRender}
                        // disabledDate={disabledDate}

                        />



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
                                        onChange={onChange}
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

                                <Radio.Group  >
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
                                <Button type="primary" htmlType="submit"

                                >
                                    Submit

                                </Button>
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
                                    size="small" scroll={{
                                        x: 800,
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