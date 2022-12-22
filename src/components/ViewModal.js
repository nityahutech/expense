import { Col, Divider, Row } from "antd";
import React, { useState } from "react";
import hutechlogo from "../images/hutechlogo.png";
import imageavailable from "../images/imageavailable.png";

function ViewModal(props) {
  const modalData = props.modalData;
  // console.log("modalData", modalData);
  const logoImg = new Image();
  const [dimensions, setDimensions] = useState({ height: null, width: null });

  logoImg.src = props.modalData.logo ? props.modalData.logo : null;
  logoImg.onload = () => {
    setDimensions({ height: logoImg.height, width: logoImg.width });
  };

  const imgStyle = () => {
    return dimensions.width > dimensions.height
      ? {
          width: "150px",
          padding: "10px",
          height: "70px",
          minWidth: "100px",
          // height: "70px"
        }
      : {
          maxHeight: "100px",
          padding: "10px",
          width: "auto",
          // height: "70px"
        };
  };

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
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "10px",
              }}
            >
              <span>{modalData.regOffice.addLine1},</span>
              <span>{modalData.regOffice.addLine2},</span>
              <span>
                {modalData.regOffice.city}, {modalData.regOffice.state},
              </span>
              <span>
                {modalData.regOffice.country} - {modalData.regOffice.pincode}
              </span>
            </div>
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
                marginTop: "10px",
              }}
            >
              <img
                src={modalData.logo ? modalData.logo : imageavailable}
                style={imgStyle()}
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
            style={{
              fontWeight: "600",
              fontSize: "16px",
              lineheight: "20px",
            }}
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
            <Row gutter={[30, 0]}>
              {modalData.accessList.map((user) => (
                <Col xs={22} sm={15} md={8}>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <Row gutter={[40, 0]}>
                      <Col xs={24} sm={24} md={24}>
                        <span>{user.name}</span>
                      </Col>
                      <Col xs={24} sm={24} md={24}>
                        <span>{user.mailid}</span>
                      </Col>
                      <Col xs={24} sm={24} md={24}>
                        <span>{user.phone}</span>
                      </Col>
                      <Col xs={24} sm={24} md={24}>
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

      {props.modalData.status == "Deactivated" ? (
        <>
          <Divider />
          <Row gutter={[50, 8]} style={{ marginTop: "17px", padding: "0 0" }}>
            <Col xs={24} sm={22} md={18}>
              <div>
                <span
                  style={{
                    fontWeight: "600",
                    fontSize: "16px",
                    lineheight: "20px",
                  }}
                >
                  Reason:
                </span>
                <span
                  style={{
                    fontSize: "14px",
                    lineHeight: "16px",
                    color: "red",
                    marginLeft: "10px",
                  }}
                >
                  {modalData.reason}
                </span>
              </div>
            </Col>
          </Row>
        </>
      ) : null}
    </div>
  );
}

export default ViewModal;
