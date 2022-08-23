import {
  Col,
  Divider,
  Row,
  Input,
  Space,
  Typography,
  Layout,
  Upload,
  Table,
  DatePicker,
  Button,
  Tooltip,
  Select,
  Popover,
  Modal,
  Tag,
  Dropdown,
  Menu,
  message,
} from "antd";
import moment from "moment";
// import axios from "axios";
import {
  AudioOutlined,
  EditOutlined,
  DeleteFilled,
  DeleteOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  DownOutlined,
  UserOutlined,
  SearchOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/expenselist.css";
import ExpenseContext from '../contexts/ExpenseContext'
import Editexpense from "./Editexpense";
import { upload } from "@testing-library/user-event/dist/upload";
import { async } from "@firebase/util";
const { RangePicker } = DatePicker;
const dateFormat = "DD-MM-YYYY";

const { Title, Paragraph, Text, Link } = Typography;
const { Search } = Input;
const { Content } = Layout;



function ExpenseList() {
  const [data, setData] = useState([])
  const [allExpenses, setAllExpenses] = useState(data || []);
  const [filterExpenses, setFilterExpense] = useState(data || []);
  const [editedRecord, setEditedRecord] = useState(null);
  const [loading, setLoading] = useState(false)
  
  
  useEffect(() => {
     getData()
  }, [])

  // useEffect(() => {
  //   getData();
  //   console.log("hello1");
  //   console.log(data);
  //   console.log(allExpenses);
  //   if (filterExpenses.length > 0) {
  //     const totalAmount = filterExpenses.reduce((acc, expense) => {
  //       acc += expense.amount * expense.quantity;
  //       return acc;
  //     }, 0);
  //     const modifiedFilterExpense = [
  //       ...filterExpenses,
  //       {
  //         key: "subTotal",
  //         sn: "",
  //         name: "",
  //         catname: "",
  //         paidname: "",
  //         date: "",
  //         quantity: "",
  //         amount: "Total",
  //         subtotal: totalAmount,
  //         description: "",
  //       },
  //     ];
  //     setTableData(modifiedFilterExpense);
  //   } else {
  //     setTableData([]);
  //   }
  //   // setFilterExpense(data);
  // }, [filterExpenses]);

  async function getData() {
    setLoading(true)
    const allData = await ExpenseContext.getAllExpenses();
    let d=allData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    console.log({d});
    setData(d);
    console.log(data);
    let exp = d.map((person, i) => ({
      key: person.id,
            sn: i + 1,
            catname: person.catname,
            name: person.name,
            date: person.date,
            paidname: person.paidname,
            quantity: person.quantity,
            amount: person.amount,
            payment: person.paymenttype,
            subtotal: person.subtotal,
            description: person.description,
          }));
          const totalAmount = exp.reduce((acc, expense) => {
            acc += expense.amount * expense.quantity;
            return acc;
          }, 0);
          const modifiedFilterExpense = [
            ...exp,
            {
              key: "subTotal",
              sn: "",
              name: "",
              catname: "",
              paidname: "",
              date: "",
              quantity: "",
              amount: "Total",
              subtotal: totalAmount,
              description: "",
            },
          ];
    console.log(modifiedFilterExpense);
    setAllExpenses(modifiedFilterExpense);
    setFilterExpense(modifiedFilterExpense)
    setLoading(false)
    }

    
  const navigate = useNavigate();
  const [filterCriteria, setFilterCriteria] = useState({
    search: "",
    date: [],
    category: "all"
  });
 

  const [modaldata, setmodaldata] = useState([]);

  const columns = [
    {
      title: "SL No.",
      dataIndex: "sn",
      key: "sn",
      // responsive: ["sm"],
      fixed: "left",
      className: "row1",
      width: 74,
    },
    {
      title: "Expense Name",
      className: "row2",
      dataIndex: "catname",
      key: "catname",
      // responsive: ["sm"],
      // fixed: "left",
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.catname.length - b.catname.length,
      sortDirections: ["ascend", "descend"],
      render: (text) => <a className="catName">{text}</a>,
    },
    {
      title: "Paid By",
      className: "row3",
      dataIndex: "name",
      key: "name",
      // responsive: ["sm"],
      sorter: (a, b) => a.name - b.name,
    },
    {
      title: "Paid To",
      className: "row3",
      dataIndex: "paidname",
      key: "paidto",
      // responsive: ["sm"],
      sorter: (a, b) => a.name - b.name,
    },
    {
      title: "Date",
      className: "row4",
      dataIndex: "date",
      key: "date",
      // responsive: ["sm"],
      sorter: (a, b) => a.date - b.date,
    },
    // {
    //   title: "Status",
    //   className: "row5",
    //   key: "status",
    //   dataIndex: "status",
    //   responsive: ["md"],
    //   sorter: (a, b) => a.status - b.status,
    //   render: (_, { status }) =>
    //     status !== "" && (
    //       <Tag
    //         className="statusTag"
    //         color={status.toLowerCase() === "paid" ? "green" : "volcano"}
    //         key={status}
    //       >
    //         {status}
    //       </Tag>
    //     ),
    // },
    {
      title: "Quantity",
      className: "row6",
      dataIndex: "quantity",
      key: "quantity",
      // responsive: ["sm"],
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: "Amount",
      className: "row7",
      dataIndex: "amount",
      key: "amount",
      // responsive: ["md"],
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: "Sub Total",
      className: "row8",
      dataIndex: "subtotal",
      key: "subtotal",
      // responsive: ["sm"],
      sorter: (a, b) => a.subtotal - b.subtotal,
    },
    {
      title: "Description",
      className: "row9",
      dataIndex: "description",
      key: "description",
      // responsive: ["sm"],
      ellipsis: true,
      sorter: (a, b) => a.description - b.description,
      // render: (_, view) =>
      //   view.description !== "" && (
      //     <Popover content={view.description} trigger="click">
      //       <Button>view</Button>
      //     </Popover>
      //   ),
    },
    {
      title: "Action",
      className: "row10",
      key: "action",
      // responsive: ["sm"],
      sorter: (a, b) => a.action - b.action,
      render: (_, record) => {
        // console.log("record:: ", record);
        return (
          record.key !== "subTotal" && (
            <>
              {/* <Space size="small"> */}
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
              {/* <Button
                type="link"
                className="deleTe"
                onClick={(e) => {
                  onDelete(record.sn, e);
                }}
              >
                <DeleteOutlined />
              </Button> 
            </Space>*/}
            </>
          )
        );
      },
    },
    // {
    //   title: "Upload",
    //   className: "row11",
    //   key: "upload",
    //   responsive: ["md"],
    //   sorter: (a, b) => a.action - b.action,
    //   render: (_, record) => {
    //     console.log("record:: ", record);
    //     return (
    //       record.quantity !== "" && (
    //         <Upload
    //           multiple
    //           listType="text"
    //           action={"http://localhost:3001/"}
    //           showUploadList={{ showRemoveIcon: true }}
    //           beforeUpload={(file) => {
    //             console.log({ file });
    //             return false;
    //           }}
    //         >
    //           <Button className="upload">Upload</Button>
    //         </Upload>
    //       )
    //     );
    //   },
    // },
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

  const handleEditExpense = (record) => {
    console.log("record: ", record);
    setEditedRecord(record);
  };

  //   const onSort = (pagination, sorter) => {
  //     console.log("param", pagination, sorter);
  //   };

  const onChange = (date, dateString) => {
    setFilterCriteria({ ...filterCriteria, date });
    if (date) {
      let result = allExpenses.filter((ex) => {
        return (
          moment(ex.date, dateFormat).isSame(date[0], "day") ||
          moment(ex.date, dateFormat).isSame(date[1], "day") ||
          (moment(ex.date, dateFormat).isSameOrAfter(date[0]) &&
            moment(ex.date, dateFormat).isSameOrBefore(date[1]))
        );
      });
      setFilterExpense(result);
    } else {
      setFilterExpense(allExpenses);
    }
  };

  const searchChange = (e) => {
    console.log(e.target.value);

    let search = e.target.value;
    setFilterCriteria({ ...filterCriteria, search: search });
    if (search) {
      console.log({ search });
      let result = allExpenses.filter(
        (ex) =>
          ex.catname.toLowerCase().includes(search.toLowerCase()) ||
          ex.name.toLowerCase().includes(search.toLowerCase())
      );

      const totalAmount = result.reduce((acc, expense) => {
        acc += expense.amount * expense.quantity;
        return acc;
      }, 0);
      const modifiedFilterExpense = [
        ...result,
        {
          key: "subTotal",
          sn: "",
          name: "",
          catname: "",
          paidname: "",
          date: "",
          quantity: "",
          amount: "Total",
          subtotal: totalAmount,
          description: "",
        },
      ];
      setFilterExpense(modifiedFilterExpense);
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
  // const onChoose = (value) => {
  //   console.log(`selected ${value}`);
  //   setFilterCriteria({ ...filterCriteria, status: value });
  //   if (value && value !== "all") {
  //     let result = allExpenses.filter((ex) =>
  //       ex.status.toLowerCase().split().includes(value.toLowerCase())
  //     );
  //     setFilterExpense(result);
  //   } else {
  //     setFilterExpense(allExpenses);
  //   }
  // };

  const onSearch = (value) => {
    console.log("search:", value);
  };
  // const onDelete = (sn, e) => {
  //   e.preventDefault();
  //   console.log("data::: ", sn);
  //   const filteredData = data.filter((item) => item.sn !== sn);
  //   setFilterExpense(filteredData);
  // };

  const handleAddNewExpense = () => {
    navigate("/Expense/AddExpense");
  };

  return (
    <Layout>
      <Content>
        <Row
          className="row"
          gutter={[0, 8]}
          style={{ marginBottom: "0rem", marginTop: "1.5rem" }}
        >
          <Col xs={22} sm={10} md={8} lg={6}>
            <Input
              placeholder="Search"
              prefix={<SearchOutlined />}
              onChange={searchChange}
              style={{ width: "95%" }}
            />
          </Col>
          <Col xs={22} sm={10} md={8} lg={6}>
            <RangePicker
              defaultValue={[]}
              format={dateFormat}
              style={{ width: "95%" }}
              onChange={onChange}
            />
          </Col>
          {/* <Col xs={22} sm={10} md={6}>
            <Select
              showSearch
              defaultValue="Choose Expense Name"
              optionFilterProp="children"
              onChange={onSelect}
              style={{ cursor: "pointer", width: "95%" }}
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
          </Col> */}
          {/* <Col flex={"1"}>
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
          </Col> */}
          <Col xs={22} sm={10} md={6} lg={4}>
            <Button
              className="addExpense"
              type="primary"
              onClick={handleAddNewExpense}
              style={{ width: "95%" }}
            >
              + Add New Expenses
            </Button>
          </Col>
        </Row>
        <div style={{ padding: "10px 0px" }}></div>
        <Table
        loading={loading}
          columns={columns}
          dataSource={filterExpenses}
          //    rowSelection={rowSelection}
          pagination={{
          position: [ 'bottomCenter'],
        }}
          className="expenseTable"
          scroll={{ x: 1300 }}
          //   onChange={onSort}
        />
      </Content>
      {/* <Editexpense record={editedRecord} /> */}
      <Modal
        centered
        title="Expense Register"
        visible={isModalVisible}
        footer={null}
        closable={false}

      >
        <Editexpense record={editedRecord}  setIsModalVisible={setIsModalVisible}  reloadData={getData}/>
      </Modal>
    </Layout>
  );
}

export default ExpenseList;
