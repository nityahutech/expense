import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  DeleteFilled,
  DeleteTwoTone,
  EditFilled,
  EditTwoTone,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Input,
  Modal,
  Row,
  Table,
  Tag,
} from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import LeaveContext from "../../contexts/LeaveContext";
import ApplyLeave from "./ApplyLeave";
import { useAuth } from "../../contexts/AuthContext";
import { showNotification } from "../../contexts/CreateContext";
const { RangePicker } = DatePicker;

const ManagerApproval = (props) => {
  const [selDate, setSelDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [applyModal, setApplyModal] = useState(false);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [allRequests, setAllRequests] = useState([]);
  const [filterRequest, setFilterRequest] = useState([]);
  const { currentUser } = useAuth();
  const [history, sethistory] = useState(null);

  const columns = (value) => {
    return [
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
        ),
      },
      {
        title: "Comment",
        dataIndex: "comment",
        align: "left",
        width: 150,
      },
      value
        ? {
            title: "Action",
            dataIndex: "action",
            key: "action",
            align: "center",
            width: 80,
            render: (_, record) => (
              <>
                {/* <Button
                    type="link"
                    className="show"
                  > */}
                <CheckCircleTwoTone
                  onClick={() => {
                    onApproveLeave(record);
                  }}
                  twoToneColor="#41BF36"
                  style={{ fontSize: "1rem", marginRight: "10px" }}
                />
                {/* </Button> 
                  <Button
                    type="link"
                    className="deleTe"
                  >*/}
                <CloseCircleTwoTone
                  onClick={() => {
                    onRejectedLeave(record, value);
                    console.log("record", record);
                  }}
                  twoToneColor="#FC6161"
                  style={{ fontSize: "1rem" }}
                />
                {/* </Button> */}
              </>
            ),
          }
        : {
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
                  }}
                  style={{ fontSize: "1rem", marginRight: "10px" }}
                />

                <EditTwoTone
                  twoToneColor="#40a9ff"
                  onClick={() => {
                    // setStatus(record, "Rejected");
                    console.log("record", record);
                  }}
                  style={{ fontSize: "1rem" }}
                />
              </>
            ),
          },
    ];
  };

  useEffect(() => {
    getAllRequests();
  }, [selDate]);

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

  const getAllRequests = async () => {
    setLoading(true);
    let pending = [];
    let History = [];
    if (history === null) {
      let reqData = await LeaveContext.getLeaves();
      let req = reqData.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      });
      getDateFormatted(req);
      getDateSorted(req);
      req.forEach((x) => {
        if (x.approver != currentUser.displayName) {
          return;
        }
        if (x.status == "Pending") {
          pending.push(x);
        } else {
          History.push(x);
        }
      });
      setPendingRequests(pending);
      setAllRequests(History);
      sethistory(History);
    }
    if (history !== null) {
      History = [...history];
    }
    let filteredHistory = JSON.parse(JSON.stringify(History));
    if (selDate != null && !selDate.includes(null)) {
      filteredHistory = History.filter((obj) => {
        const objdate = moment(obj.date, "Do MMM, YYYY");
        return (
          objdate.isSameOrAfter(selDate[0], "day") &&
          objdate.isSameOrBefore(selDate[1])
        );
      });
    }
    setFilterRequest(filteredHistory);
    setLoading(false);
  };

  const onApproveLeave = (record) => {
    Modal.confirm({
      title: `Are you sure, you want to approve Leave of ${
        record?.name || ""
      }!`,
      okText: "Yes",
      okType: "primary",
      onOk: () => {
        LeaveContext.approveLeave(record.id, record.name)
          .then((response) => {
            showNotification("success", "Success", "Request Approved!");
            props.getData();
          })
          .catch((error) => {
            showNotification("error", "Error", "Unable to process request!");
          });
      },
    });
  };
  let value = "";
  const Bbb = () => {
    return (
      <Input
        placeholder="Enter Comment"
        onChange={(event) => {
          value = event.target.value;
        }}
      />
    );
  };
  const onRejectedLeave = (record, value) => {
    Modal.confirm({
      title: `Are you sure, you want to reject Leave of ${record?.name || ""}!`,
      content: <Bbb />,
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        LeaveContext.rejectLeave(record.id, record.name, value)
          .then((response) => {
            showNotification("success", "Success", "Request Rejected!");
            props.getData();
          })
          .catch((error) => {
            showNotification("error", "Error", "Unable to process request!");
          });
      },
    });
  };

  const searchChange = (e) => {
    let search = e.target.value;
    if (search) {
      let result = allRequests.filter(
        (ex) =>
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
      <Table
        className="daily daily-table"
        // loading={loading}
        columns={columns(true)}
        scroll={{ x: 500 }}
        dataSource={pendingRequests}
        pagination={true}
        onChange={() =>
          document.getElementById("att-tabs").scrollIntoView(true)
        }
      />
      <Divider>History</Divider>
      <Row gutter={[10, 10]} style={{ justifyContent: "space-between" }}>
        <Col md={8}>
          <Input
            // className="daily"
            style={{ margin: "0 15px", width: "225px" }}
            placeholder="Search"
            prefix={<SearchOutlined />}
            onChange={searchChange}
          />
        </Col>
        <Col md={8} style={{ textAlign: "right" }}>
          <RangePicker
            defaultValue={[null, null]}
            style={{ margin: "0 15px 15px" }}
            bordered={true}
            format="DD-MM-YYYY"
            allowClear={true}
            onChange={(e) => {
              setSelDate(e);
            }}
            disabledDate={(current) =>
              !current.isBetween(moment("2023", "YYYY"), new Date())
            }
          />
        </Col>
        {/* <Col md={8} style={{textAlign: "right"}}>
        <Button
            className="button-color"
            style={{margin: "0 15px 15px"}}
            onClick={() => {
                setApplyModal(true);
            }}
        >
            Apply Leave
        </Button>
      </Col> */}
      </Row>

      <Table
        className="daily daily-table"
        loading={loading}
        columns={columns(false)}
        scroll={{ x: 500 }}
        dataSource={filterRequest}
        pagination={true}
        onChange={() =>
          document.getElementById("att-tabs").scrollIntoView(true)
        }
      />
    </Card>
  );
};

export default ManagerApproval;
