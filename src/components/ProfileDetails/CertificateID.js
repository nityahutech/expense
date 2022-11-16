import { useState, useEffect } from "react";
import {
  Table,
  Form,
  Button,
  Input,
  Modal,
  notification,
} from 'antd'
import Iframe from 'react-iframe';
import {
  PlusCircleOutlined,
  UploadOutlined,
  DeleteOutlined,
  CloseCircleOutlined
} from "@ant-design/icons";
import FormItem from "antd/es/form/FormItem";
import DocumentContext from "../../contexts/DocumentContext";

function CertificateID() {
  const [certificatioDetails, setCertificationDetails] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const currentUser = JSON.parse(sessionStorage.getItem("user"));
  const [file, setFile] = useState("");
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
  const showModal = () => {
    setIsModalOpen(true);
    form.resetFields()
  };
  const handleOk = () => {
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields()
  };
  async function addNewDetail(values) {
    try {
      await DocumentContext.addDocument({ ...values, empId: currentUser.uid, type: "certificate" }, file)
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
  //   setCertificationDetails([...certificatioDetails,values])
  //    setUploadFile([...uploadFile,values])
  //  };
  const deleteData = (id, fileName) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this record?",
      okText: "Yes",
      okType: "danger",

      onOk: () => {
        DocumentContext.deleteDocument(currentUser.uid, id, fileName)
          .then(response => {
            showNotification("success", "Success", "Successfully deleted");
            getData();
          })
          .catch(error => {
            showNotification("error", "Error", "Record not deleted");
          })
      },
    });
  };

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    let alldata = await DocumentContext.getDocument(currentUser.uid, "certificate");
    setCertificationDetails(alldata);
  };

  const columns = [
    {
      title: 'Course Title',
      dataIndex: 'courseTitle',
      key: 'courseTitle',
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
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

  return (
    <>
      <Table
        columns={columns}
        dataSource={certificatioDetails}
        pagination={false}
      >
      </Table>
      <Button type="primary" onClick={showModal} style={{ marginLeft: "10px" }} >
        <PlusCircleOutlined />
        Add
      </Button>
      <Modal
        title="Certification Details"
        open={isModalOpen}
        onOk={() => { form.submit(); handleOk() }}
        onCancel={handleCancel}
        okText="Save"
      >
        <Form
          form={form}
          labelCol={{ span: 20 }}
          wrapperCol={{ span: 20 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          onFinish={addNewDetail}
          layout="vertical"
        >
          <FormItem name="courseTitle"
            rules={[
              {
                pattern: /^[a-zA-Z\s]*$/,
                required: true,
                message: 'Enter the Course Name',
              },
            ]}
          >
            <Input placeholder="Enter Course Name" required />
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
            name='certificateName'

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

  )
}

export default CertificateID

