import React, { useState, useEffect } from "react";
import { Card, Row, Col, Button, Select, Input, Form, Divider, Space, Upload } from "antd";
// import EmpInfoContext from "../../contexts/EmpInfoContext";
import { useAuth } from "../../contexts/AuthContext";
import { CloseOutlined, EditFilled } from "@ant-design/icons";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import "./companystyle.css";

import { Table } from 'antd';
const { Option } = Select;

const { TextArea } = Input;


const Department = () => {
  const [editContent, showEditContent] = useState(false);
  const [editContactInfo, showEditContactInfo] = useState(false);
  const [dob, setDob] = useState("");
  const [scrs, setScrs] = useState("");
  const [lccs, setLccs] = useState("");
  const [editAddressInfo, showEditAddressInfo] = useState(false);
  const [data, setData] = useState([]);
  const { currentUser } = useAuth();



  const [dataSource, setDataSource] = useState([
    {
      key: '0',
      department: 'Edward King 0',
      subDepartments: '32',
      employees: 'London, Park Lane no. 0',
    },
    {
      key: '0',
      department: 'Edward King 0',
      subDepartments: '32',
      employees: 'London, Park Lane no. 0',
    },
  ]);
  const [count, setCount] = useState(2);

  const columns = [
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
    },

    {
      title: '	Sub Departments',
      dataIndex: 'subDepartments',
      key: 'subDepartments',
    },

    {
      title: 'Employees',
      dataIndex: 'employees',
      key: 'employees',
    },
  ];

  const handleAdd = () => {
    const newData = {
      key: count,
      name: `Edward King ${count}`,
      age: '32',
      address: `London, Park Lane no. ${count}`,
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };


  const onFinish = (values) => {
    console.log('Received values of form:', values);


  };
  return (
    <>

      <div
        className="personalCardDiv"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Form
          // form={form}
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
        // onFinish={onContactFinish}
        >
          <Card
            title=" DEPARTMENT"
            extra={
              <>
                {editContactInfo === false ? (
                  <Button
                    type="text"
                    style={{ color: "#4ec0f1" }}
                    onClick={() => showEditContactInfo(!editContactInfo)}
                  >
                    <EditFilled />
                  </Button>
                ) : null}
              </>
            }
            style={{
              width: 800,
              marginTop: 10,
            }}

          >

            <div className="table-responsive">
              <Table
                columns={columns}
                dataSource={dataSource}
                pagination={false}
                className="ant-border-space"
              />
            </div>




            <Row gutter={[16, 16]} style={{ marginTop: "5%" }}>
              <Col span={12}>
                <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
                  <Form.List name="users">
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, ...restField }) => (
                          <Space
                            key={key}
                            style={{
                              display: 'flex',
                              marginBottom: 8,
                            }}
                            align="baseline"
                          >
                            <Form.Item
                              {...restField}
                              name={[name, 'first']}
                              rules={[
                                {
                                  required: true,
                                  message: 'Missing first name',
                                },
                              ]}
                            >
                              <Input placeholder="First Name" />
                            </Form.Item>

                            <MinusCircleOutlined onClick={() => remove(name)} />
                          </Space>
                        ))}
                        <Form.Item>
                          <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                            Add field
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                  <Button
                    onClick={handleAdd}
                    type="primary"
                    style={{
                      marginBottom: 16,
                    }}
                  >
                    Add a row
                  </Button>
                </Form>
              </Col>




            </Row>



            {editContactInfo === true ? (
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
                  onClick={() => showEditContactInfo(false)}
                >
                  <CloseOutlined /> CANCEL
                </Button>
                <Col>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ marginLeft: "10px" }}
                  >
                    SAVE
                  </Button>
                </Col>
              </Row>
            ) : null}
          </Card>
        </Form>
      </div>
    </>
  )
}

export default Department