import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useStopwatch } from "react-timer-hook";
import AttendanceContext from "../../contexts/AttendanceContext";
import moment from "moment";





const WebClock = (props) => {
    const { currentUser } = useAuth();

    // useEffect(() => {
        console.log(props.record)
        // WebClock(props)
    //   }, [props.record.autoStart])
    

  const autoStart = props.record == 0 ? false : true;
  const stopwatchOffset = new Date

  const { seconds, minutes, hours, isRunning, start, pause, reset } = useStopwatch({
    autoStart: autoStart, offsetTimestamp: stopwatchOffset.setSeconds(stopwatchOffset.getSeconds() + props.record)
  });
  
  console.log(`${hours}:${minutes}:${seconds}`)
  // const [clockIn, setClockIn] = useState(false);
  const [mouseState, setMouseState] = useState(false);
  const clockTime =  isRunning ? `${hours}:${minutes}:${seconds}`: "";
  const buttonStyle = !isRunning ? {
          padding: "1px",
          background: "#70BDF0",
          color: "white",
          display: "inline-block",
          width: "200px",
          borderRadius: "5px",
          border:"1px solid white",
        } : {
          padding: "1px",
          background: "#171832",
          color: "white",
          display: "inline-block",
          width: "200px",
          borderRadius: "5px",
          border:"1px solid white",
        };

        const [buttonText, setButtonText] = useState(!isRunning ? "Web Clock In" : "");

  const onMouseEnter = (event) => {
    if(isRunning){
      event.target.style.background = "orange";
      setButtonText("Web Clock Out ");
      clockTime = "";
    }
    else {
      event.target.style.background = "red";
    }
  };

  const onMouseLeave = (event) => {
    if(isRunning){
      event.target.style.background = "#171832";
      setButtonText("");
    }
    else {
      setButtonText("Web Clock In ");
      event.target.style.background = "#70BDF0";
    }
  };

  const setClockState = () => {
      // setClockIn(true);
      let clickedDate = {
        empId: currentUser.uid,
        name: currentUser.displayName,
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
    let rec = await AttendanceContext.updateClockData(currentUser.uid, clickedDate);
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
