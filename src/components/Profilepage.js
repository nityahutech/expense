import React, { useState, useEffect } from "react";
import 'antd/dist/antd.css';
import "../style/profile.css";
import { Card, Col, Row, } from 'antd';
import { EnvironmentOutlined, CalendarOutlined, HomeOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import "../style/profilepage.css";
import { Button, Modal } from 'antd';
import { Form, Input, Radio,notification } from 'antd';
import { useAuth } from "../contexts/AuthContext";
import ProfileContext from "../contexts/ProfileContext";

const { Meta } = Card;

const Profile = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formLayout, setFormLayout] = useState('horizontal');
  const { currentUser, updateMyProfile, updateMyPhNo, updateMyEmail} = useAuth();
  const [userRecord, setUserRecord] = useState({
    employeename:currentUser.displayName,
    mailid:currentUser.email,
    address: "",
    city: "",
    country: "",
    phonenumber: "",
    state: "",
    zipcode: "",
  });

  async function getData(){
    let rec = await ProfileContext.getProfile(currentUser.uid);
    if (rec.data()){
      setUserRecord(rec.data());
      return;
    }
      ProfileContext.addProfile(currentUser.uid, userRecord)
  }
  

  useEffect(() => {
    getData();
  }, [currentUser]);


  const [fileList, setFileList] = useState([
    {

      uid: "-1",
      name: "image.png",
      status: "done",
      url:
        "/logo/image.png"
    }
  ]);
  const onPreview = async (file) => {
    let src = file.url;

    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };



  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const showModal = () => {
    console.log('hi')
    setIsModalOpen(true);
  };

  const handleOk = () => {
    console.log('hiii')
    setIsModalOpen(false);
    showNotification("success", "Success", "Record updated successfuly");
  };

  const showNotification = (type, msg, desc) => {
    notification[type]({
      message: msg,
      description: desc,
    });
  };

  const handleCancel = () => {
    console.log('hiii')
    setIsModalOpen(!isModalOpen);
  };


  const formonFinishHandler = (values) => {
    console.log(values);
    updateMyProfile({displayName: values.employeename})
    updateMyEmail(values.mailid)
    ProfileContext.updateProfile(currentUser.uid, values)

    setUserRecord(() => ({
      ...values
    }));
    // setUserRecord(preState)
    // name = values.employeename;
    // email = values.mailid;
    console.log(userRecord, "?d ")
    // window.location.reload(false);
  }

  const onFormLayoutChange = ({ layout }) => {
    setFormLayout(layout);
    console.log(layout);

  };

  const checkAlphabets = (event) => {
    if (!/^[a-zA-Z ]*$/.test(event.key) && event.key !== "Backspace") {
      return true;
    }
  };
  const checkNumbervalue = (event) => {
    if (!/^[0-9]*\.?[0-9]*$/.test(event.key) && event.key !== "Backspace") {
      return true;
    }
  };

  const onReset = () => {
    form.resetFields()
  }

  const onFieldsChangeHandler = (curr, allvalues) => {
    console.log(allvalues)
  }
  const cancelStyle = {
    float: "right",
   
  };
  const buttonStyle = {
    marginRight: "5px",
    color: "white",
    backgroundColor: "#1890ff",
    float: "right",
    backgroundColor: '#d9d9d9'
  };

  return (
    <>

      <div className='profile'  >
        <Row className="col-card" gutter={[48, 8]} style={{ background: '', display: "flex", flexDirection: 'row', justifyContent: 'space-between', alignItems: 'start' }}>
          <Col xl={12} lg={12} md={12} sm={24} xs={24}>
            <Card className="card-body"
              style={{
                width: '100%',
                borderRadius: '10px',
                display: "flex", flexDirection: 'column', justifyContent: 'center', padding: '10px'

              }}

            >
              <div className="editimg" style={{ paddingLeft: '' }}>
                <Upload
                  action="/logo/Expense.png"
                  listType="picture-card"
                  fileList={fileList}
                  onChange={onChange}
                  onPreview={onPreview}
                  style={{ background: 'black' }}
                >
                  {fileList.length < 1 && '+ Upload'}
                </Upload>
              </div>

              <div className="content-div">
              <h2 className="tropography" style={{ fontSize:'18px',fontWeight:'normal' }}>{userRecord.employeename}</h2>
                <ul
                  style={{
                    listStyleType: "none",
                    display: "inline",
                    paddingLeft: '0'

                  }}>
                  <li className="div-title">
                    <div className="div-icon"><HomeOutlined /></div>
                    <div className="div-name">Hutech Solutions India Pvt. Ltd</div>
                  </li>
                  <li className="div-title">
                    <div className="div-icon"><EnvironmentOutlined /></div>
                    <div className="div-name">HSR Layout, Bengaluru</div>
                  </li>
                  <li className="div-title">
                    <div className="div-icon"><CalendarOutlined /></div>
                    <div className="div-name">Joined {currentUser.metadata.creationTime}</div>
                  </li>
                </ul>
              </div>

            </Card>
          </Col>

          <Col xl={12} lg={12} md={12} sm={24} xs={24}>
            <Card
              title="My Account"
              extra={<Button type="primary" onClick={showModal}>
                Edit
              </Button>}
              style={{
                width: '100%',
                borderRadius: '10px'
                
              }}
            >
              <div>
                <div>
                <h2 className="tropography" style={{ fontSize:'18px',fontWeights :'900' }}>About</h2>
                  <p>{userRecord.employeename}</p>
                </div>
                <div>
                <h2 className="tropography" style={{ fontSize:'18px',fontWeights :'900'  }}>Contact</h2>
                  {/* {JSON.stringify(userRecord)} */}
                  <p>{userRecord.mailid},  <br /> {userRecord.phonenumber}</p>
                </div>
                <div>
                <h2 className="tropography" style={{ fontSize:'18px',fontWeights :'900'  }}>Address</h2>
                  <p> {userRecord.address},<br />
                  {userRecord.city},
                  {userRecord.state},<br />
                  {userRecord.country},<br />
                  {userRecord.zipcode}</p>
                 
                </div>
              </div>
            </Card>
          </Col>
        </Row>

      </div>

      <Modal   maskClosable={false} centered title="Basic information" footer={null} visible={isModalOpen} open={isModalOpen}  onCancel={handleCancel}>
        <Row >
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <Form
              labelCol={{
                span: 6,

              }}
              wrapperCol={{
                span: 16,
              }}
              initialValues={{
                remember: true,
                // employeename: currentUser.displayName,
                // mailid: currentUser.email,
                ...userRecord 
              }}
              fields={[
                {
                  name: ["userRecord"],
                  values: userRecord,
                },

              ]}

              autoComplete="off"
              form={form}
              onFinish={formonFinishHandler}
              onFieldsChange={(changedFields, allvalues) => onFieldsChangeHandler(changedFields, allvalues)}
              onValuesChange={onFormLayoutChange}
            >
              <Form.Item labelAlign="left"
                style={{ marginBottom: "10px", }}
                label="Name"
                name="employeename"
                onKeyPress={(event) => {
                  if (checkAlphabets(event)) {
                    event.preventDefault();
                  }
                }}

              >
                <Input placeholder="Your Name" />
              </Form.Item>

              <Form.Item labelAlign="left"
                style={{ marginBottom: "10px" }}
                label="Email"
                name="mailid"


              >
                <Input placeholder="Email" />
              </Form.Item>

              <Form.Item labelAlign="left"
                name="phonenumber"
                style={{ marginBottom: "10px" }}
                label="Phone No."
                onKeyPress={(event) => {
                  if (checkNumbervalue(event)) {
                    event.preventDefault();
                  }
                }}
              >
                <Input placeholder="Your Phone No." />
              </Form.Item>

              <Form.Item labelAlign="left"
                name="country"
                style={{ marginBottom: "10px" }}
                label="country"
                onKeyPress={(event) => {
                  if (checkAlphabets(event)) {
                    event.preventDefault();
                  }
                }}
              >
                <Input placeholder="Country" />
              </Form.Item>

              <Form.Item labelAlign="left"
                name="state"
                style={{ marginBottom: "10px" }}
                label="State"
                onKeyPress={(event) => {
                  if (checkAlphabets(event)) {
                    event.preventDefault();
                  }
                }}
              >
                <Input placeholder="State" />
              </Form.Item>

              <Form.Item labelAlign="left"
                name="city"
                style={{ marginBottom: "10px" }}
                label="City"
                onKeyPress={(event) => {
                  if (checkAlphabets(event)) {
                    event.preventDefault();
                  }
                }}
              >
                <Input placeholder="City" />
              </Form.Item>

              <Form.Item labelAlign="left"
                name="address"
                style={{ marginBottom: "10px" }}
                label="Address line 1"

              >
                <Input placeholder="Your address" />
              </Form.Item>

              <Form.Item labelAlign="left"
                name="zipcode"
                style={{ marginBottom: "10px" }}
                label="Zip Code"
                onKeyPress={(event) => {
                  if (checkNumbervalue(event)) {
                    event.preventDefault();
                  }
                }}
              >
                <Input placeholder="Your zip code" />
              </Form.Item>

              <Form.Item >
                <Button
                  style={cancelStyle}
                  onClick={handleOk}
                 

                  // onClick={submitEdit}
                  htmlType="submit"

                  type="primary">Save Change
                </Button>
                <Button
                  style={buttonStyle}
                  onClick={onReset}
                >Reset</Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default Profile


