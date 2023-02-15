import { useState, useEffect } from "react";
import { Card, Row, Col, Divider, Skeleton } from "antd";
import "../../style/BankAccount.css";

function Work(props) {
  const [data, setData] = useState(props.data)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true);
    setData(props.data);
    setLoading(false);
  }, [props.data]);

  return (
    <>
      <div
        className="workCardDiv"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
      {loading ? (<Skeleton active/>) :(
        <Card
          title="WORK DETAILS"
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
            <Col xs={24} sm={24} md={24} 
            style={
              {display:"flex",
              flexDirection:"row"
              }}>
              <div
                style={{
                  fontWeight: 600,
                  lineHeight: "18px",
                  color: "#07182b",
                  fontSize: "18px",
                  fontFamily: "Open Sans,sans-serif",
                }}
              >
                Employee ID :- 
              </div>
              <div
                style={{
                  fontWeight: 600,
                  lineHeight: "18px",
                  color: "#07182b",
                  fontSize: "18px",
                  fontFamily: "Open Sans,sans-serif",
                  marginLeft:"10px"
                }}
              >{data.empId}</div>
            </Col>
            <Divider style={{margin:"0px", backgroundColor:"darkcyan"}}/>
            <Col xs={24} sm={12} md={12}>
              <div
                style={{
                  fontWeight: 600,
                  lineHeight: "18px",
                  color: "#07182b",
                  fontSize: "15px",
                  fontFamily: "Open Sans,sans-serif",
                }}
              >
                Designation
              </div>
              <div>{data.designation}</div>
            </Col>
            <Col xs={24} sm={12} md={12}>
              <div
                style={{
                  fontWeight: 600,
                  lineHeight: "18px",
                  color: "#07182b",
                  fontSize: "15px",
                  fontFamily: "Open Sans,sans-serif",
                }}
              >
                Date of Joining
              </div>
              <div>{data.doj || "-"}</div>
            </Col>
            <Col xs={2} sm={12} md={12}>
              <div
                style={{
                  fontWeight: 600,
                  lineHeight: "18px",
                  color: "#07182b",
                  fontSize: "15px",
                  fontFamily: "Open Sans,sans-serif",
                }}
              >
                Probation Period
              </div>
              <div>90</div>
            </Col>
            <Col xs={24} sm={12} md={12}>
              <div
                style={{
                  fontWeight: 600,
                  lineHeight: "18px",
                  color: "#07182b",
                  fontSize: "15px",
                  fontFamily: "Open Sans,sans-serif",
                }}
              >
                Employee Type
              </div>
              <div>{data.empType || "-"}</div>
            </Col>
            <Col xs={24} sm={12} md={12}>
              <div
                style={{
                  fontWeight: 600,
                  lineHeight: "18px",
                  color: "#07182b",
                  fontSize: "15px",
                  fontFamily: "Open Sans,sans-serif",
                }}
              >
                Work Location
              </div>
              <div>{data.workLocation || "-"}</div>
            </Col>
            <Col xs={24} sm={12} md={12}>
              <div
                style={{
                  fontWeight: 600,
                  lineHeight: "18px",
                  color: "#07182b",
                  fontSize: "15px",
                  fontFamily: "Open Sans,sans-serif",
                }}
              >
                Department
              </div>
              <div>{data.department || "-"}</div>
            </Col>
          </Row>
        </Card>)}
      </div>
    </>
  );
}
export default Work;
