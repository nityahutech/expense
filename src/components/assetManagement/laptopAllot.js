import { React, useState } from "react";
import "./LaptoAllot.css";
import {
  Card,
  Button,
  Row,
  Col,
  Form,
  Input,
  Modal,
  TextArea,
  Upload,
  Select,
  Option,
  Space,
} from "antd";
import { EditFilled, LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import FormItem from "antd/es/form/FormItem";

function LaptopAllot() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const { TextArea } = Input;
  const { Option } = Select;

  const uploadButton = (
    <div>
      <PlusOutlined />
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
    <>
      <div className="laptopDiv">
        <Card
          title="Laptop Allortment"
          className="laptopcard"
          extra={
            <>
              <Button
                className="edit"
                type="text"
                onClick={showModal}
                // onClick={() => showEditCompanyInfo(!editContactInfo)}
              >
                <EditFilled />
              </Button>
            </>
          }
          bordered={true}
          hoverable={true}
        >
          <Form layout="vertical">
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <FormItem label="Laptop Name">
                  <Input />
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem label="Model">
                  <Input />
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem label="Serial Number">
                  <Input />
                </FormItem>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="location"
                  label="Laptop Bag"
                  rules={[
                    {
                      required: true,
                      message: "Please enter Location",
                    },
                    {
                      message: "Please enter Valid Location",
                    },
                  ]}
                >
                  <Select
                    placeholder="Select a Yes or No"
                    options={[
                      {
                        value: "Yes",
                        label: "Yes",
                      },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <FormItem label="Date of issue">
                  <Input />
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem label="Laptop Bag">
                  <Input />
                </FormItem>
              </Col>
              <Col span={24}>
                <FormItem label="Upload photos of Lptop front and back">
                  <Upload listType="picture-card">{uploadButton}</Upload>
                </FormItem>
              </Col>
              <Col span={24}>
                <FormItem label="Remark">
                  <TextArea
                    rows={4}
                    placeholder="maxLength is 6"
                    maxLength={60}
                    autoSize={{ minRows: 2, maxRow: 4 }}
                  />
                </FormItem>
              </Col>
            </Row>
            <Row gutter={[24, 16]}>
              <Col classsname="gutter-row" span={9}></Col>
              <Col classsname="gutter-row">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    marginRight: "94px",
                  }}
                >
                  <Space>
                    <Form.Item>
                      <Button
                        style={{
                          border: "1px solid #1565D8",
                          color: "#1565D8",
                          fontWeight: "600",
                          fontSize: "14px",
                          lineHeight: "17px",
                          width: "99px",
                          marginTop: "10px",
                          cursor: "pointer",
                        }}
                        // onClick={onReset}
                      >
                        Reset
                      </Button>
                    </Form.Item>
                    <Form.Item>
                      <Button
                        style={{
                          border: "1px solid #1565D8",
                          background: "#1565D8",
                          color: "#FFFFFF",
                          fontWeight: "600",
                          fontSize: "14px",
                          lineHeight: "17px",
                          width: "99px",
                          marginTop: "10px",
                          cursor: "pointer",
                          marginLeft: "17px",
                        }}
                        htmlType="submit"
                      >
                        Submit
                      </Button>
                    </Form.Item>
                  </Space>
                </div>
              </Col>
            </Row>
          </Form>
        </Card>
        <Modal
          title="Laptop Allotment Form"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <FormItem label="Form Type">
            <Select
              placeholder="Select a Yes or No"
              defaultValue="lucy"
              options={[
                {
                  value: "Laptop Allortment",
                  label: "Laptop Allortment",
                },
                {
                  value: "Repair Request",
                  label: "Repair Request",
                },
                {
                  value: "",
                  label: "Yes",
                },
              ]}
            />
          </FormItem>
        </Modal>
      </div>
    </>
  );
}

export default LaptopAllot;
