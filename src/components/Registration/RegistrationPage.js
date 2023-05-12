import { Card, Divider, Steps } from "antd";
import { Outlet } from "react-router-dom";
import RegisterCompany from "./RegisterCompany";

const { Step } = Steps;

const RegistrationPage = (props) => {
  return (
    <Card
    // title="Registration page"
    >
      <Divider />
      <Steps>
        <Step title="Register Company" />
        <Step title="Employee Details" />
      </Steps>
      <Outlet />
    </Card>
  );
};

export default RegistrationPage;
