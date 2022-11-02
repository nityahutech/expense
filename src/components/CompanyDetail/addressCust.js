import React, { useState, useEffect } from "react";
import { Card, Row, Col, Button, Select, Input, Form } from "antd";
import { useAuth } from "../../contexts/AuthContext";
import { CloseOutlined, EditFilled, PlusCircleOutlined } from "@ant-design/icons";
const { Option } = Select;
const { TextArea } = Input;

function AddressCust() {
    const [editContent, showEditContent] = useState(false);
    const [editContactInfo, showEditContactInfo] = useState(false);
    const [data, setData] = useState([]);
    const { currentUser } = useAuth();

    return (
        <>
            <div
                className="personalCardDiv"
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Form
                    // form={form}
                    labelcol={{
                        span: 4,
                    }}
                    wrappercol={{
                        span: 14,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    autoComplete="off"
                // onFinish={onContactFinish}
                >
                    <Card
                        title=" CUSTOM ADDRESS TITLE"
                        extra={
                            <>
                                {editContactInfo === false ? (
                                    <Button
                                        type="text"
                                        style={{ color: "#4ec0f1" }}
                                        onClick={() => showEditContactInfo(!editContactInfo)}
                                    >
                                        <EditFilled />
                                    </Button>
                                ) : null}
                            </>
                        }
                        style={{
                            width: 800,
                            marginTop: 10,
                        }}
                    >
                        {editContactInfo === true ? (
                            <Row gutter={[16, 16]}>
                                <Col span={24}>
                                    <div>
                                        <div className='div-discription'>
                                            Address Line 1
                                        </div>
                                        {editContactInfo === false ? (
                                            <div>{data.mailid ? data.mailid : ""}
                                            </div>
                                        ) : (
                                            <Form.Item
                                                initialValue={data ? data.mailid : null}
                                                name="Address1"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Please enter Address",
                                                        type: "text",
                                                    },
                                                    {
                                                        message: "Please enter Valid Address ",
                                                    },
                                                ]}
                                            >
                                                <Input style={{ paddingLeft: '0px' }} type='AddressName' required placeholder="" />

                                            </Form.Item>
                                        )}
                                    </div>
                                </Col>
                            </Row>
                        ) : null}

                        {editContactInfo === true ? (
                            <Row gutter={[16, 16]} style={{ marginTop: "5%" }}>
                                <Col span={24}>
                                    <div>
                                        <div className='div-discription'>
                                            Address Line 2
                                        </div>
                                        {editContactInfo === false ? (
                                            <div>{data.mailid ? data.mailid : ""}
                                            </div>
                                        ) : (
                                            <Form.Item
                                                initialValue={data ? data.mailid : null}
                                                name="mailid"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Please enter Address Name",
                                                        type: "text",
                                                    },
                                                    {
                                                        message: "Please enter Valid Address Name",
                                                    },
                                                ]}
                                            >
                                                <Input style={{ paddingLeft: '0px' }} type='AddressName2' required placeholder="" />

                                            </Form.Item>
                                        )}
                                    </div>
                                </Col>
                            </Row>
                        ) : null}

                        {editContactInfo === true ? (
                            <Row gutter={[16, 16]} style={{ marginTop: "5%" }}>
                                <Col span={6}>
                                    <div>
                                        <div className='div-discription'>
                                            City
                                        </div>
                                        {editContactInfo === false ? (
                                            <div>{data.mailid ? data.mailid : ""}
                                            </div>
                                        ) : (
                                            <Form.Item style={{ width: '100%' }}
                                                initialValue={data ? data.mailid : null}
                                                name="City"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Please enter City ",
                                                        type: "text",
                                                    },
                                                    {
                                                        message: "Please enter Valid City ",
                                                    },
                                                ]}
                                            >
                                                <Input style={{ paddingLeft: '0px' }} type='City' required placeholder="" />

                                            </Form.Item>
                                        )}
                                    </div>
                                </Col>
                                <Col span={6}>
                                    <div>
                                        <div className='div-discription'>
                                            State
                                        </div>
                                        {editContactInfo === false ? (
                                            <div>{data.mailid ? data.mailid : ""}
                                            </div>
                                        ) : (
                                            <Form.Item style={{ width: '100%' }}
                                                initialValue={data ? data.mailid : null}
                                                name="State"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Please enter State ",
                                                        type: "text",
                                                    },
                                                    {
                                                        message: "Please enter Valid State ",
                                                    },
                                                ]}
                                            >
                                                <Input style={{ paddingLeft: '0px' }} type='State' required placeholder="" />

                                            </Form.Item>
                                        )}
                                    </div>
                                </Col>
                                <Col span={6}>
                                    <div>
                                        <div className='div-discription'>
                                            Country
                                        </div>
                                        {editContactInfo === false ? (
                                            <div>{data.mailid ? data.mailid : ""}
                                            </div>
                                        ) : (
                                            <Form.Item
                                                initialValue={data ? data.mailid : null}
                                                name="Country"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Please enter Country",
                                                        type: "text",
                                                    },
                                                    {
                                                        message: "Please enter Valid Country",
                                                    },
                                                ]}
                                            >
                                                <Input style={{ paddingLeft: '0px' }} type='Country' required placeholder="" />

                                            </Form.Item>
                                        )}
                                    </div>
                                </Col>
                                <Col span={6}>
                                    <div>
                                        <div className='div-discription'>
                                            Pin Code
                                        </div>
                                        {editContactInfo === false ? (
                                            <div>{data.mailid ? data.mailid : ""}
                                            </div>
                                        ) : (
                                            <Form.Item
                                                initialValue={data ? data.mailid : null}
                                                name="Pin"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Please enter Pin",
                                                        type: "text",
                                                    },
                                                    {
                                                        message: "Please enter Valid Pin",
                                                    },
                                                ]}
                                            >
                                                <Input style={{ paddingLeft: '0px' }} type='Pin' required placeholder="" />

                                            </Form.Item>
                                        )}
                                    </div>
                                </Col>

                            </Row>
                        ) : null}

                        {editContactInfo === true ? (
                            <Row
                                style={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    marginTop: "3%",
                                }}
                            >
                                <Button
                                    type="text"
                                    style={{ fontSize: 15 }}
                                    onClick={() => showEditContactInfo(false)}
                                >
                                    <CloseOutlined /> CANCEL
                                </Button>
                                <Col>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        style={{ marginLeft: "10px" }}
                                    >
                                        SAVE
                                    </Button>
                                </Col>
                            </Row>
                        ) : null}
                        {editContactInfo == false &&
                            <Button type="primary" style={{ marginLeft: "10px" }}
                                onClick={() => showEditContactInfo(!editContactInfo)}
                            >
                                <PlusCircleOutlined />
                                Add

                            </Button>
                        }
                    </Card>
                </Form>
            </div>
        </>
    );
}
export default AddressCust;
