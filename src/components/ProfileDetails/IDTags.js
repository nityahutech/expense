import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Iframe from "react-iframe";
import {
  PlusCircleOutlined,
  UploadOutlined,
  DeleteOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { Upload, message, Tree } from "antd";
import FormItem from "antd/es/form/FormItem";
import "../CompanyDetail/companystyle.css";
import {
  Table,
  Form,
  Button,
  Input,
  Modal,
  notification,
  Spin,
  Col,
  Row,
} from "antd";
import DocumentContext from "../../contexts/DocumentContext";

function IDTags() {
  const [allIdDetails, setAllIdDetails] = useState([]);
  const [form] = Form.useForm();
  const { currentUser } = useAuth();
  const [file, setFile] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const showPdfModal = () => {
    setLoading(true);
    setIsModalVisible(true);
  };
  function handleChange(event) {
    let file = event.target.files[0];
    setFile(null);
    const isPdf = file.type === "application/pdf";
    if (!isPdf) {
      message.error("You can only upload Pdf file!");
      return;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
      return;
    }
    setFile(event.target.files[0]);
  }
  const showModal = () => {
    setIsModalOpen(true);
    form.resetFields();
  };
  const handleOk = () => {};
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };
  function beforeUpload(file) {
    // console.log(file.type);
  }
  async function addNewDetail(values) {
    if (file == null) {
      setIsModalOpen(false);
      showNotification("error", "Error", "Upload Failed");
      return;
    }
    try {
      await DocumentContext.addDocument(
        { ...values, empId: currentUser.uid, type: "id" },
        file
      );
      setIsModalOpen(false);
      showNotification("success", "Success", "Upload Complete");
      const timer = setTimeout(() => {
        getData();
      }, 5000);
      return () => clearTimeout(timer);
    } catch {
      setIsModalOpen(false);
      showNotification("error", "Error", "Upload Failed");
    }
    setFile(null);
  }
  const showNotification = (type, msg, desc) => {
    notification[type]({
      message: msg,
      description: desc,
    });
  };
  const deleteData = (id, fileName) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        DocumentContext.deleteDocument(currentUser.uid, id, fileName)
          .then((response) => {
            showNotification("success", "Success", "Successfully deleted");
            getData();
          })
          .catch((error) => {
            showNotification("error", "Error", "Record not deleted");
          });
      },
    });
  };
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    setLoading(true);
    let alldata = await DocumentContext.getDocument(currentUser.uid, "id");
    setAllIdDetails(alldata);
    setLoading(false);
  };
  const columns = [
    {
      title: "ID Title",
      dataIndex: "idtitle",
      key: "idtitle",
    },
    {
      title: "ID Description",
      dataIndex: "iddescription",
      key: "iddescription ",
    },
    {
      title: "Uploaded File",
      dataIndex: "upload",
      key: "upload",
      render: (data, record) => {
        return record.fileName ? (
          <a href={data} target="documentName" onClick={showPdfModal}>
            {record.fileName}
            {/* <Button type='primary'>Preview</Button> */}
          </a>
        ) : (
          <div>-</div>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        return (
          <DeleteOutlined
            onClick={() => deleteData(record.id, record.fileName)}
          />
        );
      },
    },
  ];
  // if (loading) {
  //   return (
  //     <div
  //       style={{
  //         height: "70vh",
  //         width: "100%",
  //         display: "flex",
  //         alignItems: "center",
  //         justifyContent: "center",
  //       }}
  //     >
  //       <Spin
  //         size="large"
  //         style={{
  //           position: "absolute",
  //           top: "20%",
  //           left: "50%",
  //           margin: "-10px",
  //           zIndex: "100",
  //           opacity: "0.7",
  //           backgroundColor: "transparent",
  //         }}
  //       />
  //     </div>
  //   );
  // }
  return (
    <>
      <div className="table-responsive">
        <Table
          className="Id"
          columns={columns}
          pagination={false}
          dataSource={allIdDetails}
        />
      </div>

      <Button
        type="primary"
        onClick={showModal}
        style={{
          margin: "20px 0px 15px 48px",
          background: "#1963A6",
        }}
      >
        <PlusCircleOutlined />
        Add
      </Button>

      <Modal
        bodyStyle={{ overflowY: "auto", maxHeight: "calc(100vh - 200px)" }}
        className="viewAppraisal"
        title="Add IDs"
        centered
        width={450}
        open={isModalOpen}
        onOk={() => {
          form.submit();
          handleOk();
        }}
        okText="Save"
        onCancel={handleCancel}
        closeIcon={
          <div
            onClick={() => {
              setIsModalOpen(false);
            }}
            style={{ color: "#ffffff" }}
          >
            X
          </div>
        }
      >
        <Row
          className="apply-leave"
          style={{
            marginTop: "10px",
          }}
        >
          <Col
            xl={24}
            lg={24}
            md={24}
            sm={24}
            xs={24}
            style={{
              background: "flex",
              padding: "10px",
              // width: "400px",
            }}
          >
            <Form
              form={form}
              initialValues={{ remember: true }}
              autoComplete="off"
              onFinish={addNewDetail}
              layout="vertical"
            >
              <FormItem
                name="idtitle"
                rules={[
                  {
                    pattern: /^[a-zA-Z\s]*$/,
                    required: true,
                    message: "Enter the ID Name",
                  },
                ]}
              >
                <Input 
                  placeholder="Enter ID Name" 
                  required 
                />
              </FormItem>
              <FormItem
                name="iddescription"
                rules={[
                  {
                    pattern: /^[0-9A-Z\s]*$/,
                    required: true,
                    message: "Enter ID Number",
                  },
                ]}
              >
                <Input placeholder="Enter ID Number" required />
              </FormItem>
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
                    beforeUpload={beforeUpload}
                  />
                </div>
              </FormItem>
            </Form>
          </Col>
        </Row>
      </Modal>
      <Modal
        bodyStyle={{ overflowY: "auto", maxHeight: "calc(100vh - 200px)" }}
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
              document.getElementById("documentName").src += "about:blank";
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
            id="documentName"
            className="myClassname"
            display="initial"
            position="relative"
            overflow="hidden"
            name="documentName"
          />
        </div>
      </Modal>
    </>
  );
}
export default IDTags;
