import { Button, Card, Col, Form, Input, Modal, Row, Select, message } from "antd";
import "./RepairRequestTable.css";
import { CheckOutlined, CloseOutlined, DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import { capitalize, getBase64 } from "../../contexts/CreateContext";
import React, { useState } from "react";
const { Option } = Select;

const AddAsset = (props) => {
  const [form] = Form.useForm()
  const imgRef = React.useRef(null);
  const [type, setType] = useState("Laptop")
  const [fileName, setFileName] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [isBigFile, setIsBigFile] = useState(false);
  const [visible, setVisible] = useState(true);

  const handleClick = () => {
    imgRef.current.click();
  };

  function checkFileSize(size, fileName) {
    if (Math.round(size / 1024) <= 200) {
      setFileName(fileName);
      setIsBigFile(false);
    } else {
      setFileName(null);
      setIsBigFile(true);
    }
  }

  const handleChange = (event) => {
    if (!event) {
      return;
    }
    const fileUploaded = event.target.files[0];
    getBase64(fileUploaded, (url) => {
      setImageUrl(url);
    });
    checkFileSize(fileUploaded.size, fileUploaded);
  };

  function onReset() {
    setIsBigFile(false);
    setFileName(null);
    setImageUrl("");
  }


  const imgDiv = () => {
    // console.log(fileName, imageUrl);
    if (fileName == "" || fileName == null) {
      <Button className="imgDel" onClick={(e) => handleClick(e)}>
        <input
          className="imgInp"
          style={{
            display: "none",
          }}
          type="file"
          id="logo"
          name="logo"
          ref={imgRef}
          onChange={(e) => handleChange(e)}
        />
        <UploadOutlined /> Upload Photo
      </Button>
    } else {
      return (
        <div
          // className={editContent === false ? "hoverImgCont" : ""}
          style={{
            position: "relative",
            width: "150px",
            height: "170px",
            // border: "1px solid #05445e"
          }}
        >
          <img
            src={imageUrl}
            style={{
              width: "150px",
              height: "170px",
              border: "1px solid #05445e",
            }}
          />
          {/* {editContent === false ? ( */}
          <div className="imageOverlay">
            <DeleteOutlined className="hoverIcon" onClick={onReset} />
            <button onClick={() => setVisible(true)}>Preview Image</button>
            <Modal
              visible={visible}
              onCancel={() => setVisible(false)}
              footer={null}
            >
              <img src={imageUrl} alt="Preview" style={{ width: "100%" }} />
            </Modal>
          </div>
          {/* ) : null} */}
        </div>
      );
    }
  };

  const onFinish = (values) => {
    console.log(values)

  }


  return (
    <div className="personalCardDiv">
      <Row className="Row-Card">
        {/* <Col span={24}> */}
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
            title="Add Asset"
            className="overview"
            hoverable={true}
            bordered={true}
          >
            <Row span={24} gutter={[16, 16]}>
              <Col xs={24} sm={12} md={8}>
                <Form.Item
                  label="Type"
                  name="type"
                  initialValue="Laptop"
                  rules={[
                    {
                      required: true,
                      message: "Select Asset Type",
                    },
                  ]}
                >
                  <Select
                    className="selectFields"
                    onChange={(e) => setType(e)}
                    options={[
                      {
                        label: "Laptop",
                        value: "Laptop"
                      },
                      {
                        label: "Monitor",
                        value: "Monitor"
                      },
                      {
                        label: "Mobile",
                        value: "Mobile"
                      },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Form.Item
                  label="Model Name"
                  name="model"
                  // onKeyPress={(event) => {
                  //   if (checkAlphabets(event)) {
                  //     event.preventDefault();
                  //   }
                  // }}
                  rules={[
                    {
                      required: true,
                      message: "Please Enter Model Name",
                    },
                    {
                      pattern: /^[a-zA-Z0-9\s]*$/,
                      message: "Please Enter Valid Model Name",
                    },
                  ]}
                >
                  <Input
                    maxLength={30}
                    className="inputFields"
                    onChange={(e) => {
                      const str = e.target.value;
                      const caps = str
                        .split(" ")
                        .map(capitalize)
                        .join(" ");
                      form.setFieldsValue({
                        model: caps,
                      });
                    }}
                    placeholder="Enter Model Name"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Form.Item
                  label="Serial Number"
                  name="sn"
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
                      const caps = str
                        .split(" ")
                        .map(capitalize)
                        .join(" ");
                      form.setFieldsValue({
                        sn: caps,
                      });
                    }}
                    placeholder="Enter Serial Number"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Form.Item
                  label={type == "Monitor" ? "Power Supply Cord" : "Charger"}
                  name={type == "Monitor" ? "pwrCord" : "charger"}
                  rules={[
                    {
                      required: true,
                      message: "Please Choose Yes or No",
                    },
                  ]}
                >
                  <Select
                    placeholder="Select"
                    className="selectFields"
                  >
                    <Option value="Yes">Yes</Option>
                    <Option value="No">No</Option>
                  </Select>
                </Form.Item>
              </Col>
              {/* <Col xs={24} sm={12} md={8}>
                          <Form.Item
                            label="Date of Issue"
                            initialValue={
                              data?.dateOfRepair
                                ? moment(data?.dateOfRepair, "DD-MM-YYYY")
                                : null
                            }
                            name="dateOfRepair"
                            rules={[
                              {
                                required: true,
                                message: "Please Choose a Date",
                              },
                            ]}
                          >
                            <DatePicker
                              format="DD-MM-YYYY"
                              className="dateFields"
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
                        </Col> */}
              {type == "Monitor" ? null : (
                <Col xs={24} sm={12} md={8}>
                  <Form.Item
                    label={type == "Laptop" ? "Laptop Bag" : "Mobile Case"}
                    name={type == "Laptop" ? "bag" : "cover"}
                    rules={[
                      {
                        required: true,
                        message: "Please Choose Yes or No ",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Select"
                      className="selectFields"
                    >
                      <Option value="Yes">Yes</Option>
                      <Option value="No">No</Option>
                    </Select>
                  </Form.Item>
                </Col>)}
              <Col
                span={24}
                xs={24}
                sm={24}
                md={7}
                lg={6}
                xl={6}
                xxl={6}
              >
                <Form.Item
                  label="Upload Image"
                  name="upload"
                // rules={[
                //   {
                //     required: true,
                //     message: "Please upload file",
                //   },
                // ]}
                >
                  {isBigFile
                    ? message.error(
                      "File size must be less than 200Kb."
                    )
                    : ""}
                  {imgDiv()}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 16]} className="buttonRow">
              <Col xs={24} sm={8} md={7} lg={6} xl={4} xxl={2}>
                <Button
                  type="text"
                  style={{ fontSize: 15 }}
                //   onClick={() => {
                //     setEditAsset(false);
                //     setAddButton(true);
                //   }}
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
                // onClick={() => {
                //   // setAddButton(true);
                //   setEditAsset(false);
                // }}
                >
                  <CheckOutlined /> SAVE
                </Button>
              </Col>
            </Row>
          </Card>
        </Form>
        {/* </Col> */}
      </Row>
    </div>
  )
}

export default AddAsset