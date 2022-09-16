import React, { useState, } from 'react';
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
import "../style/leave.css";


const getListData = (value) => {
    let listData;
    switch (value.date()) {
        case 9:
            listData = [
                {
                    type: "Present",
                    intime: "In : 9:00Am",
                    outtime: "Out : 9:00Pm"

                },

            ];
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
    const [dataSource, setDataSource] = useState([]);
    const [users, setUsers] = useState([
        {
            id: 1,
            leavetype: "Earn Leave",
            leave: 14,

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
            leavetype: "Floating Leave",
            leave: 2,


        },
        {
            id: 5,
            leavetype: "Compensatory Off",
            leave: 2,

        },

    ] || [])


    // const getLocalData = localStorage.getItem("test");
    // const parseData = JSON.parse(getLocalData)

    const onFinish = values => {
        let newLeave = {
            approver: values.approver,
            date: values.durationid,
            name: values.employeename,
            nature: values.leaveNature,
            slot: values.slot,
            reason: values.reason,
        }

        setLeaves([newLeave, ...leaves]);
        let tempUser = [...users]
        let newLeaves = tempUser.map(leave => {
            if (leave.leavetype?.toLowerCase() === values?.leaveNature.toLowerCase()) {
                leave.leave -= 1;
            }
            return leave
        })
        setUsers(newLeaves)

        // localStorage.setItem("test" , JSON.stringify(newLeave));
        // form.resetFields()
    };

   


    const onDeleteLeave = (record) => {
        Modal.confirm({
            title: "Are you sure, you want to delete Leave record?",
            okText: "Yes",
            okType: "danger",
            onOk: () => {
                setLeaves((pre) => {
                    return pre.filter((leave) => leave.id !== record.id);
                });
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
           
        },
        {
            title: 'Employee Name',
            dataIndex: 'name',
        },
        {
            title: 'Nature of Leave',
            dataIndex: 'nature',
            // render(text, record) {
            //     return {
            //       props: {
            //         style: { background: parseInt(text) > 50 ? "red" : "green" }
            //       },
            //       children: <div>{text}</div>
            //     };
            //   }
        },
        {
            title: 'Slot',
            dataIndex: 'slot',
        },
        {
            title: 'Reason',
            dataIndex: 'reason',
        },
        {
            title: 'Approver',
            dataIndex: 'approver',
        },



        {
            key: "5",
            title: "Actions",
            render: (record) => {
                return (
                    <>
                        <DeleteOutlined
                            onClick={() => {
                                onDeleteLeave(record);
                            }}
                            style={{ color: "red", marginLeft: 12 }}
                        />
                    </>
                );
            },
        }

    ];

    


    const { RangePicker } = DatePicker;

    const onChange = (dates, dateStrings) => {
        if (dates) {
            console.log("From: ", dates[0], ", to: ", dates[1]);
            console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
        } else {
            console.log("Clear");
        }
    };
    const [date, setDate] = useState(moment());

    // const handlePanelChange = (date: Moment) => {
    //     const { firstDate, lastDate } = getFirstDateAndLastDateOnThePanel(date);

    //     console.log({
    //         firstDate: firstDate.format("YYYY-MM-DD"),
    //         lastDate: lastDate.format("YYYY-MM-DD"),
    //     });
    // };

    // const getFirstDateAndLastDateOnThePanel = (date: Moment) => {
    //     const firstDate = moment(date).startOf("month");
    //     const lastDate = moment(date).endOf("month");

    //     const firstDateDay = firstDate.day();
    //     firstDate.subtract(firstDateDay, "days");
    //     lastDate.add(42 - Number(lastDate.format("DD")) - firstDateDay, "days");

    //     return {
    //         firstDate,
    //         lastDate,
    //     };
    // };

    // const disabledDate = (current) => {
    //     // Can not select sundays and predfined days
    //     return moment(current).day() === 0
    // }

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
            <ul className="events" >
                {listData.map((item) => (
                    <li >

                        <li className='present' > {item.type}</li>
                        <li className='intime' >{item.intime}</li>
                        <li className='outtime' >{item.outtime}</li>

                    </li>
                ))}

            </ul>
        );
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

                    }}><h3>Leave Available</h3></div>
                       {/* {users?.map((item, inde4x) => {
                            return (
                                <Col xl={4} lg={4} md={11} sm={24} xs={24} className='card-box'>
                                    <div style={{textAlign:'center'}}> {item?.leavetype}</div>
                                    <div style={{textAlign:'center'}}>{item?.leave}</div>
                                </Col>
                            )
                        })} */}

                    <div className='leavediv'
                   
                        >
                        {users.map((user) => {
                            return (
                                <div className='Col-2-center' 
                                // style={{
                                //     backgroundColor: '', width: '150px',
                                //     margin: '10px', borderRadius: '5px', alignItems: 'center', display: 'flex', justifyContent: 'space-between',
                                //     flexDirection: 'column', paddingTop: '10px'

                                // }}
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
                                <button className='reprentation' style={{ marginRight: '5px', backgroundColor: "rgba(204, 94, 10,0.2)" }}><h5 style={{ color: "rgba(204, 94, 10, 1)" }} className='rep-text'>Half Day</h5></button>
                                <button className='reprentation' style={{ marginRight: '5px', backgroundColor: "rgba(10, 91, 204,0.2)" }}><h5 style={{ color: "rgba(10, 91, 204,  1)" }} className='rep-text'>Leave</h5></button>
                                <button className='reprentation' style={{ marginRight: '5px', backgroundColor: "rgba(252, 143, 10,0.2)" }}><h5 style={{ color: "rgba(252, 143, 10, 1)" }} className='rep-text'>Late Arrival</h5></button>
                            </div>
                            <div className='rep-div2' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '10px' }}>
                                <button className='reprentation' style={{ marginRight: '5px', backgroundColor: "rgba(10, 204, 107,0.2)" }}><h5 style={{ color: "rgba(10, 204, 107, 1)" }} className='rep-text'>Present</h5></button>
                                <button className='reprentation' style={{ marginRight: '5px', backgroundColor: "rgba(204, 204, 10,0.2)" }}><h5 style={{ color: "rgba(204, 204, 10, 1)", }} className='rep-text'>Official Holiday</h5></button>
                                <button className='reprentation' style={{ marginRight: '5px', backgroundColor: "rgba(74, 67, 67,0.2)" }}><h5 style={{ color: "rgba(74, 67, 67, 1)" }} className='rep-text'>Weekly Off</h5></button>
                            </div>

                        </div>
                        <Calendar style={{ padding: '10px', }}

                            value={date}
                            onChange={setDate}
                            // onPanelChange={handlePanelChange}
                            dateCellRender={dateCellRender}
                            monthCellRender={monthCellRender}

                            


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




                        // onFieldsChange={(changedFields, allvalues) => onFieldsChangeHandler(changedFields, allvalues)}
                        >
                            <Form.Item labelAlign="left"
                                style={{ marginBottom: "20px", }}
                                label={<label style={{ color: "black", fontWeight: '400' }}>Employee Name<span style={{ color: 'red' }}> *</span></label>}
                                name="employeename"
                                // rules={[{message: "Please enter your name" }]}

                            >

                                <Input maxLength={20}
                                       onChange={(e) => {
                                        const inputval = e.target.value;
                                        const newVal = inputval.substring(0, 1).toUpperCase() + inputval.substring(1);
                                        // setPaidBy(newVal);
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
                                        format="DD/MM/YYYY HH:mm:ss"
                                        onChange={onChange}
                                      


                                    />
                                </Space>
                            </Form.Item>


                            <Form.Item labelAlign="left"
                                name="leaveNature"
                                style={{ marginBottom: "20px" }}
                                label={<label style={{ color: "black", fontWeight: '400' }}>Nature of Leave<span style={{ color: 'red' }}> *</span></label>}
                                // rules={[{ required: true, message: "Please select an Leave Type!" }]}
                                

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
                                // rules={[{ required: true, message: "Please select an option!" }]}

                            >
                                
                                <Radio.Group  >
                                    <Radio  style={{ color: "black", fontWeight: '400' }} value="Morning">Morning</Radio>
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
                                    // setPaidBy(newVal);
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
                                    // setPaidBy(newVal);
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
                                {/* {JSON.stringify(leaves)} */}
                                {/* {<p>{"ddd"} </p> }{JSON.stringify()} */}
                                <Table columns={columns}
                                    dataSource={leaves}
                                    size="small" scroll={{
                                        x: 600,
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