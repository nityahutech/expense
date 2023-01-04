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
  Input,
  Tooltip,
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
  const [isEditOrganization, setIsEditOrganization] = useState(false);
  const [data, setData] = useState({});
  const [next, setNext] = useState(1);
  const [fileName, setFileName] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [isStepOneInvalid, setIsStepOneInvalid] = useState(false);
  const [isStepFourInvalid, setIsStepFourInvalid] = useState(false);
  const navigate = useNavigate();

  const saveOrgDetails = (values, filename, imageurl) => {
    delete values.logo;
    localStorage.setItem("OrgDetails", JSON.stringify(values));
    localStorage.setItem("Logo", imageUrl);
    setFileName(filename);
    setImageUrl(imageurl);
    getOrgData();
    setProgress(next);
    setIsStepOneInvalid(false);
  };

  const getData = async () => {
    let data = await CompanyProContext.getAllCompany();
    setAllCompany(data);
  };

  const getOrgData = async () => {
    let data = localStorage.getItem("OrgDetails");
    if (!data) {
      localStorage.setItem("OrgDetails", []);
      return;
    }
    setData(JSON.parse(data));
  };

  const createCompany = async () => {
    if (isStepFourInvalid) {
      showNotification("error", "Error", "Please save at least 1 admin user!");
      return;
    }
    let orgcode = await CompanyProContext.getOrgId();
    let temp = localStorage.getItem("costCenters");
    let costCenters = temp == "[]" ? [] : JSON.parse(temp);
    let temp1 = localStorage.getItem("OrgAccess");
    let accessList = temp1 == "[]" ? [] : JSON.parse(temp1);
    let temp2 = localStorage.getItem("OrgHier");
    let orgHier =
      temp2 != "[]"
        ? JSON.parse(temp2)
        : [
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
          ];
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
      costCenters: costCenters,
      departments: orgHier,
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
          getData();
          reset();
          setActivetab("1");
        }, 5000);
        return () => clearTimeout(timer);
      })
      .catch((error) => {
        showNotification("error", "Error", error.message);
      });
  };

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
    let reason = "";
    Modal.confirm({
      title: `Are you sure, you want to ${
        status == "Deactivated" ? "activate" : "deactivate"
      } this record?`,
      content:
        status == "Deactivated" ? (
          ""
        ) : (
          <Input
            placeholder="Enter Comment"
            onChange={(event) => {
              reason = event.target.value;
            }}
          />
        ),
      okText: "Yes",
      okType: "danger",

      onOk: () => {
        CompanyProContext.updateCompInfo(id, {
          status: status == "Deactivated" ? "Activated" : "Deactivated",
          reason: reason,
        });
        showNotification(
          "success",
          "Updated",
          `Organization status ${
            status == "Deactivated" ? "activated" : "deactivated"
          } Successfully`
        );
        getData();
      },
    });
  };
  const showModal = (record) => {
    setModalData(record);
    setIsModalVisible(true);
  };
  const showOnboarding = (record) => {
    setModalData(record);
    setIsEditOrganization(true);
  };

  const progressBar = (value) => {
    if (progress == 0) {
      form.submit();
      setNext(value);
      return;
    }
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
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      width: 140,
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
                <Tooltip placement="bottom" title="View" color="#1963A6">
                  <Button
                    style={{ width: "40px" }}
                    onClick={() => {
                      showModal(record);
                    }}
                  >
                    <EyeFilled
                      style={{ color: "#268FEE", marginLeft: "-2px" }}
                    />
                  </Button>
                </Tooltip>
              </Col>
              <Col xs={22} sm={15} md={8}>
                <Tooltip placement="bottom" title="Edit" color="#1963A6">
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
                </Tooltip>
              </Col>
              <Col xs={22} sm={15} md={8}>
                <Button
                  style={{ width: "40px" }}
                  onClick={() => {
                    changeCompStatus(record.id, record.status);
                  }}
                >
                  {record.status == "Deactivated" ? (
                    <Tooltip
                      placement="bottom"
                      title="Activate"
                      color="#1963A6"
                    >
                      <CheckCircleFilled
                        style={{ color: "#268FEE", marginLeft: "-2px" }}
                      />
                    </Tooltip>
                  ) : (
                    <Tooltip
                      placement="bottom"
                      title="Deactivate"
                      color="#1963A6"
                    >
                      <StopFilled
                        style={{ color: "#268FEE", marginLeft: "-2px" }}
                      />
                    </Tooltip>
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
      default:
        return null;
    }
  }

  const reset = () => {
    Object.keys({ ...data }).map((field) => {
      form.setFieldsValue({ [`${field}`]: null });
    });
    setActivetab("1");
    setData({});
    localStorage.removeItem("OrgDetails");
    localStorage.removeItem("costCenters");
    localStorage.removeItem("OrgHier");
    localStorage.removeItem("OrgAccess");
    localStorage.removeItem("Logo");
    setFileName(null);
    setIsStepFourInvalid(false);
    setIsStepOneInvalid(false);
    return;
  };

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
  };
  return (
    <>
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
                    />
                  </Modal>
                </Col>
              </Row>
              <Modal
                bodyStyle={{
                  height: 530,
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
        <Tabs.TabPane
          tab="Organization Onboarding"
          key="2"
          destroyInactiveTabPane
        >
          <Card
            className="stepsCard"
            style={{
              background: "#fff",
              margin: "0px 15px 20px 15px",
              // height: "55rem",
            }}
          >
            <Steps
              progress
              current={progress}
              onChange={progressBar}
              className="stepBars"
            >
              <Step
                className={isStepOneInvalid ? "stepOneError" : ""}
                title="Organization Details"
              />
              <Step title="Cost Center" />
              <Step title="Organization Hierarchy" />
              <Step
                className={isStepFourInvalid ? "stepOneError" : ""}
                title="Access Details"
              />
            </Steps>
          </Card>
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
              <AccessDetails
                preCode={data.preCode}
                setIsStepFourInvalid={setIsStepFourInvalid}
                domain={data.domain}
              />
            ) : (
              <OrgDetails
                data={data}
                fileName={fileName}
                imageUrl={imageUrl}
                changeSave={saveOrgDetails}
                form={form}
                setIsStepOneInvalid={setIsStepOneInvalid}
              />
            )}
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
                  // htmlType="submit"
                  onClick={async () => {
                    if (progress != 3) {
                      if (progress == 0) {
                        setNext(1);
                        form.submit();
                        return;
                      }
                      setIsStepOneInvalid(false);
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
