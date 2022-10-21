import React from 'react'
import { useState } from "react";
import {
  Title,
  Form,
  Option,
  Button,
  Modal,
  Table,
  Typography,
  Select,
  Input,
  Checkbox,
  message,
  Upload,
  Popconfirm,
  InputNumber,
} from "antd";
import {
  PlusCircleOutlined,
  UploadOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import FormItem from 'antd/lib/form/FormItem';

// ------------------------------------------------------------

// --------------------------code for document list in id tab
 
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
      title: "Proofs",
      dataIndex: "name",
      onCell: sharedOnCell,
      key: "name",
      width: 200,
      // colSpan: 1 ,
    },
    {
      title: "Documents",
      dataIndex: "doc",
      key: "doc",
    },
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

  const getiddata = [
    {
      key: "1",
      type: "Photo ID",
      id: "PAN Card",
      idno: "AB1234567",
      action: "Verified   Edit   Delete",
    },
  ];

   
   // -------------------------code for checkbox
   const checkId = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

// -----------------------------------------------------------

function IDTags() {


  const { Title } = Typography;
// ----------------------------------------------------------

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedIdType, setSelectedIdType] = useState(null);
  
    const showModal = () => {
      setIsModalOpen(true);
    };
  
    const handleOk = () => {
      setIsModalOpen(false);
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };

    const EditableCell = ({
        editing,
        dataIndex,
        title,
        inputType,
        record,
        index,
        children,
        ...restProps
      }) => {
        const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
        return (
          <td {...restProps}>
            {editing ? (
              <Form.Item
                name={dataIndex}
                style={{
                  margin: 0,
                }}
                rules={[
                  {
                    required: true,
                    message: `Please Input ${title}!`,
                  },
                ]}
              >
                {inputNode}
              </Form.Item>
            ) : (
              children
            )}
          </td>
        );
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

  const [idData, setIdData] = useState(getiddata);

  const handleDelete = (key) => {
    const newData = idData.filter((item) => item.key !== key);
    setIdData(newData);
  };

  const doclist = [
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Id no.",
      dataIndex: "idno",
      key: "idno",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",

      render: (_, record) => {
        console.log("record:: ", record);
        return (
          <>
            {/* <Space size="small"> */}
            <Button
              style={{ padding: 0 }}
              type="link"
              className="edIt"
              // onClick={() => {
              //   handleEditEmployee(record);
              //   showModal(record);
              // }}
            >
              {<EditOutlined />}
            </Button>
            
            <Button
              type='text'
              style={{color:'#f04747'}}
            >
              <Popconfirm
                title="Sure to delete?"
                onConfirm={() => handleDelete(record.key)}
              >
                <DeleteOutlined />
              </Popconfirm>
            </Button>
          </>
        );
      },
    },
  ];

  // -------------------------code for select on id
  const { Option } = Select;

  const idOption = (value) => {
    console.log(`selected ${value}`);
    setSelectedIdType(value);
  };
  
// -----------------------------------------------------------

  return (

    
    <div>
    <Form>
      <Table
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
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
              dataSource={getiddata}
              pagination={false}
              style={{
                margin: "0px",
                padding: "0px",
                // border:'3px solid red'
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
              <FormItem>
              <Select
                value={selectedIdType}
                onChange={idOption}
                style={{
                  width: "100%",
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
              </FormItem>

              <FormItem> 
              <Input
                placeholder="Enter ID"
                style={{ marginTop: "25px", marginBottom: "25px" }}
              />
              </FormItem> 

              <Title level={5}>Use it as proof for</Title>
              <FormItem>
              <Checkbox onChange={checkId}>Photo ID</Checkbox>
              <br />
              <Checkbox onChange={checkId}>Date of Birth</Checkbox>
              <br />
              <Checkbox onChange={checkId}>Current Address</Checkbox>
              <br />
              <Checkbox onChange={checkId}>Permanent</Checkbox>
              <br />
              </FormItem>

              <FormItem>
              <Upload {...props}>
                <Button
                  style={{ marginTop: "25px" }}
                  icon={<UploadOutlined />}
                  type="primary"
                >
                  Click to Upload
                </Button>
              </Upload>
              </FormItem>
            </Modal>
            {/* --------------------Document uploded table-------- */}
            <Button type="text" onClick={showModal} className="idbutton">
              <PlusCircleOutlined /> Add
            </Button>
        </Form>
    </div>
  )
}

export default IDTags
