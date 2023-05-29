import React from "react";
import "./RepairRequestTable.css";
import {
  Row,
  Form,
  Card,
  Button,
  Input,
  Select,
  Divider,
  Space,
  Col,
} from "antd";
import {
  PlusCircleOutlined,
  CloseOutlined,
  CheckOutlined,
  MinusCircleOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";

function AssetConfig() {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card
        title="Configuration"
        className="configCard"
        hoverable={true}
        bordered={true}
      >
        <h3>Configure characterstics of the employee assets</h3>
        <Form layout="horizontal">
          <Form.List name="fields" style={{ marginTop: "20px" }}>
            {(fields, { add, remove }) => {
              return (
                <div>
                  {fields.map((field, index) => (
                    <div
                      key={field.key}
                      style={{
                        marginTop: "30px",
                      }}
                    >
                      <Row gutter={[60, 0]}>
                        <Col xs={24} sm={20} md={8}>
                          <Form.Item
                            name={[index, "label"]}
                            // label={"Question" + (index + 1)}
                            // className="que1"
                          >
                            <Input placeholder="Enter Label" />
                          </Form.Item>
                        </Col>
                        <Col xs={24} sm={20} md={8}>
                          <Form.Item name={[index, "asssetType"]}>
                            <Select
                              placeholder="Select Type"
                              options={[
                                {
                                  value: "Yes/No Field",
                                  label: "Yes/No Field",
                                },
                                {
                                  value: "Input Field",
                                  label: "Input Field",
                                },
                              ]}
                            />
                          </Form.Item>
                        </Col>
                        <Col xs={24} sm={20} md={8}>
                          {fields.length ? (
                            <Button
                              // type="danger"
                              onClick={() => remove(field.name)}
                              style={{ border: "none" }}
                            >
                              <MinusCircleOutlined
                                style={{ fontSize: "16px" }}
                                // className="minusRemove"
                              />
                            </Button>
                          ) : null}
                        </Col>
                      </Row>
                    </div>
                  ))}

                  <Form.Item>
                    <Button
                      className="addConfig"
                      // type="dashed"
                      onClick={() => add()}
                    >
                      <PlusCircleOutlined classID="iconConfig" />
                      Add
                    </Button>
                  </Form.Item>
                </div>
              );
            }}
          </Form.List>
        </Form>
      </Card>
    </div>
  );
}

export default AssetConfig;
