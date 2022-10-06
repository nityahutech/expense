import React from 'react'
import { useState } from 'react';
import { 
  Tabs,
  Button,
  Modal,
  Card,
  Table,
  Typography ,
  Select,
  Input,
  Checkbox,
  message, 
  Upload, 
} from 'antd';

import { 
  UploadOutlined,
} from '@ant-design/icons';
import { PlusCircleOutlined } from '@ant-design/icons';
import "../../style/Documents.css" 


// import Columns from 'antd/lib/table/Column';

// -------------------------------------------------------------------

const idcolumns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
]


const iddata = [
  {
    key: '1',
    name: 'John Brown',
  },
  ]

// ------------------------------------------------------------------

function Document() {

// -------------------------------------------------------------------space for const decleration

const { Title } = Typography;
// --------------------------code for model in id tab
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
// -------------------------code for model in certificatoin tab
  const [certMOdel, setCertModal] = useState(false);

  const showCert = () => {
    setCertModal(true);
  };

  const saveButton = () => {
    setCertModal(false);
  };

  const cancelButton = () => {
    setCertModal(false);
  };
// -----------------------code for model in work tab
  const [workModel, setWorkModel] = useState(false);

  const showWork = () => {
    setWorkModel(true);
  };

  const saveWork = () => {
    setWorkModel(false);
  };

  const cancelWork = () => {
    setWorkModel(false);
  };
// -------------------------code for select on id
  const { Option } = Select;

  const idoption = (value) => {
    console.log(`selected ${value}`);
  };
// -------------------------code for checkbox
  const checkId = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };
// -------------------------code for uplode button
  const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },

    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
  
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  
    progress: {
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068',
      },
      strokeWidth: 3,
      format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
  };
// ---------------------------------------------------------space for the return

  return (
    <div
    className='education' 
    style={{
            margin:'10px',
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width:'100%'
          }}
    >
        <div  
          style={{
              width:'800px',
              marginTop:'10px',
              backgroundColor:'white', 
              padding:'10px',
              display:'flex',
              justifyContent:'center',
               
            }}>

          <Tabs defaultActiveKey="1" className='tabs'>
              {/* ------------------------------------IDs tabs------------------------------------- */}
            <Tabs.TabPane tab="IDs" key="1">
            <Table 
              columns={idcolumns} 
              dataSource={iddata}
              pagination={false}
              style={{
                margin:'0px',
                padding:'0px',
              }}
              bordered  
            />
            <Modal 
               title="Add Documents" 
               open={isModalOpen}  
               visible={isModalOpen} 
               onOk={handleOk} 
               onCancel={handleCancel}
               className='idselect'
               >
                <Title level={5}>Select ID Type</Title>
                <Select
                   onChange={idoption}
                  
                   style={{
                    width: '100%',
                  }}
                  defaultValue="Id Type"
                >
                  <Option>PAN Card</Option>
                  <Option>Aadhar Card</Option>
                  <Option>Passport</Option>
                  <Option>Driving Licence</Option>
                  <option>Voter ID</option>
                  <Option>Electricity Bill</Option>
                  <Option>Phone Bill</Option>
                  <Option>Bank Passbook</Option>
                  <Option>Rental Agreement</Option>
                </Select>


                <Input placeholder='Enter ID' style={{ marginTop:'25px', marginBottom:'25px' }}/>



                <Title level={5}>Use it as proof for</Title>
                <Checkbox onChange={checkId}>Photo ID</Checkbox>
                <br />
                <Checkbox onChange={checkId}>Date of Birth</Checkbox>
                <br />
                <Checkbox onChange={checkId}>Current Address</Checkbox>
                <br />
                <Checkbox onChange={checkId}>Permanent</Checkbox>
                <br />


                <Upload {...props}>
                  <Button  
                    style={{marginTop:'25px'}} 
                    icon={<UploadOutlined />}
                    type='primary'
                  >
                      Click to Upload
                    </Button>
                </Upload>
              </Modal>
              {/* --------------------Document uploded table-------- */}
              <Button 
                    type='text'
                    onClick={showModal}
                    className='idbutton'
                  >
                    <PlusCircleOutlined /> Add
                  </Button>
            </Tabs.TabPane>

            

            {/* ----------------------------------------------------------Certification tab---------------- */}

            <Tabs.TabPane tab="Certification" key="2" >
            <Modal 
               title="Add Documents" 
               open={certMOdel}  
               visible={certMOdel} 
               onOk={saveButton} 
               onCancel={cancelButton}
               className='certficationtable'
              >
                <Title level={5}>Select Course Type</Title>
                <Select
                   onChange={idoption}
                  
                   style={{
                    width: '100%',
                  }}
                  defaultValue="Course Type"
                >
                  <Option>Graduation</Option>
                  <Option>Post Graduation</Option>
                  <Option>Doctorate</Option>
                  <Option>Diploma</Option>
                  <Option>Pre University</Option>
                  <Option>Certification</Option>
                  <Option>Others</Option>
                </Select>

                <Input placeholder='Enter Certification title' style={{ marginTop:'25px', marginBottom:'25px' }}/> 

                <Upload {...props}>
                  <Button  
                    style={{marginTop:'5px'}} 
                    icon={<UploadOutlined />}
                    type='primary'
                  >
                      Click to Upload
                    </Button>
                </Upload>  

              </Modal>
              <Button 
                    type='text'
                    onClick={showCert}
                  >
                    <PlusCircleOutlined /> Add
                  </Button>
            </Tabs.TabPane>

            {/* -------------------------------------------------Work tabs-------------------------- */}

            <Tabs.TabPane tab="Work" key="3" >
            <Modal 
               title="Add Documents" 
               open={workModel}  
               visible={workModel} 
               onOk={saveWork} 
               onCancel={cancelWork}
               className='worktab'
            >
              <Input placeholder='Enter Document Title' style={{ marginTop:'25px', marginBottom:'25px' }}/> 

              <Input placeholder='Enter Document Description' style={{ marginTop:'25px', marginBottom:'25px' }}/>

              <Upload {...props}>
                  <Button  
                    style={{marginTop:'5px'}} 
                    icon={<UploadOutlined />}
                    type='primary'
                  >
                      Click to Upload
                    </Button>
                </Upload>    

            </Modal>
                <Button 
                      type='text'
                      onClick={showWork}
                    >
                      <PlusCircleOutlined /> Add
                    </Button>
            </Tabs.TabPane>
          </Tabs>
        </div>
    </div>
  )
}

export default Document 