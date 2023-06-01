import { useState, useEffect } from "react";
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
import Iframe from "react-iframe";
import {
  PlusCircleOutlined,
  UploadOutlined,
  DeleteOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import "../CompanyDetail/companystyle.css";
import FormItem from "antd/es/form/FormItem";
import DocumentContext from "../../contexts/DocumentContext";
import { useAuth } from "../../contexts/AuthContext";

function CertificateID() {
  const [certificatioDetails, setCertificationDetails] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const {currentUser} = useAuth()
  const [file, setFile] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const showPdfModal = () => {
    setIsModalVisible(true);
  };
  const handlePdfCancel = () => {
    setIsModalVisible(false);
  };
  function handleChange(event) {
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
  async function addNewDetail(values) {
    try {
      await DocumentContext.addDocument(
        { ...values, empId: currentUser.uid, type: "certificate" },
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
    let alldata = await DocumentContext.getDocument(
      currentUser.uid,
      "certificate"
    );
    setCertificationDetails(alldata);
    setLoading(false);
  };
  const columns = [
    {
      title: "Course Title",
      dataIndex: "courseTitle",
      key: "courseTitle",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Uploaded File",
      dataIndex: "upload",
      key: "upload",
      render: (data, record) => {
        return record.fileName ? (
          <a href={data} target="certificateName" onClick={showPdfModal}>
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
  if (loading) {
    return (
      <div
        style={{
          height: "70vh",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Spin
          size="large"
          style={{
            position: "absolute",
            top: "20%",
            left: "50%",
            margin: "-10px",
            zIndex: "100",
            opacity: "0.7",
            backgroundColor: "transparent",
          }}
        />
      </div>
    );
  }
  return (
    <>
      <div className="table-responsive">
        <Table
          className="Id"
          columns={columns}
          dataSource={certificatioDetails}
          pagination={false}
        ></Table>
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
        title="Certification Details"
        centered
        width={450}
        open={isModalOpen}
        onOk={() => {
          form.submit();
          handleOk();
        }}
        onCancel={handleCancel}
        okText="Save"
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
                name="courseTitle"
                rules={[
                  {
                    pattern: /^[a-zA-Z\s]*$/,
                    required: true,
                    message: "Enter the Course Name",
                  },
                ]}
              >
                <Input placeholder="Enter Course Name" required />
              </FormItem>
              <FormItem
                name="duration"
                rules={[
                  {
                    pattern: /^[a-zA-Z0-9-\s]*$/,
                    required: true,
                    message: "Enter Duration",
                  },
                ]}
              >
                <Input placeholder="Enter Duration" required />
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
                <div className="certificatepage">
                  <Input
                    type="file"
                    // accept="image/gif, image/jpeg, image/png"
                    accept="application/pdf"
                    id="upload"
                    name="upload"
                    onChange={handleChange}
                    //ref={imgRef}
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
              document.getElementById("certificateName").src += "about:blank";
              setIsModalVisible(false);
            }}
            style={{ color: "white" }}
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
            id="certificateName"
            className="myClassname"
            display="initial"
            position="relative"
            overflow="hidden"
            name="certificateName"
          />
        </div>
      </Modal>
    </>
  );
}
export default CertificateID;
