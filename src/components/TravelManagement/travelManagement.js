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
  UserAddOutlined,
} from "@ant-design/icons";
import "./travelManagement.css";
// import { EyeFilled, EditFilled } from "@ant-design/icons";
import Checkmark from "../../images/checkmark.png";
import CheckReject from "../../images/rejected.png";
import ViewTravelMng from "./ViewTravelMng";
import TravelContext from "../../contexts/TravelContext";

const { RangePicker } = DatePicker;

function TravelManagement(props) {
  console.log("props", props);
  const [travelDetails, setTravelDetails] = useState(props.travelDetails || []);
  const [durationArray, setDurationArray] = useState(props.durationArray || []);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [viewTravelData, setViewTravelData] = useState({});

  const [user, setUser] = useState({});

  console.log(props.roleView);

  function viewModal(data) {
    setOpenViewModal(true);
    setViewTravelData(data);
  }

  const setStatus = async (record, status) => {
    Modal.confirm({
      title: `Are you sure, you want to ${
        status == "Approved" ? "approve" : "reject"
      } this request?`,
      okText: "Yes",
      okType: "danger",
      onOk: async () => {
        const updateTravelRecord = travelDetails.map((allotTravel) => {
          if (allotTravel.id == record.id) {
            allotTravel.status = status;
            record.status = status;
          }
          return allotTravel;
        });
        await TravelContext.updateTravelData(record.id, record);
        // setTravelDetails(updateTravelRecord);
        props.getTravelData();
      },
    });
  };

  const columns = [
    {
      title: "Employee Code ",
      dataIndex: "empCode",
      key: "empCode",
      width: 200,
      align: "left",
    },
    {
      title: "Employee Name",
      dataIndex: "empName",
      key: "empName",
      width: 200,
      align: "left",
    },
    {
      title: "Travel Title",
      dataIndex: "travelName",
      key: "travelName",
      width: 200,
      align: "left",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      width: 200,
      align: "left",
      render: (_, record, index) => {
        let temp = durationArray[index];
        return temp[0];
      },
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      width: 200,
      align: "left",
      render: (_, record, index) => {
        let temp = durationArray[index];
        return temp[temp.length - 1];
      },
    },
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
      align: "center",
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
            <Button
              style={
                record.status == "Pending"
                  ? {
                      padding: 0,
                      color: "rgb(39 151 44 / 74%)",
                    }
                  : { display: "none" }
              }
              type="link"
              className="show"
              onClick={() => {
                setStatus(record, "Approved");
              }}
            >
              <img src={Checkmark} />
            </Button>
            <Button
              style={record.status == "Pending" ? null : { display: "none" }}
              type="link"
              className="deleTe"
              onClick={() => {
                setStatus(record, "Reject");
              }}
            >
              <img src={CheckReject} width={20} />
            </Button>
          </div>
        </>
      ),
    },
  ];

  useEffect(() => {
    setTravelDetails(props.travelDetails);
    setDurationArray(props.durationArray);
  }, [props.travelDetails]);

  var filteredPending = [];
  var filteredApprove = [];

  travelDetails.forEach((record) => {
    if (record.status == "Pending") {
      filteredPending.push(record);
    } else {
      filteredApprove.push(record);
    }
  });

  return (
    <>
      <div className="travelDiv">
        <>
          <Table
            className="travelTable"
            columns={columns}
            dataSource={filteredPending}
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
          <Table
            className="travelTable"
            columns={columns}
            dataSource={filteredApprove}
          />
        </>
      </div>
    </>
  );
}

export default TravelManagement;
