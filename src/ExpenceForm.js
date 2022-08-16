import React from "react";
import { useState } from "react";
import "antd/dist/antd.css";
import { Col, Divider, Row } from "antd";
import { PlusOutlined } from "@ant-design/icons";
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
  Modal,
} from "antd";

// const categories = [
//   {
//     value: 'Fruits',
//     lable: 'Fruits',
//   },
//   {
//     value: 'Waterbottle',
//     lable: 'Waterbottle',
//   },
//   {
//     value: 'Snacks',
//     lable: 'Snacks',
//   },
//   {
//     value: 'Other',
//     lable: 'Other',
//   },
// ];

// const paystatus =[
//   {
//     value: 'Paid',
//     label: 'Paid',
//   },
//   {
//     value: 'Unpaid',
//     label: 'Unpaid',
//   },
// ];

const { TextArea } = Input;

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = (error) => reject(error);
  });

const ExpenceForm = () => {
  const { Option } = Select;

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const [number1, setNumber1] = useState();
  const [number2, setNumber2] = useState();
  const [total, setTotal] = useState();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);

  function calculateTotal() {
    setTotal(number1 * number2);
  }

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleFileChange = ({ fileList: newFileList }) => {
    console.log("newFileList:: ", newFileList);
    setFileList(newFileList);
  };
  //

  return (
    <>
      <div>
        {/* <Divider orientation="center">Expence Rgister</Divider> */}
        <Form
          labelcol={{
            span: 4,
          }}
          wrappercol={{
            span: 14,
          }}
        >
          <Row gutter={[24, 8]}>
            {/* ------------column-spacer-------------------- */}
            <Col span={6} style={{ background: "" }}></Col>
            {/* ------------Left-column-------------------- */}
            <Col span={6} style={{ background: "" }}>
              <Divider orientation="left" orientationMargin={0}>
                Category
              </Divider>
              <Form.Item
                name="cascade"
                rules={[
                  {
                    type: "array",
                    message: "Please enter the expence category",
                    required: true,
                  },
                ]}
              >
                <Select
                  placeholder="Choose Category"
                  style={{
                    width: "100%",
                  }}
                  onChange={handleChange}
                >
                  <Option value="fruits">Fruits</Option>
                  <Option value="Water">Water</Option>
                  <Option value="Others">Others</Option>
                </Select>
                {/* <Cascader 
              placeholder='Choose Category'
              options={categories} /> */}
              </Form.Item>
              {/* ------------------------------Paid By------- */}
              <Divider orientation="left" orientationMargin={0}>
                Paid By
              </Divider>
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please enter your name",
                  },
                ]}
              >
                <Input placeholder="Enter Customer Name" />
              </Form.Item>
              {/* -------------------------Expense type------- */}
              <Divider orientation="left" orientationMargin={0}>
                Nature of expense
              </Divider>
              <Form.Item
                name="expencetype"
                rules={[
                  {
                    required: true,
                    message: "Please enter the expence type",
                  },
                ]}
              >
                <Input placeholder="Enter Expense For" />
              </Form.Item>
              {/* ----------------------------------Status------- */}
              <Divider orientation="left" orientationMargin={0}>
                Status
              </Divider>
              <Form.Item
                name="cascade"
                rules={[
                  {
                    type: "array",
                    message: "Please enter the paymeny status",
                    required: true,
                  },
                ]}
              >
                <Select
                  placeholder="Choose Category"
                  style={{
                    width: "100%",
                  }}
                  onChange={handleChange}
                >
                  <Option value="fruits">Paid</Option>
                  <Option value="Water">Unpaid</Option>
                </Select>
                {/* <Cascader
                    
                    placeholder='Status of the payment'
                    options={paystatus} /> */}
              </Form.Item>
              {/* ----------------------------------------------------------Payment type------- */}
              <Divider orientation="left" orientationMargin={0}>
                Mode of Payment
              </Divider>
              <Form.Item
                name="paytype"
                rules={[
                  {
                    required: true,
                    message: "Please enter the paymeny status",
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
            <Col span={6} style={{ background: "" }}>
              {/* ----------------------------------Datepicker------- */}
              <Divider orientation="left" orientationMargin={0}>
                Date
              </Divider>
              <Form.Item
                name="paytype"
                rules={[
                  {
                    required: true,
                    message: "Please Choose a Date",
                  },
                ]}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  placeholder="Choose Date"
                />
              </Form.Item>
              {/* --------------------------------------Amount------- */}
              <Divider orientation="left" orientationMargin={0}>
                Amount
              </Divider>
              <Form.Item
                className="numder-inputs"
                name="amount"
                rules={[
                  {
                    required: true,
                    message: "Please enter the amount",
                  },
                ]}
              >
                <Input
                  // type="number"
                  value={number1}
                  onChange={(e) => {
                    const ant = e.target.value;
                    setNumber1(ant);
                    setTotal(ant * number2);
                  }}
                  placeholder="Enter Amount Here"
                />
              </Form.Item>
              {/* --------------------------------------Quantity------- */}
              <Divider orientation="left" orientationMargin={0}>
                Quantity
              </Divider>
              <Form.Item
                name="Quantity"
                rules={[
                  {
                    required: true,
                    message: "Please enter the quantity of the items/services",
                  },
                ]}
              >
                <Input
                  //  type="number"
                  value={number2}
                  onChange={(e) => {
                    const qty = e.target.value;
                    setNumber2(qty);
                    setTotal(qty * number1);
                  }}
                  placeholder="Quantity of the item"
                />
              </Form.Item>
              {/* --------------------------------------Sub-total------- */}
              <Divider orientation="left" orientationMargin={0}>
                Subtotal
              </Divider>
              <Form.Item>
                <Input
                  readOnly
                  // onChange={calculateTotal}
                  value={total}
                  placeholder="Total"
                />
              </Form.Item>
              {/* --------------------------------------Upload------- */}
              <Divider orientation="left" orientationMargin={0}>
                Upload
              </Divider>
              <Form.Item
                // label="Upload"
                value="fileList"
                // name="Quantity"
                // rules={[
                //   {
                //     required: true,
                //     message: "Please enter the quantity of the items/services",
                //   },
                // ]}
              >
                <Upload
                  multiple
                  action={"http://localhost:3001/"}
                  listType="picture-card"
                  name="fileList"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleFileChange}
                >
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                </Upload>
                <Modal
                  visible={previewVisible}
                  title={previewTitle}
                  footer={null}
                  onCancel={handleCancel}
                >
                  <img
                    alt="example"
                    style={{
                      width: "100%",
                    }}
                    src={previewImage}
                  />
                </Modal>
              </Form.Item>
            </Col>
            {/* ------------column-spacer-------------------- */}
            <Col span={6} style={{ background: "" }}></Col>
          </Row>
          {/* -----------------------Text-area--------------- */}
          <Row gutter={24}>
            <Col className="gutter-row" span={6}></Col>
            <Col className="gutter-row" span={12}>
              <div style={{ padding: "8px 0" }}>
                <Divider orientation="left" orientationMargin={0}>
                  Descriptions
                </Divider>
                <Form.Item
                  name="Textarea"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the Description ",
                    },
                  ]}
                >
                  <TextArea rows={4} />
                </Form.Item>
              </div>
            </Col>
            <Col className="gutter-row" span={6}></Col>
          </Row>
          {/* -----------------------Buttons--------------- */}
          <Row gutter={24}>
            <Col classsname="gutter-row" span={6}></Col>
            <Col classsname="gutter-row" span={12}>
              <div style={{ float: "right" }}>
                <Space>
                  <Form.Item>
                    <Button
                      style={{
                        background: "#C1C1C1",
                        borderRadius: "5px",
                        width: "134px",
                        height: "44px",
                        color: "white",
                        cursor: "pointer",
                      }}
                    >
                      Cancle
                    </Button>
                  </Form.Item>
                  <Form.Item>
                    <button
                      style={{
                        background: "#189AB4",
                        borderRadius: "5px",
                        borderWidth: "0px",
                        width: "134px",
                        height: "44px",
                        color: "white",
                        cursor: "pointer",
                      }}
                      type="primary"
                    >
                      Submit
                    </button>
                  </Form.Item>
                </Space>
              </div>
            </Col>
            <Col classsname="gutter-row" span={6}></Col>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default ExpenceForm;
