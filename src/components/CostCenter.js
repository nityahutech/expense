import React, { useState, useEffect } from 'react'
import {
  Form,
  Input,
  Col,
  Row,
  Button,
  Card,
  Table,
  Modal,
  message,
} from "antd";
import {
  PlusOutlined,
  EditFilled,
  DeleteOutlined,
} from "@ant-design/icons";
import "../style/CostCenter.css"
import FormItem from 'antd/es/form/FormItem';
import TextArea from 'antd/lib/input/TextArea';

function CostCenter() {

  const [isCostModalOpen, setIsCostModalOpen] = useState(false);
  const [isCostEditModalOpen, setIsCostEditModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [costCenters, setCostCenters] = useState([]);
  const [costCenterlength, setCostCenterlength] = useState(0);

  // let costCenterlength = 0

  const deleteCost = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete cost Center?",
      okText: "Yes",
      okType: "danger",

      onOk: () => {

        console.log('key', record)
        const newData = costCenters.filter((item) => item.slno !== record.slno);
        localStorage.setItem("costCenters", JSON.stringify(newData));
        setCostCenters(newData);
        setCostCenterlength(newData.length)
      }
    })

  };

  const showModal = () => {
    setIsCostModalOpen(true);
  };

  const handleCancel = () => {
    setIsCostModalOpen(false);
  };

  const showEditModal = () => {
    setIsCostEditModalOpen(true)
  };


  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishForm = (values) => {
    console.log('values', values)
    let costCenterTemp = {
      costName: values.costName,
      costcentercode: values.costcentercode,
      costDescription: values.costDescription
    }
    costCenters.push(costCenterTemp)
    localStorage.setItem("costCenters", JSON.stringify(costCenters));
    setCostCenters(costCenters)
    console.log('costCenters', costCenters.length)
    setCostCenterlength(costCenters.length)
  };

  const getCostCentersFromLocalStr = () => {
    const data = localStorage.getItem('costCenters');
    if (data) {
      return JSON.parse(data)
    }
    else {
      return []
    }
  }

  useEffect(() => {
    let costfromDataStore = getCostCentersFromLocalStr()
    console.log('costfromDataStore', costfromDataStore)
    let i = 0
    costfromDataStore.map(obj => {
      costfromDataStore[i].slno = i + 1
      i++
    })

    setCostCenters(costfromDataStore)
  }, [costCenterlength]);

  const columns = [
    {
      title: "Sl.no.",
      dataIndex: "slno",
      key: "slno",
      width: 50,
    },
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
      width: 130,
      align: "center",
      render: (_, record) => {
        return (
          <>
            <Row gutter={[0, 0]}>
              <Col xs={22} sm={15} md={8}>
                <Button
                  style={{
                    color: " #007ACB",
                    border: "none",
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '35px',
                    height: '36px',
                    background: '#EEEEEE',
                    borderRadius: '10px'
                  }}
                  onClick={showEditModal}

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
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '35px',
                    height: '36px',
                    background: '#EEEEEE',
                    borderRadius: '10px'
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
    <div style={{ background: "#fff" }}>
      <Card
        title={<div style={{ fontWeight: "600", fontSize: "14px", lineHeight: "19px", textTransform: "uppercase", }}>Organization Cost Center </div>}
        extra={<>
          <Row>
            <Col xs={2} sm={24} md={24}>
              <Button
                style={{ width: "100%" }}
                onClick={showModal}
              ><PlusOutlined />Add Cost Center</Button>
            </Col>
          </Row>
        </>}
        className="costCenterCard"
        footer={false}
      >
        <Table
          bordered={true}
          className="costCenterTable"
          columns={columns}
          dataSource={costCenters}
          style={{ padding: "0px" }}
          pagination={false}
        />
      </Card>

      <Modal
        title="ORGANIZATION DETAILS"
        open={isCostModalOpen}
        onCancel={handleCancel}
        centered
        className='costModal'
        onOk={() => {
          form.submit();
          setIsCostModalOpen(false);
        }}
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
                name="costcentercode"
                label="Cost Center Code"
                // value={costCenter}
                // onChange={(e) =>
                //   setCostCenter(e.target.value)
                // }
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
                labelCol={{ span: 7 }}
                wrapperCol={{ span: 24 }}
              >
                <Input />
              </FormItem>
            </Col>
            <Col xs={24} sm={24} md={24}>
              <FormItem
                name="costName"
                label="Name"
                // value={costName}
                // onChange={(e) =>
                //   setCostName(e.target.value)
                // }
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
                labelCol={{ span: 3, offset: 4 }}
                wrapperCol={{ span: 24 }}

              >
                <Input />
              </FormItem>
            </Col>
            <Col xs={24} sm={24} md={24}>
              <FormItem
                name="costDescription"
                label="Description"
                // value={costDescription}
                // onChange={(e) =>
                //   setCostDescription(e.target.value)
                // }
                labelCol={{ span: 5, offset: 2 }}
                wrapperCol={{ span: 24 }}
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
        onCancel={handleCancel}
        centered
        className='costModal'
        onOk={() => {
          form.submit();
          setIsCostEditModalOpen(false);
        }}
        closeIcon={
          <div
            onClick={() => {
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
          form={form}
          onFinish={onFinish}
        >
          <Row gutter={[0, 16]}>
            <Col xs={24} sm={24} md={24}>
              <FormItem
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
                labelCol={{ span: 7 }}
                wrapperCol={{ span: 24 }}
              >
                <Input />
              </FormItem>
            </Col>
            <Col xs={24} sm={24} md={24}>
              <FormItem
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
                labelCol={{ span: 3, offset: 4 }}
                wrapperCol={{ span: 24 }}

              >
                <Input />
              </FormItem>
            </Col>
            <Col xs={24} sm={24} md={24}>
              <FormItem
                name="costDescription"
                label="Description"
                labelCol={{ span: 5, offset: 2 }}
                wrapperCol={{ span: 24 }}
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
    </div>
  )
}

export default CostCenter
