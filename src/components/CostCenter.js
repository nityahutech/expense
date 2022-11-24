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
  } from "antd";
  import {
    PlusOutlined,
    EditFilled,
    DeleteOutlined,
  } from "@ant-design/icons";
  import "../style/CostCenter.css"
import FormItem from 'antd/es/form/FormItem';
import TextArea from 'antd/lib/input/TextArea';

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
              <Col xs={22} sm={15} md={12}>
                <Button
                  style={{ width: "40px" }}
                  onClick={() => {
                    ;
                  }}
                >
                  <EditFilled

                    style={
                        //  { color: "rgb(154 201 244)", marginLeft: "-2px" }
                         { color: "#268FEE", marginLeft: "-2px" }
                    }
                  />
                </Button>
              </Col>
              <Col xs={22} sm={15} md={12}>
                <Button >
              <DeleteOutlined 
                style={

                    //    { color: "rgb(154 201 244)", marginLeft: "-2px" }
                       { color: "#268FEE", marginLeft: "-2px" }
                  }
              />
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

function CostCenter() {

const [isCostModalOpen, setIsCostModalOpen] = useState(false);

const showModal = () => {
    setIsCostModalOpen(true);
  };
  const handleOk = () => {
    setIsCostModalOpen(false);
  };
  const handleCancel = () => {
    setIsCostModalOpen(false);
  };
    
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
                  labelCol={{ span: 5, offset: 2 }}
                  wrapperCol={{ span: 24 }} 
              >
                <TextArea />
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  )
}

export default CostCenter
