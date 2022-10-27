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
} from "antd";
import {
  DeleteOutlined,
  PlusCircleOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import FormItem from "antd/es/form/FormItem";
import "../../style/WorkId.css";
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
          <Popconfirm
            title="Sure to delete?"
            onConfirm={(e) => deleteData(record.name, e)}
          >
            <Button type="link" style={{ color: "#e64949" }}>
              <DeleteOutlined />
            </Button>
          </Popconfirm>
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
          <FormItem
            name="name"
            onKeyPress={(event) => {
              if (checkAlphabets(event)) {
                event.preventDefault();
              }
            }}
            rules={[
              {
                required: true,

                message: "Please Enter Company Name",
              },
              {
                pattern: /^[a-zA-Z\s]*$/,
                message: "Please Enter Company Name",
              },
            ]}
          >
            <Input placeholder="Enter Company Title" required />
          </FormItem>
          <FormItem
            name="description"
            onKeyPress={(event) => {
              if (checkAlphabets(event) && checkNumbervalue(event)) {
                event.preventDefault();
              }
            }}
            rules={[
              {
                required: true,
                message: "Please Enter Description",
              },
              {
                pattern: /^[0-9a-zA-Z]+$/,
                message: "Please Enter Description",
              },
            ]}
          >
            <Input placeholder="Enter Experience Description" required />
          </FormItem>
          <FormItem
            name="file"
            className="file"
            rules={[
              {
                required: true,

                message: "Please Choose Required File",
              },
            ]}
          >
            <div className="choose">
              <Input
                type="file"
                // accept="image/gif, image/jpeg, image/png"
                id="myfile"
                name="file"
                ref={imgRef}
                required
              />
            </div>
          </FormItem>
        </Form>
      </Modal>
    </>
  );
}

export default WorkID;
