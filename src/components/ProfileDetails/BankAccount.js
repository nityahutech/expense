import React, { useState,useEffect } from "react";
//import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import EmpInfoContext from "../../contexts/EmpInfoContext";
import {
  Card,
  Row,
  Col,
  Divider,
  Input,
  Button,
  Space,
  DatePicker,
  Select,
  Form,
} from "antd";
import { EditOutlined, CloseOutlined } from "@ant-design/icons";
const { TextArea } = Input;
const { Option } = Select;

function BankAccount() {
  const [editContent, showEditContent] = useState(false);
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [data, setData] = useState([]);
  //const [bankName, setBankName] = useState(""); 
  //const [accountNumber, setAccountNumber] = useState("");
  const { currentUser } = useAuth()
  const onFinish = () => {
    console.log(data)
    console.log(bankName, accountNumber, ifscCode)
    //console.log('Success:', values);
    let record = {
      ...data,
        bankName: bankName,
      accountNumber: accountNumber,
      ifscCode:ifscCode,
      //bankName:bankName?bankName:null
    }
    console.log('Success:', record);
    EmpInfoContext.updateEduDetails(currentUser.uid,record)
    setData(record)
    showEditContent(false)
    getData();
  };
  useEffect(()=>{
    getData();
    
  },[]);
  const getData=async()=>{
    let data=await EmpInfoContext.getEduDetails(currentUser.uid)
    console.log(data)
    setData(data)
    setBankName(data.bankName?data.bankName:null)
    setAccountNumber(data.accountNumber?data.accountNumber:null)
    setIfscCode(data.ifscCode?data.ifscCode:null)
  }
  console.log(data)
  return (
    <div
      className="personalCardDiv"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        title="Bank Account Details"
        //   actions={[
        //   <EditOutlined key="edit" />,
        // ]}
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
          <Col span={10}>
            <div>
              <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                Bank Name
              </div>
              {editContent === false ? (
                <div>{data?data.bankName:null}</div>
              ) : (
               <Input  placeholder="Enter Bank Name" onChange={(e)=>{setBankName(e.target.value)}
              } />
             )}
            </div>
          </Col>
          <Col span={10}>
            <div>
              <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                Account Number
              </div>
              {editContent === false ? (
                <div>{data?data.accountNumber:null}</div>
              ) : (
                <Input placeholder="Enter Account Number" onChange={(e)=>{setAccountNumber(e.target.value)}} />
              )}
            </div>
          </Col>
          <Col span={10}>
            <div>
              <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                IFSC Code
              </div>
              {editContent === false ? (
                <div>{data?data.ifscCode:null}</div>
              ) : (
                <Input placeholder="Enter IFSC Code" onChange={(e)=>{setIfscCode(e.target.value)}} />
              )}
            </div>
          </Col>
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
              style={{ fontSize: 15 }}
            >
              <CloseOutlined /> CANCEL
            </Button>
            <Col>
              <Button type="primary" htmlType="submit" style={{ marginLeft: "10px" }}  onClick={() => onFinish()}>
                SAVE
              </Button>
            </Col>
          </Row>
        ) : null}
      </Card>
    </div>
  );
}

export default BankAccount;
