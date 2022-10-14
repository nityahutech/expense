import React from "react";
import { Card, Table } from "antd";
import "../../style/WorkWeek.css";

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
                position: "relative",
                left: "24px",
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
                position: "relative",
                left: "24px",
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
                position: "relative",
                left: "24px",
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
                position: "relative",
                left: "24px",
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
                position: "relative",
                left: "24px",
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
                position: "relative",
                left: "24px",
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
                position: "relative",
                left: "24px",
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
              <div style={{ marginLeft: "22px", background: "#fff" }}>
                <div className="header" style={{ marginLeft: "10px" }}>
                  <h1>Saturday Sunday Off</h1>
                  <h4>Description</h4>
                  <p>
                    This is a five days Work Week rule with Weekly Off set as
                    Saturday and Sunday.
                  </p>
                  <h4>Effective Date</h4>
                  <p> 09 Sep,2022</p>
                  <hr style={{ marginRight: "21.7rem" }} />
                </div>
                <h4 style={{ marginLeft: "10px" }}>Rule Settings1</h4>
                <div style={{ position: "relative", bottom: "30px" }}>
                  {" "}
                  <input
                    checked="true"
                    type="checkbox"
                    style={{
                      position: "relative",
                      left: "38rem",
                      top: "42px",
                      background: "blue",
                      cursor: "not-allowed",
                    }}
                  />
                  <p
                    style={{ position: "relative", left: "39rem", top: "18px" }}
                  >
                    Half Day
                  </p>
                </div>

                <div style={{ position: "relative", bottom: "27px" }}>
                  <Table
                    className="Table"
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                    size="small"
                    bordered
                    style={{ width: "700px" }}
                  />
                </div>
                <ul style={{ position: "relative", bottom: "30px" }}>
                  <li className="box">
                    <div
                      style={{
                        background: "#1fcb1f",
                        width: "15px",
                        height: "15px",
                        position: "relative",
                        right: "20px",
                        top: "18px",
                      }}
                    ></div>
                    Working Day
                  </li>
                  <li className="box">
                    <div
                      style={{
                        background: "#da2828",
                        width: "15px",
                        height: "15px",
                        position: "relative",
                        right: "20px",
                        top: "18px",
                      }}
                    ></div>
                    Weekly Off
                  </li>
                  <li className="box">
                    <div
                      style={{
                        background: "#ffc107",
                        width: "15px",
                        height: "15px",
                        position: "relative",
                        right: "20px",
                        top: "18px",
                      }}
                    ></div>
                    Half Day
                  </li>
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
