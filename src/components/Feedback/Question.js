import { Button, Card } from "antd";
import { useState } from "react";
import {
  ArrowRightOutlined,
  RightOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";

function Question(props) {
  console.log("propssss", props);
  const [shaded, setShaded] = useState(-1);

  const handleClick = (x) => {
    console.log(x);
    props.nextInner();
  };

  const firstStyle = {
    borderRadius: "5px 0 0 5px",
  };

  const lastStyle = {
    borderRadius: "0 5px 5px 0",
  };

  console.log("shaded", shaded);

  return (
    <div className="surveyCarousel">
      <Card className="surveyCard">
        <div className="back-arrow"  style={{color: "white"}} onClick={props.backInner}>
          <ArrowLeftOutlined />
          Back
        </div>
        <h1 style={{ color: "#ffffff", marginTop: "13px" }}>{props.section}</h1>
        <h3 style={{ color: "#b99292" }}>Question {props.index + 1}</h3>
        <h3 style={{ color: "#ffffff", fontSize: "20px" }}>{props.question}</h3>
        <br />
        <div className="rank-list">
          {props.ranks.map((x, i) => (
            <Button
              onMouseEnter={() => setShaded(i)}
              onMouseLeave={() => setShaded(-1)}
              className={`rank-button${i < shaded ? " shaded-style" : ""}`}
              style={
                i == 0
                  ? firstStyle
                  : i == props.ranks.length - 1
                  ? lastStyle
                  : null
              }
              onClick={() => handleClick(x)}
            >
              {x}
            </Button>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default Question;
