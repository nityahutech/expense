import React, { useState } from 'react'
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

const showModal = () => {
    setIsCostModalOpen(true);
  };
const handleOk = () => {
    setIsCostModalOpen(false);
  };
const handleCancel = () => {
    setIsCostModalOpen(false);
  };

const showEditModal = () => {
    setIsCostEditModalOpen(true)
};
const edithandleCancel = () => {
  setIsCostEditModalOpen(false)
};


const success = (record) => {
  Modal.confirm({
    title: "Are you sure, you want to delete Leave record?",
    okText: "Yes",
    okType: "danger",

    onOk: () => {
      // LeaveContext.deleteLeave(record.id)
      //   .then((response) => {
      //     showNotification("success", "Success", "Leave deleted successfully!")
      //     getData();
      //   })
      //   .catch((error) => {
      //     showNotification("error", "Error", error.message)
      //   });
    },
  });
};

const columns = [
  {
    title: "Sl.no.",
    dataIndex: "slno",
    key: "slno",
    width: 50,
  },
  {
    title: "Cost Center Code",
    dataIndex: "ccc",
    key: "ccc",
    width: 150,
  },
  {
    title: "Name",
    key: "name",
    dataIndex: "name",
    width: 140,
  },
  {
      title: "Description",
      key: "description",
      dataIndex: "description",
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
                onClick={success}
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

const dataSource = [
  {
      key:"1",
      slno:"76",
      ccc:"yo",
      name:"no",
      description:"hi"
  }
]
    
  return (
    <div style={{background: "#fff"}}>
      <Card
        title={<div style={{fontWeight: "600",fontSize: "14px",lineHeight: "19px",textTransform: "uppercase",}}>Organization Cost Center </div>}
        extra={<>
                <Row>
                 <Col xs={2} sm={24} md={24}>
                    <Button 
                    style={{width:"100%"}}
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
          dataSource={dataSource}
          style={{padding:"0px"}}
          pagination={false}
        />
      </Card>

      <Modal 
        title="ORGANIZATION DETAILS"
        open={isCostModalOpen}
        onCancel={handleCancel}
        centered
        className='costModal'
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
        //  labelcol={{
        //     span: 24,
        //   }}
        //   wrappercol={{
        //     span: 24,
        //   }}
        >
          <Row gutter={[0,16]}>
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
                  labelCol={{ span: 3, offset: 4}}
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
                  autoSize=  {{minRows: 2, maxRows: 6}}
                />
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Modal>

      <Modal 
        title="ORGANIZATION DETAILS"
        open={isCostEditModalOpen}
        onCancel={handleCancel}
        centered
        className='costModal'
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
        //  labelcol={{
        //     span: 24,
        //   }}
        //   wrappercol={{
        //     span: 24,
        //   }}
        >
          <Row gutter={[0,16]}>
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
                  labelCol={{ span: 3, offset: 4}}
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
                  autoSize=  {{minRows: 2, maxRows: 6}}
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
