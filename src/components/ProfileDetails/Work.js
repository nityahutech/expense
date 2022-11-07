import React, { useState, useEffect } from "react";
import { Card, Row, Col } from "antd";
import EmpInfoContext from "../../contexts/EmpInfoContext";
import { useAuth } from "../../contexts/AuthContext";
function Work() {
  const{currentUser}=useAuth()
  const [designation, setDesignation] = useState("");
  const [doj, setDoj] = useState("");
  const [department, setDepartment] = useState("");
  const [workLocation, setWorkLocation] = useState("");
  const [empType, setEmpType] = useState("");
  useEffect(() => {
    getData();
  }, [])
  const getData=async()=>{
    let data=await EmpInfoContext.getEduDetails(currentUser.uid)
    setDesignation(data.designation?data.designation:null)
    setDoj(data.doj?data.doj:null)
    setWorkLocation(data.workLocation?data.workLocation:null)
    setDepartment(data.department?data.department:null)
    setEmpType(data.empType?data.empType:null)
  }
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
            style={{
              width: 800,
              margin: 20,
            }}
          >
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                  Designation
                </div>
                  <div>{designation? designation: "-"}</div>
              </Col>
              <Col span={12}>
                <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                  Date of Joining
                </div>
                  <div>{doj? doj: "-"}</div>
              </Col>
            </Row>
            <Row gutter={[16, 16]} style={{ marginTop: "5%" }}>
              <Col span={12}>
                <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                  Probation Period
                </div>
                <div>90</div>
              </Col>
              <Col span={12}>
                <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                  Employee Type
                </div>
                <div>{empType? empType: "-"}</div>
                
              </Col>
            </Row>
            <Row gutter={[16, 16]} style={{ marginTop: "5%" }}>
              <Col span={12}>
                <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                  Work Location
                </div>
                  <div>{workLocation? workLocation: "-"}</div>
              </Col>
              <Col span={12}>
                <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                  Department
                </div>
                  <div>{department? department: "-"}</div>
              </Col>
            </Row>
          </Card>
      </div>
    </>
  );
}
export default Work;
