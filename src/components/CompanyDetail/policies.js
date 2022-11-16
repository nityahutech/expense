import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  Modal,
  Form,
  Table,
  Input,
  Row,
  Col,
  notification,
  Card,
} from "antd";
import { PlusCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import FormItem from "antd/es/form/FormItem";
import { upload } from "@testing-library/user-event/dist/upload";
import PolicyContext from "../../contexts/PolicyContext";
import "../../components/CompanyDetail/companystyle.css";

const Policies = () => {
  const [policy, setPolicy] = useState([]);
  const [form] = Form.useForm();
  const imgRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [file, setFile] = useState("");

  const columns = [
    {
      title: "Policy Title",
      dataIndex: "title",
      key: "idtitle",
      width: 150,
    },
    {
      title: "Policy Description",
      dataIndex: "description",
      key: "iddescription ",
      width: 200,
    },
    {
      title: "Uploaded File",
      dataIndex: "upload",
      key: "upload",
      width: 200,
      render: (data, record) => {
        // var fReader = new FileReader();
        // fReader.readAsDataURL(imgRef.current.input.files[0]);
        // fReader.onload = function (event) {
        //   setImgPreview(event.target.result);
        // };
        return (
          <a href={data} target="_blank">
            {record.fileName}
          </a>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      fixed: 'right',
      width: 80,
      render: (_, record) => {
        return (
          <DeleteOutlined
            onClick={() => deleteData(record.id, record.fileName)}
          />
        );
      },
    },
  ];

  function handleChange(event) {
    setFile(event.target.files[0]);
  }
  async function addPolicy(values) {
    try {
      await PolicyContext.createPolicy(values, file);
      showNotification("success", "Success", "Upload Complete");
      const timer = setTimeout(() => {
        getData();
      }, 3500);
      return () => clearTimeout(timer);
    } catch {
      showNotification("error", "Error", "Upload Failed");
    }
  }
  const showNotification = (type, msg, desc) => {
    notification[type]({
      message: msg,
      description: desc,
    });
  };
  
    const displayPolicy = () => {
    return policy.forEach((pol) => {
      Object.keys(pol).map((u) => {
        <p>
          {u}: {policy.u}
        </p>;
        {
        }
      });
    });
    // <Table dataSource={policy}></Table>
    // Object.keys(policy).map(u => {
    //   <p>{u}: {policy.u}</p>
    // })
  };

  const deleteData = (id, fileName) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this record?",
      okText: "Yes",
      okType: "danger",

      onOk: () => {
        PolicyContext.deletePolicy(id, fileName)
          .then((response) => {
            showNotification("success", "Success", "Successfully deleted");
            getData();
          })
          .catch((error) => {
            showNotification("error", "Error", "Record not deleted ");
          });
      },
    });
  };

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    let alldata = await PolicyContext.getPolicy();
    // setData(alldata);
    setPolicy(alldata);
  };

  const showModal = () => {
    setIsModalOpen(true);
    form.resetFields();
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
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
            width: '75%',
            margin: '10px',
            display: 'flex',
            alignItems: 'center'
          }}>
          <Col span={24}>
            <Form
              style={{ marginLeft: 0 }}
              action="/action_page.php"
              form={form}
              labelCol={{ span: 30 }}
              wrapperCol={{ span: 30 }}
              initialValues={{ remember: true }}
              autoComplete="off"
              onFinish={addPolicy}
              layout="vertical"
            >
              <Card
                title="Company Policies"
                className="policyCard"
                bordered={false}
                style={{
                  width: '100%',
                  marginTop: 10,
                  borderRadius:"10px",
                }}
              >
                <Table
                  columns={columns}
                  pagination={false}
                  dataSource={policy}
                  scroll={{ x: 400 }}
                  className="policies"
                />
                <Button
                  type="primary"
                  onClick={showModal}
                  style={{ marginLeft: "10px" }}
                >
                  <PlusCircleOutlined />
                  Add
                </Button>
                <Modal
                  title="Add Policy"
                  open={isModalOpen}
                  onOk={() => {
                    form.submit();
                    handleOk();
                  }}
                  onCancel={handleCancel}
                  visible={isModalVisible}
                  okText="Save"
                  width={400}
                  closeIcon={
                    <div
                      className="modal-close-x"
                      onClick={() => {
                        setIsModalVisible(false);
                      }}
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
                  <div className="div-discription">Uplode File</div>
                  <FormItem
                    name="upload"
                    rules={[
                      {
                        required: true,
                        message: "upload file",
                      },
                    ]}
                  >
                    <div className="choose">
                      <Input
                        type="file"
                        id="upload"
                        name="upload"
                        onChange={handleChange}
                        style={{
                          width: "100%",
                          borderBottom: "1px solid #ccc ",
                          paddingLeft: "0px",
                          marginTop: "10px",
                        }}
                        bordered={false}
                      // ref={imgRef}
                      // required
                      />
                    </div>
                  </FormItem>
                </Modal>
              </Card>
            </Form>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Policies;
