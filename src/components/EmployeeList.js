import { Table, Button, Modal, Layout, Row, Col, Input } from "antd";
import { EditFilled, SearchOutlined, DeleteFilled, EyeFilled } from "@ant-design/icons";
import Editemployee from "./Editemployee";
import React, { useEffect, useState } from "react";
import { getUsers } from "../contexts/CreateContext";
import "../style/EmployeeList.css";
import EmpInfoContext from "../contexts/EmpInfoContext";
import EmployeeListview from "./EmployeeListview";


function EmployeeList() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [certificationDetails, setCertificationDetails] = useState([]);
  const [isProfileModal, setIsProfileModal] = useState(false);
  const [editedRecord, setEditedRecord] = useState(null);
  const [showRecord, setshowRecord] = useState([]);
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
      width: 100,
    },
    {
      title: "First Name",
      dataIndex: "fname",
      key: "fname",
      fixed: "left",
      width: 120,
      fixed: size,
      ellipsis: true,
    },
    {
      title: "Middle Name",
      dataIndex: "mname",
      key: "mname",
      ellipsis: true,
      width: 120,
    },
    {
      title: "Last Name",
      dataIndex: "lname",
      key: "lname",
      width: 120,
      ellipsis: true,
    },
    {
      title: "Email",
      dataIndex: "mailid",
      key: "mailid",
      width: 120,
      ellipsis: true,
    },
    {
      title: "Date of Join",
      dataIndex: "doj",
      key: "doj",
      align: "center",
      width: 100,
    },
    // {
    //   title: "Designation",
    //   dataIndex: "designation",
    //   key: "designation",
    //   // align: "center",
    //   width: 190,
    // },
    // {
    //   title: "Gender",
    //   dataIndex: "gender",
    //   key: "gender",
    //   width: 120,
    // },
    // {
    //   title: "Personal Email",
    //   dataIndex: "contactEmail",
    //   key: "contactEmail",
    //   width: 200,
    //   ellipsis: true,
    // },
    // {
    //   title: "Contact No.",
    //   dataIndex: "phonenumber",
    //   key: "phonenumber",
    //   align: "center",
    //   width: 150,
    // },
    // {
    //   title: "Reporting Manager",
    //   dataIndex: "repManager",
    //   key: "repManager",
    //   width: 200,
    // },
    // {
    //   title: "Secondary Manager",
    //   dataIndex: "repManager",
    //   key: "secManager",
    //   width: 200,
    // },
    // {
    //   title: "Lead",
    //   dataIndex: "lead",
    //   key: "lead",
    //   width: 160,
    // },
    // {
    //   title: "Department",
    //   dataIndex: "department",
    //   key: "department",
    //   width: 200,
    // },
    // {
    //   title: "Manager",
    //   dataIndex: "isManager",
    //   key: "isManager",
    //   width: 100,
    // },
    // {
    //   title: "Is Lead",
    //   dataIndex: "isLead",
    //   key: "isLead",
    //   width: 100,
    // },
    // {
    //   title: "Work Location",
    //   dataIndex: "location",
    //   key: "location",
    //   width: 150,
    // },
    // {
    //   title: "Earn Leave",
    //   dataIndex: "earnLeave",
    //   key: "earnLeave",
    //   width: 60,
    // },
    // {
    //   title: "Sick Leave",
    //   dataIndex: "sickLeave",
    //   key: "sickLeave",
    //   width: 60,
    // },
    // {
    //   title: "Casual Leave",
    //   dataIndex: "casualLeave",
    //   key: "casualLeave",
    //   width: 60,
    // },
    // {
    //   title: "Optional Leave",
    //   dataIndex: "optionalLeave",
    //   key: "optionalLeave",
    //   width: 75,
    // },
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
              <div className="employee-button" style={{ display: 'flex', flexDirection: 'row' }}>
                <Button
                  type="link"
                  className="show"
                  // style={{ width: "40px" }}
                  onClick={() => {
                    setIsProfileModal(true)
                    showViewModal(record);

                  }}
                >
                  {<EyeFilled />}
                </Button>
                <Button
                  style={{ padding: 0, color: "rgb(64, 169, 255)" }}
                  type="link"
                  className="edIt"
                  onClick={() => {
                    handleEditEmployee(record);
                    showModal(record);
                  }}
                >
                  {<EditFilled />}
                </Button>
                <Button
                  type="link"
                  className="deleTe"
                  onClick={(e) => {
                    onDelete(record.sn - 1, e);
                  }}
                >
                  <DeleteFilled />
                </Button>
              </div>
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
    setIsModalVisible(true);
  };
  const showViewModal = (record) => {
    setshowRecord(record)
    setCertificationDetails(record)
    // setIsModalVisible(true);
  };


  const handleEditEmployee = (record) => {
    setEditedRecord(record);
  };
  async function getData() {
    setLoading(true);
    const allData = await getUsers();
    let d = allData.docs.map((doc, i) => {
      return {
        ...doc.data(),
        isManager: doc.data().isManager ? "true" : "false",
        isLead: doc.data().isLead ? "true" : "false",
        id: doc.id,
        sn: i + 1,
        disabled: false,
      };
    });
    setData(d);
    setFilterEmployees(d);
    setAllEmployees(d);
    setCertificationDetails(d)
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
          ex?.mname?.toLowerCase()?.includes(search?.toLowerCase()) ||
          ex?.designation?.toLowerCase()?.includes(search?.toLowerCase()) ||
          ex.gender?.toLowerCase() == search
      );
      const modifiedFilterExpense = [...result];
      setFilterEmployees(modifiedFilterExpense);
    } else {
      setFilterEmployees(allEmployees);
    }
  };
  // const searchByGender = (e) => {
  //   let value = e.target.value;
  //   // setFilterCriteria({ ...filterCriteria, search: search });
  //   if (value) {
  //     let result = data.filter((ex) => ex.gender == value);
  //     console.log({ result });
  //     const modifiedFilterExpense = [...result];
  //     setFilterEmployees(modifiedFilterExpense);
  //   } else {
  //     setFilterEmployees(allEmployees);
  //   }
  // };
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
        {/* <Col>
          <Select
            style={{marginLeft: "10px", width: "132px"}}
            allowClear
            placeholder="Select Gender"
            onChange={searchByGender}
          >
            <Option value="Male">Male</Option>
            <Option value="Female">Female</Option>
          </Select>
        </Col> */}
      </Row>
      <Table
        loading={loading}
        columns={columns}
        dataSource={filterEmployees}
        pagination={{
          position: ["bottomCenter"],
        }}
        scroll={{ x: 800 }}
        className="employeeTable"
        size="small"
        reloadData={getData}
        rowClassName={(record) => record.disabled && "disabled-row"}
      // onRow={(record, rowIndex) => {
      //   return {
      //     onClick: (event) => {
      //       setSelectemp({ ...record });
      //       getEmpDetails(record.id, [
      //         moment().subtract(30, "days"),
      //         moment(),
      //       ]);
      //       setActivetab("2");
      //     }, // click row
      //   };
      // }}

      />
      <Modal
        className="editEmployee"
        bodyStyle={{
          height: 440,
          overflowY: "scroll",
          overflowX: "hidden",
        }}
        width={850}
        centered
        title="Employee Details"
        open={isModalVisible}
        footer={null}
        afterClose={getData}
        closeIcon={
          <div
            onClick={() => {
              setIsModalVisible(false);
            }}
            style={{ color: "#ffffff" }}
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

      <Modal
        className="editEmployee"
        bodyStyle={{
          height: 440,
          overflowY: "scroll",
          overflowX: "hidden",
          backgroundColor: '#d0d0d0',
          marginLeft: '0px'
        }}
        width={850}
        centered
        title="Employee Profile"
        open={isProfileModal}
        footer={null}
        afterClose={getData}
        closeIcon={
          <div
            onClick={() => {
              setIsProfileModal(false);
            }}
            style={{ color: "#ffffff" }}
          >
            X
          </div>
        }


      >
        <EmployeeListview
          className="Edit"
          showRecord={showRecord}
          setIsProfileModal={setIsProfileModal}
          getData={getData}
          certificationDetails={certificationDetails}



        />
      </Modal>
    </Layout>
  );
}

export default EmployeeList;
