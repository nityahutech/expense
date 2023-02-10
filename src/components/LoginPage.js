import { useState, useEffect } from "react";
import { Button, Checkbox, Form, Input, Alert, Col, Row } from "antd";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "../style/LoginPage.css"
import loginBg from "../images/login-img.png"
import loginLogo from "../images/Logo77.png"
import { LoadingOutlined } from "@ant-design/icons";
import CoolLogo from "../images/logooo.svg"

function LoginPage() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, resetPassword, logout } = useAuth()
  useEffect(() => {
    logout();
  }, [])
  const win = window.sessionStorage;
  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    win.clear();
    try {
      setError("");
      let res = await login(loginEmail, loginPassword);
      sessionStorage.setItem("accessToken", res.user.accessToken);
      sessionStorage.setItem("user", JSON.stringify(res.user));
      const timer = setTimeout(() => {
        navigate("DashBoard", { replace: true });
        setLoading(false);
      }, 3000);
    } catch {
      setLoading(false);
      setError("Login Failed!");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }
  async function handleReset(e) {
    e.preventDefault();
    win.clear();
    try {
      setLoading(true);
      await resetPassword(loginEmail);
      setError("Reset Email Sent");
      setLoading(false);
    } catch {
      setError("Reset Email Failed To Send!");
      setTimeout(() => {
        setError("");
        setLoading(false);
      }, 3000);
    }
  }

  const buttonStyle = loading ? { backgroundColor: "lightgray", color: "gray" } : { backgroundColor: "#1963A6", color: "white" }
    return (
    <>
      {/* <div className="main-div"> */}
        <Row className="main-div">
          <Col xs={0} xm={0} md={12}>
            <div className="img-div">
              <img src={loginBg} alt=""  />
            </div>
          </Col>
          <Col xs={24} xm={24} md={12}>
            {/* <div className="login-div"> */}
              <div className="form-div">
                  <div className="exepnse-logo">
                    <img src={CoolLogo} alt="logo" 
                    style={{width:"250px",paddingBottom:"10%"}}
                    />
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
                      Email address<span style={{ color: "red" }}> *</span>
                    </div>
                    <div className="emailInput-div">
                      <Form.Item
                        name="email"
                        rules={[
                          {
                            required: true,
                            message: "Enter Email",
                          },
                        ]}
                      >
                        <Input onChange={(e) => setLoginEmail(e.target.value.trim())} />
                      </Form.Item>
                    </div>
                    <div className="email-div">
                    Password<span style={{ color: "red" }}> *</span>
                    </div>
                    <div className="pwdInput-div">
                      <Form.Item
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: "Enter Password",
                          },
                        ]}
                      >
                        <Input.Password
                          onChange={(e) => setLoginPassword(e.target.value)}
                        />
                      </Form.Item>
                    </div>
                    <div className="checkBox">
                      <Col span={15}>
                      <Form.Item
                        name="remember"
                        valuePropName="checked"
                        style={{width:"101%"}}
                      >
                        <Checkbox 
                          style={{color:"#1963A6",width:"100%"}} 
                        >Remember me
                        </Checkbox>
                      </Form.Item>
                      </Col>
                      <Col span={9}>
                      <div 
                        className="forgotpwd" 
                        onClick={handleReset} 
                      >
                        Forgot Password
                      </div>
                      </Col>
                    </div>
                    <Form.Item className="loginButton">
                      <div className="login-btn">
                        {" "}
                        <Button
                          type="submit"
                          htmlType="submit"
                          style={buttonStyle}
                          onClick={handleSubmit}
                          disabled={loading}
                        >
                        {loading && (<LoadingOutlined />)}
                          Login
                        </Button>
                      </div>
                    </Form.Item>
                    <div className="errormsg">
                    {error && (
                      <Alert
                        type="error"
                        message={error}
                        style={{ width: "18rem" }}
                      />
                    )}
                    </div>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                      <p className="loginFooter">
                        © 2022 Hutech HR. All rights reserved. Terms of Service
                      </p>
                    </Col>
                  </Form>
              </div>
            {/* </div> */}
          </Col>
        </Row>
      {/* </div> */}
    </>
  );
}

export default LoginPage;
