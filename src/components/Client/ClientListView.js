import React, { useEffect, useState } from "react";
import {
    Col,
    Divider,
    Row,
    Form,
    Card,
    Avatar,
    Typography,
    Timeline,
    Modal,
} from "antd";

const styleFont = {
    marginBottom: "0px",
    fontSize: "15px",
    fontFamily: "Open Sans",
};

const styleFont1 = {
    marginBottom: "0px",
    fontSize: "25px",
    fontFamily: "Open Sans",
};

function ClientListview(props) {
    const showRecord = props.showRecord;

    return (
        <>
            <div>
                <Card
                    className="card-profile-head"
                    bodyStyle={{ display: "none" }}
                    style={{ borderRadius: "10px" }}
                    title={
                        <Row align="middle" gutter={[24, 0]}>
                            <Col
                                span={24}
                                md={12}
                                style={{ display: "flex", justifyContent: "space-between" }}
                                className="col-info"
                            >
                                <Avatar.Group
                                    className="card-profile-photo"
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-evenly",
                                        width: "100%",
                                    }}
                                >
                                    <Avatar
                                        size={75}
                                        src={showRecord.profilePic}
                                        style={{
                                            // borderRadius: '50%',
                                            border: "1px solid black",
                                            objectFit: "contain",
                                            textAlign: "center",
                                        }}

                                    />

                                    <div className="avatar-info">
                                        <h4 style={styleFont1}>
                                            {showRecord.fname ? showRecord.fname : "-"}
                                        </h4>
                                        <h5 style={styleFont}>
                                            {showRecord.designation ? showRecord.designation : "-"}
                                        </h5>
                                        <h4 style={styleFont1}>
                                            Employee ID : {showRecord.empId ? showRecord.empId : "-"}
                                        </h4>
                                        <h5 style={styleFont}>
                                            Date of Joining : {showRecord.doj ? showRecord.doj : "-"}
                                        </h5>
                                    </div>
                                </Avatar.Group>


                            </Col>

                            <Col span={12}>
                                <Form
                                    layout="horizontal"
                                    name="wrap"
                                    labelCol={{
                                        flex: "150px",
                                    }}
                                    labelAlign="left"
                                    labelWrap
                                    wrapperCol={{
                                        flex: 1,
                                    }}
                                    colon={false}
                                >
                                    <Col xs={24} sm={24} md={24}>
                                        <Form.Item
                                            className="profilestyle"
                                            style={styleFont}
                                            label="Full Name"
                                        >
                                            <span>
                                                {showRecord.fname +
                                                    " " +
                                                    showRecord.mname +
                                                    " " +
                                                    showRecord.lname}
                                            </span>
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} sm={24} md={24}>
                                        <Form.Item
                                            className="profilestyle"
                                            style={styleFont}
                                            label="Gender"
                                        >
                                            <span>{showRecord.gender ? showRecord.gender : "-"}</span>
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={24}>
                                        <Form.Item
                                            className="profilestyle"
                                            style={styleFont}
                                            label="Phone"
                                        >
                                            <span>
                                                {showRecord.phonenumber ? showRecord.phonenumber : "-"}
                                            </span>
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={24}>
                                        <Form.Item
                                            className="profilestyle"
                                            style={styleFont}
                                            label="Email Id"
                                        >
                                            <span>{showRecord.mailid ? showRecord.mailid : "-"}</span>
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={24}>
                                        <Form.Item
                                            className="profilestyle"
                                            style={styleFont}
                                            label="Work Location"
                                        >
                                            <span>
                                                {showRecord.location ? showRecord.location : "-"}
                                            </span>
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={24}>
                                        <Form.Item
                                            className="profilestyle"
                                            style={styleFont}
                                            label="Reports to"
                                        >
                                            <span>
                                                {showRecord.repManager ? showRecord.repManager : "-"}
                                            </span>
                                        </Form.Item>
                                    </Col>
                                </Form>
                            </Col>
                        </Row>
                    }
                ></Card>
            </div>
        </>
    );
}

export default ClientListview;
