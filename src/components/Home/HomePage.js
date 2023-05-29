import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Layout, Typography, Breadcrumb, Button } from "antd";
import "../../style/LoginPage.css";
import { ArrowRightOutlined } from "@ant-design/icons";

const { Header, Content, Footer } = Layout;

function HomePage() {
  const navigate = useNavigate();
  useEffect(() => {    
     navigate("/login")
  },[])
  return (
    <Layout>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
        }}
        className="homeNavbar"
      >
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          //   defaultSelectedKeys={["2"]}
          //   items={new Array(1).fill(null).map((_, index) => ({
          //     key: String(index + 1),
          //     label: `Login`,
          //   }))}
          className="menuBar"
        >
          <Menu.Item key="home">
            <Button
              style={{ borderRadius: "5px", width: "170px", fontWeight: "500" }}
              onClick={() => navigate("/login")}
              className="loginButton"
            >
              Login
            </Button>
          </Menu.Item>
        </Menu>
      </Header>
      <Content
        className="site-layout"
        style={{
          padding: "0 50px",
        }}
      >
        <Button
          style={{
            background: "#1963A6",
            color: "#ffffff",
            borderRadius: "5px",
            width: "200px",
            height: "40px",
            fontWeight: "600",
            fontSize: "17px",
          }}
          onClick={() => navigate("/register-acoount")}
        >
          Register Here
          <ArrowRightOutlined />
        </Button>
      </Content>
    </Layout>
  );
}

export default HomePage;
