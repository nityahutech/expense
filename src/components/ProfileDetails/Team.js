import { Card, Row, Col, Skeleton } from "antd";
import { useState, useEffect } from "react";

function Team(props) {
  const [data, setData] = useState(props.data);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true);
    setData(props.data);
    setLoading(false);
  }, [props.data]);
  
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
      {loading ? (<Skeleton active/>) :(
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
              <div>{data.repManager || "-"}</div>
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
              <div>{data.secManager || "-"}</div>
            </Col>
          </Row>
        </Card>)}
      </div>
    </>
  );
}
export default Team;
