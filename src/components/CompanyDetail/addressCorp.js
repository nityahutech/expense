import React, { useState, useEffect } from "react";
import { Card, Row, Col, Button, Select, Input, Form } from "antd";
import { useAuth } from "../../contexts/AuthContext";
import CompanyProContext from "../../contexts/CompanyProContext";
import { CloseOutlined, EditFilled, PlusCircleOutlined } from "@ant-design/icons";
const { Option } = Select;
const { TextArea } = Input;

function AddressCorp() {
    const [editCropAddress, showEditCropAddress] = useState(false);
    const [editCropInfo, showEditCropInfo] = useState(false);
    const [data, setData] = useState([]);
    const { currentUser } = useAuth();

    const onFinish = (value) => {
        const valueToservice = {
            addLine1: value.address,
            addLine2: value.address1,
            city: value.city,
            state: value.state,
            country:value.country,
            pincode:value.pin
          
        }
        CompanyProContext.updateCompInfo("compId001",{cropOffice:valueToservice});
        getData();
        showEditCropAddress(false);
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
                        title=" CORPORATE OFFICE"
                        extra={
                            <>
                                {editCropInfo === false ? (
                                    <Button
                                        type="text"
                                        style={{ color: "#4ec0f1" }}
                                        onClick={() => showEditCropInfo(!editCropInfo)}
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
                        {editCropInfo === true ? (
                            <Row gutter={[16, 16]}>
                                <Col span={24}>
                                    <div>
                                        <div className='div-discription'>
                                            Address Line 1
                                        </div>
                                        {editCropInfo === false ? (
                                            <div>{data.cropOffice.address1}
                                            </div>
                                        ) : (
                                            <Form.Item
                                                initialValue={data ? data.address1 : null}
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
                                                <Input style={{ paddingLeft: '0px' }} required placeholder="" />

                                            </Form.Item>
                                        )}
                                    </div>
                                </Col>
                            </Row>
                        ) : null}

                        {editCropInfo === true ? (
                            <Row gutter={[16, 16]} style={{ marginTop: "5%" }}>
                                <Col span={24}>
                                    <div>
                                        <div className='div-discription'>
                                            Address Line 2
                                        </div>
                                        {editCropInfo === false ? (
                                            <div>{data.cropOffice.address2}
                                            </div>
                                        ) : (
                                            <Form.Item
                                                initialValue={data ? data.address2 : null}
                                                name="address2"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Enter Address ",
                                                        type: "text",
                                                    },
                                                    {
                                                        message: "Enter Valid Address ",
                                                    },
                                                ]}
                                            >
                                                <Input style={{ paddingLeft: '0px' }} required placeholder="" />

                                            </Form.Item>
                                        )}
                                    </div>
                                </Col>
                            </Row>
                        ) : null}

                        {editCropInfo === true ? (
                            <Row gutter={[16, 16]} style={{ marginTop: "5%" }}>
                                <Col span={6}>
                                    <div>
                                        <div className='div-discription'>
                                            City
                                        </div>
                                        {editCropInfo === false ? (
                                            <div>{data.cropOffice.city}
                                            </div>
                                        ) : (
                                            <Form.Item style={{ width: '100%' }}
                                                initialValue={data ? data.city : null}
                                                name="city"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Enter City ",

                                                    },
                                                    {
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
                                        {editCropInfo === false ? (
                                            <div>{data.cropOffice.state}
                                            </div>
                                        ) : (
                                            <Form.Item style={{ width: '100%' }}
                                                initialValue={data ? data.state : null}
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
                                        {editCropInfo === false ? (
                                            <div>{data.cropOffice.country}
                                            </div>
                                        ) : (
                                            <Form.Item
                                                initialValue={data ? data.country : null}
                                                name="country"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Enter Country ",
                                                        type: "text",
                                                    },
                                                    {
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
                                        {editCropInfo === false ? (
                                            <div>{data.cropOffice.pin}
                                            </div>
                                        ) : (
                                            <Form.Item
                                                initialValue={data ? data.pin : null}
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
                                                <Input style={{ paddingLeft: '0px' }}  required placeholder="" />

                                            </Form.Item>
                                        )}
                                    </div>
                                </Col>

                            </Row>
                        ) : null}

                        {editCropInfo === true ? (
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
                                    onClick={() => showEditCropInfo(false)}
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
