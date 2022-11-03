import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";

import {
  Button,
  Modal,
  Form,
  Table,
  Input,
  Divider,
  notification,
  Card
} from "antd";
import {
  PlusCircleOutlined,
} from "@ant-design/icons";
import FormItem from "antd/es/form/FormItem";
import {upload } from '@testing-library/user-event/dist/upload';
import PolicyContext from '../../contexts/PolicyContext';

const Policies = () => {
  const [policy, setPolicy] = useState([

  ]);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const imgRef = useRef(null);
  const { currentUser } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [file, setFile] = useState("");

  function handleChange(event) {
    setFile(event.target.files[0]);
  }
  async function addPolicy(values) {
    console.log(file,values)
    try{
   await PolicyContext.createPolicy("compId001",values,file)
   showNotification("success", "Success", "Upload Complete");
   const timer = setTimeout(() => {
   getData();
 }, 3500);
 return()=>clearTimeout(timer);
}catch{
 showNotification("error", "Error", "Upload Failed");
 }
};
const showNotification=(type,msg,desc)=>{
 notification[type]({
   message:msg,
   description:desc,
 });
};

//   async function updatePolicy(values) {
//     console.log(values,file)
//     try{
//    await PolicyContext.updateCompInfo("compID001",values,file)
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
      Object.keys(pol).map(u =>{
        <p>{u}: {policy.u}</p>
        {console.log(u,policy)}
      })
    })
    // <Table dataSource={policy}></Table>
    // Object.keys(policy).map(u => {
    //   <p>{u}: {policy.u}</p>
    //   {console.log(u,policy)}
    // })
  )
}

const deleteData = (id,fileName) => {
  Modal.confirm({
      title: "Are you sure, you want to delete this record?",
      okText: "Yes",
      okType: "danger",

      onOk: () => {
        PolicyContext.deletePolicy(id,fileName)
              .then(response => {
                showNotification("success","Success","Successfully deleted")
                getData();
              })
              .catch(error=>{
                showNotification("error","Error","Record not deleted "); 
              })
      },
  });
};

useEffect(()=>{
  getData();
},[]);
const getData=async()=>{
  let alldata=await PolicyContext.getPolicy("compId001");
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
        >
          <div className="site-card-border-less-wrapper">
            <Card
              title="COMPANY POLICIES"
              bordered={false}
              style={{
                width: 800,
              }}
            >
              {/* {
                policy.forEach((pol) => {
                  Object.keys(pol).map(u =>(
                    <p>{u}: {policy.u}</p>
                  ))
                  })
            } */}
            {/* {JSON.stringify(policy)} */}

{
                policy.map((pol) => {
                  return <>
                  <h3>POLICY</h3>
                  {
                     Object.keys(pol).map((k)=><h6>{k}: {pol[k]}</h6>)
                  }
                  </>
                } )
            }
              {/* <p>{policy? {
                
              }
                         : "No policies uploaded yet."}</p> */}
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
              onFinish={addPolicy}
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
                    message: "Enter Policy Name",
                    type: "domain",
                  },
                  {
                    message: "Enter Description ",
                  },
                ]}
              >
                <Input style={{ paddingLeft: '0px' }}  required placeholder="Enter Policy Name" />
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
                    message: "Enter Description",
                  },
                ]}
              >
                <Input style={{ paddingLeft: '0px' }} required placeholder="Enter Description" />
              </Form.Item>

              <FormItem name="upload" 
              rules={[
                {
                  required:true,
                  message:'upload file',
                },
              ]}
              >
                <div className="choose">
                  <Input
                    type="file"
                    id="upload"
                    name="upload"
                    onChange={handleChange}
                    // ref={imgRef}
                    // required
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