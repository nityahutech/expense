import { useEffect, useState } from "react";
import { Col, Divider, Row, Alert } from "antd";
import moment from "moment";
import { UploadOutlined } from "@ant-design/icons";
import ExpenseContext from '../contexts/ExpenseContext'
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
const dateFormat = "DD-MM-YYYY";
const { TextArea } = Input;
const Editexpense = (props) => {
  const [showAlert, setShowAlert] = useState(false);
  const [amount, setAmount] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [subtotal, setsubtotal] = useState(0);
  const [catname, setcatname] = useState("");
  const [name, setname] = useState("");
  const [date, setdate] = useState("");
  const [paidname, setpaidname] = useState("");
  const [description, setDescription] = useState("");
  function calculatesubtotal() {
    setsubtotal(amount * quantity);
  }

  async function submitEdit() {
    const editedRecord ={
      catname,
      name,
      paidname,
      date,
      amount,
      quantity,
      subtotal,
      description
    }
    console.log(editedRecord)
    ExpenseContext.updateExpense(props.record.key, editedRecord);
    setShowAlert(true)
  };

  useEffect(() => {
    const quantityVal = props.record ? props.record.quantity : 0;
    const amountVal = props.record ? props.record.amount : 0;
    const category = props.record ? props.record.catname : "";
    const nameby = props.record ? props.record.name : "";
    const dateVal = props.record ? props.record.date : "";
    const paidname = props.record ? props.record.paidname : "";
    // const statusTag = props.record
    //   ? props.record.status
    //   : "Status of the payment";
    const description = props.record ? props.record.description : "";
    console.log(props.record.key)
    setAmount(amountVal);
    setQuantity(quantityVal);
    setsubtotal(amountVal * quantityVal);
    setcatname(category);
    setname(nameby);
    setdate(dateVal);
    setpaidname(paidname);
    setDescription(description);
    console.log(dateVal)
    console.log(date)
}, [props]);
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
        ]}
        layout="horizontal"
        // onFinish={submitEdit}
      >
        <Form.Item
          style={{ marginBottom: "10px" }}
          name="expensename"
          label="Expense Name"
          // rules={[{
          //     required: true,
          //     message: "Please choose a category",
          //   },
          // ]}
        >
          <Input
            onChange={(e) => {
              const inputval = e.target.value;
              const newVal = inputval.substring(0, 1).toUpperCase() + inputval.substring(1);
              setcatname(newVal);
            }}
          />
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
              const inputval = e.target.value;
              const newVal = inputval.substring(0, 1).toUpperCase() + inputval.substring(1);
              setname(newVal);
            }}
          />
        </Form.Item>
        <Form.Item
          style={{ marginBottom: "10px" }}
          label="Paid To"
          name="paidname"
          // rules={[
          //   {
          //     required: true,
          //     message: "Please enter your name",
          //   },
          // ]}
        >
          <Input
            onChange={(e) => {
              const inputval = e.target.value;
              const newVal = inputval.substring(0, 1).toUpperCase() + inputval.substring(1);
              setpaidname(newVal);
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
        <DatePicker format={dateFormat} style={{ width: '100%' }}
          onChange = {(e) => { setdate(e.format(dateFormat))}}
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
              setsubtotal(amt * quantity);
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
              setsubtotal(amount * qnt);
            }}
            placeholder="Quantity of the item"
          />
        </Form.Item>
        {/* --------------------------------------Sub-subtotal------- */}

        <Form.Item label="Subsubtotal" style={{ marginBottom: "10px" }}>
          <Input readonly value={subtotal} placeholder="subtotal" />
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
        <br />
        {showAlert&& 
        <Alert
          message="Successfully Updated!"
          type="success"
        />}
        <br />
        <Button onClick={submitEdit}>Submit</Button>
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
