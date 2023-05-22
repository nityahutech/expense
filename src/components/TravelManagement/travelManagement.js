import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  Tooltip,
  Tag,
  Modal,
  DatePicker,
  Card,
  Input,
  Row,
  Col
} from "antd";
import {
  EyeFilled,
  SearchOutlined
} from "@ant-design/icons";
import "./travelManagement.css";
import Checkmark from "../../images/checkmark.png";
import CheckReject from "../../images/rejected.png";
import ViewTravelMng from "./ViewTravelMng";
import TravelContext from "../../contexts/TravelContext";

const { RangePicker } = DatePicker;

function TravelManagement(props) {
  console.log("props", props);
  const loading = props.loading
  const [travelDetails, setTravelDetails] = useState(props?.travelDetails || []);
  const [durationArray, setDurationArray] = useState(props?.durationArray || []);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [viewTravelData, setViewTravelData] = useState({});
  const [filteredPending, setFilteredPending] = useState([]);
  const [filteredApprove, setFilteredApprove] = useState([]);
  const [filterRequest, setFilterRequest] = useState(filteredApprove || [])

  console.log(props.roleView);
  console.log('eeeeeeee', durationArray, travelDetails)

  function viewModal(data) {
    setOpenViewModal(true);
    setViewTravelData(data);

  }

  const setStatus = async (record, status) => {
    Modal.confirm({
      title: `Are you sure, you want to ${status == "Approved" ? "approve" : "reject"
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
        setTravelDetails(updateTravelRecord);
        props.getTravelData();
      },
    });
  };

  const columns = [
    {
      title: "Employee Code ",
      dataIndex: "empCode",
      key: "empCode",
      width: 120,
      align: "left",
    },
    {
      title: "Employee Name",
      dataIndex: "empName",
      key: "empName",
      width: 150,
      align: "left",
    },
    {
      title: "Travel Title",
      dataIndex: "travelName",
      key: "travelName",
      width: 100,
      align: "left",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      width: 150,
      align: "left",
      render: (_, record, index) => {
        let temp = durationArray[index];
        // return temp[0];
        return Array.isArray(temp) && temp.length > 0 ? temp[0] : null;
      },
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      width: 150,
      align: "left",
      render: (_, record, index) => {
        let temp = durationArray[index];
        // return temp[temp.length - 1];
        return Array.isArray(temp) ? temp[temp.length - 1] : null;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 100,
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
      width: 150,
      align: "center",
      fixed: 'right',
      render: (_, record) => (
        <>
          <div
            className="employee-button"
            style={{ display: "flex", flexDirection: "row", justifyContent: "center", }}
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
    setFilterRequest(filteredApprove);
  }, [props.travelDetails,filteredApprove]);

  useEffect(() => {
    const tempFilteredPending = [];
    const tempFilteredApprove = [];

    travelDetails.forEach((record) => {
      if (record.status === 'Pending') {
        tempFilteredPending.push(record);
      } else {
        tempFilteredApprove.push(record);
      }
    });

    setFilteredPending(tempFilteredPending);
    setFilteredApprove(tempFilteredApprove);
  }, [travelDetails]);

  const tableProps = {
    loading,
  };

  const searchChange = (e) => {
    let search = e.target.value
    console.log('formData', search)
    if (search) {
      let result = filteredApprove.filter((ex) =>
        ex?.date?.toLowerCase().includes(search?.toLowerCase()) ||
        ex?.travelName?.toLowerCase().includes(search?.toLowerCase()) ||
        ex?.empName?.toLowerCase().includes(search?.toLowerCase())
      )
      console.log('formData', result)
      const modifiedFilterRequest = [...result];
      setFilterRequest(modifiedFilterRequest)
    }
    else {
      setFilterRequest(filteredApprove)
    }
  }


  return (

    <Card className="daily">
      <Table
        {...tableProps}
        className="travelTable"
        columns={columns}
        dataSource={filteredPending}
        scroll={{ x: 600 }}
      />
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
        className="travelTable"
        columns={columns}
        dataSource={filterRequest}
        scroll={{ x: 600 }}
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
    </Card>

  );
}

export default TravelManagement;
