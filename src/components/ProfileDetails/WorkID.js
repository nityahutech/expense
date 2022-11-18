import { useState, useEffect } from "react";
import {
  Button,
  Table,
  Modal,
  Form,
  Input,
  notification,
  DatePicker,
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
import moment from "moment";
import FormItem from "antd/es/form/FormItem";
import "../../style/CertificationID.css";
import DocumentContext from "../../contexts/DocumentContext";

function WorkID() {
  const [allWorkDetails, setAllWorkDetails] = useState([]);
  const [form] = Form.useForm();
  const currentUser = JSON.parse(sessionStorage.getItem("user"));
  const [file, setFile] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  async function addNewWork(values) {
    console.log("addnewWork", values);
    let durationInMonths = values.endDate.diff(values.startDate, "months");
    try {
      let newWorkDoc = {
        ...values,
        startDate: values.startDate.format("Do MMM, YYYY"),
        endDate: values.endDate.format("Do MMM, YYYY"),
        empId: currentUser.uid,
        duration:
          parseInt(durationInMonths / 12) +
          " Years," +
          (durationInMonths % 12) +
          " Months",
        type: "work",
      };
      await DocumentContext.addDocument(newWorkDoc, file);
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
            showNotification("error", "Error", "Record not deleted ");
          });
      },
    });
  };
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    setLoading(true);
    let alldata = await DocumentContext.getDocument(currentUser.uid, "work");
    setAllWorkDetails(alldata);
    setLoading(false);
  };

  const columns = [
    {
      title: "Company Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Date Of Joining",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "Date Of Relieving",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",

      // sorter: (c, d) => {
      //   let a = moment(c.dateCalc[0], "Do MMM, YYYY");
      //   let b = moment(d.dateCalc[0], "Do MMM, YYYY");
      //   return a - b;
      // },
    },
    {
      title: "Uploaded File",
      dataIndex: "upload",
      key: "upload",
      render: (data, record) => {
        return record.fileName ? (
          <a href={data} target="workName" onClick={showPdfModal}>
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
      fixed: "right",
      render: (_, record) => {
        return (
          <DeleteOutlined
            onClick={() => deleteData(record.id, record.fileName)}
          />
        );
      },
    },
  ];

  const showModal = () => {
    setIsModalOpen(true);
    form.resetFields();
  };
  const handleOk = () => {};
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };
  const checkAlphabets = (event) => {
    if (!/^[a-zA-Z ]*$/.test(event.key) && event.key !== "Backspace") {
      return true;
    }
  };

  const checkNumbervalue = (event) => {
    if (!/^[0-9]*\.?[0-9]*$/.test(event.key) && event.key !== "Backspace") {
      return true;
    }
  };

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
      <Table
        className="Id"
        columns={columns}
        pagination={false}
        dataSource={allWorkDetails}
      />
      <Button
        type="primary"
        onClick={showModal}
        style={{
          margin: "20px 0px 15px 48px",
        }}
      >
        <PlusCircleOutlined />
        Add
      </Button>
      <Modal
        bodyStyle={{ overflowY: "auto", maxHeight: "calc(100vh - 200px)" }}
        className="viewAppraisal"
        title="Work Details"
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
              // action="/action_page.php"
              form={form}
              initialValues={{ remember: true }}
              autoComplete="off"
              onFinish={addNewWork}
              layout="vertical"
            >
              <FormItem
                name="name"
                rules={[
                  {
                    pattern: /^[a-zA-Z\s]*$/,
                    required: true,
                    message: "Enter Company Name",
                  },
                ]}
              >
                <Input placeholder="Enter Company Name" required />
              </FormItem>

              <FormItem
                name="startDate"
                rules={[
                  {
                    required: true,
                    message: "Enter Start Date",
                  },
                ]}
              >
                <DatePicker style={{ width: "100%" }} format="Do MMM, YYYY" />
              </FormItem>
              <FormItem
                name="endDate"
                rules={[
                  {
                    required: true,
                    message: "Enter End Date",
                  },
                ]}
              >
                <DatePicker style={{ width: "100%" }} format="Do MMM, YYYY" />
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
        title="Document Preview"
        closeIcon={
          <div
            onClick={() => {
              document.getElementById("workName").src += "about:blank";
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
            width={750}
            height="400px"
            src="about:blank"
            id="workName"
            className="myClassname"
            display="initial"
            position="relative"
            overflow="hidden"
            name="workName"
          />
        </div>
      </Modal>
    </>
  );
}

export default WorkID;
