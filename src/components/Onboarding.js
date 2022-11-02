import React, { useState } from "react";
import {
  Form,
  Tabs,
  Input,
  Col,
  Row,
  Divider,
  message,
  Upload,
  Button,
} from "antd";
import {
  LoadingOutlined,
  PlusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import "../style/Onboarding.css";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

function Onboarding() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  return (
    <div>
      <Tabs
        defaultActiveKey="1"
        // onChange={onChange}
      >
        <Tabs.TabPane tab="Organization Onboarding" key="1">
          <div style={{ background: "#fff", margin: "0px 15px 0px 15px" }}>
            <div style={{ margin: "13px", background: "#fff" }}>
              <div style={{ paddingTop: "13px" }}>ORGANIZATION DETAILS</div>
              <Divider />
              <Form
                style={{ margin: "30px" }}
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
                // onFinish={onFinish}
              >
                <Row gutter={[24, 8]}>
                  <Col xs={22} sm={15} md={8}>
                    <Form.Item
                      name="orgcode"
                      label="Organization Code"
                      rules={[
                        {
                          required: true,

                          message: "Please enter Organization Code",
                        },
                        {
                          pattern: /^[a-zA-Z\s]*$/,
                          message: "Please enter Valid Name",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Organization Code"
                        style={{
                          border: "1px solid #8692A6",
                          borderRadius: "4px",
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={22} sm={15} md={8}>
                    <Form.Item name="orgname" label="Organization Name">
                      <Input
                        placeholder="Organization Name"
                        style={{
                          border: "1px solid #8692A6",
                          borderRadius: "4px",
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={22} sm={15} md={8}>
                    <Form.Item name="cinnumber" label="CIN Number">
                      <Input
                        placeholder="CIN Number"
                        style={{
                          border: "1px solid #8692A6",
                          borderRadius: "4px",
                        }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={[24, 8]}>
                  <Col xs={22} sm={15} md={8}>
                    <Form.Item name="gstnumber" label="GST Number">
                      <Input
                        placeholder="GST Number"
                        style={{
                          border: "1px solid #8692A6",
                          borderRadius: "4px",
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={22} sm={15} md={8}>
                    <Form.Item name="domname" label="Domain Name">
                      <Input
                        placeholder="Domain Name"
                        style={{
                          border: "1px solid #8692A6",
                          borderRadius: "4px",
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={22} sm={15} md={8}>
                    <Form.Item name="address1" label="Address Line1">
                      <Input
                        placeholder="Address Line1"
                        style={{
                          border: "1px solid #8692A6",
                          borderRadius: "4px",
                        }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={[24, 8]}>
                  <Col xs={22} sm={15} md={8}>
                    <Form.Item name="address2" label="Address Line2">
                      <Input
                        placeholder="Address Line2"
                        style={{
                          border: "1px solid #8692A6",
                          borderRadius: "4px",
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={22} sm={15} md={8}>
                    <Form.Item name="phone" label="Phone">
                      <Input
                        placeholder="Phone"
                        style={{
                          border: "1px solid #8692A6",
                          borderRadius: "4px",
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={22} sm={15} md={8}>
                    <Form.Item name="city" label="City">
                      <Input
                        placeholder="City"
                        style={{
                          border: "1px solid #8692A6",
                          borderRadius: "4px",
                        }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={[24, 8]}>
                  <Col xs={22} sm={15} md={8}>
                    <Form.Item name="state" label="State">
                      <Input
                        placeholder="State"
                        style={{
                          border: "1px solid #8692A6",
                          borderRadius: "4px",
                        }}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={22} sm={15} md={4}>
                    <Form.Item name="pincode" label="Pin Code">
                      <Input
                        placeholder="Pin Code"
                        style={{
                          border: "1px solid #8692A6",
                          borderRadius: "4px",
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={22} sm={15} md={4}>
                    <Form.Item name="country" label="Country">
                      <Input
                        placeholder="Country"
                        style={{
                          border: "1px solid #8692A6",
                          borderRadius: "4px",
                        }}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={22} sm={8}>
                    <div
                      style={{
                        border: "dashed",
                        borderWidth: "thin",
                        borderColor: "#e4dddd",
                        paddingLeft: "25px",
                        paddingTop: "8px",
                        borderRadius: "4px",
                      }}
                    >
                      <Upload
                        className="upload"
                        name="avatar"
                        listType="picture-card"
                        showUploadList={false}
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        beforeUpload={beforeUpload}
                        onChange={handleChange}
                      >
                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt="avatar"
                            style={{
                              width: "100%",
                            }}
                          />
                        ) : (
                          uploadButton
                        )}
                      </Upload>
                    </div>
                  </Col>
                </Row>
              </Form>
            </div>

            <Divider />
            <div>
              <div>Organization Access</div>
              <Divider />
              <div>
                <Button>
                  <PlusCircleOutlined /> Add User
                </Button>
              </div>
            </div>
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="View All Organization" key="2"></Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default Onboarding;
