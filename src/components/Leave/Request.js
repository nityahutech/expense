import {  DeleteTwoTone, EditTwoTone, SearchOutlined } from "@ant-design/icons";
import { Button, Card, Col, DatePicker, Input, Row, Table, Tag } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import LeaveContext from "../../contexts/LeaveContext";
import ApplyLeave from "./ApplyLeave";
import { useAuth } from "../../contexts/AuthContext";
import { getUsers } from "../../contexts/CreateContext";
const { RangePicker } = DatePicker;

const Request = (props) => {
    const [allEmpName, setAllEmpName] = useState([]);
    const [allEmpMap, setAllEmpMap] = useState({});
    const [selDate, setSelDate] = useState(moment());
    const [loading, setLoading] = useState(true);
    const [applyModal, setApplyModal] = useState(false);
    const [allRequests, setAllRequests] = useState([]);
    const [filterRequest, setFilterRequest] = useState([]);
    let role = window.location.href.includes("hr-leave")
    const { currentUser } = useAuth()
    
  const columns = [
    {
      title: "Duration",
      dataIndex: "date",
      width: 240,
      align: "left",
    //   sorter: (c, d) => {
    //     let a = moment(c.dateCalc[0], "Do MMM, YYYY");
    //     let b = moment(d.dateCalc[0], "Do MMM, YYYY");
    //     return a - b;
    //   },
    //   sortDirections: ["ascend", "descend"],
    },
    {
      title: "Employee Name",
      dataIndex: "name",
      align: "left",
      width: 150,
    //   sorter: (a, b) => {
    //     return a.name !== b.name ? (a.name < b.name ? -1 : 1) : 0;
    //   },
    //   sortDirections: ["ascend", "descend"],
    },
    {
      title: "Nature of Leave",
      dataIndex: "nature",
      align: "left",
      width: 150,
    },
    {
      title: "No. Of Days",
      dataIndex: "len",
      width: 150,
      align: "left",
    //   sorter: (a, b) => {
    //     return a.len !== b.len ? (a.len < b.len ? -1 : 1) : 0;
    //   },
    //   sortDirections: ["ascend", "descend"],
    },
    {
      title: "Reason",
      dataIndex: "reason",
      align: "left",
      ellipsis: true,
      width: 150,
    },
    {
      title: "Approver",
      dataIndex: "approver",
      align: "left",
      width: 150,
    },
    {
        title: "Status",
        dataIndex: "status",
        key: "status",
        align: "left",
        width: 90,
        // sorter: (a, b) => {
        //     return a.status !== b.status ? (a.status < b.status ? -1 : 1) : 0;
        // },
        render: (_, { status }) => (
          <Tag
            className="status-tag"
            color={
              status === "Approved"
                ? "rgba(15, 255, 80, 0.2)"
                : status === "Pending"
                ? "rgba(205, 227, 36, 0.25)"
                : "rgb(252, 97, 97, 0.5)"
            }
          >
            {status}
          </Tag>
        )
    },
    {
      title: "Comment",
      dataIndex: "comment",
      align: "left",
      width: 150,
    },
    {
      key: "5",
      title: "Actions",
      fixed: "right",
      align: "left",
      width: 80,
      render: (_, record) => (
      <>
      <DeleteTwoTone
      twoToneColor="#f04747"
              onClick={() => {
                // setStatus(record, "Rejected");
                console.log("record", record);
              }} style={{ fontSize: '1rem',marginRight: "10px"  }} 
        />
        
        <EditTwoTone
        twoToneColor="#40a9ff"
              onClick={() => {
                // setStatus(record, "Rejected");
                console.log("record", record);
              }} style={{ fontSize: '1rem' }} 
        />
      </>
      ),
    },
  ];

  useEffect(() => {
    getAllUser()
    getAllRequests()
  }, [])

  const getDateFormatted = (data) => {
    data.forEach((dur) => {
      let len = dur.date.length;
      dur.len =
        len -
        (dur.slotStart == "Full Day" ? 0 : 0.5) -
        (dur.date.length == 1 ? 0 : dur.slotEnd == "Full Day" ? 0 : 0.5);
      dur.dateCalc = dur.date;
      dur.date =
        dur.date.length == 1
          ? dur.date[0]
          : dur.date[0] + " to " + dur.date[dur.date.length - 1];
    });
  };
  const getDateSorted = (data) => {
    data.sort(function (c, d) {
      let a = moment(c.dateCalc[0], "Do MMM, YYYY");
      let b = moment(d.dateCalc[0], "Do MMM, YYYY");
      return a - b;
    });
  };

  const getAllUser = async () => {
    const allData = await getUsers();
    let userMap = {};
    let allUsers = allData.docs.map((doc, i) => {
      userMap[`${doc.data().name}`] = [doc.id, doc.data()?.repManager || ""];
      return {
        value: doc.data().name,
      };
    });
    setAllEmpMap(userMap);
    setAllEmpName(allUsers);
  };
  
  const getAllRequests = async () => {
    let reqData = await LeaveContext.getLeaves();
    let req = reqData.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    });
    let temp = role ? req : req.filter(x => x.name == currentUser.displayName)
    getDateFormatted(temp);
    getDateSorted(temp);
    setAllRequests(temp);
    setFilterRequest(temp);
  };

  const searchChange = (e) => {
    let search = e.target.value;
    if (search) {
      let result = allRequests.filter((ex) =>
        ex.name.toLowerCase().includes(search.toLowerCase()) ||
        ex.nature.toLowerCase().includes(search.toLowerCase()) ||
        ex.approver.toLowerCase().includes(search.toLowerCase()) ||
        ex.reason.toLowerCase().includes(search.toLowerCase()) ||
        ex.status.toLowerCase().includes(search.toLowerCase()) ||
        ex.date.includes(search)
      );
      setFilterRequest(result);
    } else {
      setFilterRequest(allRequests);
    }
  };

    return (
        <Card className="daily">
        <Row gutter={[10, 10]} style={{justifyContent:"space-between"}}>
        <Col md={8}>
          <Input
            // className="daily"
            style={{margin: "0 15px", width: "225px"}}     
            placeholder="Search"
            prefix={<SearchOutlined />}
            onChange={searchChange}
          />
        </Col>
        <Col md={8} style={{textAlign: "right"}}>
          <RangePicker
            defaultValue={selDate}
            // className="daily range"
            style={{margin: "0 15px 15px"}}
            bordered={true}
            format="DD-MM-YYYY"
            allowClear={false}
            onChange={(e) => {
                setSelDate(e);
                // allEmpDetails("_", e);
            }}
            disabledDate={(current) => !current.isBetween(moment('2023', 'YYYY'), new Date())}
          />
      </Col>
      {role ? <Col md={8} style={{textAlign: "right"}}>
        <Button
            className="button-color"
            style={{margin: "0 15px 15px"}}
            onClick={() => {
                setApplyModal(true);
            }}
        >
            Apply Leave
        </Button>
      </Col> : null}

    </Row>

      <Table
        className="daily daily-table"
        // loading={loading}
        columns={columns}
        scroll={{ x: 500 }}
        dataSource={filterRequest}
        pagination={true}
        onChange={() => document.getElementById("att-tabs").scrollIntoView(true)}
      />
    <ApplyLeave
        name={null}
        applyModal={applyModal}
        setApplyModal={setApplyModal}
        leavedays={{
            "Casual Leave": 2
        }}
        holidays={props.data?.holidays}
        allEmpMap={allEmpMap}
        allEmpName={allEmpName}
    />
    </Card>
    )
}

export default Request