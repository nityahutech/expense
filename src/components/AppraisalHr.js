import React, { useState, useEffect } from 'react'
import { EditOutlined } from "@ant-design/icons";
import { Button, Col } from 'antd';
import { Card, Input, Modal, Form, Row, notification, Typography, Select, DatePicker, Table } from 'antd';
const { Option } = Select;
const { RangePicker } = DatePicker;
const { Text, Link } = Typography;


const AppraisalHr = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [editedRecord, setEditedRecord] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [formLayout, setFormLayout] = useState('horizontal');
    const [loading, setLoading] = useState(false);
    const [userRecord, setUserRecord] = useState({
        employeename: '',
        mailid: '',
        address: "",
        city: "",
        country: "",
        phonenumber: "",
        state: "",
        zipcode: "",
    });

    const columns = [
        {
            title: "Sl. No.",
            dataIndex: "sn",
            key: "sn",
            fixed: "left",
            width: 80,
        },
        {
            title: "Associate Name",
            dataIndex: "associatename",
            key: "associatename",
            // fixed: "left",
            width: 160,
        },
        {
            title: "Date of Joining",
            dataIndex: "joiningdate",
            key: "joiningdate",
            width: 160,
        },
        {
            title: "Current Position",
            dataIndex: "currentposition",
            key: "currentposition",
            width: 200,
            ellipsis: true,
        },
        {
            title: 'Evaluation Quarter',
            children: [
              {
                title: 'Q1',
                dataIndex: 'quarterone',
                key: 'quarterone',
                width: 50,
              },
              {
                title: 'Q2',
                dataIndex: 'quartertwo',
                key: 'quartertwo',
                width: 50,
              },
              {
                title: 'Q3',
                dataIndex: 'quarterthree',
                key: 'quarterthree',
                width: 50,
              },
              {
                title: 'Q4',
                dataIndex: 'quarterfour',
                key: 'quarterfour',
                width: 50,
              },
            ],
          },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            width: 150,
        },
        
        
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            fixed: "right",
            width: 150,

            render: (_, record) => {
                // console.log("record:: ", record);
                return (
                    // record.key !== "subTotal" && (
                    <>
                        {/* <Space size="small"> */}
                        <Button
                            style={{ padding: 0 }}
                            type="link"
                            className="edIt"
                            onClick={() => {
                                handleEditEmployee(record);
                                showModal(record);
                            }}
                        >
                            {<EditOutlined />}
                        </Button>
                    </>
                );
                // );
            },
        },
    ];

    const [data, setData] = React.useState([]);

    const showModal = () => {
        console.log('hi')
        setIsModalOpen(true);
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
        showNotification("success", "Success", "Record updated successfuly");
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
        console.log(date, dateString);
      };
//model------2
    const handleEditEmployee = (record) => {
        console.log("record: ", record);
        setEditedRecord(record);
      };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            borderRadius: '10px'

        }}>
            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <Card
                    title=""
                    extra={<Button type="primary" onClick={showModal}>
                        Create Appraisal Form
                    </Button>}
                    style={{

                        width: '100%',
                        borderRadius: '10px',
                        margin: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',

                    }}
                >

                    <Text type="secondary">Create Appraisal Form Here! </Text>

                </Card>
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
                                // employeename: currentUser.displayName,
                                // mailid: currentUser.email,
                                ...userRecord
                            }}
                            fields={[
                                {
                                    name: ["userRecord"],
                                    values: userRecord,
                                },

                            ]}

                            autoComplete="off"
                            form={form}
                            // onFinish={formonFinishHandler}
                            onFieldsChange={(changedFields, allvalues) => onFieldsChangeHandler(changedFields, allvalues)}
                            onValuesChange={onFormLayoutChange}
                        >
                            <Form.Item labelAlign="left"
                                style={{ marginBottom: "10px", }}
                                label="Associate Name"
                                name="associatename"
                                onKeyPress={(event) => {
                                    if (checkAlphabets(event)) {
                                        event.preventDefault();
                                    }
                                }}

                            >
                                <Input placeholder="Associate Name" />
                            </Form.Item>


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
                                <DatePicker style={{ width: "100%" }} />
                            </Form.Item>

                            <Form.Item labelAlign="left"
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
                                    <Option value="intrn">Internship</Option>
                                    <Option value="st">Software Trainee</Option>
                                    <Option value="asd">Asst. Software Developer</Option>
                                    <Option value="ssd">Sr. Software Developer</Option>
                                    <Option value="jsd">Jr. Software Developer</Option>
                                    <Option value="ba">Business Analyst(BA)</Option>
                                    <Option value="qa">Quality Analyst(QA)</Option>
                                    <Option value="hr">Human Resource(HR)</Option>
                                    <Option value="mgr">Manager</Option>
                                    <Option value="dr">Director</Option>
                                    <Option value="ceo">Chief Executive Officer(CEO)</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item labelAlign="left"
                                name="evaluationperiod"
                                style={{ marginBottom: "10px" }}
                                label="Evaluation Period"
                                onKeyPress={(event) => {
                                    if (checkAlphabets(event)) {
                                        event.preventDefault();
                                    }
                                }}
                            >
                                 <DatePicker onChange={onChange} picker="quarter" />
                            </Form.Item>

                            <Form.Item >
                                <Button
                                    style={cancelStyle}
                                    onClick={handleOk}


                                    // onClick={submitEdit}
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
                dataSource={data}
                pagination={{
                    position: ["bottomCenter"],
                }}
                scroll={{ x: 1300 }}
                className="employeeTable"
                size="small"
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

            // onCancel={handleCancel}
            >
                {/* <Editemployee
                    className="Edit"
                    record={editedRecord}
                    setIsModalVisible={setIsModalVisible}
                /> */}
            </Modal>


        </div>
    )
}

export default AppraisalHr