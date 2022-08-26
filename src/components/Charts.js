import React from "react";
import "../style/Charts.css";

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
  // const options = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: "top",
  //     },
  //     title: {
  //       display: true,
  //       text: "Chart.js Bar Chart",
  //     },
  //   },
  // };

  // const labels = [
  //   "January",
  //   "February",
  //   "March",
  //   "April",
  //   "May",
  //   "June",
  //   "July",
  //   "August",
  //   "September",
  //   "October",
  //   "November",
  //   "December",
  // ];

  // // const data = {
  // //   labels,
  // //   datasets: [
  // //     {
  // //       label: "Water",
  // //       data: labels.map(() => (1111)),
  // //       backgroundColor: "rgba(255, 99, 132, 0.5)",
  // //     },
  // //     {
  // //       label: "Food",
  // //       data: labels.map(() => 666),
  // //       backgroundColor: "rgba(53, 162, 235, 0.5)",
  // //     },
  // //     {
  // //       label: "Electricity",
  // //       data: labels.map(() => 555),
  // //       backgroundColor: "yellow",
  // //     },
  // //     {
  // //       label: "Travel",
  // //       data: labels.map(() => 333),
  // //       backgroundColor: "grey",
  // //     },
  // //     {
  // //       label: "others",
  // //       data: labels.map(() => 222),
  // //       backgroundColor: "blue",
  // //     },
  // //   ],
  // };

  return (
    <>
      <div className="chartsbox">
        <div className="Totalamount">
          <div className="heading">Total Amount</div>
          <h1>6903</h1>
        </div>
        <div className="AvgAmount">
          <div className="heading">Average Amount/Month</div>
            <h1>750</h1>
        </div>
      </div>
      <div className="chartsdisp">
        <div className="barGraph">
          <div>
          <Bar
            // // options={options}
            // 
            // }}
            // // data={data}
            // data={{
            //   lables: ['Red','Blue','Yellow','Green','Purple','Orange'],
            //   datasets: [12, 19, 3, 5, 2, 3],
            // }}

            style={{ height: "400px", width: "100%" }}
            data={{
              labels:['January','Faburary','March','April','May','June','July','August','September','October','November','December'],
              datasets:[
                {
                  label:'Water',
                  data:[876,1100,1000,900,800,700,600,500,400,300,200,100],
                  backgroundColor:[
                    'red','Green','Yellow','Orange','blue','lightgreen','darkgreen'
                  ]
                },
                {
                  label:'Electricity',
                  data:[800,500,1000,900,800,700,600,500,400,300,200,100],
                  backgroundColor:[
                    'blue','orange','Yellow','Orange','blue','lightgreen','darkgreen'
                  ]
                },
                {
                  label:'Newspaper',
                  data:[750,500,1000,900,800,700,600,500,400,300,200,100],
                  backgroundColor:[
                    'aqua','orange','Yellow','Orange','blue','lightgreen','darkgreen'
                  ]
                },
                {
                  label:'Food',
                  data:[650,500,1000,900,800,700,600,500,400,300,200,100],
                  backgroundColor:[
                    'magenta','orange','Yellow','Orange','blue','lightgreen','darkgreen'
                  ]
                },
                {
                  label:'Travel',
                  data:[550,500,1000,900,800,700,600,500,400,300,200,100],
                  backgroundColor:[
                    'pink','orange','Yellow','Orange','blue','lightgreen','darkgreen'
                  ]
                },
              ]
            }}
            options={{
                maintainAspectRatio:false,
            }}
          />
          </div>
        </div>
      </div>
    </>
  );
};

export default Charts;
