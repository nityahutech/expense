import { useState, useEffect } from "react";
import {
  Tabs,
  Col,
  Row,
  Divider,
  Button,
  Steps,
  notification,
  Card,
  Table,
  Modal,
} from "antd";
import {
  LoadingOutlined,
  CheckCircleFilled,
  StopFilled,
  EyeFilled,
  EditFilled,
} from "@ant-design/icons";
import "../style/Onboarding.css";
import CompanyProContext from "../contexts/CompanyProContext";
import reload from "../images/reload.png";
import ViewModal from "./ViewModal";
import EditOnboarding from "./EditOnboarding";
import OrgDetails from "./OrgDetails";
import CostCenter from "./CostCenter";
import AccessDetails from "./AccessDetails";
// import OranizationHierarcy from "./onBoardingComponent/organizationHierarchy";
import OrgHierTable from "./OrgHierTable";

const { Step } = Steps;

function Onboarding() {
  const [modalData, setModalData] = useState([]);
  const [allCompany, setAllCompany] = useState([]);
  const [progress, setProgress] = useState(0);
  const [activetab, setActivetab] = useState("1");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditOrganization, setIsEditOrganization] = useState(false);
  const [data, setData] = useState({});
  const [fileName, setFileName] = useState("");

  const getData = async () => {
    let data = await CompanyProContext.getAllCompany();
    setAllCompany(data);
  };

  const getOrgData = () => {
    let data = localStorage.getItem("OrgDetails");
    if (!data) {
        localStorage.setItem("OrgDetails", "{}");
        return;
    }
    console.log(JSON.parse(data));
    setData(JSON.parse(data));
    // setFileName(JSON.parse(data?.logo))
  }

  const createCompany = () => {
    // const value = {
    //   regCompName: data.regCompName,
    //   regOffice: {
    //     addLine1: data.addLine1,
    //     addLine2: data.addLine2,
    //     city: data.city,
    //     state: data.state,
    //     country: data.country,
    //     pincode: data.pincode,
    //   },
    //   cinNumber: data.cinNumber,
    //   gst: data.gst,
    //   domain: data.domain,
    //   phone: data.phone, 
    //   accessList: [],
    //   address: [],
    //   secretary: [],
    //   director: [],
    //   auditor: [],
    //   bank: [],
    //   status: "Deactivated",
    // };
    //   CompanyProContext.createCompInfo(
    //     data.orgcode,
    //     valuesToservice,
    //     fileName,
    //     accessList
    //   )
    //     .then((response) => {
    //       notification.open({
    //         message: "Creating Company",
    //         duration: 2,
    //         icon: <LoadingOutlined />,
    //       });
    //       const timer = setTimeout(() => {
    //         showNotification("success", "Success", "Onboarding Completed");
    //         // getData();
    //         // setAddAccess(false);
    //         // onReset();
    //         // setActivetab("1");
    //       }, 5000);
    //       return () => clearTimeout(timer);
    //     })
    //     .catch((error) => {
    //       showNotification("error", "Error", error.message);
    //     });
  }

  useEffect(() => {
    if (!isEditOrganization || !isModalVisible) {
      getData();
    }
  }, [isEditOrganization, isModalVisible]);

  useEffect(() => {
    getData();
    getOrgData();
  }, []);

  const showNotification = (type, msg, desc) => {
    notification[type]({
      message: msg,
      description: desc,
    });
  };

  const changeCompStatus = (id, status) => {
    Modal.confirm({
      title: `Are you sure, you want to ${status == "Deactivated" ? "activate" : "deactivate"
        } this record?`,
      okText: "Yes",
      okType: "danger",

      onOk: () => {
        CompanyProContext.updateCompInfo(id, {
          status: status == "Deactivated" ? "Activated" : "Deactivated",
        });
        showNotification(
          "success",
          "Updated",
          `Organization status ${status == "Deactivated" ? "activated" : "deactivated"
          } Successfully`
        );
        getData();
      },
    });
    // status == "Deactivated"
    //   ? Modal.confirm({
    //       title: "Are you sure, you want to deactivate this record",
    //       okText: "yes",
    //       okType: "danger",

    //       onOk: () => {
    //         CompanyProContext.updateCompInfo(id, {
    //           status: status == "Deactivated" ? "Activated" : "Deactivated",
    //         });
    //         showNotification(
    //           "success",
    //           "Updated",
    //           `Organization status ${
    //             status == "Deactivated" ? "activated" : "deactivated"
    //           } Successfully`
    //         );
    //         getData();
    //       },
    //     })
    //   : null;
  };
  const showModal = (record) => {
    setModalData(record);
    setIsModalVisible(true);
  };
  const showOnboarding = (record) => {
    setModalData(record);
    setIsEditOrganization(true);
  };
  // const cancelOnboarding = () => {
  //   setIsEditOrganization(false);
  // };
  // const handleCancel = () => {
  //   setIsModalVisible(false);
  // };

  const progressBar = (value) => {
    setProgress(value);
  };

  const columns = [
    {
      title: "Code",
      dataIndex: "id",
      key: "id",
      width: 120,
    },
    {
      title: "Name",
      dataIndex: "regCompName",
      key: "regCompName",
      width: 200,
    },
    // {
    //   title: "Address",
    //   dataIndex: "regOffice",
    //   key: "address",
    //   width: 250,
    // },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      width: 140,
      // responsive: ["md"],
      render: (_, { status }) => getStatusUi(status),
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "action",
      width: 130,
      align: "center",
      render: (_, record) => {
        return (
          <>
            <Row gutter={[0, 0]}>
              <Col xs={22} sm={15} md={8}>
                <Button
                  disabled={record.status == "Deactivated"}
                  style={{ width: "40px" }}
                  onClick={() => {
                    showModal(record);
                  }}
                >
                  <EyeFilled
                    disabled={record.status == "Deactivated"}
                    style={
                      record.status == "Deactivated"
                        ? { color: "rgb(154 201 244)", marginLeft: "-2px" }
                        : { color: "#268FEE", marginLeft: "-2px" }
                    }
                  />
                </Button>
              </Col>
              <Col xs={22} sm={15} md={8}>
                <Button
                  disabled={record.status == "Deactivated"}
                  style={{ width: "40px" }}
                  onClick={() => {
                    showOnboarding(record);
                  }}
                >
                  <EditFilled
                    disabled={record.status == "Deactivated"}
                    style={
                      record.status == "Deactivated"
                        ? { color: "rgb(154 201 244)", marginLeft: "-2px" }
                        : { color: "#268FEE", marginLeft: "-2px" }
                    }
                  />
                </Button>
              </Col>
              <Col xs={22} sm={15} md={8}>
                <Button
                  // disabled={record.status == "Deactivated"}
                  style={{ width: "40px" }}
                  onClick={() => {
                    changeCompStatus(record.id, record.status);
                  }}
                >
                  {record.status == "Deactivated" ? (
                    <CheckCircleFilled
                      style={{ color: "#268FEE", marginLeft: "-2px" }}
                    />
                  ) : (
                    <StopFilled
                      style={{ color: "#268FEE", marginLeft: "-2px" }}
                    />
                  )}
                </Button>
              </Col>
            </Row>
          </>
        );
      },
    },
  ];

  function getStatusUi(status) {
    switch (status) {
      case "Activated":
        return (
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div>
              <CheckCircleFilled
                style={{ color: "#1fca1f", marginRight: "6px" }}
              />
            </div>
            {status}
          </div>
        );

      case "Deactivated":
        return (
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div>
              <StopFilled
                style={{ color: "rgb(129 212 236)", marginRight: "6px" }}
              />
            </div>
            {status}
          </div>
        );
      // case "Reactivate":
      //   return (
      //     <div style={{ display: "flex", flexDirection: "row" }}>
      //       <div>
      //         <img
      //           src={reload}
      //           style={{ color: "#1fca1f", marginRight: "6px" }}
      //         />
      //       </div>
      //       {status}
      //     </div>
      //   );
      default:
        return null;
    }
  }
  console.log(data, fileName)
  return (
    <>
      {/* <div className="main"> */}
      <Tabs
        defaultActiveKey={activetab}
        className="mainTabs"
        activeKey={activetab}
        onChange={(tabKey) => {
          setActivetab(tabKey);
        }}
      >
        <Tabs.TabPane tab="View All Organization" key="1">
          <Card
            style={{
              background: "#fff",
              margin: "0px 15px 20px 15px",

              // height: "55rem",
            }}
          >
            <div style={{ background: "#fff" }}>
              <div
                style={{
                  fontWeight: "600",
                  fontSize: "14px",
                  lineHeight: "19px",
                  textTransform: "uppercase",
                }}
              >
                Organization Details
              </div>
              <Divider />
              <Table
                className="tableTab"
                columns={columns}
                dataSource={allCompany}
                size="middle"
                rowClassName={(record) =>
                  record.status == "Deactivated" && "disabled-row"
                }
              />
              <Row>
                <Col xs={22} sm={20} md={18}>
                  <Modal
                    // bodyStyle={{ height: 1000 }}
                    width={900}
                    className="viewModal"
                    centered
                    visible={isModalVisible}
                    footer={null}
                    title="ORGANIZATION DETAILS"
                    closeIcon={
                      <div
                        onClick={() => {
                          setIsModalVisible(false);
                        }}
                        style={{ color: "#ffffff" }}
                      >
                        X
                      </div>
                    }
                  >
                    <ViewModal
                      modalData={modalData}
                      setIsModalVisible={setIsModalVisible}
                      getData={getData}
                    />
                  </Modal>
                </Col>
              </Row>
              <Modal
                bodyStyle={{
                  height: 440,
                  overflowY: "scroll",
                  overflowX: "hidden",
                }}
                width={900}
                className="editModal"
                destroyOnClose
                centered
                visible={isEditOrganization}
                footer={null}
                title="ORGANIZATION DETAILS"
                closeIcon={
                  <div
                    onClick={() => {
                      setIsEditOrganization(false);
                    }}
                    style={{ color: "#ffffff" }}
                  >
                    X
                  </div>
                }
              >
                <EditOnboarding
                  modalData={modalData}
                  setIsEditOrganization={setIsEditOrganization}
                />
              </Modal>
            </div>
          </Card>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Organization Onboarding" key="2">
          <Card
            className="stepsCard"
            style={{
              background: "#fff",
              margin: "0px 15px 20px 15px",
              // height: "55rem",
            }}
          >
            <Steps
              current={progress}
              onChange={progressBar}
              className="stepBars"
              // style={{
              //   display: "grid",
              //   gridAutoFlow: "column",
              //   gridAutoColumns: "1fr",
              // }}
            >
              <Step
                // className="stepOne"
                title="Organization Details" />
              <Step
                // className="stepTwo"
                title="Cost Center" />
              <Step
                // className="stepThree"
                title="Organization Hierarchy" />
              <Step
                // className="stepFour"
                title="Access Details" />
            </Steps>
          </Card>

          {/* old code delete if you want to  */}
          {/* <Card
            style={{
              background: "#fff",
              margin: "0px 15px 20px 15px",

              // height: "55rem",
            }}
          >
            <Steps current={progress} onChange={progressBar}>
              <Step title="Organization Details" />
              <Step title="Cost Center" />
              <Step title="Organization Hierarchy" />
              <Step title="Access Details" />
            </Steps>
          </Card> */}
          {/* old code delete if you want to  */}
          <Card
            style={{
              background: "#fff",
              margin: "0px 15px 20px 15px",

              // height: "55rem",
            }}
          >
            {progress == 1 ? (
              <CostCenter />
            ) : progress == 2 ? (
              <OrgHierTable />
            ) : progress == 3 ? (
              <AccessDetails />
            ) : (
              <OrgDetails data={data} fileName={fileName} />
            )}
            <Divider />
            <div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                {progress > 0 ? (
                  <Button
                    style={{ marginLeft: "10px", }}
                    onClick={() => setProgress(progress - 1)}
                  >
                    Previous
                  </Button>
                ) : null}
                <Button
                  type="primary"
                  style={{ marginLeft: "10px", backgroundColor: 'rgb(25, 99, 166)' }}
                  onClick={() => {
                    if (progress != 3) {
                      setProgress(progress + 1);
                    } else {
                      createCompany();
                    }
                  }}
                >
                  {progress == 3 ? "Finish" : "Next"}
                </Button>
              </div>
            </div>
          </Card>
        </Tabs.TabPane>
      </Tabs>
      {/* </div> */}
    </>
  );
}

export default Onboarding;
