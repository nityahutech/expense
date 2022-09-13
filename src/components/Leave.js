import React, { useState } from 'react';
import {
    Col,
    Row,
    Select,
    Radio,
    Badge,
    Table,
    Calendar,
    Typography

} from 'antd';
import { Button } from 'antd';
import { Form, Input, } from 'antd';
import { DatePicker, Space } from "antd";
import moment from "moment";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const getFirstDateAndLastDateOnThePanel = (date: Moment) => {
    const firstDate = moment(date).startOf("month");
    const lastDate = moment(date).endOf("month");

    const firstDateDay = firstDate.day();
    firstDate.subtract(firstDateDay, "days");
    lastDate.add(42 - Number(lastDate.format("DD")) - firstDateDay, "days");

    return {
        firstDate,
        lastDate,
    };
};


const columns = [
    {
        title: 'Date',
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
        key: "5",
        title: "Actions",
        render: (record) => {
            return (
                <>
                    {/* <EditOutlined
                // onClick={() => {
                //   onEditStudent(record);
                // }}
              /> */}
                    <DeleteOutlined
                        // onClick={() => {
                        //   onDeleteStudent(record);
                        // }}
                        style={{ color: "red", marginLeft: 12 }}
                    />
                </>
            );
        },
    }

];
const data = [
    {
        key: '1',
        date: '12/09/22',
        name: 'Jatin Yadav',
        age: 32,
        nature: 'Sick Leave',
        slot: 'Morning',
        reason: ''
    },


];



const Leave = () => {

    const [value, setValue] = useState(1);

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

    const handlePanelChange = (date: Moment) => {
        const { firstDate, lastDate } = getFirstDateAndLastDateOnThePanel(date);

        console.log({
            firstDate: firstDate.format("YYYY-MM-DD"),
            lastDate: lastDate.format("YYYY-MM-DD"),
        });
    };




    return (
        <>
            <Row
                style={{
                    padding: 24,
                    background: '#fff',
                    minHeight: 150,
                    display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly',


                }}
                gutter={[16, 16]}>

                <Col span={24} style={{
                    display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor: '#6f6fee',
                }}>Leave Request</Col>

                <Col id="responsive-input1" span={24} style={{
                    display: 'flex', flexDirection: 'row', justifyContent: 'center', backgroundColor: '#6f6fee',
                    borderRadius: '10px'

                }} >

                    {/* <div className='Col-1-center' style={{  display:'flex',flexDirection:'row'

                    }}> */}
                    {users.map((user) => {
                        return (
                            <div className='Col-1-center' style={{
                                backgroundColor: '#e5e8ea', width: '200px',
                                margin: '10px', borderRadius: '5px', alignItems: 'center', display: 'flex', justifyContent: 'center',
                                flexDirection: 'column', paddingTop: '10px'

                            }}>

                                <p className='heading' style={{
                                }}>{user.leavetype}</p>
                                <p className='leave' style={{
                                }}>{user.leave}</p>

                            </div>
                        );
                    })}
                    {/* </div> */}
                </Col>

                <Col span={12} style={{ border: '2px solid #6f6fee', borderRadius: '10px' }}>
                    <div className='calender-div' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div className='badge-div' style={{ display: 'flex', flexDirection: 'row',  }}>
                            {/* <Typography.Title level={4} >Calendar</Typography.Title> */}

                            <Badge style={{ marginRight: '5px', }} color="red" text="Absent" />
                            <Badge style={{ marginRight: '5px', }} color="pink" text=" Half Day" />
                            <Badge style={{ marginRight: '5px', }} color="blue" text="#Leave" />
                            <Badge style={{ marginRight: '5px', }} color="green" text="Present" />
                            <Badge style={{ marginRight: '5px', }} color="yellow" text=" Official Holiday" />
                            <Badge style={{ marginRight: '5px', }} color="grey" text=" Weekly Off" />

                        </div>
                        <Calendar

                            value={date}
                            onChange={setDate}
                            onPanelChange={handlePanelChange}
                        />
                    </div>

                </Col>


                <Row style={{
                    display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'flex-start', backgroundColor: '#6f6fee',
                    borderRadius: '10px', padding: '10px'
                }}
                >
                    <Col span={24} style={{
                        display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'flex-start',
                    }}>Apply Leave</Col>

                    <Col xl={24} lg={24} md={24} sm={24} xs={24} style={{
                        background: 'flex', padding: '10px',
                    }} >
                        <Form
                            labelCol={{
                                span: 6,

                            }}
                            wrapperCol={{
                                span: 16,
                            }}


                        >
                            <Form.Item labelAlign="left"
                                style={{ marginBottom: "15px", }}
                                label="Employee Name"
                                name="employeename"


                            >
                                <Input placeholder="Employee Name" />
                            </Form.Item>

                            <Form.Item labelAlign="left"
                                style={{ marginBottom: "15px" }}
                                label="Duration"
                                name="durationid"


                            >
                                <Space direction="vertical" size={12}>
                                    <RangePicker
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
                                label="Nature of Leave"


                            >
                                <Select
                                    placeholder="Select a option "
                                    allowClear

                                >

                                    <Select.Option value="demo">Earn Leave </Select.Option>
                                    <Select.Option value="demo">Sick Leave </Select.Option>
                                    <Select.Option value="demo">Casual Leave </Select.Option>
                                    <Select.Option value="demo">Floating Leave </Select.Option>
                                </Select>


                            </Form.Item>

                            <Form.Item labelAlign="left"
                                name="slot"
                                style={{ marginBottom: "15px" }}
                                label="Half Day Slot"

                            >
                                <Radio.Group onChange={onChange} value={value} >
                                    <Radio value={1} >Morning</Radio>
                                    <Radio value={2} >Evening</Radio>

                                </Radio.Group>
                            </Form.Item>

                            <Form.Item labelAlign="left"
                                name="reason"
                                style={{ marginBottom: "15px" }}
                                label="Reason"

                            >
                                <Input.TextArea />
                            </Form.Item>

                            <Form.Item labelAlign="left"
                                name="approver"
                                style={{ marginBottom: "15px" }}
                                label="Approver"



                            >
                                <Input placeholder="Reporting Manager" />
                            </Form.Item>



                            <Form.Item
                                wrapperCol={{
                                    offset: 8,
                                    span: 16,
                                }}
                            >
                                <Button type="primary" htmlType="submit" >
                                    Submit
                                </Button>
                                <Button htmlType="button" style={{ marginLeft: "10px", }} >
                                    Reset
                                </Button>


                            </Form.Item>
                            <Col span={24} style={{
                                display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'flex-start', backgroundColor: 'white'
                            }}>History</Col>

                            <div>
                                <Table columns={columns} dataSource={data} size="small" scroll={{
                                    x: 400,
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