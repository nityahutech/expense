import { useState } from "react";
import { useEffect } from "react";
import Checkmark from "../images/checkmark.png";
import CheckReject from "../images/rejected.png";
import AttendanceContext from "../contexts/AttendanceContext";
import { Button, Card, Col, DatePicker, Input, Modal, Row, Table } from "antd";
import moment from "moment";
import { SearchOutlined } from "@ant-design/icons";

const RegularizeAttendance = (props) => {
  const configurations = props.configurations
  const [regularizeDetails, setRegularizeDetails] = useState([]);
  const [pendingData, setpendingData] = useState([]);


  const getAllRegularizeAtt = async () => {
    let regularizeData = await AttendanceContext.getRegularizeAttendance();
    let temp = [];
    let pending = regularizeData.filter((x) => {
      if (x.appStatus == "Pending") {
        return true;
      }
      temp.push(x);
    });
    setpendingData(pending);

    setRegularizeDetails(temp);
  };

  const approveColumns = (value) => {
    let col = [
      {
        title: "Employee Code",
        dataIndex: "empCode",
        key: "empCode",
        align: "center",
        width: 180,
      },
      {
        title: "Employee Name",
        dataIndex: "empName",
        key: "empName",
        align: "center",
      },
      {
        title: "Date",
        dataIndex: "date",
        key: "date",
        align: "center",
      },
      { title: "Reason", dataIndex: "reason", key: "reason", align: "center" },
    ];
    col.push(
      value
        ? {
            title: "Action",
            dataIndex: "action",
            key: "action",
            align: "center",
            render: (_, record) => (
              <>
                <div
                  className="employee-button"
                  // style={{ display: "flex", flexDirection: "row" }}
                >
                  <Button
                    type="link"
                    className="show"
                    onClick={() => {
                      setStatus(record, "Approved");
                    }}
                  >
                    <img src={Checkmark} />
                  </Button>
                  <Button
                    type="link"
                    className="deleTe"
                    //   onClick={() => {
                    //     setStatus(record, "Reject");
                    //   }}
                  >
                    <img src={CheckReject} width={20} />
                  </Button>
                </div>
              </>
            ),
          }
        : {
            title: "Status",
            dataIndex: "appStatus",
            key: "appStatus",
            align: "center",
          }
    );
    return col;
  };

  useEffect(() => {
    getAllRegularizeAtt();
  }, []);
    
  const setStatus = async (record, status) => {
    Modal.confirm({
      title: `Are you sure, you want to ${
        status == "Approved" ? "approve" : "reject"
      } this request?`,
      okText: "yes",
      okType: "danger",
      onOk: async () => {
        // const updateAttendance = regularizeDetails.map((attendanceData) => {
          // console.log(attendanceData);
          // if (attendanceData.id == record.id) {
            // attendanceData.appStatus = status;
            record.appStatus = status;
            if (status == "Approved") {
              record.clockIn = configurations.starttime + ":00";
              record.clockOut = configurations.endtime + ":00";
              record.break = configurations.maxBreakDuration + ":00:00";
              record.duration = moment(configurations.endtime, "HH:mm:ss")
                .subtract(configurations.starttime)
                .subtract(configurations.maxBreakDuration + ":00:00")
                .format("HH:mm:ss");
            }
          // }
          // return attendanceData;
        // });
        console.log("recorddd", record);
        await AttendanceContext.updateRegularize(record.id, record);
        // console.log(updateAttendance);
        getAllRegularizeAtt();
        // setRegularizeDetails(updateAttendance);
      },
    });
  };

  return (
    <Card title="Approve Attendance" className="approveCard">
                  <Table
                    columns={approveColumns(true)}
                    className="approveTable"
                    dataSource={pendingData}
                  />
                  <Card title="Attendance Log" className="approveCard">
                    <Row gutter={[24, 8]} style={{ marginLeft: "0px" }}>
                      <Col span={6}>
                        <Input
                          placeholder="Search"
                          prefix={<SearchOutlined />}
                        />
                      </Col>
                      <Col span={6}>
                        <DatePicker
                          picker="month"
                          placeholder="Select Month"
                          bordered={true}
                          // value={month}
                          // defaultValue={month ? month : null}
                          format="MM-YYYY"
                          // style={{
                          //   background: "#1963A6",
                          //   cursor: "pointer",
                          //   marginLeft: "15rem",
                          // }}
                          allowClear
                          disabledDate={(current) => {
                            return current.isAfter(moment());
                          }}
                        />
                      </Col>
                    </Row>
                    <Table
                      columns={approveColumns(false)}
                      className="approveTable"
                      dataSource={regularizeDetails}
                    />
                  </Card>
                </Card>
  )
}

export default RegularizeAttendance;