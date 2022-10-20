import React, { useState, useEffect } from 'react'
import { EditOutlined, PrinterFilled, DeleteOutlined, FileImageOutlined } from "@ant-design/icons";
import { Button, Col } from 'antd';
import { Card, Input, Modal, Form, Row, notification, Typography, Select, DatePicker, Table, Tag } from 'antd';
import Appraisal from "./quarterAppraisal";
import AppraisalEmp from "./quarterAppraisalEmp";
import AppraisalLead from "./quarterAppraisalLead";
import AppraisalManager from "./quarterAppraisalManager";
import "./appraisal.css";
import AppraisalContext from '../../contexts/AppraisalContext';
import EmployeeContext from '../../contexts/EmployeeContext';
import moment from 'moment/moment';
import { useAuth } from '../../contexts/AuthContext'

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
            // fixed: "left",
            width: 90,
        },
        {
            title: "Employee Name",
            dataIndex: "Name",
            // fixed: "left",
            width: 120,
        },
        {
            title: "Reporting Manager",
            dataIndex: "Manager",
            // fixed: "left",
            width: 120,
        },
        {
            title: "Self Assessment",
            dataIndex: "Selfassessment",
            // fixed: "left",
            width: 120,
            sorter: (a, b) => {
                return a.status !== b.status ? (a.status < b.status ? -1 : 1) : 0;
            },
            sortDirections: ["ascend", "descend"],
            render: (_, { status }) =>
                status !== "" && (
                    <Tag style={{ width: '100px' }}
                        className="statusTag"
                        color={status === "Approved" ? "green" : status === "Pending" ? 'blue' : "volcano"}
                        key={status}
                    >
                        {status}
                    </Tag>
                ),
        },
        {
            title: "Lead Assessment",
            dataIndex: "Leadassessment",
            // fixed: "left",
            width: 150,
            sorter: (a, b) => {
                return a.status !== b.status ? (a.status < b.status ? -1 : 1) : 0;
            },
            sortDirections: ["ascend", "descend"],
            render: (_, { status }) =>
                status !== "" && (
                    <Tag style={{ width: '100px' }}
                        className="statusTag"
                        color={status === "Approved" ? "green" : status === "Pending" ? 'blue' : "volcano"}
                        key={status}
                    >
                        {status}
                    </Tag>
                ),
        },
        {
            title: "Manager Assessment",
            dataIndex: "Mangassessment",
            // fixed: "left",
            width: 140,
            ellipsis: true,
            sorter: (a, b) => {
                return a.status !== b.status ? (a.status < b.status ? -1 : 1) : 0;
            },
            sortDirections: ["ascend", "descend"],
            render: (_, { status }) =>
                status !== "" && (
                    <Tag style={{ width: '100px' }}
                        className="statusTag"
                        color={status === "Approved" ? "green" : status === "Pending" ? 'blue' : "volcano"}
                        key={status}
                    >
                        {status}
                    </Tag>
                ),

        },
        {
            title: 'Evaluation Quarter',
            dataIndex: "Period",

            width: 110,
            ellipsis: true,

        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",

            fixed: "right",
            width: 130,

            render: (_, appraisal) => {

                return (
                    <>
                        {console.log('render', appraisal)}

                        {/* <Button
                            style={{ color: 'blue', boxShadow: '0 4px 6px rgb(0 0 0 / 12%)' }}
                            type="link"
                            className="edIt"
                            hoverable
                            onClick={() => {

                                setEditedAppraisal(appraisal);
                                setSecondModal(true)

                            }}
                        >
                            {<EditOutlined />}
                        </Button> */}

                        <Button
                            style={{ color: 'blue', boxShadow: '0 4px 6px rgb(0 0 0 / 12%)', }}
                            type="link"
                            className="edIt"
                            onClick={() => {

                                setEditedAppraisal(appraisal);
                                setSecondModal(true)

                            }}
                        >
                            {<FileImageOutlined />}

                        </Button>


                        {(sessionStorage.getItem("role") === 'hr') &&
                            <Button
                                style={{ color: 'red', boxShadow: '0 4px 6px rgb(0 0 0 / 12%)' }}
                                type="link"
                                className="edIt"
                                onClick={() => {
                                    onDeleteAppraisal(appraisal)
                                }}
                            >
                                {<DeleteOutlined />}
                            </Button>}

                        <Button
                            style={{ color: 'grey', boxShadow: '0 4px 6px rgb(0 0 0 / 12%)' }}
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
            title: "Are you sure, you want to delete  record?",
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
            // width: '100%',
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
                            <Card
                                // onClick={showModal} 
                                className='card-app'
                                style={{ position: 'relative', width: '25rem' }}
                                hoverable

                            >
                                <div style={{ fontSize: '30px' }}>50</div>
                                <div style={{ color: 'rgb(37, 150, 190)' }}>Total Assessment</div>
                            </Card>

                            <Card

                                className='card-app'
                                style={{ position: 'relative', width: '25rem' }}
                                hoverable

                            >
                                <div style={{ fontSize: '30px' }}> 20</div>
                                <div style={{ color: 'rgb(37, 150, 190)' }}>Self Assessment</div>
                                <div style={{ color: 'grey' }}>Pending</div>

                            </Card>


                            <Card className='card-app'
                                style={{ position: 'relative', width: '25rem' }}
                                hoverable


                            >
                                <div style={{ fontSize: '30px' }}> 10</div>
                                <div style={{ color: 'rgb(37, 150, 190)' }}>Lead Assessment</div>
                                <div style={{ color: 'grey' }}>In Progress</div>
                            </Card>

                            <Card className='card-app'
                                style={{ position: 'relative', width: '25rem' }}
                                hoverable


                            >
                                <div style={{ fontSize: '30px' }}> 10</div>
                                <div style={{ color: 'rgb(37, 150, 190)' }}>Manager Assessment</div>
                                <div style={{ color: 'grey' }}>In Progress</div>
                            </Card>


                            <Card className='card-app'
                                style={{ position: 'relative', width: '25rem' }}
                                hoverable

                            >
                                <div style={{ fontSize: '30px' }}>2</div>
                                <div style={{ color: 'rgb(37, 150, 190)' }}>Completed</div>
                                <div style={{ color: 'grey' }}>Submitted to Hr</div>
                            </Card>
                        </Col>
                    </Row>

                </div>
            </Col>

            <div className="app-tab" style={{ width: '100%', marginleft: '10px' }}>
                <Row className="employeeRow" style={{ marginLeft: '10px', marginRight: '10px', flexDirection: 'row', display: 'flex', justifyContent: 'space-between', }}>
                    <Col>
                        <Input
                            placeholder="Search"

                        />

                    </Col>
                    <Button type="primary" onClick={showModal}>Create Appraisal</Button>

                </Row>
            </div>

            <div className="app-tab" style={{ width: '100%', paddingLeft: '10px', paddingRight: '10px', }}>
                <Row style={{
                    display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'flex-start', backgroundColor: 'white',
                    borderRadius: '10px', padding: '10px', marginTop: '10px'
                }}
                >
                    <Col span={24} style={{
                        display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'flex-start', color: 'black', width: '100rem'
                    }}><h3>Appraisal Created by Hr</h3></Col>

                    <Col xl={24} lg={24} md={24} sm={24} xs={24} style={{
                        background: 'flex', padding: '10px',
                    }} >

                        <Table
                            loading={loading}
                            columns={columns}
                            dataSource={appraisalList}
                            bordered

                            pagination={{
                                position: ["bottomCenter"],
                            }}
                            scroll={{ x: 1200 }}
                            className="employeeTable"
                            style={{ marginLeft: '10px', marginRight: '10px' }}
                            size="small"
                            onClick={() => {
                                // if (record?.status !== 'Approved')
                                onDeleteAppraisal();
                            }}

                        />

                    </Col>

                </Row>
            </div>


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
            <AppraisalEmp />
            <AppraisalLead />
            <AppraisalManager />


        </div>
    )
}

export default AppraisalHr