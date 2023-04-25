import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Input, notification, Modal } from "antd";
import "antd/dist/antd.css";
import "../../style/HrPaySlip.css";
import EmployeeNetSalary from "../../contexts/EmployeeNetSalary";
import { getUsers } from "../../contexts/CreateContext";
import { AutoComplete } from "antd";
import { checkNumbervalue } from "../../contexts/CreateContext";
import PayRollUpload from "./PayRollUpload";
import PayRollConfigEarning from "./PayRollConfigEarning";
import PayRollConfigDeduction from "./PayRollConfigDeduction";
import moment from "moment";
import ConfigureContext from "../../contexts/ConfigureContext";

function HrPaySlip() {
  const [form] = Form.useForm();
  const [showPreview, setShowPreview] = useState(false);
  const [hra, setHra] = useState(0);
  const [earning, setEarning] = useState(0);
  const [deduction, setDeduction] = useState(0);
  const [netSalary, setNetSalary] = useState("");
  const [allEmpName, setAllEmpName] = useState([]);
  const [emp, setEmp] = useState(null);
  const [options, setOptions] = useState([]);
  const [ids, setIds] = useState([]);
  const [codes, setCodes] = useState([]);
  const requiredFields = ["basic", "selectStaff"];
  const [earningConfig, setEarningConfig] = useState({
    Earning: [],
    Deduction: [],
  });

  const bodyLayout = (type) => {
    let temp = {
      xs: 24,
      sm: 12,
      md: type == "top" ? 6 : 8,
      lg: type == "top" ? 6 : 8,
    };
    if (showPreview) {
      Object.keys(temp).forEach((x) => (temp[x] = 24));
    }
    return temp;
  };

  const formLayout = (type) => {
    let temp = {
      lg: { span: 24, offset: 0 },
      md: { span: 24, offset: 0 },
      sm: { span: 24, offset: 0 },
    };
    if (showPreview) {
      Object.keys(temp).forEach(
        (x) => (temp[x].span = type == "label" ? 12 : 0)
      );
    }
    return temp;
  };

  const rowStyle = showPreview
    ? {}
    : {
        border: "1px solid #edecec",
        paddingTop: "10px",
        margin: "10px",
        borderRadius: "10px",
      };

  const handlePreview = () => {
    setShowPreview(!showPreview);
  };

  const onBasicSalaryChange = (e) => {
    const basicSalary = e.target.value;
    const calculatedHra = (basicSalary * 15) / 100;
    setHra(calculatedHra);
    form.setFieldsValue({ hra: calculatedHra });
    onTotalSalaryChange();
  };

  const onTotalSalaryChange = () => {
    const earningFields = earningConfig?.Earning;
    let totalEarning = 0;
    const basic = form.getFieldValue("basic") || 0;
    const hra = form.getFieldValue("hra") || 0;
    totalEarning += parseInt(basic) + parseInt(hra);

    earningFields.forEach((field) => {
      const fieldValue = form.getFieldValue(field) || 0;
      totalEarning += parseInt(fieldValue);
    });

    setEarning(totalEarning);

    form.setFieldsValue({ totalEarning });
  };

  const onTotalDeductionChange = () => {
    const deductionFields = earningConfig?.Deduction;
    let totalDeduction = 0;
    deductionFields.forEach((field) => {
      const fieldValue = form.getFieldValue(field) || 0;
      totalDeduction += parseInt(fieldValue);
    });
    setDeduction(totalDeduction);
    form.setFieldsValue({ totalDeduction });
  };
  function calculateNetSalary() {
    const totalEarnings = parseInt(form.getFieldValue("totalEarning") || 0);
    const totalDeductions = parseInt(form.getFieldValue("totalDeduction") || 0);
    const netSalarys = totalEarnings - totalDeductions;
    setNetSalary(netSalarys);
    form.setFieldsValue({ netSalaryIncome: netSalarys });
  }

  useEffect(() => {
    calculateNetSalary();
  }, [earning, deduction]);

  useEffect(() => {
    getSalaryData(emp);
  }, [emp]);

  useEffect(() => {
    getAllUser();
  }, []);

  const onReset = () => {
    form.resetFields();
    setEmp(null);
    setEarning(null);
    setDeduction(null);
    setNetSalary(null);
  };

  const onFinish = (values) => {
    // console.log("value", values);
    let field = moment().format("MMM_YYYY");
    const earningArray = []; // create an array for earning values
    earningConfig?.Earning.forEach((field) => {
      // mappedEarningValues[field] = values[field];
      earningArray.push({
        field: field,
        value: values[field],
      }); // push the field-value pair into the array
      // console.log("earningArray", earningArray);
      // console.log("mappedEarningValues", mappedEarningValues)
    });

    const mappedDeductionValues = {};
    const deductionArray = []; // create an array for deduction values
    earningConfig?.Deduction.forEach((field) => {
      mappedDeductionValues[field] = values[field];
      deductionArray.push({
        field: field,
        value: values[field],
      }); // push the field-value pair into the array
    });

    let netSalaryEmp = {
      basic: values.basic,
      hra: values.hra,
      totalEarning: values.totalEarning,
      totalDeduction: values.totalDeduction,
      netSalaryIncome: values.netSalaryIncome,
    };

    // add the earning and deduction arrays to netSalaryEmp
    netSalaryEmp.earningArray = earningArray;
    netSalaryEmp.deductionArray = deductionArray;

    EmployeeNetSalary.addSalary(ids[`${emp}`], field, netSalaryEmp)
      .then(() => {
        notification.success({
          message: "Form submitted successfully",
        });
        form.resetFields();
        setEmp(null);
        setEarning(null);
        setDeduction(null);
        setNetSalary(null);
      })
      .catch((err) =>
        notification.error({
          message: "Form submitted Failed" + err.message,
        })
      );
    setShowPreview(false);
  };

  //------------------------------search name------------------------------

  const onSearch = (searchText) => {
    let matchingName = allEmpName.filter((ex) => {
      return ex.value.toLowerCase().includes(searchText.toLowerCase());
    });
    setOptions(!searchText ? [] : matchingName);
  };

  const onSelect = (data) => {
    if (data) {
      setEmp(data);
    }
  };
  async function getAllUser() {
    const allData = await getUsers();
    let codes = {};
    let temp = {};
    let allUsers = allData.docs.map((doc) => {
      temp = {
        ...temp,
        [`${doc.data().name}`]: doc.id,
      };
      codes = {
        ...codes,
        [`${doc.data().name}`]: doc.data().empId,
      };
      return {
        value: doc.data().name,
      };
    });
    setAllEmpName(allUsers);
    setIds(temp);
    setCodes(codes);
  }
  //-----------------------------get Salary-------------------------

  async function getSalaryData() {
    if (emp == null) return;
    let id = ids[emp];
    // console.log("id", id);
    let data = await EmployeeNetSalary.getSalary(id);
    // console.log("aaa", data);
    let field = moment().format("MMM_YYYY");
    let curr = data[`${field}`];
    if (curr) {
      form.setFieldsValue({
        basic: curr.basic,
        hra: curr.hra,
        ...curr[`${field}`],
        ...curr.earnings,
        ...curr.deductions,
      });
    } else {
      form.resetFields();
      setEarning(null);
      setDeduction(null);
      setNetSalary(null);
      form.setFieldsValue({ selectStaff: emp });
    }
  }

  //--------------------------get config------------------------------------------
  useEffect(() => {
    getConfigData();
  }, []);

  const getConfigData = async () => {
    let configData = await ConfigureContext.getEarningConfig("salary");
    // console.log('configData', configData)
    setEarningConfig(configData);
  };

  //-----------------------------------------disable preview-------------------------------
  const isAllRequiredFieldsFilled = () => {
    return requiredFields.every((field) => {
      const errors = form.getFieldError(field);
      const value = form.getFieldValue(field);
      return !errors.length && value;
    });
  };

  const previewStyle = () => {
    let temp = {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    };
    if (showPreview) {
      temp.background = "rgb(227 227 227)";
      temp.width = "400px";
      temp.margin = "30px auto";
    }
    return temp;
  };

  return (
    <div className="Third" style={previewStyle()}>
      <Col
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          alignItems: "center",
          justifyContent: `${showPreview ? "center" : "space-between"}`,
        }}
      >
        <h1>{showPreview ? "Payroll Preview" : "Payroll Setting"}</h1>
        {!showPreview ? (
          <PayRollUpload
            ids={ids}
            codes={codes}
            earningConfig={earningConfig}
          />
        ) : null}
      </Col>
      <Form
        form={form}
        labelCol={formLayout("label")}
        wrapperCol={formLayout("wrapper")}
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
        onFinish={onFinish}
      >
        <Row gutter={[48, 0]} type="flex" align="center" style={rowStyle}>
          <Col {...bodyLayout("top")}>
            <Form.Item
              label={showPreview ? "Name" : "Select Staff"}
              name="selectStaff"
              rules={[
                {
                  required: !showPreview,
                  message: "Please Select Staff ",
                },
              ]}
            >
              {showPreview ? (
                <span>{emp}</span>
              ) : (
                <AutoComplete
                  options={options}
                  style={{
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                  }}
                  onSelect={onSelect}
                  onSearch={onSearch}
                  placeholder="Enter Name"
                />
              )}
            </Form.Item>
          </Col>
          <Col {...bodyLayout("top")}>
            <Form.Item
              name="totalEarning"
              label="Total Earning"
              style={showPreview ? { margin: "0px" } : { marginBottom: "20px" }}
            >
              {showPreview ? (
                <span>{earning}</span>
              ) : (
                <Input
                  value={earning}
                  onChange={(e) => {
                    setEarning(e.target.value);
                  }}
                  maxLength={20}
                  disabled
                  // required
                  placeholder="Enter Net Salary"
                  style={{
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                  }}
                />
              )}
            </Form.Item>
          </Col>
          <Col {...bodyLayout("top")}>
            <Form.Item
              name="totalDeduction"
              label="Total Deduction"
              style={showPreview ? { margin: "0px" } : { marginBottom: "20px" }}
            >
              {showPreview ? (
                <span>{deduction}</span>
              ) : (
                <Input
                  onChange={(e) => {
                    setDeduction(e.target.value);
                  }}
                  value={deduction}
                  maxLength={20}
                  disabled
                  // required
                  placeholder="Enter Total Deduction"
                  style={{
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                  }}
                />
              )}
            </Form.Item>
          </Col>
          <Col {...bodyLayout("top")}>
            <Form.Item
              name="netSalaryIncome"
              label="Net Salary"
              style={showPreview ? { margin: "0px" } : { marginBottom: "20px" }}
            >
              {showPreview ? (
                <span>{netSalary}</span>
              ) : (
                <Input
                  maxLength={20}
                  disabled
                  value={netSalary}
                  // required
                  placeholder="Enter Net Salary"
                  style={{
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                  }}
                />
              )}
            </Form.Item>
          </Col>
        </Row>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: `${showPreview ? "center" : "space-between"}`,
          }}
        >
          <h2
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "10px",
              justifyContent: `${showPreview ? "center" : "space-between"}`,
            }}
          >
            Earnings
          </h2>
          {!showPreview ? (
            <div>
              <PayRollConfigEarning data={earningConfig.Earning} />
            </div>
          ) : null}
        </div>
        <Row gutter={[48, 0]} style={rowStyle}>
          <Col {...bodyLayout()}>
            <Form.Item
              onKeyPress={(event) => {
                if (checkNumbervalue(event)) {
                  event.preventDefault();
                }
              }}
              name="basic"
              label="Basic"
              style={showPreview ? { margin: "0px" } : { marginBottom: "20px" }}
              rules={[
                {
                  required: !showPreview,
                  message: "Please Select Basic Salary ",
                },
              ]}
              // initialValue={data.basic}
            >
              {showPreview ? (
                <span>{form.getFieldValue("basic")}</span>
              ) : (
                <Input
                  onChange={onBasicSalaryChange}
                  maxLength={20}
                  required
                  placeholder="Enter Basic Salary"
                  style={{
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                  }}
                />
              )}
            </Form.Item>
          </Col>
          <Col {...bodyLayout()}>
            <Form.Item
              name="hra"
              label="HRA(15%)"
              style={showPreview ? { margin: "0px" } : { marginBottom: "20px" }}
              // initialValue={data[0].hra}
            >
              {showPreview ? (
                <span>{hra}</span>
              ) : (
                <Input
                  value={hra}
                  disabled
                  maxLength={20}
                  placeholder="Enter HRA"
                  style={{
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                  }}
                />
              )}
            </Form.Item>
          </Col>
          {earningConfig?.Earning?.map((field, index) => (
            <Col {...bodyLayout()}>
              <Form.Item
                key={index}
                onKeyPress={(event) => {
                  if (checkNumbervalue(event)) {
                    event.preventDefault();
                  }
                }}
                name={field}
                label={field}
                style={
                  showPreview ? { margin: "0px" } : { marginBottom: "20px" }
                }
                // initialValue={data?.earnings?.[`${field}`] || null}
              >
                {showPreview ? (
                  <span>{form.getFieldValue(field)}</span>
                ) : (
                  <Input
                    onChange={onTotalSalaryChange}
                    maxLength={20}
                    // required
                    placeholder={`Enter ${field}`}
                    style={{
                      border: "1px solid #8692A6",
                      borderRadius: "4px",
                    }}
                  />
                )}
              </Form.Item>
            </Col>
          ))}
        </Row>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: `${showPreview ? "center" : "space-between"}`,
          }}
        >
          <h2
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: `${showPreview ? "0" : "10px"}`,
              justifyContent: `${showPreview ? "center" : "space-between"}`,
            }}
          >
            Deductions
          </h2>
          {!showPreview ? (
            <div>
              <PayRollConfigDeduction data={earningConfig.Deduction} />
            </div>
          ) : null}
        </div>
        <Row gutter={[48, 0]} style={rowStyle}>
          {earningConfig?.Deduction.map((field, index) => (
            <Col {...bodyLayout()}>
              <Form.Item
                key={index}
                onKeyPress={(event) => {
                  if (checkNumbervalue(event)) {
                    event.preventDefault();
                  }
                }}
                name={field}
                label={field}
                style={
                  showPreview ? { margin: "0px" } : { marginBottom: "20px" }
                }
                // initialValue={data?.deductions?.[`${field}`] || null}
              >
                {showPreview ? (
                  <span>{form.getFieldValue(field)}</span>
                ) : (
                  <Input
                    onChange={onTotalDeductionChange}
                    maxLength={20}
                    // required
                    placeholder={`Enter ${field}`}
                    style={{
                      border: "1px solid #8692A6",
                      borderRadius: "4px",
                    }}
                  />
                )}
              </Form.Item>
            </Col>
          ))}
        </Row>
        {!showPreview ? (
          <Col span={24}>
            <div
              style={{
                display: "flex",
                justifyContent: "end",
              }}
            >
              <Button
                style={{
                  border: "1px solid #1963A6",
                  color: "#1963A6",
                  fontWeight: "600",
                  fontSize: "14px",
                  lineHeight: "17px",
                  width: "99px",
                  marginTop: "25px",
                  cursor: "pointer",
                  marginBottom: "25px",
                }}
                onClick={onReset}
              >
                Reset
              </Button>
              <Button
                style={{
                  border: "1px solid #1963A6",
                  background: isAllRequiredFieldsFilled()
                    ? "#1963A6"
                    : "#dee2e6",
                  color: isAllRequiredFieldsFilled() ? "#ffffff" : "grey",
                  fontWeight: "600",
                  fontSize: "14px",
                  lineHeight: "17px",
                  width: "99px",
                  marginTop: "25px",
                  // cursor: "pointer",
                  marginLeft: "17px",
                  marginBottom: "25px",
                }}
                // htmlType="submit"
                onClick={handlePreview}
                disabled={!isAllRequiredFieldsFilled()}
              >
                Preview
              </Button>
            </div>
          </Col>
        ) : (
          <Col span={24}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Form.Item>
                <Button
                  style={{
                    border: "1px solid #1963A6",
                    color: "#1963A6",
                    fontWeight: "600",
                    fontSize: "14px",
                    lineHeight: "17px",
                    width: "99px",
                    marginTop: "25px",
                    cursor: "pointer",
                    marginBottom: "25px",
                  }}
                  onClick={handlePreview}
                >
                  Back
                </Button>
              </Form.Item>
              <Form.Item>
                <Button
                  style={{
                    border: "1px solid #1963A6",
                    background: "#1963A6",
                    color: "#ffffff",
                    fontWeight: "600",
                    fontSize: "14px",
                    lineHeight: "17px",
                    width: "99px",
                    marginTop: "25px",
                    cursor: "pointer",
                    marginLeft: "17px",
                    marginBottom: "25px",
                  }}
                  htmlType="submit"
                >
                  Finish
                </Button>
              </Form.Item>
            </div>
          </Col>
        )}
      </Form>
    </div>
  );
}

export default HrPaySlip;
