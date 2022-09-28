import { Card, Row, Col } from "antd";
import React from "react";

function Team() {
  return (
    <>
      <div
        className="teamCardDiv"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card
          title="TEAMS"
          style={{
            width: 800,
            margin: 20,
          }}
        >
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                Reporting Manager
              </div>
              <div>ANISHA MARIAM THOMAS</div>
            </Col>
            <Col span={12}>
              <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                Secondary Manager
              </div>
              <div>SWAYAMPRAVA NANDA</div>
            </Col>
          </Row>
        </Card>
      </div>
    </>
  );
}

export default Team;
