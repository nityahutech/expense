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
import { totalAmount, avgAmountPerMonth, topSixExpenses } from "../contexts/DashboardContext";
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

const Charts = () => {
  const handleExpenselist = () => {
    navigate("/Expense/Expenselist");
  };
  const navigate = useNavigate();

  const [total, setTotal] = useState(0);
  const [avg, setAvg] = useState(0);
  let col = 0;
  const [pieData, setPieData] = useState([[],[]]);

  function accumulateExpense(expense) {
    let piedata= [...pieData];
    if(pieData[0].includes(expense.catname)){
      let index = pieData[0].indexOf(expense.catname);
      piedata[1][index] += expense.subtotal;
    }
    else {
      if (col == 6) return;
      console.log(col);
      piedata[0][col] = expense.catname;
      console.log(piedata[0][col]);
      piedata[1][col] = expense.subtotal;
      console.log(piedata[1][col]);
      setPieData(piedata);
      col++;
    }
  }

  const handleChange = async (value) => {
      setPieData([[],[]]);
      col = 0;
      console.log(col,":",pieData);
    await topSixExpenses(value, '2022').then((exp) => {
      console.log(exp);
      exp.forEach(accumulateExpense);
    });
  };

  const values = async () => {
    await totalAmount().then((a) => {
      setTotal(a);
    });
    await avgAmountPerMonth().then((a) => {
      console.log(a);
      setAvg(a);
    });
    await topSixExpenses('09', '2022').then((exp) => {
      console.log(exp);
      setPieData([[],[]]);
      exp.forEach(accumulateExpense);
      col = 0;
    });
    console.log(pieData);
  };

  useEffect(() => {
    setPieData([[],[]]);
    col = 0;
    console.log(col,":",pieData);
    values();
    setPieData([[],[]]);
    col = 0;
    console.log(col,":",pieData);
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
                labels:  pieData[0],
                datasets: [
                  {
                    label: "# of Votes",
                    data:  pieData[1],
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Charts;
