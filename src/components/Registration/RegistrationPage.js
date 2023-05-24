import React, { useState, useEffect } from "react";
import {
  Card,
  Divider,
  Steps,
  Button,
  Form,
  Modal,
  Affix,
  notification,
} from "antd";
import { Outlet } from "react-router-dom";
import {
  LoadingOutlined,
  CheckCircleFilled,
  StopFilled,
  EyeFilled,
  EditFilled,
} from "@ant-design/icons";
import RegisterCompany from "./RegisterCompany";
import RegisterEmployee from "./RegisterEmployee";
import { useNavigate } from "react-router-dom";
import logo from "../../images/SidebarLogo.svg";
import CompanyProContext from "../../contexts/CompanyProContext";
import { showNotification } from "../../contexts/CreateContext";

const { Step } = Steps;

const RegistrationPage = (props) => {
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState(null);
  const [next, setNext] = useState(1);
  const [activetab, setActivetab] = useState("1");
  const [isStepOneInvalid, setIsStepOneInvalid] = useState(false);
  const [isStepSecondInvalid, setIsStepFourInvalid] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const progressBar = (value) => {
    if (progress == 0) {
      form.submit();
      setNext(value);
      return;
    }
    setProgress(value);
  };

  const registerCompany = async (data) => {
    console.log("datttaa", data);
    let orgcode = await CompanyProContext.getOrgId();
    let temp1 = localStorage.getItem("OrgAccess");
    let accessList = JSON.parse(temp1);
    let temp = localStorage.getItem("costCenters");
    let costCenters = temp == "[]" ? [] : JSON.parse(temp);
    let temp2 = localStorage.getItem("OrgHier");
    let orgHier = temp2 == "[]" ? null : JSON.parse(temp2);
    // if (orgHier != null) {

    // }
    const value = {
      regCompName: data.regCompName,
      regOffice: {
        addLine1: data.addLine1,
        addLine2: data.addLine2,
        city: data.city,
        state: data.state,
        country: data.country,
        pincode: data.pincode,
      },
      precode: data.preCode,
      corpOffice: {},
      cinNumber: data.cinNumber,
      gst: data.gst || null,
      domain: data.domain,
      prefix: data.prefix || "",
      phone: data.phone,
      accessList: [],
      address: [],
      secretary: [],
      director: [],
      auditor: [],
      bank: [],
      costCenters: costCenters == null ? [] : costCenters,
      departments:
        orgHier == null
          ? [
              {
                name: "Default",
                description: "Default",
                type: "Business Unit",
                parent: null,
              },
              {
                name: "Default",
                description: "Default",
                type: "Division",
                parent: "Default",
              },
              {
                name: "Default",
                description: "Default",
                type: "Department",
                parent: "Default/Default",
              },
              {
                name: "Default",
                description: "Default",
                type: "Team",
                parent: "Default/Default/Default",
              },
            ]
          : orgHier,
      status: "Deactivated",
      reason: "First Activation Incomplete",
    };
    CompanyProContext.createCompInfo(orgcode, value, fileName, accessList)
      .then((response) => {
        notification.open({
          message: "Creating Company",
          duration: 3,
          icon: <LoadingOutlined />,
        });
        const timer = setTimeout(() => {
          showNotification("success", "Success", "Onboarding Completed");
          // getData();
          // reset();
          setActivetab("1");
        }, 5000);
        return () => clearTimeout(timer);
      })
      .catch((error) => {
        showNotification("error", "Error", error.message);
      });
  };

  const onReset = () => {
    Modal.confirm({
      title: "Are you sure you want to reset all pages?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        form.resetFields();
        setIsStepOneInvalid(false);
        setIsStepFourInvalid(false);
        navigate("/register/company", { replace: false });
      },
    });
  };

  const saveOrgDetails = (values, filename, imageurl) => {
    setProgress(next);
  };

  return (
    <>
      <Affix offsetTop={0}>
        <Card
          className="registerHeader"
          style={{
            height: "70px",
            display: "flex",
            justifyContent: "flex-end",
            background: "#1963A6",
            boxShadow: "2px 2px 13px rgba(0, 0, 0, 0.12)",
          }}
        >
          <img src={logo} width={120} />
        </Card>
      </Affix>

      <Card
        // title="Registration page"
        style={{ marginTop: "20px" }}
      >
        <Steps progress current={progress} onChange={progressBar}>
          <Step
            title="Register Company"
            className={isStepOneInvalid ? "stepOneError" : ""}
          />
          <Step
            title="Employee Details"
            className={isStepSecondInvalid ? "stepOneError" : ""}
          />
        </Steps>
        {/* <Outlet /> */}
      </Card>
      <Card style={{ marginTop: "20px" }}>
        {progress == 0 ? (
          <RegisterCompany
            // registerCompany={registerCompany}
            fileName={fileName}
            form={form}

            // setIsStepOneInvalid={setIsStepOneInvalid}
          />
        ) : (
          <RegisterEmployee />
        )}

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
              marginLeft: "30px",
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
                marginRight: "23px",
              }}
              // htmlType="submit"
              onClick={async () => {
                console.log("testtt");
                if (progress != 1) {
                  if (progress == 0) {
                    // console.log("testttt");
                    setNext(1);
                    form.submit();
                    return;
                  }
                  setProgress(progress + 1);

                  // setIsStepOneInvalid(false);
                } else {
                  console.log("test222");
                  registerCompany();
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
