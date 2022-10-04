import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useStopwatch } from "react-timer-hook";
import AttendanceContext from "../../contexts/AttendanceContext";
import moment from "moment";





const WebClock = (props) => {

  // const [autoStart, setAutoStart] = useState("");

    // useEffect(() => {
    //     console.log(props)
    //   }, [])
    
      // setAutoStart(props.record.autoStart);
  const id = props.record.id;
  const stopwatchOffset = new Date()

  const { seconds, minutes, hours, isRunning, start, pause, reset } = useStopwatch({
    autoStart: props.record.autoStart, offsetTimestamp: stopwatchOffset.setSeconds(stopwatchOffset.getSeconds() + props.record.secs)
    // autoStart: true, offsetTimestamp: stopwatchOffset.setSeconds(props.record.secs)
  });
  
  console.log(`${hours}:${minutes}:${seconds}`)
  // const [clockIn, setClockIn] = useState(false);
  const clockTime =  isRunning ? `${hours}:${minutes}:${seconds}`: "";
  const buttonStyle = !isRunning ? {
          padding: "1px",
          background: "#FF002A",
          color: "white",
          display: "inline-block",
          width: "200px",
          borderRadius: "5px",
          border:"1px solid white",
        } : {
          padding: "1px",
          background: "skyblue",
          color: "white",
          display: "inline-block",
          width: "200px",
          borderRadius: "5px",
          border:"1px solid white",
        };

        const [buttonText, setButtonText] = useState(!isRunning ? "Web Clock In" : "");

  const onMouseEnter = (event) => {
    event.target.style.background = "#DB0000";
    if(isRunning){
      setButtonText("Web Clock Out ");
      clockTime = "";
    }
  };

  const onMouseLeave = (event) => {
    if(isRunning){
      event.target.style.background = "skyblue";
      setButtonText("");
    }
    else {
      setButtonText("Web Clock In ");
      event.target.style.background = "#FF002A";
    }
  };

  const setClockState = () => {
      // setClockIn(true);
      let clickedDate = {
        empId: id,
        name: props.record.name,
        date: moment().format("DD-MM-YYYY"),
        clockIn: moment().format("HH:mm:ss"),
        clockOut: null
      } 
      console.log(clickedDate)
      start();
      AttendanceContext.addClockData(clickedDate)
  };

  const stopClockState = async () => {
    // setClockIn(false);
    pause();
    let clickedDate = {
      clockOut: moment().format("HH:mm:ss"),
      duration: clockTime
    }
    // AttendanceContext.updateClockData(clickedDate, currentUser.uid)
    let rec = await AttendanceContext.updateClockData(id, clickedDate);
    // console.log(rec.data())
    console.log(isRunning);
    console.log(clickedDate.toString().substring(16, 25));
    console.log("");
    reset("0:0:0:0", false);
  };

  const handleClock = () => {
    console.log(isRunning)
    if (isRunning) {
      stopClockState();
    }
    else {
      setClockState();
    }
  }
  
  return (
    <button
            style={buttonStyle}
          onClick={handleClock}
        onMouseLeave={onMouseLeave}
        onMouseEnter={onMouseEnter}
      >
        {buttonText}
        <div>{clockTime}</div>
      </button>
  );
};

export default WebClock;
