import React from "react";
import { Col, Form, Row, Input, Divider } from "antd";

function ViewInvoiceDetails(props) {
  const viewInvoiceData = props.invoiceData;

  return (
    <>
      <Form>
        <Row gutter={[16, 16]}>
          {viewInvoiceData.payments.map((invoice) => (
            <>
              <Col
                span={11}
                style={{
                  border: "1px solid black",
                  borderRadius: "10px",
                  marginLeft: "10px",
                }}
              >
                <Form.Item label="Payment Date::">
                  {invoice.paymentDate}
                </Form.Item>
                <Form.Item label="Amount::">{invoice.amount}</Form.Item>
                <Form.Item label="Description::">
                  {invoice.description}
                </Form.Item>
              </Col>
              <Col
                span={11}
                style={{
                  border: "1px solid black",
                  marginLeft: "18px",
                  borderRadius: "10px",
                }}
              >
                <div>
                  <Form.Item label="Upload Image::"></Form.Item>
                </div>
              </Col>
            </>
          ))}
        </Row>
      </Form>
    </>
  );
}

export default ViewInvoiceDetails;
