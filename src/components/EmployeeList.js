import { Table, Button, Modal, Layout, Row, Col, Input } from "antd";
import {
  EditOutlined,
  SearchOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Editemployee from "./Editemployee";
import React, { useEffect, useState } from "react";
import { getUsers } from "../contexts/CreateContext";
import "../style/EmployeeList.css";
import EmpInfoContext from "../contexts/EmpInfoContext";

function EmployeeList() {
  const [modaldata, setmodaldata] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
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
      title: "Employee Code",
      dataIndex: "empId",
      key: "empId",
      fixed: "left",
      width: 120,
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
      title: "Middle Name",
      dataIndex: "mname",
      key: "mname",

      width: 160,
    },
    {
      title: "Last Name",
      dataIndex: "lname",
      key: "lname",
      width: 160,
    },
    {
      title: "Email",
      dataIndex: "mailid",
      key: "mailid",
      width: 200,
      ellipsis: true,
    },
    {
      title: "Date of Join",
      dataIndex: "doj",
      key: "doj",
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
      title: "Personal Email",
      dataIndex: "contactEmail",
      key: "contactEmail",
      width: 200,
      ellipsis: true,
    },
    {
      title: "Contact No.",
      dataIndex: "phonenumber",
      key: "phonenumber",
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
      title: "Manager",
      dataIndex: "isManager",
      key: "isManager",
      width: 100,
    },
    {
      title: "Work Location",
      dataIndex: "location",
      key: "location",
      width: 150,
    },

    {
      title: "Earn Leave",
      dataIndex: "earnLeave",
      key: "earnLeave",
      width: 60,
    },
    {
      title: "Sick Leave",
      dataIndex: "sickLeave",
      key: "sickLeave",
      width: 60,
    },
    {
      title: "Casual Leave",
      dataIndex: "casualLeave",
      key: "casualLeave",
      width: 60,
    },
    {
      title: "Optional Leave",
      dataIndex: "optionalLeave",
      key: "optionalLeave",
      width: 75,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      fixed: "right",
      align: "center",
      width: 120,

      render: (_, record) => {
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
    setmodaldata(record);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    // submit form data
  };

  const handleEditEmployee = (record) => {
    setEditedRecord(record);
  };
  async function getData() {
    //hit api to get the employees
    //set that employees to data state
    setLoading(true);
    const allData = await getUsers();
    let d = allData.docs.map((doc, i) => {
      return {
        ...doc.data(),
        isManager: doc.data().isManager ? "true" : "false",
        id: doc.id,
        sn: i + 1,
        disabled: false,
      };
    });
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
          ex.lname.toLowerCase().includes(search.toLowerCase()) ||
          ex?.mname?.toLowerCase()?.includes(search?.toLowerCase())
      );
      console.log({ result });
      const modifiedFilterExpense = [...result];
      setFilterEmployees(modifiedFilterExpense);
    } else {
      setFilterEmployees(allEmployees);
    }
  };

  const onDelete = (idx, e) => {
    e.preventDefault();
    EmpInfoContext.disablePerson(data[idx].id);
    // EmpInfoContext.enablePerson(data[idx].id)
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
