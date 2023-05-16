import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  message,
  Row,
  Col,
  Input,
  Form,
  Space,

} from "antd";

import "../RepairRequest.css";
import "../RepairRequestTable.css";
import RequestContext from "../../../contexts/RequestContext";
import { showNotification } from "../../../contexts/CreateContext";

const { TextArea } = Input;

const divStyle = {
  border: "1px solid #8692A6",
  borderRadius: "4px",
  width: "100%",
};


const EditLaptopRepair = (props) => {

  console.log("RepairRequestTable props::,", props);
  const [repairLaptopData, setRepairLaptopData] = useState(props?.data);
  const [modalData, setModalData] = useState({});
  const [form1] = Form.useForm();
  const [file, setFile] = useState("");


  const onFinish = (values) => {
    const updateData = {
      data: {
        repairDes: values.repairDes,
      }
    };
    console.log('updateData', updateData, file)

    RequestContext.updateRepairData(props.data.id, updateData, file)
      .then(() => {
        showNotification("success", "Success", "Edit Successful");
        props.getData();
      })
      .catch(() => {
        showNotification("error", "Error", "Failed to edit");
      });

    props.setEditData(false);
  };

  function onReset() {
    props.setEditData(false);
    form1.resetFields();
    setModalData();
  }

  function handleChange(event) {
    let file = event.target.files[0];
    setFile(null);
    const isPNG = file.type === "image/png";
    if (!isPNG) {
      message.error("You can only upload Png file!");
      return;
    }

    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("File must smaller than 2MB!");
      return;
    }
    setFile(event.target.files[0]);
  }
  return (
    <Form
      className="addEmp"
      form={form1}
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
          <Form.Item
            initialValue={repairLaptopData?.data?.repairDes}
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
              rows={4}
              maxLength={100}
              autoSize={{ minRows: 4, maxRows: 4 }}
              placeholder="Max 100 Words"
              style={divStyle}
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            name="photoreapir"
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
          </Form.Item>
        </Col>
        <Col span={24}>
          <div
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              marginRight: "4px",
              marginTop: "15px",
            }}
          >
            <Space>
              <Button
                style={{
                  border: "1px solid #1963a6",
                  color: "#1963a6",
                  fontWeight: "600",
                  fontSize: "14px",
                  lineHeight: "17px",
                  width: "99px",
                }}
                onClick={onReset}
              >
                CANCEL
              </Button>

              <Button
                style={{
                  border: "1px solid #1963a6",
                  background: "#1963a6",
                  color: "#ffffff",
                  fontWeight: "600",
                  fontSize: "14px",
                  lineHeight: "17px",
                  width: "99px",
                }}
                htmlType="submit"
              >
                SAVE
              </Button>
            </Space>
          </div>
        </Col>
      </Row>
    </Form>
  )
}

export default EditLaptopRepair