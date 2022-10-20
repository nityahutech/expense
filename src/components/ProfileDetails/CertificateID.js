import React from "react";
import { useState } from "react";
import {
  Title,
  Form,
  Option,
  Button,
  Modal,
  Table,
  Select,
  Input,
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

// ------------------------------------------------------------

// ----------------------------------------------------------------
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

function CertificateID() {
  // ---------------------------------code for table of certification
  const [editingKey, setEditingKey] = useState("");
  const [form] = Form.useForm();
  const [data, setData] = useState(certData);
  const [certMOdel, setCertModal] = useState(false);
  const [selectedCourseType, setSelectedCourseType] = useState(null);

  const isEditing = (record) => record.key === editingKey;
  const [certData, setCertData] = useState([
    {
      key: "1",
      coursename: "Diploma",
      uploadedby: "Saswat",
      type: "Skill Development",
      verification: "STB",
      action: "verified",
    },
    {
      key: "2",
      coursename: "Graduation",
      uploadedby: "Saswat",
      type: "Skill Development",
      verification: "BPUT",
      action: "Pending Edit Delete",
    },
  ]);

  // ------------------------------code for edit

  const edit = (record) => {
    form.setFieldsValue({
      coursename: "",
      uploadedby: "",
      type: "",
      verification: "",
      ...record,
    });
    console.log(record.key);
    setEditingKey(record.key);
  };
  const cancel = () => {
    setEditingKey("");
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
        setEditingKey("");
      } else {
        editData.push(row);
        setData(editData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const handleDelete = (key) => {
    const newData = certData.filter((item) => item.key !== key);
    setCertData(newData);
  };

  const certcolumn = [
    {
      title: "Course Title",
      dataIndex: "coursename",
      key: "coursename",
      editable: true,
    },
    {
      title: "Upload By",
      dataIndex: "uploadedby",
      key: "uploadedby",
      editable: true,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      editable: true,
    },
    {
      title: "Verified By",
      dataIndex: "verification",
      key: "verification",
      editable: true,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => {
        const editable = isEditing(record);
        let actionUI = [];
        actionUI.push(
          editable ? (
            <span>
              <Typography.Link
                onClick={() => {
                  save(record.key);
                }}
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
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => {
                edit(record);
              }}
            >
              <Button type="text">
                <EditOutlined />
              </Button>
            </Typography.Link>
          )
        );
        actionUI.push(
          certData.length >= 1 ? (
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record.key)}
            >
              <Button type="text">
                <DeleteOutlined />
              </Button>
            </Popconfirm>
          ) : null
        );

        return actionUI;
      },
    },
  ];

  // ---------------------------code for select on certification
  const certOption = (value) => {
    console.log(`selected ${value}`);
    setSelectedCourseType(value);
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
  //--------------------------code for Editablecell

  // -------------------------code for model in certificatoin tab

  const showCert = () => {
    setCertModal(true);
  };

  const saveButton = () => {
    setCertModal(false);
  };

  const cancelButton = () => {
    setCertModal(false);
  };
  // -----------------------------------------------------------
  const mergedColumns = certcolumn.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        key: col.key,
        inputType: col.dataIndex,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    // -----------------------------------------------------------

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
          // pagination={false}
          rowClassName="editable-row"
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
            <Option value="Graduation">Graduation</Option>
            <Option value="Post Graduation">Post Graduation</Option>
            <Option vale="Doctorate">Doctorate</Option>
            <Option value="Diploma">Diploma</Option>
            <Option value="Pre University">Pre University</Option>
            <Option value="Certification">Certification</Option>
            <Option value="Others">Others</Option>
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
        <Button type="text" style={{ marginTop: "15px" }} onClick={showCert}>
          <PlusCircleOutlined /> Add
        </Button>
      </div>
    </Form>
  );
}

export default CertificateID;
