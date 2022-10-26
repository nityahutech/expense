
import React,{useState} from "react";

import { 
  Table,
  Form,
  Button,
  Input,
  Modal,
  message, 
  Upload
} from 'antd'

import { 
  PlusCircleOutlined,
  UploadOutlined 
} from "@ant-design/icons";

import FormItem from "antd/es/form/FormItem";

// ------------------------------------------------------------

// ------------------------------------------------------------

function CertificateID() {

// ------------------------------------------------------------
 
  // -----------------code for useState
  const [certificatioDetails, setCertificationDetais] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visible,setVisible]= useState(false);
  const [uploadFile,setUploadFile]=useState([])
  const [form]=Form.useForm()
  
  // -----------------code for model
  const showModal = () => {
    setIsModalOpen(true);
    setVisible(true)
    form.resetFields()
  };
  const handleOk = () => {
    setIsModalOpen(false);
    setVisible(false)
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setVisible(false)
    form.resetFields()
  };
  // -----------------code for table content
  const columns = [
    {
      title: 'Course Title',
      dataIndex: 'courseTitle',
      key: 'courseTitle',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Uploadded file',
      dataIndex: 'upload',
      key: 'upload',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
    }
  ]
  // --------------------code for upload 
  const props = {
    name: 'file',
    maxLength:10 ,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    progress: {
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068',
      },
      strokeWidth: 3,
      format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
  };
// ------------------------------------------------------------

 // -----------------function for datasourse
 function addNewDetail (values) {
  console.log({values})
  setCertificationDetais([...certificatioDetails,values])
  setUploadFile([...uploadFile,values])
}
  return (

    <>
      <Table
        columns={columns}
        dataSource={certificatioDetails}
        pagination={false}
      >
      </Table>
        <Button type="text" onClick={showModal}>
          <PlusCircleOutlined />
          Add
        </Button>
          <Modal
          title="Basic Modal"
          open={isModalOpen}
          onOk={()=>{form.submit(); handleOk()}}
          onCancel={handleCancel} 
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
            <FormItem name="courseTitle">
              <Input placeholder="please enter the course title" />
            </FormItem>
            <FormItem name="type">
              <Input placeholder="please enter the course type" />
            </FormItem>
            <FormItem name="upload">
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
            </FormItem>
          </Form>
        </Modal>
    </>
    
  )
}

export default CertificateID

