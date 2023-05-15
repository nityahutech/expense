import React, { useState, useEffect } from "react";
import { DeleteOutlined, EyeFilled, SearchOutlined } from "@ant-design/icons";
import { Card, Col, Input, Modal, Row, Table, Tag } from "antd"
import ViewInvoice from "./ViewInvoice";
import ViewLaptopUpgrade from "./ViewLaptopUpgrade";
import ViewLaptopRepair from "./ViewLaptopRepair";
import ViewLaptopReturn from "./ViewLaptopReturn";
import ViewTravelBoking from "./ViewTravelBoking";

import RequestContext from "../../../contexts/RequestContext";

const RequestTable = () => {
    const [viewData, setViewData] = useState(null)
    const currentUser = JSON.parse(sessionStorage.getItem("user"));
    const viewTypes = {
        "Invoice Reimbursement": <ViewInvoice data={viewData} />,
        "Laptop Upgrade": <ViewLaptopUpgrade data={viewData} />,
        "Laptop Repair": <ViewLaptopRepair data={viewData} />,
        "Laptop Return": <ViewLaptopReturn data={viewData} />,
        "Travel Booking": <ViewTravelBoking data={viewData} />,
    }

    const [formData, setFormData] = useState([]);
    const getRepairData = async () => {
        let repairData = await RequestContext.getAllAsset(
            currentUser.uid,
        );
        setFormData(repairData);
    };

    useEffect(() => {
        getRepairData();

    }, []);

    const columns = [
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
            fixed: "left",
            align: "center",
            align: "left",
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
            align: "left",
            render: (record) => {
                return (
                    <>
                        {
                            <>
                                <EyeFilled
                                    onClick={() => {
                                        setViewData(record)
                                    }}
                                />
                                <DeleteOutlined
                                    onClick={() => {
                                        // onDeleteLeave(record);
                                    }}
                                    style={
                                        record?.status === "Approved"
                                            ? { color: "green", marginLeft: 10 }
                                            : record?.status === "Pending"
                                                ? { color: "blue", marginLeft: 10 }
                                                : { color: "red", marginLeft: 10 }
                                    }
                                />
                            </>
                        }
                    </>
                );
            },
        },
    ];


    return (
        <Card className="daily">
            <Row gutter={10} style={{ justifyContent: "space-between" }}>
                <Col sm={24} md={8}>
                    <Input
                        className="daily"
                        placeholder="Search"
                        prefix={<SearchOutlined />}
                    />
                </Col>
            </Row>

            <Table
                className="daily daily-table"
                columns={columns}
                dataSource={formData}
                pagination={true}
                onChange={(pagination) => console.log(pagination)}
            />
            {console.log("yellow")}
            <Modal
                className="view-modal"
                open={viewData}
                footer={null}
                closeIcon={
                    <div
                        onClick={() => setViewData(null)}
                        style={{ color: "#ffffff" }}
                    >
                        X
                    </div>
                }
                title={viewData?.type}
                destroyOnClose
            >
                {viewTypes[viewData?.type]}
            </Modal>
        </Card>
    )
}

export default RequestTable

