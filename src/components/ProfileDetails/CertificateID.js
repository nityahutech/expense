
import React,{useState, useRef} from "react";
import "../../style/CertificationID.css"

import { 
  Table,
  Form,
  Button,
  Input,
  Modal,
  message, 
  Upload,
  Space,
  Popconfirm,
} from 'antd'

import { 
  PlusCircleOutlined,
  UploadOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import FormItem from "antd/es/form/FormItem";

// ------------------------------------------------------------

// ------------------------------------------------------------

function CertificateID() {

// ------------------------------------------------------------
 
  // -----------------code for useState
  const [certificationDetails, setCertificationDetais] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visible,setVisible]= useState(false);
  const [uploadFile,setUploadFile]=useState([])
  const [form]=Form.useForm()
  const imgRef = useRef(null);
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

  const deleteData = (courseTitle, e) => {
    const filteredData = certificationDetails.filter((item) => item.courseTitle !== courseTitle);
    setCertificationDetais(filteredData);
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
      title: "Uploaded File",
      dataIndex: "file",
      key: "file",
      render: (data, record) => {
        console.log("record: ", record);
        console.log("data:: ", data);
        // var fReader = new FileReader();
        // fReader.readAsDataURL(imgRef.current.input.files[0]);
        // fReader.onload = function (event) {
        //   setImgPreview(event.target.result);
        // };
        const hrefVal = imgRef?.current?.input?.files[0]?.courseTitle;
        return (
          <a href={hrefVal} target="_blank">
            {hrefVal}
          </a>
        );
      },
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={(e) => deleteData(record.courseTitle, e)}
            // onCancel={cancel}
            // okText="Yes"
            // cancelText="No"
          >
          <Button type="link" style={{color:"#E64949"}} >
            <DeleteOutlined />
          </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]
  // --------------------code for upload 
  // const props = {
  //   name: 'file',
  //   maxLength:10 ,
  //   action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  //   headers: {
  //     authorization: 'authorization-text',
  //   },
  //   onChange(info) {
  //     if (info.file.status !== 'uploading') {
  //       console.log(info.file, info.fileList);
  //     }
  //     if (info.file.status === 'done') {
  //       message.success(`${info.file.name} file uploaded successfully`);
  //     } else if (info.file.status === 'error') {
  //       message.error(`${info.file.name} file upload failed.`);
  //     }
  //   },
  //   progress: {
  //     strokeColor: {
  //       '0%': '#108ee9',
  //       '100%': '#87d068',
  //     },
  //     strokeWidth: 3,
  //     format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
  //   },
  // };
// ------------------------------------------------------------

 // -----------------function for datasourse
 function addNewDetail (values) {
  console.log({values})
  setCertificationDetais([...certificationDetails,values])
  setUploadFile([...uploadFile,values])
}
  return (

    <>
      <Table
        columns={columns}
        dataSource={certificationDetails}
        pagination={false}
      >
      </Table>
        <Button type="primary" onClick={showModal} style={{marginLeft:"10px"}}>
          <PlusCircleOutlined />
          Add
        </Button>
          <Modal
          title="Add Certification"
          open={isModalOpen}
          onOk={()=>{form.submit(); handleOk()}}
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
            name="courseTitle"
            rules={[
              {
                required: true,
                message: 'Please enter the course title',
              },
            ]}
            >
              <Input placeholder="Please enter the course title"
              required />
            </FormItem>
            <FormItem 
              name="type"
              rules={[
                {
                  required: true,
                  message: 'Please enter the course type',
                },
              ]}
            >
              <Input placeholder="Please enter the course type" 
              required />
            </FormItem>
            <FormItem 
              name="upload"
              rules={[
                {
                  required: true,
                  message: 'Please upload the file',
                },
              ]}
            >
              <div className="certificationIP">
            <Input
              type="file"
              // accept="image/gif, image/jpeg, image/png"
              id="myfile"
              name="file"
              ref={imgRef}
              required
            />
            </div>
            {/* <Upload {...props}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload> */}
            </FormItem>
          </Form>
        </Modal>
    </>
    
  )
}

export default CertificateID

