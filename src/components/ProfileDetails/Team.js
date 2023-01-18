import { Card, Row, Col } from "antd";
import { useState, useEffect } from "react";
import EmpInfoContext from "../../contexts/EmpInfoContext";

function Team() {

  const currentUser = JSON.parse(sessionStorage.getItem("user"));
  const [repManager, setRepManager] = useState("");
  const [secManager, setSecManager] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let data = await EmpInfoContext.getEduDetails(currentUser.uid);
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
          className="personal"
          hoverable={true}
          bordered={true}
          style={{
            width: '75%',
            marginTop: 10,
            marginBottom: 10,
            borderRadius:"10px",
            cursor:"default",
          }}
        >
          <Row gutter={[16, 16]}>
            <Col xs={22} sm={20} md={12}>
              <div
                style={{
                  fontWeight: 600,
                  lineHeight: "18px",
                  color: "#07182b",
                  fontSize: "15px",
                  fontFamily: "Open Sans,sans-serif",
                }}
              >
                Reporting Manager
              </div>
              <div>{repManager ? repManager : "-"}</div>
            </Col>
            <Col xs={22} sm={20} md={12}>
              <div
                style={{
                  fontWeight: 600,
                  lineHeight: "18px",
                  color: "#07182b",
                  fontSize: "15px",
                  fontFamily: "Open Sans,sans-serif",
                }}
              >
                Secondary Manager
              </div>
              <div>{secManager ? secManager : "-"}</div>
            </Col>
          </Row>
        </Card>
      </div>
    </>
  );
}
export default Team;
