import React from 'react'
import { useState } from "react";
import {
  Tag,
  Form,
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
  Popconfirm,
  InputNumber,
} from "antd";
import {
  PlusCircleOutlined,
  UploadOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";



// -------------------------------------------------------------------------------------------------
const getiddata = [
  {
    key: "1",
    type: "Photo ID",
    id: "PAN Card",
    idno: "AB1234567",
    action: "Verified   Edit   Delete",
  },
];
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
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
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


function WorkID() {


// -------------------------------------------------------------------------------------------------
const [workData, setWorkData] = useState([
  {
    key: "1",
    companyname: "Delta",
    workexperience: "2.5 years",
    uploadedon: "pay slip image.png",
    action: "verified",
    
  },
]);
const [editingKey, setEditingKey] = useState('');
const [form] = Form.useForm();
const [data, setData] = useState(workData);
  
const isEditing = (record) => record.key === editingKey;

const handleDelete = (key) => {
  const newData = workData.filter((item) => item.key !== key);
  setWorkData(newData);
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
const edit = (record) => {
 
  form.setFieldsValue({
    companyname: '',
    workexperience: '',
    uploadedon: '',
    ...record,
  });
  console.log(record.key );
  setEditingKey(record.key);
};
 const cancel = () => {
  setEditingKey('');
};
const save = async (key) => {
  try {
    const row = await form.validateFields();
    const editData = [...data];
    const index = editData.findIndex((item) => key === item.key);
    if (index > -1) {
      const item = editData[index];
      editData.splice(index, 1, {
        ...item,
        ...row,
      });
      setData(editData);
      setEditingKey('');
    } else {
      editData.push(row);
      setData(editData);
      setEditingKey('');
    }
  } catch (errInfo) {
    console.log('Validate Failed:', errInfo);
  }
};

// ---------------------------------code for table of work


const workcolumn = [
  {
    title: "Company Name",
    dataIndex: "companyname",
    key:"companyname",
    editable:true
  },
  {
    title: "Work Experience ",
    dataIndex: "workexperience",
    key:"workexperience",
    editable:true

  },
  {
    title: "Upload Document",
    dataIndex: "uploadedon",
    key:"uploadedon",
    editable:true,
    // render: () => {
    //   <Button>hi</Button>
    // }
  },
  {
    title: "Action",
    dataIndex: "action",
    key:"action",
    render: (_, record) =>{
      const editable = isEditing(record);
      let actionUI=[]
      actionUI.push(editable ? (
        <span>
          <Typography.Link
            onClick={() =>{save(record.key)}}
            style={{
              marginRight: 8,
            }}
          >
            Save
          </Typography.Link>
          <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
            <a>Cancel</a>
          </Popconfirm>
        </span>
      ) : (
        <Typography.Link disabled={editingKey !== ''} onClick={()=>{edit(record)}}>
          <Button type="text"><EditOutlined/></Button>
        </Typography.Link>
      ))
      actionUI.push(workData.length >= 1 ? (
        <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
          <Button type="text"><DeleteOutlined/></Button>
        </Popconfirm>
      ) : null)  

    

         return actionUI
        },
    },
  ];




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

//------------------------------------------------------------------------------------------------- 
const mergedColumns = workcolumn.map((col) => {
  if (!col.editable) {
    return col;
  }
  return {
    ...col,
    onCell: (record) => ({
      record,
      inputType: col.dataIndex,
      dataIndex: col.dataIndex,
      title: col.title,
      editing: isEditing(record),
    }),
  };
});

  return (
    <Form form={form} component={false}>
    <div>
      <Table
      components={{
        body: {
          cell: EditableCell,
        },
      }}
              columns={mergedColumns}
              dataSource={data}
              pagination={{
                onChange: false}}
              style={{
                margin: "0px",
                padding: "0px",
              }}
              bordered
              rowClassName="editable-row"
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
                style={{ marginTop: "25px" }}
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
            <Button
              type="text"
              style={{ marginTop: "15px" }}
              onClick={showWork}
            >
              <PlusCircleOutlined /> Add
            </Button>
    </div>
    </Form>
  )
}

export default WorkID
