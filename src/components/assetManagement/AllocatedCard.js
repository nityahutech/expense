import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Row,
  Col,
  Input,
  Form,
  DatePicker,
  Select,
  message,
  Modal,
  Skeleton,
} from "antd";
import {
  UploadOutlined,
  CloseOutlined,
  CheckOutlined,
  PlusCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import {
  capitalize,
  showNotification,
  getBase64,
} from "../../contexts/CreateContext";
import AssetContext from "../../contexts/AssetContext";
import moment from "moment";
import "../assetManagement/RepairRequestTable.css";
import FormItem from "antd/es/form/FormItem";
import { useAuth } from "../../contexts/AuthContext";
const { Option } = Select;

const AllocatedCard = (props) => {
  console.log("ffffffffffff", props.data.empId);
  const imgRef = React.useRef(null);
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState("");
  const [editAsset, setEditAsset] = useState(false);
  const [data, setData] = useState([]);
  const [dob, setDob] = useState("");
  const [addButton, setAddButton] = useState(true);
  const [isBigFile, setIsBigFile] = useState(false);
  const [fileName, setFileName] = useState(null);
  const [editContent, showEditContent] = useState(false);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const {currentUser} = useAuth()
  console.log("ffffffffffff", currentUser.uid,);

  const onFinish = (values) => {
    // console.log("ffffffffffff", values);

    const allAssetData = {
      lapname: values.lapname,
      modelName: values.modelName,
      serialNum: values.serialNum,
      charger: values.charger,
      dateOfRepair: values.dateOfRepair.format("DD-MM-YYYY"),
      lapBag: values.lapBag,
      empId: currentUser.uid,
      empCode: props.data.empId,
      name: props.data.name,
      status: "Pending",
      type: "Allotment",
      // photo: imageUrl || null,
    };
    try {
      AssetContext.addAsset(allAssetData, fileName, currentUser.uid);
      showNotification("success", "Success", "New Laptop Alloctment added");
      const timer = setTimeout(() => {
        getEmpAllAsset();
      }, 3000);
      setEditAsset(false);
    } catch (error) {
      console.log(error);
      showNotification("error", "Error", "Error In alloctment");
    }
  };

  useEffect(() => {
    getEmpAllAsset();
  }, []);

  const getEmpAllAsset = async () => {
    let assetData = await AssetContext.getRepairData(currentUser.uid, true);
    // console.log(assetData);
    setLoading(true);
    setData(assetData[0]);
    setFileName(assetData[0]?.upload);
    setImageUrl(assetData[0]?.upload);
    setLoading(false);
    if (assetData.length > 0) {
      setAddButton(false);
    }
    // console.log("assetData", assetData[0]);
  };

  const imgDiv = () => {
    // console.log(fileName, imageUrl);
    if (fileName == "" || fileName == null) {
      return editContent == true ? (
        <div className="noImage">No Image</div>
      ) : (
        <Button className="imgDel" onClick={(e) => handleClick(e)}>
          <input
            className="imgInp"
            style={{
              display: "none",
            }}
            type="file"
            id="logo"
            name="logo"
            ref={imgRef}
            onChange={(e) => handleChange(e)}
          />
          <UploadOutlined /> Upload Photo
        </Button>
      );
    } else {
      return (
        <div
          className={editContent === false ? "hoverImgCont" : ""}
          style={{
            position: "relative",
            width: "150px",
            height: "170px",
            // border: "1px solid #05445e"
          }}
        >
          <img
            src={imageUrl}
            style={{
              width: "150px",
              height: "170px",
              border: "1px solid #05445e",
            }}
          />
          {editContent === false ? (
            <div className="imageOverlay">
              <DeleteOutlined className="hoverIcon" onClick={onReset} />
              <button onClick={() => setVisible(true)}>Preview Image</button>
              <Modal
                visible={visible}
                onCancel={() => setVisible(false)}
                footer={null}
              >
                <img src={imageUrl} alt="Preview" style={{ width: "100%" }} />
              </Modal>
            </div>
          ) : null}
        </div>
      );
    }
  };

  const handleClick = () => {
    imgRef.current.click();
  };

  function checkFileSize(size, fileName) {
    if (Math.round(size / 1024) <= 200) {
      setFileName(fileName);
      setIsBigFile(false);
    } else {
      setFileName(null);
      setIsBigFile(true);
    }
  }

  const handleChange = (event) => {
    if (!event) {
      return;
    }
    const fileUploaded = event.target.files[0];
    getBase64(fileUploaded, (url) => {
      setImageUrl(url);
    });
    checkFileSize(fileUploaded.size, fileUploaded);
  };

  function onReset() {
    setIsBigFile(false);
    setFileName(null);
    setImageUrl("");
  }

  return (
    <div className="personalCardDiv">
      <Row className="Row-Card">
        <Col span={24}>
          <Form
            layout="vertical"
            form={form}
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
            onFinish={onFinish}
          >
            {loading ? (
              <Skeleton active />
            ) : (
              <Card
                title=" Laptop Allotment "
                className="overview"
                hoverable={true}
                bordered={true}
              >
                {editAsset === true ? (
                  <>
                    <Row span={24} gutter={[16, 16]}>
                      <Col xs={24} sm={12} md={8}>
                        <Form.Item
                          label="Laptop Name"
                          initialValue={data?.lapname}
                          name="lapname"
                          onChange={(e) => {
                            const str = e.target.value;
                            const caps = str
                              .split(" ")
                              .map(capitalize)
                              .join(" ");
                            form.setFieldsValue({
                              lapname: caps,
                            });
                          }}
                          rules={[
                            {
                              required: true,
                              message: "Please enter Laptop Name",
                            },
                            {
                              pattern: /^[a-zA-Z\s]*$/,
                              message: "Please enter Valid Laptop Name",
                            },
                          ]}
                        >
                          <Input
                            maxLength={50}
                            className="inputFields"
                            placeholder="Enter Laptop Name"
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12} md={8}>
                        <Form.Item
                          label="Model Name"
                          initialValue={data?.modelName}
                          name="modelName"
                          // onKeyPress={(event) => {
                          //   if (checkAlphabets(event)) {
                          //     event.preventDefault();
                          //   }
                          // }}
                          rules={[
                            {
                              required: true,

                              message: "Please enter Model Name",
                            },
                            {
                              pattern: /^[a-zA-Z\s]*$/,
                              message: "Please enter Valid Model Name",
                            },
                          ]}
                        >
                          <Input
                            maxLength={30}
                            className="inputFields"
                            onChange={(e) => {
                              const str = e.target.value;
                              const caps = str
                                .split(" ")
                                .map(capitalize)
                                .join(" ");
                              form.setFieldsValue({
                                modelName: caps,
                              });
                            }}
                            placeholder="Enter Model Name"
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12} md={8}>
                        <Form.Item
                          label="Serial Number"
                          initialValue={data?.serialNum}
                          name="serialNum"
                          rules={[
                            {
                              required: true,
                              message: "Please enter Serial Number",
                            },
                            {
                              pattern: /[0-9a-zA-Z]/,
                              message: "Please enter Valid Serial Number",
                            },
                          ]}
                        >
                          <Input
                            type="text"
                            className="inputFields"
                            maxLength={60}
                            onChange={(e) => {
                              const str = e.target.value;
                              const caps = str
                                .split(" ")
                                .map(capitalize)
                                .join(" ");
                              form.setFieldsValue({
                                serialNum: caps,
                              });
                            }}
                            placeholder="Enter Serial Number"
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12} md={8}>
                        <Form.Item
                          label="Charger"
                          name="charger"
                          initialValue={data?.charger}
                          rules={[
                            {
                              required: true,
                              message: "Please Choose Yes or No",
                            },
                          ]}
                        >
                          <Select
                            placeholder="Select"
                            className="selectFields"
                          >
                            <Option value="Yes">Yes</Option>
                            <Option value="No">No</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12} md={8}>
                        <Form.Item
                          label="Date of Issue"
                          initialValue={
                            data?.dateOfRepair
                              ? moment(data?.dateOfRepair, "DD-MM-YYYY")
                              : null
                          }
                          name="dateOfRepair"
                          rules={[
                            {
                              required: true,
                              message: "Please Choose a Date",
                            },
                          ]}
                        >
                          {/* format={dateFormatList} */}
                          <DatePicker
                            format="DD-MM-YYYY"
                            className="dateFields"
                            // format={dateFormatList}
                            // defaultValue= {dob?moment(dob, "DD-MM-YYYY"):null}
                            onChange={(e) => {
                              setDob(e.format("DD-MM-YYYY"));
                            }}
                            // disabledDate={(e) => disabledDate(e)}
                            value={dob}
                            placeholder="Choose Date"
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12} md={8}>
                        <Form.Item
                          label="Laptop Bag"
                          name="lapBag"
                          initialValue={data?.lapBag}
                          rules={[
                            {
                              required: true,
                              message: "Please Choose Yes or No ",
                            },
                          ]}
                        >
                          <Select
                            placeholder="Select"
                            className="selectFields"
                          >
                            <Option value="Yes">Yes</Option>
                            <Option value="No">No</Option>
                          </Select>
                        </Form.Item>
                      </Col>

                      <Col
                        span={24}
                        xs={24}
                        sm={24}
                        md={7}
                        lg={6}
                        xl={6}
                        xxl={6}
                      >
                        <FormItem
                          label="Upload Image"
                          name="upload"
                        // rules={[
                        //   {
                        //     required: true,
                        //     message: "Please upload file",
                        //   },
                        // ]}
                        >
                          {isBigFile
                            ? message.error(
                              "File size must be less than 200Kb."
                            )
                            : ""}
                          {imgDiv()}
                        </FormItem>
                      </Col>
                    </Row>
                  </>
                ) : Object.keys([data]).length != 0 ? (
                  <>
                    {/* ---------------data storage state */}
                    <Row span={24} gutter={[16, 16]}>
                      <Col xs={24} sm={12} md={8}>
                        {addButton === false ? (
                          <div className="lapAllot">Laptop Name </div>
                        ) : null}
                        {data ? data?.lapname : null}
                      </Col>
                      <Col xs={24} sm={12} md={8}>
                        {addButton === false ? (
                          <div className="lapAllot">Model Name </div>
                        ) : null}
                        {data ? data?.modelName : null}
                      </Col>
                      <Col xs={24} sm={12} md={8}>
                        {addButton === false ? (
                          <div className="lapAllot">Serial Number </div>
                        ) : null}
                        {data ? data?.serialNum : null}
                      </Col>
                      <Col xs={24} sm={12} md={8}>
                        {addButton === false ? (
                          <div className="lapAllot">Charger </div>
                        ) : null}
                        {data ? data?.charger : null}
                      </Col>
                      <Col xs={24} sm={12} md={8}>
                        {addButton === false ? (
                          <div className="lapAllot">Date of Issue </div>
                        ) : null}
                        {data ? data?.dateOfRepair : null}
                      </Col>
                      <Col xs={24} sm={12} md={8}>
                        {addButton === false ? (
                          <div className="lapAllot">Laptop Bag </div>
                        ) : null}
                        {data ? data?.lapBag : null}
                      </Col>
                      <Col xs={24} sm={12} md={8}>
                        {addButton === false ? (
                          <div
                            className={
                              editContent === true ? "hoverImgCont" : null
                            }
                            style={{
                              position: "relative",
                              width: "150px",
                              height: "170px",
                              // border: "1px solid #05445e"
                            }}
                          >
                            <img
                              src={imageUrl}
                              style={{
                                width: "150px",
                                height: "170px",
                                border: "1px solid #05445e",
                              }}
                            />
                            {editContent === true ? (
                              <div className="imageOverlay">
                                <DeleteOutlined
                                  className="hoverIcon"
                                  onClick={onReset}
                                />
                              </div>
                            ) : null}
                          </div>
                        ) : null}
                      </Col>
                    </Row>
                  </>
                ) : null}

                <>
                  {addButton === true ? (
                    <Button
                      type="primary"
                      style={{
                        // marginLeft: "10px",
                        background: "#1963a6",
                        border: "1px solid #1963A6",
                        marginTop: "20px",
                      }}
                      onClick={() => {
                        setEditAsset(true);
                        setAddButton(false);
                      }}
                    >
                      <PlusCircleOutlined />
                      Add
                    </Button>
                  ) : null}
                </>

                {editAsset === true ? (
                  <Row gutter={[16, 16]} className="buttonRow">
                    <Col xs={24} sm={8} md={7} lg={6} xl={4} xxl={2}>
                      <Button
                        type="text"
                        style={{ fontSize: 15 }}
                        onClick={() => {
                          setEditAsset(false);
                          setAddButton(true);
                        }}
                      >
                        <CloseOutlined /> CANCEL
                      </Button>
                    </Col>
                    <Col xs={24} sm={8} md={7} lg={6} xl={4} xxl={2}>
                      <Button
                        type="primary"
                        htmlType="submit"
                        style={{
                          // marginLeft: "10px",
                          backgroundColor: "#1963A6",
                          borderColor: "#1963A6",
                          width: "119px",
                        }}
                      // onClick={() => {
                      //   // setAddButton(true);
                      //   setEditAsset(false);
                      // }}
                      >
                        <CheckOutlined /> SAVE
                      </Button>
                    </Col>
                  </Row>
                ) : null}
              </Card>
            )}
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default AllocatedCard;
