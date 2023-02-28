import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Input, notification, Modal } from "antd";
import "antd/dist/antd.css";
import "../../style/HrPaySlip.css";
import EmployeeNetSalary from "../../contexts/EmployeeNetSalary";
import { getUsers } from "../../contexts/CreateContext";
import { AutoComplete } from "antd";
import { checkAlphabets, checkNumbervalue } from "../../contexts/CreateContext";
import PayRollUpload from "./PayRollUpload";
import PayRollConfigEarning from "./PayRollConfigEarning";
import PayRollConfigDeduction from "./PayRollConfigDeduction";
import moment from "moment";

function HrPaySlip() {
  const [form] = Form.useForm();
  const [showPreview, setShowPreview] = useState(false);
  const [data, setData] = useState({});

  //-------------calculation-----------
  const [hra, setHra] = useState(0);
  const [total, setTotal] = useState(0);
  const [deduction, setDeduction] = useState(0);
  const [netSalary, setNetSalary] = useState("");
  const [allEmpName, setAllEmpName] = useState([]);
  const [emp, setEmp] = useState(null);
  const [options, setOptions] = useState([]);
  const [ids, setIds] = useState([]);
  const requiredFields = ["basic", "selectStaff"];


  const handlePrevStep = (values) => {
    console.log("Success:", values);
    setShowPreview(true);
  };

  const handlebackButton = () => {
    setShowPreview(false);
  };

  const onBasicSalaryChange = (e) => {
    const basicSalary = e.target.value;
    const calculatedHra = (basicSalary * 15) / 100;
    setHra(calculatedHra);
    form.setFieldsValue({ hra: calculatedHra });
  };

  const onTotalSalaryChange = () => {
    const basic = form.getFieldValue("basic");
    const hra = form.getFieldValue("hra");
    const conveyance = form.getFieldValue("conveyance");
    const medical = form.getFieldValue("medical");
    const proffallowance = form.getFieldValue("proffallowance");
    const specialallowance = form.getFieldValue("specialallowance");
    const bonus = form.getFieldValue("bonus");
    const lta = form.getFieldValue("lta");
    const otherAllowance = form.getFieldValue("otherAllowance");

    const newTotal =
      parseInt(basic || 0) +
      hra +
      parseInt(conveyance || 0) +
      parseInt(medical || 0) +
      parseInt(proffallowance || 0) +
      parseInt(specialallowance || 0) +
      parseInt(otherAllowance || 0) +
      parseInt(lta || 0) +
      parseInt(bonus || 0);
    console.log("dddde", newTotal);
    setTotal(newTotal);
    form.setFieldsValue({ totalEarning: newTotal });
  };

  const onTotalDeductionChange = () => {
    const tds = form.getFieldValue("tds");
    const esi = form.getFieldValue("esi");
    const pfer = form.getFieldValue("pfer");
    const pfem = form.getFieldValue("pfem");
    const profTax = form.getFieldValue("profTax");
    const otherDeduction = form.getFieldValue("otherDeduction");

    const Deduction =
      parseInt(tds || 0) +
      parseInt(esi || 0) +
      parseInt(pfer || 0) +
      parseInt(pfem || 0) +
      parseInt(profTax || 0) +
      parseInt(otherDeduction || 0);
    console.log(Deduction);
    setDeduction(Deduction);
    form.setFieldsValue({ totalDeduction: Deduction });
  };
  // console.log(calculateNetSalary())
  function calculateNetSalary() {
    const totalEarning = parseInt(form.getFieldValue("totalEarning") || 0);
    console.log(totalEarning);
    const totalDeduction = parseInt(form.getFieldValue("totalDeduction") || 0);
    const netSalary = totalEarning - totalDeduction;
    console.log(netSalary);
    setNetSalary(netSalary);
    form.setFieldsValue({ netSalaryIncome: netSalary });
  }

  useEffect(() => {
    calculateNetSalary();
  }, [total, deduction]);

  useEffect(() => {
    getSalaryData(emp);
    console.log("useEffect envoke", emp);
  }, [emp]);

  useEffect(() => {
    getAllUser();
  }, []);

  const onReset = () => {
    form.resetFields();
    setData({});
    setEmp(null);
    setTotal(null);
    setDeduction(null);
    setNetSalary(null);
  };
  //updateSalary in firebase using updatedoc
  const onFinish = (values) => {
    console.log("value", values);
    let field = moment().format("MMM_YYYY")
    let netSalaryEmp = {
      basic: values.basic,
      hra: values.hra,
      conveyance: values.conveyance,
      medical: values.medical,
      proffallowance: values.proffallowance,
      specialallowance: values.specialallowance,
      bonus: values.bonus,
      lta: values.lta,
      otherAllowance: values.otherAllowance,

      tds: values.tds,
      esi: values.esi,
      pfer: values.pfer,
      pfem: values.pfem,
      profTax: values.profTax,
      otherDeduction: values.otherDeduction || null,

      selectStaff: values.selectStaff,
      totalEarning: values.totalEarning,
      totalDeduction: values.totalDeduction,
      netSalaryIncome: values.netSalaryIncome,
    };

    console.log("netSalaryEmp", netSalaryEmp);
    EmployeeNetSalary.addSalary(
      ids[`${emp}`],
      field,
      netSalaryEmp,
    )
      .then(() => {
        notification.success({
          message: "Form submitted successfully",
        })
        form.resetFields();
        setEmp(null);
        setData({});
        setTotal(null);
        setDeduction(null);
        setNetSalary(null);
      }
      )
      .catch((err) =>
        notification.error({
          message: "Form submitted Failed" + err.message,
        })
      );
    setShowPreview(false);
  };

  //------------------------------search name------------------------------

  const onSearch = (searchText) => {
    console.log("onSearch", searchText);
    console.log("onSearch", allEmpName);
    let matchingName = allEmpName.filter((ex) => {
      return ex.value.toLowerCase().includes(searchText.toLowerCase());
    });
    console.log("onSearch", matchingName);
    setOptions(!searchText ? [] : matchingName);
  };

  const onSelect = (data) => {
    if (data) {
      setEmp(data);
    }
  };
  async function getAllUser() {
    const allData = await getUsers();
    console.log("allUsers", allData);
    let temp = {};
    let allUsers = allData.docs.map((doc) => {
      temp = {
        ...temp,
        [`${doc.data().fname + " " + doc.data().lname}`]: doc.id,
      };
      return {
        value: doc.data().fname + " " + doc.data().lname,
      };
    });
    console.log("allUsers", allUsers, temp);
    setAllEmpName(allUsers);
    setIds(temp);
  }
  //-----------------------------get Salary-------------------------

  async function getSalaryData() {
    if (emp == null) return;
    let id = ids[emp];
    console.log("id", id);
    let data = await EmployeeNetSalary.getSalary(id);
    console.log("aaa", data);
    let field = moment().format("MMM_YYYY")
    setData(data || {});
    console.log(data[`${field}`]);
    if (data) {
      form.setFieldsValue({
        basic: data.basic,
        hra: data.hra,
        conveyance: data.conveyance,
        medical: data.medical,
        proffallowance: data.proffallowance,
        specialallowance: data.specialallowance,
        bonus: data.bonus,
        lta: data.lta,
        otherAllowance: data.otherAllowance,

        tds: data.tds,
        esi: data.esi,
        pfer: data.pfer,
        pfem: data.pfem,
        profTax: data.profTax,
        otherDeduction: data.otherDeduction,

        totalEarning: data.totalEarning,
        totalDeduction: data.totalDeduction,
        netSalaryIncome: data.netSalaryIncome,
      });
    } else {
      form.resetFields();
      setTotal(null);
      setDeduction(null);
      setNetSalary(null);
      form.setFieldsValue({ selectStaff: emp });
    }
  }
  //-----------------------------------------disable preview-------------------------------
  const isAllRequiredFieldsFilled = () => {
    return requiredFields.every((field) => {
      const errors = form.getFieldError(field);
      const value = form.getFieldValue(field);
      return !errors.length && value;
    });
  };

  const earning = ['conveyance', 'medical', 'proffallowance', 'specialallowance', 'bonus', 'lta', 'otherAllowance',]
  const totalDeduction = ['tds', 'esi', 'pfer', 'pfem', 'profTax', 'otherDeduction',]

  console.log("data", data);
  console.log("emp", emp);
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          className="Third"
          style={
            showPreview
              ? {
                display: "flex",
                flexDirection: "column",
                background: "rgb(227 227 227)",
                width: "400px",
              }
              : {}
          }
        >
          <Col
            style={
              showPreview
                ? {
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }
                : {
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }
            }
          >
            <h1
              style={
                showPreview
                  ? {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }
                  : { display: "flex", alignItems: "flex-end" }
              }
            >
              {showPreview ? "Payroll Preview" : "Payroll Setting"}
            </h1>

            {!showPreview ? (
              <PayRollUpload allEmpName={allEmpName} ids={ids} emp={emp} />

            ) : null}
          </Col>
          <Form
            form={form}
            labelCol={{
              lg: { span: showPreview ? 12 : 24, offset: showPreview ? 0 : 0 },
              md: { span: showPreview ? 12 : 24, offset: showPreview ? 0 : 0 },
              sm: { span: showPreview ? 12 : 24, offset: showPreview ? 0 : 0 },
            }}
            wrapperCol={{
              lg: { span: showPreview ? 0 : 24, offset: showPreview ? 0 : 0 },
              md: { span: showPreview ? 0 : 24, offset: showPreview ? 0 : 0 },
              sm: { span: showPreview ? 0 : 24, offset: showPreview ? 0 : 0 },
            }}
            layout={showPreview ? "horizontal" : "vertical"}
            initialValues={{
              remember: true,
            }}
            autoComplete="off"
            onFinish={onFinish}
          >
            <Row
              gutter={[48, 0]}
              type="flex"
              align="center"
              style={
                showPreview
                  ? {}
                  : {
                    border: "1px solid #edecec",
                    paddingTop: "10px",
                    margin: "10px",
                    borderRadius: "10px",
                  }
              }
            >
              <Col
                xs={24}
                sm={showPreview ? 24 : 6}
                md={showPreview ? 24 : 6}
                lg={showPreview ? 24 : 6}
              >
                <Form.Item
                  label={showPreview ? "Name" : "Select Staff"}
                  name="selectStaff"
                  style={
                    showPreview ? { margin: "0px" } : { marginBottom: "20px" }
                  }
                  rules={[
                    showPreview
                      ? { required: false }
                      : {
                        required: true,
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
                      placeholder="Enter Name "
                    />
                  )}
                </Form.Item>
              </Col>
              <Col
                xs={24}
                sm={showPreview ? 24 : 6}
                md={showPreview ? 24 : 6}
                lg={showPreview ? 24 : 6}
              >
                <Form.Item
                  name="totalEarning"
                  label="Total Earning"
                  style={
                    showPreview ? { margin: "0px" } : { marginBottom: "20px" }
                  }
                >
                  {showPreview ? (
                    <span>{total}</span>
                  ) : (
                    <Input
                      value={total}
                      onChange={(e) => {
                        setTotal(e.target.value);
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
              <Col
                Col
                xs={24}
                sm={showPreview ? 24 : 6}
                md={showPreview ? 24 : 6}
                lg={showPreview ? 24 : 6}
              >
                <Form.Item
                  name="totalDeduction"
                  label="Total Deduction"
                  style={
                    showPreview ? { margin: "0px" } : { marginBottom: "20px" }
                  }
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
              <Col
                xs={24}
                sm={showPreview ? 24 : 6}
                md={showPreview ? 24 : 6}
                lg={showPreview ? 24 : 6}
              >
                <Form.Item
                  name="netSalaryIncome"
                  label="Net Salary"
                  style={
                    showPreview ? { margin: "0px" } : { marginBottom: "20px" }
                  }
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
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h2
                style={
                  showPreview
                    ? {
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }
                    : { display: "flex", alignItems: "flex-end" }
                }
              >
                {" "}
                Earnings
              </h2>
              <div><PayRollConfigEarning /></div>
            </div>
            <Row
              gutter={[48, 0]}
              style={
                showPreview
                  ? {}
                  : {
                    border: "1px solid #edecec",
                    paddingTop: "10px",
                    margin: "10px",
                    borderRadius: "10px",
                  }
              }
            >

              <Col
                xs={24}
                sm={showPreview ? 24 : 12}
                md={showPreview ? 24 : 8}
                lg={showPreview ? 24 : 8}
              >
                <Form.Item
                  onKeyPress={(event) => {
                    if (checkNumbervalue(event)) {
                      event.preventDefault();
                    }
                  }}
                  name="basic"
                  label="Basic"
                  style={
                    showPreview ? { margin: "0px" } : { marginBottom: "20px" }
                  }
                  rules={[
                    showPreview
                      ? { required: false }
                      : {
                        required: true,
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
              <Col
                xs={24}
                sm={showPreview ? 24 : 12}
                md={showPreview ? 24 : 8}
                lg={showPreview ? 24 : 8}
              >
                <Form.Item
                  name="hra"
                  label="HRA(15%)"
                  style={
                    showPreview ? { margin: "0px" } : { marginBottom: "20px" }
                  }
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
              {earning.map((field) => (
                <Col
                  xs={24}
                  sm={showPreview ? 24 : 12}
                  md={showPreview ? 24 : 8}
                  lg={showPreview ? 24 : 8}
                >
                  <Form.Item
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
                  // initialValue={data.basic}
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

              {/* <Col
                xs={24}
                sm={showPreview ? 24 : 12}
                md={showPreview ? 24 : 8}
                lg={showPreview ? 24 : 8}
              >
                <Form.Item
                  onKeyPress={(event) => {
                    if (checkNumbervalue(event)) {
                      event.preventDefault();
                    }
                  }}
                  name="conveyance"
                  label="Conveyance"
                  style={
                    showPreview ? { margin: "0px" } : { marginBottom: "20px" }
                  }
                // initialValue={data[0].conveyance}
                >
                  {showPreview ? (
                    <span>{form.getFieldValue("conveyance")}</span>
                  ) : (
                    <Input
                      onChange={onTotalSalaryChange}
                      maxLength={20}
                      // required
                      placeholder="Enter Conveyance"
                      style={{
                        border: "1px solid #8692A6",
                        borderRadius: "4px",
                      }}
                    />
                  )}
                </Form.Item>
              </Col>

              <Col
                xs={24}
                sm={showPreview ? 24 : 12}
                md={showPreview ? 24 : 8}
                lg={showPreview ? 24 : 8}
              >
                <Form.Item
                  onKeyPress={(event) => {
                    if (checkNumbervalue(event)) {
                      event.preventDefault();
                    }
                  }}
                  name="medical"
                  label="Medical Allowance"
                  style={
                    showPreview ? { margin: "0px" } : { marginBottom: "20px" }
                  }
                // initialValue={data[0].medical}
                >
                  {showPreview ? (
                    <span>{form.getFieldValue("medical")}</span>
                  ) : (
                    <Input
                      maxLength={20}
                      onChange={onTotalSalaryChange}
                      // required
                      placeholder="Enter Medical Allowance"
                      style={{
                        border: "1px solid #8692A6",
                        borderRadius: "4px",
                      }}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col
                xs={24}
                sm={showPreview ? 24 : 12}
                md={showPreview ? 24 : 8}
                lg={showPreview ? 24 : 8}
              >
                <Form.Item
                  onKeyPress={(event) => {
                    if (checkNumbervalue(event)) {
                      event.preventDefault();
                    }
                  }}
                  name="proffallowance"
                  label="Proff. Dev. Allowance"
                  style={
                    showPreview ? { margin: "0px" } : { marginBottom: "20px" }
                  }
                // initialValue={data[0].proffallowance}
                >
                  {showPreview ? (
                    <span>{form.getFieldValue("proffallowance")}</span>
                  ) : (
                    <Input
                      maxLength={20}
                      onChange={onTotalSalaryChange}
                      // required
                      placeholder="Enter Professional Allowance"
                      style={{
                        border: "1px solid #8692A6",
                        borderRadius: "4px",
                      }}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col
                xs={24}
                sm={showPreview ? 24 : 12}
                md={showPreview ? 24 : 8}
                lg={showPreview ? 24 : 8}
              >
                <Form.Item
                  onKeyPress={(event) => {
                    if (checkNumbervalue(event)) {
                      event.preventDefault();
                    }
                  }}
                  name="specialallowance"
                  label="Special Allowance"
                  style={
                    showPreview ? { margin: "0px" } : { marginBottom: "20px" }
                  }
                // initialValue={data[0].specialallowance}
                >
                  {showPreview ? (
                    <span>{form.getFieldValue("specialallowance")}</span>
                  ) : (
                    <Input
                      maxLength={20}
                      onChange={onTotalSalaryChange}
                      // required
                      placeholder="Enter Special Allowance"
                      style={{
                        border: "1px solid #8692A6",
                        borderRadius: "4px",
                      }}
                    />
                  )}
                </Form.Item>
              </Col>

              <Col
                xs={24}
                sm={showPreview ? 24 : 12}
                md={showPreview ? 24 : 8}
                lg={showPreview ? 24 : 8}
              >
                <Form.Item
                  onKeyPress={(event) => {
                    if (checkNumbervalue(event)) {
                      event.preventDefault();
                    }
                  }}
                  name="bonus"
                  label="Bonus"
                  style={
                    showPreview ? { margin: "0px" } : { marginBottom: "20px" }
                  }
                // initialValue={data[0].bonus}
                >
                  {showPreview ? (
                    <span>{form.getFieldValue("bonus")} </span>
                  ) : (
                    <Input
                      onChange={onTotalSalaryChange}
                      maxLength={20}
                      placeholder="Bonus"
                      style={{
                        border: "1px solid #8692A6",
                        borderRadius: "4px",
                      }}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col
                xs={24}
                sm={showPreview ? 24 : 12}
                md={showPreview ? 24 : 8}
                lg={showPreview ? 24 : 8}
              >
                <Form.Item
                  onKeyPress={(event) => {
                    if (checkNumbervalue(event)) {
                      event.preventDefault();
                    }
                  }}
                  name="lta"
                  label="LTA"
                  style={
                    showPreview ? { margin: "0px" } : { marginBottom: "20px" }
                  }
                // initialValue={data[0].lta}
                >
                  {showPreview ? (
                    <span>{form.getFieldValue("lta")} </span>
                  ) : (
                    <Input
                      onChange={onTotalSalaryChange}
                      maxLength={20}
                      placeholder="LTA"
                      style={{
                        border: "1px solid #8692A6",
                        borderRadius: "4px",
                      }}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col
                xs={24}
                sm={showPreview ? 24 : 12}
                md={showPreview ? 24 : 8}
                lg={showPreview ? 24 : 8}
              >
                <Form.Item
                  onKeyPress={(event) => {
                    if (checkNumbervalue(event)) {
                      event.preventDefault();
                    }
                  }}
                  name="otherAllowance"
                  label="Other Allowance"
                  style={
                    showPreview ? { margin: "0px" } : { marginBottom: "20px" }
                  }
                // initialValue={data[0].otherAllowance}
                >
                  {showPreview ? (
                    <span>{form.getFieldValue("otherAllowance")} </span>
                  ) : (
                    <Input
                      onChange={onTotalSalaryChange}
                      maxLength={20}
                      placeholder="Other Allowance"
                      style={{
                        border: "1px solid #8692A6",
                        borderRadius: "4px",
                      }}
                    />
                  )}
                </Form.Item>
              </Col> */}
            </Row>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h2
                style={
                  showPreview
                    ? {
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }
                    : { display: "flex", alignItems: "flex-end" }
                }
              >
                {" "}
                Deductions
              </h2>
              <div><PayRollConfigDeduction /></div>
            </div>
            <Row
              gutter={[48, 0]}
              style={
                showPreview
                  ? {}
                  : {
                    border: "1px solid #edecec",
                    paddingTop: "10px",
                    margin: "10px",
                    borderRadius: "10px",
                  }
              }
            >
              {totalDeduction.map((field) => (
                <Col
                  xs={24}
                  sm={showPreview ? 24 : 12}
                  md={showPreview ? 24 : 8}
                  lg={showPreview ? 24 : 8}
                >
                  <Form.Item
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
                  // initialValue={data.basic}
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

              {/* <Col
                xs={24}
                sm={showPreview ? 24 : 12}
                md={showPreview ? 24 : 8}
                lg={showPreview ? 24 : 8}
              >
                <Form.Item
                  onKeyPress={(event) => {
                    if (checkNumbervalue(event)) {
                      event.preventDefault();
                    }
                  }}
                  name="tds"
                  label="TDS"
                  style={
                    showPreview ? { margin: "0px" } : { marginBottom: "20px" }
                  }
                >
                  {showPreview ? (
                    <span>{form.getFieldValue("tds")} </span>
                  ) : (
                    <Input
                      maxLength={20}
                      onChange={onTotalDeductionChange}
                      // required
                      placeholder="Enter TDS"
                      style={{
                        border: "1px solid #8692A6",
                        borderRadius: "4px",
                      }}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col
                xs={24}
                sm={showPreview ? 24 : 12}
                md={showPreview ? 24 : 8}
                lg={showPreview ? 24 : 8}
              >
                <Form.Item
                  onKeyPress={(event) => {
                    if (checkNumbervalue(event)) {
                      event.preventDefault();
                    }
                  }}
                  name="esi"
                  label="ESI"
                  style={
                    showPreview ? { margin: "0px" } : { marginBottom: "20px" }
                  }
                >
                  {showPreview ? (
                    <span>{form.getFieldValue("esi")} </span>
                  ) : (
                    <Input
                      maxLength={20}
                      onChange={onTotalDeductionChange}
                      // required
                      placeholder="Enter ESI"
                      style={{
                        border: "1px solid #8692A6",
                        borderRadius: "4px",
                      }}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col
                xs={24}
                sm={showPreview ? 24 : 12}
                md={showPreview ? 24 : 8}
                lg={showPreview ? 24 : 8}
              >
                <Form.Item
                  onKeyPress={(event) => {
                    if (checkNumbervalue(event)) {
                      event.preventDefault();
                    }
                  }}
                  name="pfer"
                  label="PF Employer"
                  style={
                    showPreview ? { margin: "0px" } : { marginBottom: "20px" }
                  }
                >
                  {showPreview ? (
                    <span>{form.getFieldValue("pfer")} </span>
                  ) : (
                    <Input
                      maxLength={20}
                      onChange={onTotalDeductionChange}
                      // required
                      placeholder="Enter PF employer"
                      style={{
                        border: "1px solid #8692A6",
                        borderRadius: "4px",
                      }}
                    />
                  )}
                </Form.Item>
              </Col>

              <Col
                xs={24}
                sm={showPreview ? 24 : 12}
                md={showPreview ? 24 : 8}
                lg={showPreview ? 24 : 8}
              >
                <Form.Item
                  onKeyPress={(event) => {
                    if (checkNumbervalue(event)) {
                      event.preventDefault();
                    }
                  }}
                  name="pfem"
                  label="PF Enployee"
                  style={
                    showPreview ? { margin: "0px" } : { marginBottom: "20px" }
                  }
                >
                  {showPreview ? (
                    <span>{form.getFieldValue("pfem")} </span>
                  ) : (
                    <Input
                      maxLength={20}
                      onChange={onTotalDeductionChange}
                      // required
                      placeholder="Enter PF Employee"
                      style={{
                        border: "1px solid #8692A6",
                        borderRadius: "4px",
                      }}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col
                xs={24}
                sm={showPreview ? 24 : 12}
                md={showPreview ? 24 : 8}
                lg={showPreview ? 24 : 8}
              >
                <Form.Item
                  onKeyPress={(event) => {
                    if (checkNumbervalue(event)) {
                      event.preventDefault();
                    }
                  }}
                  name="profTax"
                  label="Prof. Tax"
                  style={
                    showPreview ? { margin: "0px" } : { marginBottom: "20px" }
                  }
                >
                  {showPreview ? (
                    <span>{form.getFieldValue("profTax")} </span>
                  ) : (
                    <Input
                      maxLength={20}
                      onChange={onTotalDeductionChange}
                      // required
                      placeholder="Enter Prof. Tax"
                      style={{
                        border: "1px solid #8692A6",
                        borderRadius: "4px",
                      }}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col
                xs={24}
                sm={showPreview ? 24 : 12}
                md={showPreview ? 24 : 8}
                lg={showPreview ? 24 : 8}
              >
                <Form.Item
                  onKeyPress={(event) => {
                    if (checkNumbervalue(event)) {
                      event.preventDefault();
                    }
                  }}
                  name="otherDeduction"
                  label="Other Deduction"
                  style={
                    showPreview ? { margin: "0px" } : { marginBottom: "20px" }
                  }
                >
                  {showPreview ? (
                    <span>{form.getFieldValue("otherDeduction")} </span>
                  ) : (
                    <Input
                      maxLength={20}
                      // required
                      onChange={onTotalDeductionChange}
                      placeholder="Other Deduction"
                      style={{
                        border: "1px solid #8692A6",
                        borderRadius: "4px",
                      }}
                    />
                  )}
                </Form.Item>
              </Col> */}
              {!showPreview ? (
                <Col span={24}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "end",
                    }}
                  >
                    {/* <Form.Item> */}
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
                        marginBottom: "25px",
                      }}
                      onClick={onReset}
                    >
                      Reset
                    </Button>
                    {/* </Form.Item>
                    <Form.Item> */}
                    <Button
                      style={{
                        border: "1px solid #1565D8",
                        background: isAllRequiredFieldsFilled()
                          ? "#1565D8"
                          : "#dee2e6",
                        color: isAllRequiredFieldsFilled()
                          ? "#ffffff"
                          : "grey",
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
                      onClick={handlePrevStep}
                      disabled={!isAllRequiredFieldsFilled()}
                    >
                      Preview
                    </Button>
                    {/* </Form.Item> */}
                  </div>
                </Col>
              ) : (
                <Col span={24}>
                  <div
                    style={
                      showPreview
                        ? {
                          display: "flex",
                          justifyContent: "center",
                        }
                        : {
                          display: "flex",
                          justifyContent: "end",
                        }
                    }
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
                          marginBottom: "25px",
                        }}
                        onClick={handlebackButton}
                      >
                        Back
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
            </Row>
          </Form>
        </div>
      </div>

    </div>
  );
}

export default HrPaySlip;
