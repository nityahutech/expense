import React, { useState, useEffect } from "react";
import {
    // PrinterFilled,
    FileImageOutlined,
    DeleteOutlined,
    DownloadOutlined,
} from "@ant-design/icons";
import { Button, Col } from "antd";
import { Card, Input, Modal, Row, Table, Tag } from "antd";
import HalfYearGoalForm from "./halfYearGoalForm";
import HalfyearGoalPdf from "./halfyearGoalPdf";
import "./halfYearGoal.css";
import AppraisalContext from "../../contexts/AppraisalContext";
import EmpInfoContext from "../../contexts/EmpInfoContext";
import { createPdfFromHtml } from "./../ProfileDetails/downloadLogicAppraisal";

const HalfYearGoalTable = (props) => {
    console.log('ppddddddddppp', props)
    const [secondModal, setSecondModal] = useState(false);
    const [thirdModal, setThirdModal] = useState(false);
    const [editedAppraisal, setEditedAppraisal] = useState(null);
    const [downloadAppraisal, setDownloadAppraisal] = useState(null);
    const [loading, setLoading] = useState(false);
    const [employeeRecord, setEmployeeRecord] = useState();
    const currentUser = JSON.parse(sessionStorage.getItem("user"));
    const [appraisalList, setAppraisalList] = useState([]);
    const [printContent, setPrintContent] = useState(null);
    const isMgr = JSON.parse(sessionStorage.getItem("isMgr"));
    const isHr = JSON.parse(sessionStorage.getItem("isHr"));
    const [isModalOpen, setIsModalOpen] = useState(false);

    const columns = [
        {
            title: "Date",
            dataIndex: "date",
            fixed: "left",
            width: 100,
            align: "left",
        },
        {
            title: "Employee Id",
            dataIndex: "empId",
            fixed: "left",
            width: 100,
            align: "left",
        },
        {
            title: "Name",
            dataIndex: "fname",
            width: 120,
            align: "left",
        },
        // {
        //     title: "Last Name",
        //     dataIndex: "lname",
        //     width: 120,
        //     align: "left",
        // },
        {
            title: "Reporting Manager",
            dataIndex: "repManager",
            width: 150,
            align: "left",
        },
        {
            title: "Self Assessment",
            dataIndex: "Selfassessment",
            width: 150,
            align: "left",
            sorter: (a, b) => {
                return a.status !== b.status ? (a.status < b.status ? -1 : 1) : 0;
            },
            sortDirections: ["ascend", "descend"],
            render: (_, { status }) =>
                status !== "" && (
                    <Tag
                        // style={{ width: "100px" }}
                        className="statusTag"
                        color={status != "empPending" ? "#87d068" : "#f50"}
                        key={status}
                    >
                        {status === "empPending" ? "Pending" : "Completed"}
                    </Tag>
                ),
        },

        {
            title: "Manager Assessment",
            dataIndex: "Mangassessment",
            width: 150,
            align: "left",
            ellipsis: true,
            sorter: (a, b) => {
                return a.status !== b.status ? (a.status < b.status ? -1 : 1) : 0;
            },
            sortDirections: ["ascend", "descend"],
            render: (_, { status }) =>
                status !== "" && (
                    <Tag
                        // style={{ width: "100px" }}
                        className="statusTag"
                        color={
                            status === "completed"
                                ? "#87d068"
                                : // : status === "mgrPending"
                                //     ? "#2db7f5"
                                "#f50"
                        }
                        key={status}
                    >
                        {status === "completed" ? "Completed" : "Pending"}
                    </Tag>
                ),
        },
        {
            title: "Haly Yearly",
            dataIndex: "quarter",
            width: 150,
            align: "left",
            ellipsis: true,
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            fixed: "right",
            width: 110,
            align: "left",

            render: (_, appraisal) => {
                return (
                    <>
                        {/* {console.log("render", appraisal)} */}
                        {props.roleView === 'emp' ? (
                            <>
                                <Button
                                    type="primary"
                                    style={{
                                        color: "grey",
                                        boxShadow: "0 4px 6px rgb(0 0 0 / 12%)",
                                    }}
                                    className="edIt"
                                    onClick={() => {
                                        setEditedAppraisal(appraisal);
                                        setSecondModal(true);
                                    }}
                                >
                                    {" "}
                                    {<FileImageOutlined style={{ color: "white" }} />}
                                </Button>
                                <Button
                                    type="secondary"
                                    style={{
                                        color: "grey",
                                        boxShadow: "0 4px 6px rgb(0 0 0 / 12%)",
                                        marginLeft: "10px",
                                    }}
                                    className="edIt"
                                    onClick={() => {
                                        // setDownloadAppraisal(appraisal);
                                        // setThirdModal(true)
                                    }}
                                >
                                    {<HalfyearGoalPdf appraisal={appraisal} />}
                                </Button>
                            </>

                        ) : (
                            <>
                                <Button
                                    type="danger"
                                    style={{
                                        color: "grey",
                                        boxShadow: "0 4px 6px rgb(0 0 0 / 12%)",
                                        marginLeft: "10px",
                                    }}
                                    className="edIt"
                                    onClick={() => {
                                        // if (record?.status !== 'Approved')
                                        onDeleteAppraisal(appraisal);
                                    }}
                                >
                                    {<DeleteOutlined style={{ color: "white" }} />}
                                </Button>

                                <Button
                                    type="secondary"
                                    style={{
                                        color: "grey",
                                        boxShadow: "0 4px 6px rgb(0 0 0 / 12%)",
                                        marginLeft: "10px",
                                    }}
                                    className="edIt"
                                    onClick={() => {
                                        // setDownloadAppraisal(appraisal);
                                        // setThirdModal(true)
                                    }}
                                >
                                    {<HalfyearGoalPdf appraisal={appraisal} />}
                                </Button>
                            </>
                        )}
                    </>
                );
            },
        },
    ];


    const onDeleteAppraisal = (appraisal) => {
        console.log("deleteappraisal", appraisal);
        Modal.confirm({
            title: "Are you sure, you want to delete Appraisal?",
            okText: "Yes",
            okType: "danger",

            onOk: () => {
                AppraisalContext.deleteMidYearAppraisal(appraisal.id)
                    .then((response) => {
                        console.log(response);
                        props.getData()
                    })
                    .catch((error) => {
                        console.log(error.message);
                    });
            },
        });
    };

    return (
        <div
            className="app-tab"
            style={{ width: "100%", paddingLeft: "10px", paddingRight: "10px" }}
        >

            <Row
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    alignContent: "flex-start",
                    backgroundColor: "white",
                    borderRadius: "10px",
                    padding: "10px",
                    marginTop: "10px",
                }}
            >
                
                <Col
                    span={24}
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                        alignContent: "flex-start",
                        color: "black",
                        width: "100rem",
                    }}
                >
                    <h3>{props.title}</h3>
                </Col>

                <Col
                    xl={24}
                    lg={24}
                    md={24}
                    sm={24}
                    xs={24}
                    style={{
                        background: "flex",
                        padding: "10px",
                    }}
                >
                    <Table
                        loading={loading}
                        columns={columns}
                        dataSource={props.appraisalList}
                        bordered={false}
                        pagination={{
                            position: ["bottomCenter"],
                        }}
                        scroll={{ x: 800 }}
                        className="employeeAppraisalTable"
                        style={{ marginLeft: "10px", marginRight: "10px" }}
                        size="small"
                        onClick={() => {
                            onDeleteAppraisal();
                        }}
                    />
                </Col>
            </Row>

            <Modal
                className="viewAppraisalModal"
                footer={null}
                title="Appraisal Form"
                // centered
                open={secondModal}
                visible={secondModal}
                onOk={() => setSecondModal(false)}
                width={800}
                closeIcon={
                    <div
                        onClick={() => {
                            setSecondModal(false);
                        }}
                        style={{ color: "#ffffff" }}
                    >
                        X
                    </div>
                }
            >
                <HalfYearGoalForm
                    currentEmployee={employeeRecord}
                    appraisal={editedAppraisal}
                    setSecondModal={setSecondModal}
                    hrMode={props.listType === "hr"}
                />
            </Modal>

        </div>
    );
};

export default HalfYearGoalTable;
