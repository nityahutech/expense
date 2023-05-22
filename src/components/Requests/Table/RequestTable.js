import React, { useState, useEffect } from "react";
import { DeleteOutlined, EyeFilled, SearchOutlined, EditFilled, DeleteFilled, } from "@ant-design/icons";
import { Card, Col, Input, Modal, Row, Table, Tag, Spin } from "antd"
import ViewInvoice from "./ViewInvoice";
import ViewLaptopUpgrade from "./ViewLaptopUpgrade";
import ViewLaptopRepair from "./ViewLaptopRepair";
import ViewLaptopReturn from "./ViewLaptopReturn";
import ViewTravelBoking from "./ViewTravelBoking";
import EditLaptopRepair from "./EditLaptopRepair";
import EditLaptopReturn from "./EditLaptopReturn";
import EditLaptopUpgrade from "./EditLaptopUpgrade";
import EditInvoice from "./EditInvoice";
import EditTravelBoking from "./EditTravelBoking";
import RequestContext from "../../../contexts/RequestContext";


const RequestTable = () => {
    const [viewData, setViewData] = useState(null)
    const [editData, setEditData] = useState(null)
    const [formData, setFormData] = useState([]);
    const [filterRequest, setFilterRequest] = useState([]);
    const [loading, setLoading] = useState([])
    const currentUser = JSON.parse(sessionStorage.getItem("user"));
    const viewTypes = {
        "Invoice Reimbursement": <ViewInvoice data={viewData} />,
        "Laptop Upgrade": <ViewLaptopUpgrade data={viewData} />,
        "Laptop Repair": <ViewLaptopRepair data={viewData} />,
        "Laptop Return": <ViewLaptopReturn data={viewData} />,
        "Travel Booking": <ViewTravelBoking data={viewData} />,
    }
    const EditTypes = {
        "Invoice Reimbursement": <EditInvoice data={editData} setEditData={setEditData} />,
        "Laptop Upgrade": <EditLaptopUpgrade data={editData} setEditData={setEditData} />,
        "Laptop Repair": <EditLaptopRepair data={editData} setEditData={setEditData} />,
        "Laptop Return": <EditLaptopReturn data={editData} setEditData={setEditData} />,
        "Travel Booking": <EditTravelBoking data={editData} setEditData={setEditData} />,
    }
    console.log('currentUser', currentUser.uid)
    const getData = async () => {
        setLoading(true)
        let repairData = await RequestContext.getAllAsset(
            currentUser.uid,
        );
        const filteredData = repairData.filter((item) => item.empId === currentUser.uid);
        console.log('repairData', filteredData)
        setFormData(filteredData);
        setFilterRequest(filteredData)
        setLoading(false)
    };

    useEffect(() => {
        getData();
    }, [editData,]);

    const onDeleteRecord = (record) => {
        console.log('record', record.type)
        Modal.confirm({
            title: `Are you sure, you want to delete ${record.type} dated ${record.date}`,
            okText: "Yes",
            okType: "danger",
            onOk: () => {
                RequestContext.deleteRepairData(record.id)
                    .then((response) => {
                        getData();
                    })
                    .catch((error) => { });
            },
        });
    };

    console.log('formData', formData)
    const searchChange = (e) => {
        let search = e.target.value
        console.log('formData', search)
        if (search) {
            let result = formData.filter((ex) =>
                ex?.date?.toLowerCase().includes(search?.toLowerCase()) ||
                ex?.type?.toLowerCase().includes(search?.toLowerCase())

            )
            console.log('formData', result)
            const modifiedFilterRequest = [...result];
            setFilterRequest(modifiedFilterRequest)
        }
        else {
            setFilterRequest(formData)
        }
    }


    const columns = [
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
            fixed: "left",
            align: "center",
            align: "left",
            width: '200px'
        },
        {
            title: "Request Type",
            dataIndex: "type",
            key: "type",
            align: "center",
            align: "left",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",

            align: "left",
            render: (_, { status }) =>
                status !== "" && (
                    <Tag
                        style={{ width: "80px", color: "black", textAlign: "center" }}
                        className="statusTag"
                        color={
                            status === "Approved"
                                ? "rgba(15, 255, 80, 0.2)"
                                : status === "Pending"
                                    ? "rgba(205, 227, 36, 0.25)"
                                    : "volcano"
                        }
                        key={status}
                    >
                        {status}
                    </Tag>
                ),
        },
        {
            key: "5",
            title: "Actions",
            fixed: "right",
            align: "center",
            width: '150px',
            render: (record) => {
                return (
                    <>
                        {
                            <>
                                <div
                                    className="employee-button"
                                    style={{ display: "flex", flexDirection: "row", justifyContent: "center", }}
                                >
                                    <EyeFilled
                                        style={{ color: '#6e7475' }}
                                        onClick={() => {
                                            setViewData(record)
                                        }}
                                    />
                                    <DeleteFilled
                                        onClick={() => {
                                            onDeleteRecord(record);
                                        }}
                                        style={
                                            record?.status === "Approved"
                                                ? { display: 'none' }
                                                // ? { color: "green", marginLeft: 10 }
                                                : record?.status === "Pending"
                                                    ? { color: "red", marginLeft: 10 }
                                                    : { color: "red", marginLeft: 10 }
                                        }
                                    />
                                    {
                                        <EditFilled
                                            onClick={() => {
                                                setEditData(record)
                                            }}
                                            style={
                                                record.status == "Approved"
                                                    ? {
                                                        display: 'none'
                                                    }
                                                    : {
                                                        color: "rgb(64, 169, 255)", marginLeft: 10
                                                    }
                                            }
                                            disabled={record.status == "Approved"}
                                        />
                                    }
                                </div>
                            </>
                        }
                    </>
                );
            },
        },
    ];

    const tableProps = {
        loading,
    };


    return (
        <Card className="daily">
            <Row gutter={10} style={{ justifyContent: "space-between" }}>
                <Col sm={24} md={8}>
                    <Input
                        className="daily"
                        placeholder="Search"
                        prefix={<SearchOutlined />}
                        onChange={searchChange}

                    />
                </Col>
            </Row>

            <Table
                {...tableProps}
                className="daily daily-table"
                columns={columns}
                dataSource={filterRequest}
                pagination={true}
                onChange={(pagination) => console.log(pagination)}
                scroll={{
                    x: 800,
                }}
            />

            {console.log("yellow")}
            <Modal
                className="view-modal"
                open={viewData}
                footer={null}
                closeIcon={
                    <div
                        onClick={() => setViewData(null)}
                        style={{ color: "white" }}
                    >
                        X
                    </div>
                }
                title={viewData?.type}
                destroyOnClose
            >
                {viewTypes[viewData?.type]}
            </Modal>
            <Modal
                className="view-modal scrollable-modal"
                open={editData}
                footer={null}
                closeIcon={
                    <div
                        onClick={() => setEditData(null)}
                        style={{ color: "white" }}
                    >
                        X
                    </div>
                }
                title={editData?.type}
                destroyOnClose
            >
                {EditTypes[editData?.type]}

            </Modal>
        </Card>
    )
}

export default RequestTable

