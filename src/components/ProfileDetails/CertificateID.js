import { useAuth } from "../../contexts/AuthContext";
import React,{useState, useRef,useEffect} from "react";
import { 
  Table,
  Form,
  Button,
  Input,
  Modal,
  message, 
  Upload,
  Space,
  notification,
} from 'antd'

import { 
  PlusCircleOutlined,
  UploadOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import FormItem from "antd/es/form/FormItem";
import DocumentContext from "../../contexts/DocumentContext";
import { upload } from '@testing-library/user-event/dist/upload';
import { type } from "@testing-library/user-event/dist/type";
import { async } from "@firebase/util";

function CertificateID() { 
  const [certificatioDetails, setCertificationDetails] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visible,setVisible]= useState(false);
  const [uploadFile,setUploadFile]=useState([])
  const [form]=Form.useForm()
  const imgRef = useRef(null);
  const { currentUser } = useAuth();
  const [file, setFile] = useState("");

  function handleChange(event) {
    setFile(event.target.files[0]);
  }
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
   async function addNewDetail (values) {
    console.log(file)
    try{
      await DocumentContext.addDocument({...values,empId:currentUser.uid,type:"certificate"},file)
      showNotification("success","Success","Upload Complete");
      const timer = setTimeout(()=>{
      getData();
    }, 3500);
    return ()=> clearTimeout(timer);
  } catch {
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
            DocumentContext.deleteDocument(id,fileName)
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
  console.log(alldata)
   //setData(alldata);
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
        console.log("record: ", record);
        console.log("data:: ", data);
        // var fReader = new FileReader();
        // fReader.readAsDataURL(imgRef.current.input.files[0]);
        // fReader.onload = function (event) {
        //   setImgPreview(event.target.result);
        // };
        // return (
        //   <a href={imgRef.current.input.files[0].name} target="_blank">
        //     {imgRef.current.input.files[0].name}
        //   </a>
        // );
        //const hrefVal = imgRef?.current?.input?.files[0]?.name;
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
      render: (_, record) => {
        return (
          <DeleteOutlined
                          onClick={() => deleteData(record.id,record.fileName)}
                      />
      );
    },
  },
  ];
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
  return (
    <>
      <Table
        columns={columns}
        dataSource={certificatioDetails}
        pagination={false}
      >
      </Table>
        <Button type="primary" onClick={showModal}>
          <PlusCircleOutlined />
          Add
        </Button>
          <Modal
          title="Certification Details"
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
              <Input placeholder="Enter Course Name" />
            </FormItem>
            <FormItem name="duration">
              <Input placeholder="Enter Duration" />
            </FormItem>
            <FormItem name="upload"
            rules={[
              {
                required:true,
                message:'upload file',
              },
            ]}>
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

