import React, {useState} from "react";
import { Form, Button, Checkbox, Input, Alert } from "antd";
import { useAuth } from "../contexts/AuthContext";

function SignupPage() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup, login, updateMyProfile } = useAuth();
  const win = window.sessionStorage;
  async function handleSubmit(formData) {
    // e.preventDefault();
    win.clear();
    try {
      setError("");
      setLoading(true);
      let res = await signup(formData.email, formData.password, formData.user.name);
      // sessionStorage.setItem("accessToken", res.user.accessToken);
      setSuccess("Registration Successful. Please LogIn!")
    } catch (err)  {
      setError(err?.message=== 'Firebase: Error (auth/email-already-in-use).'?"Email id Already Registered!":"Failed to Register!"||"Failed to Register!");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
    finally{

      setTimeout(() => {
        setSuccess("");
      }, 2000);
    }

    setLoading(false);
    form.resetFields();
  }
  const [form] = Form.useForm();
  
  return (
    <>
      <div className="main-div">
        <div className="img-div">
          <img src={process.env.PUBLIC_URL + "login-img.png"} alt="" />
        </div>
        <div className="login-div">
          <div className="xyz">
            <div className="signupForm-div">
              <div className="exepnse-logo">
                <img src={process.env.PUBLIC_URL + "ExepnseLogo.png"} alt="" />
              </div>
              <Form
              form={form}
              onFinish={handleSubmit}
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
                <div className="signupEmail-div">
                  Full Name<label style={{ color: "red" }}> *</label>
                </div>
                <div className="emailInput-div">
                  <Form.Item
                    name={["user", "name"]}
                    // label="Name"
                    rules={[
                      {
                        required: true,
                        message: "Enter your Full Name!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </div>
                <div className="signupEmail-div">
                  Email address<label style={{ color: "red" }}> *</label>
                </div>
                <div className="emailInput-div">
                  {/* <Row>
                <Col xl={24} lg={24} sm={24} md={24} xs={24}> */}
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        type: "email",
                        message: "The input is not valid E-mail!",
                      },
                      {
                        required: true,
                        message: "Enter your Email!",
                      },
                    ]}
                  >
                    <Input  />
                  </Form.Item>
                  {/* </Col>
                  </Row> */}
                </div>
                <div className="signupEmail-div">
                  Password<label style={{ color: "red" }}> *</label>
                </div>
                <div className="pwdInput-div">
                  <Form.Item
                    name="password"
                    // label="Password"
                    rules={[
                      {
                        required: true,
                        message: "Please input 6 character password!",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input.Password />
                  </Form.Item>
                </div>
                <div className="signupEmail-div">
                  Confirm Password<label style={{ color: "red" }}> *</label>
                </div>
                <div className="pwdInput-div">
                  <Form.Item
                    name="confirm"
                    // label="Confirm Password"
                    dependencies={["password"]}
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: "Please confirm your password!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }

                          return Promise.reject(
                            new Error(
                              "The two passwords that you entered do not match!"
                            )
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                </div>
                <Form.Item
                  name="agreement"
                  valuePropName="checked"
                  rules={[
                    {
                      validator: (_, value) =>
                        value
                          ? Promise.resolve()
                          : Promise.reject(
                              new Error("Should accept agreement")
                            ),
                    },
                  ]}
                //   {...tailFormItemLayout}
                >
                  <Checkbox className="chkbox-color">
                    {" "}
                    Agree to our <a href="#">Terms & Conditions</a>
                  </Checkbox>
                </Form.Item>
                <Form.Item
                  wrapperCol={
                    {
                      // offset: 8,
                      // span: 16,
                    }
                  }
                //   {...tailFormItemLayout}
                >
                  <div className="register-btn">
                    {" "}
                    <Button
                      type="submit"
                      htmlType="submit"
                      style={{ backgroundColor: "#189AB4", color: "white" }}
                        // onClick={handleSubmit}
                        disabled={loading}
                    >
                      Register
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
                {success && (
                  <Alert
                    type="success"
                    message={success}
                    style={{ width: "18rem" }}
                  />
                )}
                <div className="signup-msg">
                  Already Have an account?{" "}
                  <a href="/" style={{ color: "#0FAEAA", cursor: "pointer" }}>
                    Log In
                  </a>
                </div>
                {/* <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                  <p className="signupFooter">
                    © 2022 Expense. All rights reserved. Terms of Service
                  </p>
                </Col> */}
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignupPage;
