import { useState, useEffect } from "react";
import { Button, Checkbox, Form, Input, Alert, Col, Row } from "antd";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "../style/LoginPage.css"
import loginBg from "../images/login-img.png"
import { LoadingOutlined } from "@ant-design/icons";
import logo from "../images/LoginLogo.svg"

function LoginPage() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("Login");
  const [forgot, setForgot] = useState(true);
  const navigate = useNavigate();
  const { login, resetPassword, logout } = useAuth()
  useEffect(() => {
    logout();
  }, [])
  const win = window.sessionStorage;
  async function handleSubmit(e) {
    setLoading("Logging In");
    e.preventDefault();
    win.clear();
    try {
      setError("");
      let res = await login(loginEmail, loginPassword);
      sessionStorage.setItem("accessToken", res.user.accessToken);
      sessionStorage.setItem("user", JSON.stringify(res.user));
      const timer = setTimeout(() => {
        navigate("DashBoard", { replace: true });
        setLoading("Login");
      }, 3000);
    } catch(err) {
      setLoading("Login");
      let message = err.message;
      switch (err.code) {
        case "auth/wrong-password": message = "Incorrect Password!"
          break;
        case "auth/user-not-found": message = "User does not exist!"
          break;
        case "auth/user-disabled": message = "This account is deactivated. Please contact your HR."
          break;
        case "auth/invalid-email": message = "Enter valid email!"
          break;
        case "auth/internal-error": message = "Enter a password!"
          break;
      }
      setError(message);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }
  async function handleReset(e) {
    e.preventDefault();
    win.clear();
    try {
      setLoading("Sending Email");
      await resetPassword(loginEmail);
      setError("Reset Email Sent");
      setLoading("Login");
    } catch(err) {
      console.log(err)
      setError("Reset Email Failed To Send!");
      setTimeout(() => {
        setError("");
        setLoading("Login");
      }, 3000);
    }
  }

  const buttonStyle = loading != "Login" ? { backgroundColor: "lightgray", color: "gray" } : { backgroundColor: "#1963A6", color: "white" }
    return (
    <>
        <Row className="main-div">
          <Col xs={0} xm={0} md={12}>
            <div className="img-div">
              <img src={loginBg} alt=""  />
            </div>
          </Col>
          <Col xs={24} xm={24} md={12}>
              <div className="form-div">
                  <div className="exepnse-logo">
                    <img src={logo} alt="logo" 
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
                    <div className="wlc-div ">{forgot ? "Welcome back!" : "Password Reset"}</div>
                    <div className="msg">{forgot ? "Let's Access to our dashboard" : "We will send a reset link to your registered email"}</div>

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
                    {forgot ? (
                      <>
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
                      </>
                    ) : null}
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
                        onClick={()=>setForgot(!forgot)} 
                      >
                        {forgot ? "Forgot Password" : "Back"}
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
                          onClick={forgot ? handleSubmit : handleReset}
                          disabled={loading != "Login"}
                        >
                        {loading != "Login" && (<LoadingOutlined />)}
                          {!forgot && loading == "Login" ? "Send Email" : loading}
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
          </Col>
        </Row>
    </>
  );
}

export default LoginPage;
