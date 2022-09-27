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

    const colors = ['rgba(204, 204, 10,0.2)', 'rgba(252, 143, 10,0.2)',];
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
        props.addNewHoliday()

        const allData = await CompanyHolidayContext.getAllCompanyHoliday();
        // 33-40 to be written in context
        allData.docs.map((doc) => {
            let d = allData.docs.map((doc) => {

                return {
                    ...doc.data(),
                    id: doc.id,
                };
            });
            d.sort((a, b) => {
                return moment(a).diff(moment(b), 'days')

            })
            setHolidaylist(d)
            // console.log('holidaylist',d )

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
        console.log('show')
        setOpen(true);
    };

    const onReset = () => {
        form.resetFields()

    }

    const onFinish = (values) => {
        console.log('Success: holiday', values);

        let newHoliday = {
            Name: values.holidayname,
            Date: values.holidaydate.format('Do MMM, YYYY'),
            optionalHoliday: values.holidaytype === 'Official' ? true : false,
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
                    getData();

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
            borderRadius: '10px', padding: '10px', marginBottom: '10px'
        }}
        >
            <Col xl={12} lg={12} md={12} sm={24} xs={24} span={12}
                style={{
                    display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'flex-start',
                    borderRadius: '10px',
                }}
            >
                {
                    props?.isHr
                        ?
                        <>
                            <div>
                                <Button className='button-div' style={{
                                    marginLeft: '10px'
                                }} onClick={showDrawer}>
                                    Holiday List
                                </Button>
                                <Drawer title="List of Holiday" placement="right" onClose={onClose} visible={open} open={open}>
                                    {/* <Table columns={columns} dataSource={holidaylist} > */}

                                    {/* {JSON.stringify(colors[id])} */}

                                    {holidaylist.map((holiday, id,) => {
                                        return (
                                            // colors={}

                                            <div className='holiday-div'
                                                style={holiday.optionalHoliday === false ? {
                                                    borderRadius: '5px', marginBottom: '10px', paddingLeft: '10px', justifyContent: 'space-evenly', backgroundColor: 'rgba(204, 204, 10,0.2)', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
                                                } : {
                                                    borderRadius: '5px', marginBottom: '10px', paddingLeft: '10px', justifyContent: 'space-evenly', backgroundColor: 'rgba(252, 143, 10,0.2)', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
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
                                                        <Text className='holiday-name' style={holiday.optionalHoliday === false ? { color: "rgba(204, 204, 10, 1)", } : { color: "rgba(252, 143, 10, 1)" }}>{holiday.Name}</Text>
                                                        <DeleteOutlined
                                                            style={{
                                                                display: 'flex', flexDirection: 'row', paddingTop: '5px', color: 'red'

                                                            }}
                                                            onClick={() => {
                                                                // if (record?.status !== 'Approved')
                                                                onDeleteLeave(holiday);
                                                            }}
                                                        />
                                                    </div>

                                                    <Text style={holiday.optionalHoliday === false ? { color: "rgba(204, 204, 10, 1)", } : { color: "rgba(252, 143, 10, 1)" }} type="secondary">{holiday.Date} / {holiday.optionalHoliday === false ? <span  >'Optional'  </span> : <span>Official</span>}</Text>

                                                </Space>
                                            </div>
                                        );

                                    })}
                                    {/* </Table> */}
                                </Drawer>
                            </div>
                        </>

                        :
                        <div>
                            <Button className='button-div' style={{
                                marginLeft: '10px'
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

                                        <DatePicker
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
                                        <Radio.Group
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


                }

            </Col>

        </Row>
    )
}

export default LeaveList

