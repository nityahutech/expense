import React, { useState } from "react";
import {
  Carousel,
  Form,
  Modal,
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

const emp = [
  "Jatin",
  "Saswat",
  "Pardeep",

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
  const [form1] = Form.useForm();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const role = sessionStorage.getItem("role");
  const currentUser = JSON.parse(sessionStorage.getItem("user"))
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
    setComponentValues(data);
  };

  const onFinishEditPayroll = (values) => {
    console.log(values)
    setIsEditModalOpen(false);

  }

  const handleChange = (value) => {
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


  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      fixed: "left",
      width: 110,
      align: 'left',
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Employee Name",
      dataIndex: "empname",
      key: "empname",
      fixed: "left",
      align: 'left',
      width: 150,
    },
    {
      title: "Structure",
      dataIndex: "structure",
      key: "structure",
      align: 'left',
      width: 150,
    },
    {
      title: "Units",
      dataIndex: "unit",
      key: "unit",
      align: 'left',
      width: 150,
    },
    {
      title: "CTC/Wage Range",
      dataIndex: "ctc",
      key: "ctc",
      align: 'left',
      width: 210,
    },
    {
      title: "Overtime (Rate/hour)",
      dataIndex: "overtime",
      key: "overtime",
      align: 'left',
      width: 130,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: 120,
      fixed: "right",
      align: 'left',
      render: (_, record) => {
        return (
          <>
            <Button
              style={{ padding: 0 }}
              type="link"
              className="edIt"
              onClick={() => {
                // handleEditEmployee(record);
                setIsEditModalOpen(record);
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

  const columns1 = [
    {
      title: "Salary Component",
      dataIndex: "salary",
      key: "salary",
      align: 'left',

      render: (text) => <a>{text}</a>,
    },
    {
      title: "Calculation (Annual)",
      dataIndex: "calc",
      key: "calc",
      align: 'left',
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
      // console.log(
      //   `selectedRowKeys: ${selectedRowKeys}`,
      //   "selectedRows: ",
      //   selectedRows
      // );
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      name: record.name,
    }),
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = (values) => {
    console.log('value', values)

  }

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
              form={form}
              labelCol={{
                span: 14,
              }}
              wrapperCol={{
                span: 24,
              }}
              layout="vertical"
              initialValues={{
                remember: true,
              }}
              autoComplete="off"
              onFinish={onFinish}
            >
              <Row gutter={[48, 0]} type="flex" align="center" style={{ border: '2px solid grey', padding: '10px', borderRadius: '10px' }}>
                <Col xs={24} sm={12} md={12} lg={12}  >
                  <Form.Item
                    label="Select Staff"
                    name='selectStaff'
                    rules={[
                      {
                        // required: true,
                        message: "Please Select Staff ",
                      },
                    ]}
                  >
                    <Select className="l"
                      style={{
                        border: "1px solid #8692A6",
                        borderRadius: "4px",
                      }}
                      bordered={false}
                    >
                      <Select.Option value="Select Staff">
                        Select Employee
                      </Select.Option>
                      {emp.map((m) => (
                        <Select.Option value={m}>{m}</Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={12} lg={12}>
                  <Form.Item
                    name="netSalary"
                    label="Net Salary"

                  >
                    <Input
                      maxLength={20}

                      // required
                      placeholder="Enter Net Salary"
                      style={{
                        border: "1px solid #8692A6",
                        borderRadius: "4px",
                      }}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <h2> Earnings</h2>
              <Row gutter={[48, 0]} style={{ border: '2px solid grey', padding: '10px', borderRadius: '10px' }} >
                <Col xs={24} sm={12} md={8} lg={8}  >
                  <Form.Item
                    name="basic"
                    label="Basic"

                  >
                    <Input
                      maxLength={20}

                      // required
                      placeholder="Enter Basic Salary"
                      style={{
                        border: "1px solid #8692A6",
                        borderRadius: "4px",
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8} lg={8}>
                  <Form.Item
                    name="da"
                    label="DA(40%)"

                  >
                    <Input
                      maxLength={20}
                      placeholder=""
                      style={{
                        border: "1px solid #8692A6",
                        borderRadius: "4px",
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8} lg={8}  >
                  <Form.Item
                    name="hra"
                    label="HRA(15%)"

                  >
                    <Input
                      maxLength={20}
                      placeholder=""
                      style={{
                        border: "1px solid #8692A6",
                        borderRadius: "4px",
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8} lg={8}>
                  <Form.Item
                    name="conveyance"
                    label="Conveyance"

                  >
                    <Input
                      maxLength={20}
                      // required
                      placeholder="Enter Conveyance"
                      style={{
                        border: "1px solid #8692A6",
                        borderRadius: "4px",
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8} lg={8}  >
                  <Form.Item
                    name="allowance"
                    label="Allowance"

                  >
                    <Input
                      maxLength={20}

                      // required
                      placeholder="Enter Allowance"
                      style={{
                        border: "1px solid #8692A6",
                        borderRadius: "4px",
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8} lg={8}>
                  <Form.Item
                    name="medicalAllowance"
                    label="Medical Allowance"

                  >
                    <Input
                      maxLength={20}

                      // required
                      placeholder="Enter Medical Allowance"
                      style={{
                        border: "1px solid #8692A6",
                        borderRadius: "4px",
                      }}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <h2> Deductions</h2>
              <Row gutter={[48, 0]} style={{ border: '2px solid grey', padding: '10px', borderRadius: '10px' }} >
                <Col xs={24} sm={12} md={8} lg={8}  >
                  <Form.Item
                    name="tds"
                    label="TDS"

                  >
                    <Input
                      maxLength={20}

                      // required
                      placeholder="Enter TDS"
                      style={{
                        border: "1px solid #8692A6",
                        borderRadius: "4px",
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8} lg={8}>
                  <Form.Item
                    name="esi"
                    label="ESI"

                  >
                    <Input
                      maxLength={20}

                      // required
                      placeholder="Enter ESI"
                      style={{
                        border: "1px solid #8692A6",
                        borderRadius: "4px",
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8} lg={8}  >
                  <Form.Item
                    name="pf"
                    label="PF"

                  >
                    <Input
                      maxLength={20}

                      // required
                      placeholder="Enter PF"
                      style={{
                        border: "1px solid #8692A6",
                        borderRadius: "4px",
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8} lg={8} >
                  <Form.Item
                    name="leave"
                    label="Leave"

                  >
                    <Input
                      maxLength={20}

                      // required
                      placeholder="Enter Leave"
                      style={{
                        border: "1px solid #8692A6",
                        borderRadius: "4px",
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8} lg={8}   >
                  <Form.Item
                    name="profTax"
                    label="Prof. Tax"

                  >
                    <Input
                      maxLength={20}

                      // required
                      placeholder="Enter Prof. Tax"
                      style={{
                        border: "1px solid #8692A6",
                        borderRadius: "4px",
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8} lg={8} >
                  <Form.Item
                    name="labourWelfare"
                    label="Labour Welfare"

                  >
                    <Input
                      maxLength={20}
                      // required
                      placeholder="Enter Labour Welfare"
                      style={{
                        border: "1px solid #8692A6",
                        borderRadius: "4px",
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "end",
                      marginRight: "94px",
                    }}
                  >
                    <Form.Item>
                      <Button
                        style={{
                          border: "1px solid #1565D8",
                          color: "#1565D8",
                          fontWeight: "600",
                          fontSize: "14px",
                          lineHeight: "17px",
                          width: "99px",
                          marginTop: "25px",
                          cursor: "pointer",
                        }}
                        onClick={onReset}
                      >
                        Reset
                      </Button>
                    </Form.Item>
                    <Form.Item>
                      <Button
                        style={{
                          border: "1px solid #1565D8",
                          background: "#1565D8",
                          color: "#ffffff",
                          fontWeight: "600",
                          fontSize: "14px",
                          lineHeight: "17px",
                          width: "99px",
                          marginTop: "25px",
                          cursor: "pointer",
                          marginLeft: "17px",
                        }}
                        htmlType="submit"
                        onClick={() => {
                          carouselRef.current.next();
                        }}
                      >
                        Next
                      </Button>
                    </Form.Item>

                  </div>
                </Col>
              </Row>

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
                  onReset();
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
            <Modal
              bodyStyle={{ overflowY: "auto", maxHeight: "calc(100vh - 200px)" }}
              className="viewAppraisal"
              centered
              width={500}
              visible={isEditModalOpen}
              footer={null}
              destroyOnClose
              title="Edit Pay Roll"
              closeIcon={
                <div
                  onClick={() => {
                    setIsEditModalOpen(false)

                  }}
                  style={{ color: "#ffffff" }}
                >
                  X
                </div>
              }
            >
              <Row
                className="apply-leave"
                style={{
                  marginTop: "10px",
                }}
              >
                <Col
                  xl={24}
                  lg={24}
                  md={24}
                  sm={24}
                  xs={24}
                  style={{
                    background: "flex",
                    padding: "10px",
                    // width: "400px",
                  }}
                >
                  <Form

                    labelCol={{
                      span: 8,
                    }}
                    wrapperCol={{
                      span: 16,
                    }}
                    initialValues={{
                      remember: true,
                    }}
                    form={form1}
                    onFinish={onFinishEditPayroll}
                  >
                    <Form.Item
                      labelAlign="left"
                      name="range"
                      style={{ marginBottom: "20px" }}
                      label={
                        <label style={{ color: "black", fontWeight: "400" }}>
                          CTC/Wage Range<span style={{ color: "red" }}> *</span>
                        </label>
                      }

                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      labelAlign="left"
                      name="overtime"
                      style={{ marginBottom: "20px" }}
                      label={
                        <label style={{ color: "black", fontWeight: "400" }}>
                          Overtime (Rate/hour)<span style={{ color: "red" }}> *</span>
                        </label>
                      }

                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      style={{ paddingTop: "px" }}
                      wrapperCol={{
                        offset: 8,
                        span: 24,
                      }}
                    >
                      <Button type="primary" htmlType="submit">
                        Submit
                      </Button>
                      <Button
                        htmlType="button"
                        type="default"
                        style={{ marginLeft: "10px" }}
                        onClick={() => {
                          form1.resetFields();
                        }}
                      >
                        Reset
                      </Button>
                    </Form.Item>
                  </Form>
                </Col>
              </Row>
            </Modal>
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
      </Carousel >
    </div >
  );
}

export default HrPaySlip;
