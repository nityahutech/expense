import { React, useState } from "react";
import {
  Card,
  Row,
  Col,
  Button,
  Input,
  Form,
  Table,
  DatePicker,
  TextArea,
  Space,
  Divider,
  Tooltip,
  Tag,
  Modal,
} from "antd";
import {
  MinusCircleOutlined,
  PlusOutlined,
  CheckOutlined,
  CloseOutlined,
  EyeFilled,
  EditFilled,
} from "@ant-design/icons";
import "./invoice.css";
import FormItem from "antd/es/form/FormItem";
import moment from "moment";
import InvoiceContext from "../../contexts/InvoiceContext";
import EmpInfoContext from "../../contexts/EmpInfoContext";
import {
  showNotification,
  checkAlphabets,
  createUser,
} from "../../contexts/CreateContext";
import { useEffect } from "react";
import Checkmark from "../../images/checkmark.png";
import CheckReject from "../../images/rejected.png";
import ViewInvoiceDetails from "./ViewInvoiceDetails";
import EditInvoiceDetails from "./EditInvoiceDetails";
import { async } from "@firebase/util";

function InvoiceReimbursement(props) {
  console.log(props);
  const [AddExpense, setAddExpense] = useState(false);
  const [file, setFile] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [invoiceDetails, setInvoiceDetails] = useState([]);
  const [invoiceData, setInvoiceData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState({});
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const currentUser = JSON.parse(sessionStorage.getItem("user"));
  const role = sessionStorage.getItem("role");

  const onFinish = (values) => {
    console.log(values, "ektaaaaaaaa");
    const allInvoiceData = {
      invoiceName: values.invoiceName,
      totalAmt: values.totalAmt,
      invoiceDate: moment().format("DD-MM-YYYY"),
      status: "Pending",
      empId: currentUser.uid,
      empCode: user.empId,
      name: user.name,
      payments: values.users.map((pay) => {
        console.log(pay);
        return {
          ...pay,
          paymentDate: pay.paymentDate.format("DD-MM-YYYY"),
          upload: pay.upload,
        };
      }),
    };
    console.log(allInvoiceData, file, "pujaaaaaaaa");
    try {
      InvoiceContext.addInvoice(allInvoiceData, file);
      showNotification("success", "Success", "Invoice Request Added");
      setTimeout(() => {
        getAllInvoiceData();
        setFile([]);
        setAddExpense(false);
        form.resetFields();
      }, 5000);
    } catch (error) {
      showNotification("error", "Error", "Error In Invoice");
    }
  };

  useEffect(() => {
    getAllInvoiceData();
  }, [props.roleView]);

  // useEffect(() => {
  //   setInvoiceDetails();
  // }, []);

  const getAllInvoiceData = async () => {
    let invoiceData = await InvoiceContext.getInvoice(createUser.uid);
    let userData = await EmpInfoContext.getEduDetails(currentUser.uid);
    setUser(userData);
    setInvoiceDetails(invoiceData);
  };

  const setStatus = async (record, status) => {
    const updateInvoiceReocrd = invoiceDetails.map((allotInvoice) => {
      if (allotInvoice.id == record.id) {
        allotInvoice.status = status;
        record.status = status;
      }
      return allotInvoice;
    });
    await InvoiceContext.updateInvoiceData(record.id, record);
    setInvoiceDetails(updateInvoiceReocrd);
  };

  const invoiceColumns = [
    {
      title: "Employee Code",
      dataIndex: "empCode",
      key: "empCode",
      width: 200,
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
      title: "Invoice Date ",
      dataIndex: "invoiceDate",
      key: "invoiceDate",
      width: 200,
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
      width: 150,
      align: "left",
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

  const columns = [
    {
      title: "Invoice Date ",
      dataIndex: "invoiceDate",
      key: "invoiceDate",
      width: 200,
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
      width: 200,
      align: "left",
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
      width: 100,
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
                  openModal(record);
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
                // onClick={() => {
                //   showModal(record);
                // }}
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

  function handleChange(event, i) {
    const isLt2M = file.size / 1024 / 1024 < 2;
    // if (!isLt2M) {
    //   message.error('File must smaller than 2MB!');
    //   return
    // }
    let temp = [...file];
    temp[i] = event.target.files[0];
    setFile(temp);
    console.log(temp);
  }

  function openModal(data) {
    setIsModalOpen(true);
    setInvoiceData(data);
  }

  const showModal = (data) => {
    setIsEditModalOpen(true);
    setInvoiceData(data);
    // setRepairLaptopData(repairLaptopData);
  };

  var filteredPending = [];
  var filteredApprove = [];

  invoiceDetails.forEach((record) => {
    if (record.status == "Pending") {
      filteredPending.push(record);
    } else {
      filteredApprove.push(record);
    }
  });

  return (
    <div className="invoiceCardDiv">
      {props.roleView == "emp" ? (
        <>
          <Card
            className="invoiceCard1"
            bordered="true"
            title="Invoice Reimbursement"
          >
            <Form
              layout="vertical"
              className="invoiceForm"
              onFinish={onFinish}
              form={form}
            >
              <Row span={24} gutter={[16, 16]}>
                <Col span={12}>
                  <FormItem
                    maxLength={25}
                    label="Invoice Reimbursement Title"
                    name="invoiceName"
                    onKeyPress={(event) => {
                      if (checkAlphabets(event)) {
                        event.preventDefault();
                      }
                    }}
                    rules={[
                      {
                        required: true,
                        message: "Please Enter Invoice",
                      },
                      {
                        pattern: /^[a-zA-Z\s]*$/,
                        message: "Please Enter Valid Title",
                      },
                    ]}
                  >
                    <Input />
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem label="Total Amount" name="totalAmt">
                    <Input disabled={true} value={totalAmount || 0} />
                  </FormItem>
                </Col>

                {AddExpense ? (
                  <Col span={24}>
                    <Row gutter={[16, 16]}>
                      <Form.List name="users">
                        {(fields, { add, remove }) => {
                          return (
                            <div style={{ width: "100%" }}>
                              {fields.map((field, i) => (
                                <>
                                  <Space
                                    key={field.key}
                                    style={{ display: "flex", marginBottom: 8 }}
                                    align="start"
                                  >
                                    <Row gutter={[16, 16]}>
                                      <Divider
                                        orientation="left"
                                        orientationMargin="15px"
                                        style={{ margin: "0px" }}
                                      >
                                        Expenditure No.{i + 1}
                                      </Divider>
                                      <Col span={4}>
                                        <Form.Item
                                          label="Date of Payment"
                                          {...field}
                                          name={[field.name, "paymentDate"]}
                                          // fieldKey={[field.fieldKey, "payment"]}
                                          rules={[
                                            {
                                              required: true,
                                              message: "Missing Payment Date",
                                            },
                                          ]}
                                        >
                                          <DatePicker format={"DD-MM-YYYY"} />
                                        </Form.Item>
                                      </Col>
                                      <Col span={6}>
                                        <Form.Item
                                          label="Amount"
                                          {...field}
                                          name={[field.name, "amount"]}
                                          // fieldKey={[field.fieldKey, "amount"]}
                                          rules={[
                                            {
                                              required: true,
                                              message: "Missing Amount",
                                            },
                                            {
                                              pattern: /^[0-9\s]*$/,
                                              message:
                                                "Please Enter Valid Title",
                                            },
                                          ]}
                                        >
                                          <Input
                                            placeholder="Enter Amount"
                                            maxLength={10}
                                            onChange={(e) => {
                                              // console.log(e.target.value);
                                              // const amt = e.target.value;
                                              // setAmount(amt);
                                              let temp = 0;
                                              fields.map((field) => {
                                                let data = form.getFieldValue([
                                                  "users",
                                                  field.name,
                                                  "amount",
                                                ]);
                                                temp = temp + Number(data);
                                              });

                                              form.setFieldsValue({
                                                totalAmt: temp,
                                              });
                                            }}
                                          />
                                        </Form.Item>
                                      </Col>
                                      <Col span={6}>
                                        <Form.Item
                                          label="Description"
                                          {...field}
                                          name={[field.name, "description"]}
                                          // fieldKey={[
                                          //   field.fieldKey,
                                          //   "description",
                                          // ]}
                                          rules={[
                                            {
                                              required: true,
                                              message: "Missing Description",
                                            },
                                          ]}
                                        >
                                          <Input placeholder="Enter Description" />
                                        </Form.Item>
                                      </Col>
                                      <Col span={6}>
                                        <FormItem
                                          label="Upload Image"
                                          {...field}
                                          name={[field.name, "upload"]}
                                          // fieldKey={[field.fieldKey, "upload"]}
                                          // rules={[
                                          //   {
                                          //     required: true,
                                          //     message: "Missing Images",
                                          //   },
                                          // ]}
                                        >
                                          <div className="idpage">
                                            <Input
                                              type="file"
                                              accept="application/pdf"
                                              id="upload"
                                              name="upload"
                                              onChange={(e) =>
                                                handleChange(e, i)
                                              }
                                              style={{ borderRadius: "5px" }}
                                            />
                                          </div>
                                        </FormItem>
                                      </Col>
                                      <Col span={2} className="actionButton">
                                        <MinusCircleOutlined
                                          onClick={() => {
                                            remove(field.name);
                                            let temp = [...file];
                                            // delete temp[i];
                                            temp.splice(i, 1);
                                            console.log(temp);
                                            setFile(temp);
                                          }}
                                        />
                                      </Col>
                                    </Row>
                                  </Space>
                                </>
                              ))}
                              <Col span={24}>
                                <Button
                                  className="addField"
                                  onClick={() => {
                                    add();
                                  }}
                                  block
                                >
                                  <PlusOutlined /> Add field
                                </Button>
                              </Col>
                            </div>
                          );
                        }}
                      </Form.List>
                      <Col span={24} className="formButton">
                        <Button
                          type="text"
                          style={{ marginRight: "10px" }}
                          onClick={() => {
                            setAddExpense(false);
                            form.resetFields();
                            setFile([]);
                          }}
                        >
                          <CloseOutlined />
                          Cancel
                        </Button>
                        <Button
                          htmlType="submit"
                          style={{
                            border: "1px solid #1963A6",
                            background: "#1963A6",
                            color: "#ffffff",
                            fontSize: "15",
                            lineHeight: "17px",
                            // width: "119px",
                          }}
                          type="primary"
                        >
                          <CheckOutlined />
                          Submit
                        </Button>
                      </Col>
                      {/* </Form> */}
                    </Row>
                  </Col>
                ) : (
                  <Button
                    className="addButton"
                    onClick={() => {
                      setAddExpense(true);
                    }}
                    block
                  >
                    <PlusOutlined style={{ fontSize: "16px" }} /> Add Expenses
                  </Button>
                )}
              </Row>
            </Form>
          </Card>

          <Card title="Request Table" className="invoiceCard2">
            <Table
              className="invoiceTable"
              columns={columns}
              dataSource={invoiceDetails}
            />
          </Card>
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
          <Modal
            destroyOnClose
            centered
            open={isEditModalOpen}
            footer={null}
            title="INVOICE DETAILS"
            width={750}
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
            className="updateModal"
          >
            {console.log(invoiceData)}
            <EditInvoiceDetails
              getData={getAllInvoiceData}
              invoiceData={invoiceData}
              setIsEditModalOpen={setIsEditModalOpen}
            />
          </Modal>
        </>
      ) : (
        <>
          <Table
            className="invoiceTable"
            columns={invoiceColumns}
            dataSource={filteredPending}
          />
          <Table
            className="invoiceTable"
            columns={invoiceColumns}
            dataSource={filteredApprove}
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
        </>
      )}
    </div>
  );
}

export default InvoiceReimbursement;
