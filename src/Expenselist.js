import { Space, Table, Tag, DatePicker, Dropdown, Menu, message } from "antd";
import { Button, Tooltip, Select } from "antd";
import { Typography, Layout } from "antd";
import { AudioOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { Col, Divider, Row } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";

const { Title, Paragraph, Text, Link } = Typography;
const { Search } = Input;
const { Content } = Layout;
const columns = [
  {
    title: "Category Name",
    dataIndex: "catname",
    key: "catname",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Customer Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Status",
    key: "status",
    dataIndex: "status",
    render: (_, { status }) => (
      <>
        {status.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";

          if (tag === "unpaid") {
            color = "volcano";
          }

          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Button type="link">Edit</Button>
        <Button type="link">Delete</Button>
      </Space>
    ),
  },
];
const data = [
  {
    key: "1",
    catname: "Food",
    name: "Ekta",
    date: "2022-07-12",
    status: ["paid"],
    amount: "1000",
    description: "done",
  },
  {
    key: "2",
    catname: "water",
    name: "Pooja",
    date: "2022-07-20",
    status: ["unpaid"],
    amount: "1000",
    description: "",
  },
];
function ExpenseList() {
  const [allExpenses, setAllExpenses] = useState(data || []);
  const [filterExpenses, setFilterExpense] = useState(data || []);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
  };
  const Value = () => (
    <Table
      columns={columns}
      dataSource={filterExpenses}
      rowSelection={rowSelection}
    />
  );
  const onChange = (date, dateString) => {
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
  const handleButtonClick = (e) => {
    message.info("Click on left button.");
    console.log("click left button", e);
  };

  const searchChange = (e) => {
    console.log(e.target.value);
    let search = e.target.value;
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
    if (value && value !== "all") {
      let result = allExpenses.filter((ex) =>
        ex.catname.toLowerCase().includes(value.toLowerCase())
      );
      setFilterExpense(result);
    } else {
      setFilterExpense(allExpenses);
    }
  };
  const onChoose = (value) => {
    console.log(`selected ${value}`);
    if (value) {
      let result = allExpenses.filter((ex) =>
        ex.status.toLowerCase().includes(value.toLowerCase())
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
