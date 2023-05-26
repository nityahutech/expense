import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  Tooltip,
  Tag,
  Modal,
  Card,
  Input,
  Row,
  Col,
} from "antd";
import { EyeFilled, SearchOutlined } from "@ant-design/icons";
import "./invoice.css";
import ViewInvoiceDetails from "./ViewInvoiceDetails";
import InvoiceContext from "../../contexts/InvoiceContext";
import Checkmark from "../../images/checkmark.png";
import CheckReject from "../../images/rejected.png";

function InvoiceTable(props) {
  const [empInvoiceTable, setEmpInvoiceTable] = useState(
    props.invoiceDetails || []
  );
  const loading = props.loading
  const [invoiceData, setInvoiceData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState({});
  const [filteredPending, setFilteredPending] = useState([])
  const [filteredApprove, setFilteredApprove] = useState([])
  const [filterRequest, setFilterRequest] = useState(filteredApprove || [])

  console.log('eeeeeeee', empInvoiceTable)
  function openModal(data) {
    setIsModalOpen(true);
    setInvoiceData(data);
  }

  const setStatus = async (record, status) => {
    Modal.confirm({
      title: `Are you sure, you want to ${status == "Approved" ? "approve" : "reject"
        } this request?`,
      okText: "Yes",
      okType: "danger",
      onOk: async () => {
        const updateInvoiceReocrd = empInvoiceTable.map((allotInvoice) => {
          if (allotInvoice.id == record.id) {
            allotInvoice.status = status;
            record.status = status;
          }
          return allotInvoice;
        });
        await InvoiceContext.updateInvoiceData(record.id, record);
        setEmpInvoiceTable(updateInvoiceReocrd);
      },
    });
  };

  useEffect(() => {
    setEmpInvoiceTable(props.invoiceDetails);
    setUser(props.user);
    setFilterRequest(filteredApprove)

  }, [props.invoiceDetails, filteredApprove]);


  const invoiceColumns = [
    {
      title: "Employee Code",
      dataIndex: "empCode",
      key: "empCode",
      width: 120,
      align: "left",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 150,
      align: "left",
    },

    {
      title: "Invoice Date ",
      dataIndex: "date",
      key: "invoiceDate",
      width: 100,
      align: "left",
    },
    {
      title: "Invoice Name",
      dataIndex: "invoiceName",
      key: "invoiceName",
      width: 200,
      align: "left",
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmt",
      key: "totalAmt",
      width: 100,
      align: "left",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 100,
      align: "center",
      render: (_, { status }) =>
        status !== "" && (
          <Tag
            style={{
              width: "100%",
              color: "#000000",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "center",
              // padding: "2px",
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
      fixed: "right",
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
                  openModal(record);
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
    const tempFilteredPending = [];
    const tempFilteredApprove = [];

    empInvoiceTable.forEach((record) => {
      if (record.status === 'Pending') {
        tempFilteredPending.push(record);
      } else {
        tempFilteredApprove.push(record);
      }
    });

    setFilteredPending(tempFilteredPending);
    setFilteredApprove(tempFilteredApprove);


  }, [empInvoiceTable])


  const tableProps = {
    loading,
  };

  console.log('eeeeee', filteredApprove)
  const searchChange = (e) => {
    let search = e.target.value
    if (search) {
      let result = filteredApprove.filter((ex) =>
        ex?.date?.toLowerCase().includes(search?.toLowerCase()) ||
        ex?.name?.toLowerCase().includes(search?.toLowerCase()) ||
        ex?.invoiceName?.toLowerCase().includes(search?.toLowerCase())

      )
      const modifiedFilterRequest = [...result]
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
        className="invoiceTable"
        columns={invoiceColumns}
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
        className="invoiceTable"
        columns={invoiceColumns}
        dataSource={filterRequest}
        scroll={{ x: 600 }}
      />
      <Modal
        destroyOnClose
        centered
        open={isModalOpen}
        footer={null}
        title="INVOICE DETAILS"
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
        <ViewInvoiceDetails
          setIsModalOpen={setIsModalOpen}
          invoiceData={invoiceData}
        />
      </Modal>
    </Card>
  );
}

export default InvoiceTable;
