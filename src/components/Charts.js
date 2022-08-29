import React, { useEffect, useState } from "react";
import "../style/Charts.css";
import { Col, Row } from "antd";

import { useNavigate } from "react-router-dom";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { totalAmount, avgAmountPerMonth } from "../contexts/DashboardContext";
// import faker from 'faker';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Charts = () => {
  const handleExpenselist = () => {
    navigate("/Expense/Expenselist");
  };
  const navigate = useNavigate();

  const [total, setTotal] = useState(0);
  const [avg, setAvg] = useState(0);

  const values = async () => {
    await totalAmount().then((a) => {
      setTotal(a);
    });
    await avgAmountPerMonth().then((a) => {
      console.log(a);
      setAvg(a);
    });
  };

  useEffect(() => {
    values();
  }, []);

  return (
    <>
      {/* ------------------------------------------Cards Row------------------------------- */}
      {/* <div className="chartsbox"
              style={{margin:""}}> */}
      <Row gutter={[8, 8]}>
        <Col span={12} xs={24} sm={10} md={12} lg={12}>
          <div className="Card1">
            <div className="heading1">
              <h2>Total Amount</h2>
            </div>
            <h1>{total}</h1>
          </div>
        </Col>
        <Col span={12} xs={24} sm={10} md={12} lg={12}>
          <div className="Card2">
            <div className="heading2">
              <h2>Average Amount/Month</h2>
            </div>
            <h1>{avg}</h1>
          </div>
        </Col>
      </Row>
      {/* </div> */}
      {/* ------------------------------------------Cards Row------------------------------- */}

      {/* --------------------------------------------------------------Graph row----------- */}
      <div className="chartsdisp" style={{ margin: "10px" }}>
        <Row gutter={[36, 8]}>
          <Col span={0}></Col>
          <Col span={21}>
            <div className="barGraph">
              <div>
                <Bar
                  className="bar-style"
                  data={{
                    labels: [
                      "January",
                      "Faburary",
                      "March",
                      "April",
                      "May",
                      "June",
                      "July",
                      "August",
                      "September",
                      "October",
                      "November",
                      "December",
                    ],
                    datasets: [
                      {
                        label: "Water",
                        data: [
                          876, 1100, 1000, 900, 800, 700, 600, 500, 400, 300,
                          200, 100,
                        ],
                        backgroundColor: [
                          "red",
                          // "Green",
                          // "Yellow",
                          // "Orange",
                          // "blue",
                          // "lightgreen",
                          // "darkgreen",
                        ],
                      },
                      {
                        label: "Electricity",
                        data: [
                          800, 500, 1000, 900, 800, 700, 600, 500, 400, 300,
                          200, 100,
                        ],
                        backgroundColor: [
                          "blue",
                          // "orange",
                          // "Yellow",
                          // "Orange",
                          // "blue",
                          // "lightgreen",
                          // "darkgreen",
                        ],
                      },
                      {
                        label: "Newspaper",
                        data: [
                          750, 500, 1000, 900, 800, 700, 600, 500, 400, 300,
                          200, 100,
                        ],
                        backgroundColor: [
                          "aqua",
                          // "orange",
                          // "Yellow",
                          // "Orange",
                          // "blue",
                          // "lightgreen",
                          // "darkgreen",
                        ],
                      },
                      {
                        label: "Food",
                        data: [
                          650, 500, 1000, 900, 800, 700, 600, 500, 400, 300,
                          200, 100,
                        ],
                        backgroundColor: [
                          // "magenta",
                          // "orange",
                          // "Yellow",
                          // "Orange",
                          // "blue",
                          "lightgreen",
                          // "darkgreen",
                        ],
                      },
                      {
                        label: "Travel",
                        data: [
                          550, 500, 1000, 900, 800, 700, 600, 500, 400, 300,
                          200, 100,
                        ],
                        backgroundColor: [
                          // "pink",
                          "orange",
                          // "Yellow",
                          // "Orange",
                          // "blue",
                          // "lightgreen",
                          // "darkgreen",
                        ],
                      },
                    ],
                  }}
                  options={{}}
                />
              </div>
            </div>
          </Col>
          <div
            style={{
              justifyContent: "center",
              display: "flex",
            }}
          >
            <Col span={3}>
            <button
              style={{
                background: "#05445e",
                color: "#fff",
                borderRadius: "5px",
                width: "50px",
                marginLeft: "50%",
                marginTop: "50%",
                cursor: "pointer",
              }}
              onClick={handleExpenselist}
            >
              View
            </button>
            </Col>
          </div>
        </Row>
      </div>
      {/* --------------------------------------------------------------Graph row----------- */}
    </>
  );
};

export default Charts;
