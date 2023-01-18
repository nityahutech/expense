import React, { useEffect, useState } from "react";
import "../style/Charts.css";
import { Select } from "antd";
import { Card } from 'antd';
import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import { totalAmount, avgAmountPerMonth, topSixExpenses } from "../contexts/DashboardContext";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);
const { Option } = Select;
const Charts = () => {
  const handleExpenselist = () => {
    navigate("/Expense/Expenselist");
  };
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const [avg, setAvg] = useState(0);
  let col = 0;
  let initalPieData = [[], []]
  const [pieData, setPieData] = useState([[], []]);
  function accumulateExpense(expense, i) {
    if (i === 0) initalPieData = [[], []];
    if (initalPieData[0].includes(expense.catname)) {
      let index = initalPieData[0].indexOf(expense.catname);
      initalPieData[1][index] += expense.subtotal;
    } else {
      if (col === 6) return;
      initalPieData[0][col] = expense.catname;
      initalPieData[1][col] = expense.subtotal;
      setPieData(initalPieData);
      col++;
    }
  }
  const handleChange = (value) => {
    setPieData([[], []]);
    col = 0;
    topSixExpenses(value, '2022').then((exp) => {
      exp.forEach(accumulateExpense, col);
    });
  };
  const values = () => {
    totalAmount().then((a) => {
      setTotal(a);
    });
    avgAmountPerMonth().then((b) => {
      setAvg(b);
    });
    topSixExpenses('09', '2022').then((exp) => {
      setPieData([[], []]);
      exp.forEach(accumulateExpense, col);
      col = 0;
    });
  };
  useEffect(() => {
    values();
  }, []);
    return (
    <>
      <div className="content container-fluid">
        <div className="rowcards">
          <Card
            hoverable
            style={{
              backgroundColor: "inherit",
              padding: '1px',
            }}
            className="card1"
          >
            <div className="col1">
              <h2>Total Amount</h2>
              <h1>{total}</h1>
            </div>
          </Card>
          <Card
            hoverable
            style={{
              backgroundColor: "inherit",
              padding: '1px',
            }}
            className="card2"
          >
            <div className="col2">
              <h2>Average Amount/Month</h2>
              <h1>{avg}</h1>
            </div>
          </Card>
        </div>
        <div className="rowcharts">
          <div className="colbar">
            <Card
              hoverable
              style={{
                width: '100%',
              }}
            >
              <Bar
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
                        1050, 150, 990, 900, 800, 700, 600, 500, 400, 300, 200,
                        100,
                      ],
                      backgroundColor: [
                        "rgba(32, 126, 227, 0.5)",
                      ],
                      borderColor: [
                        "rgba(32, 126, 227, 1)",
                      ],
                      borderWidth: 1,
                    },
                    {
                      label: "Electricity",
                      data: [
                        800, 500, 1000, 900, 800, 700, 600, 500, 400, 300, 200,
                        100,
                      ],
                      backgroundColor: [
                        "rgba(232, 65, 23, 0.5)",
                      ],
                      borderColor: [
                        "rgba(232, 65, 23, 1)",
                      ],
                      borderWidth: 1,
                    },
                    {
                      label: "Newspaper",
                      data: [
                        750, 600, 1000, 900, 800, 700, 600, 500, 400, 300, 200,
                        100,
                      ],
                      backgroundColor: [
                        "rgba(231, 237, 47, 0.5)",
                      ],
                      borderColor: [
                        "rgba(231, 237, 47, 1)",
                      ],
                      borderWidth: 1,
                    },
                    {
                      label: "Food",
                      data: [
                        650, 700, 1000, 900, 800, 700, 600, 500, 400, 300, 200,
                        100,
                      ],
                      backgroundColor: [
                        "rgba(21, 232, 60, 0.5)",
                      ],
                      borderColor: [
                        "rgba(21, 232, 60, 1)",
                      ],
                      borderWidth: 1,
                    },
                    {
                      label: "Travel",
                      data: [
                        550, 800, 1000, 900, 800, 700, 600, 500, 400, 300, 200,
                        100,
                      ],
                      backgroundColor: [
                        "rgba(232, 21, 158, 0.5)",
                      ],
                      borderColor: [
                        "rgba(232, 21, 158, 1)",
                      ],
                      borderWidth: 1,
                    },
                  ],
                }}
                options={{
                  maintainAspectRatio: true,
                }}
              />
              <div className="vbutton1">
                <button
                  style={{
                    background: "#05445e",
                    color: "#fff",
                    borderRadius: "5px",
                    width: "50px",
                    marginLeft: "40%",
                    cursor: "pointer",
                  }}
                  onClick={handleExpenselist}
                >
                  View
                </button>
                <Select
                  defaultValue="2022"
                  size="small"
                  style={{
                    width: 120,
                    marginLeft: 10,
                  }}
                  onChange={handleChange}
                >
                  <Option value="2021">2021</Option>
                  <Option value="2022">2022</Option>
                </Select>
              </div>
            </Card>
          </div>
          <div className="colpie">
            <Card
              hoverable
              style={{
                width: '100%'
              }}
            >
              <Pie
                data={{
                  labels: pieData[0],
                  datasets: [
                    {
                      label: "# of Votes",
                      data: pieData[1],
                      backgroundColor: [
                        "rgba(32, 126, 227, 0.2)",
                        "rgba(232, 65, 23, 0.2)",
                        "rgba(231, 237, 47, 0.2)",
                        "rgba(21, 232, 60, 0.2)",
                        "rgba(232, 21, 158, 0.2)",
                      ],
                      borderColor: [
                        "rgba(32, 126, 227, 1)",
                        "rgba(232, 65, 23, 1)",
                        "rgba(231, 237, 47, 1)",
                        "rgba(21, 232, 60, 1)",
                        "rgba(232, 21, 158, 1)",
                      ],
                      borderWidth: 1,
                    },
                  ],
                }}
              />
              <div className="vbutton2">
                <button
                  onClick={handleExpenselist}
                >
                  View
                </button>
                <Select
                  id="short"
                  defaultValue="2022"
                  style={{
                    width: 90,
                    marginLeft: "5px",
                    marginTop: "10px",
                    marginBottom: "10px",
                  }}
                  onChange={handleChange}
                >
                  <Option value="2021">2021</Option>
                  <Option value="2022">2022</Option>
                </Select>
                <Select
                  id="short"
                  defaultValue="September"
                  style={{
                    width: 90,
                    marginLeft: "5px",
                  }}
                  onChange={handleChange}
                >
                  <Option value="01">January</Option>
                  <Option value="02">Faburary</Option>
                  <Option value="03">March</Option>
                  <Option value="04">April</Option>
                  <Option value="05">May</Option>
                  <Option value="06">June</Option>
                  <Option value="07">July</Option>
                  <Option value="08">August</Option>
                  <Option value="09">September</Option>
                  <Option value="10">October</Option>
                  <Option value="11">Novemder</Option>
                  <Option value="12">December</Option>
                </Select>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Charts;