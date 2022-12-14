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
    console.log(props);
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

        const allData = await CompanyHolidayContext.getAllCompanyHoliday();
        // 33-40 to be written in context
        allData.docs.map((doc) => {
            let d = allData.docs.map((doc) => {

                return {
                    ...doc.data(),
                    Date: moment(doc.data()["Date"].seconds * 1000).format('Do MMM, YYYY'),
                    id: doc.id,
                };
            });
            setHolidaylist(d)
            // console.log('holidaylist', d[1].Date);
            // console.log('holidaylist2', moment(d[1].Date.seconds * 1000))

        });
    }

    const onDeleteLeave = (newHoliday) => {
        console.log('newHoliday', newHoliday)
        Modal.confirm({
            title: "Are you sure, you want to delete Holiday record?",
            okText: "Yes",
            okType: "danger",

            onOk: () => {
                CompanyHolidayContext.deleteHoliday(newHoliday.id)
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
        console.log('Success: holiday', values.holidaydate.toDate());

        let newHoliday = {
            Name: values.holidayname,
            Date: values.holidaydate.toDate(),
            optionalHoliday: values.holidaytype === 'Official' ? false : true,
        }
        console.log('newHoliday', newHoliday)
        // let leaveRecord = companyholiday.filter(record => record.Date == currdate);
        let matchingHolidayList = holidaylist.filter(item => item.Date == newHoliday.Date)
        if (matchingHolidayList.length > 0) {
            //errormodal
            console.log('holiday allready Exist')
        }

        else {
            CompanyHolidayContext.createHoliday(newHoliday)
                .then(response => {
                    console.log("***11111111111111111**");
                    props.refershCalendar(newHoliday);
                    // getData()


                })
                .catch(error => {
                    console.log(error.message);

                })
            form.resetFields();
        }
    };

    const disabledDate = (current) => {
        //cannot select existing holiday
        let matchingHolidayList = holidaylist.filter(item => item.Date == current.format('Do MMM, YYYY'))
        return matchingHolidayList.length > 0;
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
        console.log('hiii')
        setIsModalOpen(false);
        showNotification("success", "Success", "Holiday Created successfuly");
    };


    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const cancelStyle = {
        float: "right",

    };

    const buttonStyle = {
        marginRight: "5px",
        color: "white",
        backgroundColor: "#1890ff",
        float: "right",
        backgroundColor: '#d9d9d9'
    };


    return (
        <Row style={{
            display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'flex-start',
            borderTopLeftRadius: '10px', borderTopRightRadius: '10px', padding: '10px', marginBottom: '0px', backgroundColor: 'white'
        }}
        >
            <Col xl={12} lg={12} md={12} sm={24} xs={24} span={12}
                style={{
                    display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'flex-start',
                    borderRadius: '10px',


                }}
            >

                <div >
                    <Button className='button-div' style={{
                        marginLeft: '10px'
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
                                            <Text className='holiday-name' style={holiday.optionalHoliday === true ? { color: "rgba(0, 119, 137, 0.96)", } : { color: "rgba(252, 143, 10, 1)" }}>{holiday.Name}</Text>
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

                                        <Text style={holiday.optionalHoliday === true ? { color: "rgba(0, 119, 137, 0.96)", } : { color: "rgba(252, 143, 10, 1)" }} type="secondary">{holiday.Date} / {holiday.optionalHoliday === true ? <span  >Optional </span> : <span>Official</span>}</Text>

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
                                marginLeft: '10px', backgroundColor: ''
                            }} onClick={showModal}>
                                Create Holiday
                            </Button>


                            <Modal title=" Create Holiday" maskClosable={false} footer={null} open={isModalOpen} visible={isModalOpen} onCancel={handleCancel}>
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
                                            },
                                        ]}

                                    >
                                        <Input placeholder="Please Type Holiday Name" />
                                    </Form.Item>

                                    <Form.Item

                                        label="Date"
                                        name='holidaydate'
                                        labelAlign="left"
                                        style={{ marginBottom: "10px", width: '100% ' }}

                                    >

                                        <DatePicker style={{ width: '100% ' }}
                                            disabledDate={disabledDate}
                                            format="MMM D, YYYY"
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        label="Type Of Leave"
                                        name='holidaytype'
                                        labelAlign="left"
                                        style={{ marginBottom: "10px", }}

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