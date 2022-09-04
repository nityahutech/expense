import React from "react";
import { useState } from "react";
import { Button, Checkbox, Form, Input, Alert, Row, Col } from "antd";
import { signup, login } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "../App.css";

function LoginPage() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const win = window.sessionStorage;

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(loginEmail, loginPassword);
    win.clear();
    try {
      setError("");
      setLoading(true);

      let res = await login(loginEmail, loginPassword);
      // console.log(res.user.accessToken);
      sessionStorage.setItem("accessToken", res.user.accessToken);
      navigate("DashBoard", { replace: true });
    } catch {
      setError("Failed to log in");
      setTimeout(() => {
        setError("")
      }, 3000);
    }

    setLoading(false);
  }

  return (
    <>
      <div className="main-div">
        <div className="img-div">
          <img src={process.env.PUBLIC_URL + "login-img.png"} alt="" />
        </div>
        <div className="login-div">
          <div className="xyz">
            <div className="form-div">
              <div className="exepnse-logo">
              <img src={process.env.PUBLIC_URL + "ExepnseLogo.png"} alt="" />
              </div>
              <Form
                name="basic"
                labelCol={{
                  span: 8,
                }}
                wrapperCol={{
                  span: 16,
                }}
                initialValues={{
                  remember: true,
                }}
                autoComplete="off"
              >
                <div className="wlc-div ">Welcome back!</div>
                <div className="msg">Let's Access to our dashboard</div>

                <div className="email-div">
                  Email address<label style={{ color: "red" }}> *</label>
                </div>
                <div className="emailInput-div">
                {/* <Row>
                <Col xl={24} lg={24} sm={24} md={24} xs={24}> */}
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Enter your Email!",
                      },
                    ]}
                  >
                    <Input onChange={(e) => setLoginEmail(e.target.value)} />
                  </Form.Item>
                  {/* </Col>
                  </Row> */}
                </div>
                <div className="email-div">
                  Password<label style={{ color: "red" }}> *</label>
                </div>
                <div className="pwdInput-div">
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Enter your password!",
                      },
                    ]}
                  >
                    <Input.Password
                      onChange={(e) => setLoginPassword(e.target.value)}
                    />
                  </Form.Item>
                </div>

                <div style={{display:'flex'}}>
                  <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={
                      {
                        // offset: 8,
                        // span: 16,
                      }
                    }
                  >
                    <Checkbox className="chkbox-color">Remember me</Checkbox>
                  </Form.Item>
                  <div className="forgotpwd" style={{marginLeft: '3.5rem', marginTop:'5px'}}>Forgot Password?</div>
                </div>

                <Form.Item
                  wrapperCol={
                    {
                      // offset: 8,
                      // span: 16,
                    }
                  }
                >
                  <div className="login-btn">
                    {" "}
                    <Button
                      type="submit"
                      htmlType="submit"
                      style={{ backgroundColor: "#189AB4", color: "white" }}
                      onClick={handleSubmit}
                      disabled={loading}
                    >
                      Login
                    </Button>
                  </div>
                </Form.Item>
                {error && (
                  <Alert
                    type="error"
                    message={error}
                    style={{ width: "18rem" }}
                  />
                )}

                <div className="signup-msg">
                  Don't Have an account?{" "}
                  <span style={{ color: "#0FAEAA", cursor: "pointer" }}>
                    SignUp
                  </span>
                </div>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <p className="loginFooter">
            © 2022 Expense. All rights reserved. Terms of Service
          </p>
        </Col>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
