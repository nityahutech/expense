import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  Card,
  Input,
  Select,
  Modal,
  Form,
  Option,
  Row,
  Col,
} from "antd";
import { EditOutlined, SearchOutlined } from "@ant-design/icons";
import "../style/leave.css";

const { Search } = Input;
const empData = [
  {
    key: 1,
    empcode: 32,
    name: "saswat",
    designation: "Trainee Software Developer",
    Approvers: 2,
    listApprovers: "HR",
  },
  {
    key: 2,
    empcode: 32,
    name: "Rahul",
    designation: "Software Developer L1",
    Approvers: 2,
    listApprovers: "HR",
  },
];

const ApprovalConfig = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [filterEmployees, setFilterEmployees] = useState(empData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [value, setValue] = useState("");
  const [editEmployeeDetails, setEditEmployeesDetails] = useState([]);
  const [numApprovers, setNumApprovers] = useState(1);
  const [size, setSize] = useState("middle");

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
      dataIndex: "Approvers",
      rowSpan: 2,
      key: "Approvers",
    },
    {
      title: "List of Approvers",
      dataIndex: "listApprovers",
      rowSpan: 2,
      key: "listApprovers",
    },
  ];

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedRowKeys([]);
    form.resetFields();
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
    setNumApprovers(Number(value));
  };

  const handleFirstDesignation = (value) => {
    console.log(`selected ${value}`);
    // setNumApprovers(numApprovers);
  };

  const handleSecondDesignation = (value) => {
    console.log(`selected ${value}`);
  };
  // console.log(numApprovers);

  const handleThirdDesignation = (value) => {
    console.log(`selected ${value}`);
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

  return (
    <>
      <Card
        title={
          <Row gutter={[24, 8]}>
            <Col xs={24} sm={22} md={5}>
              <Input
                className="searchBar"
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
            <Col xs={24} sm={22} md={5}>
              <Select
                className="selectOption"
                // defaultValue="Trainee"
                placeholder="Filter by Name"
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
                options={[
                  {
                    value: "Trainee",
                    label: "Trainee",
                  },
                  {
                    value: "Trainee Software Developer",
                    label: "Trainee Software Developer",
                  },
                  {
                    value: "Junior Software Developer",
                    label: "Junior Software Developer",
                  },
                ]}
              />
            </Col>
            <Col xs={24} sm={22} md={14}></Col>
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
                  onChange={handleFirstDesignation}
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
                  onChange={handleSecondDesignation}
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
                  onChange={handleThirdDesignation}
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
