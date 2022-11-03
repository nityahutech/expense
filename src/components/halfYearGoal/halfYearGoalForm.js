import React, { useState, useRef } from 'react'
import AppraisalContext from '../../contexts/AppraisalContext';
import ReactToPrint, { useReactToPrint } from "react-to-print";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

import "./halfYearGoal.css";
import {
    Row,
    Col,
    Input,
    Button,
    Typography,
    Form,
    Divider,
    Table,
    notification,
    Layout,
    Rate,
    Checkbox
} from "antd";
const currDate = new Date().toLocaleDateString();
const currTime = new Date().toLocaleTimeString();
const { TextArea } = Input;
const { Text, Link } = Typography;

const HalfYearGoalForm = (props) => {
    console.log('employeeRecord', props.currentEmployee)
    console.log('employeeAppraisal', props.appraisal)
    const [form] = Form.useForm();
    const [formLayout, setFormLayout] = useState('horizontal');
    const [currentAppraisal, setCurrentAppraisal] = useState(props.appraisal);
    const [empEditable, setEmpEditable] = useState(!(currentAppraisal.status === 'empPending'));
    const [leadEditable, setLeadEditable] = useState((currentAppraisal.status === 'leadPending' && props.hrMode == false));
    const [mgrEditable, setMgrEditable] = useState((currentAppraisal.status === 'mgrPending' && props.hrMode == false));


    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'Quarter Appraisal Form',
        onafterprint: () => alert('Print Succes')

    });


    const onReset = () => {
        form.resetFields()
    };


    const [selectedNumber, setSelectedNumber] = useState(0);

    const selectNumber = numberSelected => {
        setSelectedNumber(numberSelected)
    }


    //--------------------------------------------------------------------------checkbox-1
    function onChange(checkedValues) {
        console.log("checked = ", checkedValues);
    }

    // initial values (generally coming from json)
    // const defaults = ["Pear", "Orange"];
    // const initalValues = {
    //     fruits: defaults
    // };

    // all options, also coming from json
    const options = [
        { label: "Taking Interview,", value: "interview" },
        { label: "Refering friends", value: "friends" },
        { label: " Mentoring", value: "mentoring" },
        { label: " Walkin involvement", value: "involvement" },
        { label: " Creating knowledge repositorys", value: "knowledge" },
        { label: "  Implementing best practices", value: "practices" }
    ];

    //--------------------------------------------------------------------------checkbox-2

    // initial values (generally coming from json)
    const defaults = ["Pear", "Orange"];
    const initalValues = {
        fruits: defaults
    };

    // all options, also coming from json
    const optionsTwo = [
        { label: "Certifications,", value: "certifications" },
        { label: " Soft skills", value: "soft" },
        { label: " Interpersonal skills", value: "interpersonal" },
        { label: "  learning new technical skills", value: "technical" },

    ];

    const buttonStyle = {
        marginRight: "5px",
        color: "white",
        backgroundColor: "#1890ff",
        float: "right",
        backgroundColor: '#d9d9d9'
    };

    const handleOk = () => {
        console.log('hiii')
        props.setSecondModal(false)
    };

    const cancelStyle = {
        float: "right",

    };

    const checkAlphabets = (event) => {
        if (!/^[a-zA-Z ]*$/.test(event.key) && event.key !== "Backspace") {
            return true;
        }
    };

    const showNotification = (type, msg, desc) => {
        notification[type]({
            message: msg,
            description: desc,
        });
    };

    const onFinish = (values) => {
        console.log('appraisal1', values);

        let newAppraisalForm = {
            projectName: values.projectName,
            employeeContribution: values.contribution,
            employeeGoal: values.employeeGoal,
            employeeStrength: values.employeeStrength,
            lead: props.appraisal.lead,
            repManager: props.appraisal.repManager,
            mailid: props.appraisal.mailid,
            fname: props.appraisal.fname,
            lname: props.appraisal.lname,
            status: 'leadPending'

        }
        if (leadEditable) {
            newAppraisalForm = {

                status: 'mgrPending',
                leadGoal: values.leadGoal,
                leadRating: values.leadRating,
                lead: props.appraisal.lead,
                repManager: props.appraisal.repManager,
                mailid: props.appraisal.mailid,
                fname: props.appraisal.fname,
                lname: props.appraisal.lname,

            }
        }

        if (mgrEditable) {
            newAppraisalForm = {

                status: 'completed',
                managerComments: values.managerComments,
                managerObjective: values.managerObjective,
                diversityGoal: values.diversityGoal,
                lead: props.appraisal.lead,
                repManager: props.appraisal.repManager,
                mailid: props.appraisal.mailid,
                fname: props.appraisal.fname,
                lname: props.appraisal.lname,
            }
        }
        console.log('appraisal2', newAppraisalForm)

        AppraisalContext.updateAppraisal(currentAppraisal.id, newAppraisalForm)
            .then(response => {
                console.log("appraisal Form Created", response);
                if (newAppraisalForm.status === 'leadPending') {
                    console.log('newAppraisalForm.status', newAppraisalForm.status)
                    AppraisalContext.sendEmailToLead(newAppraisalForm)

                }
                else if (newAppraisalForm.status === 'mgrPending') {
                    AppraisalContext.sendEmailToManager(newAppraisalForm)
                }

                showNotification("success", "Success", "Appraisal successfully submited");
                setEmpEditable(false)
            })
            .catch(error => {
                console.log('appraisalForm', error.message);
                showNotification("error", "Error", "Error Submiting Appraisal");

            })
        console.log('appraisalForm', 'appraisal created');

        // setQuarter('')
        // form.resetFields();

    };

    return (
        <Layout classname='layout-antd' style={{ backgroundColor: 'white' }}>
            <button style={{
                width: '50px', position: 'absolute',
                top: 15, right: 50
            }}
                onClick={handlePrint}>Print
            </button>
            <div className='page-header'
                ref={componentRef}
                style={{ display: "flex", flexDirection: "column", alignItems: 'center' }}>
                <Col xl={24} lg={24} md={24} sm={24} xs={24}

                    style={{
                        width: 600,
                        marginTop: 10,
                    }}
                >
                    <p className='page-time' style={{ display: 'none' }}> {currDate} {currTime} <h3>Hutech Solution Pvt Ltd</h3></p>

                    <Row gutter={[16, 16]} className='page-header'>
                        <Col xs={{ span: 12 }}
                            lg={{ span: 8 }}>
                            <div>
                                <div style={{ fontWeight: "600", fontSize: "15px" }}>
                                    Employee Id
                                </div>
                                <Text type="secondary">{currentAppraisal.empId
                                }
                                </Text>
                            </div>
                        </Col>

                        <Col xs={{ span: 12 }}
                            lg={{ span: 8 }}>
                            <div>
                                <div style={{ fontWeight: "600", fontSize: "15px" }}>
                                    Associate Name
                                </div>

                                <Text type="secondary">{currentAppraisal.fname}
                                </Text>
                            </div>
                        </Col>

                        <Col xs={{ span: 12 }}
                            lg={{ span: 8 }}>
                            <div>
                                <div style={{ fontWeight: "600", fontSize: "15px" }}>
                                    Current Position
                                </div>

                                <Text type="secondary">{currentAppraisal.designation
                                } </Text>

                            </div>
                        </Col>


                        <Col xs={{ span: 12 }}
                            lg={{ span: 8 }}>
                            <div>
                                <div style={{ fontWeight: "600", fontSize: "15px" }}>
                                    Quarter
                                </div>

                                <Text type="secondary">{currentAppraisal.quarter}
                                </Text>
                            </div>
                        </Col>

                        <Col xs={{ span: 12 }}
                            lg={{ span: 8 }}>
                            <div>
                                <div style={{ fontWeight: "600", fontSize: "15px" }}>
                                    Reporting Manager
                                </div>
                                <Text type="secondary">{currentAppraisal.repManager
                                } </Text>


                            </div>
                        </Col>
                    </Row>
                </Col>

                <Row gutter={[8, 32]}>
                    <Col xl={24} lg={24} md={24} sm={24} xs={24} >

                        <Form className='appraisall-div'
                            layout="vertical"
                            labelCol={{
                                span: 24,

                            }}
                            wrapperCol={{
                                span: 24,
                            }}
                            initialValues={{
                                remember: true,
                                projectName: currentAppraisal.projectName,
                                contribution: currentAppraisal.employeeContribution,
                                employeeGoal: currentAppraisal.employeeGoal,
                                employeeStrength: currentAppraisal.employeeStrength,
                                leadGoal: currentAppraisal.leadGoal,
                                leadRating: currentAppraisal.leadRating,
                                managerComments: currentAppraisal.managerComments,
                                managerObjective: currentAppraisal.managerObjective,
                                diversityGoal: currentAppraisal.diversityGoal,

                            }}
                            fields={[

                            ]}

                            autoComplete="off"
                            form={form}
                            onFinish={onFinish}


                        >


                            <Divider orientation='left' orientationMargin={0}>To Be Fill By Employee<span style={{ color: 'red' }}> *</span></Divider>

                            {/* //-------------------------------------dynamic field---- */}

                            <Form.List name="fields">
                                {(fields, { add, remove }) => {
                                    return (
                                        <div>
                                            {fields.map((field, index) => (
                                                <div key={field.key}>
                                                    <Divider>Project Related Activities : {index + 1}</Divider>
                                                    <Form.Item
                                                        name={[index, "name"]}
                                                        label="Project Name"
                                                        rules={[{ required: true }]}
                                                    >
                                                        <Input placeholder="project name" />
                                                    </Form.Item>

                                                    <Form.Item name={[index, "options"]} label="Project Detail">
                                                        <TextArea
                                                            maxLength={100}
                                                            autoSize={{
                                                                minRows: 3,

                                                            }}
                                                            required
                                                            placeholder="project Detail," />
                                                    </Form.Item>
                                                    {fields.length > 1 ? (
                                                        <Button
                                                            type="danger"
                                                            className="dynamic-delete-button"
                                                            onClick={() => remove(field.name)}
                                                            icon={<MinusCircleOutlined />}
                                                        >
                                                            Remove Above Project
                                                        </Button>
                                                    ) : null}
                                                </div>
                                            ))}
                                            <Divider />
                                            <Form.Item>
                                                <Button
                                                    type="dashed"
                                                    onClick={() => add()}
                                                    style={{ width: "60%" }}
                                                >
                                                    <PlusOutlined /> Add field
                                                </Button>
                                            </Form.Item>
                                        </div>
                                    );
                                }}
                            </Form.List>
                            <span className="ant-rate-text">Rate Your Self</span>

                            <Rate defaultValue={3} />

                            {/* //----------------------------------------------- */}

                            <Divider>Organizational Activities: </Divider>

                            <Form.Item name="Organizational" colon={false} valuePropName="checked" initialValue={defaults}>
                                <Checkbox.Group
                                    options={options}
                                    defaultValue={defaults}
                                    onChange={onChange}
                                />
                            </Form.Item>

                            <Form.Item labelAlign="left"
                                style={{ marginBottom: "10px", width: '100%', }}
                                label='Give Discription: '
                                name="organizationalActivities"

                            >
                                <TextArea className='textArea-ant'
                                    maxLength={100}
                                    autoSize={{
                                        minRows: 3,
                                    }}
                                    required
                                    placeholder=""
                                    disabled={empEditable}
                                />
                            </Form.Item>

                            {/* //----------------------------------------------- */}
                            <Divider>Personal Growth : </Divider>

                            <Form.Item name="Personal" valuePropName="checked" initialValue={defaults}>
                                <Checkbox.Group
                                    options={optionsTwo}
                                    defaultValue={defaults}
                                    onChange={onChange}
                                />
                            </Form.Item>

                            <Form.Item labelAlign="left"
                                style={{ marginBottom: "10px", width: '100%', }}
                                label='Give Discription: '
                                name="personalGrowth"

                            >
                                <TextArea className='textArea-ant-two'
                                    maxLength={100}
                                    autoSize={{
                                        minRows: 3,
                                    }}
                                    required
                                    placeholder=""
                                    disabled={empEditable}
                                />
                            </Form.Item>

                            <div >
                                <Button onClick={selectNumber} value="7">7</Button>
                                <Button onClick={selectNumber} value="8">8</Button>
                                <Button onClick={selectNumber} value="9">9</Button>
                            </div >

                            {/* <Form.Item labelAlign="left"
                                style={{ marginBottom: "10px", width: '100%', }}                          
                                label='Project Name and Description '
                                name="projectName"
                        
                            >
                                <TextArea className='textArea-ant'
                                    maxLength={100}
                                    autoSize={{
                                        minRows: 3,


                                    }}
                                    required
                                    placeholder=""
                                    disabled={empEditable}
                                />
                            </Form.Item> */}

                            {/* <Form.Item labelAlign="left"
                                style={{ marginBottom: "10px" }}
                                label='What were your best traits or contribution to the company this quarter?'
                                name="contribution"                

                            >
                                <TextArea
                                    maxLength={100}
                                    autoSize={{
                                        minRows: 3,

                                    }}
                                    required
                                    placeholder=""
                                    disabled={empEditable}
                                />
                            </Form.Item> */}

                            {/* <Form.Item labelAlign="left"
                                style={{ marginBottom: "10px" }}
                                label='What are your goal for next quarter?'
                                name="employeeGoal"
                     
                            >
                                <TextArea
                                    maxLength={100}
                                    autoSize={{
                                        minRows: 3,

                                    }}
                                    required
                                    placeholder=""
                                    disabled={empEditable}
                                />
                            </Form.Item> */}
                            {/* 
                            <Form.Item className='page-break4' labelAlign="left"
                                style={{ marginBottom: "10px" }}
                                label='What are your Strength and Development Area?'

                                name="employeeStrength"

                            // onKeyPress={(event) => {
                            //     if (checkAlphabets(event)) {
                            //         event.preventDefault();
                            //     }
                            // }}

                            >
                                <TextArea
                                    maxLength={100}
                                    autoSize={{
                                        minRows: 3,

                                    }}
                                    required
                                    placeholder=""
                                    disabled={empEditable}
                                />
                            </Form.Item> */}

                            {/* //--------------lead---------------------------*/}

                            {/* <div className='page-break-lead' style={{ display: leadEditable || mgrEditable || props.hrMode ? 'block' : 'none' }}>
                                <Divider orientation='left' orientationMargin={0}>To Be Fill By Team Lead<span style={{ color: 'red' }}> *</span></Divider>


                                <Form.Item labelAlign="left"
                                    style={{ marginBottom: "10px", }}
                                    label='Set goals and objective for upcoming assement year'

                                    name="leadGoal"

                                // onKeyPress={(event) => {
                                //     if (checkAlphabets(event)) {
                                //         event.preventDefault();
                                //     }
                                // }}

                                >

                                    <TextArea
                                        style={{ overflow: 'hidden', }}
                                        maxLength={100}
                                        autoSize={{
                                            minRows: 3,


                                        }}
                                        required
                                        // bordered={false}
                                        placeholder=""
                                        disabled={!leadEditable}
                                    />
                                </Form.Item>

                                <Form.Item labelAlign="left"
                                    style={{ marginBottom: "10px" }}
                                    label='Overall Rating'

                                    name="leadRating"

                                // onKeyPress={(event) => {
                                //     if (checkAlphabets(event)) {
                                //         event.preventDefault();
                                //     }
                                // }}

                                >

                                    <TextArea
                                        maxLength={100}
                                        autoSize={{
                                            minRows: 3,

                                        }}
                                        required
                                        placeholder=""
                                        disabled={!leadEditable}
                                    />
                                </Form.Item>
                            </div> */}

                            {/* //-------------------mgr------- */}

                            {/* <div className='page-break-mgr' style={{ display: mgrEditable || props.hrMode ? 'block' : 'none' }}>
                                <Divider orientation='left' orientationMargin={0}>To Be Fill By Manager<span style={{ color: 'red' }}> *</span></Divider>

                                <Form.Item labelAlign="left"
                                    style={{ marginBottom: "10px" }}
                                    label='Associate Engagement Comments:'
                                    name="managerComments"

                                // onKeyPress={(event) => {
                                //     if (checkAlphabets(event)) {
                                //         event.preventDefault();
                                //     }
                                // }}

                                >
                                    <TextArea
                                        maxLength={100}
                                        autoSize={{
                                            minRows: 3,

                                        }}
                                        required
                                        placeholder=""
                                        disabled={!mgrEditable}
                                    />
                                </Form.Item>


                                <Form.Item labelAlign="left"
                                    style={{ marginBottom: "10px" }}
                                    label='People Management/Leadership Objectives:'

                                    name="managerObjective"

                                // onKeyPress={(event) => {
                                //     if (checkAlphabets(event)) {
                                //         event.preventDefault();
                                //     }
                                // }}

                                >
                                    <TextArea
                                        maxLength={100}
                                        autoSize={{
                                            minRows: 3,

                                        }}
                                        required
                                        placeholder=""
                                        disabled={!mgrEditable}
                                    />
                                </Form.Item>


                                <Form.Item labelAlign="left"
                                    style={{ marginBottom: "10px" }}
                                    label='Diversity Goals Comments (if applicable):'

                                    name="diversityGoal"

                                // onKeyPress={(event) => {
                                //     if (checkAlphabets(event)) {
                                //         event.preventDefault();
                                //     }
                                // }}

                                >
                                    <TextArea
                                        maxLength={100}
                                        autoSize={{
                                            minRows: 3,

                                        }}
                                        required
                                        placeholder=""
                                        disabled={!mgrEditable}
                                    />
                                </Form.Item>

                            </div> */}


                            <Col span={30} >

                                <Form.Item className="noprint">
                                    <Button
                                        style={cancelStyle}
                                        onClick={handleOk}
                                        // onClick={submitEdit}
                                        htmlType="submit"

                                        type="primary">Submit
                                    </Button>
                                    <Button
                                        style={buttonStyle}
                                        onClick={onReset}
                                    >Reset</Button>
                                </Form.Item>
                            </Col>
                        </Form>
                    </Col>
                </Row>
            </div >
        </Layout>
    )
}

export default HalfYearGoalForm

