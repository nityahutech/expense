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
    const [ismodalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [type, setType] = useState("Business Unit")
    const order = ["Business Unit", "Division", "Department", "Team"];
    const [dataSource, setDataSource] = useState([
        {
            key: '0',
            SL: '1',
            name: `${type} Care`,
            description: `Health care ${type} Description`,
            action: '',
        },


    ]);

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishEdit = (values) => {
        console.log('Success:', values);
    };
    const deleteData = (key) => {
        Modal.confirm({
            title: `Are you sure, you want to delete this ${type}?`,
            okText: "Yes",
            okType: "danger",
            // onOk: () => {
            //     DocumentContext.deleteDocument(currentUser.uid, id, fileName)
            //         .then(response => {
            //             showNotification("success", "Success", "Successfully deleted");
            //             getData();
            //         })
            //         .catch(error => {
            //             showNotification("error", "Error", "Record not deleted");
            //         })
            // },
        });
    };
    // const deleteData = (key) => {
    //     const newData = dataSource.filter((item) => item.key !== key);
    //     setDataSource(newData);
    // };



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
            render: text => <a href="#" >{type} </a>,


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
                                    onClick={() => {
                                        {
                                            console.log('hi')
                                            setIsEditModalOpen(true);
                                        }
                                    }} >

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
                                    onClick={() => deleteData(record.key)}
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




    console.log(type)

    return (
        <div className="main-hier-div">
            <Card classname='orghie-div'
                style={{
                    background: " #FAFAFA",
                    border: 'none',
                    padding: '0px',

                }}
                footer={false}
            >
                <div style={{ background: "#FAFAFA" }}>
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
                                <span style={type == 'Business Unit' ? { color: 'black' } : { color: '#007ACB' }} onClick={() => setType("Business Unit")}>Business Unit</span>
                                {type == order[0] ? null
                                    : (<>{" > "}<span style={type == "Division" ? { color: 'black' } : { color: '#007ACB' }} onClick={() => setType("Division")}>Division</span>
                                        {type == order[1] ? null
                                            : (<>{" > "}<span style={type == "Department" ? { color: 'black' } : { color: '#007ACB' }} onClick={() => setType("Department")}>Department</span>
                                                {type == order[2] ? null
                                                    : (<>{" > "}<span style={type == "Team" ? { color: 'black' } : { color: '#007ACB' }} onClick={() => setType("Team")}>Team</span>
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
                                    setIsModalOpen(true);
                                }
                            }}>+ Add {type} </Button>
                        </div>
                    </div>
                    <Divider />
                    <Row style={{ display: 'flex', flexDirection: 'column', margin: '20px' }}>
                        <Row>
                            <Col style={{ fontWeight: 600 }} span={24}>{`${type} Care`}</Col>
                        </Row>
                        <Row>
                            <Col span={24}> {`Health care ${type} Description`} </Col>
                        </Row>
                    </Row>

                    <Table

                        className="tableTab"
                        columns={columns}
                        dataSource={dataSource}
                        style={{ background: "#FAFAFA" }}
                        size="middle"
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: () => {
                                    let temp = order.indexOf(type) + 1
                                    if (temp > 3) { return }
                                    setType(order[temp]);
                                    console.log(temp, order[temp])
                                }, // click row
                            };
                        }}

                    />
                </div>
                {/* //---------------------------------add Modal */}
                <Row>
                    <Col xs={22} sm={20} md={18}>
                        <Modal
                            // bodyStyle={{ overflowY: 'scroll' }}
                            // style={{ height: 'calc(100vh - 200px)' }}
                            bodyStyle={{ overflowY: 'auto', maxHeight: 'calc(100vh - 200px)', marginLeft: '40px', marginRight: '40px' }}
                            className="viewAppraisal"
                            centered
                            width={550}
                            visible={ismodalOpen}
                            // footer={null}
                            destroyOnClose
                            onCancel={() => {
                                setIsModalOpen(false);
                            }}
                            cancelText={<div ><CloseOutlined style={{ marginRight: '10px' }} />CANCEL</div>}
                            onOk={() => {
                                form.submit();
                                setIsModalOpen(false);
                            }}
                            okText={<div><CheckOutlined style={{ marginRight: '10px' }} />SAVE</div>}
                            title={type}
                            closeIcon={
                                <div
                                    onClick={() => {
                                        setIsModalOpen(false);
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
                                        onFinish={onFinish}
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

                {/* //---------------------------------edit Modal */}
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
                            title={<div> Edit {type}</div>}
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
                                        onFinish={onFinishEdit}
                                    >

                                        <Form.Item
                                            labelAlign="left"
                                            name="editname"
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
                                            name="editdescription"
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
            </Card >
        </div>
    )
}

export default OrgHierTable;