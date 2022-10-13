import React, { useState, useEffect } from 'react'
import { EditOutlined, PrinterFilled, DeleteOutlined } from "@ant-design/icons";
import { Button, Col } from 'antd';
import { Card, Input, Modal, Form, Row, notification, Typography, Select, DatePicker, Table, } from 'antd';
import Appraisal from "./Appraisal";
import "../style/appraisal.css";
import AppraisalContext from '../contexts/AppraisalContext';
import EmployeeContext from '../contexts/EmployeeContext';
import moment from 'moment/moment';
import { useAuth } from '../contexts/AuthContext'
const { Option } = Select;
const { RangePicker } = DatePicker;
const { Text, Link } = Typography;
const { Meta } = Card;

const AppraisalHr = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [openm, setOpen] = useState(false);
    const [secondModal, setSecondModal] = useState(false)
    const [form] = Form.useForm();
    const [editedAppraisal, setEditedAppraisal] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [formLayout, setFormLayout] = useState('horizontal');
    const [loading, setLoading] = useState(false);
    const [quarter, setQuarter] = useState();
    const [employeeRecord, setEmployeeRecord] = useState();
    const [currentAppraisal, setCurrentAppraisal] = useState();
    const { currentUser } = useAuth();
    const [appraisalList, setAppraisalList] = useState([]);

    const columns = [
        // {
        //     title: "Sl. No.",
        //     dataIndex: "sn",
        //     key: "sn",
        //     fixed: "left",
        //     width: 80,
        // },
        {
            title: "Employee Id",
            dataIndex: "empId",
            fixed: "left",
            width: 80,
        },
        {
            title: "Employee Name",
            dataIndex: "Name",
            width: 120,
        },
        // {
        //     title: "Reporting Manager",
        //     dataIndex: "Manager",    
        //     width: 120,
        // },
        // {
        //     title: "Date of Joining",
        //     dataIndex: "JoiningDate",
        //     width: 120,
        // },
        // {
        //     title: "Current Position",
        //     dataIndex: "Position",        
        //     width: 120,
        //     ellipsis: true,
        // },
        {
            title: 'Evaluation Quarter',
            dataIndex: "Period",
            width: 100,
            ellipsis: true,
            // children: [
            //     {
            //         title: 'Q1',
            //         dataIndex: 'quarterone',
            //         // key: 'quarterone',
            //         width: 50,
            //     },
            //     {
            //         title: 'Q2',
            //         dataIndex: 'quartertwo',
            //         // key: 'quartertwo',
            //         width: 50,
            //     },
            //     {
            //         title: 'Q3',
            //         dataIndex: 'quarterthree',
            //         // key: 'quarterthree',
            //         width: 50,
            //     },
            //     {
            //         title: 'Q4',
            //         dataIndex: 'quarterfour',
            //         // key: 'quarterfour',
            //         width: 50,
            //     },
            // ],
        },
        // {
        //     title: "Status",
        //     children: [
        //         {
        //             title: 'Employee',
        //             dataIndex: 'emp',
        //             key: 'emp',
        //             width: 80,
        //         },
        //         {
        //             title: 'Lead',
        //             dataIndex: 'lead',
        //             key: 'lead',
        //             width: 80,
        //         },
        //         {
        //             title: 'Manager',
        //             dataIndex: 'manager',
        //             key: 'manager',
        //             width: 80,
        //         },

        //     ],
        // },


        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            fixed: "right",
            width: 100,

            render: (_, appraisal) => {

                return (
                    <>
                        {console.log('render', appraisal)}

                        <Button
                            style={{ padding: 10, color: 'blue' }}
                            type="link"
                            className="edIt"
                            onClick={() => {

                                setEditedAppraisal(appraisal);
                                setSecondModal(true)

                            }}
                        >
                            {<EditOutlined />}
                        </Button>

                        {(sessionStorage.getItem("role") === 'hr') &&
                            <Button
                                style={{ padding: 10, color: 'red' }}
                                type="link"
                                className="edIt"
                                onClick={() => {
                                    onDeleteAppraisal(appraisal)
                                }}
                            >
                                {<DeleteOutlined />}
                            </Button>}

                        <Button
                            style={{ padding: 10 }}
                            type="link"
                            className="edIt"

                        >
                            {<PrinterFilled />}
                        </Button>


                    </>
                );

            },
        },
    ];

    const showModal = () => {
        console.log('hi')
        setIsModalOpen(true);
    };

    const shownModal = () => {
        console.log('hi')
        setOpen(true);
    };

    const handleCancel = () => {
        console.log('hiii')
        setIsModalOpen(!isModalOpen);
    };

    const checkAlphabets = (event) => {
        if (!/^[a-zA-Z ]*$/.test(event.key) && event.key !== "Backspace") {
            return true;
        }
    };
    const checkNumbervalue = (event) => {
        if (!/^[0-9]*\.?[0-9]*$/.test(event.key) && event.key !== "Backspace") {
            return true;
        }
    };
    const onReset = () => {
        form.resetFields()
        setQuarter('')
    };

    const buttonStyle = {
        marginRight: "5px",
        color: "white",
        backgroundColor: "#1890ff",
        float: "right",
        backgroundColor: '#d9d9d9'
    };

    const handleOk = () => {
        console.log('hiii')
        setIsModalOpen(false);

    };

    const cancelStyle = {
        float: "right",

    };

    const showNotification = (type, msg, desc) => {
        notification[type]({
            message: msg,
            description: desc,
        });
    };

    const onFormLayoutChange = ({ layout }) => {
        setFormLayout(layout);
        console.log(layout);

    };

    const onFieldsChangeHandler = (curr, allvalues) => {
        console.log(allvalues)
    };

    const onChange = (date, dateString) => {
        console.log('quarter', date, dateString);
        setQuarter(dateString)
    };

    const handleEditEmployee = (appraisal) => {
        console.log("appraisalrecord: ", appraisal);
        setEditedAppraisal(appraisal);
    };

    const onFinish = (values) => {
        console.log('appraisal', values);

        let newAppraisal = {
            empId: values.empId,
            Name: values.associateName,
            Position: values.currentposition,
            Period: quarter,
            JoiningDate: values.joiningdate.toDate(),
            Manager: values.manager,
            status: 'empPending'

        }
        console.log('appraisal', newAppraisal)

        AppraisalContext.createAppraisal(newAppraisal)
            .then(response => {
                console.log("appraisal Created", response);
                getAppraisalList()
            })
            .catch(error => {
                console.log('appraisal', error.message);

            })
        console.log('appraisal', 'appraisal created');
        showNotification("success", "Success", "Appraisal Created");
        setQuarter('')
        form.resetFields();

    };


    useEffect(() => {
        getAppraisalList()
    }, [])

    const getAppraisalList = async () => {

        let role = sessionStorage.getItem("role");
        let allData = []
        if (role === 'hr') {
            allData = await AppraisalContext.getAllAppraisal();
        }
        else {

            let empRecord = await EmployeeContext.getEmployee(currentUser.uid)
            setEmployeeRecord(empRecord)
            allData = await AppraisalContext.getUserAppraisal(empRecord.empId)

        }


        allData.docs.map((doc) => {
            let d = allData.docs.map((doc) => {

                return {
                    ...doc.data(),
                    JoiningDate: moment(doc.data()["JoiningDate"].seconds * 1000).format('Do MMM, YYYY'),
                    id: doc.id,
                };
            });
            console.log('appraisalLIST3', d)
            setAppraisalList(d)
        });
    }

    const onDeleteAppraisal = (appraisal) => {
        console.log('deleteappraisal', appraisal)
        Modal.confirm({
            title: "Are you sure, you want to delete Holiday record?",
            okText: "Yes",
            okType: "danger",

            onOk: () => {
                AppraisalContext.deleteAppraisal(appraisal.id)
                    .then(response => {
                        console.log(response);
                        getAppraisalList()
                    })
                    .catch(error => {
                        console.log(error.message);

                    })
            },
        });
    };


    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            borderRadius: '10px'


        }}>
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                <div className='app-div' style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    margin: '10px',


                }}
                >
                    <Row gutter={[48, 16]}>
                        <Col className='appraisal-div' xl={24} lg={24} md={24} sm={24} xs={24}  >
                            <Card onClick={showModal} className='card-app'
                                style={{ position: 'relative' }}
                                hoverable
                                cover={
                                    <img
                                        style={{ padding: '40px' }}

                                        alt="example"
                                        src="/logo/resources.png"
                                    />
                                }

                            >
                                <div style={{ position: 'absolute', top: '0', right: '0' }}> <img
                                    src="../logo/checkmark.png"

                                /></div>
                                <div style={{ position: 'absolute', bottom: '0', left: '45%' }}>HR</div>
                            </Card>

                            <Card

                                className='card-app'
                                style={{ position: 'relative' }}
                                hoverable
                                cover={
                                    <img
                                        style={{ padding: '50px', }}
                                        alt="example"
                                        src="/logo/division.png"

                                    />
                                }

                            >
                                <div style={{ position: 'absolute', top: '0', right: '0' }}> <img
                                    src="../logo/checkmark.png"

                                /></div>

                                <div style={{ position: 'absolute', bottom: '0', left: '40%' }}>Employee</div>
                            </Card>

                            <Card className='card-app'
                                style={{ position: 'relative' }}
                                hoverable
                                cover={
                                    <img
                                        style={{ padding: '50px' }}
                                        alt="example"
                                        src="/logo/leader.png"
                                    />
                                }

                            >
                                <div style={{ position: 'absolute', top: '0', right: '0' }}> <img
                                    src="../logo/checkmark.png"

                                /></div>
                                <div style={{ position: 'absolute', bottom: '0', left: '40%' }}>Lead</div>
                            </Card>


                            <Card className='card-app'
                                style={{ position: 'relative' }}
                                hoverable
                                cover={
                                    <img
                                        style={{ padding: '50px' }}
                                        alt="example"
                                        src="/logo/manager.png"

                                    />
                                } src="../logo/checkmark.png"

                            >
                                <div style={{ position: 'absolute', top: '0', right: '0' }}> <img
                                    src="../logo/checkmark.png"

                                /></div>
                                <div style={{ position: 'absolute', bottom: '0', left: '40%' }}>Manager</div>
                            </Card>
                        </Col>
                    </Row>

                </div>
            </Col>

            <Modal maskClosable={false} centered title="Basic information" footer={null} visible={isModalOpen} open={isModalOpen} onCancel={handleCancel}>
                <Row >
                    <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                        <Form
                            labelCol={{
                                span: 8,

                            }}
                            wrapperCol={{
                                span: 16,
                            }}
                            initialValues={{
                                remember: true,
                                // // employeename: currentUser.displayName,
                                // // mailid: currentUser.email,
                                // ...userRecord
                            }}
                            fields={[
                                // {
                                //     name: ["userRecord"],
                                //     values: userRecord,
                                // },

                            ]}

                            autoComplete="off"
                            onFinish={onFinish}
                            form={form}
                            onFieldsChange={(changedFields, allvalues) => onFieldsChangeHandler(changedFields, allvalues)}
                            onValuesChange={onFormLayoutChange}
                        >
                            <Form.Item labelAlign="left"
                                style={{ marginBottom: "10px" }}
                                label="Employee Id"
                                name="empId"
                            // onKeyPress={(event) => {
                            //     if (checkAlphabets(event)) {
                            //         event.preventDefault();
                            //     }
                            // }}

                            >
                                <Input placeholder="Associate Id" />
                            </Form.Item>

                            <Form.Item labelAlign="left"
                                style={{ marginBottom: "10px" }}
                                label="Employee Name"
                                name="associateName"
                                onKeyPress={(event) => {
                                    if (checkAlphabets(event)) {
                                        event.preventDefault();
                                    }
                                }}

                            >
                                <Input placeholder="Associate Name" />
                            </Form.Item>


                            {/* 
                            <Form.Item labelAlign="left"
                                style={{ marginBottom: "10px" }}
                                label="Reporting Manager"
                                name="manager"
                                onKeyPress={(event) => {
                                    if (checkAlphabets(event)) {
                                        event.preventDefault();
                                    }
                                }}

                            >
                                <Input placeholder="Reporting Manager" />
                            </Form.Item> */}

                            {/* 
                            <Form.Item labelAlign="left"
                                name="joiningdate"
                                style={{ marginBottom: "10px" }}
                                label="Date Of Joining"
                                onKeyPress={(event) => {
                                    if (checkNumbervalue(event)) {
                                        event.preventDefault();
                                    }
                                }}
                            >
                                <DatePicker style={{ width: "100%" }}
                                    format="DD-MM-YYYY " />
                            </Form.Item> */}

                            {/* <Form.Item labelAlign="left"
                                name="currentposition"
                                style={{ marginBottom: "10px" }}
                                label="Current Position"
                                onKeyPress={(event) => {
                                    if (checkAlphabets(event)) {
                                        event.preventDefault();
                                    }
                                }}
                            >
                                <Select
                                    placeholder="Select a Designation"
                                    style={{ width: "100%" }}
                                >
                                    <Option value="Internship">Internship</Option>
                                    <Option value="Software Trainee">Software Trainee</Option>
                                    <Option value="Asst. Software Developer">Asst. Software Developer</Option>
                                    <Option value="Sr. Software Developer">Sr. Software Developer</Option>
                                    <Option value="Jr. Software Developer">Jr. Software Developer</Option>
                                    <Option value="Business Analyst(BA)">Business Analyst(BA)</Option>
                                    <Option value="Quality Analyst(QA)">Quality Analyst(QA)</Option>
                                    <Option value="Human Resource(HR)">Human Resource(HR)</Option>
                                    <Option value="Human Resource(HR)">Human Resource(HR)</Option>
                                    <Option value="Director">Director</Option>
                                    <Option value="Chief Executive Officer(CEO)">Chief Executive Officer(CEO)</Option>
                                </Select>
                            </Form.Item> */}

                            <Form.Item labelAlign="left"
                                name="evaluationperiod"
                                style={{ marginBottom: "10px", width: '100%' }}
                                label="Evaluation Period"
                                onKeyPress={(event) => {
                                    if (checkAlphabets(event)) {
                                        event.preventDefault();
                                    }
                                }}
                            >
                                <DatePicker style={{ width: '100%' }} onChange={onChange} picker="quarter" />
                            </Form.Item>

                            <Form.Item >
                                <Button
                                    style={cancelStyle}
                                    onClick={handleOk}
                                    htmlType="submit"

                                    type="primary">Create
                                </Button>
                                <Button
                                    style={buttonStyle}
                                    onClick={onReset}
                                >Reset</Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </Modal>


            <Table
                loading={loading}
                columns={columns}
                dataSource={appraisalList}
                bordered

                pagination={{
                    position: ["bottomCenter"],
                }}
                scroll={{ x: 1300 }}
                className="employeeTable"
                size="small"
                // style={{ margin: '50px' }}
                onClick={() => {
                    // if (record?.status !== 'Approved')
                    onDeleteAppraisal();
                }}

            />
            <Modal
                centered
                title="Employee Details"
                visible={isModalVisible}
                footer={null}
                closeIcon={
                    <div
                        onClick={() => {
                            setIsModalVisible(false);
                        }}
                    >
                        X
                    </div>
                }
            >

            </Modal>

            <Modal footer={null}
                title="Appraisal Form"
                centered
                open={secondModal}
                visible={secondModal}
                onOk={() => setSecondModal(false)}
                onCancel={() => setSecondModal(false)}
                width={700}

            >

                <Appraisal currentEmployee={employeeRecord} appraisal={editedAppraisal} setSecondModal={setSecondModal} />

            </Modal>


        </div>
    )
}

export default AppraisalHr