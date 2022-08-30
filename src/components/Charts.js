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
      <div className="chartsdisp">
        {/* <Row gutter={[8, 8]}> */}
        {/* -----------------------------------------------Bar graph starts----------------------- */}
        {/* <Col span={22}> */}
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
            
          </div>
          
        </div>
        
        {/* ------------------------------------------------------Bar-graph end's----------------- */}
        {/* ------------------------------------------------------Pie-Chaart starts----------------- */}
        {/* </Col> */}
        {/* <Col span={6}> */}
        <div className="pichart">
          <div>
            <Pie
              data={{
                labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
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
          </div>
        </div>
        {/* </Col> */}
        {/* </Row> */}
      </div>

      {/* ------------------------------------------------button-------------------------- */}
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
                  margin: '10px',
                }}
                onChange={handleChange}
              >
                <Option value="year">Year</Option>
                <Option value="Month">Month</Option>
                <Option value="Week">Week</Option>
                <Option value="day">Day</Option>
              </Select>
              
      </div>
      {/* --------------------------------------------------------------Graph row----------- */}
    </>
  );
};

export default Charts;
