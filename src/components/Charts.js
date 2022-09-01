import React, { useEffect, useState } from "react";
import "../style/Charts.css";
import { Col, Row, Select } from "antd";

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
import { totalAmount, avgAmountPerMonth } from "../contexts/DashboardContext";
// import faker from 'faker';
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
const handleChange = (value) => {
  console.log(`selected ${value}`);
};

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
      <div className="content container-fluid">
        <div className="rowcards">
          <div className="col1">
            <h2>Total Amount</h2>
            <h1>{total}</h1>
          </div>
          <div className="col2">
            <h2>Average Amount/Month</h2>
            <h1>{avg}</h1>
          </div>
        </div>
        <div className="rowcharts">
          <div className="colbar">
            <Bar
              // className="bar-style"
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
                      876, 1100, 1000, 900, 800, 700, 600, 500, 400, 300, 200,
                      100,
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
                      800, 500, 1000, 900, 800, 700, 600, 500, 400, 300, 200,
                      100,
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
                      750, 500, 1000, 900, 800, 700, 600, 500, 400, 300, 200,
                      100,
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
                      650, 500, 1000, 900, 800, 700, 600, 500, 400, 300, 200,
                      100,
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
                      550, 500, 1000, 900, 800, 700, 600, 500, 400, 300, 200,
                      100,
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
            <div className="vbutton">
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
                defaultValue="Month"
                style={{
                  width: 120,
                  margin: "10px",
                }}
                onChange={handleChange}
              >
                <Option value="year">Year</Option>
                <Option value="Month">Month</Option>
                <Option value="Week">Week</Option>
                <Option value="day">Day</Option>
              </Select>
            </div>
          </div>
          <div className="colpie">
            <Pie
              data={{
                labels: ["Water", "Electricity", "Newspaper", "Food", "Travel", "Others"],
                datasets: [
                  {
                    label: "# of Votes",
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                      "rgba(255, 99, 132, 0.2)",
                      "rgba(54, 162, 235, 0.2)",
                      "rgba(255, 206, 86, 0.2)",
                      "rgba(75, 192, 192, 0.2)",
                      "rgba(153, 102, 255, 0.2)",
                      "rgba(255, 159, 64, 0.2)",
                    ],
                    borderColor: [
                      "rgba(255, 99, 132, 1)",
                      "rgba(54, 162, 235, 1)",
                      "rgba(255, 206, 86, 1)",
                      "rgba(75, 192, 192, 1)",
                      "rgba(153, 102, 255, 1)",
                      "rgba(255, 159, 64, 1)",
                    ],
                    borderWidth: 1,
                  },
                ],
              }}
            />
            <div className="vbutton">
              <button
                style={{
                  background: "#05445e",
                  color: "#fff",
                  borderRadius: "5px",
                  width: "50px",
                  marginLeft: "30%",
                  cursor: "pointer",
                }}
                onClick={handleExpenselist}
              >
                View
              </button>
              <Select
                id="short"
                defaultValue="Month"
                style={{
                  width: 90,
                 margin: "10px",
                }}
                onChange={handleChange}
              >
                <Option value="year">Year</Option>
                <Option value="Month">Month</Option>
                <Option value="Week">Week</Option>
                <Option value="day">Day</Option>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Charts;
