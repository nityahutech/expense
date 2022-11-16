import { useState, useEffect } from "react";
import {
  Button,
  Table,
  Modal,
  Form,
  Input,
  notification,
} from "antd";
import Iframe from 'react-iframe';
import {
  PlusCircleOutlined,
  UploadOutlined,
  DeleteOutlined,
  CloseCircleOutlined
} from "@ant-design/icons";
import FormItem from "antd/es/form/FormItem";
import "../../style/CertificationID.css"
import DocumentContext from "../../contexts/DocumentContext";

function WorkID() {
  const [allWorkDetails, setAllWorkDetails] = useState([]);
  const [form] = Form.useForm();
  const currentUser = JSON.parse(sessionStorage.getItem("user"));
  const [file, setFile] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

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
    try {
      await DocumentContext.addDocument({ ...values, empId: currentUser.uid, type: "work" }, file)
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
  };
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
          .then(response => {
            showNotification("success", "Success", "Successfully deleted")
            getData();
          })
          .catch(error => {
            showNotification("error", "Error", "Record not deleted ");
          })
      },
    });
  };
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    let alldata = await DocumentContext.getDocument(currentUser.uid, "work");
    setAllWorkDetails(alldata);
  };

  const columns = [
    {
      title: "Company Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Start Date",
      dataIndex: "startdate",
      key: "duration",
    },
    {
      title: "End Date",
      dataIndex: "enddate",
      key: "duration",
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

          <a href={data} target="workName" onClick={showPdfModal}>
            {record.fileName}
            {/* <Button type='primary'>Preview</Button> */}
          </a>


        ) : (
          <div>-</div>
        )
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

  const showModal = () => {
    setIsModalOpen(true);
    form.resetFields();
  };
  const handleOk = () => {
  };
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

  return (
    <>
      <Table columns={columns} pagination={false} dataSource={allWorkDetails} />
      <Button type="primary" onClick={showModal} style={{ marginLeft: "10px" }}>
        <PlusCircleOutlined />
        Add
      </Button>
      <Modal
        title="Work Details"
        open={isModalOpen}
        onOk={() => {
          form.submit();
          handleOk();
        }}
        onCancel={handleCancel}
        okText="Save"
      >
        <Form
          // action="/action_page.php"
          form={form}
          labelCol={{ span: 20 }}
          wrapperCol={{ span: 20 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          onFinish={addNewWork}
          layout="vertical"
        >
          <FormItem name="name"
            rules={[
              {
                pattern: /^[a-zA-Z\s]*$/,
                required: true,
                message: 'Enter Company Name',
              },
            ]}
          >
            <Input placeholder="Enter Company Name" required />
          </FormItem>
          <FormItem name="duration"
            rules={[
              {
                pattern: /^[a-zA-Z0-9-\s]*$/,
                required: true,
                message: 'Enter Duration',
              },
            ]}
          >
            <Input placeholder="Enter Duration" required />
          </FormItem>
          <FormItem name="upload"
            rules={[
              {
                required: true,
                message: 'Please upload file',
              },
            ]}
          >
            <div className='certificatepage'>
              <Input
                type="file"
                // accept="image/gif, image/jpeg, image/png"
                accept='application/pdf'
                id="upload"
                name="upload"
                onChange={handleChange}
              //ref={imgRef}
              />
            </div>
            {/* <Upload {...props}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload> */}
          </FormItem>
        </Form>
      </Modal>
      <Modal
        bodyStyle={{ overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }}
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

              setIsModalVisible(false);
            }}
            style={{ color: "white" }}
          >
            X
          </div>
        }


      >
        <div style={{ position: 'relative', }}>
          <Iframe style={{}}
            // url="#"
            width={750}
            height="400px"
            id="myId"
            className="myClassname"
            display="initial"
            position="relative"
            overflow="hidden"
            name='workName'

          />
          <CloseCircleOutlined
            onClick={handlePdfCancel}
            style={{
              fontSize: 24,
              position: 'absolute',
              left: '50%',
              bottom: '-20px',
            }}
          />


        </div>
      </Modal>
    </>
  );
}

export default WorkID;
