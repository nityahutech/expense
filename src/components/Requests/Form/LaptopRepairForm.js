import { React, useState, useEffect } from "react";
import "../Form.css";
import {
  Card,
  Button,
  Row,
  Col,
  Form,
  Input,
  Space,
  DatePicker,
  Select,
  message,
} from "antd";

import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/lib/input/TextArea";
import RequestContext from "../../../contexts/RequestContext";
import { capitalize, showNotification } from "../../../contexts/CreateContext";
import moment from "moment";
import EmpInfoContext from "../../../contexts/EmpInfoContext";

function LaptopRepairForm(props) {
  console.log('props', props?.assetData[0]?.lapname)
  const upgradeFormData = props?.assetData[0];
  const [form] = Form.useForm();
  const [file, setFile] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [user, setUser] = useState({});
  const [allotmentData, setAllotmentData] = useState([]);
  const currentUser = JSON.parse(sessionStorage.getItem("user"));
  const { Option } = Select;
  console.log("selectedOption", selectedOption);
  const onReset = () => {
    setSelectedOption(false);
    form.resetFields();
  };

  const onFinish = (values) => {

    console.log("ffffff", values);
    form.resetFields();
    const allUpgradeData = {
      lapname: values.lapname || upgradeFormData.lapname,
      modelName: values.modelName || upgradeFormData.modelName,
      serialNum: values.serialNum || upgradeFormData.serialNum,
      date: moment().format("DD-MM-YYYY"),
      empId: currentUser.uid || null,
      empCode: user.empId || null,
      name: user.name || null,
      type: 'Laptop Repair',
      status: "Pending",
      data: {
        repairDes: values.repairDes,
      }
    };
    console.log("ffffff", allUpgradeData);

    try {
      RequestContext.addRepairRequest(allUpgradeData, file);
      showNotification("success", "Success", "Repair Request Added");
      // props.getData();
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
    let allData = await RequestContext.getRepairData(currentUser.uid, true);
    let userData = await EmpInfoContext.getEduDetails(currentUser.uid);
    setUser(userData);
    setAllotmentData(allData);
  };

  const divStyle = {
    border: "1px solid #8692A6",
    borderRadius: "4px",
    width: "100%",
  };


  function handleChange(event) {
    const selectedFile = event.target.files[0];
    const isLt2M = selectedFile.size / 1024 / 1024 < 2;
    setFile(selectedFile);
    const allowedFileTypes = ['application/pdf', 'image/jpeg', 'image/png'];

    if (selectedFile && allowedFileTypes.includes(selectedFile.type)) {
      message.success('File uploaded: ' + selectedFile.name);
    } else {
      message.error('Invalid file type');
    }
  }

  return (
    <>
      <div className="laptopDiv">
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
          style={{ width: '100%' }}
        >
          <Row gutter={[0, 0]}>
            <>
              <Col span={10}>
                <Form.Item
                  name="dateOfRepair"
                  label={
                    selectedOption === "Repair"
                      ? "Date Of Repairing Request"
                      : selectedOption === "Upgrade"
                        ? "Date of upgrading request"
                        : "Date of Return"
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
                    showCount
                    Rows={4}
                    maxLength={100}
                    autoSize={{ minRows: 4, maxRows: 4 }}
                    placeholder="Max 100 Words"
                    style={divStyle}
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <FormItem
                  name="upload"
                  label="Upload photos if (Physical Damage)"
                  rules={[
                    {
                      required: true,
                      message: "Please Upload File",
                    },
                  ]}
                >
                  <div className="idpage">
                    <Input
                      type="file"
                      accept=".pdf, .jpeg, .jpg, .png"
                      id="upload"
                      name="upload"
                      onChange={handleChange}
                      style={{ borderRadius: "5px" }}
                    />
                  </div>
                </FormItem>
              </Col>

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
                    <Button className="button-white" onClick={onReset}>
                      Reset
                    </Button>
                  </Form.Item>
                  <Form.Item>
                    <Button className='button-color' htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Space>
              </Col>
            </>
          </Row>
        </Form>
      </div>
    </>
  );
}

export default LaptopRepairForm;
