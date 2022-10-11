import React from "react";
import { useState } from "react";
import {
  Tabs,
  Button,
  Modal,
  Table,
  Typography,
  Select,
  Input,
  Checkbox,
  message,
  Upload,
} from "antd";
import { 
  PlusCircleOutlined,
  UploadOutlined, 
} from "@ant-design/icons";

import "../../style/Documents.css";


// // ----------------------------------code for table of id tab

const sharedOnCell = (_, index) => {
  if (index === 4) {
    return {
      colSpan: 0,
    };
  }

  return {};
};

const idcolumns = [
  { 
    title:"Proofs",   
    dataIndex: "name",
    onCell: sharedOnCell,
    key: "name",
    width: 200,
    // colSpan: 1 ,
  },
  {
    title:"Documents",
    dataIndex:"doc",
    key:"doc",
  }
];

const iddata = [
  {
    key: "1",
    name: "Photo ID",
    doc: "Aaddhar Card",
  },
  {
    key: "2",
    name: "Date of Birth",
    doc: "Driving Licence",
  },
  {
    key: "3",
    name: "Current Address",
    doc: "Aaddhar Card",
  },
  {
    key: "4",
    name: "Permanent Address",
    doc: "Voter ID Card",
  },
];

// ----------------------------------code for document list of the id tab

  const doclist =[
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Id no.',
      dataIndex: 'idno',
      key: 'idno',
    },
  ]

  const docdata = [
    {
      key:'1',
      type:'Photo ID',
      id:'PAN Card',
      idno:'AB1234567',
    }
  ]

// ---------------------------------code for table of certification

  const certcolumn = [
    {
      title: "Course Title",
      dataIndex:"name",
    },
    {
      title: "Upload By",
      dataIndex:"uploadedby",
    },
    {
      title: "Type",
      dataIndex:"type",
    },
    {
      title: "Verified By",
      dataIndex:"verification",
    },
    {
      title: "Action",
      dataIndex:"action",
    },
  ]

  const certData = [
    {
      key:'1',
      name:'Diploma',
      uploadedby:'Saswat',
      type:'Skill Development',
      verification:'STB',
      action:'verified',
    },
    {
      key:'2',
      name:'Graduation',
      uploadedby:'Saswat',
      type:'Skill Development',
      verification:'BPUT',
      action:'Pending',
    },
  ]

// ------------------------------------code for table of Work tab

  const workcolumn = [
    {
      title:'Company Name',
      dataIndex: 'companyname',
    },
    {
      title:'Work Experience ',
      dataIndex: 'workexperience',
    },
    {
      title:'Upload Document',
      dataIndex: 'uploadedon',
    },
    {
      title:'Action',
      dataIndex: 'action',
    },
  ]

  const workData = [
    {
      key:'1',
      companyname:'Delta',
      workexperience:'2.5 years',
      uploadedon:'pay slip image.png',
      action:'verified',
    }
  ]
// ----------------------------------------------------------------


