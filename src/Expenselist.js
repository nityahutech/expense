import { Space, Table, Tag, DatePicker, Dropdown, Menu, message } from "antd";
import { Button, Tooltip, Select, Popover } from "antd";
import { Typography, Layout } from "antd";
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
import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

const { Title, Paragraph, Text, Link } = Typography;
const { Search } = Input;
const { Content } = Layout;

const columns = [
  {
    title: "SL No.",
    dataIndex: "sn",
    key: "sn",
  },
  {
    title: "Category Name",
    dataIndex: "catname",
    key: "catname",
    onFilter: (value, record) => record.name.indexOf(value) === 0,
    sorter: (a, b) => a.catname.length - b.catname.length,
    sortDirections: ["ascend", "descend"],
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Paid By",
    dataIndex: "name",
    key: "name",
    sorter: (a, b) => a.name - b.name,
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    sorter: (a, b) => a.date - b.date,
  },
  {
    title: "Status",
    key: "status",
    dataIndex: "status",
    sorter: (a, b) => a.status - b.status,
    render: (_, { status }) =>
      status !== "" && (
        <Tag
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
    sorter: (a, b) => a.quantity - b.quantity,
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    sorter: (a, b) => a.amount - b.amount,
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
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
    sorter: (a, b) => a.action - b.action,
    render: (_, record) =>
      record.quantity !== "Sub Total" && (
        <Space size="middle">
          <Button type="link">
            {
              <Space>
                <EditOutlined />
              </Space>
            }
          </Button>
          <Button type="link" className="deLete">
            <Space>
              <DeleteOutlined />
            </Space>
          </Button>
        </Space>
      ),
  },
];
const data = [
  {
    key: "1",
    sn: "1",
    catname: "Food",
    name: "Ekta",
    date: "2022-07-12",
    status: "Paid",
    price: 200,
    quantity: 5,
    amount: 1000,
    description: "done",
  },
  {
    key: "2",
    sn: "2",
    catname: "Water",
    name: "Pooja",
    date: "2022-07-20",
    status: "Unpaid",
    price: 200,
    quantity: 5,
    amount: "1000",
    description: "pending",
  },
  {
    key: "subTotal",
    sn: "",
    catname: "",
    name: "",
    date: "",
    status: "",
    price: "",
    quantity: "Sub Total",
    amount: "2000",
    description: "",
  },
];
function ExpenseList() {
  const [filterCriteria, setFilterCriteria] = useState({
    search: "",
    date: "",
    category: "all",
    status: "all",
  });
  const [allExpenses, setAllExpenses] = useState(data || []);
  const [filterExpenses, setFilterExpense] = useState(data || []);

  useEffect(
    function () {
      console.log("filterCriteria:: ", filterCriteria);
    },
    [filterCriteria]
  );

  const Value = () => (
    <Table
      columns={columns}
      dataSource={filterExpenses}
      //    rowSelection={rowSelection}
      pagination={{
        position: ["none", "none"],
      }}
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

  return (
    <Content>
      <Title>Expenses</Title>
      <Title level={5}>Dashboard/Expenses</Title>
      <Divider orientation="left"></Divider>
      <Row className="row" justify="start">
        <Col md={12} lg={6}>
          <Input
            placeholder="Search"
            prefix={<SearchOutlined />}
            onChange={searchChange}
          />
        </Col>
        <Col md={12} lg={{ span: 4, offset: 2 }}>
          <DatePicker placeholder="Date" onChange={onChange} />
        </Col>
        <Col md={12} lg={4}>
          {
            <Select
              showSearch
              defaultValue="Choose Category"
              optionFilterProp="children"
              onChange={onSelect}
              // onSearch={onSearch}
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
            >
              <Option value="food">Food</Option>
              <Option value="water">Water</Option>
              <Option value="all">All Category</Option>
            </Select>
          }
        </Col>
        <Col md={12} lg={4}>
          <Space wrap>
            {
              <Select
                showSearch
                defaultValue="Choose Status"
                optionFilterProp="children"
                onChange={onChoose}
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
        <Col md={12} lg={4}>
          <Button type="primary">+ Add New Expenses</Button>
        </Col>
      </Row>
      <div style={{ padding: "10px 0px" }}></div>
      {Value()}
    </Content>
  );
}

export default ExpenseList;
