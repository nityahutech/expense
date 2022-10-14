import { Card, Row, Col, Form } from "antd";
import React, { useState, useEffect } from "react";
import EmpInfoContext from "../../contexts/EmpInfoContext";
import { useAuth } from "../../contexts/AuthContext";
function Team() {
  const { currentUser } = useAuth();
  const [data, setData] = useState([]);
  const [repManager, setRepManager] = useState("");
  const [secManager, setSecManager] = useState("");
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    let data = await EmpInfoContext.getEduDetails(currentUser.uid);
    //setData(data);
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
        <Form
          // form={form}
          labelcol={{
            span: 4,
          }}
          wrappercol={{
            span: 14,
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
          // onFinish={onFinish}
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
                <Form.Item
                  // initialValue={data.fname + " " + data.lname}
                  name="repManager"
                  rules={[
                    {
                      // required: true,
                      minLength: 3,
                      maxLength: 20,
                      // message: "Please enter First Name",
                    },
                    {
                      pattern: /^[a-zA-Z\s]*$/,
                      message: "Please enter Valid Name",
                    },
                  ]}
                >
                  <div>{repManager}</div>
                </Form.Item>
              </Col>
              <Col span={12}>
                <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                  Secondary Manager
                </div>
                <Form.Item
                  // initialValue={data.fname + " " + data.lname}
                  name="secManager"
                  rules={[
                    {
                      // required: true,
                      minLength: 3,
                      maxLength: 20,
                      // message: "Please enter First Name",
                    },
                    {
                      pattern: /^[a-zA-Z\s]*$/,
                      message: "Please enter Valid Name",
                    },
                  ]}
                >
                  <div>{secManager}</div>
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Form>
      </div>
    </>
  );
}
export default Team;
