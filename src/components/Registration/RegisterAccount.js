import { useState, useEffect } from "react";
import { Button, Form, Input, Col, Row, Divider } from "antd";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "../../style/LoginPage.css";
// import loginBg from "../images/login-img.png";
import { GoogleOutlined, LoadingOutlined } from "@ant-design/icons";
import loginBg from "../../images/login-img.png";
import "toastify-js/src/toastify.css";
import StartToastifyInstance from "toastify-js";
import { sendEmail } from "../../contexts/EmailContext";

function RegisterAccount() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("Login");
  const [forgot, setForgot] = useState(true);
  const navigate = useNavigate();
  const { login, resetPassword, logout, googleLogin } = useAuth();
  useEffect(() => {
    logout();
  }, []);
  const win = window.sessionStorage;
  //   async function handleSubmit(e) {
  //     setLoading("Logging In");
  //     e.preventDefault();
  //     win.clear();
  //     try {
  //       setError("");
  //       let res = await login(loginEmail, loginPassword);
  //       sessionStorage.setItem("accessToken", res.user.accessToken);
  //       sessionStorage.setItem("user", JSON.stringify(res.user));
  //       const timer = setTimeout(() => {
  //         navigate("DashBoard", { replace: true });
  //         setLoading("Login");
  //       }, 3000);
  //     } catch (err) {
  //       setLoading("Login");
  //       let message = err.message;
  //       switch (err.code) {
  //         case "auth/wrong-password":
  //           message = "Incorrect Password!";
  //           break;
  //         case "auth/user-not-found":
  //           message = "User does not exist!";
  //           break;
  //         case "auth/user-disabled":
  //           message = "This account is deactivated. Please contact your HR.";
  //           break;
  //         case "auth/invalid-email":
  //           message = "Enter valid email!";
  //           break;
  //         case "auth/internal-error":
  //           message = "Enter a password!";
  //           break;
  //         case "auth/too-many-requests":
  //           message =
  //             "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.";
  //           break;
  //       }
  //       setError(message);
  //       setTimeout(() => {
  //         setError("");
  //       }, 3000);
  //     }
  //   }
  async function handleGoogleAuth() {
    setLoading("Logging In");
    win.clear();
    try {
      setError("");
      let res = await googleLogin();
      sessionStorage.setItem("accessToken", res.user.accessToken);
      sessionStorage.setItem("user", JSON.stringify(res.user));
      const timer = setTimeout(() => {
        navigate("DashBoard", { replace: true });
        setLoading("Login");
      }, 3000);
    } catch (err) {
      setLoading("Login");
      let message = err.message;
      switch (err.code) {
        case "auth/wrong-password":
          message = "Incorrect Password!";
          break;
        case "auth/user-not-found":
          message = "User does not exist!";
          break;
        case "auth/user-disabled":
          message = "This account is deactivated. Please contact your HR.";
          break;
        case "auth/cancelled-popup-request":
          message = "Login Cancelled";
          break;
        case "auth/popup-closed-by-user":
          message = "";
          break;
        case "auth/internal-error":
          message = "Enter a password!";
          break;
      }
      setError(message);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }
  //   async function handleReset(e) {
  //     e.preventDefault();
  //     win.clear();
  //     try {
  //       setLoading("Sending Email");
  //       await resetPassword(loginEmail);
  //       setError("Reset Email Sent");
  //       setLoading("Login");
  //     } catch (err) {
  //       console.log(err);
  //       setError("Reset Email Failed To Send!");
  //       if (loginEmail == "") {
  //         setError("Please enter an email");
  //       }
  //       setTimeout(() => {
  //         setError("");
  //         setLoading("Login");
  //       }, 3000);
  //     }
  //   }

  const handleSubmit = () => {
    console.log("tsesttt ");
    let mailOptions = {
      from: "hutechhr@gmail.com",
      to: `${loginEmail}`,
      subject: `Welcome to HutechHr`,
      html: `
          <p>Hello !</p>
          <p>
            Welcome to HutechHR:</p>
            <p> We are delighted to have you with us. Please
            click the below link to register your company.</p>
          
          <a href="http://localhost:3001/register/company">localhost:3001/register/company</a>

          <p>ThankYou,</p>
          <p> Hutech HR</p>
        `,
    };
    sendEmail(mailOptions);
    setError("testing");
  };

  useEffect(() => {
    if (error != "") {
      StartToastifyInstance({
        text: error,
        duration: 5000,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#FC6161",
        },
      }).showToast();
    }
  }, [error]);

  const buttonStyle =
    loading != "Login"
      ? { backgroundColor: "#f8f8f8", color: "#d3d3d3b3" }
      : null;
  return (
    <>
      <Row className="main-div">
        <Col xs={24} xm={24} md={12}>
          <div className="form-div">
            {/* <div className="exepnse-logo">
              <img
                // src={logo}
                alt="logo"
                style={{ width: "250px", paddingBottom: "1rem" }}
              />
            </div> */}
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
              <div className="wlc-div ">Hello There !</div>
              <div className="msg">Let's register your account</div>

              <div className="email-div">
                Email Address<span style={{ color: "red" }}> *</span>
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
                  <Input
                    onChange={(e) => setLoginEmail(e.target.value.trim())}
                  />
                </Form.Item>
              </div>
              {forgot ? (
                <>
                  <div className="email-div">
                    Password<span style={{ color: "red" }}> *</span>
                  </div>
                  <div className="emailInput-div">
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
                      // onChange={(e) => setLoginPassword(e.target.value)}
                      />
                    </Form.Item>
                  </div>
                </>
              ) : null}
              {/* <Form.Item className="loginButton"> */}
              <div className="login-btn">
                <Button
                  type="submit"
                  htmlType="submit"
                  style={buttonStyle}
                  onClick={handleSubmit}
                  //   onClick={forgot ? handleSubmit : handleReset}
                  //   disabled={loading != "Login"}
                >
                  Submit
                  {/* {loading != "Login" && <LoadingOutlined />}
                  {!forgot && loading == "Login" ? "Send Email" : loading} */}
                </Button>
                {/* <div style={{width: "18rem"}}> */}
                {/* <div className="forgotpwd" onClick={() => setForgot(!forgot)}>
                  <span className="forgotmsg">
                    {forgot ? "Forgot Password" : "Back"}
                  </span>
                </div> */}
              </div>
              <Divider
                style={{ margin: "5px", fontSize: "smaller", color: "#c2c0c0" }}
              >
                OR
              </Divider>

              <div className="checkBox">
                <Button
                  className="google-btn"
                  onClick={handleGoogleAuth}
                  disabled={loading != "Login"}
                >
                  Sign Up with Google
                  <GoogleOutlined />
                </Button>
              </div>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <p className="loginFooter">
                  © 2022 Hutech HR. All rights reserved. Terms of Service
                </p>
              </Col>
            </Form>
          </div>
        </Col>
        <Col xs={0} xm={0} md={12}>
          <div className="img-div">{/* <img src={loginBg} alt="" /> */}</div>
        </Col>
      </Row>
    </>
  );
}

export default RegisterAccount;
