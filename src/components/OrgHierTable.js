import React, { useEffect, useState } from "react";
import {
    Divider,
    Card,
    Button,
    Table,
    Row,
    Col,
    Modal,
    Form,
    Input
} from "antd";
import {
    DeleteOutlined,
    EditFilled,
    CloseOutlined,
    CheckOutlined
} from "@ant-design/icons";


const OrgHierTable = () => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [type, setType] = useState("Business Unit")
    const order = ["Business Unit", "Division", "Department", "Team"];

    const columns = [
        {
            title: "SLno.",
            dataIndex: "SL",
            key: "SL",
            width: 50,
    
        },
        {
            title: `${type} Name`,
            dataIndex: "name",
            key: "name",
            width: 100,
            render: text => <a href="#">{text}</a>,
        },
    
        {
            title: `${type} Description`,
            key: "description",
            dataIndex: "description",
            width: 200,
            // responsive: ["md"],
            // render: (_, { status }) => getStatusUi(status),
        },
        {
            title: "Action",
            key: "action",
            dataIndex: "action",
            width: 80,
            // align: "center",
            render: (_, record) => {
                return (
                    <>
                        <Row gutter={[0, 0]}>
                            <Col xs={22} sm={15} md={8}>
                                <Button
                                    className="editbuttononboard"
                                    type="text"
                                    style={{
                                        color: " #007ACB",
                                        border: "none",
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: '35px',
                                        height: '36px',
                                        background: '#EEEEEE',
                                        borderRadius: '10px'
                                    }}
                                // onClick={() => {
                                //     setEditInfo(true);
                                //     setDes(record.designation);
                                //     setOld(record.designation);
                                // }}
                                >
                                    <EditFilled />
                                </Button>
                            </Col>
                            <Col xs={22} sm={15} md={8}>
                                <Button
                                    className="editbuttononboard"
                                    type="text"
                                    style={{
                                        color: " #007ACB",
                                        border: "none",
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: '35px',
                                        height: '36px',
                                        background: '#EEEEEE',
                                        borderRadius: '10px'
                                    }}
                                // onClick={() => onDelete(record.designation)}
                                >
                                    <DeleteOutlined />
                                </Button>
                            </Col>
    
                        </Row>
                    </>
                );
            },
        },
    ];

    const dataSource = [
        {
            SL: '1',
            name: 'Health Care',
            description: `Health care ${type} Description`,
            action: '',
        },
    
    ];

    console.log(type)

    return (
    <Card
        style={{
            background: "#fff",
            margin: "0px 15px 20px 15px",

            // height: "55rem",
        }}
    >
    <div style={{ background: "#fff" }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div
                        style={{
                            fontWeight: "600",
                            fontSize: "14px",
                            lineHeight: "19px",
                            // textTransform: "uppercase",
                        }}
                    >
                        <div>
                            <span onClick={()=> setType("Business Unit")}>Business Unit</span>
                            { type == order[0] ? null
                                : (<>{" > "}<span onClick={()=> setType("Division")}>Division</span>
                                    { type == order[1] ? null
                                        : (<>{" > "}<span onClick={()=> setType("Department")}>Department</span>
                                            { type == order[2] ? null : (<>{" > "}<span onClick={()=> setType("Team")}>Team</span>
                                        </>)}
                                    </>)}
                                </>)
                            }
                        </div>
                    </div>
                    <div
                        style={{
                            fontWeight: "600",
                            fontSize: "14px",
                            lineHeight: "19px",
                            textTransform: "uppercase",
                        }}
                    >
                        <Button type='default' onClick={() => {
                            {
                                console.log('hi')
                                setIsEditModalOpen(true);
                            }
                        }}>+ Add {type} </Button>
                    </div>
                </div>
                <Divider />
                <Table
                    className="tableTab"
                    columns={columns}
                    dataSource={dataSource}
                    size="middle"
                    onRow={(record, rowIndex) => {
                    return {
                      onClick: () => {
                        let temp = order.indexOf(type)+1
                        if (temp > 3) {return}
                        setType(order[temp]);
                        console.log(temp, order[temp])
                      }, // click row
                    };
                  }}
                
                />
                </div>

        <Row>
            <Col xs={22} sm={20} md={18}>
                <Modal
                    // bodyStyle={{ overflowY: 'scroll' }}
                    // style={{ height: 'calc(100vh - 200px)' }}
                    bodyStyle={{ overflowY: 'auto', maxHeight: 'calc(100vh - 200px)', marginLeft: '40px', marginRight: '40px' }}
                    className="viewAppraisal"
                    centered
                    width={550}
                    visible={isEditModalOpen}
                    // footer={null}
                    destroyOnClose
                    onCancel={() => {
                        setIsEditModalOpen(false);
                    }}
                    cancelText={<div ><CloseOutlined style={{ marginRight: '10px' }} />CANCEL</div>}
                    onOk={() => {
                        form.submit();
                        setIsEditModalOpen(false);
                    }}
                    okText={<div><CheckOutlined style={{ marginRight: '10px' }} />SAVE</div>}
                    title={type}
                    closeIcon={
                        <div
                                    onClick={() => {
                                        setIsEditModalOpen(false);
                                    }}
                                    style={{ color: "#ffffff" }}
                                >
                                    X
                                </div>
                            }
                        >
                            <Row
                                className="apply-leave"
                                style={{
                                    marginTop: "10px",
                                }}
                            >
                                <Col xl={24} lg={24} md={24} sm={24} xs={24}
                                    style={{
                                        background: "flex",
                                        padding: "10px",
                                        // width: "400px",
                                    }}
                                >
                                    <Form

                                        labelCol={{
                                            span: 8,
                                        }}
                                        wrapperCol={{
                                            span: 16,
                                        }}
                                        initialValues={{
                                            remember: true,
                                        }}
                                        form={form}
                                        // onFinish={onFinish}
                                    >

                                        <Form.Item
                                            labelAlign="left"
                                            name="name"
                                            style={{ marginBottom: "20px" }}
                                            label={
                                                <label style={{ color: "black", fontWeight: "400" }}>
                                                    {type} Name <span style={{ color: "red" }}> *</span>
                                                </label>
                                            }

                                        >
                                            <Input

                                            />
                                        </Form.Item>

                                        <Form.Item required={false}

                                            labelAlign="left"
                                            name="description"
                                            style={{ marginBottom: "20px" }}
                                            label={
                                                <label style={{ color: "black", fontWeight: "400" }}>
                                                    Description:<span style={{ color: "red" }}> *</span>{" "}
                                                </label>
                                            }
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Please Enter Description"
                                                }
                                            ]}
                                        >
                                            <Input.TextArea
                                                maxLength={80}
                                                rows={4}
                                                // onChange={(e) => {
                                                //     const inputval = e.target.value;
                                                //     const newVal =
                                                //         inputval.substring(0, 1).toUpperCase() +
                                                //         inputval.substring(1);
                                                //     form1.setFieldsValue({ reason: newVal });
                                                // }}
                                                required
                                            />
                                        </Form.Item>


                                    </Form>
                                </Col>
                            </Row>
                </Modal>
            </Col>
        </Row>
        </Card>
    )
}

export default OrgHierTable;