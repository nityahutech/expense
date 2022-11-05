import React, { useState, useEffect } from "react";
import { Card, Row, Col, Button, Select, Input, Form } from "antd";
import { useAuth } from "../../contexts/AuthContext";
import CompanyProContext from "../../contexts/CompanyProContext";
import { CloseOutlined, EditFilled, PlusCircleOutlined } from "@ant-design/icons";
const { Option } = Select;
const { TextArea } = Input;

function AddressCust() {
    const [editAddressContent, showEditAddressContent] = useState(false);
    const [editContactInfo, showEditContactInfo] = useState(false);
    const [data, setData] = useState();
    const { currentUser } = useAuth();
    const onFinish = (values) => {
        const valuesToservice = {
            addressTitle:values.addresstitle,
            addLine1: values.address1,
            addLine2: values.address2,
            city: values.city,
            state: values.state,
            country:values.country,
            pincode:values.pin
          
        }
        CompanyProContext.updateCompInfo("compId001",{custOffice:valuesToservice});
        getData();
        showEditAddressContent(false);
      };
      useEffect(() => {
        getData();
        }, []);
        const getData = async () => {
          let data = await CompanyProContext.getCompanyProfile("compId001");
          setData(data);
          
        };

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
                        title=" CUSTOM ADDRESS TITLE"
                        extra={
                            <>
                                {editContactInfo === false ? (
                                    <Button
                                        type="text"
                                        style={{ color: "#4ec0f1" }}
                                        onClick={() => showEditAddressContent(!editAddressContent)}
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
                        {/* {editContactInfo === true ? ( */}
                            <Row gutter={[16, 16]}>
                                <Col span={24}>
                                    <div>
                                        <div className='div-discription'>
                                            Address Title
                                        </div>
                                        {editAddressContent === false ? (
                                            <div>{data ? data.custOffice.addressTitle : null}
                                            </div>
                                        ) : (
                                            <Form.Item
                                                initialValue={data ? data.custOffice.addressTitle : null}
                                                name="addresstitle"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Enter Address Title",
                                                        type: "text",
                                                    },
                                                    {
                                                        message: "Enter Valid Address Title ",
                                                    },
                                                ]}
                                            >
                                                <Input style={{ paddingLeft: '0px' }} required placeholder="" />

                                            </Form.Item>
                                        )}
                                    </div>
                                </Col>
                            </Row>
                        {/* ) : null} */}
                        {/* {editContactInfo === true ? ( */}
                            <Row gutter={[16, 16]} style={{ marginTop: "5%" }}>
                                <Col span={24}>
                                    <div>
                                        <div className='div-discription'>
                                            Address Line 1
                                        </div>
                                        {editAddressContent === false ? (
                                            <div>{data ? data.custOffice.addLine1 : null}
                                            </div>
                                        ) : (
                                            <Form.Item
                                                initialValue={data ? data.addLine1 : null}
                                                name="address1"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Enter Address",
                                                        type: "text",
                                                    },
                                                    {
                                                        message: "Enter Valid Address ",
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

                        {/* {editContactInfo === true ? ( */}
                            <Row gutter={[16, 16]} style={{ marginTop: "5%" }}>
                                <Col span={24}>
                                    <div>
                                        <div className='div-discription'>
                                            Address Line 2
                                        </div>
                                        {editAddressContent === false ? (
                                            <div>{data ? data.custOffice.addLine2 : null}
                                            </div>
                                        ) : (
                                            <Form.Item
                                                initialValue={data ? data.custOffice.addLine2 : null}
                                                name="address2"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Enter Address Name",
                                                        type: "text",
                                                    },
                                                    {
                                                        message: "Enter Valid Address Name",
                                                    },
                                                ]}
                                            >
                                                <Input style={{ paddingLeft: '0px' }} required placeholder="" />

                                            </Form.Item>
                                        )}
                                    </div>
                                </Col>
                            </Row>
                        {/* ) : null} */}

                        {/* {editContactInfo === true ? ( */}
                            <Row gutter={[16, 16]} style={{ marginTop: "5%" }}>
                                <Col span={6}>
                                    <div>
                                        <div className='div-discription'>
                                            City
                                        </div>
                                        {editAddressContent === false ? (
                                            <div>{data ? data.custOffice.city : null}
                                            </div>
                                        ) : (
                                            <Form.Item style={{ width: '100%' }}
                                                initialValue={data ? data.custOffice.city : null}
                                                name="city"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Enter City ",
                                                        type: "text",
                                                    },
                                                    {
                                                        message: "Enter Valid City ",
                                                    },
                                                ]}
                                            >
                                                <Input style={{ paddingLeft: '0px' }}  required placeholder="" />

                                            </Form.Item>
                                        )}
                                    </div>
                                </Col>
                                <Col span={6}>
                                    <div>
                                        <div className='div-discription'>
                                            State
                                        </div>
                                        {editAddressContent === false ? (
                                            <div>{data ? data.custOffice.state : null}
                                            </div>
                                        ) : (
                                            <Form.Item style={{ width: '100%' }}
                                                initialValue={data ? data.custOffice.state : null}
                                                name="state"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Enter State ",
                                                        type: "text",
                                                    },
                                                    {
                                                        message: "Enter Valid State ",
                                                    },
                                                ]}
                                            >
                                                <Input style={{ paddingLeft: '0px' }}  required placeholder="" />

                                            </Form.Item>
                                        )}
                                    </div>
                                </Col>
                                <Col span={6}>
                                    <div>
                                        <div className='div-discription'>
                                            Country
                                        </div>
                                        {editAddressContent === false ? (
                                            <div>{data ? data.custOffice.country : null}
                                            </div>
                                        ) : (
                                            <Form.Item
                                                initialValue={data ? data.custOffice.country : null}
                                                name="country"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Enter Country",
                                                        type: "text",
                                                    },
                                                    {
                                                        message: "Enter Valid Country",
                                                    },
                                                ]}
                                            >
                                                <Input style={{ paddingLeft: '0px' }}  required placeholder="" />

                                            </Form.Item>
                                        )}
                                    </div>
                                </Col>
                                <Col span={6}>
                                    <div>
                                        <div className='div-discription'>
                                            Pin Code
                                        </div>
                                        {editAddressContent === false ? (
                                            <div>{data ? data.custOffice.pincode : null}
                                            </div>
                                        ) : (
                                            <Form.Item
                                                initialValue={data ? data.custOffice.pincode : null}
                                                name="pin"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Enter Pin",
                                                        type: "text",
                                                    },
                                                    {
                                                        message: "Enter Valid Pin",
                                                    },
                                                ]}
                                            >
                                                <Input style={{ paddingLeft: '0px' }} required placeholder="" />

                                            </Form.Item>
                                        )}
                                    </div>
                                </Col>

                            </Row>
                        {/* ) : null} */}

                        {editAddressContent === true ? (
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
                                    onClick={() => showEditAddressContent(false)}
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
                                onClick={() => showEditAddressContent(!editAddressContent)}
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
