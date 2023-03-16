import React from "react";
import { Row, Form, Col } from "antd";

function ViewTravelMng(props) {
  const viewTravelData = props.viewTravelData;

  console.log("viewTravelData", viewTravelData);
  return (
    <>
      <Form>
        <Row>
          <Col span={12}>
            <Form.Item label="Travel Title::">
              {viewTravelData.travelName}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="People::">{viewTravelData.people}</Form.Item>
          </Col>
          {viewTravelData.travelType.map((travel, idx) => (
            <>
              {travel.bookingOption == "travel" ? (
                <Row>
                  <Col span={12}>
                    <Form.Item label="Travel Type::">
                      {travel.bookingOption}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Travel Date::">
                      {travel.durationDate}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Departure::">{travel.depart}</Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Arrival::">{travel.arrival}</Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Transportation Type::">
                      {travel.transport}
                    </Form.Item>
                  </Col>
                </Row>
              ) : null}
              {travel.bookingOption == "hotel" ? (
                <Row>
                  <Col span={12}>
                    <Form.Item label="Travel Type::">
                      {travel.bookingOption}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Date::">{travel.durationDate}</Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Location::">{travel.location}</Form.Item>
                  </Col>
                </Row>
              ) : null}
              {travel.bookingOption == "rental" ? (
                <Row>
                  <Col span={12}>
                    <Form.Item label="Travel Type::">
                      {travel.bookingOption}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Date::">{travel.durationDate}</Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Vehicle Type::">
                      {travel.vehicleType}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Driver::">
                      {JSON.stringify(travel.driver)}
                    </Form.Item>
                  </Col>
                </Row>
              ) : null}
            </>
          ))}
        </Row>
      </Form>
    </>
  );
}

export default ViewTravelMng;
