import { Table, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import React,{useEffect,useState} from "react";
import { createUser,getUsers } from "../contexts/CreateContext";
import moment from "moment";

const columns = [
  {
    title: "Sl. No.",
    dataIndex: "sn",
    key: "sn",
    width: 80,
  },
  {
    title: "First Name",
    dataIndex: "fname",
    key: "fname",
    width: 180,
  },
  {
    title: "Last Name",
    dataIndex: "lname",
    key: "lname",
    width: 180,
  },
  {
    title: "Email",
    dataIndex: "mailid",
    key: "email",
    width: 220,
  },
  {
    title: "D.O.J.",
    dataIndex: "doj",
    key: "dob",
    width: 150,
  },

  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
    width: 150,
  },
  {
    title: "Contact No.",
    dataIndex: "phonenumber",
    key: "cnumber",
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",

    render: () => {
      return (
        <>
          <Button style={{ padding: 0 }} type="link" className="edIt">
            {<EditOutlined />}
          </Button>
        </>
      );
    },
  },
];

 function EmployeeList() {
  const [loading, setLoading] = useState(false);

  const [data, setData] = React.useState([])
  useEffect(()=>{
    getData()
  },[])

  async function getData() {
    //hit api to get the employees
    //set that employees to data state
    setLoading(true);
    const allData = await getUsers()
    let d = allData.docs.map((doc,i) => {
      //  console.log(JSON.stringify(new Date(doc.data()['date'])));
      var longDateStr = moment(doc.data()["date"], "D/M/Y").format("MM-DDY");
      return {
        ...doc.data(),
        date: doc.data()["date"],
        dt: new Date(longDateStr),
        id: doc.id,
        sn:i+1
      };
    });
    console.log({ d });
    setData(d)
    setLoading(false);
  }
  return (
    <Table
      loading={loading}
      columns={columns}
      dataSource={data}
      pagination={{
        pageSize: 50,
      }}
      // scroll={{
      //   y: 240,
      // }}
    />
  );
}

export default EmployeeList;
