import { Col, Divider, Row } from "antd";
import React from "react";
import hutechlogo from "../images/hutechlogo.png";
import imageavailable from "../images/imageavailable.png";

function ViewModal(props) {
  const modalData = props.modalData;
  console.log("modalData", modalData);
  return (
    <div>
      <h3 style={{ fontWeight: "600", fontSize: "18px", lineheight: "22px" }}>
        {modalData.regCompName}
      </h3>
      <Divider />
      <Row gutter={[50, 8]}>
        <Col xs={22} sm={15} md={8}>
          <div>
            <h4
              style={{
                fontWeight: "600",
                fontSize: "16px",
                lineheight: "20px",
              }}
            >
              Organization Details
            </h4>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "17px",
              }}
            >
              <span>Code: {modalData.id}</span>
              <span>CIN: {modalData.cinNumber}</span>
              <span>GSTN: {modalData.gst}</span>
              <span>Domain: {modalData.domain}</span>
            </div>
          </div>
        </Col>
        <Col xs={22} sm={15} md={8}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h4
              style={{
                fontWeight: "600",
                fontSize: "16px",
                lineheight: "20px",
              }}
            >
              Address
            </h4>
            <span>{modalData.regOffice.addLine1},</span>
            <span>{modalData.regOffice.addLine2},</span>
            <span>
              {modalData.regOffice.city}, {modalData.regOffice.state},
            </span>
            <span>
              {modalData.regOffice.country} - {modalData.regOffice.pincode}
            </span>
          </div>
        </Col>
        <Col xs={22} sm={15} md={8}>
          <div>
            <h4
              style={{
                fontWeight: "600",
                fontSize: "16px",
                lineheight: "20px",
              }}
            >
              Organization Logo
            </h4>
            <div
              style={{
                border: "1px solid #d0d0d0",
                Width: "300px",
                height: "auto",
                borderRadius: "6px",
                display: "inline-block",
              }}
            >
              <img
                src={modalData.logo ? modalData.logo : imageavailable}
                style={{
                  maxWidth: "200px",
                  padding: "10px",
                  height: "70px",
                }}
                alt={"logo not found"}
              />
            </div>
          </div>
        </Col>
      </Row>
      <Divider />
      <Row gutter={[50, 8]} style={{ marginTop: "17px", padding: "0 25px" }}>
        <div>
          <h4
            style={{ fontWeight: "600", fontSize: "16px", lineheight: "20px" }}
          >
            Organization Access
          </h4>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Row gutter={[50, 8]}>
              {modalData.accessList.map((user) => (
                <Col xs={22} sm={15} md={8}>
                  <div>
                    <Row>
                      <Col span={24}>
                        <span>{user.name} </span>
                      </Col>
                      <Col span={24}>
                        <span>{user.mailid} </span>
                      </Col>
                      <Col span={24}>
                        <span>{user.phone} </span>
                      </Col>
                      <Col span={24}>
                        <span
                          style={{
                            borderRadius: "10px",
                            background: "#C9E5FF",
                            width: "130px",
                            display: "flex",
                            justifyContent: "center",
                            color: "#000000",
                            fontWeight: "400",
                            fontSize: "14px",

                            padding: "3px",
                          }}
                        >
                          {user.userRole}
                        </span>
                      </Col>
                    </Row>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </Row>
    </div>
  );
}

export default ViewModal;
