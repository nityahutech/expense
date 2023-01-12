import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  Modal,
  Table,
  Card,
  message,
  Tag,
  Form,
  Row,
  Col,
  Input,
} from "antd";
import {
  DeleteFilled,
  EyeFilled,
  EditFilled,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import "../../components/assetManagement/RepairRequest.css";
import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/lib/input/TextArea";
import "./RepairRequestTable.css";
import AssetContext from "../../contexts/AssetContext";
import ViewRequestType from "./ViewRequestType";

const divStyle = {
  border: "1px solid #8692A6",
  borderRadius: "4px",
  width: "100%",
};

const onDeleteUpdateRepair = (record) => {
  Modal.confirm({
    title: "Are you sure, you want to delete Laptop Update/Repair Record?",
    okText: "Yes",
    okType: "danger",
    // onOk: () => {
    //     CompanyHolidayContext.deleteHoliday(newHoliday.id, "compId001")
    //         .then(response => {
    //             props.refreshCalendar();
    //             getData();
    //         })
    //         .catch(error => {
    //         })
    // },
  });
};

const modal = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "fixed",
  top: "0",
  left: "0",
  width: " 100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  zIndex: "100",
};

const modalContent = {
  backgroundColor: "white",
  border: "1px solid black",
  width: "50%",
  height: "80%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderRadius: "10px",
  padding: "10px",
};

const modalContent2 = {
  backgroundColor: "white",
  border: "1px solid black",
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderRadius: "10px",
};

const RepairRequestTable = (props) => {
  // console.log("RepairRequestTable props::,");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [repairLaptopData, setRepairLaptopData] = useState(props.data);
  // console.log(repairLaptopData);
  const [modalData, setModalData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const iframeRef = useRef(null);
  const [file, setFile] = useState("");
  const currentUser = JSON.parse(sessionStorage.getItem("user"));

  const showModal = () => {
    setIsEditModalOpen(true);
  };

  function openModal(data) {
    setIsModalOpen(true);
    setModalData(data);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  useEffect(() => {
    setRepairLaptopData(props.data);
    // console.log(getRepairData);
  }, [props.data]);

  // const getRepairData = async () => {
  //   let repairData = await AssetContext.getRepairData(currentUser.uid);
  //   setRepairLaptopData(repairData);
  // };

  const onFinish = (values) => {
    console.log(values, "values");
    form.resetFields();
  };

  function handleChange(event) {
    let file = event.target.files[0];
    console.log("handleupload", file);
    setFile(null);
    const isPdf = file.type === "application/pdf";
    if (!isPdf) {
      message.error("You can only upload Pdf file!");
      return;
    }

    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("File must smaller than 2MB!");
      return;
    }
    setFile(event.target.files[0]);
  }

  const columns = [
    {
      title: "Date ",
      dataIndex: "dateOfRepair",
      key: "dateOfRepair",
      width: 200,
      align: "left",
    },
    {
      title: "Request Type",
      dataIndex: "type",
      key: "type",
      width: 200,
      align: "left",
    },
    {
      title: "Reason",
      dataIndex: "repairDes",
      key: "repairDes",
      width: 200,
      align: "left",
    },
    {
      title: "Status",
      key: "Status",
      width: 200,
      align: "left",
      render: (_, { status }) =>
        status !== "" && (
          <Tag
            style={{ width: "70px", color: "black" }}
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
      title: "Action",
      dataIndex: "operation",
      key: "operation",
      width: 100,
      align: "left",
      render: (_, record) => (
        <>
          <div
            className="employee-button"
            style={{ display: "flex", flexDirection: "row" }}
          >
            <Button
              type="link"
              className="show"
              onClick={() => {
                openModal(record);
              }}
            >
              {<EyeFilled />}
            </Button>

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
                  onClick={() => {}}
                  disabled={record.status == "Approved"}
                />
              }
            </Button>

            <Button
              disabled={record.status == "Approved"}
              type="link"
              className="deleTe"
            >
              <DeleteFilled
                onClick={() => {
                  onDeleteUpdateRepair(record);
                }}
                disabled={record.status == "Approved"}
              />
            </Button>
          </div>
        </>
      ),
    },
  ];

  return (
    <>
      <div className="laptopDiv">
        <Card
          title=" Repair Request / Upgrade Request"
          className="laptopcard"
          bordered={true}
          hoverable={true}
        >
          <Table
            columns={columns}
            pagination={false}
            dataSource={repairLaptopData}
            scroll={{ x: 800 }}
            className="policies"
          />
        </Card>
      </div>
      <Modal
        title="Edit Repair / Update Request"
        open={isEditModalOpen}
        onCancel={() => {
          setIsEditModalOpen(false);
          form.resetFields();
        }}
        cancelText={
          <div className="cancel">
            <CloseOutlined style={{ marginRight: "10px" }} />
            CANCEL
          </div>
        }
        centered
        className="updateModal"
        onOk={() => {
          form.submit();
        }}
        okText={
          <div className="save">
            <CheckOutlined style={{ marginRight: "10px" }} />
            SAVE
          </div>
        }
        closeIcon={
          <div
            onClick={() => {
              setIsEditModalOpen(false);
              form.resetFields();
            }}
            style={{ color: "#ffff" }}
          >
            X
          </div>
        }
      >
        <Form
          className="addEmp"
          form={form}
          layout="vertical"
          labelcol={{
            span: 4,
          }}
          wrappercol={{
            span: 14,
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
          onFinish={onFinish}
        >
          <Row gutter={[32, 0]}>
            <Col span={24}>
              <Form.Item
                name="reasonreapir"
                label="Reason"
                rules={[
                  {
                    required: true,
                    message: "Please enter Reason",
                  },
                  {
                    message: "Please enter Valid Reason",
                  },
                ]}
              >
                <TextArea
                  Rows={4}
                  maxLength={100}
                  autoSize={{ minRows: 4, maxRows: 4 }}
                  placeholder="Max 100 Words"
                  style={divStyle}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <FormItem
                name="photoreapir"
                label="Upload photos if (Physical Damage)"
              >
                <div className="idpage">
                  <Input
                    type="file"
                    accept="application/pdf"
                    id="upload"
                    name="upload"
                    onChange={handleChange}
                    style={{ borderRadius: "5px" }}
                  />
                </div>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Modal>
      <Modal
        centered
        open={isModalOpen}
        footer={null}
        title="REQUEST DETAILS"
        closeIcon={
          <div
            onClick={() => {
              setIsModalOpen(false);
            }}
          >
            X
          </div>
        }
      >
        <ViewRequestType
          setIsModalOpen={setIsModalOpen}
          modalData={modalData}
        />
      </Modal>
    </>
  );
};

export default RepairRequestTable;
