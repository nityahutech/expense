import { useAuth } from "../../contexts/AuthContext";
import React,{useState, useEffect} from "react";
import { 
  Table,
  Form,
  Button,
  Input,
  Modal,
  notification,
} from 'antd'

import { 
  PlusCircleOutlined,
  UploadOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import FormItem from "antd/es/form/FormItem";
import DocumentContext from "../../contexts/DocumentContext";

function CertificateID() { 
  const [certificatioDetails, setCertificationDetails] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form]=Form.useForm()
  const { currentUser } = useAuth();
  const [file, setFile] = useState("");

  function handleChange(event) {
    setFile(event.target.files[0]);
  }
  // -----------------code for model
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
   async function addNewDetail (values) {
    console.log(file)
    try{
      await DocumentContext.addDocument({...values,empId:currentUser.uid,type:"certificate"},file)
    setIsModalOpen(false);
    showNotification("success","Success","Upload Complete");
      const timer = setTimeout(()=>{
      getData();
    }, 5000);
    return ()=> clearTimeout(timer);
  } catch {
    setIsModalOpen(false);
    showNotification("error","Error","Upload Failed");
  }
};
const showNotification=(type, msg, desc) => {
  notification[type]({
    message:msg,
    description:desc,
  });
};
    //   setCertificationDetails([...certificatioDetails,values])
    //    setUploadFile([...uploadFile,values])
    //  };
    const deleteData = (id,fileName) => {
      Modal.confirm({
          title: "Are you sure, you want to delete this record?",
          okText: "Yes",
          okType: "danger",
  
          onOk: () => {
            DocumentContext.deleteDocument(currentUser.uid, id, fileName)
                  .then(response => {
                    showNotification("success","Success","Successfully deleted");
                      getData();
                  })
                  .catch(error => {
                    showNotification("error","Error","Record not deleted");
                   })
          },
      });
    };

useEffect(()=>{
  getData();
},[]);
const getData=async()=>{
  let alldata=await DocumentContext.getDocument(currentUser.uid, "certificate");
  setCertificationDetails(alldata);
};

  // const deleteData = (courseTitle, e) => {
  //   const filteredData = certificatioDetails.filter((item) => item.courseTitle !== courseTitle);
  //   setCertificationDetais(filteredData);
  // };
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
        return record.fileName? (
          <a href={data} target="_blank">
            {record.fileName}
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
                          onClick={() => deleteData(record.id,record.fileName)}
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
        <Button type="primary" onClick={showModal} style={{marginLeft:"10px"}} >
          <PlusCircleOutlined />
          Add
        </Button>
          <Modal
          title="Certification Details"
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
            <FormItem name="courseTitle"
              rules={[
                {
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
                  required: false,
                  message: 'Please upload file',
                },
              ]}
            >
              <div className='certificatepage'>
            <Input
              type="file"
              // accept="image/gif, image/jpeg, image/png"
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
    </>
    
  )
}

export default CertificateID

