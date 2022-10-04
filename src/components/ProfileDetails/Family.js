import React, { useState, useEffect } from "react";
import {  useAuth } from "../../contexts/AuthContext"
import EmpInfoContext from "../../contexts/EmpInfoContext";
import {
  Card,
  Row,
  Col,
  Input,
  Button,
  DatePicker,
  Select,
  Form,
  Divider,
} from "antd";
import {
  PlusCircleOutlined,
  EditOutlined,
  CheckOutlined,
  EditTwoTone,
  CloseOutlined,
} from "@ant-design/icons";
// ----------------------------------------------------------------------------
const { TextArea } = Input;
const { Option } = Select;
const Family = () => {
  const [editContent, showEditContent] = useState(false);
  const [editContentInfo, showEditContentInfo] = useState(false);
  const [data, setData] = useState(false);
  const [form] = Form.useForm();
  const { currentUser } = useAuth()
  const onFinish = (values) => {
    console.log(values)
    // console.log('Success:',record);
    EmpInfoContext.updateEduDetails(currentUser.uid,values)
    setData(values)
    showEditContent(false)
    getData();
  };
  const onContactFinish = (newvalue) => {
    // console.log(contactdata)
    console.log(newvalue);
    console.log('success',newvalue)
    EmpInfoContext.updateEduDetails(currentUser.uid,newvalue)     
     setData(newvalue)
     showEditContentInfo(false)
  }
  useEffect(()=>{
    getData();
    
  },[]);
  const getData=async()=>{
    let data = await EmpInfoContext.getEduDetails(currentUser.uid)
    console.log(data)
    setData(data)
  }
  console.log(data)
  

  return (
    <div
      className="personalCardDiv"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "15px",
      }}
    >
      <Form
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
        {/* ----------------------------------------------------------------------------------------------- */}
        <Card
          title="FAMILY MEMBERS"
          extra={
            <>
              {editContent === false ? (
                <Button
                  type="text"
                  style={{ color: "#4ec0f1" }}
                  onClick={() => showEditContent(!editContent)}
                >
                  Edit
                </Button>
              ) : null}
            </>
          }
          style={{
            width: 800,
            marginTop: 10,
          }}
        >
          <Row gutter={[16, 16]}>
            {/* ------------------------------------father */}
            <Col span={12}>
              <Form.Item
              
                name="father"
                rules={[
                  { required: true, message: "Please enter the Contact no." },
                ]}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 32 }}
              >
                <div>
                  <h1 style={{ fontWeight: "bold", fontSize: "15px" }}>
                    Father
                  </h1>
                  {editContent === false ? (
                    <h4>{data?data.father:null}</h4>
                  ) : (
                    <Input defaultValue = {data?.father} placeholder="Enter Father's Name"  />)}
                    </div>
              </Form.Item>
            </Col>
            {/* ---------------------------------------father contact */}
            <Col span={12}>
              <Form.Item
                name="fatherContact"
                rules={[
                  {
                    required: true,
                    message: "Please enter the Contact no.",
                  },
                ]}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 32 }}
              >
                <div>
                  <h1 style={{ fontWeight: "bold", fontSize: "15px" }}>
                    Contact no.
                  </h1>
                  {editContent === false ? (
                    <h4>{data?data.fatherContact:null}</h4>
                  ) : (
                    <Input placeholder="Enter Contact no." />) }
                </div>
              </Form.Item>
              {/* ---------------------------------------------------------------Mother */}
            </Col>
            <Col span={12}>
              <Form.Item
                name="mother"
                rules={[
                  { required: true, message: "Please enter Mother's Name" },
                ]}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 32 }}
              >
                <div>
                  <h1 style={{ fontWeight: "bold", fontSize: "15px" }}>
                    Mother
                  </h1>
                  {editContent === false ? (
                    <h4>{data?data.mother:null}</h4>
                  ) : (
                    <Input placeholder="Enter Mother's Name" />) }
                </div>
              </Form.Item>
            </Col>
            {/* ---------------------------------------------mother Contact */}
            <Col span={12}>
            <Form.Item
                name="motherContact"
                rules={[
                  {
                    required: true,
                    message: "Please enter the Contact no.",
                  },
                ]}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 32 }}
              >
                <div>
                  <h1 style={{ fontWeight: "bold", fontSize: "15px" }}>
                    Contact no.
                  </h1>
                  {editContent === false ? (
                    <h4>{data?data.motherContact:null}</h4>
                  ) : (
                    <Input placeholder="Enter Contact no."  /> ) }
                </div>
              </Form.Item>
            </Col>
            {/* <div
              className="div-add-button"
              style={{ color: "rgb(78, 192, 241)" }}
            >
              <PlusCircleOutlined
                style={{ color: "rgb(78, 192, 241)", marginRight: "5px" }}
                onClick={handleAdd}
              />
              Add
            </div> */}
          </Row>
          {editContent === true ? (
            <Row
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "3%",
              }}
            >
              <Button
                onClick={() => showEditContent(false)}
                type="text"
                style={{
                  fontSize: 15,
                }}
              >
                <CloseOutlined />
                CANCEL
              </Button>
              <Col>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginLeft: "10px" }}
                >
                  <CheckOutlined />
                  SAVE
                </Button>
              </Col>
            </Row>
          ) : null}
        </Card>
        {/* -------------------------------------------------------------------------- CARD-2 -------------------------------- */}
        <Card
          title="EMERGENCY CONTACTS"
          //   actions={[
          //   <EditOutlined key="edit" />,
          // ]}
          extra={
            <>
              {editContent === false ? (
                <Button
                  type="text"
                  style={{ color: "#4ec0f1" }}
                  onClick={() => showEditContentInfo(!editContentInfo)}
                >
                  Edit
                </Button>
              ) : null}
            </>
          }
          style={{
            width: 800,
            marginTop: 10,
          }}
        >
          <Row gutter={[16, 16]}>
            {/* -----------------------------------------------Other */}
            <Col span={8}>
            <Form.Item
                name="other"
                rules={[
                  {
                    required: true,
                    message: "Please enter the Name",
                  },
                ]}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 32 }}
              >
                <div>
                  <h1 style={{ fontWeight: "bold", fontSize: "15px" }}>
                    Other
                  </h1>
                  {editContentInfo === false ? (
                    <h4>{data?data.other:null}</h4>
                  ) : (
                    <Input placeholder="Enter Other Name" /> ) }
                </div>
              </Form.Item>
            </Col>
            {/* --------------------------------------------------------------Relation */}
            <Col span={8}>
            <Form.Item
                name="relation"
                rules={[
                  {
                    required: true,
                    message: "Please enter the Relation",
                  },
                ]}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 32 }}
              >
                <div>
                  <h1 style={{ fontWeight: "bold", fontSize: "15px" }}>
                    Relation
                  </h1>
                  {editContentInfo === false ? (
                    <h4>{data?data.relation:null}</h4>
                  ) : (
                    <Input placeholder="Enter the Relation" /> ) }
                </div>
              </Form.Item>
            </Col>
          {/* -------------------------------------------------Other contact */}
            <Col span={8}>
            <Form.Item
                name="otherContact"
                rules={[
                  {
                    required: true,
                    message: "Please enter the Contact no.",
                  },
                ]}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 32 }}
              >
                <div>
                  <h1 style={{ fontWeight: "bold", fontSize: "15px" }}>
                    Contact no.
                  </h1>
                  {editContentInfo === false ? (
                    <h4>{data?data.otherContact:null}</h4>
                  ) : (
                    <Input placeholder="Enter Contact no." /> ) }
                </div>
              </Form.Item>
            </Col>
            {/* <div
              className="div-add-button"
              style={{ color: "rgb(78, 192, 241)" }}
            >
              <PlusCircleOutlined
                style={{ color: "rgb(78, 192, 241)", marginRight: "5px" }}
              />
              Add
            </div> */}
          </Row>
          {editContentInfo === true ? (
            <Row
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "3%",
              }}
            >
              <Button
                type="text"
                style={{ fontSize: 15 }}
                onClick={() => showEditContentInfo(false)}
              >
                <CloseOutlined />
                CANCEL
              </Button>
              <Col>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginLeft: "10px" }}
                  onClick={() => onContactFinish()}
                >
                  <CheckOutlined />
                  SAVE
                </Button>
              </Col>
            </Row>
          ) : null}
        </Card>
        {/* ------------------------------------------------------------------------------------------------------ */}
      </Form>
    </div>
  );
};
export default Family;