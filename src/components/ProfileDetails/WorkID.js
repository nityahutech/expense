import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";

import {
  Button,
  Table,
  Space,
  Modal,
  Form,
  Input,
  Image,
  Upload,
  message,
} from "antd";
import {
  DeleteOutlined,
  PlusCircleOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import FormItem from "antd/es/form/FormItem";
import Item from "antd/lib/list/Item";
import DocumentContext from "../../contexts/DocumentContext";
import { async } from "@firebase/util";

function WorkID() {
  const [allWorkDetails, setAllWorkDetails] = useState([
  //   {
  //   name: "",
  //   description: "",
  //   file: ""
  // }
]);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [imgPreview, setImgPreview] = useState();
  const imgRef = useRef(null);
  const [deleteRow, setDeleteRow] = useState("");
  const { currentUser } = useAuth();


  function addNewWork(values) {
    console.log();
    DocumentContext.addDocument({ ...values, empId: currentUser.uid, type: "work" });
    getData();
  };

  const deleteData = (id) => {
    DocumentContext.deleteDocument(id)
    // const filteredData = allWorkDetails.filter((item) => item.name !== name);
    getData();
    // setAllWorkDetails(filteredData);
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
      title: "Experience Description",
      dataIndex: "description",
      key: "description",
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
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={(e) => deleteData(record.id)}>
            <DeleteOutlined />
          </Button>
        </Space>
      ),
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

  // const props = {
  //   name: "file",
  //   action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  //   headers: {
  //     authorization: "authorization-text",
  //   },
  //   onChange(info) {
  //     if (info.file.status !== "uploading") {
  //       console.log(info.file, info.fileList);
  //     }
  //     if (info.file.status === "done") {
  //       message.success(`${info.file.name} file uploaded successfully`);
  //     } else if (info.file.status === "error") {
  //       message.error(`${info.file.name} file upload failed.`);
  //     }
  //   },
  // };

  return (
    <>
      <Table columns={columns} dataSource={allWorkDetails} />
      <Button type="primary" onClick={showModal}>
        <PlusCircleOutlined />
        Add
      </Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={() => {
          form.submit();
          handleOk();
        }}
        onCancel={handleCancel}
        visible={visible}
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
            <Input placeholder="Enter Company Name" />
          </FormItem>
          <FormItem name="description">
            <Input placeholder="Enter year of Experience" />
          </FormItem>
          <FormItem name="file">
            <Input
              type="file"
              // accept="image/gif, image/jpeg, image/png"
              id="myfile"
              name="file"
              ref={imgRef}
            />
          </FormItem>
        </Form>
      </Modal>
    </>
  );
}

export default WorkID;
