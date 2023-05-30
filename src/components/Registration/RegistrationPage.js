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
import { Outlet, useLocation, useParams } from "react-router-dom";
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
  const [domain, setDomain] = useState(null);
  const [parameters, setParameters] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [compData, setCompData] = useState({});
  const [activetab, setActivetab] = useState("1");
  const [isStepOneInvalid, setIsStepOneInvalid] = useState(false);
  const [isStepSecondInvalid, setIsStepFourInvalid] = useState(false);
  const [companyForm] = Form.useForm();
  const [employeeForm] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const progressBar = (value) => {
    console.log("valuessprogress", value);
    if (progress == 0) {
      companyForm.submit();
      // setProgress(value);
      return;
    }
    setProgress(value);
  };

  useEffect(() => {
    console.log(window.location.href, "windowwwww");
    let params = {};
    window.location.href
      .split("?")[1]
      .split("&")
      .map((x) => {
        let temp = x.split("=");
        params = {
          ...params,
          [`${temp[0]}`]: temp[1],
        };
      });
    console.log({ params });
    setParameters(params);
  }, []);

  console.log(parameters.email, domain);

  const registerCompany = async (empData) => {
    console.log("datttgaa", compData, empData, params);

    CompanyProContext.createCompInfo(compData, empData, fileName)
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
        companyForm.resetFields();
        employeeForm.resetFields();
        setIsStepOneInvalid(false);
        setIsStepFourInvalid(false);
        navigate("/register/company", { replace: false });
      },
    });
  };

  // const saveOrgDetails = (values, filename, imageurl) => {
  //   setProgress(next);
  // };

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
            setProgress={setProgress}
            fileName={fileName}
            setFileName={setFileName}
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            form={companyForm}
            setCompData={setCompData}
            setIsStepOneInvalid={setIsStepOneInvalid}
            officialEmail={parameters.email}
          />
        ) : (
          <RegisterEmployee
            compData={compData}
            form={employeeForm}
            registerCompany={registerCompany}
            officialEmail={parameters.email}
          />
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
              htmlType="submit"
              onClick={() => {
                console.log("testtt");
                if (progress == 1) {
                  console.log("test222");
                  employeeForm.submit();

                  // setIsStepOneInvalid(false);
                } else {
                  if (progress == 0) {
                    console.log("testttt");
                    // setNext(1);
                    companyForm.submit();
                    return;
                  }
                  setIsStepOneInvalid(false);
                  setProgress(1);
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
