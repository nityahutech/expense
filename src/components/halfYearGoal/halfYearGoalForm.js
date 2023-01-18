import React, { useState, useRef } from 'react'
import AppraisalContext from '../../contexts/AppraisalContext';
import ReactToPrint, { useReactToPrint } from "react-to-print";
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import FloatInput from "./floatInput";
import FloatTextArea from "./floatTextarea";
import "./halfYearGoal.css";
import {
    Row,
    Col,
    Button,
    Typography,
    Form,
    Divider,
    Radio,
    notification,
    Layout,
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
    const [empEditable, setEmpEditable] = useState((currentAppraisal.status === 'empPending'));
    const [mgrEditable, setMgrEditable] = useState((currentAppraisal.status === 'mgrPending' && props.hrMode == false));
    const [selectedNumber, setSelectedNumber] = useState(0);
    // const role = sessionStorage.getItem("role")


    const componentRef = useRef();
    const [active, setActive] = useState("");
    let initialProjectList = [{ projectName: '', projectDetail: '' }]
    if (mgrEditable || props.hrMode == true) {
        initialProjectList = currentAppraisal.projectList
    }

    //check Box
    const [projectList, setProjectList] = useState(initialProjectList);
    let organizationActivities = currentAppraisal.empOrganizationalCheckBox
    let personalGrowthActivities = currentAppraisal.empPersonalCheckBox


    //rating Emp
    let intEmployeeRating = currentAppraisal.empOrganisationActivitiesRating
    if (intEmployeeRating == 0 || intEmployeeRating == null) {
        intEmployeeRating = 1

    }

    let intProjectEmployeeRating = currentAppraisal.empProjectActivitiesRating
    if (intProjectEmployeeRating == 0 || intProjectEmployeeRating == null) {
        intProjectEmployeeRating = 1

    }

    let intPersonalGrowthEmployeeRating = currentAppraisal.empPersonalGrowthRating
    if (intPersonalGrowthEmployeeRating == 0 || intPersonalGrowthEmployeeRating == null) {
        intPersonalGrowthEmployeeRating = 1

    }

    //Rating Manager

    let intManagerRating = currentAppraisal.mgrProjectActivitiesRating
    if (intManagerRating == 0 || intManagerRating == null) {
        intManagerRating = 1

    }

    let intProjectManagerRating = currentAppraisal.mgrOrganisationActivitiesRating
    if (intProjectManagerRating == 0 || intProjectManagerRating == null) {
        intProjectManagerRating = 1

    }

    let intPersonalGrowthManagerRating = currentAppraisal.mgrPersonalGrowthRating
    if (intPersonalGrowthManagerRating == 0 || intPersonalGrowthManagerRating == null) {
        intPersonalGrowthManagerRating = 1

    }





    // const handlePrint = useReactToPrint({
    //     content: () => componentRef.current,
    //     documentTitle: 'Quarter Appraisal Form',
    //     onafterprint: () => alert('Print Succes')

    // });

    const onReset = () => {
        form.resetFields()
    };

    const selectNumber = numberSelected => {
        setSelectedNumber(numberSelected)
    }


    const handleClick = (event) => {
        setActive(event.target.id);

    }

    //--------------------------------------------------------------------------checkbox-1
    function onChange(checkedValues) {
        console.log("checked = ", checkedValues);
    }

    // all options, also coming from json
    const options = [
        { label: "Taking Interview,", value: "Taking Interview" },
        { label: "Refering friends", value: "Refering friends" },
        { label: " Mentoring", value: "Mentoring" },
        { label: " Walkin involvement", value: "Walkin involvement" },
        { label: " Creating knowledge repositorys", value: "Creating knowledge repositorys" },
        { label: "  Implementing best practices", value: "Implementing best practices" },
        { label: "  Others", value: "others" }
    ];

    //--------------------------------------------------------------------------checkbox-2

    // initial values (generally coming from json)
    const defaults = ["1"];

    // all options, also coming from json
    const optionsTwo = [
        { label: "Certifications,", value: "Certifications" },
        { label: " Soft skills", value: "Soft skills" },
        { label: " Interpersonal skills", value: "Interpersonal skills" },
        { label: "  learning new technical skills", value: "learning new technical skills" },
        { label: "  Others", value: "others" }

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
        let appraisalDetail = {}
        if (empEditable) {
            let projectList = []
            appraisalDetail = {
                personalGrowthDetail: values.personalGrowthDetail,
                organizationalActivitiesDetail: values.organizationalActivitiesDetail,

                //checkBox
                empOrganizationalCheckBox: values.empOrganizationalCheckBox,
                empPersonalCheckBox: values.empPersonalCheckBox,

                //rating
                empProjectActivitiesRating: values.empProjectActivitiesRating,
                empOrganisationActivitiesRating: values.empOrganisationActivitiesRating,
                empPersonalGrowthRating: values.empPersonalGrowthRating,
                projectList: projectList,

                repManager: props.appraisal.repManager,
                mailid: props.appraisal.mailid,
                fname: props.appraisal.fname,
                lname: props.appraisal.lname,

                status: 'mgrPending'


            }
            // let projectDetail = {
            //     projectDetail: values.projectDetail,
            //     projectName: values.projectName,

            // }
            // appraisalDetail.projectList.push(projectDetail)

            if (values.fields != null) {
                for (let i = 0; i < values.fields.length; i++) {
                    let n = values.fields[i]
                    console.log('appraisalGoal2', n)
                    appraisalDetail.projectList.push({
                        projectDetail: n.projectDetail,
                        projectName: n.projectName,

                    })

                }

            }


        }

        if (mgrEditable) {
            appraisalDetail = {

                status: 'completed',
                managerComment: values.managerComment,

                mgrProjectActivitiesRating: values.mgrProjectActivitiesRating,
                empOrganisationActivitiesRating: values.empOrganisationActivitiesRating,
                mgrPersonalGrowthRating: values.mgrPersonalGrowthRating,


                repManager: props.appraisal.repManager,
                mailid: props.appraisal.mailid,
                fname: props.appraisal.fname,
                lname: props.appraisal.lname,
            }
        }

        console.log('currentAppraisalhr', props.hrMode)
        console.log('currentAppraisalemp', empEditable)
        console.log('currentAppraisalmgr', mgrEditable)
        console.log('currentAppraisal', currentAppraisal.id)
        console.log('currentAppraisal', appraisalDetail)
        AppraisalContext.updateMidYearAppraisal(currentAppraisal.id, appraisalDetail)
            .then(response => {
                console.log("appraisal Form Created", response);

                if (appraisalDetail.status === 'mgrPending') {
                    AppraisalContext.sendEmailToManager(appraisalDetail)
                }

                showNotification("success", "Success", "Appraisal successfully submited");
                setEmpEditable(false)
            })
            .catch(error => {
                console.log('appraisalForm', error.message);
                showNotification("error", "Error", "Error Submiting Appraisal");

            })
        console.log('appraisalForm', 'appraisal created');

        console.log('appraisalGoal3', values.fields)
        console.log('appraisalGoal1', appraisalDetail)
    }

    return (
        <Layout classname='layout-antd' style={{ backgroundColor: 'white' }}>
            {/* <button style={{
                width: '50px', position: 'absolute',
                top: 15, right: 50
            }}
                onClick={handlePrint}>Print
            </button> */}
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
                                    Date
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
                                // projectName: currentAppraisal.projectName,
                                // contribution: currentAppraisal.employeeContribution,
                                // employeeGoal: currentAppraisal.employeeGoal,
                                // employeeStrength: currentAppraisal.employeeStrength,
                                // leadGoal: currentAppraisal.leadGoal,
                                // leadRating: currentAppraisal.leadRating,
                                // managerComments: currentAppraisal.managerComments,
                                // managerObjective: currentAppraisal.managerObjective,
                                // diversityGoal: currentAppraisal.diversityGoal,

                                // projectDetail: currentAppraisal.projectList[0].projectDetail,
                                // projectName: currentAppraisal.projectList[0].projectName,
                                fields: projectList,


                                personalGrowthDetail: currentAppraisal.personalGrowthDetail,
                                organizationalActivitiesDetail: currentAppraisal.organizationalActivitiesDetail,

                                //checkBox
                                empOrganizationalCheckBox: currentAppraisal.empOrganizationalCheckBox,
                                empPersonalCheckBox: currentAppraisal.empPersonalCheckBox,

                                //rating
                                empProjectActivitiesRating: currentAppraisal.empProjectActivitiesRating,
                                empOrganisationActivitiesRating: currentAppraisal.empOrganisationActivitiesRating,
                                empPersonalGrowthRating: currentAppraisal.empPersonalGrowthRating,

                                managerComment: currentAppraisal.managerComment,
                                mgrProjectActivitiesRating: currentAppraisal.mgrProjectActivitiesRating,
                                mgrOrganisationActivitiesRating: currentAppraisal.mgrOrganisationActivitiesRating,
                                mgrPersonalGrowthRating: currentAppraisal.mgrPersonalGrowthRating,

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
                            {/* <Form.Item name="projectName"
                            // rules={[{ required: true }]}
                            >
                                <FloatInput
                                    label="Project Name"
                                    placeholder="Project name"
                                    name="name"
                                // disabled={empEditable}
                                />
                            </Form.Item> */}

                            {/* <Form.Item name="projectDetail">
                                <FloatTextArea className='textArea-ant-two'
                                    label="Project Detail"
                                    // disabled={empEditable}

                                    // required
                                    placeholder="Project Detail" />
                            </Form.Item> */}

                            <Form.List name="fields">
                                {(fields, { add, remove }) => {
                                    return (
                                        <div >
                                            {fields.map((field, index) => (
                                                <div key={field.key} style={{ marginBottom: '10px' }}>

                                                    <Form.Item
                                                        name={[index, "projectName"]}
                                                    // disabled={empEditable}

                                                    // rules={[{ required: true }]}
                                                    >
                                                        <FloatInput
                                                            label="Project Name"
                                                            placeholder="Project name"
                                                            name="name"
                                                            disabled={!empEditable}

                                                        />
                                                    </Form.Item>

                                                    <Form.Item
                                                        name={[index, "projectDetail"]}
                                                    >
                                                        <FloatTextArea className='textArea-ant-two'
                                                            label="Project Detail"
                                                            disabled={!empEditable}


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
                                                {!mgrEditable ? (
                                                    <Button
                                                        type="primary"
                                                        className="dynamic-delete-button"
                                                        onClick={() => add()}
                                                        style={{ width: "" }}
                                                        icon={<PlusCircleOutlined />}

                                                    >

                                                    </Button>
                                                ) : null}

                                            </Form.Item>
                                        </div>
                                    );
                                }}
                            </Form.List>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <Form.Item className='rating-div'
                                        name="empProjectActivitiesRating"
                                        label="Rate YourSelf"
                                    // rules={[{ required: true }]}
                                    // disabled={empEditable}

                                    >
                                        <div>
                                            <Radio.Group disabled={!empEditable} defaultValue={intProjectEmployeeRating} buttonStyle="solid">
                                                <Radio.Button className='radio-one' style={{ marginRight: '5px' }} value="1">1</Radio.Button>
                                                <Radio.Button className='radio-one' style={{ marginRight: '5px' }} value="2">2</Radio.Button>
                                                <Radio.Button className='radio-one' style={{ marginRight: '5px' }} value="3">3</Radio.Button>
                                                <Radio.Button className='radio-one' style={{ marginRight: '5px' }} value="4">4</Radio.Button>
                                                <Radio.Button className='radio-one' style={{ marginRight: '5px' }} value="5">5</Radio.Button>
                                            </Radio.Group>

                                        </div >
                                    </Form.Item>
                                </div>

                                <div style={{ display: mgrEditable || props.hrMode ? 'flex' : 'none', flexDirection: 'column' }}>
                                    <Form.Item className='rating-div'
                                        name="mgrProjectActivitiesRating"
                                        label="Manager Rating"
                                    // rules={[{ required: true }]}
                                    // disabled={!mgrEditable}
                                    >
                                        <div >
                                            <Radio.Group defaultValue={intProjectManagerRating} buttonStyle="solid">
                                                <Radio.Button style={{ marginRight: '5px' }} value="1">1</Radio.Button>
                                                <Radio.Button style={{ marginRight: '5px' }} value="2">2</Radio.Button>
                                                <Radio.Button style={{ marginRight: '5px' }} value="3">3</Radio.Button>
                                                <Radio.Button style={{ marginRight: '5px' }} value="4">4</Radio.Button>
                                                <Radio.Button style={{ marginRight: '5px' }} value="5">5</Radio.Button>
                                            </Radio.Group>

                                        </div >
                                    </Form.Item>
                                </div>

                            </div>

                            {/* //----------------------------------------------- */}

                            <Divider>Organizational Activities: </Divider>
                            <Form.Item name="empOrganizationalCheckBox" colon={false} valuePropName="checked" initialValue={defaults}>
                                <Checkbox.Group style={{ display: 'flex', flexDirection: 'column' }}
                                    options={options}
                                    initialValues={defaults}
                                    onChange={onChange}
                                    value={organizationActivities}
                                    disabled={!empEditable}

                                />
                            </Form.Item>

                            <Form.Item name="organizationalActivitiesDetail">
                                <FloatTextArea className='textArea-ant-two'
                                    label="Give Detail"
                                    disabled={!empEditable}

                                    // required
                                    placeholder="Give Detail" />
                            </Form.Item>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <Form.Item className='rating-div'
                                        name="empOrganisationActivitiesRating"
                                        label="Rate YourSelf"
                                    // rules={[{ required: true }]}
                                    // disabled={empEditable}
                                    >

                                        <div >
                                            <Radio.Group disabled={!empEditable} defaultValue={intEmployeeRating} buttonStyle="solid">
                                                <Radio.Button style={{ marginRight: '5px' }} value="1">1</Radio.Button>
                                                <Radio.Button style={{ marginRight: '5px' }} value="2">2</Radio.Button>
                                                <Radio.Button style={{ marginRight: '5px' }} value="3">3</Radio.Button>
                                                <Radio.Button style={{ marginRight: '5px' }} value="4">4</Radio.Button>
                                                <Radio.Button style={{ marginRight: '5px' }} value="5">5</Radio.Button>
                                            </Radio.Group>

                                        </div >
                                    </Form.Item>
                                </div>

                                <div style={{ display: mgrEditable || props.hrMode ? 'flex' : 'none', flexDirection: 'column' }}>
                                    <Form.Item className='rating-div'
                                        name="mgrOrganisationActivitiesRating"
                                        label="Manager Rating"
                                    // rules={[{ required: true }]}
                                    // disabled={!mgrEditable}
                                    >

                                        <div >
                                            <Radio.Group defaultValue={intManagerRating} buttonStyle="solid">
                                                <Radio.Button style={{ marginRight: '5px' }} value="1">1</Radio.Button>
                                                <Radio.Button style={{ marginRight: '5px' }} value="2">2</Radio.Button>
                                                <Radio.Button style={{ marginRight: '5px' }} value="3">3</Radio.Button>
                                                <Radio.Button style={{ marginRight: '5px' }} value="4">4</Radio.Button>
                                                <Radio.Button style={{ marginRight: '5px' }} value="5">5</Radio.Button>
                                            </Radio.Group>


                                        </div >
                                    </Form.Item>
                                </div>

                            </div>
                            {/* //----------------------------------------------- */}
                            <Divider>Personal Growth : </Divider>

                            <Form.Item name="empPersonalCheckBox" valuePropName="checked" initialValue={defaults}>
                                <Checkbox.Group className='checkbox-field-one' style={{ display: 'flex', flexDirection: 'column' }}
                                    options={optionsTwo}
                                    initialValues={defaults}
                                    onChange={onChange}
                                    value={personalGrowthActivities}
                                    disabled={!empEditable}
                                />
                            </Form.Item>


                            <Form.Item name="personalGrowthDetail">
                                <FloatTextArea className='textArea-ant-two'
                                    label="Give Detail"
                                    disabled={!empEditable}

                                    // required
                                    placeholder="Give Detail" />
                            </Form.Item>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <Form.Item className='rating-div'
                                        name="empPersonalGrowthRating"
                                        label="Rate YourSelf"
                                    // disabled={empEditable}
                                    // rules={[{ required: true }]}
                                    >

                                        <div >
                                            <Radio.Group disabled={!empEditable} defaultValue={intPersonalGrowthEmployeeRating} buttonStyle="solid">
                                                <Radio.Button style={{ marginRight: '5px' }} value="1">1</Radio.Button>
                                                <Radio.Button style={{ marginRight: '5px' }} value="2">2</Radio.Button>
                                                <Radio.Button style={{ marginRight: '5px' }} value="3">3</Radio.Button>
                                                <Radio.Button style={{ marginRight: '5px' }} value="4">4</Radio.Button>
                                                <Radio.Button style={{ marginRight: '5px' }} value="5">5</Radio.Button>
                                            </Radio.Group>

                                        </div >
                                    </Form.Item>
                                </div>


                                <div style={{ display: mgrEditable || props.hrMode ? 'flex' : 'none', flexDirection: 'column' }}>
                                    <Form.Item className='rating-div'
                                        name="mgrPersonalGrowthRating"
                                        label="Manager Rating"
                                    // disabled={!mgrEditable}
                                    // rules={[{ required: true }]}
                                    >

                                        <div >

                                            <Radio.Group defaultValue={intPersonalGrowthManagerRating} buttonStyle="solid">
                                                <Radio.Button style={{ marginRight: '5px' }} value="1">1</Radio.Button>
                                                <Radio.Button style={{ marginRight: '5px' }} value="2">2</Radio.Button>
                                                <Radio.Button style={{ marginRight: '5px' }} value="3">3</Radio.Button>
                                                <Radio.Button style={{ marginRight: '5px' }} value="4">4</Radio.Button>
                                                <Radio.Button style={{ marginRight: '5px' }} value="5">5</Radio.Button>
                                            </Radio.Group>


                                        </div >
                                    </Form.Item>
                                </div>

                            </div>
                            {mgrEditable ? (
                                <Divider orientation='left' orientationMargin={0}>To Be Fill By Manager<span style={{ color: 'red' }}> *</span></Divider>
                            ) : null}



                            <Form.Item labelAlign="left"
                                style={{ display: mgrEditable || props.hrMode ? 'block' : 'none', marginBottom: "10px", width: '100%', }}
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

