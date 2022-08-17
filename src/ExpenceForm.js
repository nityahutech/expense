import React from 'react';
import { useState } from 'react';
import 'antd/dist/antd.css';
import './ExpenceForm';
import { Col, Divider, Row } from 'antd';
import './ExpenseForm.css';

import {
  // Cascader,
 
  Input,
  Select,
  

  Radio,
  Space,
  Button,
  DatePicker,
  Form,
 
} from 'antd';

const ExpenceForm = () => {
  const [category, setCategory] = useState("");
  const { TextArea } = Input;

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('hiiiiii');
  }

  const [amount, setAmount] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(0);
  const [description, setDescription] = useState("");



  return (
    <>
      <div className='expForm' style ={{ margin:"15px" , background:'white'}} >

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
       
          autoComplete="off"
        >

          <Row gutter={[14, 10]}>

            <Col span={6} style={{ background: '' }}></Col>
            <Col span={6} style={{ background: '' }}>

              {/* ------------------------------Paid By------- */}

              <Divider orientation='left' orientationMargin={0}>Paid By</Divider>

              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'Channel ID is required',
                  }, {
                    pattern: /^[a-zA-Z]+$/g,
                    message: 'Please enter Customer Name',
                  }
                ]}
                
              >
                <Input
                  type="text"
                  required
                  placeholder='Enter  Name' />
              </Form.Item>
              {/* --------------------Paid to------------ */}

              <Divider orientation='left' orientationMargin={0}>Paid to</Divider>
              <Form.Item
                name="paid to"
                rules={[
                  {
                    required: true,
                    message: 'Channel ID is required',
                  }, {
                    pattern: /^[a-zA-Z]+$/g,
                    message: 'Please enter  Name',
                  }
                ]}
                
              >
                <Input

                  required
                  placeholder='Enter Vendor Name' />
              </Form.Item>

              {/* -------------------------Expense Name------- */}

              <Divider orientation='left' orientationMargin={0}>Expense Name</Divider>
              <Form.Item
                name="expence"
                rules={[
                  {
                    required: true,
                    message: 'Channel ID is required',
                  }, {
                    pattern: /^[a-zA-Z]+$/g,
                    message: 'Please enter Customer Name',
                  }
                ]}
                
              >
                <Input required placeholder='Enter Expense For' />
              </Form.Item>

              


              {/* ------------------------------Payment type------- */}

              <Divider orientation='left' orientationMargin={0}>Mode of Payment</Divider>
              <Form.Item
                name="radio"
                rules={[
                  {
                    required: true,
                    message: "Please enter the paymeny status"
                  },
                ]}
              >
                <Radio.Group>
                  <Radio value="Bank"> Bank Transfer </Radio>
                  <Radio value="Cash"> Cash </Radio>
                  <Radio value="UPI"> UPI </Radio>
                  <Radio value="COD"> COD</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={6} style={{ background: '' }}>

              {/* ----------------------Datepicker------- */}

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

              {/* ---------------------------Amount------- */}

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
                
              >
                <Input
                  required
                  // type="number"

                  onChange={(e) => {
                    const amt = e.target.value;
                    setAmount(amt);
                    setTotal(amt * quantity);

                  }}

                  placeholder='Enter Amount Here'
                />
              </Form.Item>

              {/* --------------------------Quantity------- */}

              <Divider orientation='left' orientationMargin={0}>Quantity</Divider>
              <Form.Item

                name="Quantity"
                rules={[
                  {
                    required: false,
                    message: "Please enter the quantity ",
                  },
                ]}
                
              >

                <Input
                  required
                  min={0}
                  // type="number"

                  onChange={(e) => {
                    const qnt = e.target.value;
                    setQuantity(qnt);
                    setTotal(amount * qnt);
                  }}
                  placeholder='Quantity of the item' />

              </Form.Item>

              {/* -------------------------Sub-total------- */}

              <Divider orientation='left' orientationMargin={0}>Subtotal</Divider>
              <Form.Item >
                <Input
                  required
                  onChange={(e) => setDescription(e.target.value)}
                  value={total || 0}
                  placeholder='Total' />
              </Form.Item>

            </Col>
            <Col span={6} style={{ background: '' }}></Col>
          </Row>
          {/* -----------------Text-area--------------- */}

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
              <div>
                <Space>
                  <Form.Item >
                    <Button
                      style={{
                        background: '#C1C1C1',
                        borderRadius: '5px',
                        width: '80px',
                  
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