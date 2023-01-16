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
  Tabs
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
import { SELECTION_ALL } from "antd/lib/table/hooks/useSelection";
import EmpFieldDownload from "./EmpFieldDownload";
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
  const [selectemp, setSelectemp] = useState({ id: "" });
  const [activetab, setActivetab] = useState("1");
  const [showDownLoadModal, setShowDownLoadModal] = useState(false)

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
      align: "left",
    },
    {
      title: "First Name",
      dataIndex: "fname",
      key: "fname",
      fixed: "left",
      width: 120,
      fixed: size,
      ellipsis: true,
      align: "left",
    },
    {
      title: "Last Name",
      dataIndex: "lname",
      key: "lname",
      width: 120,
      ellipsis: true,
      align: "left",
    },
    {
      title: "Email",
      dataIndex: "mailid",
      key: "mailid",
      width: 120,
      ellipsis: true,
      align: "left",
    },
    {
      title: "Date of Join",
      dataIndex: "doj",
      key: "doj",
      align: "center",
      width: 100,
      align: "left",
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
                style={{ display: "flex", flexDirection: "row",justifyContent:"center" }}
              >
                <Button
                  type="link"
                  className="show"
                  // style={{ width: "40px" }}
                  onClick={() => {
                    setIsProfileModal(true);
                    showViewModal(record);
                    setActivetab("2");
                  }}
                  onChange={(tabKey) => {
                    setActivetab(tabKey);
                    setSelectemp({ id: "" });
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

    ConfigureContext.getConfigurations("addemployeePage").then((res) => {
      setDesignations(Object.keys(res.designations))
    })
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

  const downLoadMOdal = () => {
    console.log('ddddd')
    setShowDownLoadModal(true)
  }
  const closeCreateEmpModal = () => {
    setShowDownLoadModal(!showDownLoadModal);
    console.log('ddddd')

  };

  return (
    <>
      <div className="hrtab" style={{ minHeight: '100vh' }}>
        <Tabs
          defaultActiveKey={activetab}
          activeKey={activetab}
          className="Tabs"
          onChange={(tabKey) => {
            setActivetab(tabKey);
            setSelectemp({ id: "" });
          }}>

          <Tabs.TabPane tab="Employee List" key="1">
            <div style={{ width: '100%', padding: '10px', backgroundColor: 'white', marginBottom: '15px' }}>
              <Row gutter={[16, 16]}>
                <Col xs={24} xm={24} md={8} lg={4}>
                  <Button style={{ width: '100%' }} type="default" onClick={downLoadMOdal}>DownLoad Information</Button>
                </Col>
                <Col xs={24} xm={24} md={8} lg={4}>
                  <Input
                    // className="empList"
                    placeholder="Search"
                    prefix={<SearchOutlined />}
                    onChange={searchChange}
                  />
                </Col>
                <Col xs={24} xm={24} md={8} lg={4}>
                  <Select
                    style={{ width: '100%' }}
                    // className="empList"
                    allowClear
                    placeholder="Select Designation"
                    // style={{ marginLeft: "10px", width: "200px" }}
                    onChange={(e) => {
                      const selectedData = data.filter((emp) =>
                        emp.designation.includes(e)
                      );
                      setFilterEmployees(selectedData.length == 0 ? allEmployees : selectedData);
                    }}
                    showSearch
                  >
                    {designations?.map((des) => {
                      return <Option value={des}>{des}</Option>;
                    })}
                  </Select>
                </Col>
              </Row>
            </div>
            <Table
              loading={loading}
              columns={columns}
              dataSource={filterEmployees}
              pagination={{
                position: ["bottomCenter"],
              }}
              scroll={{ x: 800 }}
              className="empTable"
              size="small"
              reloadData={getData}
              rowClassName={(record) => record.disabled && "disabled-row"}
            />
            <Modal
              className="editEmployee"
              bodyStyle={{
                height: 550,
                // overflowY: "scroll",
                overflowX: "hidden",
              }}
              width={1000}
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
          </Tabs.TabPane>

          <Tabs.TabPane tab="Employee Pofile" disabled={!selectemp.id} key="2">
            <EmployeeListview
              className="Edit"
              showRecord={showRecord}
              setIsProfileModal={setIsProfileModal}
              getData={getData}
              certificationDetails={certificationDetails}
            />
          </Tabs.TabPane>

        </Tabs>

        <Modal
          className="editEmployee"
          bodyStyle={{
            height: 400,
            // overflowY: "scroll",
            overflowX: "hidden",
          }}
          width={500}
          centered
          title="Select  Field"
          open={showDownLoadModal}
          visible={showDownLoadModal}
          footer={null}
          // afterClose={getData}
          closeIcon={
            <div
              onClick={() => {
                closeCreateEmpModal(false);

              }}
              style={{ color: "#ffffff" }}
            >
              X
            </div>
          }
        >
          <EmpFieldDownload closeCreateEmpModal={closeCreateEmpModal} />

        </Modal>

      </div>
    </>
  );
}

export default EmployeeList;
