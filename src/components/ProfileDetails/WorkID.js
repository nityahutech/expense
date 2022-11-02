import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";

import {
  Button,
  Table,
  Space,
  Modal,
  Form,
  Input,
  Popconfirm,
  Upload,
  message,
  notification,
} from "antd";
import {
  DeleteOutlined,
  PlusCircleOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import FormItem from "antd/es/form/FormItem";
import "../../style/CertificationID.css"

import Item from "antd/lib/list/Item";
import { upload } from '@testing-library/user-event/dist/upload';
import DocumentContext from "../../contexts/DocumentContext";
import { async } from "@firebase/util";

function WorkID() {
  const [allWorkDetails, setAllWorkDetails] = useState([
  ]);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [imgPreview, setImgPreview] = useState();
  const imgRef = useRef(null);
  const [deleteRow, setDeleteRow] = useState("");
  const { currentUser } = useAuth();
  const [file, setFile] = useState("");

  function handleChange(event) {
    setFile(event.target.files[0]);
  }

   async function addNewWork(values) {
     try{
    await DocumentContext.addDocument({ ...values, empId: currentUser.uid, type: "work" },file)
    showNotification("success", "Success", "Upload Complete");
    const timer = setTimeout(() => {
    getData();
  }, 3500);
  return()=>clearTimeout(timer);
}catch{
  showNotification("error", "Error", "Upload Failed");
  }
};
const showNotification=(type,msg,desc)=>{
  notification[type]({
    message:msg,
    description:desc,
  });
};

  const deleteData = (id,fileName) => {
    Modal.confirm({
        title: "Are you sure, you want to delete this record?",
        okText: "Yes",
        okType: "danger",

        onOk: () => {
          DocumentContext.deleteDocument(id,fileName)
                .then(response => {
                  showNotification("success","Success","Successfully deleted")
                  getData();
                })
                .catch(error=>{
                  showNotification("error","Error","Record not deleted "); 
                })
        },
    });
  };
  useEffect(()=>{
    getData();
  },[]);
  const getData=async()=>{
    let alldata=await DocumentContext.getDocument(currentUser.uid, "work");
    console.log(alldata)
    // setData(alldata);
    setAllWorkDetails(alldata);
  };

  const columns = [
    {
      title: "Company Name",
      dataIndex: "name",
      key: "name",
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
        console.log("record: ", record);
        console.log("data:: ", data);
        // var fReader = new FileReader();
        // fReader.readAsDataURL(imgRef.current.input.files[0]);
        // fReader.onload = function (event) {
        //   setImgPreview(event.target.result);
        // };
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
    setVisible(true);
    form.resetFields();
  };
  const handleOk = () => {
    setIsModalOpen(false);
    setVisible(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setVisible(false);
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
      <Table columns={columns} dataSource={allWorkDetails} />
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
        visible={visible}
        okText="Save"
      >
        <Form
          action="/action_page.php"
          form={form}
          labelCol={{ span: 20 }}
          wrapperCol={{ span: 20 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          onFinish={addNewWork}
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
          <FormItem name="name">
            <Input placeholder="Enter Company Name" required />
          </FormItem>
          <FormItem name="duration">
            <Input placeholder="Enter Duration" required />
          </FormItem>
          <FormItem name="upload"
          rules={[
            {
              required:true,
              message:'upload file',
            },
          ]}
          >
           <div className="workId">
              <Input
                type="file"
                // accept="image/gif, image/jpeg, image/png"
                id="upload"
                name="upload"
                onChange={handleChange}
                />
            </div>
          </FormItem>
        </Form>
      </Modal>
    </>
  );
}

export default WorkID;
