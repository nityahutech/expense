import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";

import {
  Button,
  Modal,
  Form,
  Input,
  Divider,
  Card
} from "antd";
import {
  PlusCircleOutlined,
} from "@ant-design/icons";
import FormItem from "antd/es/form/FormItem";




const Policies = () => {
  const [allWorkDetails, setAllWorkDetails] = useState([

  ]);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const imgRef = useRef(null);
  const { currentUser } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
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
        className="personalCardDiv"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: '10px'
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
          <div className="site-card-border-less-wrapper">
            <Card
              title="COMPANY POLICIES"
              bordered={false}
              style={{
                width: 800,
              }}
            >
              <p>No policies uploaded yet.</p>
              <Divider ></Divider>
              <Button type="primary" onClick={showModal} style={{ marginLeft: "10px" }}>
                <PlusCircleOutlined />
                Add
              </Button>
            </Card>
          </div>


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
            <Form style={{ marginLeft: 0 }}
              action="/action_page.php"
              form={form}
              labelCol={{ span: 30 }}
              wrapperCol={{ span: 30 }}
              initialValues={{ remember: true }}
              autoComplete="off"

              layout="vertical"
            >
              <div className='div-discription'>
                Title
              </div>
              <Form.Item

                name="title"
                rules={[
                  {
                    required: true,
                    message: "Please enter Domain Name",
                    type: "domain",
                  },
                  {
                    message: "Please enter Valid Domain Name",
                  },
                ]}
              >
                <Input style={{ paddingLeft: '0px' }} type='DomainName' required placeholder="Enter Domain Name" />
              </Form.Item>

              <div className='div-discription'>
                Description
              </div>
              <Form.Item

                name="  description"
                rules={[
                  {
                    required: true,
                    message: "Please enter Domain Name",
                    type: "domain",
                  },
                  {
                    message: "Please enter Valid Domain Name",
                  },
                ]}
              >
                <Input style={{ paddingLeft: '0px' }} type='DomainName' required placeholder="Enter Domain Name" />
              </Form.Item>

              <FormItem name="file" className="file">
                <div className="choose">
                  <Input
                    type="file"
                    id="myfile"
                    name="file"
                    ref={imgRef}
                    required
                  />
                </div>
              </FormItem>

            </Form>
          </Modal>
        </Form>
      </div>
    </>
  )
}

export default Policies