import React, { useState, } from 'react';
import {
    Col,
    Row,
    Select,
    Radio,
    Badge,
    Table,
    Calendar,
    Modal
} from 'antd';
import { Button } from 'antd';
import { Form, Input, } from 'antd';
import { DatePicker, Space } from "antd";
import moment from "moment";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "../style/leave.css";

const Leave = () => {
    const [form] = Form.useForm();
    const [leaves, setLeaves] = useState([]);
    const [dataSource, setDataSource] = useState([]);
    // const getLocalData = localStorage.getItem("test");
    // const parseData = JSON.parse(getLocalData)

    // const [value, setValue] = useState({
    //     approver: "",
    //     approver: "",
    //     employeename: "",
    //     leaveNature: "",
    //     reason: "",
    //     slot: "",
    // });


    const onFinish = values => {
        console.log("Success:", values);
        let newLeave = {
            approver: values.approver,
            date: values.durationid,
            name: values.employeename,
            nature: values.leaveNature,
            slot: values.slot,
            reason: values.reason,
        }

        setLeaves([newLeave, ...leaves]);

        // localStorage.setItem("test" , JSON.stringify(newLeave));
        form.resetFields()
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
    // const handleSelect = (e) => {
    //     console.log(e);
    //     setValue(e)
    // }


    const users = [
        {
            id: 1,
            leavetype: "EARN LEAVE",
            leave: 14,

        },
        {
            id: 2,
            leavetype: "SICK LEAVE",
            leave: 7,

        },
        {
            id: 3,
            leavetype: "CASUAL LEAVE",
            leave: 7,

        },
        {
            id: 4,
            leavetype: "FLOATING LEAVE",
            leave: 2,

        },
        {
            id: 5,
            leavetype: "COMPENSATORY OFF",
            leave: 2,

        },

    ];

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
                        display: 'flex', flexDirection: 'row', justifyContent: 'space-between', color: 'black', height: '200px', height: '40px', alignItems: 'center', backgroundColor: 'white',

                    }}><h3>Leave Request</h3></div>

                    <div style={{
                        display: 'flex', flexDirection: 'row', justifyContent: 'space-between'

                    }}>
                        {users.map((user) => {
                            return (
                                <div className='Col-1-center' style={{
                                    backgroundColor: '#e9eaea', width: '150px',
                                    margin: '10px', borderRadius: '5px', alignItems: 'center', display: 'flex', justifyContent: 'space-between',
                                    flexDirection: 'column', paddingTop: '10px'

                                }}>

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

                <Col span={12} >
                    <div className='calender-div' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div className='badge-div' style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white', justifyContent: 'center', paddingTop: '10px' }}>
                            {/* <Typography.Title level={4} >Calendar</Typography.Title> */}
                            <div className='rep-div'style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                <Button className='reprentation' style={{ marginRight: '15px', backgroundColor: "rgba(204, 10, 10,0.2)" }} ><h5 style={{  color: "rgba(204, 10, 10, 1)" }}  className='rep-text'>Absent</h5></Button>
                                <Button className='reprentation' style={{ marginRight: '15px', backgroundColor: "rgba(204, 94, 10,0.2)"  }}><h5 style={{  color: "rgba(204, 94, 10, 1)" }} className='rep-text'>Half Day</h5></Button>
                                <Button className='reprentation' style={{ marginRight: '15px', backgroundColor: "rgba(10, 91, 204,0.2)"  }}><h5 style={{  color: "rgba(10, 91, 204,  1)" }} className='rep-text'>Leave</h5></Button>
                                <Button className='reprentation' style={{ marginRight: '15px', backgroundColor: "rgba(252, 143, 10,0.2)"  }}><h5 style={{  color: "rgba(252, 143, 10, 1)" }} className='rep-text'>Late Arrival</h5></Button>
                            </div>
                            <div className='rep-div2'style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center',marginTop:'10px' }}>
                                <Button className='reprentation' style={{ marginRight: '15px', backgroundColor: "rgba(10, 204, 107,0.2)"  }}><h5 style={{  color: "rgba(10, 204, 107, 1)" }} className='rep-text'>Present</h5></Button>
                                <Button className='reprentation' style={{ marginRight: '15px', backgroundColor: "rgba(204, 204, 10,0.2)" }}><h5 style={{  color: "rgba(204, 204, 10, 1)" }} className='rep-text'>Official Holiday</h5></Button>
                                <Button className='reprentation' style={{ marginRight: '15px', backgroundColor: "rgba(74, 67, 67,0.2)" }}><h5 style={{  color: "rgba(74, 67, 67, 1)" }} className='rep-text'>Weekly Off</h5></Button>
                            </div>

                        </div>
                        <Calendar style={{ padding: '10px', }}

                            value={date}
                            onChange={setDate}
                        // onPanelChange={handlePanelChange}
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
                                style={{ marginBottom: "15px", }}
                                label={<label style={{ color: "black", fontWeight: '400' }}>Employee Name</label>}
                                name="employeename"

                            >

                                <Input

                                    required
                                    placeholder="Employee Name" />
                            </Form.Item>

                            <Form.Item labelAlign="left"
                                style={{ marginBottom: "15px", color: 'white', }}
                                label={<label style={{ color: "black", fontWeight: '400' }}>Duration</label>}
                                name="durationid"



                            >
                                <Space direction="vertical" size={12}
                                    required>
                                    <RangePicker required
                                        ranges={{
                                            Today: [moment(), moment()],
                                            "This Month": [moment().startOf("month"), moment().endOf("month")]
                                        }}
                                        showTime
                                        format="YYYY/MM/DD HH:mm:ss"
                                        onChange={onChange}
                                    />
                                </Space>
                            </Form.Item>


                            <Form.Item labelAlign="left"


                                name="leaveNature"
                                style={{ marginBottom: "15px" }}

                                label={<label style={{ color: "black", fontWeight: '400' }}>Nature of Leave</label>}


                            >
                                <Select required
                                    placeholder="Select a option "
                                    allowClear
                                // onSelect={handleSelect}
                                >

                                    <Option value="Earn Leave">Earn Leave </Option>
                                    <Option value="Sick Leave">Sick Leave </Option>
                                    <Option value="Casual Leave">Casual Leave </Option>
                                    <Option value="Floating Leave">Floating Leave </Option>
                                </Select>


                            </Form.Item>

                            <Form.Item labelAlign="left"
                                name="slot"
                                style={{ marginBottom: "15px" }}

                                label={<label style={{ color: "black", fontWeight: '400' }}>Half Day Slot</label>}


                            >
                                <Radio.Group  >
                                    <Radio style={{ color: "black", fontWeight: '400' }} value="Morning">Morning</Radio>
                                    <Radio style={{ color: "black", fontWeight: '400' }} value="Evening" >Evening</Radio>

                                </Radio.Group>
                            </Form.Item>

                            <Form.Item labelAlign="left"
                                name="reason"
                                style={{ marginBottom: "15px" }}

                                label={<label style={{ color: "black", fontWeight: '400' }}>Reason</label>}


                            >
                                <Input.TextArea required />
                            </Form.Item>

                            <Form.Item labelAlign="left"
                                name="approver"
                                style={{ marginBottom: "15px" }}

                                label={<label style={{ color: "black", fontWeight: '400' }}>Approver</label>}

                            >
                                <Input placeholder="Reporting Manager" required />
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
                                display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'flex-start', backgroundColor: 'white'
                            }}><h3>History</h3></Col>

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