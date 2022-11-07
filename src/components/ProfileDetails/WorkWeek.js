import React, { useState, useEffect } from "react";
import { Card, Table } from "antd";
import "../../style/WorkWeek.css";
import EmpInfoContext from "../../contexts/EmpInfoContext";
import { useAuth } from "../../contexts/AuthContext";
const data = [
  {
    key: "1",
    week: "1",
    mon: "",
    tue: "",
    wed: "",
    thu: "",
    fri: "",
    sat: "",
    sun: "",
  },
  {
    key: "2",
    week: "2",
    mon: "",
    tue: "",
    wed: "",
    thu: "",
    fri: "",
    sat: "",
    sun: "",
  },
  {
    key: "3",
    week: "3",
    mon: "",
    tue: "",
    wed: "",
    thu: "",
    fri: "",
    sat: "",
    sun: "",
  },
  {
    key: "4",
    week: "4",
    mon: "",
    tue: "",
    wed: "",
    thu: "",
    fri: "",
    sat: "",
    sun: "",
  },
  {
    key: "5",
    week: "5",
    mon: "",
    tue: "",
    wed: "",
    thu: "",
    fri: "",
    sat: "",
    sun: "",
  },
];
function WorkWeek() {
  const [doj, setDoj] = useState();

  useEffect(() => {
    getData();
  }, [])
  const{currentUser}=useAuth()

  const getData = async () => {
    let data=await EmpInfoContext.getEduDetails(currentUser.uid)
    setDoj(data.doj?data.doj:null)
  }

  const sharedOnCell = (_, index) => {
    if (index === 5) {
      return {
        colSpan: 0,
      };
    }
    return {};
  };
  const columns = [
    {
      title: "Week",
      dataIndex: "week",
      render: (text) => <a className="text">{text}</a>,
      onCell: (_, index) => ({
        colSpan: index < 5 ? 1 : 6,
      }),
    },
    {
      title: "Mon",
      dataIndex: "mon",
      width: 80,
      onCell: sharedOnCell,
      render(text) {
        return {
          children: (
            <div
              style={{
                background: "#1fcb1f",
                width: "15px",
                height: "15px",
                marginLeft: "24px",
              }}
            >
              {" "}
            </div>
          ),
        };
      },
    },
    {
      title: "Tue",
      dataIndex: "tue",
      width: 80,
      onCell: sharedOnCell,
      render(text) {
        return {
          children: (
            <div
              style={{
                background: "#1fcb1f",
                width: "15px",
                height: "15px",
                marginLeft: "24px",
              }}
            >
              {" "}
            </div>
          ),
        };
      },
    },
    {
      title: "Wed",
      dataIndex: "wed",
      width: 80,
      onCell: sharedOnCell,
      render(text) {
        return {
          children: (
            <div
              style={{
                background: "#1fcb1f",
                width: "15px",
                height: "15px",
                marginLeft: "24px",
              }}
            >
              {" "}
            </div>
          ),
        };
      },
    },
    {
      title: "Thu",
      dataIndex: "thu",
      width: 80,
      onCell: sharedOnCell,
      render(text) {
        return {
          children: (
            <div
              style={{
                background: "#1fcb1f",
                width: "15px",
                height: "15px",
                marginLeft: "24px",
              }}
            >
              {" "}
            </div>
          ),
        };
      },
    },
    {
      title: "Fri",
      dataIndex: "fri",
      width: 80,
      onCell: sharedOnCell,
      render(text) {
        return {
          children: (
            <div
              style={{
                background: "#1fcb1f",
                width: "15px",
                height: "15px",
                marginLeft: "24px",
              }}
            >
              {" "}
            </div>
          ),
        };
      },
    },
    {
      title: "Sat",
      dataIndex: "sat",
      width: 80,
      onCell: sharedOnCell,
      render(text) {
        return {
          children: (
            <div
              style={{
                background: "#da2828",
                width: "15px",
                height: "15px",
                marginLeft: "24px",
              }}
            >
              {" "}
            </div>
          ),
        };
      },
    },
    {
      title: "Sun",
      dataIndex: "sun",
      width: 80,
      onCell: sharedOnCell,
      render(text) {
        return {
          children: (
            <div
              style={{
                background: "#da2828",
                width: "15px",
                height: "15px",
                marginLeft: "24px",
              }}
            >
              {" "}
            </div>
          ),
        };
      },
    },
  ];

  return (
    <>
      <div
        className="week"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card className="workWeek">
          <div style={{ background: "#fff" }}>
            {" "}
            <>
              <div style={{ marginLeft: "2px", background: "#fff" }}>
                <div className="header" style={{ marginLeft: "10px" }}>
                  <h1>Saturday Sunday Off</h1>
                  <h4>Description</h4>
                  <p>
                    This is a five days Work Week rule with Weekly Off set as
                    Saturday and Sunday.
                  </p>
                  <h4>Effective Date</h4>
                  <p> {doj}</p>
                  {/* <hr style={{ marginRight: "21.7rem" }} /> */}
                </div>
                <h4 style={{ marginLeft: "10px" }}>Rule Settings1</h4>
                <div
                  style={{
                    float: "right",
                    display: "flex",
                    alignItems: "baseline",
                    marginRight: "17px",
                  }}
                >
                  <input
                    checked="true"
                    type="checkbox"
                    style={{
                      background: "blue",
                      cursor: "not-allowed",
                    }}
                  />
                  <p>Half Day</p>
                </div>

                <div>
                  <Table
                    className="Table"
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                    size="small"
                    bordered
                  />
                </div>
                <ul>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      marginTop: "10px",
                      marginRight: "6rem",
                    }}
                  >
                    <div
                      style={{
                        background: "#1fcb1f",
                        width: "15px",
                        height: "15px",
                      }}
                    >
                      <li
                        style={{
                          paddingLeft: "15px",
                          width: "100px",
                          display: "flex",
                          justifyContent: "space-evenly",
                          marginTop: "-3px ",
                        }}
                      >
                        Working Day
                      </li>
                    </div>
                    <div
                      style={{
                        background: "#da2828",
                        width: "15px",
                        height: "15px",
                      }}
                    >
                      <li
                        style={{
                          paddingLeft: "6px",
                          width: "100px",
                          display: "flex",
                          justifyContent: "space-evenly",
                          marginTop: "-3px ",
                        }}
                      >
                        Weekly Off
                      </li>
                    </div>
                    <div
                      style={{
                        background: "#ffc107",
                        width: "15px",
                        height: "15px",
                      }}
                    >
                      <li
                        style={{
                          paddingRight: "8px",
                          width: "100px",
                          display: "flex",
                          justifyContent: "space-evenly",
                          marginTop: "-3px ",
                        }}
                      >
                        Half Day
                      </li>
                    </div>
                  </div>
                </ul>
              </div>
            </>
          </div>
        </Card>
      </div>
    </>
  );
}
export default WorkWeek;
