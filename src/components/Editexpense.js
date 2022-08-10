import { useEffect, useState } from "react";
import { Col, Divider, Row } from "antd";
import moment from "moment";
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
} from "antd";
const { Option } = Select;

const handleChange = (value) => {
  console.log(`selected ${value}`);
};

const paystatus = [
  {
    value: "Paid",
    label: "Paid",
  },
  {
    value: "Unpaid",
    label: "Unpaid",
  },
];
const dateFormat = "yyyy-MM-DD";
const { TextArea } = Input;
const Editexpense = (props) => {
  const [amount, setAmount] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(0);
  const [optionValue, setOptionValue] = useState("Choose Category");
  const [paidBy, setPaidBy] = useState("");
  const [date, setdate] = useState(moment(new Date()).format(dateFormat));
  const [status, setStatus] = useState("Status of the payment");
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
    const category = props.record ? props.record.catname : "Choose Category";
    const paidByName = props.record ? props.record.name : "";
    const dateVal = props.record
      ? moment(new Date(props.record.date)).format(dateFormat)
      : moment(new Date()).format(dateFormat);
    const statusTag = props.record
      ? props.record.status
      : "Status of the payment";
    const description = props.record ? props.record.description : "";
    setAmount(amountVal);
    setQuantity(quantityVal);
    setTotal(amountVal * quantityVal);
    setOptionValue(category);
    setPaidBy(paidByName);
    setdate(dateVal);
    setStatus(statusTag);
    setDescription(description);
  }, [props]);
  console.log("optionValue::: ", optionValue);
  console.log("paidBy::: ", paidBy);
  console.log("date:::", date);
  console.log("status:::", status);
  console.log("description:::", description);
  return (
    <>
      <div
        style={{
          border: "1px solid black",
          margin: "10px",
          borderRadius: "10px",
        }}
      >
        <Divider orientation="center">Expense Register</Divider>
        <Form
          labelcol={{
            span: 4,
          }}
          wrappercol={{
            span: 14,
          }}
          name="form_name"
          fields={[
            {
              name: ["category"],
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
              name: ["cascade"],
              value: status,
            },
            {
              name: ["Textarea"],
              value: description,
            },
          ]}
        >
          <Row gutter={[24, 8]}>
            {/* ------------column-spacer-------------------- */}
            <Col span={6} style={{ background: "" }}></Col>
            {/* ------------Left-column-------------------- */}
            <Col span={6} style={{ background: "" }}>
              <Divider orientation="left" orientationMargin={0}>
                Category
              </Divider>
              <Form.Item
                name="category"
                // rules={[
                //   {
                //     message: "Please enter the expence category",
                //     required: true,
                //   },
                // ]}
              >
                <Select
                  style={{
                    width: "100%",
                  }}
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
              <Divider orientation="left" orientationMargin={0}>
                Paid By
              </Divider>
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please enter your name",
                  },
                ]}
              >
                <Input
                  onChange={(e) => {
                    setPaidBy(e.target.value);
                  }}
                  placeholder="Enter Customer Name"
                />
              </Form.Item>

              {/* ----------------------------------Status------- */}
              <Divider orientation="left" orientationMargin={0}>
                Status
              </Divider>
              <Form.Item
                name="cascade"
                rules={[
                  {
                    message: "Please enter the paymeny status",
                    required: true,
                  },
                ]}
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
              </Form.Item>
            </Col>
            {/* ------------Right-column-------------------- */}
            <Col span={6} style={{ background: "" }}>
              {/* ----------------------------------Datepicker------- */}
              <Divider orientation="left" orientationMargin={0}>
                Date
              </Divider>
              <Form.Item
                name="date"
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
              <Divider orientation="left" orientationMargin={0}>
                Amount
              </Divider>
              <Form.Item
              // className="numder-inputs"
              // name="amount"
              // rules={[
              //   {
              //     required: true,
              //     message: "Please enter the amount",
              //   },
              // ]}
              >
                <Input
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter Amount Here"
                />
              </Form.Item>
              {/* --------------------------------------Quantity------- */}
              <Divider orientation="left" orientationMargin={0}>
                Quantity
              </Divider>
              <Form.Item
              // name="quantity"
              // rules={[
              //   {
              //     required: true,
              //     message: "Please enter the quantity of the items/services",
              //   },
              // ]}
              >
                <Input
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Quantity of the item"
                />
              </Form.Item>
              {/* --------------------------------------Sub-total------- */}
              <Divider orientation="left" orientationMargin={0}>
                Subtotal
              </Divider>
              <Form.Item>
                <Input
                  onClick={calculateTotal}
                  value={total}
                  placeholder="Total"
                />
              </Form.Item>
            </Col>
            {/* ------------column-spacer-------------------- */}
            <Col span={6} style={{ background: "" }}></Col>
          </Row>
          {/* -----------------------Text-area--------------- */}
          <Row gutter={24}>
            <Col className="gutter-row" span={6}></Col>
            <Col className="gutter-row" span={12}>
              <div style={{ padding: "8px 0" }}>
                <Divider orientation="left" orientationMargin={0}>
                  Descriptions
                </Divider>
                <Form.Item
                  name="Textarea"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the Description ",
                    },
                  ]}
                >
                  <TextArea
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                  />
                </Form.Item>
              </div>
            </Col>
            <Col className="gutter-row" span={6}></Col>
          </Row>
          {/* -----------------------Buttons--------------- */}
          <Row gutter={24}>
            <Col className="gutter-row" span={14}></Col>
            <Col className="gutter-row" span={10}>
              <Form.Item key="2">
                <Button
                  key="1"
                  onClick={submitteD}
                  style={{ marginRight: "10px" }}
                >
                  Submit
                </Button>

                <Button key="2">Cancel</Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};
export default Editexpense;
