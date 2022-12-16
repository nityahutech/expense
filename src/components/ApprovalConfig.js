import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  Card,
  Input,
  Select,
  Modal,
  Form,
  Row,
  Col,
} from "antd";
import { EditOutlined, SearchOutlined } from "@ant-design/icons";
import "../style/leave.css";
import { getUsers } from "../contexts/CreateContext";
import ConfigureContext from "../contexts/ConfigureContext";
import EmpInfoContext from "../contexts/EmpInfoContext";

const { Option } = Select;

const ApprovalConfig = () => {
  const [empData, setEmpData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [filterEmployees, setFilterEmployees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [value, setValue] = useState("");
  const [designations, setDesignations] = useState([]);
  const [editEmployeeDetails, setEditEmployeesDetails] = useState([]);
  const [numApprovers, setNumApprovers] = useState(1);
  const [listApprovers, setListApprovers] = useState([null, null, null]);
  const [size, setSize] = useState("middle");

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    let d = await getUsers();
    let temp = await ConfigureContext.getConfigurations("addemployeePage");
    let data = d.docs.map((doc, i) => {
      return {
        key: 1 + i,
        id: doc.id,
        empcode: doc.data().empId,
        name: doc.data().name,
        designation: doc.data().designation,
        approveNo: doc.data()?.approveNo || 1,
        approveList: i ==2 ? ["HR", "Reporting Manager", "Project Manager"] : ["HR"],
        // approveList: doc.data()?.approveList || "HR",
      }
    })
    let des = temp?.designations.map((d) => Object.keys(d)[0])
    console.log(data, des)
    setEmpData(data)
    setFilterEmployees(data)
    setDesignations(des)
  }

  const onSelectChange = (newSelectedRowKeys, data) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    console.log("data:: ", data);
    setSelectedRowKeys(newSelectedRowKeys);
    setEditEmployeesDetails(data);
  };

  console.log(editEmployeeDetails);
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const columns = [
    {
      title: "Employee Code",
      dataIndex: "empcode",
      key: "empcode",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
    },
    {
      title: "No. of Approvers",
      dataIndex: "approveNo",
      key: "approveNo",
    },
    {
      title: "List of Approvers",
      dataIndex: "approveList",
      key: "approveList",
      render: (data) => {
        return (
          <>
            {data.map((d) => {
              return (<div>{d}</div>)
            })}
          </>
        )
      }
    },
  ];

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedRowKeys([]);
    setEditEmployeesDetails([])
    form.resetFields();
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
    setNumApprovers(Number(value));
  };

  const handleDesignation = (i, value) => {
    console.log(`${i} selected ${value}`);
    let temp = [...listApprovers];
    temp[i] = value;
    setListApprovers(temp)
  };

  useEffect(() => {
    const names = editEmployeeDetails.map((detail) => detail.name);
    form.setFieldValue("selectemp", names);
  }, [form, editEmployeeDetails]);
  console.log("numApprovers:: ", numApprovers);

  const hasSelected = selectedRowKeys.length > 0;

  const onSearch = (value) => {
    console.log("search:", value);
  };

  const changeApprovers = (values) => {
    console.log(values)
    values.selectemp.forEach((emp, i) => {
      let record = {
        approveNo: values.approversNum,
        approveList: [...listApprovers].slice(0, values.approversNum)
      }
      EmpInfoContext.updateEduDetails(editEmployeeDetails[i].id, record)
    })
    // setIsModalOpen(false)
  }

  return (
    <>
      <Card
        title={
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={5} lg={5} xl={5} xxl={5}>
              <Input
                className="searchBar"
                style={{marginLeft:"10px"}}
                placeholder="Search"
                prefix={<SearchOutlined />}
                onChange={(e) => {
                  const search = e.target.value;
                  setValue(search);
                  const filteredData = empData.filter((emp) =>
                    emp.name.toLowerCase().includes(search.toLowerCase())
                  );
                  setFilterEmployees(filteredData);
                }}
              />
            </Col>
            <Col xs={24} sm={24} md={5} lg={5} xl={5} xxl={5}>
              <Select
                className="selectOption"
                allowClear
                // defaultValue="Trainee"
                placeholder="Designation"
                style={{ marginLeft: "10px" }}
                onChange={(e) => {
                  // const select = u.target.value;
                  // setValue(select);
                  const selectedData = empData.filter((emp) =>
                    emp.designation.includes(e)
                  );
                  setFilterEmployees(selectedData);
                  console.log(selectedData);
                }}
                showSearch
                onSearch={onSearch}
              >
                {designations?.map((des) => {
                  console.log(des)
                    return (
                      <Option value={des}>{des}</Option>
                    )
                  })
                }
              </Select>
            </Col>
          </Row>
        }
        extra={
          <>
            <div style={{ display: "flex" }}>
              <Button
                onClick={() => {
                  showModal();

                  console.log(selectedRowKeys);
                }}
                // type="primary"
                disabled={!hasSelected}
                style={{ marginLeft: "10px", border: "none" }}
              >
                <EditOutlined />
              </Button>
            </div>
          </>
        }
        style={{ borderRadius: "10px" }}
      >
        <div
          className="approvalConfig"
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={filterEmployees}
            pagination={false}
          />
        </div>
      </Card>

      <Modal open={isModalOpen} onOk={form.submit()} onCancel={handleCancel}>
        <Form
          form={form}
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          autoComplete="off"
          layout="vertical"
          onFinish={changeApprovers}
        >
          <Form.Item
            initialValue={[]}
            label="Selected Employees"
            name="selectemp"
          >
            <Select
              mode="multiple"
              size={size}
              placeholder="Please select"
              // defaultValue={selectedNames}
              // onChange={handleChange}
              style={{
                width: "100%",
              }}
              options={[]}
            />
          </Form.Item>
          <Form.Item
            initialValue={numApprovers}
            label="Number of Approvers"
            name="approversNum"
          >
            <Select
              onChange={handleChange}
              options={[
                {
                  value: "1",
                  label: "1",
                },
                {
                  value: "2",
                  label: "2",
                },

                {
                  value: "3",
                  label: "3",
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            // initialValue={listApprovers}
            label="Approvers"
            name="approvers"
          >
            <Row gutter={[24, 8]}>
              <Col xs={24} sm={22} md={8}>
                <Select
                  onChange={(e) => handleDesignation(0, e)}
                  options={[
                    {
                      value: "HR",
                      label: "HR",
                    },
                    {
                      value: "Team Lead",
                      label: "Team Lead",
                    },

                    {
                      value: "Project Manager",
                      label: "Project Manager",
                    },
                    {
                      value: "Reporting Manager",
                      label: "Reporting Manager",
                    },
                  ]}
                />
              </Col>

              <Col xs={24} sm={22} md={8}>
                <Select
                  disabled={numApprovers === 1}
                  onChange={(e) => handleDesignation(1, e)}
                  options={[
                    {
                      value: "HR",
                      label: "HR",
                    },
                    {
                      value: "Team Lead",
                      label: "Team Lead",
                    },

                    {
                      value: "Project Manager",
                      label: "Project Manager",
                    },
                    {
                      value: "Reporting Manager",
                      label: "Reporting Manager",
                    },
                  ]}
                />
              </Col>
              <Col xs={24} sm={22} md={8}>
                <Select
                  disabled={numApprovers !== 3}
                  onChange={(e) => handleDesignation(2, e)}
                  options={[
                    {
                      value: "HR",
                      label: "HR",
                    },
                    {
                      value: "Team Lead",
                      label: "Team Lead",
                    },

                    {
                      value: "Project Manager",
                      label: "Project Manager",
                    },
                    {
                      value: "Reporting Manager",
                      label: "Reporting Manager",
                    },
                  ]}
                />
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ApprovalConfig;
