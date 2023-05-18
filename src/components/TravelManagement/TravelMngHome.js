import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  DatePicker,
  Tabs
} from "antd";
import "./travelManagement.css";
import TravelContext from "../../contexts/TravelContext";
import TravelManagement from "./travelManagement";
import moment from "moment";
import EmpInfoContext from "../../contexts/EmpInfoContext";
import ViewTravelMng from "./ViewTravelMng";

const { RangePicker } = DatePicker;

function TravelMngHome(props) {
  console.log("props", props);
  const [travelDetails, setTravelDetails] = useState([]);
  const [user, setUser] = useState({});
  const [durationArray, setDurationArray] = useState([]);

  const role = props.roleView == "emp";
  console.log(props.roleView);
  const { TextArea } = Input;
  const { RangePicker } = DatePicker;

  const currentUser = JSON.parse(sessionStorage.getItem("user"));

  const getAlltravelData = async () => {
    let userData = await EmpInfoContext.getEduDetails(currentUser.uid);
    let travleData = await TravelContext.getAllTravel(currentUser.uid);
    console.log(travleData);
    setTravelDetails(travleData);
    setUser(userData);
    let data = travleData.map((record) => {
      let dur = record.travelType.map((dt) => dt.durationDate);
      let temp = [].concat.apply([], dur);

      console.log("dur", dur);
      temp.sort((a, b) => {
        return moment(a, "DD-MM-YYYY") - moment(b, "DD-MM-YYYY");
      });
      return temp;
    });
    console.log("data", data);
    setDurationArray(data);
  };

  console.log("travelDetails", travelDetails);

  useEffect(() => {
    getAlltravelData();
  }, []);


  return (
    <>
      <div className="travelDiv">
        <Tabs className="assetTabs"  >
          <Tabs.TabPane tab='Travel Reimbursement ' key='1'>
            <TravelManagement
              roleView={role}
              getTravelData={getAlltravelData}
              travelDetails={travelDetails}
              durationArray={durationArray}
              user={user}
            />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </>
  );
}

export default TravelMngHome;
