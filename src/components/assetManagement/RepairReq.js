import { React, useState } from 'react'
import "./RepairReq.css"
import { Card, Button, Row, Col, Form, Input, Modal, Select, Space, DatePicker, Upload } from 'antd';
import { EditFilled, PlusOutlined } from "@ant-design/icons";
import FormItem from 'antd/es/form/FormItem';
import TextArea from 'antd/lib/input/TextArea';
import RepairRequestTable from './RepairRequestTable';
const { Option } = Select;

function LaptopAllot() {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values) => {
    console.log(values, 'values')

  }
  const handleSubmit1 = (values) => {
    // do something with the form values for option1
    console.log(values, 'values')
  };
  const handleSubmit2 = (values) => {
    // do something with the form values for option1
    console.log(values, 'values')
  };
  const handleSubmit3 = (values) => {
    // do something with the form values for option1
    console.log(values, 'values')
  };

  const divStyle = {

    border: "1px solid #8692A6",
    borderRadius: "4px",
    width: '100%'

  }

  const handleOptionChange = value => {
    setSelectedOption(value);
  };


  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  return (
    <>
      <div className='laptopDiv'>
        <Card
          title="New Alloctment / Repair / Upgrade Form"
          className='laptopcard'
          extra={<>
            <Button
              className="edit"
              type="text"
              onClick={showModal}
            >
              <EditFilled />
            </Button>
          </>}
          bordered={true}
          hoverable={true}
        >
          <Form
            className="addEmp"
            // style={{ margin: "30px" }}
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
          // onFinish={onFinish}

          >
            <Row gutter={[32, 0]}>
              <Form form={form} >
                <Form.Item label="Select an option" name="option">
                  <Select placeholder="Select an option" onChange={handleOptionChange}>
                    <Option value="option1">LAPTOP ALLOTMENT</Option>
                    <Option value="option2">REPAIR REQUEST</Option>
                    <Option value="option3">UPDATE REQUEST</Option>
                  </Select>
                </Form.Item>

                {selectedOption === 'option1' && (
                  <Row gutter={[32, 0]}>
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
                        name="doIssue"
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
                        name="reason"
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
                        <TextArea maxLength={100} autoSize={{ minRows: 4, maxRows: 4 }} placeholder='Max 100 Words' style={divStyle} />

                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <FormItem
                        name="photo"
                        label="Upload photos if (Physical Damage)"
                      >
                        <Upload
                          listType="picture-card"
                        >
                          {uploadButton}
                        </Upload>
                      </FormItem>
                    </Col>
                    <Row gutter={[24, 16]}>
                      <Col classsname="gutter-row" span={9}></Col>
                      <Col classsname="gutter-row">
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "end",
                            marginRight: "94px",
                          }}
                        >
                          <Space>
                            <Form.Item>
                              <Button
                                style={{
                                  border: "1px solid #1565D8",
                                  color: "#1565D8",
                                  fontWeight: "600",
                                  fontSize: "14px",
                                  lineHeight: "17px",
                                  width: "99px",
                                  marginTop: "10px",
                                  cursor: "pointer",
                                }}
                              // onClick={onReset}
                              >
                                Reset
                              </Button>
                            </Form.Item>
                            <Form.Item>
                              <Button
                                style={{
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
                                }}
                                htmlType="submit"
                                onClick={() => form.submit(handleSubmit1)}
                              >
                                Submit
                              </Button>
                            </Form.Item>
                          </Space>
                        </div>
                      </Col>

                    </Row>
                  </Row>
                )}
                {selectedOption === 'option2' && (
                  <Row gutter={[32, 0]}>
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
                        name="doIssue"
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
                        name="reason"
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
                        <TextArea maxLength={100} autoSize={{ minRows: 4, maxRows: 4 }} placeholder='Max 100 Words' style={divStyle} />

                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <FormItem
                        name="photo"
                        label="Upload photos if (Physical Damage)"
                      >
                        <Upload
                          listType="picture-card"
                        >
                          {uploadButton}
                        </Upload>
                      </FormItem>
                    </Col>
                    <Row gutter={[24, 16]}>
                      <Col classsname="gutter-row" span={9}></Col>
                      <Col classsname="gutter-row">
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "end",
                            marginRight: "94px",
                          }}
                        >
                          <Space>
                            <Form.Item>
                              <Button
                                style={{
                                  border: "1px solid #1565D8",
                                  color: "#1565D8",
                                  fontWeight: "600",
                                  fontSize: "14px",
                                  lineHeight: "17px",
                                  width: "99px",
                                  marginTop: "10px",
                                  cursor: "pointer",
                                }}
                              // onClick={onReset}
                              >
                                Reset
                              </Button>
                            </Form.Item>
                            <Form.Item>
                              <Button
                                style={{
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
                                }}
                                htmlType="submit"
                                onClick={() => form.submit(handleSubmit2)}
                              >
                                Submit
                              </Button>
                            </Form.Item>
                          </Space>
                        </div>
                      </Col>

                    </Row>
                  </Row>
                )}

                {/* //-------------------UPGRADE REQUEST------------- */}

                {selectedOption === 'option3' && (
                  <Row gutter={[32, 0]}>
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
                        name="doIssue"
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
                        name="reason"
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
                        <TextArea maxLength={100} autoSize={{ minRows: 4, maxRows: 4 }} placeholder='Max 100 Words' style={divStyle} />

                      </Form.Item>
                    </Col>

                    <Row gutter={[24, 16]}>
                      <Col classsname="gutter-row" span={9}></Col>
                      <Col classsname="gutter-row">
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "end",
                            marginRight: "94px",
                          }}
                        >
                          <Space>
                            <Form.Item>
                              <Button
                                style={{
                                  border: "1px solid #1565D8",
                                  color: "#1565D8",
                                  fontWeight: "600",
                                  fontSize: "14px",
                                  lineHeight: "17px",
                                  width: "99px",
                                  marginTop: "10px",
                                  cursor: "pointer",
                                }}
                              // onClick={onReset}
                              >
                                Reset
                              </Button>
                            </Form.Item>
                            <Form.Item>
                              <Button
                                style={{
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
                                }}
                                htmlType="submit"
                                onClick={() => form.submit(handleSubmit3)}
                              >
                                Submit
                              </Button>
                            </Form.Item>
                          </Space>
                        </div>
                      </Col>

                    </Row>
                  </Row>

                )}
              </Form>


            </Row>

          </Form>
        </Card>

        {/* <Modal
          title="Repair Request"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >

        </Modal> */}
      </div>



      <div> <RepairRequestTable />;</div>
    </>
  )
}

export default LaptopAllot