import React, { useState } from "react";
import { Col, Form, Row, Input, Divider } from "antd";
const { TextArea } = Input;

function ViewLaptopUpgrade(props) {


  const laptopData = props.data;
  console.log('props', props, laptopData)

  return (
    <>

      <div>
        <Form layout="horizontal">
          <Row gutter={[16, 8]}>
            <div style={{ display: "flex", width: "100% " }}>
              <div
                style={{
                  width: "120%",
                  border: "1px solid black",
                  marginRight: "1%",
                  borderRadius: "10px",
                }}
              >
                <Col span={24}>
                  <Form.Item
                    style={{ marginBottom: "0px" }}
                    labelCol={{ span: 12 }}
                    label="Laptop Name:"
                  >
                    {laptopData?.lapname}
                  </Form.Item>
                  <Form.Item
                    style={{ marginBottom: "0px" }}
                    labelCol={{ span: 12 }}
                    label="Model Name:"
                  >
                    {laptopData?.modelName}
                  </Form.Item>
                  <Form.Item
                    style={{ marginBottom: "0px" }}
                    labelCol={{ span: 12 }}
                    label="Serial Number:"
                  >
                    {laptopData?.serialNum}
                  </Form.Item>
                  <Form.Item
                    style={{ marginBottom: "0px" }}
                    labelCol={{ span: 12 }}
                    label="Date of Request:"
                  >
                    {laptopData?.date}
                  </Form.Item>
                </Col>
              </div>
            </div>


            <div
              style={{
                border: "1px solid black",
                width: "100%",
                borderRadius: "10px",
              }}
            >
              <Col span={24}>
                <Form.Item label="Reason::">
                  {laptopData?.data?.repairDes}
                </Form.Item>
              </Col>
            </div>

          </Row>
        </Form>
      </div>

    </>
  );
}

export default ViewLaptopUpgrade;
