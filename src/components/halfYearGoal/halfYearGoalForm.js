import React, { useState, useRef } from 'react'
import AppraisalContext from '../../contexts/AppraisalContext';
import ReactToPrint, { useReactToPrint } from "react-to-print";
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import FloatInput from "./floatInput";
import FloatTextArea from "./floatTextarea";

// import styles from "./halfYearGoal.css";

import "./halfYearGoal.css";
import {
    Row,
    Col,
    Input,
    Button,
    Typography,
    Form,
    Divider,
    Radio,
    notification,
    Layout,
    Rate,
    Checkbox
} from "antd";
const currDate = new Date().toLocaleDateString();
const currTime = new Date().toLocaleTimeString();

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
    const [selectedNumber, setSelectedNumber] = useState(0);


    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'Quarter Appraisal Form',
        onafterprint: () => alert('Print Succes')

    });


    const onReset = () => {
        form.resetFields()
    };

    const selectNumber = numberSelected => {
        setSelectedNumber(numberSelected)
    }
    const [active, setActive] = useState("");

    const handleClick = (event) => {
        setActive(event.target.id);

    }


    //--------------------------------------------------------------------------checkbox-1
    function onChange(checkedValues) {
        console.log("checked = ", checkedValues);
    }


    // all options, also coming from json
    const options = [
        { label: "Taking Interview,", value: "interview" },
        { label: "Refering friends", value: "friends" },
        { label: " Mentoring", value: "mentoring" },
        { label: " Walkin involvement", value: "involvement" },
        { label: " Creating knowledge repositorys", value: "knowledge" },
        { label: "  Implementing best practices", value: "practices" },
        { label: "  Others", value: "others" }
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
        { label: "  Others", value: "otherstwo" }

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
        console.log('appraisalGoal', values);
    }



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

                <Row gutter={[8, 8]}>
                    <Col xl={24} lg={24} md={24} sm={24} xs={24} >

                        <Form className='appraisall-div' style={{ width: '600px' }}
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
                            <Divider>Project Related Activities </Divider>
                            <Form.Item name="projectName"
                            // rules={[{ required: true }]}
                            >
                                <FloatInput
                                    label="Project Name"
                                    placeholder="Project name"
                                    name="name"
                                />
                            </Form.Item>

                            <Form.Item name="projectDetal">
                                <FloatTextArea className='textArea-ant-two'
                                    label="Project Detail"

                                    // required
                                    placeholder="Project Detail" />
                            </Form.Item>
                            <Form.List name="fields">
                                {(fields, { add, remove }) => {
                                    return (
                                        <div >
                                            {fields.map((field, index) => (
                                                <div key={field.key} style={{ marginBottom: '10px' }}>

                                                    <Form.Item
                                                        name={[index, "projectName"]}

                                                    // rules={[{ required: true }]}
                                                    >
                                                        <FloatInput
                                                            label="Project Name"
                                                            placeholder="Project name"
                                                            name="name"
                                                        />
                                                    </Form.Item>

                                                    <Form.Item name="projectDetal">
                                                        <FloatTextArea className='textArea-ant-two'
                                                            label="Project Detail"

                                                            // required
                                                            placeholder="Project Detail" />
                                                    </Form.Item>
                                                    {fields.length ? (
                                                        <Button
                                                            type="danger"
                                                            className="dynamic-delete-button"
                                                            onClick={() => remove(field.name)}
                                                            icon={<MinusCircleOutlined />}
                                                        >

                                                        </Button>
                                                    ) : null}
                                                </div>
                                            ))}

                                            <Form.Item>
                                                <Button
                                                    type="primary"
                                                    className="dynamic-delete-button"
                                                    onClick={() => add()}
                                                    style={{ width: "" }}
                                                    icon={<PlusCircleOutlined />}
                                                >

                                                </Button>

                                            </Form.Item>
                                        </div>
                                    );
                                }}
                            </Form.List>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <Form.Item className='rating-div'
                                        name="rating"
                                        label="Rate YourSelf"
                                    // rules={[{ required: true }]}
                                    >
                                        <div >
                                            <Radio.Group defaultValue="a" buttonStyle="solid">
                                                <Radio.Button style={{ marginRight: '5px' }} value="a">1</Radio.Button>
                                                <Radio.Button style={{ marginRight: '5px' }} value="b">2</Radio.Button>
                                                <Radio.Button style={{ marginRight: '5px' }} value="c">3</Radio.Button>
                                                <Radio.Button style={{ marginRight: '5px' }} value="d">4</Radio.Button>
                                                <Radio.Button style={{ marginRight: '5px' }} value="2">5</Radio.Button>
                                            </Radio.Group>

                                        </div >
                                    </Form.Item>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <Form.Item className='rating-div'
                                        name="ratingManager"
                                        label="Manager Rating"
                                    // rules={[{ required: true }]}
                                    >
                                        <div >

                                            <Radio.Group defaultValue="a" buttonStyle="solid">
                                                <Radio.Button style={{ marginRight: '5px' }} value="a">1</Radio.Button>
                                                <Radio.Button style={{ marginRight: '5px' }} value="b">2</Radio.Button>
                                                <Radio.Button style={{ marginRight: '5px' }} value="c">3</Radio.Button>
                                                <Radio.Button style={{ marginRight: '5px' }} value="d">4</Radio.Button>
                                                <Radio.Button style={{ marginRight: '5px' }} value="2">5</Radio.Button>
                                            </Radio.Group>

                                        </div >
                                    </Form.Item>
                                </div>
                            </div>

                            {/* //----------------------------------------------- */}

                            <Divider>Organizational Activities: </Divider>
                            <Form.Item name="Organizational" colon={false} valuePropName="checked" initialValue={defaults}>
                                <Checkbox.Group style={{ display: 'flex', flexDirection: 'column' }}
                                    options={options}
                                    defaultValue={defaults}
                                    onChange={onChange}
                                />
                            </Form.Item>

                            <Form.Item name="giveDescription">
                                <FloatTextArea className='textArea-ant-two'
                                    label="Give Detail"

                                    // required
                                    placeholder="Give Detail" />
                            </Form.Item>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <Form.Item className='rating-div'
                                        name="organisationRating"
                                        label="Rate YourSelf"
                                    // rules={[{ required: true }]}
                                    >

                                        <div >
                                            <Radio.Group defaultValue="a" buttonStyle="solid">
                                                <Radio.Button style={{ marginRight: '5px' }} value="a">1</Radio.Button>
                                                <Radio.Button style={{ marginRight: '5px' }} value="b">2</Radio.Button>
                                                <Radio.Button style={{ marginRight: '5px' }} value="c">3</Radio.Button>
                                                <Radio.Button style={{ marginRight: '5px' }} value="d">4</Radio.Button>
                                                <Radio.Button style={{ marginRight: '5px' }} value="2">5</Radio.Button>
                                            </Radio.Group>

                                        </div >
                                    </Form.Item>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <Form.Item className='rating-div'
                                        name="organisationRatingManager"
                                        label="Manager Rating"
                                    // rules={[{ required: true }]}
                                    >

                                        <div >
                                            <Radio.Group defaultValue="a" buttonStyle="solid">
                                                <Radio.Button style={{ marginRight: '5px' }} value="a">1</Radio.Button>
                                                <Radio.Button style={{ marginRight: '5px' }} value="b">2</Radio.Button>
                                                <Radio.Button style={{ marginRight: '5px' }} value="c">3</Radio.Button>
                                                <Radio.Button style={{ marginRight: '5px' }} value="d">4</Radio.Button>
                                                <Radio.Button style={{ marginRight: '5px' }} value="2">5</Radio.Button>
                                            </Radio.Group>


                                        </div >
                                    </Form.Item>
                                </div>
                            </div>
                            {/* //----------------------------------------------- */}
                            <Divider>Personal Growth : </Divider>

                            <Form.Item name="Personal" valuePropName="checked" initialValue={defaults}>
                                <Checkbox.Group style={{ display: 'flex', flexDirection: 'column' }}
                                    options={optionsTwo}
                                    defaultValue={defaults}
                                    onChange={onChange}
                                />
                            </Form.Item>

                            <Form.Item labelAlign="left"
                                style={{ marginBottom: "10px", width: '100%', }}
                                name="personalGrowth"

                            >
                                <Form.Item name="givePersonalDescription">
                                    <FloatTextArea className='textArea-ant-two'
                                        label="Give Detail"

                                        // required
                                        placeholder="Give Detail" />
                                </Form.Item>
                            </Form.Item>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <Form.Item className='rating-div'
                                        name="personalRating"
                                        label="Rate YourSelf"
                                    // rules={[{ required: true }]}
                                    >

                                        <div >
                                            <Radio.Group defaultValue="a" buttonStyle="solid">
                                                <Radio.Button style={{ marginRight: '5px' }} value="a">1</Radio.Button>
                                                <Radio.Button style={{ marginRight: '5px' }} value="b">2</Radio.Button>
                                                <Radio.Button style={{ marginRight: '5px' }} value="c">3</Radio.Button>
                                                <Radio.Button style={{ marginRight: '5px' }} value="d">4</Radio.Button>
                                                <Radio.Button style={{ marginRight: '5px' }} value="2">5</Radio.Button>
                                            </Radio.Group>

                                        </div >
                                    </Form.Item>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <Form.Item className='rating-div'
                                        name="persoanalRatingManager"
                                        label="Manager Rating"
                                    // rules={[{ required: true }]}
                                    >

                                        <div >

                                            <Radio.Group defaultValue="a" buttonStyle="solid">
                                                <Radio.Button style={{ marginRight: '5px' }} value="a">1</Radio.Button>
                                                <Radio.Button style={{ marginRight: '5px' }} value="b">2</Radio.Button>
                                                <Radio.Button style={{ marginRight: '5px' }} value="c">3</Radio.Button>
                                                <Radio.Button style={{ marginRight: '5px' }} value="d">4</Radio.Button>
                                                <Radio.Button style={{ marginRight: '5px' }} value="2">5</Radio.Button>
                                            </Radio.Group>


                                        </div >
                                    </Form.Item>
                                </div>
                            </div>
                            <Divider orientation='left' orientationMargin={0}>To Be Fill By Manager<span style={{ color: 'red' }}> *</span></Divider>
                            <Form.Item labelAlign="left"
                                style={{ marginBottom: "10px", width: '100%', }}
                                name="managerComment"

                            >
                                <Form.Item name="managerComment">
                                    <FloatTextArea className='textArea-ant-two'
                                        label="Manager Comments"

                                        // required
                                        placeholder="Manager Comments" />
                                </Form.Item>
                            </Form.Item>

                            <Col span={30} >

                                <Form.Item className="noprint" style={{ marginTop: '30px' }}>
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

