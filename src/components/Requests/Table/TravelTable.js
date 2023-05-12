import React, { useState, useEffect } from "react";
import {
    Card,
    Button,
    Table,
    Tooltip,
    Tag,
    Modal,
    Space,
    Row,
    Divider,
    Col,
    Form,
    Input,
    DatePicker,
    Select,
    Switch,
} from "antd";

import {
    MinusCircleOutlined,
    PlusOutlined,
    CheckOutlined,
    CloseOutlined,
    EyeFilled,
    EditFilled,
} from "@ant-design/icons";
import "../travelManagement.css";
import {
    checkAlphabets,
    showNotification,
    capitalize,
} from "../../../contexts/CreateContext";
import TravelContext from "../../../contexts/TravelContext";
import TravelManagement from "./travelManagement";
import moment from "moment";
import EmpInfoContext from "../../../contexts/EmpInfoContext";
import ViewTravelMng from "../Form/ViewTravelMng";

import EditTravelMng from "./EditTravelMng";

const { RangePicker } = DatePicker;

function TravelTable(props) {
    console.log('travelsss', props.travelDetails)
    const [addTravel, setAddTravel] = useState(false);
    const [travelData, setTavelData] = useState(props.travelDetails);
    const [selectedOption, setSelectedOption] = useState([]);
    const [form] = Form.useForm();
    const [file, setFile] = useState([]);
    const [travelDetails, setTravelDetails] = useState(props.travelDetails || []);
    const [user, setUser] = useState({});
    const [viewTravelData, setViewTravelData] = useState({});

    const [openViewModal, setOpenViewModal] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    // const role = props.roleView == "emp";
    // console.log(props.roleView);
    const { TextArea } = Input;
    const { RangePicker } = DatePicker;

    const currentUser = JSON.parse(sessionStorage.getItem("user"));

    function viewModal(data) {
        setOpenViewModal(true);
        setViewTravelData(data);
    }

    function showModal(data) {
        setIsEditModalOpen(true);
        setViewTravelData(data);
    }

    const travelColumns = [
        {
            title: "Date ",
            dataIndex: "date",
            key: "date",
            width: 200,
            align: "left",
        },
        {
            title: "Request Type",
            dataIndex: "travelName",
            key: "travelName",
            width: 200,
            align: "left",
        },
        // {
        //     title: "Duration",
        //     dataIndex: "durationDate",
        //     key: "durationDate",
        //     width: 200,
        //     align: "left",
        //     render: (_, record, index) => {
        //         console.log("record", record);
        //         let temp = durationArray[index];
        //         let numberOfDays = moment(temp[temp.length - 1], "DD-MM-YYYY").diff(
        //             moment(temp[0], "DD-MM-YYYY"),
        //             "days"
        //         );

        //         return <div>{numberOfDays + 1}</div>;
        //     },
        // },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            width: 200,
            align: "left",
            render: (_, { status }) =>
                status !== "" && (
                    <Tag
                        style={{
                            width: "84px",
                            color: "#000000",
                            borderRadius: "10px",
                            display: "flex",
                            justifyContent: "center",
                            padding: "2px",
                        }}
                        className="statusTag"
                        color={
                            status === "Approved"
                                ? "rgb(8 231 68 / 75%)"
                                : status === "Pending"
                                    ? "rgb(244 209 105)"
                                    : "#f44336"
                        }
                        key={status}
                    >
                        {status}
                    </Tag>
                ),
        },
        {
            title: "Action",
            dataIndex: "operation",
            key: "operation",
            width: 200,
            align: "left",
            render: (_, record) => (
                <>
                    <div
                        className="employee-button"
                        style={{ display: "flex", flexDirection: "row" }}
                    >
                        <Tooltip placement="bottom" title="View" color="#1963A6">
                            <Button
                                type="link"
                                className="show"
                                onClick={() => {
                                    viewModal(record);
                                }}
                            >
                                {<EyeFilled style={{ color: "#000000" }} />}
                            </Button>
                        </Tooltip>
                        {record.status == "Approved" || record.status == "Reject" ? (
                            <Button
                                disabled={
                                    record.status == "Approved" || record.status == "Reject"
                                }
                                style={{ padding: 0, color: "rgb(64, 169, 255)" }}
                                type="link"
                                className="show"
                            >
                                {
                                    <EditFilled
                                        style={
                                            record.status == "Approved" || record.status == "Reject"
                                                ? { color: "lightgray" }
                                                : null
                                        }
                                        disabled={
                                            record.status == "Approved" || record.status == "Reject"
                                        }
                                    />
                                }
                            </Button>
                        ) : (
                            <Tooltip placement="bottom" title="Edit" color="#1963A6">
                                <Button
                                    disabled={record.status == "Approved"}
                                    style={{ padding: 0, color: "rgb(64, 169, 255)" }}
                                    type="link"
                                    className="show"
                                    onClick={() => {
                                        showModal(record);
                                    }}
                                >
                                    {
                                        <EditFilled
                                            style={
                                                record.status == "Approved"
                                                    ? { color: "lightgray" }
                                                    : null
                                            }
                                            disabled={record.status == "Approved"}
                                        />
                                    }
                                </Button>
                            </Tooltip>
                        )}
                    </div>
                </>
            ),
        },
    ];


    return (
        <>
            <div className="travelDiv">
                <>
                    <Table
                        className="travelTable"
                        columns={travelColumns}
                        dataSource={travelDetails}
                    />
                    <Modal
                        bodyStyle={{
                            height: 530,
                            overflowY: "scroll",
                            overflowX: "hidden",
                        }}
                        destroyOnClose
                        centered
                        open={openViewModal}
                        footer={null}
                        title="TRAVEL DETAILS"
                        closeIcon={
                            <div
                                onClick={() => {
                                    setOpenViewModal(false);
                                }}
                                style={{ color: "#ffff" }}
                            >
                                X
                            </div>
                        }
                        className="viewModal"
                    >
                        <ViewTravelMng
                            setOpenViewModal={setOpenViewModal}
                            viewTravelData={viewTravelData}
                        />
                    </Modal>
                    <Modal
                        bodyStyle={{
                            height: 530,
                            overflowY: "scroll",
                            overflowX: "hidden",
                        }}
                        width={850}
                        destroyOnClose
                        centered
                        open={isEditModalOpen}
                        footer={null}
                        title="TRAVEL DETAILS"
                        closeIcon={
                            <div
                                onClick={() => {
                                    setIsEditModalOpen(false);
                                }}
                                style={{ color: "#ffff" }}
                            >
                                X
                            </div>
                        }
                        className="editModal"
                    >
                        <EditTravelMng
                            getData={travelData}
                            setIsEditModalOpen={setIsEditModalOpen}
                            viewTravelData={viewTravelData}
                        />
                    </Modal>
                </>
            </div>
        </>
    );
}

export default TravelTable;
