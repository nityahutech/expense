import React, { useState, useEffect } from 'react';
import {
    Col,
    Row,
    Space,
    Typography,
    Form,
    Input,
    Radio,
    DatePicker,
    Table,
    notification
} from 'antd';
import 'antd/dist/antd.css';
import { Button, Drawer, Modal, } from 'antd';
import CompanyHolidayContext from '../contexts/CompanyHolidayContext';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import moment from 'moment/moment';
const { Text, } = Typography;
const LeaveList = (props) => {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [holidaylist, setHolidaylist] = useState([])
    const colors = ['rgba(154, 214, 224, 0.96)', 'rgba(252, 143, 10,0.2)',];
    // const fontColors = ['rgba(204, 204, 10, 1)', 'color: "rgba(252, 143, 10, 1)', ];
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
    ]
    const getData = async () => {
        // props.addNewHoliday()
        const allData = await CompanyHolidayContext.getAllCompanyHoliday("compId001");
        // 33-40 to be written in context
        let data = allData.docs.map((doc) => {
            return {
                ...doc.data(),
                id: doc.id,
            };
        });
        data.sort(function (c, d) {
            let a = moment(c.date, "Do MMM, YYYY")
            let b = moment(d.date, "Do MMM, YYYY")
            return a - b
        });
        setHolidaylist(data)
    }
    const onDeleteLeave = (newHoliday) => {
        Modal.confirm({
            title: "Are you sure, you want to delete Holiday record?",
            okText: "Yes",
            okType: "danger",
            onOk: () => {
                CompanyHolidayContext.deleteHoliday(newHoliday.id, "compId001")
                    .then(response => {
                        props.refreshCalendar();
                        getData();
                    })
                    .catch(error => {
                    })
            },
        });
    };
    useEffect(() => {
        getData()
    }, [])
    const showDrawer = () => {
        getData()
        setOpen(true);
    };

    const onReset = () => {
        form.resetFields()

    }
    const onFinish = (values) => {
        let newHoliday = {
            name: values.holidayname,
            date: values.holidaydate.format("Do MMM, YYYY"),
            optionalHoliday: values.holidaytype === 'Official' ? false : true,
        }
        let matchingHolidayList = holidaylist.filter((item) => { return item.name == newHoliday.name })
        if (!(matchingHolidayList.length > 0)) {
            CompanyHolidayContext.createHoliday(newHoliday, "compId001")
                .then(response => {
                    showNotification("success", "Success", "Holiday Created successfuly");
                    props.refreshCalendar();
                })
                .catch(error => {
                    showNotification("error", "Error", "Unable to create holiday!")
                })
            form.resetFields();
        } else {
            showNotification("error", "Error", "This holiday name already exists!")
            form.resetFields();
        }
        setIsModalOpen(false);
    };
    const disabledDate = (current) => {
        let isCurrentYear = current.year() !== (new Date).getFullYear();
        let matchingHolidayList = holidaylist.filter(item => item.date == current.format('Do MMM, YYYY'))
        return matchingHolidayList.length > 0 || isCurrentYear;
    };
    const onClose = () => {
        setOpen(false);
    };
    const showModal = () => {
        setIsModalOpen(true);
    };
    const showNotification = (type, msg, desc) => {
        notification[type]({
            message: msg,
            description: desc,
        });
    };
    const handleOk = () => {
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const cancelStyle = {
        float: "right",

    };
    const buttonStyle = {
        marginRight: "5px",
        // color: "white",
        // backgroundColor: "#1890ff",
        float: "right",
        // backgroundColor: '#d9d9d9'
    };
    return (
        <Row className='row-holiday-list-div' style={{
            display: 'flex', flexDirection: 'row',
            borderTopLeftRadius: '10px', borderTopRightRadius: '10px', padding: '10px', marginBottom: '0px', backgroundColor: 'white'
        }}
        >
            <Col className='holiday-list-div' xl={12} lg={12} md={12} sm={24} xs={24} span={12}
                style={{
                    display: 'flex', flexDirection: 'row',
                    borderRadius: '10px',
                }}
            >
                <div >
                    <Button className='button-div' style={{
                        marginLeft: '10px', borderRadius: '15px'
                    }} onClick={showDrawer}>
                        Holiday List
                    </Button>
                    <Drawer
                        width={300}
                        title="List of Holiday" placement="right" onClose={onClose} visible={open} open={open}>
                        {/* <Table columns={columns} dataSource={holidaylist} > */}
                        {/* {JSON.stringify(colors[id])} */}
                        {holidaylist.map((holiday, id,) => {
                            return (
                                // colors={}

                                <div className='holiday-div'
                                    style={holiday.optionalHoliday === true ? {
                                        borderRadius: '5px', marginBottom: '10px', paddingRight: '10px', paddingLeft: '10px', justifyContent: 'space-evenly', backgroundColor: 'rgba(154, 214, 224, 0.96)', boxShadow: ' rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset'
                                    } : {
                                        borderRadius: '5px', marginBottom: '10px', paddingRight: '10px', paddingLeft: '10px', justifyContent: 'space-evenly', backgroundColor: 'rgba(252, 143, 10,0.2)', boxShadow: 'rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset'
                                    }}
                                >
                                    <Space className='holiday-div-image' style={{
                                        display: 'flex', flexDirection: 'column',
                                        gap: '0px', justifyContent: 'space-evenly'
                                    }} direction="vertical">

                                        <div className='holiday-div-holiday' style={{
                                            display: 'flex', flexDirection: 'row',
                                            gap: '0px', justifyContent: 'space-between'
                                        }}
                                        >
                                            <Text className='holiday-name' style={holiday.optionalHoliday === true ? { color: "rgba(0, 119, 137, 0.96)", } : { color: "rgba(252, 143, 10, 1)" }}>{holiday.name}</Text>
                                            {props.isHr ?
                                                <DeleteOutlined
                                                    style={{
                                                        display: 'flex', flexDirection: 'row', marginLeft: '5px', paddingTop: '5px', color: 'red'
                                                    }}
                                                    onClick={() => {
                                                        // if (record?.status !== 'Approved')
                                                        onDeleteLeave(holiday);
                                                    }}
                                                />
                                                : null}
                                        </div>

                                        <Text style={holiday.optionalHoliday === true ? { color: "rgba(0, 119, 137, 0.96)", } : { color: "rgba(252, 143, 10, 1)" }} type="secondary">{holiday.date} / {holiday.optionalHoliday === true ? <span  >Optional </span> : <span>Official</span>}</Text>

                                    </Space>
                                </div>
                            );

                        })}
                        {/* </Table> */}
                    </Drawer>
                </div>
                {
                    props.isHr
                        ?
                        <div>
                            <Button className='button-div' style={{
                                marginLeft: '10px', borderRadius: '15px'
                            }} onClick={showModal}>
                                Create Holiday
                            </Button>
                            <Modal className='viewAppraisal'
                                title=" Create Holiday"
                                maskClosable={false}
                                footer={null}
                                open={isModalOpen}
                                visible={isModalOpen}
                                onCancel={handleCancel}
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
                                    <Form.Item labelAlign="left"
                                        style={{ marginBottom: "10px", }}

                                        label="Holiday Name"
                                        name='holidayname'
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please Type Holiday Name',
                                            },
                                        ]}

                                    >
                                        <Input placeholder="Please Type Holiday Name" />
                                    </Form.Item>
                                    <Form.Item
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please Type Holiday Date',
                                            },
                                        ]}
                                        label="Date"
                                        name='holidaydate'
                                        labelAlign="left"
                                        style={{ marginBottom: "10px", width: '100% ' }}
                                    >
                                        <DatePicker style={{ width: '100% ' }}
                                            disabledDate={disabledDate}
                                            // disabledYear={disabledYear}
                                            format="Do MMM, YYYY"
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label="Type Of Leave"
                                        name='holidaytype'
                                        labelAlign="left"
                                        style={{ marginBottom: "10px", }}
                                        initialValue="Official"
                                    >
                                        <Radio.Group defaultValue="Official"
                                        >
                                            <Radio value="Optional"> Optional </Radio>
                                            <Radio value="Official"> Official </Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                    <Form.Item >
                                        <Button
                                            style={cancelStyle}
                                            onClick={handleOk}
                                            htmlType="submit"
                                            type="primary">Create New Holiday
                                        </Button>
                                        <Button
                                            type='default'
                                            style={buttonStyle}
                                            onClick={onReset}>
                                            Reset</Button>
                                    </Form.Item>
                                </Form>
                            </Modal>
                        </div>
                        :
                        null
                }
            </Col>
        </Row>
    )
}

export default LeaveList