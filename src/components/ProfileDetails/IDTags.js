import React,{useState, useRef} from 'react'

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
} from 'antd'
import { upload } from '@testing-library/user-event/dist/upload';

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

// --------------------------------------------------------------------------------

function IDTags() {

// --------------------------------------------------------------------------------

// ---------------------------------------usestate for adding data
const [allIdDetails, setAllIdDetails] = useState([])
const [visible,setVisible]= useState(false)
const [uploadFile,setUploadFile]=useState([])
const [form]=Form.useForm()
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

  const deleteData = (idtitle, e) => {
    const filteredData = allIdDetails.filter((item) => item.idtitle !== idtitle);
    setAllIdDetails(filteredData);
  };


  function addNewDetail (values) {
    console.log({values})
    setAllIdDetails([...allIdDetails,values])
    setUploadFile([...uploadFile,values])
  }
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
        return (
          <a href={imgRef.current.input.files[0].idtitle} target="_blank">
            {imgRef.current.input.files[0].idtitle}
          </a>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={(e) => deleteData(record.idtitle, e)}>
            <DeleteOutlined />
          </Button>
        </Space>
      ),
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


// --------------------------------------------------------------------- 
  return (
    <>
      <Table 
        // dataSource={dataSource}
        columns={columns}
        pagination={false}
        dataSource={allIdDetails}
      />
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
          // fields={[
          //   {
          //     name: ["title"],
          //     value: title,
          //   },
          //   {
          //     name: ["description"],
          //     value: description,
          //   },
          //   {
          //     name: ["file"],
          //     value: file,
          //   },
          // ]}
          layout="vertical"
        >
          <FormItem name="idtitle">
            <Input placeholder="Enter ID details" />
          </FormItem>
          <FormItem name="iddescription">
            <Input placeholder="Enter Experience Description" />
          </FormItem>
          <FormItem name="upload">
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

export default IDTags
