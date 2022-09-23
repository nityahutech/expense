import { Table, Button, Modal, Layout } from "antd";
import { EditOutlined } from "@ant-design/icons";
import React from "react";
import { useState, useEffect } from "react";
import Editemployee from "./Editemployee";

const data = [
  {
    key: "1",
    sn: "1",
    fname: "Saswat",
    lname: "Patel",
    email: "saswat@gmail.com",
    doj: "23/07/1992",
    designation: "Software Developer",
    gender: "male",
    cnumber: "234456677",
  },
  {
    key: "2",
    sn: "2",
    fname: "Jatin",
    lname: "Yadav",
    email: "jatin@gmail.com",
    doj: "23/07/1993",
    designation: "Software Developer",
    gender: "male",
    cnumber: "234456677",
  },
];

function EmployeeList() {
  const [modaldata, setmodaldata] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editedRecord, setEditedRecord] = useState(null);
  const [loading, setLoading] = useState(false);
  const [allEmployee, setAllEmployee] = useState(data || []);
  // useEffect(() => {
  //   getData();
  // }, []);

  // async function getData() {
  //   setLoading(true);
  // }
  const columns = [
    {
      title: "Sl. No.",
      dataIndex: "sn",
      key: "sn",
      width: 80,
    },
    {
      title: "First Name",
      dataIndex: "fname",
      key: "fname",
      width: 180,
    },
    {
      title: "Last Name",
      dataIndex: "lname",
      key: "lname",
      width: 180,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 220,
    },
    {
      title: "D.O.J.",
      dataIndex: "date",
      key: "date",
      width: 150,
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
      width: 150,
    },

    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      width: 150,
    },
    {
      title: "Contact No.",
      dataIndex: "cnumber",
      key: "cnumber",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",

      render: (_, record) => {
        // console.log("record:: ", record);
        return (
          // record.key !== "subTotal" && (
          <>
            {/* <Space size="small"> */}
            <Button
              style={{ padding: 0 }}
              type="link"
              className="edIt"
              onClick={() => {
                handleEditEmployee(record);
                showModal(record);
              }}
            >
              {<EditOutlined />}
            </Button>
          </>
        );
        // );
      },
    },
  ];

  const showModal = (record) => {
    console.log(record);
    setmodaldata(record);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    // submit form data
  };

  const handleEditEmployee = (record) => {
    console.log("record: ", record);
    setEditedRecord(record);
  };
  return (
    <Layout>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          pageSize: 50,
        }}
        // scroll={{
        //   y: 240,
        // }}
      />
      <Modal
        centered
        title="Employee Details"
        visible={isModalVisible}
        footer={null}
        closeIcon={
          <div
            onClick={() => {
              setIsModalVisible(false);
            }}
          >
            X
          </div>
        }

        // onCancel={handleCancel}
      >
        <Editemployee
          className="Edit"
          record={editedRecord}
          setIsModalVisible={setIsModalVisible}
        />
      </Modal>
    </Layout>
  );
}

export default EmployeeList;
