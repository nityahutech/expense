import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  message,
} from "antd";
import "./RepairRequestTable.css";
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  capitalize,
  getBase64,
  showNotification,
} from "../../contexts/CreateContext";
import React, { useState } from "react";
import AssetContext from "../../contexts/AssetContext";
const { Option } = Select;

function EditAsset(props) {
  const editAssetData = props.editAssetData;
  const [form] = Form.useForm();
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(editAssetData?.file);

  console.log("propssss", editAssetData?.file);

  const onFinish = async (values) => {
    const updateAssetData = {
      ...values,
    };
    console.log(values, editAssetData.id, updateAssetData, file);
    try {
      await AssetContext.updateEmpAsset(
        editAssetData.id,
        updateAssetData,
        file
      );
      setTimeout(() => {
        showNotification("success", "Success", "Edit asset data successfully");
        props.getEmpAssetList();
      }, 2000);
    } catch (error) {
      showNotification("error", "Error", "Failed to edit");
    }
    // AssetContext.updateEmpAsset(editAssetData.id, updateAssetData, file)
    //   .then(() => {
    //     showNotification("success", "Success", "Edit asset data successfully");
    //     props.getEmpAssetList();
    //   })
    //   .catch(() => {
    //     showNotification("error", "Error", "Failed to edit");
    //   });
    props.setEditAssetData(false);
  };

  function onReset() {
    props.setEditAssetData(false);
    form.resetFields();
    // setModalData();
  }

  const handleChange = (event) => {
    let file = event.target.files[0];
    console.log(file);
    setFile(file);
    // setFileName(file.name);
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
  };

  const handleClearFile = () => {
    setFile(null);
    setFileName("");
  };

  return (
    <div className="personalCardDiv">
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
        <Row span={24} gutter={[16, 25]}>
          <Col xs={24} sm={12} md={12}>
            <Form.Item
              label="Asset Type"
              name="assetType"
              initialValue={editAssetData?.assetType}
              rules={[
                {
                  required: true,
                  message: "Select Asset Type",
                },
              ]}
            >
              <Select
                className="selectFields"
                value={editAssetData?.assetType}
                // onChange={(e) => setType(e)}
                options={[
                  {
                    label: "Laptop",
                    value: "Laptop",
                  },
                  {
                    label: "Monitor",
                    value: "Monitor",
                  },
                  {
                    label: "Mobile",
                    value: "Mobile",
                  },
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12}>
            <Form.Item
              label="Modal Name"
              name="modalName"
              initialValue={editAssetData?.modalName}
              // onKeyPress={(event) => {
              //   if (checkAlphabets(event)) {
              //     event.preventDefault();
              //   }
              // }}
              rules={[
                {
                  required: true,
                  message: "Please Enter Modal Name",
                },
                {
                  pattern: /^[a-zA-Z0-9\s]*$/,
                  message: "Please Enter Valid Modal Name",
                },
              ]}
            >
              <Input
                maxLength={30}
                className="inputFields"
                onChange={(e) => {
                  const str = e.target.value;
                  const caps = str.split(" ").map(capitalize).join(" ");
                  form.setFieldsValue({
                    model: caps,
                  });
                }}
                placeholder="Enter Modal Name"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12}>
            <Form.Item
              label="Serial Number"
              name="serialNumber"
              initialValue={editAssetData?.serialNumber}
              rules={[
                {
                  required: true,
                  message: "Please Enter Serial Number",
                },
                {
                  pattern: /[0-9a-zA-Z]/,
                  message: "Please Enter Valid Serial Number",
                },
              ]}
            >
              <Input
                type="text"
                className="inputFields"
                maxLength={60}
                onChange={(e) => {
                  const str = e.target.value;
                  const caps = str.split(" ").map(capitalize).join(" ");
                  form.setFieldsValue({
                    sn: caps,
                  });
                }}
                placeholder="Enter Serial Number"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12}>
            <Form.Item
              label={
                editAssetData?.assetType == "Monitor"
                  ? "Power Supply Cord"
                  : "Charger"
              }
              name={
                editAssetData?.assetType == "Monitor" ? "pwrCord" : "charger"
              }
              rules={[
                {
                  required: true,
                  message: "Please Choose Yes or No",
                },
              ]}
              initialValue={
                editAssetData?.assetType == "Monitor"
                  ? editAssetData?.pwrCord
                  : editAssetData?.charger
              }
            >
              <Select placeholder="Select" className="selectFields">
                <Option value="Yes">Yes</Option>
                <Option value="No">No</Option>
              </Select>
            </Form.Item>
          </Col>

          {editAssetData?.assetType == "Monitor" ? null : (
            <Col xs={24} sm={12} md={12}>
              <Form.Item
                label={
                  editAssetData?.assetType == "Laptop"
                    ? "Laptop Bag"
                    : "Mobile Case"
                }
                name={editAssetData?.assetType == "Laptop" ? "bag" : "cover"}
                rules={[
                  {
                    required: true,
                    message: "Please Choose Yes or No ",
                  },
                ]}
                initialValue={
                  editAssetData?.assetType == "Laptop"
                    ? editAssetData?.bag
                    : editAssetData?.cover
                }
              >
                <Select placeholder="Select" className="selectFields">
                  <Option value="Yes">Yes</Option>
                  <Option value="No">No</Option>
                </Select>
              </Form.Item>
            </Col>
          )}
          <Col xs={24} sm={12} md={12}>
            <Form.Item
              label="Upload Image"
              name="upload"
              rules={[
                {
                  required: true,
                  message: "Please upload file",
                },
              ]}
            >
              <div className="idpage">
                {/* <Input
                  value={fileName}
                  readOnly
                  addonAfter={<Button onClick={handleClearFile}>Clear</Button>}
                />
                <input
                  type="file"
                  onChange={handleChange}
                  //   style={{ display: "none" }}
                /> */}

                <input
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
        </Row>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "12px",
          }}
        >
          <Button type="text" style={{ fontSize: 15 }} onClick={onReset}>
            <CloseOutlined /> CANCEL
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              // marginLeft: "10px",
              backgroundColor: "#1963A6",
              borderColor: "#1963A6",
              width: "119px",
            }}
            // onClick={() => {
            //   // setAddButton(true);
            //   setEditAsset(false);
            // }}
          >
            <CheckOutlined /> SAVE
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default EditAsset;
