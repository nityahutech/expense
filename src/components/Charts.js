import React, { useEffect, useState } from "react";
import "../style/Charts.css";
import { Select } from "antd";

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
                <Option value="2022">2022</Option>
                <Option value="2023">2023</Option>
              </Select>
            </div>
          </div>
          <div className="colpie">
            <Pie
              data={{
                labels: ["Water", "Electricity", "Newspaper", "Food", "Travel"],
                datasets: [
                  {
                    label: "# of Votes",
                    data: [12, 19, 3, 5, 2],
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
                <Option value="2022">2022</Option>
                <Option value="2023">2023</Option>
              </Select>
              <Select
                id="short"
                defaultValue="January"
                style={{
                  width: 90,
                 marginLeft: "5px",
                }}
                onChange={handleChange}
              >
                <Option value="January">January</Option>
                <Option value="Faburary">Faburary</Option>
                <Option value="March">March</Option>
                <Option value="April">April</Option>
                <Option value="May">May</Option>
                <Option value="June">June</Option>
                <Option value="July">July</Option>
                <Option value="August">August</Option>
                <Option value="September">September</Option>
                <Option value="October">October</Option>
                <Option value="Novemder">Novemder</Option>
                <Option value="December">December</Option>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Charts;
