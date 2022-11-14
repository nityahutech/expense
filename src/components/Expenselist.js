import {
  Col,
  Row,
  Input,
  Typography,
  Layout,
  Table,
  DatePicker,
  Button,
  Select,
  Modal,
  Tag,
} from "antd";
import moment from "moment";
import { EditOutlined, SearchOutlined } from "@ant-design/icons";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../style/expenselist.css";
import ExpenseContext from "../contexts/ExpenseContext";
import Editexpense from "./Editexpense";
import { upload } from "@testing-library/user-event/dist/upload";
import { async } from "@firebase/util";
const { RangePicker } = DatePicker;
const dateFormat = "DD-MM-YYYY";
const PHE = require("print-html-element");
const { Title, Paragraph, Text, Link } = Typography;
const { Search } = Input;
const { Content } = Layout;
function ExpenseList() {
  const [data, setData] = useState([]);
  const [allExpenses, setAllExpenses] = useState(data || []);
  const [filterExpenses, setFilterExpense] = useState(data || []);
  const [editedRecord, setEditedRecord] = useState(null);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState("");
  const [size, setSize] = useState(window.innerWidth <= 760 ? "" : "left");
  useEffect(() => {
    getData();
  }, []);
  // useEffect(() => {
  //   getData();
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
    setLoading(true);
    const allData = await ExpenseContext.getAllExpenses();
    let d = allData.docs.map((doc) => {
      var longDateStr = moment(doc.data()["date"], "D/M/Y").format("MM-DDY");
      return {
        ...doc.data(),
        date: doc.data()["date"],
        dt: new Date(longDateStr),
        id: doc.id,
      };
    });
    let filtered = d.sort(function (a, b) {
      return b["dt"].getTime() - a["dt"].getTime();
    });
    setData(d);
    let exp = filtered.map((person, i) => ({
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
      status: person.status,
      description: person.description,
    }));
    const totalAmount = exp.reduce((acc, expense) => {
      acc += expense.amount * expense.quantity;
      return acc;
    }, 0);
    setTotal(totalAmount);
    setAllExpenses(exp);
    setFilterExpense(exp);
    setLoading(false);
  }
   window.addEventListener("resize", () =>
    setSize(window.innerWidth <= 760 ? "" : "left")
  );
  const navigate = useNavigate();
  const [filterCriteria, setFilterCriteria] = useState({
    search: "",
    date: [],
    category: "all",
  });
  const [modaldata, setmodaldata] = useState([]);
  const columns = [
    {
      title: "Sl. No.",
      dataIndex: "sn",
      key: "sn",
      // responsive: ["sm"],
      fixed: "left",
      className: "row1",
      width: 80,
    },
    {
      title: "Expense Name",
      className: "row2",
      dataIndex: "catname",
      key: "catname",
      // responsive: ["sm"],
      fixed: size,
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      // sorter: (a, b) => a.catname - b.catname,
      onFilter: (value, record) => record.name.indexOf(value) === 0,

      render: (text) => <a className="catName">{text}</a>,
    },
    {
      title: "Paid By",
      className: "row3",
      dataIndex: "name",
      key: "name",
      width: 150,
      // responsive: ["sm"],
    },
    {
      title: "Paid To",
      className: "row3",
      dataIndex: "paidname",
      key: "paidto",
      width: 150,
      // responsive: ["sm"],
      // sorter: (a, b) => a.name - b.name,
    },
    {
      title: "Date",
      className: "row4",
      dataIndex: "date",
      key: "date",
      // responsive: ["sm"],
    },
    // {
    //   title: "Status",
    //   className: "row5",
    //   key: "status",
    //   dataIndex: "status",
    //   // responsive: ["md"],
    //   sorter: (a, b) => a.status - b.status,
    //   render: (_, { status }) =>
    //     status !== "" && (
    //       <Tag
    //         className="statusTag"
    //         color={status === "Paid" ? "green" : "volcano"}
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
      align: "center",
      // responsive: ["sm"],
    },
    {
      title: "Amount",
      className: "row7",
      dataIndex: "amount",
      key: "amount",
      align: "center",
      // responsive: ["md"],
    },
    {
      title: "Sub Total",
      className: "row8",
      dataIndex: "subtotal",
      key: "subtotal",
      align: "center",
      // responsive: ["sm"],
    },
    {
      title: "Description",
      className: "row9",
      dataIndex: "description",
      key: "description",
      // responsive: ["sm"],
      ellipsis: true,

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
      align: "center",
      fixed: "right",

      // responsive: ["sm"],

      render: (_, record) => {
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
    
  ];
    const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = (record) => {
    setmodaldata(record);
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
    // submit form data
  };
  const handleEditExpense = (record) => {
    setEditedRecord(record);
  };
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
      const totalAmount = result.reduce((acc, expense) => {
        acc += expense.amount * expense.quantity;
        return acc;
      }, 0);
      setTotal(totalAmount);
      const modifiedFilterExpense = [...result];
      setFilterExpense(modifiedFilterExpense);
    } else {
      setFilterExpense(allExpenses);
    }
  };
  const searchChange = (e) => {
    let search = e.target.value;
    setFilterCriteria({ ...filterCriteria, search: search });
    if (search) {
      let result = allExpenses.filter(
        (ex) =>
          ex.catname.toLowerCase().includes(search.toLowerCase()) ||
          ex.name.toLowerCase().includes(search.toLowerCase()) ||
          ex.quantity == Number(search) ||
          ex.amount == Number(search) ||
          ex.sn == Number(search)
      );
      const totalAmount = result.reduce((acc, expense) => {
        acc += expense.amount * expense.quantity;
        return acc;
      }, 0);
      setTotal(totalAmount);
      const modifiedFilterExpense = [...result];
      setFilterExpense(modifiedFilterExpense);
    } else {
      const totalAmount = allExpenses.reduce((acc, expense) => {
        acc += expense.amount * expense.quantity;
        return acc;
      }, 0);
      setTotal(totalAmount);
      setFilterExpense(allExpenses);
    }
  };
  const { Option } = Select;
  const onSelect = (value) => {
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
  function handlePrint() {
    let headerStyle = "";
    let oddRowStyle = "";
    let evenRowStyle = "";
    let opts = {
      printMode: "qqqqqq",
      pageTitle: "",
      templateString: "string",
      popupProperties: "string",
      stylesheets: "string",
      styles: "background-color:red",
    };
    let dataIndexs = [];
    let tableHeaderString = columns
      .map((col) => {
        if (col.title !== "Action") {
          dataIndexs.push(col.dataIndex);
          return `<th ${headerStyle}>${col.title}&nbsp;&nbsp;</th>`;
        }
      })
      .toString()
      .replaceAll(",", "");
    let tableRowString = [];
    let tableAllRow = [];
    let allTableString = [];
    let pageNum = 1;
    filterExpenses.forEach((exp, i) => {
      tableRowString = [];
      if (pageNum === 1 && (i + 1) % 16 === 0) {
        allTableString.push(
          `<table>${tableHeaderString}${tableAllRow
            .toString()
            .replaceAll(",", "")}</table>`
        );
        tableAllRow = [];
        ++pageNum;
      } else {
        if (pageNum > 1 && (i - 15) % 17 === 0) {
          allTableString.push(
            `<table>${tableHeaderString}${tableAllRow
              .toString()
              .replaceAll(",", "")}</table>`
          );
          tableAllRow = [];
          ++pageNum;
        } else if (i === filterExpenses.length - 1) {
          allTableString.push(
            `<table>${tableHeaderString}${tableAllRow
              .toString()
              .replaceAll(",", "")}</table>`
          );
          tableAllRow = [];
          ++pageNum;
        }
      }
      tableRowString.push(
        `<tr style="${i % 2 === 1 ? oddRowStyle : evenRowStyle}">`
      );
      for (let i = 0; i < dataIndexs.length; i++) {
        tableRowString.push(
          `<td style="color: grey; padding: 10px; textAlign: center; ">${
            exp[dataIndexs[i]]
          }&nbsp;&nbsp;</td>`
        );
      }
      tableRowString.push("</tr>");
      tableAllRow.push(tableRowString);
    });
    // let tableAllRowString = tableAllRow.toString().replaceAll(",", "");
    console.log(`<div>
    <h1 textAlign= center>Expense Report<h1/>
        </br>${allTableString.toString().replaceAll(",", "")}</div>`);
    PHE.printHtml(
      `<div>
      <h1 textAlign= center>Expense Report<h1/>
          </br>${allTableString.toString().replaceAll(",", "")}</div>`,
      opts
    );
  }
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
          <Col
            xs={22}
            sm={10}
            md={8}
            lg={6}
            style={{
              fontWeight: "bold",
              textAlign: "center",
              fontSize: "1.1rem",
            }}
          >
            Total: {total}
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
          <Col>
            <Button
              // className="addExpense"
              type="primary"
              // onClick={handleAddNewExpense}
              onClick={handlePrint}
              style={{
                width: "95%",
                borderRadius: "5px",
                background: "#1963A6",
              }}
            >
              Print
            </Button>
          </Col>

          <Col xs={22} sm={10} md={6} lg={4}>
            <Button
              className="addExpense"
              type="primary"
              onClick={handleAddNewExpense}
              style={{
                width: "95%",
                borderRadius: "5px",
                background: "#1963A6",
              }}
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
            position: ["bottomCenter"],
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
        closeIcon={
          <div
            onClick={() => {
              setIsModalVisible(false);
            }}
          >
            X
          </div>
        }
        // onCancel={handleCancel}
      >
        <Editexpense
          className="Edit"
          record={editedRecord}
          setIsModalVisible={setIsModalVisible}
          reloadData={getData}
        />
      </Modal>
    </Layout>
  );
}

export default ExpenseList;
