import React, { useState, useEffect } from "react";
import { Card, Divider, Steps, Button, Form, Modal } from "antd";
import { Outlet } from "react-router-dom";
import RegisterCompany from "./RegisterCompany";
import RegisterEmployee from "./RegisterEmployee";
import { useNavigate } from "react-router-dom";

const { Step } = Steps;

const RegistrationPage = (props) => {
  const [progress, setProgress] = useState(0);
  const [next, setNext] = useState(1);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const progressBar = (value) => {
    // if (progress == 0) {
    //   form.submit();
    //   setNext(value);
    //   return;
    // }
    setProgress(value);
  };

  const onReset = () => {
    Modal.confirm({
      title: "Are you sure you want to reset all pages?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        form.resetFields();
        navigate("/register/company", { replace: false });
      },
    });
  };

  const saveOrgDetails = (values, filename, imageurl) => {
    setProgress(next);
  };

  return (
    <>
      <Card
      // title="Registration page"
      >
        <Divider />
        <Steps progress current={progress} onChange={progressBar}>
          <Step title="Register Company" />
          <Step title="Employee Details" />
        </Steps>
        {/* <Outlet /> */}
      </Card>
      <Card style={{ marginTop: "20px" }}>
        {progress == 0 ? <RegisterCompany /> : <RegisterEmployee />}
        <Divider />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            style={{
              border: "1px solid #1963A6",
              color: "#1963A6",
              fontWeight: "600",
              fontSize: "14px",
              lineHeight: "17px",
              width: "99px",
            }}
            onClick={onReset}
          >
            Reset
          </Button>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            {progress > 0 ? (
              <Button
                style={{ marginLeft: "10px" }}
                onClick={() => setProgress(progress - 1)}
              >
                Previous
              </Button>
            ) : null}
            <Button
              type="primary"
              style={{
                marginLeft: "10px",
                backgroundColor: "rgb(25, 99, 166)",
              }}
              //   htmlType="submit"
              onClick={async () => {
                if (progress != 1) {
                  if (progress == 0) {
                    setNext(1);
                    form.submit();
                    return;
                  }
                  //   setIsStepOneInvalid(false);
                  setProgress(progress + 1);
                } else {
                  //   createCompany();
                }
              }}
            >
              {progress == 1 ? "Finish" : "Next"}
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
};

export default RegistrationPage;
