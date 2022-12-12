import { useState, useEffect } from "react";
import { Card, Row, Col, Button, Input, Form } from "antd";
import CompanyProContext from "../../contexts/CompanyProContext";
import { CloseOutlined, EditFilled ,CheckOutlined } from "@ant-design/icons";
import "../../components/CompanyDetail/companystyle.css";

function AddressCorp() {
    const [editCorpAddress, showEditCorpAddress] = useState(false);
    const [data, setData] = useState([]);
    const compId = sessionStorage.getItem("compId")

    const onFinish = (value) => {
        const valueToservice = {
            addLine1: value.address1,
            addLine2: value.address2,
            city: value.city,
            state: value.state,
            country: value.country,
            pincode: value.pin
        }
        CompanyProContext.updateCompInfo(compId, { corpOffice: valueToservice });
        getData();
        showEditCorpAddress(false);
    };

    useEffect(() => {
        getData();
    }, []);
    
    const getData = async () => {
        let data = await CompanyProContext.getCompanyProfile(compId);
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
                <Row
                    className="Row-Card"
                    style={{
                        width: '75%',
                        margin: '10px',
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                    <Col span={24}>
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
                                className="corpcard"
                                bordered={true}
                                hoverable={true}
                                extra={
                                    <>
                                     {editCorpAddress === false ? (
                                                <Button
                                                    type="text"
                                                    className="edit"
                                                    style={{
                                                        color: "#ffff",
                                                        display: "none",
                                                        paddingTop: "7px",
                                                        paddingRight: "7px",
                                                        position: "absolute",
                                                        right: 10,
                                                        top: 10,
                                                    }}
                                                    onClick={() => showEditCorpAddress(!editCorpAddress)}
                                                >
                                                    <EditFilled />
                                                </Button>
                                      ) : null}
                                    </>
                                }
                                style={{
                                    width: '100%',
                                    marginTop: 10,
                                    borderRadius:"10px",
                                    cursor:"default"
                                }}
                            >                     
                                

                                {editCorpAddress === true ? (
                                    <>
                                      <Row gutter={[16,16]}>
                                        <Col span={24}>
                                          <Form.Item
                                            initialValue={data ? data.corpOffice.addLine1 : null}
                                            name="address1"
                                            rules={[
                                                {
                                                required: true,
                                                message: "Enter Address",
                                                type: "text",
                                                },
                                            ]}
                                            >
                                            <Input
                                                style={{
                                                width: "100%",
                                                borderBottom: "1px solid #ccc ",
                                                paddingLeft: "0px",
                                                }}
                                                bordered={false}
                                                required
                                                placeholder="Address Line 1"
                                                maxLength={100}
                                            />
                                          </Form.Item> 
                                        </Col>
                                        <Col span={24}>
                                          <Form.Item
                                              initialValue={data ? data.corpOffice.addLine2 : null}
                                              name="address2"
                                              rules={[
                                                      {
                                                        required: true,
                                                        message: "Enter Address ",
                                                        type: "text",
                                                      }
                                                    ]}
                                                >
                                                    <Input style={{
                                                        width: '100%',
                                                        borderBottom: '1px solid #ccc ',
                                                        paddingLeft: '0px',
                                                    }}
                                                        bordered={false} 
                                                        required 
                                                        placeholder="Address Line 2"
                                                        maxLength={100} />

                                          </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={6}>
                                         <Form.Item 
                                            style={{ width: '100%' }}
                                            initialValue={data ? data.corpOffice.city : null}
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
                                                    <Input 
                                                        style={{
                                                        width: '100%',
                                                        borderBottom: '1px solid #ccc ',
                                                        paddingLeft: '0px',
                                                         }}
                                                        bordered={false} 
                                                        type='City' 
                                                        required 
                                                        placeholder="City"
                                                        maxLength={85} />

                                         </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={6}>
                                         <Form.Item 
                                            style={{ width: '100%' }}
                                            initialValue={data ? data.corpOffice.state : null}
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
                                                    <Input style={{
                                                        width: '100%',
                                                        borderBottom: '1px solid #ccc ',
                                                        paddingLeft: '0px',
                                                    }}
                                                        bordered={false} 
                                                        type='State' 
                                                        required 
                                                        placeholder="State"
                                                        maxLength={40} />

                                         </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={6}>
                                          <Form.Item
                                            initialValue={data ? data.corpOffice.country : null}
                                            name="country"
                                             rules={[
                                                        {
                                                            required: true,
                                                            message: "Enter Country ",
                                                            type: "text",
                                                        },
                                                        {
                                                            pattern: /^[a-zA-Z\b]*$/,
                                                            message: "Enter Valid Country ",
                                                        },
                                                    ]}
                                                >
                                                    <Input 
                                                    style={{
                                                        width: '100%',
                                                        borderBottom: '1px solid #ccc ',
                                                        paddingLeft: '0px',
                                                    }}
                                                        bordered={false} 
                                                        required 
                                                        placeholder="Country"
                                                        maxLength={60} />

                                          </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={6}>
                                          <Form.Item
                                            initialValue={data ? data.corpOffice.pincode : null}
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
                                                    <Input style={{
                                                        width: '100%',
                                                        borderBottom: '1px solid #ccc ',
                                                        paddingLeft: '0px',
                                                    }}
                                                        bordered={false} 
                                                        required 
                                                        placeholder="Pincode"
                                                        maxLength={6} />

                                          </Form.Item>
                                        </Col>
                                      </Row>
                                    </>
                                ):(
                                    <>
                                      <Row span={[16,16]}>
                                        <Col span={24}>{data ? data.corpOffice?.addLine1 : null},</Col>
                                        <Col span={24}>{data ? data.corpOffice?.addLine2 : null},</Col>
                                        <span>
                                           { `${data ? data.corpOffice?.city : null},
                                            ${data ? data.corpOffice?.state : null},
                                            ${data ? data.corpOffice?.country : null} -
                                            ${data ? data.corpOffice?.pincode : null}`}
                                        </span>
                                      </Row>
                                    </>
                                )}

                                {editCorpAddress === true ? (
                                    <Row gutter={[16,16]}
                                        style={{
                                            display: "flex",
                                            justifyContent: "flex-end",
                                            marginTop: "3%",
                                        }}
                                    >
                                        <Col xs={24} sm={8} md={7} lg={6} xl={4} xxl={2}>
                                        <Button
                                            type="text"
                                            style={{
                                                fontSize: 15 }}
                                            onClick={() => showEditCorpAddress(false)}
                                        >
                                            <CloseOutlined /> CANCEL
                                        </Button>
                                        </Col>
                                        <Col xs={24} sm={8} md={7} lg={6} xl={4} xxl={2}>
                                            <Button
                                                // type="primary"
                                                htmlType="submit"
                                                style={{ 
                                                    fontSize: 15,
                                                    backgroundColor:"#1963A6",
                                                    borderColor:"#1963A6",
                                                    width:"119px",
                                                    color:"#ffff"
                                                }}
                                            >
                                               <CheckOutlined /> SAVE
                                            </Button>
                                        </Col>
                                    </Row>
                                ) : null}
                            </Card>
                        </Form>
                    </Col>
                </Row>
            </div>
        </>
    );
}
export default AddressCorp;
