import { useState, useRef, useEffect } from "react";
import {
  Button,
  Modal,
  Form,
  Table,
  Input,
  Row,
  Col,
  Card,
  message,
  Select,
} from "antd";
import moment from "moment";
import { PlusCircleOutlined, DeleteOutlined, EditFilled } from "@ant-design/icons";
import Iframe from 'react-iframe';
import FormItem from "antd/es/form/FormItem";
import PolicyContext from "../../contexts/PolicyContext";
import "../../components/CompanyDetail/companystyle.css";
import { showNotification } from "../../contexts/CreateContext";

const Policies = () => {
  const [policy, setPolicy] = useState([]);
  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editModal, showEditModal] = useState(false);
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);
  const [edittitle, setEdittitle] = useState();
  const [editDescription, setEditDescription] = useState();
  const [editFileType, setEditFileType] = useState();

  const showPdfModal = () => {
    setLoading(true)
    setIsModalVisible(true);
  };

  const columns = [
    {
      title: "Policy Title",
      dataIndex: "idtitle",
      key: "idtitle",
      width: 150,
    },
    {
      title: "Policy Description",
      dataIndex: "iddescription",
      key: "iddescription ",
      width: 200,
    },
    {
      title: "Policy Version",
      dataIndex: "version",
      key: "version",
      width: 150,
      render: (_, record) => {
        return (
          <>
            <Select
              defaultValue="Version-1"
              style={{
                width: 120,
              }}
              onChange={handleChange}
              options={[
                {
                  value: 'Version-1',
                  label: 'Version-1',
                },
                {
                  value: 'Version-2',
                  label: 'Version-2',
                },

                {
                  value: 'Version-3',
                  label: 'Version-3',
                },
              ]}
            />


          </>
        );
      },
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: 150,
    },
    {
      title: "Uploaded File",
      dataIndex: "upload",
      key: "upload",
      width: 200,
      render: (data, record) => {
        return record.fileName ? (
          <a href={data} target="policyName" onClick={showPdfModal}>
            {record.fileName}
            {/* <Button type='primary'>Preview</Button> */}
          </a>
        ) : (
          <div>-</div>
        )
      },
    },
    {
      title: "Action",
      key: "action",
      fixed: 'right',
      width: 80,
      render: (_, record) => {
        return (
          <>
            <DeleteOutlined style={{ color: 'red' }}
              onClick={() => deleteData(record.id, record.fileName)}
            />
            <EditFilled style={{ paddingLeft: '10px', color: 'blue' }}
              onClick={() => {
                setEditDescription(record.iddescription)
                setEdittitle(record.idtitle)
                setEditFileType(record.fileName)
                showEditModal(true);


              }}

            />
          </>
        );
      },
    },
  ];


  function beforeUpload(file) {
    console.log(file.type);
  }

  function handleChange(event) {
    let file = event.target.files[0]
    console.log('handleupload', file)
    setFile(null);
    const isPdf = file.type === 'application/pdf';
    if (!isPdf) {
      message.error('You can only upload Pdf file!');
      return
    }

    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
      return
    }
    setFile(event.target.files[0]);
  }

  //----------------Edit Modal
  const EditData = () => {
    showEditModal(true);
  };

  const handleEditCancel = () => {
    showEditModal(false);
    form.resetFields();
  };

  async function addPolicy(values) {
    console.log('values', values)
    try {
      let newWorkDoc = {
        ...values,
        date: moment().format("DD/MM/YYYY")

      };
      await PolicyContext.createPolicy(newWorkDoc, file);
      setIsModalOpen(false);
      showNotification("success", "Success", "Upload Complete");
      const timer = setTimeout(() => {
        getData();
      }, 3500);
      return () => clearTimeout(timer);
    } catch {
      setIsModalOpen(false);
      showNotification("error", "Error", "Upload Failed");
    }
  }

  const deleteData = (id, fileName) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this record?",
      okText: "Yes",
      okType: "danger",

      onOk: () => {
        PolicyContext.deletePolicy(id, fileName)
          .then((response) => {
            showNotification("success", "Success", "Successfully deleted");
            getData();
          })
          .catch((error) => {
            showNotification("error", "Error", "Record not deleted ");
          });
      },
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    let alldata = await PolicyContext.getPolicy();
    console.log('alldata', alldata)
    // setData(alldata);
    setPolicy(alldata);
    setLoading(false);

  };

  const showModal = () => {
    setIsModalOpen(true);
    form.resetFields();
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  // if (loading) {
  //   return (
  //     <div
  //       style={{
  //         height: "70vh",
  //         width: "100%",
  //         display: "flex",
  //         alignItems: "center",
  //         justifyContent: "center",
  //       }}
  //     >
  //       <Spin
  //         size="large"
  //         style={{
  //           position: "absolute",
  //           top: "20%",
  //           left: "50%",
  //           margin: "-10px",
  //           zIndex: "100",
  //           opacity: "0.7",
  //           backgroundColor: "transparent",
  //         }}
  //       />
  //     </div>
  //   );
  // }

  return (
    <>
      <div
        className="education"
        style={{
          margin: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Row
          className="Row-Card"
          style={{
            width: '75%',
            margin: '10px',
            display: 'flex',
            alignItems: 'center'
          }}>
          <Col span={24}>
            <Form
              style={{ marginLeft: 0 }}
              action="/action_page.php"
              form={form}
              labelCol={{ span: 30 }}
              wrapperCol={{ span: 30 }}
              initialValues={{ remember: true }}
              autoComplete="off"
              onFinish={addPolicy}
              layout="vertical"
            >
              <Card
                title="Company Policies"
                className="policyCard"
                bordered={true}
                hoverable={true}
                style={{
                  width: '100%',
                  marginTop: 10,
                  borderRadius: "10px",
                  cursor: "default"
                }}
              >
                <Table
                  columns={columns}
                  pagination={false}
                  dataSource={policy}
                  scroll={{ x: 400 }}
                  className="policies"
                />
                <Button
                  type="primary"
                  onClick={showModal}
                  style={{ marginLeft: "10px", background: "#1963a6", border: "1px solid #1963A6", }}
                >
                  <PlusCircleOutlined />
                  Add
                </Button>
                {/* //---------------initial modal */}
                <Modal
                  bodyStyle={{ overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }}
                  className="viewAppraisal"
                  title="Add Policy"
                  centered
                  width={450}
                  open={isModalOpen}
                  onOk={() => {
                    form.submit();
                    handleOk();
                  }}
                  onCancel={handleCancel}
                  // visible={isModalVisible}
                  okText="Save"
                  closeIcon={
                    <div
                      className="modal-close"
                      onClick={() => {
                        setIsModalVisible(false);
                      }}
                      style={{ color: "#ffffff" }}
                    >
                      X
                    </div>
                  }
                >
                  <div className="div-discription">Title</div>
                  <Form.Item
                    name="idtitle"
                    rules={[
                      {
                        required: true,
                        message: "Enter Policy Name",
                      },
                      {
                        pattern: /^[a-zA-Z\s]*$/,
                        message: "Please Enter Valid Name ",
                      },
                    ]}
                  >
                    <Input
                      style={{
                        width: "100%",
                        borderBottom: "1px solid #ccc ",
                        paddingLeft: "0px",
                        marginTop: "10px",
                      }}
                      bordered={false}
                      required
                      placeholder="Enter Policy Name"
                    />
                  </Form.Item>
                  <div className="div-discription">Description</div>
                  <Form.Item
                    name="iddescription"
                    rules={[
                      {
                        required: true,
                        message: "Enter Description ",
                      },
                      {
                        pattern: /^[a-zA-Z\s]*$/,
                        message: " Please Enter Description",
                      },
                    ]}
                  >
                    <Input
                      style={{
                        width: "100%",
                        borderBottom: "1px solid #ccc ",
                        paddingLeft: "0px",
                        marginTop: "10px",
                      }}
                      bordered={false}
                      required
                      placeholder="Enter Description"
                    />
                  </Form.Item>
                  {/* <div className="div-discription">Date</div>
                  <Form.Item
                    name="date"

                  >
                    <DatePicker
                      format={dateFormat}
                      placeholder="Date of  Version"
                      style={{
                        width: "100%",
                        border: "1px solid #8692A6",
                        borderRadius: "4px",
                        background: "#ffffff",
                      }}
                    />
                  </Form.Item> */}
                  {/* <div className="div-discription">Version</div>
                  <Form.Item
                    name="version"
                    rules={[
                      {
                        required: true,
                        message: "Enter version ",
                      },
                      {
                        // pattern: /^[a-zA-Z\s]*$/,
                        message: " Please Enter version",
                      },
                    ]}
                  >
                    <Input
                      style={{
                        width: "100%",
                        borderBottom: "1px solid #ccc ",
                        paddingLeft: "0px",
                        marginTop: "10px",
                      }}
                      bordered={false}
                      required
                      placeholder="Enter versions"
                    />
                  </Form.Item> */}
                  <div className="div-discription">Uplode File</div>
                  <FormItem
                    name="upload"
                    rules={[
                      {
                        required: true,
                        message: 'Please upload file',
                      },
                    ]}
                  >
                    <div className='idpage'>
                      <Input
                        type="file"
                        accept='application/pdf'
                        id="upload"
                        name="upload"
                        onChange={handleChange}
                        beforeUpload={beforeUpload}
                      />
                    </div>
                  </FormItem>
                </Modal>
                {/* //---------------iframeModal */}
                <Modal
                  bodyStyle={{ overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }}
                  className="viewAppraisal"
                  centered
                  width={800}
                  visible={isModalVisible}
                  footer={null}
                  height="400px"
                  // closable={false}
                  title="Document Preview"

                  closeIcon={
                    <div
                      onClick={() => {
                        document.getElementById('policyName').src += 'about:blank';
                        setIsModalVisible(false);
                      }}
                      style={{ color: "#ffffff" }}
                    >
                      X
                    </div>
                  }
                >
                  <div style={{ position: 'relative', }}>
                    <Iframe style={{}}
                      // url="#"
                      width={750}
                      height="400px"
                      src='about:blank'
                      id="policyName"
                      className="myClassname"
                      display="initial"
                      position="relative"
                      overflow="hidden"
                      name='policyName'
                    />
                  </div>
                </Modal>
                {/* //---------------edit modal */}
                <Modal
                  bodyStyle={{ overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }}
                  className="viewAppraisal"

                  title="Edit Policy Detail"
                  centered
                  width={450}
                  open={editModal}
                  onOk={() => {
                    form1.submit();
                    // handleOk();
                  }}
                  onCancel={handleEditCancel}
                  visible={editModal}
                  okText="Save"
                  closeIcon={
                    <div
                      className="modal-close"
                      onClick={() => {
                        showEditModal(false);
                      }}
                      style={{ color: "#ffffff" }}
                    >
                      X
                    </div>
                  }
                >
                  <div className="div-discription">Title</div>
                  <Form.Item
                    initialValue={edittitle}
                    name="editIdtitle"
                    rules={[
                      {
                        required: true,
                        message: "Enter Policy Name",
                      },
                      {
                        pattern: /^[a-zA-Z\s]*$/,
                        message: "Please Enter Valid Name ",
                      },
                    ]}
                  >
                    <Input
                      style={{
                        width: "100%",
                        borderBottom: "1px solid #ccc ",
                        paddingLeft: "0px",
                        marginTop: "10px",
                      }}
                      bordered={false}
                      required
                      placeholder="Enter Policy Name"
                    />
                  </Form.Item>
                  <div className="div-discription">Description</div>
                  <Form.Item
                    initialValue={editDescription}
                    name="editIddescription"
                    rules={[
                      {
                        required: true,
                        message: "Enter Description ",
                      },
                      {
                        pattern: /^[a-zA-Z\s]*$/,
                        message: " Please Enter Description",
                      },
                    ]}
                  >
                    <Input
                      style={{
                        width: "100%",
                        borderBottom: "1px solid #ccc ",
                        paddingLeft: "0px",
                        marginTop: "10px",
                      }}
                      bordered={false}
                      required
                      placeholder="Enter Description"
                    />
                  </Form.Item>
                  {/* <div className="div-discription">Date</div>
                  <Form.Item
                    format={dateFormat}
                    // initialValue={moment(editPolicy.date, "DD-MM-YYYY")}
                    name="editDate"

                  >
                    <DatePicker

                      placeholder="Date of Revised Version"
                      style={{
                        width: "100%",
                        border: "1px solid #8692A6",
                        borderRadius: "4px",
                        background: "#ffffff",
                      }}
                    />
                  </Form.Item> */}
                  {/* <div className="div-discription">Version</div>
                  <Form.Item
                    initialValue={editPolicy.version}
                    name="editVersion"
                    rules={[
                      {
                        required: true,
                        message: "Enter version ",
                      },
                      {
                        // pattern: /^[a-zA-Z\s]*$/,
                        message: " Please Enter version",
                      },
                    ]}
                  >
                    <Input
                      style={{
                        width: "100%",
                        borderBottom: "1px solid #ccc ",
                        paddingLeft: "0px",
                        marginTop: "10px",
                      }}
                      bordered={false}
                      required
                      placeholder="Enter versions"
                    />
                  </Form.Item> */}
                  <div className="div-discription">Uplode File</div>
                  <FormItem
                    initialValue={editFileType}
                    name="editUpload"
                    rules={[
                      {
                        required: true,
                        message: 'Please upload file',
                      },
                    ]}
                  >
                    <div className='idpage'>
                      <Input
                        type="file"
                        accept='application/pdf'
                        id="upload"
                        name="upload"
                        onChange={handleChange}
                        beforeUpload={beforeUpload}
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
  );
};

export default Policies;
