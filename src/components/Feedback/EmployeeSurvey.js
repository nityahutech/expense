import { Button, Card, Carousel, Tooltip } from "antd";
import { ArrowRightOutlined, RightOutlined } from "@ant-design/icons";
import React, { useRef, useState } from "react";
import backgroundImage from "../../images/backgroundImage.jpg";
import "../Feedback/FeedBack.css";
import Questions from "./Questions";
import Title from "./Title";
import Survey from "./Survey";
// import { color } from "html2canvas/dist/types/css/types/color";

function EmployeeSurvey() {
  const carouselRef = useRef(null);
  const name = "";
  const uid = "";
  const email = "";
  const sections = ["Communication Skills", "Technical Skills"];

  // const questions = {};
  const ranks = ["1", "2", "3", "4", "5"];
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentRanking, setCurrentRanking] = useState(null);
  const questions = [
    {
      text: "How satisfied are you with our service?",
      options: [
        { label: "1", value: 1, toolTipText: "Poor" },
        { label: "2", value: 2, toolTipText: "Ok" },
        { label: "3", value: 3, toolTipText: "Good" },
        { label: "4", value: 4, toolTipText: "Great" },
        { label: "5", value: 5, toolTipText: "Excellent" },
      ],
    },
    {
      text: "How likely are you to recommend us to a friend?",
      options: [
        { label: "1", value: 1, toolTipText: "Poor" },
        { label: "2", value: 2, toolTipText: "Ok" },
        { label: "3", value: 3, toolTipText: "Good" },
        { label: "4", value: 4, toolTipText: "Great" },
        { label: "5", value: 5, toolTipText: "Excellent" },
      ],
    },

    {
      text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus ?",
      options: [
        { label: "1", value: 1, toolTipText: "Poor" },
        { label: "2", value: 2, toolTipText: "Ok" },
        { label: "3", value: 3, toolTipText: "Good" },
        { label: "4", value: 4, toolTipText: "Great" },
        { label: "5", value: 5, toolTipText: "Excellent" },
      ],
    },
    {
      text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa ?",

      options: [
        { label: "1", value: 1, toolTipText: "Poor" },
        { label: "2", value: 2, toolTipText: "Ok" },
        { label: "3", value: 3, toolTipText: "Good" },
        { label: "4", value: 4, toolTipText: "Great" },
        { label: "5", value: 5, toolTipText: "Excellent" },
      ],
    },
    // Add more questions here
  ];

  const titleType = "startPage";
  const titleType2 = "thankyou";

  const handleRankingClick = (value) => {
    setCurrentRanking(value);
    setCurrentQuestion(currentQuestion + 1);
    if (currentQuestion === questions.length - 1) {
      setCurrentQuestion(currentQuestion);
    }
  };

  const resetFeedback = () => {
    setCurrentQuestion(0);
    setCurrentRanking(null);
  };

  const handleNextClick = () => {
    carouselRef.current.next();
    setCurrentQuestion(currentQuestion + 1);
    setCurrentRanking(null);

    if (currentQuestion + 1 === questions.length) {
      resetFeedback();
    }
  };

  // const handleRankingTechnical = (value) => {
  //   setCurrentRanking(value);
  //   setCurrentQuestion(currentQuestion + 1);
  //   if (currentQuestion === questions.length - 1) {
  //     setCurrentQuestion(currentQuestion);
  //   }
  // };

  // const handleNextClick = () => {
  //   setCurrentQuestion(currentQuestion + 1);
  //   setCurrentRanking(null);
  // };

  const onStart = () => {
    carouselRef.current.next();
  };

  return (
    <div
      style={{
        minHeight: "120vh",
      }}
    >
      <Carousel
        ref={carouselRef}
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
            <Title onStart={onStart} titleType={titleType} />
          </Card>
        </div>
        <div>
          <Survey />
        </div>
        {/* {sections.map((section, i) => (
          <div key={`simple-${i}`}>
            <div className="surveyCarousel">
              <Card className="surveyCard">
                <Title type={section} onStart={onStart} />
              </Card>
            </div>
            {/* {questions.map((que, idx) => (
              <div className="surveyCarousel">
                <Card className="surveyCard">
                  <Questions
                    key={`object-${idx}`}
                    questions={que}
                    handleRankingClick={handleRankingClick}
                    currentQuestion={currentQuestion}
                    currentRanking={currentRanking}
                  />
                </Card>
              </div>
            ))} */}

        {/* {questions.map((que, idx) => {
              console.log(que, idx);
              return (
                <div className="surveyCarousel">
                  <Card className="surveyCard">
                    <h1>hi</h1>
                    <Questions
                      key={idx}
                      question={que}
                      // handleRankingClick={handleRankingClick}
                      // currentQuestion={currentQuestion}
                      // currentRanking={currentRanking}
                      number={idx + 1}
                    />
                  </Card>
                </div>
              );
            })} */}
        {/* </div> */}
        {/* ))} */}

        {/* <div className="surveyCarousel">
          <Card className="surveyCard">
            <div>
              <h1
                style={{
                  marginTop: "2rem",
                  fontWeight: "600",
                  color: "#594b4b",
                }}
              >
                Commmunication Skills
              </h1>

              <Button className="skillButton" onClick={onStart}>
                Continue <ArrowRightOutlined />
              </Button>
            </div>
          </Card>
        </div>
        <div className="surveyCarousel">
          <Card className="surveyCard1">
            <header
              style={{
                border: "1px solid rgb(37 153 199)",
                height: "5rem ",
                backgroundImage:
                  "linear-gradient(to right, rgb(13 22 215), rgb(37 153 199))",
                textAlign: "center",
              }}
            >
              <h2 style={{ color: "#ffffff", marginTop: "12px" }}>
                Communication Skills
              </h2>
            </header>
            <Questions
              handleRankingClick={handleRankingClick}
              currentQuestion={currentQuestion}
              currentRanking={currentRanking}
              questions={questions}
              sectionNumber={currentQuestion}
            />
            {currentQuestion === questions.length - 1 ? (
              <Button className="nextButton" onClick={handleNextClick}>
                Next <ArrowRightOutlined />
              </Button>
            ) : null}
          </Card>
        </div>
        <div className="surveyCarousel">
          <Card className="surveyCard">
            <div>
              <h1
                style={{
                  marginTop: "2rem",
                  fontWeight: "600",
                  color: "#594b4b",
                }}
              >
                Technical Skills
              </h1>

              <Button className="skillButton" onClick={onStart}>
                Continue <ArrowRightOutlined />
              </Button>
            </div>
          </Card>
        </div>
        <div className="surveyCarousel">
          <Card className="surveyCard1">
            <header
              style={{
                border: "1px solid rgb(37 153 199)",
                height: "5rem ",
                backgroundImage:
                  "linear-gradient(to right, rgb(13 22 215), rgb(37 153 199))",
                textAlign: "center",
              }}
            >
              <h2 style={{ color: "#ffffff", marginTop: "21px" }}>
                Technical Skills
              </h2>
            </header>
            <Questions
              handleRankingClick={handleRankingClick}
              // handleRankingTechnical={handleRankingTechnical}
              currentQuestion={currentQuestion}
              currentRanking={currentRanking}
              questions={questions}
              sectionNumber={currentQuestion}
            />
            {currentQuestion === questions.length - 1 ? (
              <Button className="nextButton" onClick={onStart}>
                Submit <ArrowRightOutlined />
              </Button>
            ) : null}
          </Card>
        </div>
        <div className="surveyCarousel">
          <Card
            className="surveyCard"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "4rem",
            }}
          >
            <Title onStart={onStart} titleType={titleType2} />
          </Card>
        </div> */}
      </Carousel>
    </div>
  );
}

export default EmployeeSurvey;
