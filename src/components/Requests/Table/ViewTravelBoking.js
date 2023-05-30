import React from "react";
import { Row, Form, Col, Divider } from "antd";
import "../travelManagement.css";

function ViewTravelBoking(props) {
    const viewTravelData = props?.data;

    console.log("viewTravelData", viewTravelData);
    return (
        <>
            <Form>
                <Row className="titleForModal">
                    <Col span={24}>
                        <span className="titleSpan">{viewTravelData.travelName}</span>
                        {/* <Form.Item label="Travel Title::" className="formCSS">            
            </Form.Item> */}
                    </Col>
                    <Col span={24}>
                        <Form.Item label="Reason::" className="formCSS">
                            {viewTravelData.reason}
                        </Form.Item>
                    </Col>
                </Row>
                {viewTravelData.travelType.map((travel, idx) => (
                    <>
                        {travel.bookingOption == "Travel" ? (
                            <div className="titleForModal">
                                <Divider
                                    orientation="left"
                                    orientationMargin="0px"
                                    className="dividerCss"
                                >
                                    Expenditure No.{idx + 1}
                                </Divider>
                                <Row>
                                    <Col span={12}>
                                        <Form.Item style={{marginBottom:'0px'}} label="Booking Type::">
                                            {travel.bookingOption}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item style={{marginBottom:'0px'}} label="Travel Date::">
                                            {travel.durationDate}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item style={{marginBottom:'0px'}} label="Departure::">{travel.depart}</Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item style={{marginBottom:'0px'}} label="Arrival::">{travel.arrival}</Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item style={{marginBottom:'0px'}} label="Transportation Type::">
                                            {travel.transport}
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </div>
                        ) : null}
                        {travel.bookingOption == "Hotel" ? (
                            <div className="titleForModal">
                                <Divider
                                    orientation="left"
                                    orientationMargin="0px"
                                    className="dividerCss"
                                >
                                    Expenditure No.{idx + 1}
                                </Divider>
                                <Row>
                                    <Col span={12}>
                                        <Form.Item style={{marginBottom:'0px'}} label="Booking Type::">
                                            {travel.bookingOption}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item style={{marginBottom:'0px'}} label="Date::">
                                            {travel.durationDate.join(" to ")}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item style={{marginBottom:'0px'}} label="Location::">{travel.location}</Form.Item>
                                    </Col>
                                </Row>
                            </div>
                        ) : null}
                        {travel.bookingOption == "Rental" ? (
                            <div className="titleForModal">
                                <Divider
                                    orientation="left"
                                    orientationMargin="0px"
                                    className="dividerCss"
                                >
                                    Expenditure No.{idx + 1}
                                </Divider>
                                <Row>
                                    <Col span={12}>
                                        <Form.Item style={{marginBottom:'0px'}} label="Booking Type::">
                                            {travel.bookingOption}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item style={{marginBottom:'0px'}} label="Date::">
                                            {travel.durationDate.join(" to ")}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item style={{marginBottom:'0px'}} label="Vehicle Type::">
                                            {travel.vehicleType}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item style={{marginBottom:'0px'}} label="Driver::">
                                            {JSON.stringify(travel.driver)}
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </div>
                        ) : null}
                    </>
                ))}
            </Form>
        </>
    );
}

export default ViewTravelBoking;
