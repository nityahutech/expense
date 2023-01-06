import { React, useState, useEffect } from 'react'
import "./RepairReq.css"
import {
  Card, Button, Row, Col, Form, Input, Space, DatePicker, message,
  Switch,

} from 'antd';

import FormItem from 'antd/es/form/FormItem';
import TextArea from 'antd/lib/input/TextArea';
import RepairRequestTable from './RepairRequestTable';
import AllocatedCard from './AllocatedCard';
import AssetContext from '../../contexts/AssetContext';


function LaptopAllot() {
  const [form] = Form.useForm();
  const [file, setFile] = useState("");
  const [selectedOption, setSelectedOption] = useState('repair');
  const [alltmentData, setAlloctmentData] = useState([])
  console.log(alltmentData, 'jjjjjjjjjjj')
  const compId = sessionStorage.getItem("compId");
  const currentUser = JSON.parse(sessionStorage.getItem('user'))

  const onReset = () => {
    setSelectedOption(false)
    form.resetFields();
  };

  const onFinish = (values) => {
    console.log(values, 'values')
    form.resetFields();
  }

  useEffect(() => {
    getAllotmentData()
  }, [])

  const getAllotmentData = async () => {
    let allData = await AssetContext.getEmpAllot(currentUser.uid);
    console.log(allData, 'allllll')
    setAlloctmentData(allData)


  }


  const divStyle = {
    border: "1px solid #8692A6",
    borderRadius: "4px",
    width: '100%',
  }

  const resetButton = {
    border: "1px solid #1565D8",
    color: "#1565D8",
    fontWeight: "600",
    fontSize: "14px",
    lineHeight: "17px",
    width: "99px",
    marginTop: "10px",
    cursor: "pointer",

  }
  const submitButton = {
    border: "1px solid #1565D8",
    background: "#1565D8",
    color: "#ffffff",
    fontWeight: "600",
    fontSize: "14px",
    lineHeight: "17px",
    width: "99px",
    marginTop: "10px",
    cursor: "pointer",
    marginLeft: "17px",
  }


  function handleChange(event) {
    let file = event.target.files[0]
    console.log('handleupload', file)
    setFile(null);
    const isPdf = file.type === 'application/pdf';
    if (!isPdf) {
      message.error('You can only upload Pdf file!');
      return
    }

    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('File must smaller than 2MB!');
      return
    }
    setFile(event.target.files[0]);
  }



  return (
    <>
      <div> <AllocatedCard /></div>

      <div className='laptopDiv'>
        <Card
          title=" Repair / Upgrade Form"
          className='laptopcard'
          bordered={true}
          hoverable={true}
        >
          <Form
            className="addEmp"
            form={form}
            layout="vertical"
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

            <Row gutter={[32, 0]}>
              <Col span={24}>
                <Form.Item label="Select a Form" name="option">
                  <Switch checkedChildren="Upgrade Form" unCheckedChildren="Repair Form" checked={selectedOption === 'upgrade'} onChange={() => setSelectedOption(selectedOption === 'repair' ? 'upgrade' : 'repair')} />
                </Form.Item>
              </Col>
              {/* ----------------------laptopAllortment */}


              {selectedOption === 'repair' && (<>

                <Col span={12}>
                  <FormItem
                    name='lapname'
                    label="Laptop Name"
                    initialValue={alltmentData.lapname}
                  >
                    <Input style={divStyle} span={6} />
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem
                    name='model'
                    label="Model"
                  >
                    <Input style={divStyle} />
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem
                    name='serNum'
                    label="Serial Number"
                  >
                    <Input style={divStyle} />
                  </FormItem>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="dorepair"
                    label="Date Of Repairing Request"
                    placeholder="Choose Date"
                    rules={[
                      {
                        required: true,
                        message: "Please Choose a Date",
                      },
                    ]}
                  >

                    <DatePicker
                      format={"DD-MM-YYYY"}

                      placeholder="Choose Date"
                      style={divStyle}
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="reasonreapir"
                    label="Reason"

                    rules={[
                      {
                        required: true,
                        message: "Please enter Reason",
                      },
                      {

                        message: "Please enter Valid Reason",
                      },
                    ]}
                  >
                    <TextArea Rows={4} maxLength={100} autoSize={{ minRows: 4, maxRows: 4 }} placeholder='Max 100 Words' style={divStyle} />

                  </Form.Item>
                </Col>
                <Col span={12}>
                  <FormItem
                    name="photoreapir"
                    label="Upload photos if (Physical Damage)"
                  >
                    <div className='idpage'>
                      <Input
                        type="file"
                        accept='application/pdf'
                        id="upload"
                        name="upload"
                        onChange={handleChange}
                        style={{ borderRadius: '5px' }}
                      />
                    </div>
                  </FormItem>
                </Col>
                <Col span={24} classsname="gutter-row" style={{
                  display: "flex",
                  justifyContent: "flex-end",
                }} >

                  <Space >
                    <Form.Item>
                      <Button
                        style={resetButton}
                        onClick={onReset}
                      >
                        Reset
                      </Button>
                    </Form.Item>
                    <Form.Item>
                      <Button
                        style={submitButton}
                        htmlType="submit"
                      // onClick={() => form.submit(handleSubmit3)}
                      >
                        Submit
                      </Button>
                    </Form.Item>
                  </Space>

                </Col>
              </>
              )}
              {/* //-------------------UPGRADE REQUEST------------- */}
              {selectedOption === 'upgrade' && (<>

                <Col span={12}>
                  <FormItem
                    name='lapname'
                    label="Laptop Name"
                  >
                    <Input style={divStyle} span={6} />
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem
                    name='model'
                    label="Model"
                  >
                    <Input style={divStyle} />
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem
                    name='serNum'
                    label="Serial Number"
                  >
                    <Input style={divStyle} />
                  </FormItem>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="doUpgrade"
                    label="Date Of Upgrade Request"
                    placeholder="Choose Date"
                    rules={[
                      {
                        required: true,
                        message: "Please Choose a Date",
                      },
                    ]}
                  >

                    <DatePicker
                      format={"DD-MM-YYYY"}

                      placeholder="Choose Date"
                      style={divStyle}
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="reasonupgrade"
                    label="Reason"

                    rules={[
                      {
                        required: true,
                        message: "Please enter Reason",
                      },
                      {

                        message: "Please enter Valid Reason",
                      },
                    ]}
                  >
                    <TextArea Rows={4} maxLength={100} autoSize={{ minRows: 4, maxRows: 4 }} placeholder='Max 100 Words' style={divStyle} />

                  </Form.Item>
                </Col>
                <Col span={24} classsname="gutter-row" style={{
                  display: "flex",
                  justifyContent: "flex-end",
                }} >

                  <Space >
                    <Form.Item>
                      <Button
                        style={resetButton}
                        onClick={onReset}
                      >
                        Reset
                      </Button>
                    </Form.Item>
                    <Form.Item>
                      <Button
                        style={submitButton}
                        htmlType="submit"
                      // onClick={() => form.submit(handleSubmit3)}
                      >
                        Submit
                      </Button>
                    </Form.Item>
                  </Space>

                </Col>
              </>
              )}
            </Row>
          </Form>
        </Card>
      </div>
      <div> <RepairRequestTable /></div>

    </>
  )
}

export default LaptopAllot