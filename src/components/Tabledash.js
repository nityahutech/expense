import { Row } from "antd";
import React from "react";
import "../style/Table.css";

function Tabledash() {
  return (
    <Row>
      <div
        className="table1"
        style={{ width: "48%", borderRadius: "5px", height: "auto" }}
      >
        <div className="row">
          <div className="col">
            <i
              className="fas fa-circle"
              style={{ fontSize: "30px", color: "green" }}
            ></i>
            Paid
          </div>
          <div className="col">
            <i
              className="fa fa-circle"
              style={{ fontSize: "30px", color: "yellow" }}
            ></i>
            Unpaid
          </div>
          <div className="col">
            <i
              className="fa fa-circle"
              style={{ fontSize: "30px", color: "red" }}
            ></i>
            Overdue
          </div>
          <div className="col">
            <i
              className="fa fa-circle"
              style={{ fontSize: "30px", color: "skyblue" }}
            ></i>
            Draft
          </div>
        </div>
      </div>
      <div
        className="table2"
        style={{
          width: "48%",
          backgroundColor: "white",
          borderRadius: "5px",
          height: "auto",
        }}
      >
        table2
      </div>
    </Row>
  );
}
export default Tabledash;
