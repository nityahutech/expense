import React, { useState } from 'react'
// import AppraisalFormContext from '../contexts/AppraisalFormContext';
import {
    Card,
    Row,
    Col,
    Input,
    Button,
    DatePicker,
    Typography,
    Form,
    Divider,
    Table,
    Space,
    notification


} from "antd";

const { TextArea } = Input;
const { Text, Link } = Typography;



const fixedColumns = [
    {
        title: "Assessment Area",
        dataIndex: "name",

        width: 140,
        fixed: "left",
    },
    {
        title: "Rating Guidance",
        dataIndex: "description"
    }
];
const fixedData = [
    {
        key: '1',
        name: 'Far Exceeds (Role Model)',
        description: 'Performance far exceeds job requirements (i.e., consistently far exceeds performance objectives)',

    },
    {
        key: '2',
        name: 'Exceeds (Exceeds Expectations)',
        description: 'Consistently meets job requirements and exceeds in most areas (i.e., achieves performance objectives and exceeds on most)'

    },
    {
        key: '3',
        name: 'Meets All (Solid Performer)',
        description: 'Consistently meets job requirements (i.e., achieves performance objectives)'

    },
    {
        key: '4',
        name: 'Meets Some (Development Needed)',
        description: 'Meets some (but not all) job requirements (i.e., achieves some but not all performance objectives)'

    },
    {
        key: '5',
        name: 'Does Not Meet (Below Expectations)',
        description: 'Performance does not consistently meet job requirements (i.e., does not achieve performance objectives)'

    },
];



