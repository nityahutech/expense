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
  notification,
  Divider,
} from "antd";
import {
  PlusOutlined,
  EditFilled,
  DeleteOutlined,
  CloseOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import "../style/CostCenter.css";
import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/lib/input/TextArea";

function CostCenter() {
  const [isCostModalOpen, setIsCostModalOpen] = useState(false);
  const [isCostEditModalOpen, setIsCostEditModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const [costCenters, setCostCenters] = useState([]);
  const [costEditCenter, setEditCostCenter] = useState({});
  const [costCenterlength, setCostCenterlength] = useState(0);
  const showNotification = (type, msg, desc) => {
    notification[type]({
      message: msg,
      description: desc,
    });
  };

  const deleteCost = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete cost Center?",
      okText: "Yes",
      okType: "danger",

      onOk: () => {
        console.log("key", record);
        const newData = costCenters.filter((item) => item.slno !== record.slno);
        localStorage.setItem("costCenters", JSON.stringify(newData));
        showNotification("success", "Success", "Successfully deleted");
        setCostCenters(newData);
        setCostCenterlength(newData.length);
      },
    });
  };

  const showModal = () => {
    setIsCostModalOpen(true);
  };

  const showEditModal = (record) => {
    console.log("editrecord", record);

    setIsCostEditModalOpen(true);
    setEditCostCenter(record);
  };

  const onFinishEdit = (values) => {
    console.log("onFinishEdit", values);

    let newCostCenterTemp = {
      costName: values.costName,
      costcentercode: values.costcentercode,
      costDescription: values.costDescription,
    };
    let originalCostCenterCode = costEditCenter.costcentercode;
    console.log("onFinishEdit", originalCostCenterCode);
    for (let i = 0; i < costCenters.length; i++) {
      if (costCenters[i].costcentercode === originalCostCenterCode) {
        costCenters[i] = newCostCenterTemp;
      }
    }

    localStorage.setItem("costCenters", JSON.stringify(costCenters));
    editForm.resetFields();
    setEditCostCenter({});
    setCostCenters(costCenters);
    setCostCenterlength(costCenters.length - 1);
    showNotification("success", "Success", "Successfully editted");
    setIsCostEditModalOpen(false);
    getCostCentersFromLocalStr();
    setCostCenterlength(costCenters.length);
  };

  const onFinishForm = (values) => {
    console.log("values", values);
    let matchingCostCenter = costCenters.filter(
      (item) => item.costcentercode === values.costcentercode
    );
    console.log("values", matchingCostCenter);
    if (matchingCostCenter.length > 0) {
      showNotification("error", "error", "Try Again cost center allready Present");
      return;
    }

    let costCenterTemp = {
      costName: values.costName,
      costcentercode: values.costcentercode,
      costDescription: values.costDescription,
    };
    costCenters.push(costCenterTemp);
    localStorage.setItem("costCenters", JSON.stringify(costCenters));
    showNotification("success", "Success", "Successfully added");
    setCostCenters(costCenters);
    console.log("costCenters", costCenters.length);
    setCostCenterlength(costCenters.length);
    setIsCostModalOpen(false);
    form.resetFields();
  };

  const getCostCentersFromLocalStr = () => {
    const data = localStorage.getItem("costCenters");
    if (data) {
      return JSON.parse(data);
    } else {
      return [];
    }
  };

  useEffect(() => {
    let costfromDataStore = getCostCentersFromLocalStr();
    console.log("costfromDataStore", costfromDataStore);
    let i = 0;
    costfromDataStore.map((obj) => {
      costfromDataStore[i].slno = i + 1;
      i++;
    });

    setCostCenters(costfromDataStore);
  }, [costCenterlength]);

  const columns = [
    // {
    //   title: "Sl.no.",
    //   dataIndex: "slno",
    //   key: "slno",
    //   width: 80,
    // },
    {
      title: "Cost Center Code",
      dataIndex: "costcentercode",
      key: "costcentercode",
      width: 150,
    },
    {
      title: "Name",
      key: "costName",
      dataIndex: "costName",
      width: 140,
    },
    {
      title: "Description",
      key: "costDescription",
      dataIndex: "costDescription",
      width: 140,
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
                    form.resetFields();
                    showEditModal(record);
                  }}
                >
                  <EditFilled />
                </Button>
              </Col>
              <Col xs={22} sm={15} md={8}>
                <Button
                  onClick={() => deleteCost(record)}
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
            Organization Cost Center
          </div>
          <div
            style={{
              fontWeight: "600",
              fontSize: "14px",
              lineHeight: "19px",
            }}
          >
            <Button
              type="default"
              onClick={showModal}
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
          // setIsCostModalOpen(false);
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
                rules={[
                  {
                    required: true,
                    message: "Please enter Cost Center Code",
                  },
                  {
                    pattern: /^[0-9A-Za-z]+$/,
                    message: "Please enter Valid Cost Center Code",
                  },
                ]}
              >
                <Input />
              </FormItem>
            </Col>
            <Col xs={24} sm={24} md={24}>
              <FormItem
                labelAlign="left"
                name="costName"
                label="Name"
                rules={[
                  {
                    required: true,
                    message: "Please enter Name",
                  },
                  {
                    pattern: /^[A-Za-z]+$/,
                    message: "Please enter Valid Name",
                  },
                ]}
              >
                <Input />
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
                />
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Modal>

      <Modal
        title="EDIT ORGANIZATION DETAILS"
        open={isCostEditModalOpen}
        onCancel={() => {
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
              editForm.resetFields();
              setIsCostEditModalOpen(false);
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
          initialValues={{
            remember: true,
          }}
          form={editForm}
          onFinish={onFinishEdit}
        >
          <Row gutter={[0, 16]}>
            <Col xs={24} sm={24} md={24}>
              <FormItem
                labelAlign="left"
                name="costcentercode"
                label="Cost Center Code"
                initialValue={costEditCenter.costcentercode}
                rules={[
                  {
                    required: true,
                    message: "Please enter Cost Center Code",
                  },
                  {
                    pattern: /^[0-9A-Za-z]+$/,
                    message: "Please enter Valid Cost Center Code",
                  },
                ]}
              >
                <Input />
              </FormItem>
            </Col>
            <Col xs={24} sm={24} md={24}>
              <FormItem
                labelAlign="left"
                name="costName"
                label="Name"
                initialValue={costEditCenter.costName}
                rules={[
                  {
                    required: true,
                    message: "Please enter Name",
                  },
                  {
                    pattern: /^[A-Za-z]+$/,
                    message: "Please enter Valid Name",
                  },
                ]}
              >
                <Input />
              </FormItem>
            </Col>
            <Col xs={24} sm={24} md={24}>
              <FormItem
                labelAlign="left"
                name="costDescription"
                label="Description"
                initialValue={costEditCenter.costDescription}
              >
                <TextArea />
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
}

export default CostCenter;
