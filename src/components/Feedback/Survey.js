import { Card, Carousel } from "antd";
import React, { useRef, useState } from "react";
import "../Feedback/FeedBack.css";
import Title from "./Title";
import Section from "./Section";

function Survey() {
  const innerCarouselRef = useRef(null);
  const outerCarouselRef = useRef(null);
  const name = "Swetha Vijay";
  const uid = "HiTsFElf0UPuMgtHMARKjuFnXmY2";
  const email = "swetha.vijay@alcove.com";
  const sections = [
    "Communication Skills",
    // "Managerial Skills",
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
  const [ranks, setRanks] = useState(["1", "2", "3", "4", "5"]);
  const [scores, setScores] = useState({});
  const [slides, setSlides] = useState([]);

  const nextInner = () => {
    console.log("inner", innerCarouselRef);
    innerCarouselRef.current.next();
  };

  const nextOuter = () => {
    outerCarouselRef.current.next();
  };

  const redirectToLogin = () => {
    console.log("testttt");
    outerCarouselRef.current.next();
    setTimeout(() => {
      window.location.href = "/";
    }, 5000);
  };

  const backIn = () => {
    outerCarouselRef.current.prev();
  };

  const progressPercent = (section, question) => {
    let secLength = []
    let total = sections.reduce((acc, sec) => {
      secLength.push(acc)
      return acc + questions[sec].length
    }, 0)
    let percentage = (secLength[sections.indexOf(section)] + question) * 100 / total;
    console.log(secLength, total, percentage);
  }

  console.log(outerCarouselRef, progressPercent("Technical Skills", 1));

  return (
    <div>
      <Carousel
        ref={outerCarouselRef}
        dots={false}
        style={{
          width: "100%",
          height: "100vh",
          backgroundColor: "#f8f8f8",
        }}
      >
        <div>
          <div className="surveyCarousel">
            <Card className="surveyCard">
              <Title
                nextPage={nextOuter}
                titleType={"startPage"}
                backIn={backIn}
              />
            </Card>
          </div>
        </div>
        {sections.map((section) => (
          <Section
            section={section}
            nextOuter={nextOuter}
            questions={questions[section]}
            ranks={ranks}
            backIn={backIn}
          />
        ))}
        <div>
          <div className="surveyCarousel">
            <Card className="surveyCard">
              <Title
                nextPage={nextOuter}
                titleType={"Preview"}
                redirectToLogin={redirectToLogin}
                backIn={backIn}
              />
            </Card>
          </div>
        </div>

        <div>
          <div className="surveyCarousel">
            <Card className="surveyCard">
              <Title
                nextPage={nextOuter}
                titleType={"thankyou"}
                backIn={backIn}
              />
            </Card>
          </div>
        </div>
      </Carousel>
    </div>
  );
}

export default Survey;
