import React, { useState, useEffect } from "react";
import { Form, Select, Button, Row, Col, Input, notification } from "antd";
import "antd/dist/antd.css";
import "../../style/HrPaySlip.css";
import EmployeeNetSalary from "../../contexts/EmployeeNetSalary";
import { getUsers, showNotification } from "../../contexts/CreateContext";
import { AutoComplete } from "antd";

function HrPaySlip() {
  const role = sessionStorage.getItem("role");
  const currentUser = JSON.parse(sessionStorage.getItem("user"));
  const [form] = Form.useForm();
  const [showPreview, setShowPreview] = useState(false);
  const [data, setData] = useState({});
  // const [allData, setAllData] = useState(data || [])

  //-------------calculation-----------
  const [hra, setHra] = useState(0);
  const [total, setTotal] = useState(0);
  const [deduction, setDeduction] = useState(0);
  const [netSalary, setNetSalary] = useState("");
  const [allEmpName, setAllEmpName] = useState([]);
  const [emp, setEmp] = useState(null);

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
    getAllUser();
    getSalaryData(emp);
    console.log("useEffect envoke", emp);

  }, [total, deduction, form, emp]);

  const onReset = () => {
    form.resetFields();
  };
  //updateSalary in firebase using updatedoc
  const onFinish = (values) => {
    console.log("value", values);
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
      netSalaryEmp,
      currentUser.uid
    )
      .then(() =>
        notification.success({
          message: "Form submitted successfully",
        })
      )
      .catch(() =>
        notification.error({
          message: "Form submitted Failed",
        })
      );
    form.resetFields();
    setShowPreview(false);
  };

  //------------------------------search name------------------------------
  const [options, setOptions] = useState([]);
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
    let allUsers = allData.docs.map((doc, i) => {
      return {
        value: doc.data().fname + " " + doc.data().lname,
      };
    });
    console.log("allUsers", allUsers);
    setAllEmpName(allUsers);
  }
  //-----------------------------get Salary-------------------------

  async function getSalaryData(empName) {
    const allSalaryData = await EmployeeNetSalary.getSalary(empName);
    console.log("aaa", allSalaryData);
    if (allSalaryData.length > 0) {
      setData(allSalaryData[0]);
      console.log(allSalaryData[0]);
    }
  }
  //if data is their set data as null


  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        selectStaff: data.selectStaff,
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
    }

  }, [data]);

  return (
    <div>
      <div>
        <div
          className="Third"
          style={showPreview ? { background: "rgb(227 227 227)" } : {}}
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
          <Form
            form={form}
            labelCol={{
              lg: { span: showPreview ? 6 : 24, offset: showPreview ? 6 : 0 },
              md: { span: showPreview ? 6 : 24, offset: showPreview ? 6 : 0 },
              sm: { span: showPreview ? 6 : 24, offset: showPreview ? 6 : 0 },
            }}
            wrapperCol={{
              lg: { span: showPreview ? 8 : 24, offset: showPreview ? 4 : 0 },
              md: { span: showPreview ? 8 : 24, offset: showPreview ? 4 : 0 },
              sm: { span: showPreview ? 8 : 24, offset: showPreview ? 4 : 0 },
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
                    {
                      // required: true,
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
                  initialValue={data.totalEarning}
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
                  name="basic"
                  label="Basic"
                  style={
                    showPreview ? { margin: "0px" } : { marginBottom: "20px" }
                  }
                  initialValue={data.basic}
                >
                  {showPreview ? (
                    <span>{form.getFieldValue("basic")}</span>
                  ) : (
                    <Input
                      onChange={onBasicSalaryChange}
                      maxLength={20}
                      // required
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
              <Col
                xs={24}
                sm={showPreview ? 24 : 12}
                md={showPreview ? 24 : 8}
                lg={showPreview ? 24 : 8}
              >
                <Form.Item
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
                  name="proffallowance"
                  label="Professional Development Allowance"
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
              </Col>
            </Row>
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
                  name="tds"
                  label="TDS"
                  style={
                    showPreview ? { margin: "0px" } : { marginBottom: "20px" }
                  }
                // initialValue={data[0].tds}
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
                  name="esi"
                  label="ESI"
                  style={
                    showPreview ? { margin: "0px" } : { marginBottom: "20px" }
                  }
                // initialValue={data[0].esi}
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
                  name="pfer"
                  label="PF Employer"
                  style={
                    showPreview ? { margin: "0px" } : { marginBottom: "20px" }
                  }
                // initialValue={data[0].pfer}
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
                  name="pfem"
                  label="PF Enployee"
                  style={
                    showPreview ? { margin: "0px" } : { marginBottom: "20px" }
                  }
                // initialValue={data[0].pfem}
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
                  name="profTax"
                  label="Prof. Tax"
                  style={
                    showPreview ? { margin: "0px" } : { marginBottom: "20px" }
                  }
                // initialValue={data[0].profTax}
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
                  name="otherDeduction"
                  label="Other Deduction"
                  style={
                    showPreview ? { margin: "0px" } : { marginBottom: "20px" }
                  }
                // initialValue={data[0].otherDeduction}
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
              </Col>
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
                      // htmlType="submit"
                      onClick={handlePrevStep}
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
