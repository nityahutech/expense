// ------------------------------------Place for import 
import React from 'react'

import  { useState } from 'react';

import { 
  Card,
  Col, 
  Row,
  Input,
  DatePicker,
  Button,
  Form,
  Select,
} from 'antd';

import {
  PlusCircleOutlined,
  CloseOutlined,
  CheckOutlined,
  EditTwoTone,
  DeleteTwoTone, 
} from '@ant-design/icons';
import FormItem from 'antd/es/form/FormItem';

// ----------------------------------------place for const declaration

const { Option } = Select;

const onChange = (date, dateString) => {
  console.log(date, dateString);
};

// --------------------------------------place for functions

function Education() {

  const [editContent, showEditContent] = useState(false);

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div 
      className='education' 
      style={{
              margin:'10px',
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
    >
    
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >

    <Card
          title="EDUCATIONAL INFO"
          //   actions={[
          //   <EditOutlined key="edit" />,
          // ]}
          extra={
            <>
              {editContent === false ? (
                <Button
                  type="text"
                  style={{ color: "#4ec0f1" }}
                  onClick={() => showEditContent(!editContent)}
                >
                  Edit
                </Button>
              ) : null}
            </>
          }
          style={{
            width: 800,
            marginTop: 10,
          }}
        >
          <Row gutter={[16, 16]}>

          <Col span={8}>
            <Form.Item name="graduation" rules={[{required: true,message: 'Please input your Graduction Type!',},]}
              labelCol={{span: 8,}}
              wrapperCol={{span: 32,}}
            >
              <div>
                <h1 style={{ fontWeight: "bold", fontSize: "15px" }}>Qulification Type</h1>
                {editContent === false ? (
                  <h4>Graduation</h4>
                ) : (
                  <Input placeholder="" />
                )}
              </div>
            </Form.Item>
            </Col>

            <Col span={8}>
            <Form.Item name="graduation" rules={[{required: true,message: 'Please input your Graduction Type!',},]}
              labelCol={{span: 8,}}
              wrapperCol={{span: 32,}}
            >
              <div>
                <h1 style={{ fontWeight: "bold", fontSize: "15px" }}>Coure Name</h1>
                {editContent === false ? (
                  <h4>B.tech</h4>
                ) : (
                  <Input placeholder="" />
                )}
              </div>
              </Form.Item>
            </Col>

            <Col span={8}>
            <Form.Item name="graduation" rules={[{required: true,message: 'Please input your Graduction Type!',},]}
              labelCol={{span: 8,}}
              wrapperCol={{span: 32,}}
            >
              <div>
                <h1 style={{ fontWeight: "bold", fontSize: "15px" }}>Course Type</h1>
                {editContent === false ? (<h4>Full Time</h4>) : (<Input placeholder="" />)}
              </div>
            </Form.Item>
            </Col>

            <Col span={8}>
            <Form.Item name="graduation" rules={[{required: true,message: 'Please input your Graduction Type!',},]}
              labelCol={{span: 8,}}
              wrapperCol={{span: 32,}}
            >
              <div>
                <h1 style={{ fontWeight: "bold", fontSize: "15px" }}>Stream</h1>
                {editContent === false ? (<h4>Mechanical</h4>) : (<Input placeholder="" />)}
              </div>
            </Form.Item>
            </Col>

            <Col span={8}>
            <Form.Item name="graduation" rules={[{required: true,message: 'Please input your Graduction Type!',},]}
              labelCol={{span: 8,}}
              wrapperCol={{span: 32,}}
            >
              <div>
                <h1 style={{ fontWeight: "bold", fontSize: "15px" }}>Course Start Date</h1>
                {editContent === false ? (<h4>14/02/2014</h4>) : (<DatePicker style={{ width: "100%" }} />)}
              </div>
            </Form.Item>
            </Col>

            <Col span={8}>
            <Form.Item name="graduation" rules={[{required: true,message: 'Please input your Graduction Type!',},]}
              labelCol={{span: 8,}}
              wrapperCol={{span: 32,}}
            >
              <div>
                <h1 style={{ fontWeight: "bold", fontSize: "15px" }}>Course End Date</h1>
                {editContent === false ? (<h4>14/02/2014</h4>) : (<DatePicker style={{ width: "100%" }} />)}
              </div>
            </Form.Item>
            </Col>

            <Col span={8}>
            <Form.Item name="graduation" rules={[{required: true,message: 'Please input your Graduction Type!',},]}
              labelCol={{span: 8,}}
              wrapperCol={{span: 32,}}
            >
              <div>
                <h1 style={{ fontWeight: "bold", fontSize: "15px" }}>University Name</h1>
                {editContent === false ? (<h4>Mechanical</h4>) : (<Input placeholder="" />)}
              </div>
            </Form.Item>
            </Col>

          </Row>



          {editContent === true ? (
            <Row
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "3%",
              }}
            >
              <Button
                onClick={() => showEditContent(false)}
                type="text"
                style={{ fontSize: 15 }}
              >
                <CloseOutlined /> CANCEL
              </Button>
              <Col>
                <Button type="primary" style={{ marginLeft: "10px" }}>
                <CheckOutlined />
                  SAVE
                </Button>
              </Col>
            </Row>
          ) : null}
        </Card>
      
      </Form>

    </div>
  )
}

export default Education