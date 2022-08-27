import React, { useEffect, useState } from "react";
import "../style/Charts.css";


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
import { totalAmount, avgAmountPerMonth } from "../contexts/DashboardContext"
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
      <div className="chartsbox">
        <div className="Card1">
          <div className="heading">
            <h2 
            style={{
              paddingLeft:'20px',
              fontSize:'30px',
              fontWeight:'normal',
              }}>Total Amount</h2></div>
          <h1>{total}</h1>
        </div>
        <div className="Card2">
          <div className="heading">
            <h2
            style={{
              paddingLeft:'20px',
              fontSize:'30px',
              fontWeight:'normal',
              }}
            >
              Average Amount/Month</h2></div>
          <h1>{avg}</h1>
        </div>
      </div>
      <div className="chartsdisp">
        <div className="barGraph">
          <button onClick={handleExpenselist}>View</button>

          <div>
            <Bar
              style={{ height: "400px", width: "100%" }}
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
                      "red"
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
                      "blue"
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
                      "aqua"
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
                      "lightgreen"
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
                      "orange"
                      // "Yellow",
                      // "Orange",
                      // "blue",
                      // "lightgreen",
                      // "darkgreen",
                    ],
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Charts;
