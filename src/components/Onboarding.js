import { useState, useEffect } from "react";
import {
  Tabs,
  Col,
  Row,
  Divider,
  Form,
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
import OrgHierTable from "./OrgHierTable";
import { showNotification } from "../contexts/CreateContext";
import { useNavigate } from "react-router-dom";

const { Step } = Steps;

function Onboarding() {
  const [form] = Form.useForm();
  const [modalData, setModalData] = useState([]);
  const [allCompany, setAllCompany] = useState([]);
  const [progress, setProgress] = useState(0);
  const [activetab, setActivetab] = useState("1");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [save, setSave] = useState(false);
  const [isEditOrganization, setIsEditOrganization] = useState(false);
  const [data, setData] = useState({});
  const [fileName, setFileName] = useState("");
  const navigate = useNavigate();

  const saveOrgDetails = (values, imageUrl) => {
    delete values.logo
    console.log("saved")
    localStorage.setItem("OrgDetails", JSON.stringify(values));
    localStorage.setItem("Logo", imageUrl);
    getOrgData();
  }

  const getData = async () => {
    let data = await CompanyProContext.getAllCompany();
    setAllCompany(data);
  };

  const getOrgData = async () => {
    let data = localStorage.getItem("OrgDetails");
    if (!data) {
      let id = {orgcode: await CompanyProContext.getOrgId()}
      localStorage.setItem("OrgDetails", JSON.stringify(id));
      setData(id);
      return;
    }
    console.log(JSON.parse(data));
    setData(JSON.parse(data));
    setFileName(localStorage.getItem("Logo"))
  }

  const createCompany = () => {
    let temp = localStorage.getItem("costCenters");
    let costCenters = temp || temp != "[]" ? JSON.parse(temp) : []
    let temp1 = localStorage.getItem("OrgAccess");
    let accessList = temp1 || temp1 != "[]" ? JSON.parse(temp1) : []
    let temp2 = localStorage.getItem("OrgHier");
    let orgHier = temp2 || temp2 != "[]" ? JSON.parse(temp2) : []
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
      cinNumber: data.cinNumber,
      gst: data.gst,
      domain: data.domain,
      phone: data.phone, 
      accessList: [],
      address: [],
      secretary: [],
      director: [],
      auditor: [],
      bank: [],
      costCenters: costCenters == null ? [] : costCenters,
      deparments: orgHier == null ? [] : orgHier,
      status: "Deactivated",
    };
      CompanyProContext.createCompInfo(
        data.orgcode,
        value,
        fileName,
        accessList
      )
        .then((response) => {
          notification.open({
            message: "Creating Company",
            duration: 2,
            icon: <LoadingOutlined />,
          });
          const timer = setTimeout(() => {
            showNotification("success", "Success", "Onboarding Completed");
            getData();
            reset();
            setActivetab("1");
          }, 5000);
          return () => clearTimeout(timer);
        })
        .catch((error) => {
          showNotification("error", "Error", error.message);
        });
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
    if (progress == 0) {form.submit();}
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
  console.log(save)
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

  const reset = () => {
    Object.keys(data).map((field) => {
      console.log(field)
      if (field != "orgcode") {
        form.setFieldsValue({[`${field}`]: null})
      }
    })
    form.setFieldsValue({addLine1: null})
    setActivetab("1")
    setData({});
    localStorage.removeItem("OrgDetails")
    localStorage.removeItem("costCenters")
    localStorage.removeItem("OrgHier")
    localStorage.removeItem("OrgAccess")
    localStorage.removeItem("Logo")
    setFileName(null)
    return;
  }

  const onReset = () => {
    Modal.confirm({
      title: "Are you sure you want to reset all pages?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        reset();
        navigate("/Organization/Onboarding", { replace: false });
      },
    });
  }
  console.log(fileName)
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
        <Tabs.TabPane tab="Organization Onboarding" key="2" destroyInactiveTabPane>
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
              <OrgDetails data={data} fileName={fileName} changeSave={saveOrgDetails} form={form} />
            )}
            <Divider />
            <div 
              style={{
                display: "flex",
                justifyContent: "space-between"
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
                  onClick={async () => {
                    if (progress != 3) {
                      if (progress == 0) {form.submit()}
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
