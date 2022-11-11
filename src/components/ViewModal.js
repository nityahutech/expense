import { Col, Divider, Row } from "antd";
import React from "react";
import hutechlogo from "../images/hutechlogo.png";
import imageavailable from "../images/imageavailable.png";

function ViewModal(props) {
  console.log("props", props.modalData);
  const modalData = props.modalData;
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
        <Col xs={22} sm={15} md={7}>
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
        <Col xs={22} sm={15} md={9}>
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
                maxWidth: "180px",
                height: "90px",
                borderRadius: "6px",
                display: "inline-block",
              }}
            >
              <img
                src={modalData.logo ? modalData.logo : imageavailable}
                style={{
                  maxWidth: "132px",
                  width: "auto",
                  height: "90px",
                  padding: "10px",
                }}
                alt={"logo not found"}
              />
            </div>
          </div>
        </Col>
      </Row>
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
                <Col xs={22} sm={15} md={9}>
                  <div>
                    <span>{user.name} </span>
                    <span>{user.mailid} </span>
                    <span>{user.phone} </span>
                    <span
                      style={{
                        borderRadius: "10px",
                        background: "#C9E5FF",
                        // width: "101px",
                        display: "flex",
                        justifyContent: "center",
                        color: "#000000",
                        fontWeight: "400",
                        fontSize: "14px",
                        // marginTop: "7px",
                      }}
                    >
                      {user.userRole}
                    </span>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </Row>
      {/* <Row gutter={[50, 8]}>
        <Col span={8}>
          <h4
            style={{ fontWeight: "600", fontSize: "16px", lineheight: "20px" }}
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
        </Col>
        <Col xs={22} sm={15} md={8}>
          <h4
            style={{ fontWeight: "600", fontSize: "16px", lineheight: "20px" }}
          >
            Organization Access
          </h4>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "17px",
            }}
          >
            <span>Anisha Mariam</span>
            <span>anisha@hutechsolutions.com</span>
            <span>9875733422</span>
            <span
              style={{
                borderRadius: "10px",
                background: "#C9E5FF",
                width: "101px",
                display: "flex",
                justifyContent: "center",
                color: "#000000",
                fontWeight: "400",
                fontSize: "14px",
                marginTop: "7px",
              }}
            >
              HR BP
            </span>
          </div>
        </Col>
        <Col xs={22} sm={15} md={8}>
          <h4
            style={{ fontWeight: "600", fontSize: "16px", lineheight: "20px" }}
          >
            Organization Logo
          </h4>
          <div
            style={{
              border: "1px solid #d0d0d0",
              width: "180px",
              height: "90px",
              borderRadius: "6px",
            }}
          >
            <img src={hutechlogo} style={{ width: "132px", margin: "22px" }} />
          </div>
        </Col>
        <Col xs={22} sm={15} md={8}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "17px",
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
            <span>N0 387, 6th Cross, 2nd sector, HSR Layout, </span>
            <span>Bangalore, Karnataka, 560068, India +91 93439 27070</span>
          </div>
        </Col>
        <Col xs={22} sm={15} md={8}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "22px",
            }}
          >
            <span>Anisha Mariam</span>
            <span>anisha@hutechsolutions.com</span>
            <span>9875733422</span>
            <span
              style={{
                borderRadius: "10px",
                background: "#C9E5FF",
                width: "101px",
                display: "flex",
                justifyContent: "center",
                color: "#000000",
                fontWeight: "400",
                fontSize: "14px",
                marginTop: "7px",
              }}
            >
              HR BP
            </span>
          </div>
        </Col>
        <Col xs={22} sm={15} md={8}>
          <div
            style={{
              border: "1px solid #d0d0d0",
              width: "180px",
              height: "90px",
              borderRadius: "6px",
            }}
          >
            <img
              src={imageavailable}
              style={{ margin: "15px", width: "160px" }}
            />
          </div>
        </Col>
      </Row> */}
    </div>
  );
}

export default ViewModal;
