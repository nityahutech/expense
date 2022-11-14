import { useEffect, useState } from "react";
import { Col, Row } from "antd";
import moment from "moment";
import { UploadOutlined } from "@ant-design/icons";
import ExpenseContext from "../contexts/ExpenseContext";
import {
  Cascader,
  Input,
  Select,
  Radio,
  Space,
  notification,
  Button,
  DatePicker,
  Form,
  Upload,
} from "antd";
import "../style/Editexpense.css";
import { Content } from "antd/lib/layout/layout";
const { Option } = Select;
const handleChange = (value) => {};
const showNotification = (type, msg, desc) => {
  notification[type]({
    message: msg,
    description: desc,
  });
};
// const paystatus = [
//   {
//     value: "Paid",
//     label: "Paid",
//   },
//   {
//     value: "Unpaid",
//     label: "Unpaid",
//   },
// ];
const dateFormat = "DD-MM-YYYY";
const { TextArea } = Input;
const Editexpense = (props) => {
  // const [showAlert, setShowAlert] = useState(false);
  const [amount, setAmount] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [subtotal, setsubtotal] = useState(0);
  const [catname, setcatname] = useState("");
  const [name, setname] = useState("");
  const [date, setdate] = useState("");
  const [paidname, setpaidname] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  function calculatesubtotal() {
    setsubtotal(amount * quantity);
  }
  async function submitEdit() {
    try {
      const editedRecord = {
        catname,
        name,
        paidname,
        date,
        amount,
        quantity,
        subtotal,
        status,
        description,
      };
      ExpenseContext.updateExpense(props.record.key, editedRecord);
      props.setIsModalVisible(false);
      props.reloadData();
      showNotification("success", "Success", "Record updated successfuly");
      return;
    } catch (error) {
      props.setIsModalVisible(false);
      showNotification("error", "Failed", "Record update failed");
    }
  }
  useEffect(() => {
    const quantityVal = props.record ? props.record.quantity : 0;
    const amountVal = props.record ? props.record.amount : 0;
    const category = props.record ? props.record.catname : "";
    const nameby = props.record ? props.record.name : "";
    const dateVal = props.record ? props.record.date : "";
    const paidname = props.record ? props.record.paidname : "";
    const statusTag = props.record ? props.record.status : "";
    // const statusTag = props.record
    //   ? props.record.status
    //   : "Status of the payment";
    const description = props.record ? props.record.description : "";
    setAmount(amountVal);
    setQuantity(quantityVal);
    setsubtotal(amountVal * quantityVal);
    setcatname(category);
    setname(nameby);
    setdate(dateVal);
    setpaidname(paidname);
    setDescription(description);
    setStatus(statusTag);
  }, [props]);
  function cancel() {
    props.setIsModalVisible(false);
  }
  const cancelStyle = {
    float: "right",
  };
  const buttonStyle = {
    marginRight: "5px",
    color: "white",
    backgroundColor: "#1890ff",
    float: "right",
  };
  const checkNumbervalue = (event) => {
    if (!/^[0-9]*\.?[0-9]*$/.test(event.key) && event.key !== "Backspace") {
      return true;
    }
  };
  const checkAlphabets = (event) => {
    if (!/^[a-zA-Z ]*$/.test(event.key) && event.key !== "Backspace") {
      return true;
    }
  };
  return (
    <Form
      labelCol={{
        span: 20,
      }}
      wrapperCol={{
        span: 20,
      }}
      fields={[
        {
          name: ["expensename"],
          value: catname,
        },
        {
          name: ["name"],
          value: name,
        },
        {
          name: ["quantity"],
          value: quantity,
        },
        {
          name: ["amount"],
          value: amount,
        },
        {
          name: ["date"],
          value: moment(date, dateFormat),
        },
        {
          name: ["paidname"],
          value: paidname,
        },
        {
          name: ["Textarea"],
          value: description,
        },
        {
          name: ["status"],
          value: status,
        },
      ]}
      layout="vertical"
    >
      <Row>
        <Col xs={22} sm={22} md={12}>
          <Form.Item
            style={{ marginBottom: "10px" }}
            name="expensename"
            label="Expense Name&nbsp;"
            onKeyPress={(event) => {
              if (checkAlphabets(event)) {
                event.preventDefault();
              }
            }}
            rules={[
              {
                required: true,
                message: "Please enter Expense Name",
              },
              {
                pattern: /^[a-zA-Z\s]*$/,
                message: "Please enter Valid Name",
              },
            ]}
          >
            <Input
              maxLength={20}
              onChange={(e) => {
                const inputval = e.target.value;
                const newVal =
                  inputval.substring(0, 1).toUpperCase() +
                  inputval.substring(1);
                setcatname(newVal);
              }}
            />
          </Form.Item>
        </Col>
        <Col xs={22} sm={22} md={12}>
          <Form.Item
            style={{ marginBottom: "10px" }}
            label="Paid By&nbsp;"
            name="name"
            onKeyPress={(event) => {
              if (checkAlphabets(event)) {
                event.preventDefault();
              }
            }}
            rules={[
              {
                required: true,
                message: "Please enter Customer Name",
              },
              {
                pattern: /^[a-zA-Z\s]*$/,
                message: "Please enter Valid Name",
                // /^[a-zA-Z]+$/g
              },
            ]}
          >
            <Input
              maxLength={20}
              onChange={(e) => {
                const inputval = e.target.value;
                const newVal =
                  inputval.substring(0, 1).toUpperCase() +
                  inputval.substring(1);
                setname(newVal);
              }}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col xs={22} sm={22} md={12}>
          <Form.Item
            style={{ marginBottom: "10px" }}
            label="Paid To&nbsp;"
            name="paidname"
            onKeyPress={(event) => {
              if (checkAlphabets(event)) {
                event.preventDefault();
              }
            }}
            rules={[
              {
                required: true,
                message: "Please enter Vendor",
              },
              {
                pattern: /^[a-zA-Z\s]*$/,
                message: "Please enter Valid Name",
              },
            ]}
          >
            <Input
              maxLength={20}
              onChange={(e) => {
                const inputval = e.target.value;
                const newVal =
                  inputval.substring(0, 1).toUpperCase() +
                  inputval.substring(1);
                setpaidname(newVal);
              }}
            />
          </Form.Item>
        </Col>
        <Col xs={22} sm={22} md={12}>
          <Form.Item
            style={{ marginBottom: "10px" }}
            name="date"
            label="Date&nbsp;"
            rules={[
              {
                required: true,
                message: "Please Choose a Date",
              },
            ]}
          >
            <DatePicker
              format={dateFormat}
              style={{ width: "100%" }}
              onChange={(e) => {
                setdate(e.format(dateFormat));
              }}
            />
          </Form.Item>
        </Col>
        {/* <Col xs={22} sm={22} md={12}>
          <Form.Item
            style={{ marginBottom: "10px" }}
            label="Status&nbsp;"
            name="status"
            className="Required"
            rules={[
              {
                message: "Please enter the paymeny status",
                required: true,
              },
            ]}
          >
            <Select
              defaultValue={status}
              style={{
                width: "100%",
              }}
              onChange={(value) => {
                setStatus(value);
              }}
            >
              <  value="Paid">Paid</>
              <Option value="Unpaid">Unpaid</Option>
            </Select>
          </Form.Item>
        </Col> */}
      </Row>
      <Row>
        <Col xs={22} sm={22} md={12}>
          <Form.Item
            style={{ marginBottom: "10px" }}
            label="Amount&nbsp;"
            name="amount"
            onKeyPress={(event) => {
              if (checkNumbervalue(event)) {
                event.preventDefault();
              }
            }}
            rules={[
              {
                required: true,
                message: "Please enter the amount",
                pattern: /^[0-9\b]+$/,
              },
              { whitespace: true },
            ]}
          >
            <Input
              maxLength={8}
              value={amount}
              onChange={(e) => {
                const amt = e.target.value;
                setAmount(amt);
                setsubtotal(amt * quantity);
              }}
            />
          </Form.Item>
        </Col>
        <Col xs={22} sm={22} md={12}>
          <Form.Item
            style={{ marginBottom: "10px" }}
            name="quantity"
            label="Quantity&nbsp;"
            onKeyPress={(event) => {
              if (checkNumbervalue(event)) {
                event.preventDefault();
              }
            }}
            rules={[
              {
                required: true,
                message: "Please enter the quantity ",
                pattern: /^[0-9\b]+$/,
              },
            ]}
          >
            <Input
              maxLength={4}
              value={quantity}
              onChange={(e) => {
                const qnt = e.target.value;
                setQuantity(qnt);
                setsubtotal(amount * qnt);
              }}
              placeholder="Quantity of the item"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col xs={22} sm={22} md={12}>
          <Form.Item
            label="Subtotal"
            className="Subtotal"
            style={{ marginBottom: "10px", Color: "black" }}
          >
            <Input readonly value={subtotal} disabled={true} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col xs={22}>
          <Form.Item
            style={{ marginBottom: "10px" }}
            label="Descriptions"
            name="Textarea"
            className="Description"
            // rules={[
            //   {
            //     required: true,
            //     message: "Please enter the Description ",
            //   },
            // ]}
          >
            <TextArea
              maxLength={50}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Item>
        </Col>
      </Row>
      <br />
      <Button style={cancelStyle} onClick={cancel}>
        Cancel
      </Button>
      <Button style={buttonStyle} onClick={submitEdit}>
        Submit
      </Button>
      <br />
      {/* <Form.Item style={{ marginBottom: "0" }}>
        <Upload
          multiple
          listType="text"
          action={"http://localhost:3001/"}
          showUploadList={{ showRemoveIcon: true }}
          beforeUpload={(file) => {
            return false;
          }}
        >
          <Button className="uploadout" icon={<UploadOutlined />}>
            Upload
          </Button>
        </Upload>
      </Form.Item> */}
    </Form>
  );
};
export default Editexpense;
