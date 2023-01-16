import { React, useState, useEffect } from "react";
import "./RepairReq.css";
import {
  Card,
  Button,
  Row,
  Col,
  Form,
  Input,
  Space,
  DatePicker,
  message,
  Switch,
  Select,
} from "antd";

import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/lib/input/TextArea";
import RepairRequestTable from "./RepairRequestTable";
import AllocatedCard from "./AllocatedCard";
import AssetContext from "../../contexts/AssetContext";
import { capitalize, showNotification } from "../../contexts/CreateContext";
import moment from "moment";
import EmpInfoContext from "../../contexts/EmpInfoContext";

function LaptopAllot(props) {
  const [form] = Form.useForm();
  const [file, setFile] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [user, setUser] = useState({});
  const [allotmentData, setAllotmentData] = useState([]);
  console.log(allotmentData, "jjjjjjjjjjj");
  const compId = sessionStorage.getItem("compId");
  const currentUser = JSON.parse(sessionStorage.getItem("user"));
  const { Option } = Select;

  const onReset = () => {
    setSelectedOption(false);
    form.resetFields();
  };

  const onFinish = (values) => {
    console.log("ffffff", values);
    form.resetFields();
    const allUpgradeData = {
      lapname: values.lapname,
      modelName: values.modelName,
      serialNum: values.serialNum,
      dateOfRepair: moment().format("DD-MM-YYYY"),
      repairDes: values.repairDes,
      empId: currentUser.uid,
      empCode: user.empId,
      name: user.name,
      type: values.option,
      status: "Pending",
      // ...values
    };

    console.log("ffffff", allUpgradeData);
    try {
      AssetContext.addRepairRequest(allUpgradeData, file);

      showNotification("success", "Success", "Repair Request Added");
      props.getData();
      getAllotmentData();
      setSelectedOption(false);
    } catch (error) {
      console.log(error);
      showNotification("error", "Error", "Error In alloctment");
    }
  };

  useEffect(() => {
    getAllotmentData();
  }, []);

  const getAllotmentData = async () => {
    let allData = await AssetContext.getRepairData(currentUser.uid, [
      "Allotment",
    ]);
    let userData = await EmpInfoContext.getEduDetails(currentUser.uid);
    setUser(userData);
    setAllotmentData(allData);
    console.log(setAllotmentData, "ektadewangan");
  };

  const divStyle = {
    border: "1px solid #8692A6",
    borderRadius: "4px",
    width: "100%",
  };

  const resetButton = {
    border: "1px solid #1963a6",
    color: "#1963a6",
    fontWeight: "600",
    fontSize: "14px",
    lineHeight: "17px",
    width: "99px",
    marginTop: "10px",
    cursor: "pointer",
  };
  const submitButton = {
    border: "1px solid #1963a6",
    background: "#1963a6",
    color: "#ffffff",
    fontWeight: "600",
    fontSize: "14px",
    lineHeight: "17px",
    width: "99px",
    marginTop: "10px",
    cursor: "pointer",
    marginLeft: "17px",
  };

  // function handleChange(event) {
  //   let file = event.target.files[0];
  //   console.log("handleupload", file);
  //   setFile(null);
  //   const isPdf = file.type === "application/pdf";
  //   if (!isPdf) {
  //     message.error("You can only upload Pdf file!");
  //     return;
  //   }

  //   const isLt2M = file.size / 1024 / 1024 < 2;
  //   if (!isLt2M) {
  //     message.error("File must smaller than 2MB!");
  //     return;
  //   }
  //   setFile(event.target.files[0]);
  // }

  function handleChange(event) {
    const isLt2M = file.size / 1024 / 1024 < 2;
    // if (!isLt2M) {
    //   message.error('File must smaller than 2MB!');
    //   return
    // }
    setFile(event.target.files[0]);
  }

  return (
    <>
      <div>
        {" "}
        <AllocatedCard refresh={allotmentData} user={user} />;
      </div>

      <div className="laptopDiv">
        <Card
          title=" Repair / Upgrade Form"
          className="laptopcard"
          bordered={true}
          hoverable={true}
        >
          <Form
            className="addEmp"
            form={form}
            layout="vertical"
            labelcol={{
              span: 4,
            }}
            wrappercol={{
              span: 14,
            }}
            initialValues={{
              remember: true,
            }}
            autoComplete="off"
            onFinish={onFinish}
          >
            <Row gutter={[32, 0]}>
              <Col span={24}>
                <Form.Item label="Select a Form" name="option">
                  {/* <Switch checkedChildren="Upgrade Form" unCheckedChildren="Repair Form" checked={selectedOption === 'upgrade'} onChange={() => setSelectedOption(selectedOption === 'repair' ? 'upgrade' : 'repair')} /> */}
                  <Select
                    placeholder="Select an option"
                    style={{ width: "39%" }}
                    onChange={(selectedOption) =>
                      setSelectedOption(selectedOption)
                    }
                  >
                    <Option value="Upgrade">Upgrade Form</Option>
                    <Option value="Repair">Repair Form</Option>
                    {/* <Select.Option value="option3">Option 3</Select.Option> */}
                  </Select>
                </Form.Item>
              </Col>
              {/* ----------------------laptopAllortment */}

              {(selectedOption === "Repair" ||
                selectedOption === "Upgrade") && (
                <>
                  <Col span={10}>
                    <Form.Item
                      name="dateOfRepair"
                      label={
                        selectedOption === "Repair"
                          ? "Date Of Repairing Request"
                          : "Date of upgrading request"
                      }
                    >
                      <DatePicker
                        format={"DD-MM-YYYY"}
                        defaultValue={moment()}
                        style={divStyle}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <FormItem
                      style={{ display: "none" }}
                      name="lapname"
                      label="Laptop Name"
                      initialValue={allotmentData[0]?.lapname}
                    >
                      <Input disabled style={divStyle} span={6} />
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem
                      style={{ display: "none" }}
                      name="modelName"
                      label="Model"
                      initialValue={allotmentData[0]?.modelName}
                    >
                      <Input disabled style={divStyle} />
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem
                      style={{ display: "none" }}
                      name="serialNum"
                      label="Serial Number"
                      initialValue={allotmentData[0]?.serialNum}
                    >
                      <Input disabled style={divStyle} />
                    </FormItem>
                  </Col>

                  <Col span={24}>
                    <Form.Item
                      name="repairDes"
                      label="Reason"
                      rules={[
                        {
                          required: true,
                          message: "Please enter Reason",
                        },
                        {
                          message: "Please enter Valid Reason",
                        },
                      ]}
                    >
                      <TextArea
                        Rows={4}
                        maxLength={100}
                        autoSize={{ minRows: 4, maxRows: 4 }}
                        placeholder="Max 100 Words"
                        style={divStyle}
                      />
                    </Form.Item>
                  </Col>
                  {selectedOption === "Repair" ? (
                    <Col span={12}>
                      <FormItem
                        name="upload"
                        label="Upload photos if (Physical Damage)"
                      >
                        <div className="idpage">
                          <Input
                            type="file"
                            accept="application/pdf"
                            id="upload"
                            name="upload"
                            onChange={handleChange}
                            style={{ borderRadius: "5px" }}
                          />
                        </div>
                      </FormItem>
                    </Col>
                  ) : null}
                  <Col
                    span={24}
                    classsname="gutter-row"
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Space>
                      <Form.Item>
                        <Button style={resetButton} onClick={onReset}>
                          Reset
                        </Button>
                      </Form.Item>
                      <Form.Item>
                        <Button
                          style={submitButton}
                          htmlType="submit"
                          // onClick={() => form.submit(handleSubmit3)}
                        >
                          Submit
                        </Button>
                      </Form.Item>
                    </Space>
                  </Col>
                </>
              )}
            </Row>
          </Form>
        </Card>
      </div>
      {/* <div>
        {" "}
        <RepairRequestTable repairLaptopData={repairLaptopData} />
      </div> */}
    </>
  );
}

export default LaptopAllot;
