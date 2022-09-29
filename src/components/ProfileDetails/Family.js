import React, { useState } from "react";
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
} from "@ant-design/icons";

const { TextArea } = Input;
const { Option } = Select;


const Education = () => {

  const [editContent, showEditContent] = useState(false);
  const [form] = Form.useForm();
  const [editContactInfo, showEditContactInfo] = useState(false);
  const [newData, setnewData] = useState();


  const onFinish = (values) => {


    console.log('Success: holiday',);

    let addProfile = {
      name: values.familyname,
      name: values.relationname,
      name: values.dateofbirths,
      name: values.dependent,
    }
    console.log('addProfile', addProfile)


  }

  const handleOk = () => {
    console.log('hiii')

  };

  const handleAdd = () => {
    console.log('yeeee')

    const newData = {

      familyname: '',
      relationname: '',
      dateofbirths: '',
      dependent: '',
    };
  };


  return (
    <div
      className="personalCardDiv"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: '15px'
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

            <Col span={6}>
              <div>
                <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                  Name
                </div>
                <Divider style={{width:'400px'}}/>

                {editContent === false ? (
                  <div>Mahesh</div>
                ) : (
                  <Form.Item
                    name="familyname"

                  >
                    <Input required placeholder="Enter Family Member Name" />
                  </Form.Item>
                )}
              </div>
            </Col>
            

            <Col span={6}>
              <div>
                <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                  RelationShip
                </div>
                {/* <Divider/> */}
                {editContent === false ? (
                  <div>Father</div>
                ) : (
                  <Form.Item
                    name="relationname"

                  >
                    <Input required placeholder="Enter Family Member Relation" />
                  </Form.Item>
                )}
              </div>
            </Col>

            <Col span={6}>
              <div>
                <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                  Date of Birth
                </div>
                {/* <Divider/> */}
                {editContent === false ? (
                  <div>02/05/22</div>
                ) : (
                  <Form.Item
                    className="numder-inputs"
                    name="dateofbirths"
                    rules={[
                      {
                        required: true,
                        message: "Please enter D.O.B",
                        // pattern: /^[0-9\b]+$/,
                      },
                      { whitespace: true },
                    ]}
                  >
                    <Input
                      maxLength={10}
                      required
                      placeholder="Enter Date of Birth"
                    />
                  </Form.Item>
                )}
              </div>
            </Col>

            <Col span={6}>
              <div>
                <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                  Dependent
                </div>
                {/* <Divider /> */}
                {editContent === false ? (
                  <div>Yes</div>
                ) : (
                  <Form.Item
                    name="dependent"

                  >
                    <Input required placeholder="Enter Family Member Relation" />
                  </Form.Item>
                )}
              </div>
            </Col >


            {/* <Col span={4}>
              <div>
                <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                  Action
                </div>
                {editContent === false ? (
                  <div>Yes</div>
                ) : (
                  <Form.Item
                    name="dependent"

                  >

                    <EditOutlined />


                  </Form.Item>
                )}
              </div>
            </Col >
 */}

        
            <div className="div-add-button" style={{ color: 'rgb(78, 192, 241)', }}>
              <PlusCircleOutlined style={{ color: 'rgb(78, 192, 241)', marginRight: '5px' }}
                onClick={handleAdd}

              />Add


            </div>

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
                style={{ fontSize: 15, backgroundColor: 'grey', color: 'white' }}
              >
                {/* <CloseOutlined />  */}
                CANCEL
              </Button>
              <Col>
                <Button type="primary" style={{ marginLeft: "10px" }}
                  onClick={handleOk}

                >
                  SAVE
                </Button>
              </Col>
            </Row>
          ) : null}
        </Card>



        <Card
          title="EMERGENCY CONTACT"
          //   actions={[
          //   <EditOutlined key="edit" />,
          // ]}
          extra={
            <>
              {editContent === false ? (
                <Button
                  type="text"
                  style={{ color: "#4ec0f1" }}
                  onClick={() => showEditContactInfo(!editContactInfo)}
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

            <Col span={8}>
              <div>
                <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                  Name
                </div>

                {editContactInfo === false ? (
                  <div>Mahesh</div>
                ) : (
                  <Form.Item
                    name="emergencycontact"

                  >
                    <Input required placeholder="Enter Family Emergency Contact" />
                  </Form.Item>
                )}
              </div>
            </Col>

            <Col span={8}>
              <div>
                <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                  RelationShip
                </div>
                {editContactInfo === false ? (
                  <div>Father</div>
                ) : (
                  <Form.Item
                    name="relation"

                  >
                    <Input required placeholder="Enter Family Member Relation" />
                  </Form.Item>
                )}
              </div>
            </Col>

            <Col span={8}>
              <div>
                <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                  Phone No.
                </div>
                {editContactInfo === false ? (
                  <div>2221735</div>
                ) : (
                  <Form.Item
                    className="numder-inputs"
                    name="phonenumber"
                    rules={[
                      {
                        required: true,
                        message: "Please enter Phone Number",
                        // pattern: /^[0-9\b]+$/,
                      },
                      { whitespace: true },
                    ]}
                  >
                    <Input
                      maxLength={10}
                      required
                      placeholder="Enter Date of Phone Number"
                    />
                  </Form.Item>
                )}
              </div>
            </Col>


            <div className="div-add-button" style={{ color: 'rgb(78, 192, 241)', }}>
              <PlusCircleOutlined style={{ color: 'rgb(78, 192, 241)', marginRight: '5px' }} />Add

            </div>



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
                style={{ fontSize: 15, backgroundColor: 'grey', color: 'white' }}
                onClick={() => showEditContactInfo(false)}
              >
                {/* <CloseOutlined /> */}
                CANCEL
              </Button>
              <Col>
                <Button type="primary" style={{ marginLeft: "10px" }}>
                  SAVE
                </Button>
              </Col>
            </Row>
          ) : null}
        </Card>
      </Form>
    </div>
  )
}

export default Education 