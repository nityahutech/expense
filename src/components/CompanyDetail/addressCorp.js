import React, { useState, useEffect } from "react";
import { Card, Row, Col, Button, Select, Input, Form } from "antd";
import { useAuth } from "../../contexts/AuthContext";
import CompanyProContext from "../../contexts/CompanyProContext";
import { CloseOutlined, EditFilled, PlusCircleOutlined } from "@ant-design/icons";
const { Option } = Select;
const { TextArea } = Input;

function AddressCorp() {
    const [editCorpAddress, showEditCorpAddress] = useState(false);
    const [editcorpInfo, showEditcorpInfo] = useState(false);
    const [data, setData] = useState([]);
    const { currentUser } = useAuth();

    const onFinish = (value) => {
        const valueToservice = {
            addLine1: value.address1,
            addLine2: value.address2,
            city: value.city,
            state: value.state,
            country:value.country,
            pincode:value.pin
          
        }
        CompanyProContext.updateCompInfo("compId001",{corpOffice:valueToservice});
        getData();
        showEditCorpAddress(false);
      };
      useEffect(() => {
        getData();
        }, []);
        const getData = async () => {
          let data = await CompanyProContext.getCompanyProfile("compId001");
          setData(data);
        };
        console.log(data)

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
                 onFinish={onFinish}
                >
                    <Card
                        title="CORPORATE OFFICE"
                        extra={
                            <>
                                {editCorpAddress === false ? (
                                    <Button
                                        type="text"
                                        style={{ color: "#4ec0f1" }}
                                        onClick={() => showEditCorpAddress(!editCorpAddress)}
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
                        {/* {editcorpInfo === true ? ( */}
                            <Row gutter={[16, 16]}>
                                <Col span={24}>
                                    <div>
                                        <div className='div-discription'>
                                            Address Line 1
                                        </div>
                                        {editCorpAddress === false ? (
                                            <div>{data.corpOffice ? data.corpOffice.addLine1 : null}
                                            </div>
                                        ) : (
                                            <Form.Item
                                                initialValue={data.corpOffice ? data.corpOffice.addLine1 : null}
                                                name="address1"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Enter Address",
                                                        type: "text",
                                                    }
                                                ]}
                                            >
                                                <Input style={{ paddingLeft: '0px' }} required placeholder="" />

                                            </Form.Item>
                                        )}
                                    </div>
                                </Col>
                            </Row>
                        {/* ) : null} */}

                        {/* {editcorpInfo === true ? ( */}
                            <Row gutter={[16, 16]} style={{ marginTop: "5%" }}>
                                <Col span={24}>
                                    <div>
                                        <div className='div-discription'>
                                            Address Line 2
                                        </div>
                                        {editCorpAddress === false ? (
                                            <div>{data.corpOffice ? data.corpOffice.addLine2 : null}
                                            </div>
                                        ) : (
                                            <Form.Item
                                                initialValue={data.corpOffice ? data.corpOffice.addLine2 : null}
                                                name="address2"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Enter Address ",
                                                        type: "text",
                                                    }
                                                ]}
                                            >
                                                <Input style={{ paddingLeft: '0px' }} required placeholder="" />

                                            </Form.Item>
                                        )}
                                    </div>
                                </Col>
                            </Row>
                        {/* ) : null} */}

                         {/* {editcorpInfo === true ? (  */}
                            <Row gutter={[16, 16]} style={{ marginTop: "5%" }}>
                                <Col span={6}>
                                    <div>
                                        <div className='div-discription'>
                                            City
                                        </div>
                                        {editCorpAddress === false ? (
                                            <div>{data.corpOffice ? data.corpOffice.city : null}
                                            </div>
                                        ) : (
                                            <Form.Item style={{ width: '100%' }}
                                                initialValue={data.corpOffice ? data.corpOffice.city : null}
                                                name="city"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Enter City ",

                                                    },
                                                    {
                                                        pattern: /^[a-zA-Z\s]*$/,
                                                        message: "Enter Valid City ",
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
                                        {editCorpAddress === false ? (
                                            <div>{data.corpOffice ? data.corpOffice.state : null}
                                            </div>
                                        ) : (
                                            <Form.Item style={{ width: '100%' }}
                                                initialValue={data.corpOffice ? data.corpOffice.state : null}
                                                name="state"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Enter State ",
                                                        type: "text",
                                                    },
                                                    {
                                                        pattern: /^[a-zA-Z\s]*$/,
                                                        message: "Enter Valid State ",
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
                                        {editCorpAddress === false ? (
                                            <div>{data.corpOffice ? data.corpOffice.country : null}
                                            </div>
                                        ) : (
                                            <Form.Item
                                                initialValue={data.corpOffice ? data.corpOffice.country : null}
                                                name="country"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Enter Country ",
                                                        type: "text",
                                                    },
                                                    {
                                                        pattern: /^[a-zA-Z\s]*$/,
                                                        message: "Enter Valid Country ",
                                                    },
                                                ]}
                                            >
                                                <Input style={{ paddingLeft: '0px' }} required placeholder="" />

                                            </Form.Item>
                                        )}
                                    </div>
                                </Col>
                                <Col span={6}>
                                    <div>
                                        <div className='div-discription'>
                                            Pin Code
                                        </div>
                                        {editCorpAddress === false ? (
                                            <div>{data.corpOffice ? data.corpOffice.pincode : null}
                                            </div>
                                        ) : (
                                            <Form.Item
                                                initialValue={data.corpOffice ? data.corpOffice.pincode : null}
                                                name="pin"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Enter Pin",
                                                        type: "text",
                                                    },
                                                    {
                                                        pattern: /^[0-9\b]+$/,
                                                        message: "Enter Valid Pin",
                                                    },
                                                ]}
                                            >
                                                <Input style={{ paddingLeft: '0px' }}  required placeholder="" />

                                            </Form.Item>
                                        )}
                                    </div>
                                </Col>

                            </Row>
                        {/* ) : null} */}

                        {editCorpAddress === true ? (
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
                                    onClick={() => showEditCorpAddress(false)}
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

                        {/* {editContactInfo == false &&
                            <Button type="primary" style={{ marginLeft: "10px" }}
                                onClick={() => showEditContactInfo(!editContactInfo)}
                            >
                                <PlusCircleOutlined />
                                Add

                            </Button>
                        } */}
                    </Card>
                </Form>
            </div>
        </>
    );
}
export default AddressCorp;
