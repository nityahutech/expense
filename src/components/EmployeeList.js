import { Table, Button, Modal, Row, Col, Input, Select, Tabs, Tooltip } from "antd";
import {
  EditFilled,
  SearchOutlined,
  DeleteFilled,
  EyeFilled,
} from "@ant-design/icons";

import Papa from "papaparse";
import Editemployee from "./Editemployee";
import { useEffect, useState } from "react";
import { getUsers, showNotification } from "../contexts/CreateContext";
import "../style/EmployeeList.css";
import EmpInfoContext from "../contexts/EmpInfoContext";
import EmployeeListview from "./EmployeeListview";
import ConfigureContext from "../contexts/ConfigureContext";
import EmpFieldDownload from "./EmpFieldDownload";
import PaySlip from "./ProfileDetails/PaySlip";

const { Option } = Select;

function EmployeeList() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editedRecord, setEditedRecord] = useState(null);
  const [showRecord, setshowRecord] = useState([]);
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState(window.innerWidth <= 768 ? "" : "left");
  const [filterEmployees, setFilterEmployees] = useState([]);
  const [data, setData] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [selectemp, setSelectemp] = useState({ id: "" });
  const [activetab, setActivetab] = useState("1");
  const [showDownloadModal, setShowDownloadModal] = useState(false);

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
      width: 120,
      render: (_, record) => {
        return (
          record.disabled === false && (
            <>
              <div
                className="employee-button"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <Tooltip placement="bottom" title='View Profile'>
                  <Button
                    type="link"
                    className="show"
                    // style={{ width: "40px" }}
                    onClick={() => {
                      // showViewModal(record);
                      setshowRecord(record)
                      setSelectemp({ id: record.id }); // set selectemp.id to the employee's id
                      setActivetab("2");
                    }}
                  >
                    {<EyeFilled />}
                  </Button>
                </Tooltip>
                <Tooltip placement="bottom" title='Edit Profile'>
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
                </Tooltip>
                <Tooltip placement="bottom" title='Disable Account'>
                  <Button
                    type="link"
                    className="deleTe"
                    onClick={(e) => {
                      onDelete(record.sn - 1, e);
                    }}
                  >
                    <DeleteFilled />
                  </Button>
                </Tooltip>
                {/* <Tooltip placement="bottom" title='Salary'>
                  <Button
                    type="link"
                    style={{ padding: "0px" }}
                    onClick={(e) => {
                      setshowRecord(record)
                      setSelectemp({ id: record.id }); // set selectemp.id to the employee's id
                      setActivetab("3");
                    }}
                  >
                    <AlipayCircleOutlined style={{ color: "green" }} />
                  </Button>
                </Tooltip> */}
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

  const handleEditEmployee = (record) => {
    setEditedRecord(record);
  };

  async function getData() {
    setLoading(true);
    const allData = await getUsers();
    let d = allData.docs.map((doc, i) => {
      return {
        ...doc.data(),
        id: doc.id,
        sn: i + 1,
      };
    });

    ConfigureContext.getConfigurations("addemployeePage").then((res) => {
      setDesignations(Object.keys(res.designations));
    });
    setData(d);
    setFilterEmployees(d);
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
          ex?.empId?.toLowerCase()?.includes(search?.toLowerCase()) ||
          ex.gender?.toLowerCase() == search
      );
      const modifiedFilterExpense = [...result];
      setFilterEmployees(modifiedFilterExpense);
    } else {
      setFilterEmployees(data);
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

  const downloadCSV = (downloadFields) => {
    if (downloadFields == []) {
      return;
    }
    let csvData = data.map((emp) => [
      emp.empId,
      emp.name,
      emp.mailid,
      emp.phonenumber,
    ]);
    let fields = ["Employee ID", "Name", "Official Email ID", "Phone Number"];
    if (downloadFields.includes("Basic Information")) {
      data.forEach((emp, i) => {
        csvData[i] = [
          ...csvData[i],
          emp.contactEmail,
          emp.gender,
          emp.dob,
          emp.altPhnNo,
          emp.currentAdd,
          emp.houseType,
          emp.permanentAdd,
          emp.scrs,
          emp.lccs,
          emp.maritalStatus,
          emp.bloodGroup,
          emp.profilePic,
        ];
      });
      fields.push(
        "Contact Email ID",
        "Gender",
        "Date of Birth",
        "Alternate Phone Number",
        "Current Address",
        "House Type",
        "Permanent Address",
        "Staying at Current Residence Since",
        "living in Current City Since",
        "Marital Status",
        "Blood Group",
        "Profile Picture"
      );
    }
    if (downloadFields.includes("Work Information")) {
      data.forEach((emp, i) => {
        csvData[i] = [
          ...csvData[i],
          emp.designation,
          emp.doj,
          emp.empType,
          emp.workLocation,
          emp.businessUnit,
          emp.division,
          emp.department,
          emp.team,
          emp.repManager,
          emp.secManager,
          emp.lead,
        ];
      });
      fields.push(
        "Designation",
        "Date of Joining",
        "Employee Type",
        "Work Location",
        "Business Unit",
        "Division",
        "Department",
        "Team",
        "Reporting Manager",
        "Secondary Manager",
        "Lead"
      );
    }
    if (downloadFields.includes("Family Information")) {
      data.forEach((emp, i) => {
        csvData[i] = [
          ...csvData[i],
          emp.father,
          emp.fatherContact,
          emp.mother,
          emp.motherContact,
          emp.other,
          emp.relation,
          emp.otherContact,
        ];
      });
      fields.push(
        "Father",
        "Father Contact",
        "Mother",
        "Mother Contact",
        "Other",
        "Relation",
        "Other Contact"
      );
    }
    if (downloadFields.includes("Education Information")) {
      data.forEach((emp, i) => {
        csvData[i] = [
          ...csvData[i],
          emp.qualificationType,
          emp.courseName,
          emp.courseType,
          emp.stream,
          emp.courseStartDate,
          emp.courseEndDate,
          emp.universityName,
        ];
      });
      fields.push(
        "Qualification Type",
        "Course Name",
        "Course Type",
        "Stream",
        "Course Start Date",
        "Course End Date",
        "University Name"
      );
    }
    if (downloadFields.includes("Bank Information")) {
      data.forEach((emp, i) => {
        let banks = emp.bank?.filter(
          (bankAcc) => bankAcc.accountType == "Salary Account"
        );
        let acc = emp.bank?.indexOf(banks[0]) || 0;
        if (!emp.bank || banks.length == 0) {
          csvData[i] = [
            ...csvData[i],
            emp.bank,
            emp.bank,
            emp.bank,
            emp.bank,
            emp.bank,
            emp.upiId,
          ];
          return;
        }
        csvData[i] = [
          ...csvData[i],
          emp.bank[acc].bankName,
          emp.bank[acc].city,
          emp.bank[acc].branch,
          emp.bank[acc].ifsc,
          emp.bank[acc].accountNo,
          emp.upiId,
        ];
      });
      fields.push(
        "Bank Name",
        "City",
        "Branch",
        "IFSC Code",
        "Account Number",
        "UPI ID"
      );
    }
    if (downloadFields.includes("Certificate")) {
      data.forEach((emp, i) => {
        csvData[i] = [
          ...csvData[i],
          emp.qualificationType,
          emp.courseName,
          emp.courseType,
          emp.stream,
          emp.courseStartDate,
          emp.courseEndDate,
          emp.universityName,
        ];
      });
      fields.push(
        "Qualification Type",
        "Course Name",
        "Course Type",
        "Stream",
        "Course Start Date",
        "Course End Date",
        "University Name"
      );
    }
    if (downloadFields.includes("Identification Document")) {
      data.forEach((emp, i) => {
        csvData[i] = [
          ...csvData[i],
          emp.qualificationType,
          emp.courseName,
          emp.courseType,
          emp.stream,
          emp.courseStartDate,
          emp.courseEndDate,
          emp.universityName,
        ];
      });
      fields.push(
        "Qualification Type",
        "Course Name",
        "Course Type",
        "Stream",
        "Course Start Date",
        "Course End Date",
        "University Name"
      );
    }
    const csv = Papa.unparse([fields, ...csvData]);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", "empInformation.csv");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <>
      <div className="hrtab" style={{ minHeight: "100vh" }}>
        <Tabs
          defaultActiveKey={activetab}
          activeKey={activetab}
          className="Tabs"
          onChange={(tabKey) => {
            setActivetab(tabKey);
            if (tabKey == 1) {
              setSelectemp({ id: "" });
            }
          }}
        >
          <Tabs.TabPane tab="Employee List" key="1">
            <div
              style={{
                width: "100%",
                padding: "10px",
                backgroundColor: "white",
                marginBottom: "15px",
              }}
            >
              <Row gutter={[16, 16]}>
                <Col xs={24} xm={24} md={8} lg={4}>
                  <Button
                    style={{ width: "100%" }}
                    type="default"
                    onClick={() => setShowDownloadModal(true)}
                  >
                    Download
                  </Button>
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
                    style={{ width: "100%" }}
                    // className="empList"
                    allowClear
                    placeholder="Select Designation"
                    // style={{ marginLeft: "10px", width: "200px" }}
                    onChange={(e) => {
                      const selectedData = data.filter((emp) =>
                        emp.designation.includes(e)
                      );
                      setFilterEmployees(
                        selectedData.length == 0 ? data : selectedData
                      );
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
            // rowClassName={(record) => record.disabled && "disabled-row"}
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
              getData={getData}
            />
          </Tabs.TabPane>
          {/* <Tabs.TabPane
            tab="Employee Pay Slip"
            disabled={!selectemp.id}
            key="3"
          >
            <PaySlip
              className="Edit"
              showRecord={showRecord}
              getData={getData}
            // certificationDetails={certificationDetails}
            />
          </Tabs.TabPane> */}
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
          open={showDownloadModal}
          visible={showDownloadModal}
          footer={null}
          // afterClose={getData}
          closeIcon={
            <div
              onClick={() => setShowDownloadModal(false)}
              style={{ color: "#ffffff" }}
            >
              X
            </div>
          }
        >
          <EmpFieldDownload
            setShowDownloadModal={setShowDownloadModal}
            downloadCSV={downloadCSV}
          />
        </Modal>
      </div>
    </>
  );
}

export default EmployeeList;
