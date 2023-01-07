import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col, Input, Form, DatePicker, Select } from "antd";
import hutechlogo from "../../images/hutechlogo.png";
import laptop from "../../images/laptop.jpg";
import {
  EditFilled,
  CloseOutlined,
  CheckOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { capitalize, showNotification } from "../../contexts/CreateContext";
import UploadImage from "./UploadImage";
import AssetContext from "../../contexts/AssetContext";
import moment from "moment";
import "../assetManagement/AllRequest.css";
import "../assetManagement/AllocatedCard.css"
const { Option } = Select;

const AllocatedCard = () => {
  const [form] = Form.useForm();
  const [editAsset, setEditAsset] = useState(false);
  const [data, setData] = useState([]);
  const [dob, setDob] = useState("");
  const [addButton, setAddButton] = useState(true);
  const compId = sessionStorage.getItem("compId");
  const currentUser = JSON.parse(sessionStorage.getItem("user"));

  const onFinish = (values) => {
    console.log(values);
    const allAssetData = {
      lapname: values.lapname,
      modalName: values.modalName,
      serialNum: values.serialNum,
      charger: values.charger,
      DoI: values.DoI.format("DD-MM-YYYY"),
      lapBag: values.lapBag,
      empId: currentUser.uid,
      type: "Allotment",
    };
    AssetContext.addAsset(allAssetData)
      .then((response) => {
        getEmpAllAsset();
        setEditAsset(false);

        showNotification("success", "Success", "Expense Added");
      })
      .catch((error) => {});

    console.log(allAssetData);
  };

  useEffect(() => {
    getEmpAllAsset();
  }, []);

  const getEmpAllAsset = async () => {
    let assetData = await AssetContext.getEmpAllot(currentUser.uid);
    setData(assetData[0]);
    if (assetData.length > 0) {
      setAddButton(false);
    }
    console.log(assetData);
  };

  const images = [{ hutechlogo }, { laptop }, { laptop }];

  return (
    <>
      <div className="personalCardDiv">
        <Row className="Row-Card">
          <Col span={24}>
            <Form
              layout="vertical"
              form={form}
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
              <Card
                title=" Laptop Allotment "
                className="overview"
                hoverable={true}
                bordered={true}
                // loading={loading}
              >
                {editAsset === true ? (
                  <>
                    <Row span={24} gutter={[16, 16]}>
                      <Col xs={24} sm={12} md={8}>
                        <Form.Item
                          label="Laptop Name"
                          initialValue={data?.lapname}
                          name="lapname"
                          onChange={(e) => {
                            const inputval = e.target.value;
                            const str = e.target.value;
                            const newVal =
                              inputval.substring(0, 1).toUpperCase() +
                              inputval.substring(1);
                            const caps = str
                              .split(" ")
                              .map(capitalize)
                              .join(" ");
                            // setPaidBy(newVal);
                            form.setFieldsValue({
                              lapname: newVal,
                              lapname: caps,
                            });
                          }}
                          rules={[
                            {
                              required: true,
                              message: "Please enter Laptop Name",
                            },
                            {
                              pattern: /^[a-zA-Z\s]*$/,
                              message: "Please enter Valid Laptop Name",
                            },
                          ]}
                        >
                          <Input
                            maxLength={50}
                            placeholder="Enter Laptop Name"
                            bordered={false}
                            className="laptopInp"
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12} md={8}>
                        <Form.Item
                          label="Modal Name"
                          initialValue={data?.modalName}
                          name="modalName"
                          // onKeyPress={(event) => {
                          //   if (checkAlphabets(event)) {
                          //     event.preventDefault();
                          //   }
                          // }}
                          rules={[
                            {
                              required: true,

                              message: "Please enter Model Name",
                            },
                            {
                              pattern: /^[a-zA-Z\s]*$/,
                              message: "Please enter Valid Model Name",
                            },
                          ]}
                        >
                          <Input
                            maxLength={30}
                            className="laptopInp"
                            onChange={(e) => {
                              const inputval = e.target.value;
                              const str = e.target.value;
                              const newVal =
                                inputval.substring(0, 1).toUpperCase() +
                                inputval.substring(1);
                              const caps = str
                                .split(" ")
                                .map(capitalize)
                                .join(" ");
                              // setPaidBy(newVal);
                              form.setFieldsValue({
                                modalName: newVal,
                                modalName: caps,
                              });
                            }}
                            placeholder="Enter Model Name"
                            bordered={false}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12} md={8}>
                        <Form.Item
                          label="Serial Number"
                          initialValue={data?.serialNum}
                          name="serialNum"
                          rules={[
                            {
                              required: true,
                              message: "Please enter Serial Number",
                              type: "Website",
                            },
                            {
                              pattern: /[0-9a-zA-Z]/,
                              message: "Please enter Valid Serial Number",
                            },
                          ]}
                        >
                          <Input
                            type="text"
                            maxLength={60}
                            className="laptopInp"
                            onChange={(e) => {
                              const inputval = e.target.value;
                              const str = e.target.value;
                              const newVal =
                                inputval.substring(0, 1).toUpperCase() +
                                inputval.substring(1);
                              const caps = str
                                .split(" ")
                                .map(capitalize)
                                .join(" ");
                              // setPaidBy(newVal);
                              form.setFieldsValue({
                                serialNum: newVal,
                                serialNum: caps,
                              });
                            }}
                            placeholder="Enter Serial Number"
                            bordered={false}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12} md={8}>
                        <Form.Item
                          label="Charger"
                          name="charger"
                          initialValue={data?.charger}
                          rules={[
                            {
                              required: true,
                              message: "Please Choose Yes or No",
                            },
                          ]}
                        >
                          <Select
                            placeholder="Select a Yes or No"
                            className="laptopInp"
                            bordered={false}
                          >
                            <Option value="Yes">Yes</Option>
                            <Option value="No">No</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12} md={8}>
                        <Form.Item
                          label="Date of Issue"
                          initialValue={
                            data?.DoI ? moment(data?.DoI, "DD-MM-YYYY") : null
                          }
                          name="DoI"
                          rules={[
                            {
                              required: false,
                              message: "Please Choose a Date",
                            },
                          ]}
                        >
                          {/* format={dateFormatList} */}
                          <DatePicker
                            format="DD-MM-YYYY"
                            className="laptopDate"
                            // format={dateFormatList}
                            // defaultValue= {dob?moment(dob, "DD-MM-YYYY"):null}
                            onChange={(e) => {
                              setDob(e.format("DD-MM-YYYY"));
                            }}
                            // disabledDate={(e) => disabledDate(e)}
                            value={dob}
                            placeholder="Choose Date"
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12} md={8}>
                        <Form.Item
                          label="Laptop Bag"
                          name="lapBag"
                          initialValue={data?.lapBag}
                          rules={[
                            {
                              required: true,
                              message: "Please Choose Yes or No ",
                            },
                          ]}
                        >
                          <Select
                            placeholder="Select a Yes or No"
                            className="laptopInp"
                            bordered={false}
                          >
                            <Option value="Yes">Yes</Option>
                            <Option value="No">No</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        <Form.Item
                          label="Upload Photo"
                          // initialValue={
                          //     dob ? moment(dob, "DD-MM-YYYY") : null
                          // }
                          name="photo"
                          rules={[
                            {
                              required: false,
                              message: "Please Choose a Date",
                            },
                          ]}
                        >
                          <UploadImage />
                        </Form.Item>
                      </Col>
                    </Row>
                  </>
                ) : Object.keys([data]).length != 0 ? (
                  <>
                    <Row span={24} gutter={[16,16]}>
                      <Col xs={24} sm={12} md={8}>
                        {addButton === false ? (
                          <div className="lapAllot">Laptop Name </div>
                        ) : null}
                        {data ? data?.lapname : null}
                      </Col>
                      <Col xs={24} sm={12} md={8}>
                        {addButton === false ? (
                          <div className="lapAllot">Modal Name </div>
                        ) : null}
                        {data ? data?.modalName : null}
                      </Col>
                      <Col xs={24} sm={12} md={8}>
                        {addButton === false ? (
                          <div className="lapAllot">Serial Number </div>
                        ) : null}
                        {data ? data?.serialNum : null}
                      </Col>
                      <Col xs={24} sm={12} md={8}>
                        {addButton === false ? (
                          <div className="lapAllot">Charger </div>
                        ) : null}
                        {data ? data?.charger : null}
                      </Col>
                      <Col xs={24} sm={12} md={8}>
                        {addButton === false ? (
                          <div className="lapAllot">Date of Issue </div>
                        ) : null}
                        {data ? data?.DoI : null}
                      </Col>
                      <Col xs={24} sm={12} md={8}>
                        {addButton === false ? (
                          <div className="lapAllot">Laptop Bag </div>
                        ) : null}
                        {data ? data?.lapBag : null}
                      </Col>
                    </Row>
                  </>
                ) : null}
                {addButton === true ? (
                  <>
                    <Button
                      type="primary"
                      style={{
                        marginLeft: "10px",
                        background: "#1963a6",
                        border: "1px solid #1963A6",
                      }}
                      onClick={() => {
                        setEditAsset(true);
                        setAddButton(false);
                      }}
                    >
                      <PlusCircleOutlined />
                      Add
                    </Button>
                  </>
                ) : null}

                {editAsset === true ? (
                  <Row gutter={[16, 16]} className="buttonRow">
                    <Col xs={24} sm={8} md={7} lg={6} xl={4} xxl={2}>
                      <Button
                        type="text"
                        style={{ fontSize: 15 }}
                        onClick={() => {
                          setEditAsset(false);
                          setAddButton(true);
                        }}
                      >
                        <CloseOutlined /> CANCEL
                      </Button>
                    </Col>
                    <Col xs={24} sm={8} md={7} lg={6} xl={4} xxl={2}>
                      <Button
                        type="primary"
                        htmlType="submit"
                        style={{
                          // marginLeft: "10px",
                          backgroundColor: "#1963A6",
                          borderColor: "#1963A6",
                          width: "119px",
                        }}
                        onClick={() => {
                          setAddButton(false);
                        }}
                      >
                        <CheckOutlined /> SAVE
                      </Button>
                    </Col>
                  </Row>
                ) : null}
              </Card>
            </Form>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default AllocatedCard;
