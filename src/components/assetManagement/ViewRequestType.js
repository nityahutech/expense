import React from "react";
import { Col,Form,Row,Input, Divider } from "antd";
const { TextArea } = Input;

function ViewRequestType(props) {
  const laptopData = props.modalData;
  console.log(laptopData);

  return (
    <div>
      <Form
        
        layout="horizontal"
      >
      <Row 
      gutter={[16,8]}
      >
        <div style={{width:"45%",border:"1px solid black",marginRight:"1%",borderRadius:"10px"}}>
          <Col 
          span={24}>
            <Form.Item 
            labelCol={{span:12}}
            label="Laptop Name::">
            {laptopData?.lapname}
              </Form.Item>
            <Form.Item 
            labelCol={{span:12}}
            label="Model Name::">{laptopData?.modelName}</Form.Item >
            <Form.Item 
            labelCol={{span:12}}
            label="Serial Number::">{laptopData?.serialNum}</Form.Item >
            <Form.Item 
            labelCol={{span:12}}
            label="Date of Request::">{laptopData?.dateOfRepair}</Form.Item >
            
          </Col>
        </div>

        <div style={{width:"54%",border:"1px solid black",borderRadius:"10px"}}>
          <Col 
          span={12}>
            <Form.Item label="Upload Image::"></Form.Item >
          </Col>
        </div>

        <div style={{border:"1px solid black",width:"100%",borderRadius:"10px"}}>
          <Col 
          span={24}>
            <Form.Item 
            label="Reason::">
              {laptopData?.repairDes}</Form.Item >
          </Col>
        </div>
      </Row>
      </Form>
    </div>
  );
}

export default ViewRequestType;
