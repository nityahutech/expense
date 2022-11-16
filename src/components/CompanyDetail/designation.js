import React, { useState, useEffect } from "react";
import { Card, Row, Col, Button, Input, Form, Space } from "antd";
import ConfigureContext from "../../contexts/ConfigureContext";
import { CloseOutlined, EditFilled } from "@ant-design/icons";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import "./companystyle.css";
import { Table } from 'antd';
import { getDesigNo } from "../../contexts/CreateContext";

const Designation = () => {
  const [editContent, showEditContent] = useState(false);
  const [editContactInfo, showEditContactInfo] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    let data = await ConfigureContext.getConfigurations("addemployeePage")
    getDesigNo().then((res) => {
      setDataSource(
        data.designations.map((des) => {
          return {
            designation: des,
            employees: res[`${des}`] ? res[`${des}`] : 0
          }
        })
      )
    })
  }

  const columns = [
    {
      title: 'Designation',
      dataIndex: 'designation',
      key: 'designatione',
    },

    {
      title: 'Employees',
      dataIndex: 'employees',
      key: 'employees',
    },
  ];

  const [data, setData]=useState({})
  const onFinish = (values) => {
    console.log('Received values of form:', values);
    showEditContent(false)

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
        <Row
          className="Row-Card"
          style={{
            width: '75%',
            margin: '10px',
            display: 'flex',
            alignItems: 'center'
          }}>
          <Col span={24}>
          <Card
                title="DESIGNATIONS"
                style={{
                  width: '100%',
                  marginTop: 10,
                }}

              >
              Designation           Employees
            </Card>
          {dataSource.map((des) => (
            
              <Card
                // title="DESIGNATIONS"
                extra={
                  <>
                    {editContactInfo === false ? (
                      <Button
                        className="edit"
                        type="text"
                        style={{
                          color: "#4ec0f1",
                          display: "none",
                          paddingTop: "7px",
                          paddingRight: "7px",
                          position: "absolute",
                          right: 10,
                          top: 10,
                        }}
                        onClick={() => showEditContactInfo(!editContactInfo)}
                      >
                        <EditFilled />
                      </Button>
                    ) : null}
                  </>
                }
                style={{
                  width: '100%',
                  marginTop: 10,
                }}

              >


                {/* <div className="table-responsive">
                  <Table
                    columns={columns}
                    dataSource={dataSource}
                    pagination={false}
                    className="ant-border-space"
                  />
                </div> */}
              </Card>
          ))}
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


{console.log(editContent)}

                <Row gutter={[16, 16]} style={{ marginTop: "5%" }}>
                  {/* <Col span={12}> */}
                    <Form {...form} name="dynamic_form_nest_item" autoComplete="off">
                      {editContent  ? (
                        <>
                        <Form.List name="users">
                        {(fields, { add, remove }) => (
                          <div 
                            style={{
                              display: 'flex',
                              flexDirection: "row",
                              flexBasis: "33.33%"
                            }}
                          >
                            {fields.map(({ key, name, ...restField }) => (
                              <Space
                                key={key}
                                style={{
                                  display: 'flex',
                                  marginBottom: 8,
                                  flexDirection: "row"
                                }}
                                align="baseline"
                              >
                              {console.log(fields, name, key, restField)}
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
                                  <Input placeholder="First Name" 
                                    onChange={(e) => {
                                      let temp = { 
                                        ...data,
                                        [`${key}`]: e.target.value
                                      }
                                      setData(temp)
                                    }}/>
                                </Form.Item>

                                <MinusCircleOutlined 
                                  onClick={() => {
                                    delete data[`${key}`]
                                    remove(name)
                                  }} 
                                />
                              </Space>
                            ))}
                            <Form.Item>
                              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                Add field
                              </Button>
                            </Form.Item>
                          </div>
                        )}
                      </Form.List>
                      <Form.Item>
                        <Button type="primary" 
                          onClick={() => {
                            console.log(data)
                            onFinish(data)
                          }}>
                          Submit
                        </Button>
                      </Form.Item>
                      </>
                      ) : (
                      <Form.Item>
                        <Button type="primary" onClick={() => showEditContent(true)}>
                          Add Designations
                        </Button>
                      </Form.Item>
                      )}
                    </Form>
                  {/* </Col> */}
                </Row>
            </Form>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Designation