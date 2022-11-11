import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";

import {
  Button,
  Modal,
  Form,
  Table,
  Input,
  Divider,
  Row,
  Col,
  notification,
  Card
} from "antd";
import {
  PlusCircleOutlined, DeleteOutlined
} from "@ant-design/icons";
import FormItem from "antd/es/form/FormItem";
import { upload } from '@testing-library/user-event/dist/upload';
import PolicyContext from '../../contexts/PolicyContext';

const Policies = () => {
  const [policy, setPolicy] = useState([]);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const imgRef = useRef(null);
  const { currentUser } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [file, setFile] = useState("");

  const columns = [
    {
      title: 'Policy Title',
      dataIndex: 'title',
      key: 'idtitle',
    },
    {
      title: 'Policy Description',
      dataIndex: 'description',
      key: 'iddescription ',
    },
    {
      title: "Uploaded File",
      dataIndex: "upload",
      key: "upload",
      render: (data, record) => {
        console.log("record: ", record);
        console.log("data:: ", data);
        // var fReader = new FileReader();
        // fReader.readAsDataURL(imgRef.current.input.files[0]);
        // fReader.onload = function (event) {
        //   setImgPreview(event.target.result);
        // };
        return (
          <a href={data} target="_blank">
            {record.fileName}
          </a>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        return (
          <DeleteOutlined
            onClick={() => deleteData(record.id, record.fileName)}
          />
        );
      },
    },
  ];

  function handleChange(event) {
    setFile(event.target.files[0]);
  }
  async function addPolicy(values) {
    console.log(file, values)
    try {
      await PolicyContext.createPolicy(values, file)
      showNotification("success", "Success", "Upload Complete");
      const timer = setTimeout(() => {
        getData();
      }, 3500);
      return () => clearTimeout(timer);
    } catch {
      showNotification("error", "Error", "Upload Failed");
    }
  };
  const showNotification = (type, msg, desc) => {
    notification[type]({
      message: msg,
      description: desc,
    });
  };

  //   async function updatePolicy(values) {
  //     console.log(values,file)
  //     try{
  //    await PolicyContext.updateCompInfo(id,values,file)
  //    showNotification("success", "Success", "Upload Complete");
  //    const timer = setTimeout(() => {
  //    getData();
  //   }, 3500);
  //   return()=>clearTimeout(timer);
  //   }catch{
  //   showNotification("error", "Error", "Upload Failed");
  //   }
  // };
  // const showNotification=(type,msg,desc)=>{
  //  notification[type]({
  //    message:msg,
  //    description:desc,
  //  });
  // };

  const displayPolicy = () => {
    return (
      policy.forEach((pol) => {
        Object.keys(pol).map(u => {
          <p>{u}: {policy.u}</p>
          { console.log(u, policy) }
        })
      })
      // <Table dataSource={policy}></Table>
      // Object.keys(policy).map(u => {
      //   <p>{u}: {policy.u}</p>
      //   {console.log(u,policy)}
      // })
    )
  }

  const deleteData = (id, fileName) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this record?",
      okText: "Yes",
      okType: "danger",

      onOk: () => {
        PolicyContext.deletePolicy(id, fileName)
          .then(response => {
            showNotification("success", "Success", "Successfully deleted")
            getData();
          })
          .catch(error => {
            showNotification("error", "Error", "Record not deleted ");
          })
      },
    });
  };

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    let alldata = await PolicyContext.getPolicy();
    console.log(alldata)
    // setData(alldata);
    setPolicy(alldata);
  };

  const showModal = () => {
    setIsModalOpen(true);
    setVisible(true);
    form.resetFields();
  };
  const handleOk = () => {
    setIsModalOpen(false);
    setVisible(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setVisible(false);
    form.resetFields();
  };


  return (
    <>
      <div
        className="education"
        style={{
          margin: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Row>
                   <Col xs={24} sm={15} md={24}> 
        <Form style={{ marginLeft: 0 }}
              action="/action_page.php"
              form={form}
              labelCol={{ span: 30 }}
              wrapperCol={{ span: 30 }}
              initialValues={{ remember: true }}
              autoComplete="off"
              onFinish={addPolicy}
              layout="vertical"
            >
        <Card title='Company Policies'
          className="policyCard"
          bordered={false}
          style={{
            width: 800,
          }}>
          <Table
            columns={columns}
            pagination={false}
            dataSource={policy}
          />
          <Button type="primary" onClick={showModal} style={{ marginLeft: "10px" }}>
            <PlusCircleOutlined />
            Add
          </Button>
          <Modal
            title="Add Policy"
            open={isModalOpen}
            onOk={() => {
              form.submit();
              handleOk();
            }}
            onCancel={handleCancel}
            visible={isModalVisible}
            okText="Save"
            width={400}
            closeIcon={
              <div className='modal-close-x'
                onClick={() => {
                  setIsModalVisible(false);
                }}
              >
                X
              </div>
            }

          >
            
              <div className='div-discription'>
                Title
              </div>
              <Form.Item

                name="title"
                rules={[
                  {
                    required: true,
                    message: "Enter Policy Name",
                    type: "domain",
                  },
                  {
                    pattern: /^[a-zA-Z\s]*$/,
                    message: "Enter Description ",
                  },
                ]}
              >
                <Input 
                style={{
                        width: '100%',
                        borderBottom: '1px solid #ccc ',
                        paddingLeft: '0px',
                        marginTop: '10px',
                      }}
                bordered={false}  
                required placeholder="Enter Policy Name" />
              </Form.Item>

              <div className='div-discription'>
                Description
              </div>
              <Form.Item

                name="description"
                rules={[
                  {
                    required: true,
                    message: "Enter Policy Name",
                    type: "domain",
                  },
                  {
                    pattern: /^[a-zA-Z\s]*$/,
                    message: "Enter Description",
                  },
                ]}
              >
                <Input 
                  style={{
                          width: '100%',
                          borderBottom: '1px solid #ccc ',
                          paddingLeft: '0px',
                          marginTop: '10px',
                        }}
                  bordered={false}  
                  required placeholder="Enter Description" />
              </Form.Item>
              
              <div className='div-discription'>
                Uplode File
              </div>
              <FormItem name="upload"
                rules={[
                  {
                    required: true,
                    message: 'upload file',
                  },
                ]}
              >
                <div className="choose">
                  <Input
                    type="file"
                    id="upload"
                    name="upload"
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      borderBottom: '1px solid #ccc ',
                      paddingLeft: '0px',
                      marginTop: '10px',
                    }}
                  bordered={false} 
                  // ref={imgRef}
                  // required
                  />
                </div>
              </FormItem>

            
          </Modal>

        </Card>
        </Form>
        </Col>
                </Row>
      </div>
    </>
  )
}

export default Policies