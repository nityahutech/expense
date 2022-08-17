import { useEffect, useState } from "react";
import { Col, Divider, Row } from "antd";
import moment from "moment";
import { UploadOutlined } from "@ant-design/icons";
import {
  Cascader,
  Input,
  Select,
  // handleChange,
  //   Option,
  Radio,
  Space,
  Button,
  DatePicker,
  Form,
  Upload,
} from "antd";
const { Option } = Select;

const handleChange = (value) => {
  console.log(`selected ${value}`);
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
const dateFormat = "yyyy-MM-DD";
const { TextArea } = Input;
const Editexpense = (props) => {
  const [amount, setAmount] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(0);
  const [optionValue, setOptionValue] = useState("");
  const [paidBy, setPaidBy] = useState("");
  const [date, setdate] = useState(moment(new Date()).format(dateFormat));
  const [paidTo, setPaidTo] = useState("");
  const [description, setDescription] = useState("");
  function calculateTotal() {
    setTotal(amount * quantity);
  }
  function submitteD() {
    alert("update successfully");
  }

  useEffect(() => {
    console.log("props:::", props);
    const quantityVal = props.record ? props.record.quantity : 0;
    const amountVal = props.record ? props.record.amount : 0;
    const category = props.record ? props.record.catname : "";
    const paidByName = props.record ? props.record.name : "";
    const dateVal = props.record
      ? moment(new Date(props.record.date)).format(dateFormat)
      : moment(new Date()).format(dateFormat);
    const paidToname = props.record ? props.record.paidname : "";
    // const statusTag = props.record
    //   ? props.record.status
    //   : "Status of the payment";
    const description = props.record ? props.record.description : "";
    setAmount(amountVal);
    setQuantity(quantityVal);
    setTotal(amountVal * quantityVal);
    setOptionValue(category);
    setPaidBy(paidByName);
    setdate(dateVal);
    setPaidTo(paidToname);
    setDescription(description);
  }, [props]);
  console.log("optionValue::: ", optionValue);
  console.log("paidBy::: ", paidBy);
  console.log("date:::", date);
  console.log("paidTo:::", paidTo);
  console.log("description:::", description);
  return (
    <Col xs={22} sm={22} md={22}>
      <Form
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 16,
        }}
        fields={[
          {
            name: ["expensename"],
            value: optionValue,
          },
          {
            name: ["name"],
            value: paidBy,
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
            name: ["paidTo"],
            value: paidTo,
          },
          {
            name: ["Textarea"],
            value: description,
          },
        ]}
        layout="horizontal"
      >
        <Form.Item
          style={{ marginBottom: "10px" }}
          name="expensename"
          label="Expense Name"
          // rules={[
          //   {
          //     required: true,
          //     message: "Please choose a category",
          //   },
          // ]}
        >
          <Select
            className="category"
            onChange={(value) => {
              setOptionValue(value);
            }}
          >
            <Option value="food">Food</Option>
            <Option value="water">Water</Option>
            <Option value="all">All Category</Option>
          </Select>
        </Form.Item>

        {/* ------------------------------Paid By------- */}

        <Form.Item
          style={{ marginBottom: "10px" }}
          label="Paid By"
          name="name"
          // rules={[
          //   {
          //     required: true,
          //     message: "Please enter your name",
          //   },
          // ]}
        >
          <Input
            onChange={(e) => {
              setPaidBy(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item
          style={{ marginBottom: "10px" }}
          label="Paid To"
          name="paidTo"
          // rules={[
          //   {
          //     required: true,
          //     message: "Please enter your name",
          //   },
          // ]}
        >
          <Input
            onChange={(e) => {
              setPaidTo(e.target.value);
            }}
          />
        </Form.Item>

        {/* ----------------------------------Status------- */}

        {/* <Form.Item
        style={{ marginBottom: "10px" }}
        label="Status"
        name="status"
        // rules={[
        //   {
        //     message: "Please enter the paymeny status",
        //     required: true,
        //   },
        // ]}
      >
        <Select
          defaultValue="Status of the payment"
          style={{
            width: "100%",
          }}
          onChange={(value) => {
            setStatus(value);
          }}
        >
          <Option value="paid">Paid</Option>
          <Option value="unpaid">Unpaid</Option>
        </Select>
      </Form.Item> */}
        {/* ----------------------------------Datepicker------- */}
        <Form.Item
          style={{ marginBottom: "10px" }}
          name="date"
          label="Date"
          // rules={[
          //   {
          //     required: true,
          //     message: "Please Choose a Date",
          //   },
          // ]}
        >
          <DatePicker
            defaultValue={moment(date, dateFormat)}
            format={dateFormat}
            style={{ width: "100%" }}
            placeholder="Choose Date"
            onChange={(value) => {
              setdate(value);
            }}
          />
        </Form.Item>
        {/* --------------------------------------Amount------- */}

        <Form.Item
          style={{ marginBottom: "10px" }}
          label="Amount"
          name="amount"
          // rules={[
          //   {
          //     required: true,
          //     message: "Please enter the amount",
          //   },
          // ]}
        >
          <Input
            value={amount}
            onChange={(e) => {
              const amt = e.target.value;
              setAmount(amt);
              setTotal(amt * quantity);
            }}
            placeholder="Enter Amount Here"
          />
        </Form.Item>
        {/* --------------------------------------Quantity------- */}

        <Form.Item
          style={{ marginBottom: "10px" }}
          name="quantity"
          label="Quantity"
          // rules={[
          //   {
          //     required: true,
          //     message: "Please enter the quantity of the items/services",
          //   },
          // ]}
        >
          <Input
            value={quantity}
            onChange={(e) => {
              const qnt = e.target.value;
              setQuantity(qnt);
              setTotal(amount * qnt);
            }}
            placeholder="Quantity of the item"
          />
        </Form.Item>
        {/* --------------------------------------Sub-total------- */}

        <Form.Item label="Subtotal" style={{ marginBottom: "10px" }}>
          <Input readonly value={total} placeholder="Total" />
        </Form.Item>

        {/* -----------------------Text-area--------------- */}

        <Form.Item
          style={{ marginBottom: "10px" }}
          label="Descriptions"
          name="Textarea"
          // rules={[
          //   {
          //     required: true,
          //     message: "Please enter the Description ",
          //   },
          // ]}
        >
          <TextArea onChange={(e) => setDescription(e.target.value)} />
        </Form.Item>

        {/* <Form.Item style={{ marginBottom: "0" }}>
        <Upload
          multiple
          listType="text"
          action={"http://localhost:3001/"}
          showUploadList={{ showRemoveIcon: true }}
          beforeUpload={(file) => {
            console.log({ file });
            return false;
          }}
        >
          <Button className="uploadout" icon={<UploadOutlined />}>
            Upload
          </Button>
        </Upload>
      </Form.Item> */}
      </Form>
    </Col>
  );
};
export default Editexpense;
