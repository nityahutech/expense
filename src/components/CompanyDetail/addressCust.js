import React, { useState, useEffect } from "react";
import { Card, Row, Col, Button, Select, Input, Form, Modal } from "antd";
import { useAuth } from "../../contexts/AuthContext";
import CompanyProContext from "../../contexts/CompanyProContext";
import { CloseOutlined, EditFilled, DeleteOutlined, PlusCircleOutlined } from "@ant-design/icons";

function AddressCust() {
    const [editAddressContent, showEditAddressContent] = useState([false]);
    const [addAddressContent, showAddAddressContent] = useState(false);
    const [data, setData] = useState([]);
    const [form] = Form.useForm();
    
    const onFinish = (values) => {
        const valuesToservice = {
            title: values.addresstitle,
            addLine1: values.address1,
            addLine2: values.address2,
            city: values.city,
            state: values.state,
            country: values.country,
            pincode: values.pin
          
        }
        CompanyProContext.addCompInfo("compId001", { address: valuesToservice });
        form.resetFields()
        getData();
        showAddAddressContent(false);
      };

      const editOnFinish = async (values, i) => {
        const valuesToservice = {
            title: values.addresstitle,
            addLine1: values.address1,
            addLine2: values.address2,
            city: values.city,
            state: values.state,
            country: values.country,
            pincode: values.pin
        }
        await CompanyProContext.editCompInfo("compId001", {address: data[i]}, { address: valuesToservice });
        getData();
        let array = editAddressContent;
        array[i] = true
        showEditAddressContent(array)
        console.log(array)
      }

      const onDeleteAddress = (record) => {
        Modal.confirm({
        title: "Are you sure, you want to delete address?",
        okText: "Yes",
        okType: "danger",
  
        onOk: () => {
            CompanyProContext.deleteCompInfo("compId001", { address: record })
            .then((response) => {
              console.log(response);
              getData();
            })
            .catch((error) => {
              console.log(error.message);
            });
        },
      });
      }

      useEffect(() => {
        getData();
        }, []);
    console.log(data);


        const getData = async () => {
          let data = await CompanyProContext.getCompanyProfile("compId001");
          let array = [...data.address]
          showEditAddressContent(array.fill(false))
          setData(data.address);
          console.log(data.address, array.fill(false));
        };

    console.log(data);
    return (
        <>
            <div
                className="personalCardDiv"
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column"
                }}
            >
                { data && data != 0 ? data.map((add, i) => (
                    <Card
                        title={add ? add.title : "CUSTOM ADDRESS TITLE"}
                        extra={
                            <>
                                {editAddressContent[i] === false ? (
                                    <Button
                                        type="text"
                                        style={{ color: "#4ec0f1" }}
                                        onClick={() => {
                                            let array = [...editAddressContent];
                                            array[i] = !array[i]
                                            showEditAddressContent(array)
                                            console.log(array)
                                        }}
                                    >
                                        <EditFilled />
                                    </Button>
                                ) : null}
                                <DeleteOutlined 
                                style={{color: "lightblue"}}
                                onClick={() => {
                                    console.log(add);
                                    onDeleteAddress(add);}} />
                            </>
                        }
                        style={{
                            width: 800,
                            marginTop: 10,
                        }}
                    >
                    {console.log(add)}
                    <Form
                    // form={form1}
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
                    onFinish={(values) => editOnFinish(values,i)}
                >
                        {/* {editContactInfo === true ? ( */}
                            <Row gutter={[16, 16]}>
                                <Col span={24}>
                                    <div>
                                        <div className='div-discription'>
                                            Address Title
                                        </div>
                                        {console.log("no", add, editAddressContent[i]=== false)}
                                        {editAddressContent[i] === false ? (
                                            <div>{add ? add.title : null}
                                            </div>
                                        ) : (
                                            <Form.Item
                                                initialValue={add ? add.title : null}
                                                name="addresstitle"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Enter Address Title",
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
                        {/* {editContactInfo === true ? ( */}
                            <Row gutter={[16, 16]} style={{ marginTop: "5%" }}>
                                <Col span={24}>
                                    <div>
                                        <div className='div-discription'>
                                            Address Line 1
                                        </div>
                                        {editAddressContent[i] === false ? (
                                            <div>{add ? add.addLine1 : null}
                                            </div>
                                        ) : (
                                            <Form.Item
                                                initialValue={add ? add.addLine1 : null}
                                                name="address1"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Enter Address",
                                                        type: "text",
                                                    }
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
                                        {editAddressContent[i] === false ? (
                                            <div>{add ? add.addLine2 : null}
                                            </div>
                                        ) : (
                                            <Form.Item
                                                initialValue={add ? add.addLine2 : null}
                                                name="address2"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Enter Address Name",
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

                        {/* {editContactInfo === true ? ( */}
                            <Row gutter={[16, 16]} style={{ marginTop: "5%" }}>
                                <Col span={6}>
                                    <div>
                                        <div className='div-discription'>
                                            City
                                        </div>
                                        {editAddressContent[i] === false ? (
                                            <div>{add ? add.city : null}
                                            </div>
                                        ) : (
                                            <Form.Item style={{ width: '100%' }}
                                                initialValue={add ? add.city : null}
                                                name="city"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Enter City ",
                                                        type: "text",
                                                    },
                                                    {
                                                        pattern: /^[a-zA-Z\s]*$/,
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
                                        {editAddressContent[i] === false ? (
                                            <div>{add ? add.state : null}
                                            </div>
                                        ) : (
                                            <Form.Item style={{ width: '100%' }}
                                                initialValue={add ? add.state : null}
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
                                        {editAddressContent[i] === false ? (
                                            <div>{add ? add.country : null}
                                            </div>
                                        ) : (
                                            <Form.Item
                                                initialValue={add ? add.country : null}
                                                name="country"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Enter Country",
                                                        type: "text",
                                                    },
                                                    {
                                                        pattern: /^[a-zA-Z\s]*$/,
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
                                        {editAddressContent[i] === false ? (
                                            <div>{add ? add.pincode : null}
                                            </div>
                                        ) : (
                                            <Form.Item
                                                initialValue={add ? add.pincode : null}
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
                                                <Input maxLength={6} style={{ paddingLeft: '0px' }} required placeholder="" />

                                            </Form.Item>
                                        )}
                                    </div>
                                </Col>

                            </Row>
                        {/* ) : null} */}

                        {editAddressContent[i] === true ? (
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
                                    onClick={() => {
                                            let array = [...editAddressContent];
                                            array[i] = !array[i]
                                            showEditAddressContent(array)
                                            console.log(array)
                                        }}
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
                        {/* {editContactInfo == false && i == (data.length-1) &&
                        <>
                            <br />
                            <Button type="primary" style={{ marginLeft: "10px" }}
                                onClick={() => showEditAddressContent(!editAddressContent)}
                            >
                                <PlusCircleOutlined />
                                Add

                            </Button>
                        </>

                        } */}
                    </Form>
                </Card>)) : null }
                    <Card
                        title={"CUSTOM ADDRESS TITLE"}
                        extra={
                            <>
                                {addAddressContent === false ? (
                                    <Button
                                        type="text"
                                        style={{ color: "#4ec0f1" }}
                                        onClick={() => showAddAddressContent(true)}
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
                    { addAddressContent ?
                    (<Form
                    form={form}
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
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <div>
                                <div className='div-discription'>
                                    Address Title
                                </div>
                                <Form.Item
                                    name="addresstitle"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Enter Address Title",
                                            type: "text",
                                        }
                                    ]}
                                >
                                    <Input style={{ paddingLeft: '0px' }} required placeholder="" />
                                </Form.Item>
                            </div>
                        </Col>
                    </Row>   
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <div>
                                <div className='div-discription'>
                                    Address Line 1
                                </div>
                                <Form.Item
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
                            </div>
                        </Col>
                    </Row>   
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <div>
                                <div className='div-discription'>
                                    Address Line 2
                                </div>
                                <Form.Item
                                    name="address2"
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
                            </div>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]} style={{ marginTop: "5%" }}>
                        <Col span={6}>
                            <div>
                                <div className='div-discription'>
                                    City
                                </div>
                                <Form.Item
                                    name="city"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Enter City ",
                                            type: "text",
                                        },
                                        {
                                            pattern: /^[a-zA-Z\s]*$/,
                                            message: "Enter Valid City ",
                                        },
                                    ]}
                                >
                                    <Input style={{ paddingLeft: '0px' }} required placeholder="" />
                                </Form.Item>
                            </div>
                        </Col>
                        <Col span={6}>
                            <div>
                                <div className='div-discription'>
                                    State
                                </div>
                                <Form.Item
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
                                    <Input style={{ paddingLeft: '0px' }} required placeholder="" />
                                </Form.Item>
                            </div>
                        </Col>
                        <Col span={6}>
                            <div>
                                <div className='div-discription'>
                                    Country
                                </div>
                                <Form.Item
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
                            </div>
                        </Col>
                        <Col span={6}>
                            <div>
                                <div className='div-discription'>
                                    Pin Code
                                </div>
                                <Form.Item
                                    name="pin"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Enter Pin Code ",
                                            type: "text",
                                        },
                                        {
                                            pattern: /^[0-9\b]+$/,
                                            message: "Enter Valid Pin Code ",
                                        },
                                    ]}
                                >
                                    <Input maxLength={6} style={{ paddingLeft: '0px' }} required placeholder="" />
                                </Form.Item>
                            </div>
                        </Col>
                    </Row>
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
                            onClick={() => showAddAddressContent(false)}
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
                </Form>)
                : (
                    <Button 
                        type="primary"
                        style={{ marginLeft: "10px" }}
                        onClick={() => showAddAddressContent(true)}
                    >
                        <PlusCircleOutlined />
                        Add
                    </Button>
                )}
                </Card>
               
            </div>
        </>
    );
}
export default AddressCust;
