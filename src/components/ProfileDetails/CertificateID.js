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
  const [visible,setVisible]= useState(false);
  const [uploadFile,setUploadFile]=useState([])
  const [form]=Form.useForm()
  const imgRef = useRef(null);
  const { currentUser } = useAuth();

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
  function addNewDetail (values) {
      console.log({values})
       DocumentContext.addDocument({...values,empId:currentUser.uid,type:"certificate"});
      getData();
       setCertificationDetails([...certificatioDetails,values])
       setUploadFile([...uploadFile,values])
     };
    //  const deleteData=(id)=>{
    //  DocumentContext.deleteDocument(id)
    //   getData();
    //  };
    const deleteData = (id) => {
      Modal.confirm({
          title: "Are you sure, you want to delete this record?",
          okText: "Yes",
          okType: "danger",
  
          onOk: () => {
            DocumentContext.deleteDocument(id)
                  .then(response => {
                      console.log(response);
                      getData();
                  })
                  .catch(error => {
                      console.log(error.message);
  
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
        // return (
        //   <a href={imgRef.current.input.files[0].name} target="_blank">
        //     {imgRef.current.input.files[0].name}
        //   </a>
        // );
        const hrefVal = imgRef?.current?.input?.files[0]?.name;
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
      render: (_, record) => {
        return (
          <DeleteOutlined
                          onClick={() => deleteData(record.id)}
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
            <FormItem name="file">
            <Input
              type="file"
              // accept="image/gif, image/jpeg, image/png"
              id="myfile"
              name="file"
              ref={imgRef}
            />
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

