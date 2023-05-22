import React, { useState, useEffect } from "react";
import "./RepairRequestTable.css";
import { Table, Button, Tag, Card, Modal, Row, Col, Input } from "antd";
import {
  EyeFilled,
  SearchOutlined
} from "@ant-design/icons";
import ViewRequestType from "./ViewRequestType";
import Checkmark from "../../images/checkmark.png";
import CheckReject from "../../images/rejected.png";
import RequestContext from "../../contexts/RequestContext";

function AllRequest(props) {
  console.log(props.data, "ektaaaaaaaaaaa");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [repairAllotReq, setRepairAllotReq] = useState(props.data || []);
  const [filterRequest, setFilterRequest] = useState([])
  const loading = props.loading

  useEffect(() => {
    setRepairAllotReq(props.data);
  }, [props.data]);

  const setStatus = async (record, status) => {
    Modal.confirm({
      title: `Are you sure, you want to  ${status == "Approved" ? "approve" : "reject"
        } this request?`,
      okText: "Yes",
      okType: "danger",
      onOk: async () => {
        const updatedRepairRecord = repairAllotReq.map((allotRecord) => {
          if (allotRecord.id === record.id) {
            allotRecord.status = status;
            record.status = status;
          }

          return allotRecord;
        });
        await RequestContext.updateRepairData(record.id, record);
        setRepairAllotReq(updatedRepairRecord);
      },
    });
  };

  function openModal(data) {
    setIsModalOpen(true);
    setModalData(data);
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


  console.log('repairAllotReq', repairAllotReq)

  // const searchChange = (e) => {
  //   let search = e.target.value
  //   console.log('formData', search)
  //   if (search) {
  //     let result = filteredApprove.filter((ex) =>
  //       ex?.date?.toLowerCase().includes(search?.toLowerCase()) ||
  //       ex?.type?.toLowerCase().includes(search?.toLowerCase())

  //     )
  //     console.log('formData', result)
  //     const modifiedFilterRequest = [...result];
  //     setFilterRequest(modifiedFilterRequest)
  //   }
  //   else {
  //     setFilterRequest(filteredApprove)
  //   }
  // }


  const columns2 = [
    {
      title: "Employee Code",
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
      dataIndex: "date",
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
      fixed: 'right',
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

  const tableProps = {
    loading,
  };


  return (
    <Card className="daily">
      <Table
         {...tableProps}
        size="small"
        columns={columns2}
        dataSource={filteredPending}
        className="assetTable"
        scroll={{ x: 600 }}
      />
      <Row gutter={10} style={{ justifyContent: "space-between" }}>
        <Col sm={24} md={8}>
          <Input
            className="daily"
            placeholder="Search"
            prefix={<SearchOutlined />}
          // onChange={searchChange}

          />
        </Col>
      </Row>
      <Table
         {...tableProps}
        size="small"
        columns={columns2}
        dataSource={filteredApprove}
        className="assetTable"
        scroll={{ x: 600 }}
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
  );
}

export default AllRequest;
