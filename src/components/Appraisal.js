import React, { useState } from 'react'
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
    Space

} from "antd";
import { Progress } from 'antd';
const { TextArea } = Input;
const { Text, Link } = Typography;

const fixedColumns = [
    {
        title: "Assessment Area",
        dataIndex: "name",
        fixed: true,
        width: 300,


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
        description: 'Performance far exceeds job requirements (i.e., consistently far exceeds performance objectives)'

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
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: 'center' }}>

            <Card
                title="Staff Performance Appraisal Form"

                style={{
                    width: 800,
                    marginTop: 10,
                }}
            >
                <Row gutter={[16, 16]}>

                    <Col span={6}>
                        <div>
                            <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                                Associate Name
                            </div>

                            <Text type="secondary">Jatin </Text>
                        </div>
                    </Col>

                    <Col span={6}>
                        <div>
                            <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                                Employee Id
                            </div>



                        </div>
                    </Col>

                    <Col span={6}>
                        <div>
                            <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                                Current Position
                            </div>

                            <Text type="secondary">Associate </Text>

                        </div>
                    </Col>

                    <Col span={6}>
                        <div>
                            <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                                Date Of Joining
                            </div>

                            <Text type="secondary">30/09/2022 </Text>
                        </div>
                    </Col>

                    <Col span={6}>
                        <div>
                            <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                                Quarter
                            </div>

                            <Text type="secondary">Q1-Q2 </Text>
                        </div>
                    </Col>

                    <Col span={18}>
                        <div>
                            <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                                Status
                            </div>

                            <div
                                style={{
                                    width: 250,
                                }}
                            >
                                {/* <Progress percent={100} size="small" /> */}
                            </div>
                        </div>
                    </Col>
                </Row>
            </Card>



            <Card title="Refrence Guide"

                style={{
                    width: 800,
                    marginTop: 10,
                    padding: '5px',

                }}

            >
                <Table
                    style={{
                        padding: '5px',

                    }}
                    columns={fixedColumns}
                    dataSource={fixedData}
                    bordered
                    pagination={false
                    }
                    summary={() => <Table.Summary fixed></Table.Summary>}
                />
            </Card>



            <Card

                style={{
                    width: 800,
                    marginTop: 10,
                    padding: '5px',

                }}

            >
                <Col span={24}>
                    <div>
                        <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                            What were your best traits or contribution to the company this quarter?
                        </div>
                        <Form.Item
                            className="numder-inputs"
                            name="phonenumber"
                            rules={[
                                {
                                    required: true,
                                    message: "",
                                    // pattern: /^[0-9\b]+$/,
                                },
                                { whitespace: true },
                            ]}
                        >
                            <TextArea rows={4}
                                maxLength={10}
                                required
                                placeholder=""
                            />
                        </Form.Item>

                    </div>
                </Col>
            </Card>

            <Card

                style={{
                    width: 800,
                    marginTop: 10,
                    padding: '5px',

                }}

            >
                <Col span={24}>
                    <div>
                        <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                            What are your goal for next quarter?
                        </div>
                        <Form.Item
                            className="numder-inputs"
                            name="phonenumber"
                            rules={[
                                {
                                    required: true,
                                    message: "",
                                    // pattern: /^[0-9\b]+$/,
                                },
                                { whitespace: true },
                            ]}
                        >
                            <TextArea rows={4}
                                maxLength={10}
                                required
                                placeholder=""
                            />
                        </Form.Item>

                    </div>
                </Col>
            </Card>

            <Card

                style={{
                    width: 800,
                    marginTop: 10,
                    padding: '5px',

                }}

            >
                <Col span={24}>
                    <div>
                        <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                            What help do you need from the management?
                        </div>
                        <Form.Item
                            className="numder-inputs"
                            name="phonenumber"
                            rules={[
                                {
                                    required: true,
                                    message: "",
                                    // pattern: /^[0-9\b]+$/,
                                },
                                { whitespace: true },
                            ]}
                        >
                            <TextArea rows={4}
                                maxLength={10}
                                required
                                placeholder=""
                            />
                        </Form.Item>

                    </div>
                </Col>
            </Card>

            <Card

                style={{
                    width: 800,
                    marginTop: 10,
                    padding: '5px',

                }}

            >
                <Col span={24}>
                    <div>
                        <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                            What are your Strength and Development Area?
                        </div>
                        <Form.Item
                            className="numder-inputs"
                            name="phonenumber"
                            rules={[
                                {
                                    required: true,
                                    message: "",
                                    // pattern: /^[0-9\b]+$/,
                                },
                                { whitespace: true },
                            ]}
                        >
                            <TextArea rows={4}
                                maxLength={10}
                                required
                                placeholder=""
                            />
                        </Form.Item>

                    </div>
                </Col>
            </Card>

            <Space>
                <Form.Item className='submit'>
                   
                      
                        <Button   style={{
                           
                            marginTop: '10px',
                          
                        }} type="primary">Submit Form</Button>
                   
                </Form.Item>
                
            </Space>




        </div>
    )
}

export default Appraisal

