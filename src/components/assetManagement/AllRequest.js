import React, { useState, useEffect } from "react";
import "./AllRequest.css";
import { Table, Button, Tag, Card, Modal } from "antd";
import {
  EyeFilled,
  CheckCircleFilled,
  CloseCircleFilled,
} from "@ant-design/icons";
import ViewRequestType from "./ViewRequestType";
import AssetContext from "../../contexts/AssetContext";
import Checkmark from "../../images/checkmark.png";
import CheckReject from "../../images/rejected.png";

function AllRequest(props) {
  console.log(props, "ektaaaaaaaaaaa");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [repairAllotReq, setRepairAllotReq] = useState(props.data || []);
  console.log(props.data);
  useEffect(() => {
    setRepairAllotReq(props.data);
  }, [props.data]);

  const setStatus = async (record, status) => {
    const updatedRepairRecord = repairAllotReq.map((allotRecord) => {
      if (allotRecord.id === record.id) {
        allotRecord.status = status;
        record.status = status;
      }

      return allotRecord;
    });
    await AssetContext.updateRepairData(record.id, record);
    setRepairAllotReq(updatedRepairRecord);
  };

  function openModal(data) {
    setIsModalOpen(true);
    setModalData(data);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  var filteredPending = [];
  var filteredApprove = [];

  repairAllotReq.forEach((record) => {
    if (record.status == "Pending") {
      filteredPending.push(record);
    } else {
      filteredApprove.push(record);
    }
  });
  console.log(filteredPending);
  console.log(filteredApprove);
  console.log(repairAllotReq);

  const columns2 = [
    // showed in the admin flow

    {
      title: "Employee Code",
      dataIndex: "empCode",
      key: "empCode",
      width: 150,
      align: "left",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 200,
      align: "left",
    },
    {
      title: "Date",
      dataIndex: "dateOfRepair",
      key: "dateOfRepair",
      width: 150,
      align: "left",
    },
    {
      title: "Request Type",
      dataIndex: "type",
      key: "type",
      width: 150,
      align: "left",
    },
    {
      title: "Status",
      key: "Status",
      width: 120,
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
                : status === "Reject"
                ? "#f44336"
                : "rgb(244 209 105)"
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
      width: 170,
      align: "center",
      render: (_, record) => (
        <>
          <div
            className="employee-button"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Button
              onClick={() => openModal(record)}
              type="link"
              className="show"
              style={
                record.status == "Approved" || "Reject"
                  ? { marginLeft: "2rem", color: "#000000" }
                  : { marginLeft: "1rem", color: "#000000" }
              }
            >
              {<EyeFilled />}
            </Button>

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

  return (
    <div>
      <Card>
        <Table
          size="small"
          columns={columns2}
          dataSource={filteredPending}
          className="assetTable"
        />
        <Table
          size="small"
          columns={columns2}
          dataSource={filteredApprove}
          className="assetTable"
        />
        <Modal
          destroyOnClose
          centered
          open={isModalOpen}
          footer={null}
          title="REQUEST DETAILS"
          closeIcon={
            <div
              onClick={() => {
                setIsModalOpen(false);
              }}
              style={{ color: "#ffff" }}
            >
              X
            </div>
          }
          className="updateModal"
        >
          <ViewRequestType
            setIsModalOpen={setIsModalOpen}
            modalData={modalData}
          />
        </Modal>
      </Card>
    </div>
  );
}

export default AllRequest;
