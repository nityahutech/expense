// import React from 'react'
import React, { useState, useEffect } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import "../App.css"

function LoginPage() {
    const onFinish = (values) => {
        console.log("Success:", values);
      };
    
      const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
      };
    
      const[email, setEmail] = useState('');
      const[password, setPassword] = useState('');
    
      const win = window.sessionStorage;
    
      const handleSubmit = (e) =>{
        e.preventDefault();
        win.clear();
        setEmail('');
        setPassword('');
      }
    
      useEffect(() =>{
        if (win.getItem('email'))
        setEmail(win.getItem('email'));
        if (win.getItem('password'))
        setEmail(win.getItem('password'));
        console.log(email, password);
      },[])
    
      useEffect(() =>{
        win.setItem('email', email)
        win.setItem('password', password)
      },[email, password])
      
    
      return (
        <>
          <div className="main-div">
            <div className="img-div">
              <img src={process.env.PUBLIC_URL + "login-img.png"} alt="" />
            </div>
            <div className="login-div">
              <div className="exepnse-logo">
                <svg
                  width="175"
                  height="45"
                  viewBox="0 0 175 45"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M58.3 18.6C61.12 18.6 63.52 20.37 63.49 23.58H53.11C53.41 20.37 55.63 18.6 58.3 18.6ZM65.98 27.93H63.04C62.44 29.7 60.88 30.96 58.42 30.96C55.63 30.96 53.29 29.13 53.08 25.8H66.22C66.28 25.23 66.31 24.75 66.31 24.15C66.31 19.65 63.19 16.29 58.42 16.29C53.62 16.29 50.29 19.56 50.29 24.75C50.29 29.97 53.74 33.27 58.42 33.27C62.5 33.27 65.14 30.93 65.98 27.93ZM78.4935 33H81.5835L76.2735 24.69L81.5535 16.56H78.7035L74.9835 22.65L71.0835 16.56H67.9935L73.3035 24.84L67.9935 33H70.8435L74.5935 26.88L78.4935 33ZM91.259 18.6C94.079 18.6 96.479 20.37 96.449 23.58H86.069C86.369 20.37 88.589 18.6 91.259 18.6ZM98.939 27.93H95.999C95.399 29.7 93.839 30.96 91.379 30.96C88.589 30.96 86.249 29.13 86.039 25.8H99.179C99.239 25.23 99.269 24.75 99.269 24.15C99.269 19.65 96.149 16.29 91.379 16.29C86.579 16.29 83.249 19.56 83.249 24.75C83.249 29.97 86.699 33.27 91.379 33.27C95.459 33.27 98.099 30.93 98.939 27.93ZM105.603 19.59V16.56H102.873V40.8H105.603V29.97C106.623 31.65 108.753 33.27 111.753 33.27C116.163 33.27 119.553 29.82 119.553 24.72C119.553 19.59 116.163 16.29 111.753 16.29C108.753 16.29 106.593 17.85 105.603 19.59ZM116.763 24.72C116.763 28.59 114.213 30.87 111.183 30.87C108.213 30.87 105.603 28.62 105.603 24.75C105.603 20.94 108.213 18.66 111.183 18.66C114.213 18.66 116.763 20.85 116.763 24.72ZM135.176 33H137.876V23.31C137.876 18.6 134.966 16.26 131.156 16.26C128.936 16.26 126.956 17.19 125.876 18.9V16.56H123.146V33H125.876V23.91C125.876 20.37 127.796 18.63 130.586 18.63C133.346 18.63 135.176 20.34 135.176 23.7V33ZM154.155 28.53C154.035 22.65 144.495 24.78 144.495 20.88C144.495 19.56 145.695 18.6 147.705 18.6C149.895 18.6 151.155 19.8 151.275 21.45H154.005C153.825 18.24 151.425 16.29 147.795 16.29C144.135 16.29 141.765 18.36 141.765 20.88C141.765 27 151.485 24.87 151.485 28.53C151.485 29.88 150.285 30.96 148.125 30.96C145.815 30.96 144.405 29.76 144.255 28.17H141.435C141.615 31.17 144.315 33.27 148.155 33.27C151.785 33.27 154.155 31.23 154.155 28.53ZM164.999 18.6C167.819 18.6 170.219 20.37 170.189 23.58H159.809C160.109 20.37 162.329 18.6 164.999 18.6ZM172.679 27.93H169.739C169.139 29.7 167.579 30.96 165.119 30.96C162.329 30.96 159.989 29.13 159.779 25.8H172.919C172.979 25.23 173.009 24.75 173.009 24.15C173.009 19.65 169.889 16.29 165.119 16.29C160.319 16.29 156.989 19.56 156.989 24.75C156.989 29.97 160.439 33.27 165.119 33.27C169.199 33.27 171.839 30.93 172.679 27.93Z"
                    fill="black"
                  />
                  <path
                    d="M0 22.1736V31.2073C2.9317 39.3888 12.2438 41.775 16.5334 41.9455C31.5328 41.8091 37.1575 34.7299 38.095 31.2073V23.111C38.5041 19.4975 37.2428 17.0601 36.561 16.2931C34.2429 15.475 34.402 17.3726 34.7713 18.4237C35.8621 28.1733 25.2262 31.0084 19.7719 31.2073C6.20429 31.2073 2.92601 25.1848 2.98283 22.1736C5.91453 12.2194 17.1584 11.3786 22.4138 12.2024C24.1183 11.7251 23.749 10.4695 23.3513 9.90136C5.55659 8.06052 0.369303 17.3158 0 22.1736Z"
                    fill="#32CDC9"
                  />
                  <path
                    d="M18.8773 28.6675L15.1698 22.221V20.7018H16.4056C16.9 20.7018 17.3325 20.6334 17.7033 20.4965C18.0878 20.346 18.4036 20.1338 18.6507 19.8601C18.9116 19.5863 19.0902 19.2579 19.1863 18.8746H15.1698V17.3554H19.1657C19.0833 16.9996 18.9391 16.6848 18.7331 16.411C18.5409 16.1373 18.28 15.9251 17.9504 15.7746C17.6346 15.6103 17.2501 15.5282 16.797 15.5282H15.1698V14.009H24.4592V15.5282H21.2254C21.4588 15.7883 21.6511 16.0689 21.8021 16.37C21.9669 16.6711 22.0768 16.9996 22.1317 17.3554H24.4592V18.8746H22.1729C22.0356 19.8874 21.6442 20.6813 20.9988 21.2561C20.3535 21.8173 19.5227 22.2005 18.5066 22.4058L22.5436 28.6675H18.8773Z"
                    fill="#32CDC9"
                  />
                  <path
                    d="M26.5 12.1626L29.5 8.66258C30 8.16258 31.3 7.46258 32.5 8.66258L35.5 12.6626"
                    stroke="#189AB4"
                    stroke-width="2"
                  />
                  <path d="M31 8.1626V15.6626" stroke="#189AB4" stroke-width="2" />
                </svg>
              </div>
              <div className="form-div">
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
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                
                autoComplete="off"
              >
              <div className="wlc-div ">Welcome back!</div>
              <div className="msg">Let's Access to our dashboard</div>
              <div className="email-div">Email address<label style={{color: 'red'}}>*</label></div>
              <div className="emailInput-div">
                <Form.Item
                  // label="Email ID"
                  name="email"
                  
                  rules={[
                    {
                      required: true,
                      message: "Enter your Email!",
                    },
                  ]}
                  
                >
                  <Input onChange={(e)=>setEmail(e.target.value)}/>
                </Form.Item>
                </div>
                <div className="email-div">Password<label style={{color: 'red'}}>*</label></div>
                <div className="pwdInput-div">
                <Form.Item
                  // label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Enter your password!",
                    },
                  ]}
                >
                  <Input.Password onChange={(e)=>setPassword(e.target.value)}/>
                </Form.Item>
                </div>
                <div className="forgotpwd">Forgot Password?</div>
    
                <Form.Item
                  name="remember"
                  valuePropName="checked"
                  wrapperCol={{
                    // offset: 8,
                    // span: 16,
                  }}
                >
                  <Checkbox className="chkbox-color">Remember me</Checkbox>
                </Form.Item>
    
                <Form.Item
                  wrapperCol={{
                    // offset: 8,
                    // span: 16,
                  }}
                >
                 <div className=""> <Button type="" htmlType="submit" className="login-btn" onSubmit={handleSubmit}>
                    Login
                  </Button></div>
                </Form.Item>
                {/* <div className="signup-msg">Don't Have an account? </div> */}
              </Form>
              </div>
              <div className="signup-msg">Don't Have an account? <span style={{color:'#0FAEAA', cursor:'pointer'}}>SignUp</span></div>
            </div>
          </div>
        </>
      );
}

export default LoginPage