const Appraisal = () => {


    const [editContent, showEditContent] = useState(false);
    const [editContactInfo, showEditContactInfo] = useState(false);
    const [form] = Form.useForm();
    const [formLayout, setFormLayout] = useState('horizontal');
    const [userRecord, setUserRecord] = useState({
        associateId: '',
        associatename: '',
        joiningdate: "",
        currentposition: "",
        evaluationperiod: "",

    });

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
        // setIsModalOpen(false);
       
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



    const onFormLayoutChange = ({ layout }) => {
        setFormLayout(layout);
        console.log(layout);

    };

    const onFieldsChangeHandler = (curr, allvalues) => {
        console.log(allvalues)
    };

    const onFinish = (values) => {
        console.log('appraisal', values);
    
        let newAppraisalForm = {
            projname: values.projname,
            traits: values.traits,
            goal: values.goal,
            strength: values.strength,
            goalnext: values.goalnext,
            rating: values.rating,
            engagment: values.engagment,           
            leaderojective: values.leaderojective,
            goalcomment: values.goalcomment,
         
    
        }
        console.log('appraisal', newAppraisalForm)
    
        // AppraisalFormContext.createAppraisal(newAppraisalForm)
            .then(response => {
                console.log("appraisal Form Created", response);
            })
            .catch(error => {
                console.log('appraisalForm', error.message);
    
            })
        console.log('appraisalForm', 'appraisal created');
        // showNotification("success", "Success", "Appraisal Form Created");
        // setQuarter('')
        // form.resetFields();
    
    };
    


    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: 'center' }}>



            <Col xl={24} lg={24} md={24} sm={24} xs={24}

                style={{
                    width: 600,
                    marginTop: 10,
                }}
            >
                <Row gutter={[16, 16]}>


                    <Col xs={{ span: 12 }}
                        lg={{ span: 8 }}>
                        <div>
                            <div style={{ fontWeight: "600", fontSize: "15px" }}>
                                Employee Id
                            </div>
                        </div>
                    </Col>

                    <Col xs={{ span: 12 }}
                        lg={{ span: 8 }}>
                        <div>
                            <div style={{ fontWeight: "600", fontSize: "15px" }}>
                                Associate Name
                            </div>

                            <Text type="secondary">Jatin </Text>
                        </div>
                    </Col>

                    <Col xs={{ span: 12 }}
                        lg={{ span: 8 }}>
                        <div>
                            <div style={{ fontWeight: "600", fontSize: "15px" }}>
                                Current Position
                            </div>

                            <Text type="secondary">Associate </Text>

                        </div>
                    </Col>

                    <Col xs={{ span: 12 }}
                        lg={{ span: 8 }}>
                        <div>
                            <div style={{ fontWeight: "600", fontSize: "15px" }}>
                                Date Of Joining
                            </div>

                            <Text type="secondary">30/09/2022 </Text>
                        </div>
                    </Col>

                    <Col xs={{ span: 12 }}
                        lg={{ span: 8 }}>
                        <div>
                            <div style={{ fontWeight: "600", fontSize: "15px" }}>
                                Quarter
                            </div>

                            <Text type="secondary">Q1 </Text>
                        </div>
                    </Col>

                    <Col xs={{ span: 12 }}
                        lg={{ span: 8 }}>
                        <div>
                            <div style={{ fontWeight: "600", fontSize: "15px" }}>
                                Reporting Manager
                            </div>


                        </div>
                    </Col>
                </Row>
            </Col>


            <Col title="Refrence Guide"
                style={{
                    width: 700,
                    marginTop: 10,
                    padding: 'px',

                }}

            >
                <Table
                    style={{
                        padding: '10px',

                    }}
                    size="small"
                    columns={fixedColumns}
                    dataSource={fixedData}
                    // bordered
                    pagination={false
                    }
                    summary={() => <Table.Summary fixed></Table.Summary>}
                />
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
                        onFinish={onFinish}
                        onFieldsChange={(changedFields, allvalues) => onFieldsChangeHandler(changedFields, allvalues)}
                        onValuesChange={onFormLayoutChange}




                    >


                        <Divider orientation='left' orientationMargin={0}>To Be Fill By Employee<span style={{ color: 'red' }}> *</span></Divider>
                        <Form.Item labelAlign="left"
                            style={{ marginBottom: "10px" }}
                       
                            name="projname"
                     

                            onKeyPress={(event) => {
                                if (checkAlphabets(event)) {
                                    event.preventDefault();
                                }
                            }}

                        >
                            <Typography.Text style={{ fontWeight: 400 }}>Project Name and Description : </Typography.Text>
                            <TextArea rows={2}
                                maxLength={10}
                                required
                                placeholder=""
                            />

                        </Form.Item>

                        <Form.Item labelAlign="left"
                            style={{ marginBottom: "10px" }}
                        
                            name="traits"
                          
                            onKeyPress={(event) => {
                                if (checkAlphabets(event)) {
                                    event.preventDefault();
                                }
                            }}

                        >
                            <Typography.Text style={{ fontWeight: 400 }}>What were your best traits or contribution to the company this quarter? </Typography.Text>
                            <TextArea rows={2}
                                maxLength={10}
                                required
                                placeholder=""
                            />
                        </Form.Item>


                        <Form.Item labelAlign="left"
                            style={{ marginBottom: "10px" }}
                       
                            name="goal"
                        
                            onKeyPress={(event) => {
                                if (checkAlphabets(event)) {
                                    event.preventDefault();
                                }
                            }}

                        >
                            <Typography.Text style={{ fontWeight: 400 }}>What are your goal for next quarter? </Typography.Text>
                            <TextArea rows={2}
                                maxLength={10}
                                required
                                placeholder=""
                            />
                        </Form.Item>

                        <Form.Item labelAlign="left"
                            style={{ marginBottom: "10px" }}
                           
                            name="strength"
                          
                            onKeyPress={(event) => {
                                if (checkAlphabets(event)) {
                                    event.preventDefault();
                                }
                            }}

                        >
                            <Typography.Text style={{ fontWeight: 400 }}> What are your Strength and Development Area? </Typography.Text>
                            <TextArea rows={2}
                                maxLength={10}
                                required
                                placeholder=""
                            />
                        </Form.Item>

                        <Divider orientation='left' orientationMargin={0}>To Be Fill By Team Lead<span style={{ color: 'red' }}> *</span></Divider>


                        <Form.Item labelAlign="left"
                            style={{ marginBottom: "10px" }}
                        
                            name="goalnext"
                      
                            onKeyPress={(event) => {
                                if (checkAlphabets(event)) {
                                    event.preventDefault();
                                }
                            }}

                        >
                            <Typography.Text style={{ fontWeight: 400 }}>Set goals and objective for upcoming assement year</Typography.Text>
                            <TextArea rows={2}
                                maxLength={10}
                                required
                                placeholder=""
                            />
                        </Form.Item>

                        <Form.Item labelAlign="left"
                            style={{ marginBottom: "10px" }}
                        
                            name="rating"
                        
                            onKeyPress={(event) => {
                                if (checkAlphabets(event)) {
                                    event.preventDefault();
                                }
                            }}

                        >
                            <Typography.Text style={{ fontWeight: 400 }}>Overall Rating</Typography.Text>
                            <TextArea rows={2}
                                maxLength={10}
                                required
                                placeholder=""
                            />
                        </Form.Item>

                        <Divider orientation='left' orientationMargin={0}>To Be Fill By Manager<span style={{ color: 'red' }}> *</span></Divider>


                        <Form.Item labelAlign="left"
                            style={{ marginBottom: "10px" }}
                          
                            name="engagment"
                           
                            onKeyPress={(event) => {
                                if (checkAlphabets(event)) {
                                    event.preventDefault();
                                }
                            }}

                        >
                            <Typography.Text style={{ fontWeight: 400 }}> Associate Engagement Comments: </Typography.Text>
                            <TextArea rows={2}
                                maxLength={10}
                                required
                                placeholder=""
                            />
                        </Form.Item>


                        <Form.Item labelAlign="left"
                            style={{ marginBottom: "10px" }}
                         
                            name="leaderojective"
                          
                            onKeyPress={(event) => {
                                if (checkAlphabets(event)) {
                                    event.preventDefault();
                                }
                            }}

                        >
                            <Typography.Text style={{ fontWeight: 400 }}>People Management/Leadership Objectives: </Typography.Text>
                            <TextArea rows={2}
                                maxLength={10}
                                required
                                placeholder=""
                            />
                        </Form.Item>


                        <Form.Item labelAlign="left"
                            style={{ marginBottom: "10px" }}
                          
                            name="goalcomment"
                         
                            onKeyPress={(event) => {
                                if (checkAlphabets(event)) {
                                    event.preventDefault();
                                }
                            }}

                        >
                            <Typography.Text style={{ fontWeight: 400 }}>Diversity Goals Comments (if applicable):</Typography.Text>
                            <TextArea rows={2}
                                maxLength={10}
                                required
                                placeholder=""
                            />
                        </Form.Item>

                        <Col span={30}>

                            <Form.Item >
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


        </div>
    )
}

export default Appraisal

