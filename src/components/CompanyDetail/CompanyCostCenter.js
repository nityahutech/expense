import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Col,
  Row,
  Button,
  Card,
  Table,
  Modal,
  Divider,
} from "antd";
import {
  EditFilled,
  DeleteOutlined,
  CloseOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import "../../style/CostCenter.css";
import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/lib/input/TextArea";
import { capitalize, checkAlphabets, checkAlphabetsName, showNotification } from "../../contexts/CreateContext";
import CompanyProContext from "../../contexts/CompanyProContext";
import { useAuth } from "../../contexts/AuthContext";

function CostCenter(props) {
  const [isCostModalOpen, setIsCostModalOpen] = useState(false);
  const [isCostEditModalOpen, setIsCostEditModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const [costCenters, setCostCenters] = useState([]);
  const [costEditCenter, setEditCostCenter] = useState({});
  const {compId} = useAuth();

  const onFinishEdit = async (values) => {
    console.log(values, "editttttt");
    let newCostCenterTemp = {
      costName: values.costName,
      costcentercode: values.costcentercode,
      costDescription: values.costDescription,
    };
    console.log(newCostCenterTemp);
    try {
      await CompanyProContext.editCompInfo(compId, {costCenters: costEditCenter}, {costCenters: newCostCenterTemp})
      showNotification("success", "Success", "Edit Successful");
      getAllCostCenters();
      setIsCostEditModalOpen(false);
    } catch (error) {
      showNotification("error", "Error", "Failed to edit");
    }
  };

  const onFinishForm = async (values) => {
    let matchingCostCenter = costCenters.filter(
      (item) => item.costcentercode === values.costcentercode
    );
    if (matchingCostCenter.length > 0) {
      showNotification("error", "Error", "This Cost Center already exists!");
      return;
    }
    console.log("costcenter", values);
    let costCenterDetails = {
      costName: values.costName,
      costcentercode: values.costcentercode,
      costDescription: values.costDescription,
    };
    try {
      await CompanyProContext.addCompInfo(compId, {costCenters: costCenterDetails});
      showNotification("success", "Success", "Cost Center Details Added");
      getAllCostCenters();
      setIsCostModalOpen(false);
    } catch (error) {
      showNotification("error", "Error", "Error In cost center");
    }
  };

  const getAllCostCenters = async () => {
    let data = await CompanyProContext.getCompanyProfile(compId)
    console.log(compId, data);
    setCostCenters(data.costCenters || []);
  };

  useEffect(() => {
    getAllCostCenters();
  }, []);

  const onDeleteCostCenter = async (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete Cost Center details?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        CompanyProContext.deleteCompInfo(compId, {costCenters : record})
        getAllCostCenters();
      },
    });
  };

  const columns = [
    {
      title: "Cost Center Code",
      dataIndex: "costcentercode",
      key: "costcentercode",
      width: 150,
      align: "left",
    },
    {
      title: "Name",
      key: "costName",
      dataIndex: "costName",
      width: 140,
      align: "left",
    },
    {
      title: "Description",
      key: "costDescription",
      dataIndex: "costDescription",
      width: 140,
      align: "left",
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "action",
      width: 80,
      align: "left",
      fixed: "right",
      render: (_, record) => {
        return (
          <>
            <Row gutter={[0, 0]} style={{ display: "flex" }}>
              <Col xs={22} sm={15} md={8}>
                <Button
                  style={{
                    color: " #007ACB",
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "35px",
                    height: "36px",
                    background: "#EEEEEE",
                    borderRadius: "10px",
                  }}
                  onClick={() => {
                    setEditCostCenter(record);
                    editForm.resetFields();
                    setIsCostEditModalOpen(true);
                  }}
                >
                  <EditFilled />
                </Button>
              </Col>
              <Col xs={22} sm={15} md={8}>
                <Button
                  onClick={() => onDeleteCostCenter(record)}
                  style={{
                    color: " #007ACB",
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "35px",
                    height: "36px",
                    background: "#EEEEEE",
                    borderRadius: "10px",
                    marginLeft: "20px",
                  }}
                >
                  <DeleteOutlined />
                </Button>
              </Col>
            </Row>
          </>
        );
      },
    },
  ];

  return (
    <>
      <div className="costCenter">
        <Row className="costRow">
          <Col span={24}>
            <Card
              title="Cost Center"
              className="costCenterCard"
              bordered={true}
              hoverable={true}
            >
              <div style={{ margin: "13px", background: "#fff" }}>
                <div style={{ background: "#FAFAFA" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        fontWeight: "600",
                        fontSize: "14px",
                        lineHeight: "19px",
                      }}
                    >
                      <Button
                        type="default"
                        onClick={() => setIsCostModalOpen(true)}
                        style={{
                          margin: "10px 10px 0px 0px",
                          background: "#1963A6",
                          color: "#ffffff",
                          borderRadius: "5px",
                        }}
                      >
                        + Add Cost Center
                      </Button>
                    </div>
                  </div>
                  <Divider />
                  <Table
                    // bordered={true}
                    className="costCenterTable"
                    columns={columns}
                    dataSource={costCenters}
                    style={{ padding: "0px" }}
                    pagination={false}
                    scroll={{ x: 600 }}
                  />
                </div>

                <Modal
                  title="ORGANIZATION DETAILS"
                  open={isCostModalOpen}
                  onCancel={() => {
                    setIsCostModalOpen(false);
                    form.resetFields();
                  }}
                  cancelText={
                    <div className="cancel">
                      <CloseOutlined style={{ marginRight: "10px" }} />
                      CANCEL
                    </div>
                  }
                  centered
                  className="costModal"
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
                        setIsCostModalOpen(false);
                        form.resetFields();
                      }}
                      style={{ color: "#ffff" }}
                    >
                      X
                    </div>
                  }
                >
                  <Form
                    labelCol={{
                      span: 8,
                    }}
                    wrapperCol={{
                      span: 16,
                    }}
                    // initialValues={{
                    //   remember: true,
                    // }}
                    form={form}
                    onFinish={onFinishForm}
                  >
                    <Row gutter={[0, 16]}>
                      <Col xs={24} sm={24} md={24}>
                        <FormItem
                          labelAlign="left"
                          name="costcentercode"
                          label="Cost Center Code"
                          onKeyPress={(event) => {
                            if (checkAlphabets(event)) {
                              event.preventDefault();
                            }
                          }}
                          rules={[
                            {
                              required: true,
                              message: "Please Enter Cost Center Code",
                            },
                            {
                              pattern: /^[0-9A-Z_-\s]+$/,
                              message: "Please Enter Valid Cost Center Code",
                            },
                          ]}
                        >
                          <Input maxLength={10} />
                        </FormItem>
                      </Col>
                      <Col xs={24} sm={24} md={24}>
                        <FormItem
                          labelAlign="left"
                          name="costName"
                          label="Name"
                          onKeyPress={(event) => {
                            if (checkAlphabetsName(event)) {
                              event.preventDefault();
                            }
                          }}
                          rules={[
                            {
                              required: true,
                              message: "Please Enter Name",
                            },
                            {
                              pattern: /^[A-Za-z\s]*$/,
                              message: "Please Enter Valid Name",
                            },
                          ]}
                        >
                          <Input
                            maxLength={30}
                            onChange={(e) => {
                              const str = e.target.value;
                              const caps = str
                                .split(" ")
                                .map(capitalize)
                                .join(" ");
                              form.setFieldsValue({
                                costName: caps,
                              });
                            }}
                          />
                        </FormItem>
                      </Col>
                      <Col xs={24} sm={24} md={24}>
                        <FormItem
                          labelAlign="left"
                          name="costDescription"
                          label="Description"
                        >
                          <TextArea
                            row={5}
                            maxlength={100}
                            autoSize={{ minRows: 2, maxRows: 6 }}
                            onChange={(e) => {
                              const str = e.target.value;
                              const caps = str
                                .split(". ")
                                .map(capitalize)
                                .join(". ");
                              form.setFieldsValue({
                                costDescription: caps,
                              });
                            }}
                          />
                        </FormItem>
                      </Col>
                    </Row>
                  </Form>
                </Modal>
                <Form
                  labelCol={{
                    span: 8,
                  }}
                  wrapperCol={{
                    span: 16,
                  }}
                  initialValues={{
                    remember: true,
                  }}
                  form={editForm}
                  onFinish={onFinishEdit}
                >
                  <Modal
                    title="EDIT ORGANIZATION DETAILS"
                    destroyOnClose
                    open={isCostEditModalOpen}
                    onCancel={() => {
                      setEditCostCenter({});
                      editForm.resetFields();
                      setIsCostEditModalOpen(false);
                    }}
                    cancelText={
                      <div>
                        <CloseOutlined style={{ marginRight: "10px" }} />
                        CANCEL
                      </div>
                    }
                    centered
                    className="costModal"
                    onOk={() => {
                      editForm.submit();
                      setIsCostEditModalOpen(false);
                    }}
                    okText={
                      <div>
                        <CheckOutlined style={{ marginRight: "10px" }} />
                        SAVE
                      </div>
                    }
                    closeIcon={
                      <div
                        onClick={() => {
                          setEditCostCenter({});
                          form.resetFields();
                          setIsCostEditModalOpen(false);
                        }}
                        style={{ color: "#ffff" }}
                      >
                        X
                      </div>
                    }
                  >
                    <Row gutter={[0, 16]}>
                      <Col xs={24} sm={24} md={24}>
                        <FormItem
                          labelAlign="left"
                          name="costcentercode"
                          label="Cost Center Code"
                          initialValue={costEditCenter.costcentercode}
                          onKeyPress={(event) => {
                            if (checkAlphabets(event)) {
                              event.preventDefault();
                            }
                          }}
                          rules={[
                            {
                              required: true,
                              message: "Please Enter Cost Center Code",
                            },
                            {
                              pattern: /^[0-9A-Z_-\s]+$/,
                              message: "Please Enter Valid Cost Center Code",
                            },
                          ]}
                        >
                          <Input maxLength={10} />
                        </FormItem>
                      </Col>
                      <Col xs={24} sm={24} md={24}>
                        <FormItem
                          labelAlign="left"
                          name="costName"
                          label="Name"
                          initialValue={costEditCenter.costName}
                          onKeyPress={(event) => {
                            if (checkAlphabetsName(event)) {
                              event.preventDefault();
                            }
                          }}
                          rules={[
                            {
                              required: true,
                              message: "Please Enter Name",
                            },
                            {
                              pattern: /^[A-Za-z\s]*$/,
                              message: "Please Enter Valid Name",
                            },
                          ]}
                        >
                          <Input
                            maxLength={30}
                            onChange={(e) => {
                              const str = e.target.value;
                              const caps = str
                                .split(" ")
                                .map(capitalize)
                                .join(" ");
                              form.setFieldsValue({
                                costName: caps,
                              });
                            }}
                          />
                        </FormItem>
                      </Col>
                      <Col xs={24} sm={24} md={24}>
                        <FormItem
                          labelAlign="left"
                          name="costDescription"
                          label="Description"
                          initialValue={costEditCenter.costDescription}
                        >
                          <TextArea
                            row={5}
                            maxlength={100}
                            autoSize={{ minRows: 2, maxRows: 6 }}
                            onChange={(e) => {
                              const str = e.target.value;
                              const caps = str
                                .split(". ")
                                .map(capitalize)
                                .join(". ");
                              form.setFieldsValue({
                                costDescription: caps,
                              });
                            }}
                          />
                        </FormItem>
                      </Col>
                    </Row>
                  </Modal>
                </Form>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default CostCenter;
