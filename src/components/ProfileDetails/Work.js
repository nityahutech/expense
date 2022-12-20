import { useState, useEffect } from "react";
import { Card, Row, Col, Divider } from "antd";
import EmpInfoContext from "../../contexts/EmpInfoContext";
import "../../style/BankAccount.css";
// import { color } from "html2canvas/dist/types/css/types/color";

function Work() {
  const currentUser = JSON.parse(sessionStorage.getItem("user"));
  const [empID, setEmpID] = useState("")
  const [designation, setDesignation] = useState("");
  const [doj, setDoj] = useState("");
  const [department, setDepartment] = useState("");
  const [workLocation, setWorkLocation] = useState("");
  const [empType, setEmpType] = useState("");
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    let data = await EmpInfoContext.getEduDetails(currentUser.uid);
    setDesignation(data.designation ? data.designation : null);
    setDoj(data.doj ? data.doj : null);
    setWorkLocation(data.workLocation ? data.workLocation : null);
    setDepartment(data.department ? data.department : null);
    setEmpType(data.empType ? data.empType : null);
    setEmpID(data.empId ? data.empId : null);
    console.log(data.empId)
  };
  console.log(empID)
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
              >{empID ? empID : "-"}</div>
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
              <div>{designation ? designation : "-"}</div>
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
              <div>{doj ? doj : "-"}</div>
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
              <div>{empType ? empType : "-"}</div>
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
              <div>{workLocation ? workLocation : "-"}</div>
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
              <div>{department ? department : "-"}</div>
            </Col>
          </Row>
        </Card>
      </div>
    </>
  );
}
export default Work;
