import { useState, useEffect } from "react";
import {
    Card,
    Row,
    Col,
    Button,
    Input,
    Form,
    Space,
    Table,
    Modal,
    notification,
} from "antd";
import { DeleteOutlined, EditFilled } from "@ant-design/icons";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import ConfigureContext from "../contexts/ConfigureContext";
// import "./companystyle.css";
// import { getDesigNo } from "../../contexts/CreateContext";

const LeaveCreate = (props) => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const page = "leavePage";
    const [editContent, showEditContent] = useState(false);
    const [data, setData] = useState({});
    const [des, setDes] = useState(null);
    const [old, setOld] = useState(null);
    const [editInfo, setEditInfo] = useState(false);
    const [dataSource, setDataSource] = useState([]);


    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const showModal = () => {
        console.log('hhhh')
        setIsModalOpen(true);
    };

    const checkNumbervalue = (event) => {
        if (!/^[0-9]*\.?[0-9]*$/.test(event.key) && event.key !== "Backspace") {
            return true;
        }
    };
    const checkAlphabets = (event) => {
        if (!/^[a-zA-Z ]*$/.test(event.key) && event.key !== "Backspace") {
            return true;
        }
    };


    //--------------------------------
    const columns = [
        {
            title: "Nature of leave",
            dataIndex: "leaveNature",
            key: "leaveNature",
        },

        {
            title: "No of leave allocated",
            dataIndex: "leaveAllocation",
            key: "leaveAllocation",
        },
        {
            render: (record) => (
                <Row
                    style={{
                        width: "100px",
                        textAlign: "-webkit-right",
                    }}
                >
                    <Col span={12}>
                        <Button
                            className="editbutton"
                            type="text"
                            style={{
                                color: "rgb(64, 169, 255)",
                                display: "none",
                                border: "none",
                                padding: "0",

                            }}
                            onClick={() => {
                                setEditInfo(true);
                                setDes(record.leaveNature);
                                setOld(record.leaveNature);
                            }}
                        >
                            <EditFilled />
                        </Button>
                    </Col>
                    <Col span={12}>
                        <Button
                            className="editbutton"
                            type="text"
                            style={{
                                color: "#f04747",
                                display: "none",
                                border: "none",

                            }}
                            onClick={() => onDelete(record.leaveNature)}
                        >
                            <DeleteOutlined />
                        </Button>
                    </Col>
                </Row>
            ),
        },
    ];

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        let data = await ConfigureContext.getConfigurations(page);
        let d = Object.keys(data.leaveNature).map((nat) => {
            return {
                leaveNature: nat,
                leaveAllocation: data.leaveNature[`${nat}`]
            }
        });
        console.log(data, d)
        setDataSource(d)
    };



    const showNotification = (type, msg, desc) => {
        notification[type]({
            message: msg,
            description: desc,
        });
    };

    const onDelete = (record) => {
        Modal.confirm({
            title: `Are you sure, you want to delete "${record}" Leave?`,
            okText: "Yes",
            okType: "danger",

            onOk: () => {
                ConfigureContext.deleteConfigurations(page, { leaveNature: record })
                    .then((response) => {
                        showNotification(
                            "success",
                            "Success",
                            "Leave deleted successfully!"
                        );
                        getData();
                    })
                    .catch((error) => {
                        showNotification("error", "Error", error.message);
                    });
            },
        });
    };

    const onEdit = () => {
        // console.log(des);
        // ConfigureContext.updateConfigurations(
        //     page,
        //     { leaveNature: old },
        //     { leaveNature: des }
        // )
        //     .then((response) => {
        //         showNotification(
        //             "success",
        //             "Success",
        //             "leaveNature edited successfully!"
        //         );
        //         getData();
        //         setEditInfo(false);
        //         setDes(null);
        //         setOld(null);
        //     })
        //     .catch((error) => {
        //         showNotification("error", "Error", error.message);
        //     });
    };

    const onFinish = (values) => {
        let record = {
            leaveNature: Object.values(values),
        };
        console.log("Received values of form:", record);
        ConfigureContext.addConfigurations(page, record)
            .then((response) => {
                showNotification(
                    "success",
                    "Success",
                    "leaveNature added successfully!"
                );
                getData();
                showEditContent(false);
                setData({});
                form.resetFields();
            })
            .catch((error) => {
                showNotification("error", "Error", error.message);
            });
    };
    return (
        <>
            {
                props.isHr
                    ?
                    <Button className='button-div' style={{
                        marginTop: '10px', marginBottom: '10px', marginRight: '10px', borderRadius: '15px'
                    }}
                        onClick={() => { showModal(true) }}
                    >
                        Create Leave
                    </Button>
                    :
                    null
            }
            <Modal className='viewAppraisal'
                title=" Create Leave"
                maskClosable={false}
                footer={null}
                open={isModalOpen}
                visible={isModalOpen}
                onCancel={handleCancel}
                width={600}
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
                            width: "100%",
                            margin: "10px",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Col span={24}>
                            <div className="table-responsive">
                                <Table
                                    columns={columns}
                                    dataSource={dataSource}
                                    pagination={false}
                                    className="designationTable"

                                />
                            </div>

                            <Row gutter={[16, 16]} style={{ marginTop: "5%" }}>
                                <Form form={form} style={{ width: "100%" }} autoComplete="off">
                                    {editContent ? (
                                        <>
                                            <Form.List name="users">
                                                {(fields, { add, remove }) => (
                                                    <>
                                                        <Row style={{ width: "100%", display: 'block', }}>
                                                            {fields.map(({ key, name, ...restField }) => (
                                                                <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                                                                    <Space key={key} style={{
                                                                        display: 'flex',
                                                                        marginBottom: 8,
                                                                    }}
                                                                        align="baseline">
                                                                        <Form.Item
                                                                            {...restField}
                                                                            name={[name, "leaveNature"]}
                                                                            onKeyPress={(event) => {
                                                                                if (checkAlphabets(event)) {
                                                                                    event.preventDefault();
                                                                                }
                                                                            }}

                                                                            rules={[
                                                                                {
                                                                                    required: true,
                                                                                    message: "Please enter Leave Nature",
                                                                                },
                                                                            ]}
                                                                        >
                                                                            <Input style={{ width: '200px' }}
                                                                                placeholder="Nature of leave"
                                                                                onChange={(e) => {
                                                                                    let temp = {
                                                                                        ...data,
                                                                                        [`${key}`]: e.target.value,
                                                                                    };
                                                                                    setData(temp);
                                                                                }}
                                                                            />
                                                                        </Form.Item>
                                                                        <Form.Item
                                                                            {...restField}
                                                                            name={[name, "leaveAllocation"]}
                                                                            onKeyPress={(event) => {
                                                                                if (checkNumbervalue(event)) {
                                                                                    event.preventDefault();
                                                                                }
                                                                            }}
                                                                            rules={[
                                                                                {
                                                                                    required: true,
                                                                                    message: "Please enter leave allocated ",
                                                                                },
                                                                            ]}
                                                                        >
                                                                            <Input style={{ width: '200px' }}
                                                                                placeholder="No. of leave allocated"
                                                                                onChange={(e) => {
                                                                                    let temp = {
                                                                                        ...data,
                                                                                        [`${key}`]: e.target.value,
                                                                                    };
                                                                                    setData(temp);
                                                                                }}
                                                                            />
                                                                        </Form.Item>

                                                                        <MinusCircleOutlined
                                                                            onClick={() => {
                                                                                delete data[`${key}`];
                                                                                remove(name);
                                                                            }}
                                                                        />
                                                                    </Space>
                                                                </Col>
                                                            ))}
                                                        </Row>
                                                        <Form.Item>
                                                            <Button
                                                                type="dashed"
                                                                style={{ width: "150px" }}
                                                                onClick={() => add()}
                                                                block
                                                                icon={<PlusOutlined />}
                                                            >
                                                                Add
                                                            </Button>
                                                        </Form.Item>
                                                    </>
                                                )}
                                            </Form.List>
                                            <Form.Item>
                                                <Button
                                                    type="default"
                                                    style={{ marginRight: "10px" }}
                                                    onClick={() => {
                                                        setData({});
                                                        showEditContent(false);
                                                        form.resetFields();
                                                    }}
                                                >
                                                    Cancel
                                                </Button>
                                                <Button
                                                    type="primary"
                                                    onClick={() => {
                                                        onFinish(data);
                                                    }}
                                                >
                                                    Submit
                                                </Button>
                                            </Form.Item>
                                        </>
                                    ) : (
                                        <Form.Item>
                                            <Button
                                                style={{
                                                    background: "#1963a6",
                                                    marginLeft: "20px",
                                                }}
                                                type="primary"
                                                onClick={() => showEditContent(true)}
                                            >
                                                Add Leave
                                            </Button>
                                        </Form.Item>
                                    )}
                                </Form>
                            </Row>

                        </Col>
                    </Row>
                </div>
            </Modal>
            <Modal
                centered
                className="editDesignation"
                title="Edit Leave"
                open={editInfo}
                onOk={onEdit}
                destroyOnClose
                onCancel={() => {
                    setEditInfo(false);
                }}
            >
                <Row style={{ width: "80%", display: 'flex', flexDirection: 'row', margin: '10px' }}>
                    <Col span={12}>
                        <Form.Item

                            name="leaveNature"
                            onKeyPress={(event) => {
                                if (checkAlphabets(event)) {
                                    event.preventDefault();
                                }
                            }}

                            rules={[
                                {
                                    required: true,
                                    message: "Please enter Leave Nature",
                                },
                            ]}
                        >
                            <Input style={{ width: '150px' }}
                                placeholder="Nature of leave"
                                onChange={(e) => setDes(e.target.value)}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item

                            name="leaveAllocation"
                            onKeyPress={(event) => {
                                if (checkNumbervalue(event)) {
                                    event.preventDefault();
                                }
                            }}
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter leave allocated ",
                                },
                            ]}
                        >
                            <Input style={{ width: '200px' }}
                                placeholder="No. of leave allocated"
                                onChange={(e) => setDes(e.target.value)}
                            />
                        </Form.Item>
                    </Col>
                </Row>

            </Modal>
        </>
    )
}

export default LeaveCreate