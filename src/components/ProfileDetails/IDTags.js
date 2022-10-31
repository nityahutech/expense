import React,{useState, useRef,useEffect} from 'react'
import { useAuth } from "../../contexts/AuthContext";
import "../../style/CertificationID.css"
import { 
  PlusCircleOutlined,
  UploadOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import FormItem from "antd/es/form/FormItem";

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
import { upload } from '@testing-library/user-event/dist/upload';
import DocumentContext from '../../contexts/DocumentContext';
import { updateCurrentUser } from 'firebase/auth';
import { getDatasetAtEvent } from 'react-chartjs-2';

// -----------------------code and data of table

// const dataSource = [
//   {
//     key: '1',
//     idtitle: 'Aadhar Card',
//     iddescription: 52632158479321552,
//     upload: 'My Aadhar.pdf',
//     action: 'Edit Delete'
//   },
//   {
//     key: '2',
//     idtitle: 'PAN Card',
//     iddescription: 'EDW85565255',
//     upload: 'My PAN.pdf',
//     action: 'Edit Delete'
//   },
// ];



// ---------------------------code of Upload button

const props = {
  name: 'file',
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
function IDTags() {
const [allIdDetails, setAllIdDetails] = useState([])
const [visible,setVisible]= useState(false)
const [uploadFile,setUploadFile]=useState([])
const [form]=Form.useForm()
const { currentUser } = useAuth();

const imgRef = useRef(null);
// ----------------------------------------usestate for add buttob
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  // const deleteData = (idtitle, e) => {
  //   const filteredData = allIdDetails.filter((item) => item.idtitle !== idtitle);
  //   setAllIdDetails(filteredData);
  // };

  const confirm = (e) => {
    console.log(e);
    message.success('Click on Yes');
  };
  const cancel = (e) => {
    console.log(e);
    message.error('Click on No');
  };

  function addNewDetail (values) {
    console.log({values})
    DocumentContext.addDocument({...values,empId:currentUser.uid,type:"id"});
    getData();
    setAllIdDetails([...allIdDetails,values])
    setUploadFile([...uploadFile,values])
  };
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
    let alldata=await DocumentContext.getDocument(currentUser.uid, "id");
    console.log(alldata)
     //setData(alldata);
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
        const hrefVal = imgRef?.current?.input?.files[0]?.idtitle;
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

  // ------------------------------------code for upload button 

  // const props = {
  //   name: 'file',
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
  // };


  return (
    <>
      <Table 
        columns={columns}
        pagination={false}
        dataSource={allIdDetails}
      />
      <Button type="primary" onClick={showModal} style={{marginLeft:"10px"}}>
        <PlusCircleOutlined />
        Add
      </Button>
      <Modal
        title="Add IDs"
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
          name="idtitle"
          rules={[
            {
              required: true,
              message: 'Enter the Id title',
            },
          ]}
          >
            <Input placeholder="Enter ID details" 
            required/>
          </FormItem>
          <FormItem 
          name="iddescription"
          rules={[
            {
              required: true,
              message: 'Enter Id Number',
            },
          ]}
          >
            <Input placeholder="Enter Id Number"
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

export default IDTags
