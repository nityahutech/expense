import { useState, useEffect } from "react";
import AttendanceContext from "../../contexts/AttendanceContext";
import { Button, Card, Col, DatePicker, Divider, Input, Modal, Row, Table, Tag } from "antd";
import moment from "moment";
import { CheckCircleTwoTone, CloseCircleTwoTone, SearchOutlined } from "@ant-design/icons";

const RegularizeAttendance = (props) => {
  const configurations = props.configurations;
  const [regularizeDetails, setRegularizeDetails] = useState([]);
  const [pendingData, setpendingData] = useState([]);
  const [selDate, setSelDate] = useState(moment());
  const [loading, setLoading] = useState(true);

  const getAllRegularizeAtt = async () => {
    setLoading(true)
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
    setLoading(false)
  };

  const approveColumns = (value) => {
    let col = [
      {
        title: "Employee Code",
        dataIndex: "empCode",
        key: "empCode",
        align: "center",
        width: 95,
      },
      {
        title: "Employee Name",
        dataIndex: "empName",
        key: "empName",
        align: "center",
        width: 95,
      },
      {
        title: "Date",
        dataIndex: "date",
        key: "date",
        width: 80,
        align: "center",
      },
      {
        title: "Reason",
        dataIndex: "reason",
        width: 150,
        key: "reason",
        align: "center"
      },
    ];
    col.push(
      value
        ? {
            title: "Action",
            dataIndex: "action",
            key: "action",
            align: "center",
            width: 30,
            render: (_, record) => (
              <>
                {/* <Button
                    type="link"
                    className="show"
                  > */}
                    <CheckCircleTwoTone 
                    onClick={() => {
                      setStatus(record, "Approved");
                    }}twoToneColor="#41BF36" style={{ fontSize: '1rem',marginRight: "10px" }}/>
                  {/* </Button> 
                  <Button
                    type="link"
                    className="deleTe"
                  >*/}
                    <CloseCircleTwoTone
                    onClick={() => {
                      setStatus(record, "Rejected");
                      console.log("record", record);
                    }} twoToneColor="#FC6161" style={{ fontSize: '1rem' }} />
                  {/* </Button> */}
              </>
            ),
          }
        : {
            title: "Status",
            dataIndex: "appStatus",
            key: "appStatus",
            align: "center",
            width: 90,
            render: (_, { appStatus }) => (
              <Tag
                className="status-tag"
                color={
                  appStatus === "Approved"
                    ? "rgba(15, 255, 80, 0.2)"
                    : appStatus === "Pending"
                    ? "rgba(205, 227, 36, 0.25)"
                    : "rgb(252, 97, 97, 0.5)"
                }
              >
                {appStatus}
              </Tag>
            )
          }
    );
    return col;
  };

  useEffect(() => {
    getAllRegularizeAtt();
  }, []);

  const setStatus = async (record, status) => {
    console.log("reocrddd", record);
    let absentReason = "";
    Modal.confirm({
      title: `Are you sure, you want to ${
        status == "Approved" ? "approve" : "reject"
      } this request?`,
      content:
        status == "Approved" ? (
          ""
        ) : (
          <Input
            placeholder="Enter Reason"
            onChange={(event) => {
              absentReason = event.target.value;
            }}
          />
        ),
      okText: "yes",
      okType: "danger",
      onOk: async () => {
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
        record.rejectedReason = absentReason;

        console.log("recorddd", record);
        await AttendanceContext.updateRegularize(record.id, record);
        getAllRegularizeAtt();
      },
    });
  };

  return (
    <Card className="daily">
        <Table
          className="daily daily-table"
          loading={loading}
          columns={approveColumns(true)}
          // onRow={(record) => {
          //   return {
          //     onClick: () => {
          //       navigate(record.id);
          //     },
          //   };
          // }}
          scroll={{ x: 500 }}
          dataSource={pendingData}
          pagination={true}
          onChange={() => document.getElementById("att-tabs").scrollIntoView(true)}
        />
        <Divider>History</Divider>
        <Row gutter={[10, 10]} style={{justifyContent:"space-between"}}>
          <Col md={8}>
            <Input
              // className="daily"
              style={{margin: "0 15px", width: "225px"}}     
              placeholder="Search"
              prefix={<SearchOutlined />}
              // onChange={searchChange}
            />
          </Col>
          <Col md={8} style={{textAlign: "right"}}>
            <DatePicker
              defaultValue={selDate}
              className="daily range"
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
        </Row>

      <Table
        id="table-top"
        className="daily daily-table"
        loading={loading}
        columns={approveColumns(false)}
        // onRow={(record) => {
        //   return {
        //     onClick: () => {
        //       navigate(record.id);
        //     },
        //   };
        // }}
        scroll={{ x: 500 }}
        dataSource={regularizeDetails}
        pagination={true}
        onChange={() => document.getElementById("table-top").scrollIntoView(true)}
      />
    </Card>
    // <Card title="Approve Attendance" className="approveCard">
    //   {/* <h1>Regularize</h1> */}
    //   <Table
    //     columns={approveColumns(true)}
    //     className="approveTable"
    //     // dataSource={pendingData}
    //   />
    //   <Card title="Attendance Log" className="approveCard">
    //     <Row gutter={[24, 8]} style={{ marginLeft: "0px" }}>
    //       <Col span={6}>
    //         <Input placeholder="Search" prefix={<SearchOutlined />} />
    //       </Col>
    //       <Col span={6}>
    //         <DatePicker
    //           picker="month"
    //           placeholder="Select Month"
    //           bordered={true}
    //           format="MM-YYYY"
    //           allowClear
    //           disabledDate={(current) => {
    //             return current.isAfter(moment());
    //           }}
    //         />
    //       </Col>
    //     </Row>

    //     <Table
    //       columns={approveColumns(false)}
    //       className="approveTable"
    //       // dataSource={regularizeDetails}
    //     />
    //   </Card>
    // </Card>
  );
};

export default RegularizeAttendance;
