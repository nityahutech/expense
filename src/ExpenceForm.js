import React from 'react';
import { useState } from 'react';
import 'antd/dist/antd.css';
import './ExpenceForm';
import { Col, Divider, Row } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {
  // Cascader,
  Upload,
  Input,
  Select,
  handleChange,
  Option,
  Radio,
  Space,
  Button,
  DatePicker,
  Form,
  InputNumber
} from 'antd';

const ExpenceForm = () => {
  const [category, setCategory] = useState("");
  const { TextArea } = Input;
  const { Option } = Select;

  const handleChange = event => {
    const result = event.target.value.replace(/[^a-z]/gi, '');};

  // const handleChange = (value) => {
  //   console.log(`selected ${value}`);
  // };
  // const onFinish = (values) => {
  //   console.log('Success:', values);
  // };

  // const onFinishFailed = (errorInfo) => {
  //   console.log('Failed:', errorInfo);
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('hiiiiii');
  }

  const [number1, setNumber1] = useState();
  const [number2, setNumber2] = useState();
  const [total, setTotal] = useState();

  function calculateTotal() {
    setTotal(number1 * number2);
  }

  return (
    <>
      <div >

        {/* <Divider orientation="center">Expence Rgister</Divider> */}

        <Form onFinish={handleSubmit}
          labelcol={{
            span: 4,
          }}
          wrappercol={{
            span: 14,
          }}
          initialValues={{
            remember: true,
          }}
          // onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >

          <Row gutter={[14, 10]}>

            {/* ------------column-spacer-------------------- */}

            <Col span={6} style={{ background: '' }}></Col>

            {/* ------------Left-column-------------------- */}

            <Col span={6} style={{ background: '' }}>
              {/* <Divider orientation='left' orientationMargin={0}>Category</Divider> */}
              {/* <Form.Item
                name="cascades"
                rules={[
                  {
                    required: true,
                    message: 'Please enter the expence category',

                  },
                ]}
              >
                <Select
                  required
                  placeholder='Choose Category'
                  style={{
                    width: '100%',
                  }}
                // onChange={handleChange}
                >
                  <Option value="fruits" >Fruits</Option>
                  <Option value="Water">Water</Option>
                  <Option value="Others">Others</Option>
                </Select>

              </Form.Item> */}

              {/* ------------------------------Paid By------- */}

              <Divider orientation='left' orientationMargin={0}>Paid By</Divider>

              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please enter your name"
                  },
                  { whitespace: true },
                  { min: 3 }
                ]}
                hasFeedback
              >
                <Input
                  type="text"
                  onChange={handleChange}

                  required
                  placeholder='Enter  Name' />
              </Form.Item>

              {/* -------------------------Expense type------- */}

              <Divider orientation='left' orientationMargin={0}>Expense Name</Divider>
              <Form.Item
                name="expence"
                rules={[
                  {
                    required: true,
                    message: "Please enter the expence type"
                  },

                  { whitespace: true },
                  { min: 3 }
                ]}
                hasFeedback
              >
                <Input required placeholder='Enter Expense For' />
              </Form.Item>



              {/* -------------------------------- */}

              <Divider orientation='left' orientationMargin={0}>Paid to</Divider>
              <Form.Item
                name="paid to"
                rules={[
                  {
                    required: true,
                    message: "Please enter the expence type"
                  },

                  { whitespace: true },
                  { min: 3 }
                ]}
                hasFeedback
              >
                <Input
                  type="number"
                  required
                  placeholder='Enter Vendor Name' />
              </Form.Item>


              {/* ----------------------------------------------------------Payment type------- */}

              <Divider orientation='left' orientationMargin={0}>Mode of Payment</Divider>
              <Form.Item
                name="paytype"
                rules={[
                  {
                    required: false,
                    message: "Please enter the paymeny status"
                  },
                ]}
              >
                <Radio.Group>
                  <Radio value="Bank"> Bank Transfer </Radio>
                  <Radio value="Cash"> Cash </Radio>
                  <Radio value="UPI"> UPI </Radio>
                </Radio.Group>
              </Form.Item>
            </Col>

            {/* ------------Right-column-------------------- */}

            <Col span={6} style={{ background: '' }}>

              {/* ----------------------------------Datepicker------- */}

              <Divider orientation='left' orientationMargin={0}>Date</Divider>
              <Form.Item
                name="paytype"
                rules={[
                  {
                    required: true,
                    message: "Please Choose a Date"
                  },
                ]}
              >
                <DatePicker style={{ width: '100%' }} placeholder='Choose Date' />
              </Form.Item>

              {/* --------------------------------------Amount------- */}

              <Divider orientation='left' orientationMargin={0}>Amount</Divider>
              <Form.Item
                className='numder-inputs'
                name="amount"
                rules={[
                  {
                    required: true,
                    message: "Please enter the amount"
                  },
                  { whitespace: true },

                ]}
                hasFeedback
              >
                <Input
                  required
                  type="number"
                  value={number1}
                  onChange={(e) => {
                    setNumber1(+e.target.value)
                    //set subtotal(state of amt * state of qty)
                    //assign state of subtotal
                  }}

                  placeholder='Enter Amount Here'
                />
              </Form.Item>

              {/* --------------------------------------Quantity------- */}

              <Divider orientation='left' orientationMargin={0}>Quantity</Divider>
              <Form.Item

                name="Quantity"
                rules={[
                  {
                    required: false,
                    message: "Please enter the quantity ",
                  },
                ]}
                hasFeedback
              >

                <Input
                  required
                  min={0}
                  type="number"
                  value={number2}
                  onChange={(e) => setNumber2(+e.target.value)}
                  placeholder='Quantity of the item' />

              </Form.Item>

              {/* --------------------------------------Sub-total------- */}

              <Divider orientation='left' orientationMargin={0}>Subtotal</Divider>
              <Form.Item >
                <Input
                  required
                  onClick={calculateTotal}
                  value={total || 0}
                  placeholder='Total' />
              </Form.Item>

              {/* --------------------------------------Upload------- */}

              {/* <Divider orientation='left' orientationMargin={0}>Upload</Divider>
              <Form.Item
                // label="Upload" 
                valuePropName="fileList"
                name="upload"

                rules={[
                  {
                    required: false,
                    message: "Please enter the quantity ",
                  },
                ]}
              >
                <Upload action="/upload.do" listType="picture-card">
                  <div style={{ margin: 2 }}>
                    <PlusOutlined />
                    <div style={{ marginTop: 2 }}>Upload</div>
                  </div>
                </Upload>
              </Form.Item> */}

            </Col>

            {/* ------------column-spacer-------------------- */}



            <Col span={6} style={{ background: '' }}></Col>
          </Row>


          {/* -----------------------Text-area--------------- */}

          <Row gutter={24}>
            <Col className='gutter-row' span={6}></Col>
            <Col className='gutter-row' span={12}>
              <div style={{ padding: '0px 0' }}>
                <Divider orientation='left' orientationMargin={0}>Descriptions</Divider>
                <Form.Item
                  name="Textarea"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the Description ",
                    },
                  ]}
                >
                  <TextArea rows={3} />
                </Form.Item>
              </div>
            </Col>
            <Col className='gutter-row' span={6}></Col>
          </Row>

          {/* -----------------------Buttons--------------- */}

          <Row gutter={1}>
            <Col classsname='gutter-row' span={6}></Col>
            <Col classsname='gutter-row' span={12}>
              <div style={{ alignItems: 'center' }}>
                <Space>
                  <Form.Item >
                    <Button
                      style={{
                        background: '#C1C1C1',
                        borderRadius: '5px',
                        width: '80px',
                        height: '30px',
                        color: 'white',
                        cursor: 'pointer'
                      }}
                    >Cancel</Button>
                  </Form.Item>
                  <Form.Item>
                    <button style={{
                      background: '#189AB4',
                      borderRadius: '5px',
                      borderWidth: '0px',
                      width: '80px',
                      height: '30px',
                      color: 'white',
                      cursor: 'pointer',
                    }}
                      type="primary">Submit</button>
                  </Form.Item>
                </Space>
              </div>
            </Col>
            <Col classsname='gutter-row' span={6}></Col>
          </Row>

        </Form>
      </div>
    </>
  )
}

export default ExpenceForm;
