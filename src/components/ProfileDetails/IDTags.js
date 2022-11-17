import React, { useState, useEffect } from 'react'
import { useAuth } from "../../contexts/AuthContext";
import Iframe from 'react-iframe';
import {
  PlusCircleOutlined,
  UploadOutlined,
  DeleteOutlined,
  CloseCircleOutlined
} from "@ant-design/icons";
import { Upload, message } from "antd";

import FormItem from "antd/es/form/FormItem";

import {
  Table,
  Form,
  Button,
  Input,
  Modal,
  notification,
} from 'antd'
import DocumentContext from '../../contexts/DocumentContext';

function IDTags() {
  const [allIdDetails, setAllIdDetails] = useState([])
  const [form] = Form.useForm()
  const { currentUser } = useAuth();
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

  // function beforeUpload(file) {
  //   console.log(file.type);
  //   const isXls = file.type === ['application/pdf'];
  //   if (!isXls) {
  //     message.error('You can only upload XLS file!');
  //   }
  //   const isLt2M = file.size / 1024 / 1024 < 2;
  //   if (!isLt2M) {
  //     message.error('Image must smaller than 2MB!');
  //   }
  //   return isXls && isLt2M;
  // }


  async function addNewDetail(values) {
    try {
      await DocumentContext.addDocument({ ...values, empId: currentUser.uid, type: "id" }, file)
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
    let alldata = await DocumentContext.getDocument(currentUser.uid, "id");
    setAllIdDetails(alldata);
  };

  const columns = [
    {
      title: 'ID Title',
      dataIndex: 'idtitle',
      key: 'idtitle',
    },
    {
      title: 'ID Description',
      dataIndex: 'iddescription',
      key: 'iddescription ',
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
        pagination={false}
        dataSource={allIdDetails}
      />
      <Button type="primary" onClick={showModal} style={{ marginLeft: "10px" }} >
        <PlusCircleOutlined />
        Add
      </Button>
      <Modal
        title="Add IDs"
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
          <FormItem
            name="idtitle"
            rules={[
              {
                pattern: /^[a-zA-Z\s]*$/,
                required: true,
                message: 'Enter the ID Name',
              },
            ]}
          >
            <Input placeholder="Enter ID Name"
              required />
          </FormItem>
          <FormItem
            name="iddescription"
            rules={[
              {
                pattern: /^[0-9A-Z\s]*$/,
                required: true,
                message: 'Enter ID Number',
              },
            ]}
          >
            <Input placeholder="Enter ID Number"
              required />
          </FormItem>
          <FormItem
            name="upload"
            rules={[
              {
                required: true,
                message: 'Please upload file',
              },
            ]}
          >
            <div className='idpage'>
              <Input
                type="file"
                accept='application/pdf'
                id="upload"
                name="upload"
                onChange={handleChange}
              // beforeUpload={beforeUpload}
              />

            </div>
            {/* <Upload {...props} >
              <Button onChange={handleChange}
                icon={<UploadOutlined />}>Click to Upload</Button>
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
            name='documentName'

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

export default IDTags
