import React, { useState, useEffect } from "react";
import { Button, Card, Carousel, Tooltip } from "antd";
import "../Feedback/FeedBack.css";

function Questions(props) {
  console.log("props", props);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(props.questionList[0]);
  const [rankNumber, setrankNumber] = useState(props.ranks);
  //   const [questionDetails, setQuestionDetails] = useState([
  //     {
  //       id: 1,
  //       label: "Question 1",
  //       questionText:
  //         "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus ?",
  //     },
  //     {
  //       id: 2,
  //       label: "Question 2",
  //       questionText:
  //         "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus ?",
  //     },
  //     {
  //       id: 3,
  //       label: "Question 3",
  //       questionText:
  //         "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus ?",
  //     },
  //     {
  //       id: 4,
  //       label: "Question 4",
  //       questionText:
  //         "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus ?",
  //     },
  //   ]);

  // useEffect(() => {
  //   setQuestions(props.questions);
  //   setCurrentQuestion(props.currentQuestion);
  // }, [props.questions]);

  const handleRankingClick = () => {
    props.handleRankingClick();
    // props.handleRankingTechnical();
  };
  console.log(props.questionList[props.questionList.length - 1]);

  return (
    <>
      <div className="questionsScroll">
        <h1 style={{ color: "#ffffff" }}>{props.section}</h1>
        <h3>Question {questionNumber + 1}</h3>
        <p style={{ marginTop: "20px" }}>{currentQuestion}</p>
        {rankNumber.map((rank) => (
          <Tooltip title={rank.toolTipText} overlayClassName="toolTipQue">
            <Button
              style={{ marginTop: "20px" }}
              className="question-button"
              key={rank.value}
              onClick={() => {
                if (questionNumber + 1 == props.questionList.length) {
                  // props.nextPage();
                } else {
                  setCurrentQuestion(props.questionList[questionNumber]);
                  setQuestionNumber(questionNumber + 1);
                }
              }}
            >
              {rank.label}
            </Button>
          </Tooltip>
        ))}
        {questionNumber === props.questionList.length - 1 ? (
          <Button onClick={() => props.next()} className="submitButton">
            Submit
          </Button>
        ) : null}
        {/* <p>Question{props.number}</p> */}

        {/* <h2 style={{ color: "#847e79" }}>
          {questions[currentQuestion].number}
        </h2> */}
        {/* <h2 style={{ color: "#ffffff" }}> {questions[currentQuestion].text}</h2>
        <div style={{ marginTop: "20px" }}>
          {questions[currentQuestion].options.map((option) => (
            <Tooltip title={option.toolTipText} overlayClassName="toolTipQue">
              <Button
                className="question-button"
                key={option.value}
                onClick={() => handleRankingClick(option.value)}
              >
                {option.label}
              </Button>
            </Tooltip>
          ))}
        </div>
        {currentQuestion === questions.length - 1 ? (
          <button>Submit</button>
        ) : null} */}
        {/* {questionDetails.map((title) => (
          <div div key={title.id}>
            <div style={{ margin: "35px", fontSize: "21px" }}>
              <p style={{ color: "#615656" }}>{title?.label}</p>
              <p>{title?.questionText}</p>
            </div>
            <div style={{ marginLeft: "35px" }}>
              <Tooltip
                title="Poor"
                placement="top"
                overlayClassName="toolTipQue"
              >
                <Button
                  className="questionButton"
                  style={{
                    width: "80px",
                    display: "inline-block",
                    textAlign: "center",
                    height: "46px",
                    fontSize: "18px",
                    background: "none",
                    borderRadius: "10px 0px 0px 10px",
                    color: "#ffffff",
                    border: "1px solid #bcb2b2",
                    borderRight: "none",
                  }}
                  // onMouseLeave={handleHover}
                >
                  1
                </Button>
              </Tooltip>

              <Tooltip title="Ok" placement="top" overlayClassName="toolTipQue">
                <Button
                  style={{
                    width: "80px",
                    display: "inline-block",
                    textAlign: "center",
                    height: "46px",
                    fontSize: "18px",
                    background: "none",
                    color: "#ffffff",
                    border: "1px solid #bcb2b2",
                    borderRight: "none",
                  }}
                >
                  2
                </Button>
              </Tooltip>
              <Tooltip
                title="Good"
                placement="top"
                overlayClassName="toolTipQue"
              >
                <Button
                  style={{
                    width: "80px",
                    display: "inline-block",
                    textAlign: "center",
                    height: "46px",
                    fontSize: "18px",
                    background: "none",
                    color: "#ffffff",
                    border: "1px solid #bcb2b2",
                    borderRight: "none",
                  }}
                >
                  3
                </Button>
              </Tooltip>
              <Tooltip
                title="Great"
                placement="top"
                overlayClassName="toolTipQue"
              >
                <Button
                  style={{
                    width: "80px",
                    display: "inline-block",
                    textAlign: "center",
                    height: "46px",
                    fontSize: "18px",
                    background: "none",
                    color: "#ffffff",
                    border: "1px solid #bcb2b2",
                    borderRight: "none",
                  }}
                >
                  4
                </Button>
              </Tooltip>
              <Tooltip
                title="Excellent"
                placement="top"
                overlayClassName="toolTipQue"
              >
                <Button
                  style={{
                    width: "80px",
                    display: "inline-block",
                    textAlign: "center",
                    height: "46px",
                    fontSize: "18px",
                    background: "none",
                    borderRadius: "0px 10px 10px 0px",
                    color: "#ffffff",
                    border: "1px solid #bcb2b2",
                  }}
                >
                  5
                </Button>
              </Tooltip>
            </div>
          </div>
        ))} */}
      </div>
    </>
  );
}

export default Questions;
