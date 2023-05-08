import { Button, Card, Carousel, Tooltip } from "antd";
import { ArrowRightOutlined, RightOutlined } from "@ant-design/icons";
import React, { useRef, useState } from "react";
import backgroundImage from "../../images/backgroundImage.jpg";
import "../Feedback/FeedBack.css";
import Questions from "./Questions";
import Title from "./Title";
import Section from "./Section";
// import { color } from "html2canvas/dist/types/css/types/color";

function Survey() {
  const innerCarouselRef = useRef(null);
  const outerCarouselRef = useRef(null);
  const name = "Swetha Vijay";
  const uid = "HiTsFElf0UPuMgtHMARKjuFnXmY2";
  const email = "swetha.vijay@alcove.com";
  const sections = [
    "Communication Skills",
    "Managerial Skills",
    "Technical Skills",
  ];

  const questions = {
    "Communication Skills": [
      "How satisfied are you with our service?",
      "How likely are you to recommend us to a friend?",
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus ?",
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa ?",
    ],
    "Managerial Skills": [
      "How man satisfied are you with our service?",
      "How man likely are you to recommend us to a friend?",
      "Man lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus ?",
    ],
    "Technical Skills": [
      "How tech satisfied are you with our service?",
      "How tech likely are you to recommend us to a friend?",
      "Lorem tech ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa ?",
    ],
  };
  const [ranks, setRanks] = useState([
    { label: "1", value: 1, toolTipText: "Poor" },
    { label: "2", value: 2, toolTipText: "Ok" },
    { label: "3", value: 3, toolTipText: "Good" },
    { label: "4", value: 4, toolTipText: "Great" },
    { label: "5", value: 5, toolTipText: "Excellent" },
  ]);
  const [scores, setScores] = useState({});
  const [slides, setSlides] = useState([]);

  const nextInner = () => {
    console.log("inner", innerCarouselRef);
    innerCarouselRef.current.next();
  };

  const nextOuter = () => {
    outerCarouselRef.current.next();
  };

  return (
    <div>
      <Carousel
        ref={outerCarouselRef}
        dots={false}
        style={{
          // margin: "auto",
          display: "flex",
          alignItems: "center",
          width: "100%",
          height: "100vh",
          backgroundColor: "#f8f8f8",
        }}
      >
        <div className="surveyCarousel">
          <Card className="surveyCard">
            <Title nextPage={nextOuter} titleType={"startPage"} />
          </Card>
        </div>
        {sections.map((section) => (
          <Section
            section={section}
            nextOuter={nextOuter}
            questions={questions[section]}
            ranks={ranks}
          />
        ))}
        <div className="surveyCarousel">
          <Card className="surveyCard">
            <Title nextPage={nextOuter} titleType={"thankyou"} />
          </Card>
        </div>
      </Carousel>
    </div>
  );
}

export default Survey;
