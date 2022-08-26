import React from 'react';
import { useState } from 'react';
import 'antd/dist/antd.css';
import './ExpenceForm';
import { Col, Divider, Row } from 'antd';
import './ExpenseForm.css';
import ExpenseContext from './contexts/ExpenseContext'
import { useNavigate } from 'react-router-dom';

//import ExpenseDataService from './services/expense.services.js';


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
import { formatCountdown } from 'antd/lib/statistic/utils';
import moment from 'moment';
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
const ExpenceForm = () => {
  // const [category, setCategory] = useState("");
  // const [paidBy, setPaidBy] = useState("");
  const [form] = Form.useForm();
  const [amount, setAmount] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(0);
  // const [description, setDescription] = useState("");

  const { TextArea } = Input;
  const navigate = useNavigate();

  const onFinish = values => {
    console.log('Received values of form: ', values);

  

    const valuesToservice = {
      
      amount: values['amount'],
      catname:  values['expence'],
      date:  values['paymentDate'].format('DD-MM-YYYY'),
      description:  values['description'],
  
      name:  values['paidByInput'],
      paidname:  values['paidto'],
      quantity:  values['Quantity'],
      paymenttype:  values['paymentMode'],
     
      // status:  values['paymentDate'],
      subtotal:  values['subTotal'],
    }

    console.log('valuesToservice: ', valuesToservice);

    ExpenseContext.addExpenses(valuesToservice)
      .then(response => {
        console.log(response);
        navigate('/Expense/ExpenseList');
      })
      .catch(error => {
        console.log(error.message);

      })
  };

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (

    <>
      <div className='expForm' style={{ margin: "15px", background: 'white' }} >

        <Form
          form={form}
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
          <Row gutter={[40, 16]}>
            <col span={12} style={{ background: 'yellow', padding: '10' }}></col>
            <col span={12} style={{ background: 'grey', padding: '10' }}></col>
          </Row>
          <Row gutter={[40, 16]}>

            {/* <Col span={2} style={{ background: 'black' }}></Col> */}
            <Col span={12} style={{ background: '', padding: '10' }}>


              {/* -------------------------Expense Name------- */}

              <Divider orientation='left' orientationMargin={0}>Expense Name<span style={{color:'red'}}>*</span></Divider>
              <Form.Item
                name="expence"
              
                rules={[
                  {
                    required: true,
                    message: 'Please enter Expense Name',
                  }, {
                    pattern:/^[a-zA-Z\s]*$/,
                    message: 'Please enter Valid Name',
                  }
                ]}

              >
                <Input
                  onChange={(e) => {

                    const inputval = e.target.value;
                    const str = e.target.value;
                    const newVal = inputval.substring(0, 1).toUpperCase() + inputval.substring(1);
                    const caps = str.split(' ').map(capitalize).join(' ');        
                      // setPaidBy(newVal);
                    form.setFieldsValue({ expence: newVal, expence: caps });

                  }}


                  required placeholder='Enter Expense For' />
              </Form.Item>


              {/* ------------------------------Paid By------- */}

              <Divider orientation='left' orientationMargin={0}><span style={{color:'red'}}>*</span>Paid By</Divider>

              <Form.Item

                name="paidByInput"
                rules={[
                  {
                    required: true,
                    message: 'Please enter Customer Name',
                  }, {
                
                    pattern:  /^[a-zA-Z\s]*$/,
                    message: 'Please enter Valid Name',
                    // /^[a-zA-Z]+$/g

                  }
                ]}

              >

                <Input

                  onChange={(e) => {

                    const inputval = e.target.value;
                    const newVal = inputval.substring(0, 1).toUpperCase() + inputval.substring(1);
                    // setPaidBy(newVal);
                    form.setFieldsValue({ paidByInput: newVal });

                  }}

                  type="text"
                  required
                  placeholder='Enter  Name' />
              </Form.Item>

              {/* --------------------Paid to------------ */}

              <Divider orientation='left' orientationMargin={0}><span style={{color:'red'}}>*</span>Paid to</Divider>
              <Form.Item
                name="paidto"
                rules={[
                  {
                    required: true,
                    message: 'Please enter Vendor',
                  }, {
                    pattern:  /^[a-zA-Z\s]*$/,
                    message: 'Please enter Valid Name',
                  }
                ]}

              >
                <Input
                  onChange={(e) => {

                    const inputval = e.target.value;
                    const newVal = inputval.substring(0, 1).toUpperCase() + inputval.substring(1);
                    // setPaidBy(newVal);
                    form.setFieldsValue({ paidto: newVal });

                  }}
                  required
                  placeholder='Enter Vendor Name' />
              </Form.Item>





              {/* ------------------------------Payment type------- */}

              <Divider orientation='left' orientationMargin={0}><span style={{color:'red'}}>*</span>Mode of Payment</Divider>
              <Form.Item
                name="paymentMode"
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
                
                </Radio.Group>
              </Form.Item>
            </Col>
            {/* <Col span={4} style={{ background: 'black' }}></Col> */}

            <Col span={12} style={{ background: '' }}>

              {/* ----------------------Datepicker------- */}

              <Divider orientation='left' orientationMargin={0}><span style={{color:'red'}}>*</span>Date</Divider>
              <Form.Item
                name="paymentDate"
                rules={[
                  {
                    required: true,
                    message: "Please Choose a Date"
                  },
                ]}
              >
               
                <DatePicker format={dateFormatList} style={{ width: '100%' }} placeholder='Choose Date'/>
              </Form.Item>

              {/* ---------------------------Amount------- */}

              <Divider orientation='left' orientationMargin={0}><span style={{color:'red'}}>*</span>Amount</Divider>
              <Form.Item
                className='numder-inputs'
                name="amount"
                
                rules={[
                  {
                   
                    required: true,
                    message: "Please enter the amount",
                    pattern: /^[0-9\b]+$/,
                  },
                  { whitespace: true },

                ]}

              >
                <Input
                  required


                  onChange={(e) => {
                    const amt = e.target.value;
                    setAmount(amt);
                    setTotal(amt * quantity);
                    form.setFieldsValue({ subTotal: amt * quantity });

                  }}

                  placeholder='Enter Amount Here'
                />
              </Form.Item>

              {/* --------------------------Quantity------- */}

              <Divider orientation='left' orientationMargin={0}><span style={{color:'red'}}>*</span>Quantity</Divider>
              <Form.Item

                name="Quantity"
                rules={[
                  {
                    required: false,
                    message: "Please enter the quantity ",
                    pattern: /^[0-9\b]+$/,
                  },
                ]}

              >

                <Input
                  required
                  min={0}

                  onChange={(e) => {
                    const qnt = e.target.value;
                    setQuantity(qnt);
                    setTotal(amount * qnt);
                    form.setFieldsValue({ subTotal: amount * qnt });
                  }}
                  placeholder='Quantity of the item' />

              </Form.Item>

              {/* -------------------------Sub-total------- */}

              <Divider orientation='left' orientationMargin={0}>Subtotal</Divider>
              <Form.Item
                name="subTotal"
                
              >

                <Input
                  disabled={true}
                  

                  value={total || 0}
                  placeholder='Total' />
              </Form.Item>

            </Col>
            {/* <Col span={2} style={{ background: 'black' }}></Col> */}
          </Row>
          {/* -----------------Text-area--------------- */}

          <Row gutter={24}>
            <Col className='gutter-row' span={4}></Col>
            <Col className='gutter-row' span={16}>
              <div className="te" style={{ padding: '0px 0' }}>
                <Divider orientation='left' orientationMargin={0}>Descriptions</Divider>
                <Form.Item
                  name="description"
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

          <Row gutter={[16, 16]}>
            <Col classsname='gutter-row' span={9}></Col>
            <Col classsname='gutter-row' span={8}>
              <div className='submitButton'>
                <Space>
                  <Form.Item className='submit'>
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
                  <Form.Item className='submit'>
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
            <Col classsname='gutter-row' span={10}></Col>
          </Row>

        </Form>

      </div>

    </>
  )
}

export default ExpenceForm;