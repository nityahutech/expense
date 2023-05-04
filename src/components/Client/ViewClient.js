import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Row, Col, Input, Tabs, Tooltip } from "antd";
import {
    EditFilled,
    SearchOutlined,
    DeleteFilled,
    EyeFilled,
} from "@ant-design/icons";
import ClientContext from "../../contexts/ClientContext";
import Editclient from "./EditClient";
import ClientListview from "./ClientListView";

const ViewClient = (props) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editedRecord, setEditedRecord] = useState(null);
    const [showRecord, setshowRecord] = useState([]);
    const [loading, setLoading] = useState(false);
    const [size, setSize] = useState(window.innerWidth <= 768 ? "" : "left");
    const [filterClient, setFilterClient] = useState([]);
    const [selectemp, setSelectemp] = useState({ id: "" });
    const [activetab, setActivetab] = useState("1");
    const [clientData, setClientdata] = useState();

    console.log('modifiedFilterExpense', filterClient)

    const showModal = (record) => {
        setIsModalVisible(true);
    };

    const handleEditEmployee = (record) => {
        setEditedRecord(record);
    };

    const handleDeleteRow = (record) => {
        console.log("value", record);
        Modal.confirm({
            title: "Are you sure, you want to delete Appraisal?",
            okText: "Yes",
            okType: "danger",

            onOk: () => {
                ClientContext.deleteClient(record.id)
                    .then((response) => {
                        console.log(response);
                        getClientData();
                    })
                    .catch((error) => {
                        console.log(error.message);
                    });
            },
        });
    };

    const columns = [
        {
            title: "Client Code",
            dataIndex: "id",
            key: "id",
            fixed: "left",
            width: 100,
            align: "left",
        },
        {
            title: "Company Name",
            dataIndex: "regCompName",
            key: "regCompName",
            fixed: "left",
            width: 120,
            ellipsis: true,
            align: "left",
        },

        {
            title: "Project",
            dataIndex: "project",
            key: "project",
            width: 120,
            ellipsis: true,
            align: "left",
        },

        {
            title: "POC",
            dataIndex: "poc",
            key: "poc",
            width: 120,
            ellipsis: true,
            align: "left",
        },

        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            fixed: "right",
            align: "center",
            width: 120,
            render: (_, record) => {
                return (
                    <>
                        <div
                            className="employee-button"
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                            }}
                        >
                            <Tooltip placement="bottom" title="View Profile">
                                <Button
                                    type="link"
                                    className="show"
                                    style={{ width: "40px" }}
                                    onClick={() => {
                                        setshowRecord(record);
                                        setSelectemp({ id: record.id });
                                        setActivetab("2");
                                    }}
                                >
                                    {<EyeFilled />}
                                </Button>
                            </Tooltip>
                            {props.roleView === 'admin' &&
                                <>
                                    <Tooltip placement="bottom" title="Edit Profile">
                                        <Button
                                            style={{ padding: 0, color: "rgb(64, 169, 255)" }}
                                            type="link"
                                            className="edIts"
                                            onClick={() => {
                                                handleEditEmployee(record);
                                                showModal(record);
                                            }}
                                        >
                                            {<EditFilled />}
                                        </Button>
                                    </Tooltip>
                                    <Tooltip placement="bottom" title="Disable Account">
                                        <Button
                                            type="link"
                                            className="deleTe"
                                            onClick={() => handleDeleteRow(record)}
                                        >
                                            <DeleteFilled />
                                        </Button>
                                    </Tooltip>
                                </>
                            }
                        </div>
                    </>
                );
            },
        },
    ];

    const searchChange = (e) => {
        let search = e.target.value;
        console.log('search', search)
        console.log('modifiedFilterExpense', clientData)
        if (search) {
            let result = clientData.filter(

                (ex) =>
                    ex.regCompName.toLowerCase().includes(search.toLowerCase())
                //  ||
                // ex.lname.toLowerCase().includes(search.toLowerCase()) ||
                // ex?.mname?.toLowerCase()?.includes(search?.toLowerCase()) ||
                // ex?.designation?.toLowerCase()?.includes(search?.toLowerCase()) ||
                // ex?.empId?.toLowerCase()?.includes(search?.toLowerCase()) ||
                // ex.gender?.toLowerCase() == search
            );
            const modifiedFilterClient = [...result];
            console.log('modifiedFilterExpense', modifiedFilterClient)
            setFilterClient(modifiedFilterClient);
        } else {
            setFilterClient(clientData);
        }
    };

    const getClientData = async () => {
        let data = await ClientContext.getClient();
        console.log("clientget", data);
        setClientdata(data);
        setFilterClient(data)
    };

    useEffect(() => {
        getClientData();
    }, [isModalVisible,]);

    return (
        <div className="hrtab" style={{ minHeight: "100vh" }}>
            <Tabs
                defaultActiveKey={activetab}
                activeKey={activetab}
                className="Tabs"
                onChange={(tabKey) => {
                    setActivetab(tabKey);
                    if (tabKey == 1) {
                        setSelectemp({ id: "" });
                    }
                }}
            >

                <Tabs.TabPane tab="Client List" key="1">
                    <div
                        style={{
                            width: "100%",
                            padding: "10px",
                            backgroundColor: "white",
                            marginBottom: "15px",
                        }}
                    >
                        <Row gutter={[16, 16]}>
                            <Col xs={24} xm={24} md={8} lg={4}>
                                <Input
                                    placeholder="Search"
                                    prefix={<SearchOutlined />}
                                    onChange={searchChange}
                                />
                            </Col>
                        </Row>
                    </div>
                    <Table
                        loading={loading}
                        columns={columns}
                        dataSource={filterClient}
                        pagination={{
                            position: ["bottomCenter"],
                        }}
                        scroll={{ x: 800 }}
                        className="empTable"
                        size="small"
                        activetab={activetab}
                        reloadData={getClientData}
                    />
                </Tabs.TabPane>

                <Tabs.TabPane tab="Client Pofile" disabled={!selectemp.id} key="2">
                    <ClientListview showRecord={showRecord} />
                </Tabs.TabPane>
            </Tabs>

            <Modal
                className="editClient"
                bodyStyle={{
                    overflowX: "hidden",
                }}
                width={400}
                centered
                title="Client Details"
                open={isModalVisible}
                footer={null}
                closeIcon={
                    <div
                        onClick={() => {
                            setIsModalVisible(false);
                        }}
                        style={{ color: "#ffffff" }}
                    >
                        X
                    </div>
                }
            >
                <Editclient
                    className="Edit"
                    record={editedRecord}
                    setIsModalVisible={setIsModalVisible}
                />
            </Modal>
        </div>
    );
};

export default ViewClient;
