import React from "react";
import ReactDOM from "react-dom";
import {
  Carousel,
  Form,
  Switch,
  Select,
  Button,
  Table,
  Row,
  Col,
  Input,
} from "antd";
import "antd/dist/antd.css";
import {
  LeftCircleOutlined,
  RightCircleOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";

import { useState } from "react";

import "../../style/HrPaySlip.css";

const styleDefaults = {
  height: "160px",
  color: "black",
  fontSize: 40,
  textAlign: "center",
  padding: "3rem",
};

const data = [
  {
    key: "1",
    id: "HTS0001 ",
    empname: "Kiran",
    structure: "Monthly",
    unit: "Annual CTC",
    ctc: 0.0,
    overtime: 0,
    action: "",
  },
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Dropdown = [
  "Gratuity",
  "Phone Reimbursment",
  "Vehicle Allowance",
  "Medical Allowance",
  "Leave Travel Allowance",
  "Conveyance Allowance",
];

// const contentStyle = {
//   height: "160px",
//   color: "black",
//   lineHeight: "160px",
//   textAlign: "center",
//   background: "gray",
// };
const data1 = [
  {
    key: "1",
    salary: "Basic ",
    calc: "CTC * .4",
  },
  {
    key: "2",
    salary: "HRA ",
    calc: "Basic * .4",
  },
  {
    key: "3",
    salary: "PF Employer ",
    calc: "System Calculated",
  },
  {
    key: "4",
    salary: "ESI Employer ",
    calc: "System Calculated",
  },
  {
    key: "5",
    salary: "Special Allowance ",
    calc: "Balancing Amount of CTC",
  },
];
function HrPaySlip() {
  //   const [dotPosition, setDotPosition] = useState("top");
  const [componentSize, setComponentSize] = useState("default");
  const [selectionType, setSelectionType] = useState("checkbox");
  const [showComponent, setShowComponent] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState([]);
  const [form] = Form.useForm();

  const [rows, setRows] = useState(data1);
  const [componentValues, setComponentValues] = useState({});

  const carouselRef = React.createRef();

  const handleInputChange = (key, e) => {
    const data = {
      ...componentValues,
      [key]: e.target.value,
    };
    console.log("data:: ", data);
    setComponentValues(data);
  };

  console.log("componentValues:: ", componentValues);

  const handleChange = (value) => {
    console.log(componentValues);
    let temp = [...selectedComponent];
    temp.push(value);
    setSelectedComponent(temp);
    temp = [];
    temp = [...rows];
    temp.push({
      key: value,
      salary: value,
    });

    setRows(temp);
    setShowComponent(false);
  };
  function Component1() {
    return (
      <Form.Item>
        <Select
          className="dropDown"
          placeholder="Select Component"
          onSelect={handleChange}
        >
          {Dropdown.map(
            (D, i) =>
              !selectedComponent.includes(D) && (
                <Select.Option key={`component_${i}`} value={D}>
                  {D}
                </Select.Option>
              )
          )}
        </Select>
      </Form.Item>
    );
  }

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const onChange = (value) => {
    console.log("changed", value);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      fixed: "left",
      width: 110,
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Employee Name",
      dataIndex: "empname",
      key: "empname",
      fixed: "left",
      width: 200,
    },
    {
      title: "Structure",
      dataIndex: "structure",
      key: "structure",
      width: 150,
    },
    {
      title: "Units",
      dataIndex: "unit",
      key: "unit",
      width: 150,
    },
    {
      title: "CTC/Wage Range",
      dataIndex: "ctc",
      key: "ctc",
      width: 210,
    },
    {
      title: "Overtime (Rate/hour)",
      dataIndex: "overtime",
      key: "overtime",
      width: 130,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: 120,
      fixed: "right",
      render: (_, record) => {
        return (
          <>
            <Button
              style={{ padding: 0 }}
              type="link"
              className="edIt"
              //   onClick={() => {
              //     handleEditEmployee(record);
              //     showModal(record);
              //   }}
            >
              {<EditOutlined />}
            </Button>
          </>
        );
        // );
      },
    },
  ];

  const columns1 = [
    {
      title: "Salary Component",
      dataIndex: "salary",
      key: "salary",

      render: (text) => <a>{text}</a>,
    },
    {
      title: "Calculation (Annual)",
      dataIndex: "calc",
      key: "calc",
      render: (d, record) => {
        return Dropdown.includes(record.key) ? (
          <Input onChange={(e) => handleInputChange(record.key, e)}></Input>
        ) : (
          d
        );
        // );
      },
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };
  //   console.log(Carousel);

  const onReset = () => {
    form.resetFields();
  };

  return (
    <div>
      <Carousel
        arrows
        prevArrow={<LeftCircleOutlined />}
        nextArrow={<RightCircleOutlined />}
        ref={carouselRef}
      >
        <div>
          <h3
            className="Background"
            style={{
              ...styleDefaults,
            }}
          >
            Payroll Setup Wizard
          </h3>
          <div className="Payroll">
            <h1>Payroll Setting</h1>
            <Form
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 5,
              }}
              layout="horizontal"
              initialValues={{
                size: componentSize,
              }}
              onValuesChange={onFormLayoutChange}
              size={componentSize}
            >
              <Form.Item
                label="When do you want to use Hutech’s Payroll from?"
                rules={[
                  {
                    required: true,
                    message: "Please Select Month ",
                  },
                ]}
              >
                <Select className="SelectLabel">
                  <Select.Option value="Select Month">
                    Select Month
                  </Select.Option>
                  {months.map((m) => (
                    <Select.Option value={m}>{m}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Pay Scale">
                <div style={{ marginLeft: "37px" }}>
                  <span>From</span>
                  <select style={{ marginLeft: "10px", border: "none" }}>
                    {[...Array(31).keys()].map((d) =>
                      d > 0 ? <option value={d}>{d}</option> : null
                    )}
                  </select>
                  <span style={{ marginLeft: "10px" }}>To</span>
                  <span style={{ marginLeft: "10px" }}>31</span>
                </div>
              </Form.Item>
              <Form.Item
                label="Does your company have PF?"
                valuePropName="checked"
              >
                <Switch
                  className="SelectLabel"
                  checkedChildren="Yes"
                  unCheckedChildren="No"
                  defaultChecked
                />
              </Form.Item>
              <Form.Item
                label="Employee Contribution"
                rules={[
                  {
                    required: true,
                    message: "Please Select Required Field ",
                  },
                ]}
              >
                <Select className="SelectLabel">
                  <Select.Option value="Select Type">Select Type</Select.Option>
                  <Select.Option value="Basic*12%">Basic*12%</Select.Option>
                  <Select.Option value="(Basic + Special Allowance)* 12%">
                    (Basic + Special Allowance)* 12%
                  </Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="PF Ceiling at Rs. 15000"
                valuePropName="checked"
              >
                <Switch
                  className="SelectLabel"
                  checkedChildren="Yes"
                  unCheckedChildren="No"
                  defaultChecked
                />
              </Form.Item>
              <Form.Item
                label="Does your company have ESI?"
                valuePropName="checked"
              >
                <Switch
                  className="SelectLabel"
                  checkedChildren="Yes"
                  unCheckedChildren="No"
                  defaultChecked
                />
              </Form.Item>
              <Form.Item
                label="Do you deduct Professional Tax?"
                valuePropName="checked"
              >
                <Switch
                  className="SelectLabel"
                  checkedChildren="Yes"
                  unCheckedChildren="No"
                  defaultChecked
                />
              </Form.Item>
              <div>
                <Button
                  style={{
                    background: "#1890ff",
                    color: "white",
                    float: "right",
                    bottom: "35px",
                    right: "6rem",
                    width: "100px",
                    marginBottom: "20px",
                    borderRadius: "5px",
                  }}
                  htmlType="submit"
                  onClick={() => {
                    carouselRef.current.next();
                  }}
                >
                  Next
                </Button>
              </div>
            </Form>
          </div>
        </div>
        <div>
          <h3 className="Background" style={{ ...styleDefaults }}>
            Payroll Setup Wizard
          </h3>
          <div className="Second">
            <div className="innerTable">
              <Row>
                <Col>
                  <Input
                    placeholder="Search"
                    prefix={<SearchOutlined />}
                    style={{ marginLeft: "12px" }}
                    //   onChange={searchChange}
                  />
                </Col>
              </Row>

              <Table
                rowSelection={{
                  type: selectionType,
                  ...rowSelection,
                }}
                columns={columns}
                dataSource={data}
                pagination={{
                  position: ["bottomCenter"],
                }}
                scroll={{ x: 1300 }}
                size="small"
              />
            </div>
            <div>
              <Button
                style={{
                  background: "#1890ff",
                  color: "white",
                  float: "right",
                  right: "1.5rem",
                  width: "100px",
                  borderRadius: "5px",
                  bottom: "12px",
                }}
                onClick={() => {
                  carouselRef.current.next();
                }}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
        <div>
          <h3 className="Background" style={{ ...styleDefaults }}>
            Payroll Setup Wizard
          </h3>
          <div className="Third">
            <div>
              <h1 style={{ marginLeft: "11px" }}>Salary Structure</h1>
            </div>
            <div>
              <Table
                className="Structure"
                columns={columns1}
                dataSource={rows}
                pagination={false}
              />
            </div>
            <div>
              {showComponent ? (
                <Component1 />
              ) : (
                <Button
                  style={{
                    color: "#1890ff",
                    fontWeight: "Bold",
                    border: "none",
                    marginTop: "16px",
                  }}
                  onClick={(e) => setShowComponent(true)}
                >
                  + Add Another Salary Component
                </Button>
              )}
            </div>
            <div>
              <Button
                style={{
                  background: "#1890ff",
                  color: "white",
                  float: "right",
                  right: "6.5rem",
                  width: "100px",
                  borderRadius: "5px",
                  bottom: "18px",
                }}
                form={form}
                onClick={(e) => {
                  onReset();
                  console.log(componentValues);
                  carouselRef.current.next();
                }}
              >
                Finish
              </Button>
            </div>
          </div>
        </div>
        {/* <div>
          <h3 style={{ ...styleDefaults }}>Payroll Setup Wizard</h3>
        </div> */}
      </Carousel>
    </div>
  );
}

export default HrPaySlip;
