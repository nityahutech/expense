import { Card, Row, Col } from "antd";
import React, { useState, useEffect } from "react";
import EmpInfoContext from "../../contexts/EmpInfoContext";
import { useAuth } from "../../contexts/AuthContext";
function Team() {
  const { currentUser } = useAuth();
  const [repManager, setRepManager] = useState("");
  const [secManager, setSecManager] = useState("");
  const [compId, setCompId] = useState(sessionStorage.getItem("compId"));
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    let data = await EmpInfoContext.getEduDetails(compId, currentUser.uid);
    setRepManager(data.repManager ? data.repManager : null);
    setSecManager(data.secManager ? data.secManager : null);
  };
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
                  <div>{repManager?repManager:"-"}</div>
              </Col>
              <Col span={12}>
                <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                  Secondary Manager
                </div>
                  <div>{secManager?secManager:"-"}</div>
              </Col>
            </Row>
          </Card>
      </div>
    </>
  );
}
export default Team;
