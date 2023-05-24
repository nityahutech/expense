import { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Form,
  Table,
  Input,
  Row,
  Col,
  Card,
  message,
  Select,
  Skeleton,
} from "antd";
import moment from "moment";
import {
  PlusCircleOutlined,
  DeleteOutlined,
  EditFilled,
} from "@ant-design/icons";
import Iframe from "react-iframe";
import FormItem from "antd/es/form/FormItem";
import PolicyContext from "../contexts/PolicyContext";
import "../components/CompanyDetail/companystyle.css";
// import { showNotification } from "../../contexts/CreateContext";

const Policies = () => {
  const [policy, setPolicy] = useState([]);
  const [version, setVersion] = useState([1]);
  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editModal, showEditModal] = useState(false);
  const [file, setFile] = useState("");
  const [editOld, setEditOld] = useState({});

  const columns = [
    {
      title: "Policy Title",
      dataIndex: "title",
      key: "title",
      width: 150,
      align: "left",
    },
    {
      title: "Policy Description",
      dataIndex: "description",
      key: "description ",
      width: 200,
      align: "left",
    },
    {
      title: "Version",
      dataIndex: "version",
      key: "version",
      width: 85,
      align: "left",
      render: (_, record, i) => {
        return (
          <>
            <Select
              defaultValue={record.versions.length}
              style={{
                width: 55,
              }}
              onChange={(e) => {
                let temp = [...version];
                temp[i] = e;
                setVersion(temp);
              }}
              options={record.versions.map((ver) => {
                return {
                  value: ver.version,
                  label: ver.version,
                };
              })}
            />
          </>
        );
      },
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: 150,
      align: "left",
      render: (_, record, i) => {
        let res = record.versions.filter((ver) => ver.version == version[i]);
        return res[0].date;
      },
    },
    {
      title: "Uploaded File",
      dataIndex: "file",
      key: "file",
      width: 200,
      align: "left",
      render: (_, record, i) => {
        let res = record.versions.filter((ver) => ver.version == version[i]);
        return (
          <a
            href={res[0].url}
            target="policyName"
            onClick={() => setIsModalVisible(true)}
          >
            {res[0].file}
          </a>
        );
      },
    },
    // {
    //   title: "Action",
    //   key: "action",
    //   fixed: "center",
    //   width: 80,
    //   render: (_, record) => {
    //     return (
    //       <>
    //         <DeleteOutlined
    //           style={{ color: "red" }}
    //           onClick={() => deleteData(record)}
    //         />
    //         <EditFilled
    //           style={{ paddingLeft: "10px", color: "#007acb" }}
    //           onClick={() => {
    //             setEditOld(record);
    //             showEditModal(true);
    //           }}
    //         />
    //       </>
    //     );
    //   },
    // },
  ];

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    let alldata = await PolicyContext.getPolicy();
    let temp = [...alldata];
    alldata.forEach((pol, i) => {
      pol.versions.sort((a, b) => {
        return b.version - a.version;
      });
      temp[i] = pol.versions[0].version;
    });
    setVersion(temp);
    setPolicy(alldata);
    setLoading(false);
  };

  return (
    <>
      <div
        className="education"
        style={{
          margin: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Row
          className="Row-Card"
          style={{
            width: "75%",
            margin: "10px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Col span={24}>
            {loading ? (
              <Skeleton active />
            ) : (
              <Card
                title="Company Policies"
                className="policyCard"
                bordered={true}
                hoverable={true}
                style={{
                  width: "100%",
                  marginTop: 10,
                  borderRadius: "10px",
                  cursor: "default",
                }}
              >
                <Table
                  columns={columns}
                  pagination={false}
                  dataSource={policy}
                  scroll={{ x: 400 }}
                  className="policies"
                />
                {/* <Button
                  type="primary"
                  onClick={() => {
                    setIsModalOpen(true);
                    form.resetFields();
                  }}
                  style={{
                    marginLeft: "10px",
                    background: "#1963a6",
                    border: "1px solid #1963A6",
                  }}
                >
                  <PlusCircleOutlined />
                  Add
                </Button> */}
                {/* <Form
                  style={{ marginLeft: 0 }}
                  action="/action_page.php"
                  form={form}
                  labelCol={{ span: 30 }}
                  wrapperCol={{ span: 30 }}
                  initialValues={{ remember: true }}
                  autoComplete="off"
                  //   onFinish={addPolicy}
                  layout="vertical"
                >
                  <Modal
                    bodyStyle={{
                      overflowY: "auto",
                      maxHeight: "calc(100vh - 200px)",
                    }}
                    className="viewAppraisal"
                    title="Add Policy"
                    centered
                    width={450}
                    open={isModalOpen}
                    onOk={() => form.submit()}
                    onCancel={() => {
                      setIsModalOpen(false);
                      form.resetFields();
                    }}
                    okText="Save"
                    closeIcon={
                      <div
                        className="modal-close"
                        onClick={() => setIsModalVisible(false)}
                        style={{ color: "#ffffff" }}
                      >
                        X
                      </div>
                    }
                  >
                    <div className="div-discription">Title</div>
                    <Form.Item
                      name="title"
                      rules={[
                        {
                          required: true,
                          message: "Enter Policy Name",
                        },
                        {
                          pattern: /^[a-zA-Z\s]*$/,
                          message: "Please Enter Valid Name ",
                        },
                      ]}
                    >
                      <Input
                        style={{
                          width: "100%",
                          borderBottom: "1px solid #ccc ",
                          paddingLeft: "0px",
                          marginTop: "10px",
                        }}
                        bordered={false}
                        required
                        placeholder="Enter Policy Name"
                      />
                    </Form.Item>
                    <div className="div-discription">Description</div>
                    <Form.Item
                      name="description"
                      rules={[
                        {
                          required: true,
                          message: "Enter Description",
                        },
                        {
                          pattern: /^[a-zA-Z\s]*$/,
                          message: " Please Enter Description",
                        },
                      ]}
                    >
                      <Input
                        style={{
                          width: "100%",
                          borderBottom: "1px solid #ccc ",
                          paddingLeft: "0px",
                          marginTop: "10px",
                        }}
                        bordered={false}
                        required
                        placeholder="Enter Description"
                      />
                    </Form.Item>
                    <div className="div-discription">Upload File</div>
                    <FormItem
                      name="upload"
                      rules={[
                        {
                          required: true,
                          message: "Please upload file",
                        },
                      ]}
                    >
                      <div className="idpage">
                        <Input
                          type="file"
                          accept="application/pdf"
                          id="upload"
                          name="upload"
                          onChange={handleChange}
                        />
                      </div>
                    </FormItem>
                  </Modal>
                </Form> */}
                {/* //---------------iframeModal */}
                {/* <Modal
                  bodyStyle={{
                    overflowY: "auto",
                    maxHeight: "calc(100vh - 200px)",
                  }}
                  className="viewAppraisal"
                  centered
                  width={800}
                  visible={isModalVisible}
                  footer={null}
                  height="400px"
                  // closable={false}
                  title="Document Preview"
                  closeIcon={
                    <div
                      onClick={() => {
                        document.getElementById("policyName").src +=
                          "about:blank";
                        setIsModalVisible(false);
                      }}
                      style={{ color: "#ffffff" }}
                    >
                      X
                    </div>
                  }
                >
                  <div style={{ position: "relative" }}>
                    <Iframe
                      style={{}}
                      // url="#"
                      width={750}
                      height="400px"
                      src="about:blank"
                      id="policyName"
                      className="myClassname"
                      display="initial"
                      position="relative"
                      overflow="hidden"
                      name="policyName"
                    />
                  </div>
                </Modal> */}
                {/* //---------------edit modal */}
                {/* <Form
                  style={{ marginLeft: 0 }}
                  action="/action_page.php"
                  form={form1}
                  labelCol={{ span: 30 }}
                  wrapperCol={{ span: 30 }}
                  initialValues={{ remember: true }}
                  autoComplete="off"
                  //   onFinish={editPolicy}
                  layout="vertical"
                >
                  <Modal
                    bodyStyle={{
                      overflowY: "auto",
                      maxHeight: "calc(100vh - 200px)",
                    }}
                    className="viewAppraisal"
                    title="Edit Policy Detail"
                    centered
                    destroyOnClose
                    width={450}
                    open={editModal}
                    onOk={() => {
                      form1.submit();
                      // handleOk();
                    }}
                    onCancel={() => {
                      showEditModal(false);
                      form.resetFields();
                    }}
                    okText="Save"
                    closeIcon={
                      <div
                        className="modal-close"
                        onClick={() => {
                          showEditModal(false);
                        }}
                        style={{ color: "#ffffff" }}
                      >
                        X
                      </div>
                    }
                  >
                    <div className="div-discription">Title</div>
                    <Form.Item initialValue={editOld?.title} name="title">
                      <Input
                        style={{
                          width: "100%",
                          borderBottom: "1px solid #ccc ",
                          paddingLeft: "0px",
                          marginTop: "10px",
                          color: "black",
                        }}
                        bordered={false}
                        disabled
                      />
                    </Form.Item>
                    <div className="div-discription">Description</div>
                    <Form.Item
                      initialValue={editOld?.description}
                      name="description"
                      rules={[
                        {
                          required: true,
                          message: "Enter Description ",
                        },
                        {
                          pattern: /^[a-zA-Z\s]*$/,
                          message: " Please Enter Description",
                        },
                      ]}
                    >
                      <Input
                        style={{
                          width: "100%",
                          borderBottom: "1px solid #ccc ",
                          paddingLeft: "0px",
                          marginTop: "10px",
                        }}
                        bordered={false}
                        required
                        placeholder="Enter Description"
                      />
                    </Form.Item>
                    <div className="div-discription">{`Version ${
                      editOld?.versions?.length + 1
                    }`}</div>
                    <FormItem
                      name="upload"
                      rules={[
                        {
                          required: true,
                          message: "Please upload file",
                        },
                      ]}
                    >
                      <div className="idpage">
                        <Input
                          type="file"
                          accept="application/pdf"
                          id="upload"
                          name="upload"
                          onChange={handleChange}
                        />
                      </div>
                    </FormItem>
                  </Modal>
                </Form> */}
              </Card>
            )}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Policies;
