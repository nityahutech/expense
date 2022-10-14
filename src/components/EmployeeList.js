import { Table, Button, Modal, Layout, Row, Col, Input } from "antd";
import {
  EditOutlined,
  SearchOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Editemployee from "./Editemployee";
import React, { useEffect, useState } from "react";
import { createUser, getUsers } from "../contexts/CreateContext";
import moment from "moment";
import "../style/EmployeeList.css";
import { doc } from "firebase/firestore";

function EmployeeList() {
  const [modaldata, setmodaldata] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [filterExpenses, setFilterExpense] = useState([]);
  const [editedRecord, setEditedRecord] = useState(null);
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState(window.innerWidth <= 768 ? "" : "left");
  const [filterEmployees, setFilterEmployees] = useState([]);
  const [allEmployees, setAllEmployees] = useState([]);
  const [data, setData] = React.useState([]);
  const [disableItem, setDisableItem] = useState(false);

  window.addEventListener("resize", () =>
    setSize(window.innerWidth <= 768 ? "" : "left")
  );
  const columns = [
    {
      title: "Sl. No.",
      dataIndex: "sn",
      key: "sn",
      fixed: "left",
      width: 80,
    },
    {
      title: "First Name",
      dataIndex: "fname",
      key: "fname",
      fixed: "left",
      width: 160,
      fixed: size,
    },
    {
      title: "Last Name",
      dataIndex: "lname",
      key: "lname",
      width: 160,
    },
    {
      title: "Personal Email",
      dataIndex: "mailid",
      key: "email",
      width: 200,
      ellipsis: true,
    },
    {
      title: "Date of Join",
      dataIndex: "doj",
      key: "dob",
      align: "center",
      width: 150,
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
      // align: "center",
      width: 190,
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      width: 120,
    },
    {
      title: "Contact No.",
      dataIndex: "phonenumber",
      key: "cnumber",
      align: "center",
      width: 150,
    },
    {
      title: "Reporting Manager",
      dataIndex: "repManager",
      key: "repManager",
      width: 200,
    },
    {
      title: "Secondary Manager",
      dataIndex: "secManager",
      key: "secManager",
      width: 200,
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      width: 200,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      fixed: "right",
      align: "center",
      width: 120,

      render: (_, record) => {
        console.log("record:: ", record);
        return (
          record.disabled === false && (
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
              <Button
                type="link"
                className="deleTe"
                onClick={(e) => {
                  onDelete(record.sn - 1, e);
                }}
              >
                <DeleteOutlined />
              </Button>
            </>
          )
        );
      },
    },
  ];

  useEffect(() => {
    getData();
  }, []);

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
  async function getData() {
    //hit api to get the employees
    //set that employees to data state
    setLoading(true);
    const allData = await getUsers();
    let d = allData.docs.map((doc, i) => {
      //  console.log(JSON.stringify(new Date(doc.data()['date'])));
      var longDateStr = moment(doc.data()["date"], "D/M/Y").format("MM-DDY");
      return {
        ...doc.data(),
        date: doc.data()["date"],
        dt: new Date(longDateStr),
        id: doc.id,
        sn: i + 1,
        disabled: false,
      };
    });
    console.log({ d });
    setData(d);
    setFilterEmployees(d);
    setAllEmployees(d);
    setLoading(false);
  }

  const searchChange = (e) => {
    let search = e.target.value;
    // setFilterCriteria({ ...filterCriteria, search: search });
    if (search) {
      let result = data.filter(
        (ex) =>
          ex.fname.toLowerCase().includes(search.toLowerCase()) ||
          ex.lname.toLowerCase().includes(search.toLowerCase())
      );
      const modifiedFilterExpense = [...result];
      setFilterEmployees(modifiedFilterExpense);
    } else {
      setFilterEmployees(allEmployees);
    }
  };

  const onDelete = (idx, e) => {
    e.preventDefault();
    console.log("data::: ", idx);
    const filteredData = data.map((doc, i) => {
      let disabled = false;
      if (idx == i) {
        disabled = true;
      }
      return {
        ...doc,

        sn: i + 1,
        disabled: disabled,
      };
    });
    setData(filteredData);
    setFilterEmployees(filteredData);
  };

  return (
    <Layout>
      <Row className="employeeRow">
        <Col>
          <Input
            placeholder="Search"
            prefix={<SearchOutlined />}
            onChange={searchChange}
          />
        </Col>
      </Row>
      <Table
        loading={loading}
        columns={columns}
        dataSource={filterEmployees}
        pagination={{
          position: ["bottomCenter"],
        }}
        scroll={{ x: 1300 }}
        className="employeeTable"
        size="small"
        reloadData={getData}
        rowClassName={(record) => record.disabled && "disabled-row"}
      />
      <Modal
        centered
        title="Employee Details"
        visible={isModalVisible}
        footer={null}
        afterClose={getData}
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