function Document() {


  // -------------------------------------------------------------------space for const decleration

  const { Title } = Typography;

  // --------------------------code for model in id tab
  const [isModalOpen, setIsModalOpen] = useState(false);
  const[selectedIdType,setSelectedIdType]=useState(null)

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
  const [selectedCourseType,setSelectedCourseType]=useState(null)
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

  const idOption = (value) => {
    console.log(`selected ${value}`);
    setSelectedIdType(value);
  };
// ---------------------------code for select on certification
  const certOption = (value) => {
    console.log(`selected ${value}`);
    setSelectedCourseType(value);
  };
  // -------------------------code for checkbox
  const checkId = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };
  // -------------------------code for uplode button
  const props = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text",
    },

    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }

      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },

    progress: {
      strokeColor: {
        "0%": "#108ee9",
        "100%": "#87d068",
      },
      strokeWidth: 3,
      format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
  };
  // ---------------------------------------------------------space for the return

  return (
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
      <div
        style={{
          width: "800px",marginTop: "10px",backgroundColor: "white",padding: "10px",display: "flex",
          justifyContent: "center",
        }}
      >
        <Tabs defaultActiveKey="1" className="tabs">
          {/* ------------------------------------IDs tabs------------------------------------- */}
          <Tabs.TabPane tab="IDs" key="1">
            <Table
              columns={idcolumns}
              dataSource={iddata}
              pagination={false}
              style={{
                margin: "0px",
                padding: "0px",
              }}
              bordered
            />
            <Table
              columns={doclist}
              dataSource={docdata}
              pagination={false}
              style={{
                margin: "0px",
                padding: "0px",
              }}
              bordered
            />
            <Modal
              title="Add Documents"
              open={isModalOpen}
              visible={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              className="idselect"
            >
              <Title level={5}>Select ID Type</Title>
              <Select
              value={selectedIdType}
                onChange={idOption}
                style={{
                  width: "100%"
                }}
              >
                <Option value="PAN Card">PAN Card</Option>
                <Option value="Aadhar Card">Aadhar Card</Option>
                <Option value="Passport">Passport</Option>
                <Option value="Driving Licence">Driving Licence</Option>
                <option value="Voter ID">Voter ID</option>
                <Option value="Electricity Bill">Electricity Bill</Option>
                <Option value="Phone Bill">Phone Bill</Option>
                <Option value="Bank Passbook">Bank Passbook</Option>
                <Option value="Rental Agreement">Rental Agreement</Option>
              </Select>

              <Input
                placeholder="Enter ID"
                style={{ marginTop: "25px", marginBottom: "25px" }}
              />

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
                  style={{ marginTop: "25px" }}
                  icon={<UploadOutlined />}
                  type="primary"
                >
                  Click to Upload
                </Button>
              </Upload>
            </Modal>
            {/* --------------------Document uploded table-------- */}
            <Button type="text" onClick={showModal} className="idbutton">
              <PlusCircleOutlined /> Add
            </Button>
          </Tabs.TabPane>

          {/* ------------------------Certification tab---------------- */}

          <Tabs.TabPane tab="Certification" key="2">
            <Table
                columns={certcolumn}
                dataSource={certData}
                pagination={false}
                style={{
                  margin: "0px",
                  padding: "0px",
                }}
                bordered
              />
            <Modal
              title="Add Documents"
              open={certMOdel}
              visible={certMOdel}
              onOk={saveButton}
              onCancel={cancelButton}
              className="certficationtable"
            >
              <Title level={5}>Select Course Type</Title>
              <Select
                onChange={certOption}
                style={{
                  width: "100%",
                }}
                defaultValue="Course Type"
                value={selectedCourseType}
              >
                <Option value='Graduation'>Graduation</Option>
                <Option value='Post Graduation'>Post Graduation</Option>
                <Option vale='Doctorate'>Doctorate</Option>
                <Option value='Diploma'>Diploma</Option>
                <Option value='Pre University'>Pre University</Option>
                <Option value='Certification'>Certification</Option>
                <Option value='Others'>Others</Option>
              </Select>

              <Input
                placeholder="Enter Certification title"
                style={{ marginTop: "15px", marginBottom: "25px" }}
              />

              <Upload {...props}>
                <Button
                  style={{ marginTop: "5px" }}
                  icon={<UploadOutlined />}
                  type="primary"
                >
                  Click to Upload
                </Button>
              </Upload>
            </Modal>
            <Button type="text" style={{marginTop:'15px'}}onClick={showCert}>
              <PlusCircleOutlined /> Add
            </Button>
          </Tabs.TabPane>

          {/* -------------------------------------------------Work tabs-------------------------- */}

          <Tabs.TabPane tab="Work" key="3">
          <Table
              columns={workcolumn}
              dataSource={workData}
              pagination={false}
              style={{
                margin: "0px",
                padding: "0px",
              }}
              bordered
            />
            <Modal
              title="Add Documents"
              open={workModel}
              visible={workModel}
              onOk={saveWork}
              onCancel={cancelWork}
              className="worktab"
            >
              <Input
                placeholder="Enter Document Title"
                style={{ marginTop: "25px"}}
              />

              <Input
                placeholder="Enter Document Description"
                style={{ marginTop: "25px", marginBottom: "25px" }}
              />

              <Upload {...props}>
                <Button
                  style={{ marginTop: "5px" }}
                  icon={<UploadOutlined />}
                  type="primary"
                >
                  Click to Upload
                </Button>
              </Upload>
            </Modal>
            <Button type="text" style={{marginTop:'15px'}} onClick={showWork}>
              <PlusCircleOutlined /> Add
            </Button>
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default Document;
