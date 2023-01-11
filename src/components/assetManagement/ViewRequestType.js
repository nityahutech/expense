import React from "react";
import { Col, Divider, Row } from "antd";

function ViewRequestType(props) {
  const laptopData = props.modalData;
  console.log(laptopData);

  return (
    <div>
      <Row>
        <Col span={12}>
          <div>
            <Row gutter={[16, 16]}>
              <Col span={12}>Laptop Name:</Col>
              <Col span={12}>{laptopData?.lapname}</Col>
              <Col>Model Name:</Col>
              <Col>{laptopData?.modelName}</Col>
              <Col>Serial Number:</Col>
              <Col>{laptopData?.serialNum}</Col>
              <Col>Date of Request:</Col>
              <Col>{laptopData?.dateOfRepair}</Col>
              <Col>Reason:</Col>
              <Col>{laptopData?.repairDes}</Col>
            </Row>
          </div>
        </Col>
        <Col span={12}>Upload Image :</Col>
      </Row>
    </div>
  );
}

export default ViewRequestType;
