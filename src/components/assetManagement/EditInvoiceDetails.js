import { React, useState } from "react";
import {
  Card,
  Row,
  Col,
  Button,
  Input,
  Form,
  Table,
  DatePicker,
  TextArea,
  Space,
  Divider,
  Tooltip,
  Tag,
  Modal,
} from "antd";
import {
  MinusCircleOutlined,
  PlusOutlined,
  CheckOutlined,
  CloseOutlined,
  EyeFilled,
  EditFilled,
} from "@ant-design/icons";
import {
  showNotification,
  checkAlphabets,
  createUser,
} from "../../contexts/CreateContext";
import moment from "moment";
import InvoiceContext from "../../contexts/InvoiceContext";
import EmpInfoContext from "../../contexts/EmpInfoContext";

function EditInvoiceDetails(props) {
  const { TextArea } = Input;
  const editInvoiceData = props.invoiceData 
  console.log(editInvoiceData);

  return (
    <>
      <Form
        layout="vertical"
        className="invoiceForm"
        
      > 
        <Row gutter={[44, 8]}>
          {editInvoiceData.payments.map((edit,i)=>(<>
          <Divider
            orientation="left"
            orientationMargin="10px"
          >
            Expenditure No.{i+1}
          </Divider>
          <Col span={12}>
            <Form.Item
            name="paymentDate"
            initialValue={editInvoiceData?.paymentDate}
              label="Date of Payment"
              rules={[
                {
                  required: true,
                  message: "Missing Payment Date",
                },
              ]}
            >
              <DatePicker 
                style={{width:"100%"}}
                format={"DD-MM-YYYY"} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              initialValue={editInvoiceData?.amount}
              name="amount"
              label="Amount"
              rules={[
                {
                  required: true,
                  message: "Missing Amount",
                },
                {
                  pattern: /^[0-9\s]*$/,
                  message: "Please Enter Valid Title",
                },
              ]}
            >
              <Input
                placeholder="Enter Amount"
                maxLength={10}
                style={{borderRadius:"5px"}}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              initialValue={editInvoiceData?.description}
              name="description"
              label="Description"
              rules={[
                {
                  required: true,
                  message: "Missing Description",
                },
              ]}
            >
              <TextArea
                autoSize={{ minRows: 5, maxRows: 6 }  } 
                placeholder="Enter Description" 
                maxLength={150}
                style={{borderRadius:"5px"}}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              initialValue={editInvoiceData?.upload}
              label="Upload"
              name="upload"
            >
              <div className="idpage">
                <Input
                  type="file"
                  accept="application/pdf"
                  id="upload"
                  name="upload"
                  style={{ borderRadius: "5px" }}
                />
              </div>
            </Form.Item>
          </Col>
          <Col span={24} className="formButton">
            <Button
                          type="text"
                          style={{ marginRight: "10px" }}
                          
                        >
                          <CloseOutlined />
                          Cancel
            </Button>
            <Button
                          htmlType="submit"
                          style={{
                            border: "1px solid #1963A6",
                            background: "#1963A6",
                            color: "#ffffff",
                            fontSize: "15",
                            lineHeight: "17px",
                            // width: "119px",
                          }}
                          type="primary"
                        >
                          <CheckOutlined />
                          Submit
            </Button>
          </Col>
          </> ))}
        </Row>
      </Form>
    </>
  );
}

export default EditInvoiceDetails;
