import { Space, Table, Tag, DatePicker, Dropdown, Menu, message } from "antd";
import { Button, Tooltip, Select, Popover, Modal } from "antd";
import { Typography, Layout, Upload } from "antd";
// import axios from "axios";
import {
  AudioOutlined,
  EditOutlined,
  DeleteFilled,
  DeleteOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";
import { Input } from "antd";
import { Col, Divider, Row } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { SearchOutlined, UploadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/expenselist.css";
import Editexpense from "./Editexpense";
import { upload } from "@testing-library/user-event/dist/upload";

const { Title, Paragraph, Text, Link } = Typography;
const { Search } = Input;
const { Content } = Layout;

const data = [
  {
    key: "1",
    sn: "1",
    catname: "food",
    name: "Ekta",
    date: "2022-07-12",
    status: "Paid",
    quantity: 5,
    amount: 200,
    subtotal: 1000,
    description: "done",
  },
  {
    key: "2",
    sn: "2",
    catname: "water",
    name: "Pooja",
    date: "2022-07-20",
    status: "Unpaid",
    quantity: 5,
    amount: 500,
    subtotal: 2500,
    description: "pending",
  },
  {
    key: "subTotal",
    sn: "",
    catname: "",
    name: "",
    date: "",
    status: "",
    quantity: "",
    amount: "Total",
    subtotal: 3500,
    description: "",
  },
];

function ExpenseList() {
  const navigate = useNavigate();
  const [filterCriteria, setFilterCriteria] = useState({
    search: "",
    date: "",
    category: "all",
    status: "all",
  });

  const [allExpenses, setAllExpenses] = useState(data || []);
  const [filterExpenses, setFilterExpense] = useState(data || []);
  const [editedRecord, setEditedRecord] = useState(null);
  useEffect(
    function () {
      console.log("filterCriteria:: ", filterCriteria);
    },
    [filterCriteria]
  );

  useEffect(() => {
    console.log("filterExpenses:: ", filterExpenses);
  }, [filterExpenses]);
  const [modaldata, setmodaldata] = useState([]);

  const columns = [
    {
      title: "SL No.",
      dataIndex: "sn",
      key: "sn",
      responsive: ["md"],
      fixed: "left",
    },
    {
      title: "Category Name",
      dataIndex: "catname",
      key: "catname",
      responsive: ["md"],
      fixed: "left",
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.catname.length - b.catname.length,
      sortDirections: ["ascend", "descend"],
      render: (text) => <a className="catName">{text}</a>,
    },
    {
      title: "Paid By",
      dataIndex: "name",
      key: "name",
      responsive: ["md"],
      sorter: (a, b) => a.name - b.name,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      responsive: ["md"],
      sorter: (a, b) => a.date - b.date,
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      responsive: ["md"],
      sorter: (a, b) => a.status - b.status,
      render: (_, { status }) =>
        status !== "" && (
          <Tag
            className="statusTag"
            color={status.toLowerCase() === "paid" ? "green" : "volcano"}
            key={status}
          >
            {status}
          </Tag>
        ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      responsive: ["md"],
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      responsive: ["md"],
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: "Sub Total",
      dataIndex: "subtotal",
      key: "subtotal",
      responsive: ["md"],
      sorter: (a, b) => a.subtotal - b.subtotal,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      responsive: ["md"],
      sorter: (a, b) => a.description - b.description,
      render: (_, view) =>
        view.description !== "" && (
          <Popover content={view.description} trigger="click">
            <Button>view</Button>
          </Popover>
        ),
    },
    {
      title: "Action",
      key: "action",
      responsive: ["md"],
      sorter: (a, b) => a.action - b.action,
      render: (_, record) => {
        console.log("record:: ", record);
        return (
          record.quantity !== "" && (
            <Space size="small">
              <Button
                style={{ padding: 0 }}
                type="link"
                className="edIt"
                onClick={() => {
                  handleEditExpense(record);
                  showModal(record);
                }}
              >
                {<EditOutlined />}
              </Button>
              <Button
                type="link"
                className="deleTe"
                onClick={(e) => {
                  onDelete(record.key, e);
                }}
              >
                <DeleteOutlined />
              </Button>
            </Space>
          )
        );
      },
    },
    {
      title: "Upload",
      key: "upload",
      responsive: ["md"],
      sorter: (a, b) => a.action - b.action,
      render: (_, record) => {
        console.log("record:: ", record);
        return (
          record.quantity !== "" && (
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
              <Button className="upload">Upload</Button>
            </Upload>
          )
        );
      },
    },
  ];
  // useEffect(() => {
  //   getData();
  // }, []);

  // const getData = async () => {
  //   const res = await axios.get(`https://jsonplaceholder.typicode.com/users`);
  //   setdata(
  //     res.data.map((row) => ({
  //       category: row.catname,
  //       paidby: row.name,
  //       statuspayment: row.status,g
  //       address: row.quantity,
  //       amount: row.amount,
  //       newdate: row.date,
  //       describe: row.description,
  //     }))
  //   );
  // };
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (record) => {
    console.log(record);
    setmodaldata(record);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    // submit form data
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleEditExpense = (record) => {
    console.log("record: ", record);
    setEditedRecord(record);
  };

  const Value = () => (
    <Table
      columns={columns}
      dataSource={filterExpenses}
      //    rowSelection={rowSelection}
      pagination={{
        position: ["none", "none"],
      }}
      className="expenseTable"
      scroll={{ x: 1300 }}
      //   onChange={onSort}
    />
  );
  //   const onSort = (pagination, sorter) => {
  //     console.log("param", pagination, sorter);
  //   };

  const onChange = (date, dateString) => {
    setFilterCriteria({ ...filterCriteria, date: dateString });
    if (dateString) {
      let result = allExpenses.filter((ex) =>
        ex.date.toLowerCase().includes(dateString.toLowerCase())
      );
      setFilterExpense(result);
    } else {
      setFilterExpense(allExpenses);
    }
    console.log(date, dateString);
  };

  const searchChange = (e) => {
    console.log(e.target.value);

    let search = e.target.value;
    setFilterCriteria({ ...filterCriteria, search: search });
    if (search) {
      let result = allExpenses.filter(
        (ex) =>
          ex.catname.toLowerCase().includes(search.toLowerCase()) ||
          ex.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilterExpense(result);
    } else {
      setFilterExpense(allExpenses);
    }
  };
  const { Option } = Select;

  const onSelect = (value) => {
    console.log(`selected ${value}`);
    setFilterCriteria({ ...filterCriteria, category: value });
    if (value && value !== "all") {
      let result = allExpenses.filter((ex) =>
        ex.catname.toLowerCase().split().includes(value.toLowerCase())
      );
      setFilterExpense(result);
    } else {
      setFilterExpense(allExpenses);
    }
  };
  const onChoose = (value) => {
    console.log(`selected ${value}`);
    setFilterCriteria({ ...filterCriteria, status: value });
    if (value && value !== "all") {
      let result = allExpenses.filter((ex) =>
        ex.status.toLowerCase().split().includes(value.toLowerCase())
      );
      setFilterExpense(result);
    } else {
      setFilterExpense(allExpenses);
    }
  };

  const onSearch = (value) => {
    console.log("search:", value);
  };
  const onDelete = (key, e) => {
    e.preventDefault();
    console.log("data::: ", key);
    const filteredData = data.filter((item) => item.key !== key);
    setFilterExpense(filteredData);
  };

  const handleAddNewExpense = () => {
    navigate("/ExpenseFrm");
  };

  return (
    <Layout>
      <Content>
        <Row
          className="row"
          style={{ marginBottom: "0rem", marginTop: "1.5rem" }}
        >
          <Col flex={"2"}>
            <Input
              placeholder="Search"
              prefix={<SearchOutlined />}
              onChange={searchChange}
              style={{ width: "19rem" }}
            />
          </Col>
          <Col flex={"1"}>
            <DatePicker
              placeholder="Date"
              onChange={onChange}
              style={{ cursor: "pointer" }}
            />
          </Col>
          <Col flex={"1"}>
            {
              <Select
                showSearch
                defaultValue="Choose Category"
                optionFilterProp="children"
                onChange={onSelect}
                style={{ cursor: "pointer" }}
                // onSearch={onSearch}
                filterOption={(input, option) =>
                  option.children.toLowerCase().includes(input.toLowerCase())
                }
                className="category"
              >
                <Option value="food">Food</Option>
                <Option value="water">Water</Option>
                <Option value="all">All Category</Option>
              </Select>
            }
          </Col>
          <Col flex={"1"}>
            <Space wrap>
              {
                <Select
                  showSearch
                  defaultValue="Choose Status"
                  optionFilterProp="children"
                  onChange={onChoose}
                  style={{ cursor: "pointer" }}
                  // onSearch={onSearch}
                  filterOption={(input, option) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                  }
                >
                  <Option value="paid">Paid</Option>
                  <Option value="unpaid">Unpaid</Option>
                  <Option value="all">All Status</Option>
                </Select>
              }
            </Space>
          </Col>
          <Col flex={"1"}>
            <Button
              className="addExpense"
              type="primary"
              onClick={handleAddNewExpense}
            >
              + Add New Expenses
            </Button>
          </Col>
        </Row>
        <div style={{ padding: "10px 0px" }}></div>
        {Value()}
      </Content>
      {/* <Editexpense record={editedRecord} /> */}
      <Modal
        title="Expense Register"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Submit"
        cancelText="Cancel"
        centered
      >
        <Editexpense record={editedRecord} />
      </Modal>
    </Layout>
  );
}

export default ExpenseList;
