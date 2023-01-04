import {
  Table,
  Button,
  Modal,
  Layout,
  Row,
  Col,
  Input,
  Form,
  Select,
} from "antd";
import {
  EditFilled,
  SearchOutlined,
  DeleteFilled,
  EyeFilled,
} from "@ant-design/icons";
import Editemployee from "./Editemployee";
import { useEffect, useState } from "react";
import { getUsers, showNotification } from "../contexts/CreateContext";
import "../style/EmployeeList.css";
import EmpInfoContext from "../contexts/EmpInfoContext";
import EmployeeListview from "./EmployeeListview";
import ConfigureContext from "../contexts/ConfigureContext";
const { Option } = Select;

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
  const [data, setData] = useState([]);
  const [disableItems, setDisableItems] = useState([]);
  const [designations, setDesignations] = useState([]);
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
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      fixed: "right",
      align: "center",
      width: 80,
      render: (_, record) => {
        return (
          record.disabled === false && (
            <>
              <div
                className="employee-button"
                style={{ display: "flex", flexDirection: "row" }}
              >
                <Button
                  type="link"
                  className="show"
                  // style={{ width: "40px" }}
                  onClick={() => {
                    setIsProfileModal(true);
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
    setshowRecord(record);
    setCertificationDetails(record);
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
        disabled: doc.data().disabled ? true : false,
      };
    });
    console.log(d, "dataaaaaa");

    ConfigureContext.getConfigurations("addemployeePage").then((res) => {
      setDesignations(Object.keys(res.designations))
      console.log(Object.keys(res.designations))
    })
    let disabled = d.filter((emp) => emp.disabled);
    console.log("ddddd", disabled);

    setData(d);
    setFilterEmployees(d);
    setAllEmployees(d);
    setCertificationDetails(d);
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
    Modal.confirm({
      title: `Are you sure, you want to deactivate ${data[idx].name}?`,
      okText: "Yes",
      okType: "danger",

      onOk: () => {
        EmpInfoContext.disablePerson(data[idx].id).then((res) => {
          showNotification(
            "success",
            "Success",
            `Successfully deactivated ${data[idx].name}`
          );
          getData();
        });
      },
    });
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
        <Col>
          <Select
            className="selectOption"
            allowClear
            placeholder="Select Designation"
            style={{ marginLeft: "10px", width: "200px" }}
            onChange={(e) => {
              const selectedData = data.filter((emp) =>
                emp.designation.includes(e)
              );
              setFilterEmployees(selectedData.length == 0 ? allEmployees : selectedData);
              console.log(selectedData.length == 0 ? allEmployees : selectedData);
            }}
            showSearch
          >
            {designations?.map((des) => {
              return <Option value={des}>{des}</Option>;
            })}
          </Select>
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
          des={designations}
        />
      </Modal>

      <Modal
        className="editEmployee"
        bodyStyle={{
          height: 440,
          overflowY: "scroll",
          overflowX: "hidden",
          backgroundColor: "#d0d0d0",
          marginLeft: "0px",
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
