import { Button, Card, Carousel, Tooltip } from "antd";
import { ArrowRightOutlined, RightOutlined } from "@ant-design/icons";
import React, { useRef, useState } from "react";
import backgroundImage from "../../images/backgroundImage.jpg";
import "../Feedback/FeedBack.css";

function EmployeeSurvey() {
  const [questionDetails, setQuestionDetails] = useState([
    {
      id: 1,
      label: "Question 1",
      questionText:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus ?",
    },
    {
      id: 2,
      label: "Question 2",
      questionText:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus ?",
    },
    {
      id: 3,
      label: "Question 3",
      questionText:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus ?",
    },
    {
      id: 4,
      label: "Question 4",
      questionText:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus ?",
    },
  ]);
  const carouselRef = useRef(null);

  const onStart = () => {
    carouselRef.current.next();
  };

  return (
    // <div
    //   style={{
    //     display: "flex",
    //     justifyContent: "center",
    //     minHeight: "120vh",
    //   }}
    // >
    <Carousel style={{ minHeight: "100vh" }} ref={carouselRef} dots={false}>
      <div>
        <Card
          style={{
            marginTop: "94px",
            width: "825px",
            height: "376px",
            position: "relative",
            left: "20rem",
            backgroundImage: `url(${backgroundImage})`,
          }}
        >
          <span
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <h1 style={{ fontSize: "50px" }}>360</h1>
            <div
              style={{
                marginLeft: "10px",
                display: "flex",
                flexDirection: "column",
                marginTop: "19px",
                fontWeight: "bold",
                letterSpacing: "2px",
              }}
            >
              <span>MANAGER</span>
              <span>REVIEW</span>
            </div>
          </span>
          <p
            style={{
              fontSize: "20px",
              fontWeight: "600",
              marginLeft: "25px",
              textAlign: "center",
            }}
          >
            This 360° feedback assessment is designed to help managers
            understand their top strengths and prioritize any areas to improve.
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              style={{
                marginTop: "50px",
                borderRadius: "17px",
                width: "200px",
                backgroundImage:
                  "linear-gradient(to right, rgb(13 15 215), rgb(37 154 199))",
                color: "#ffffff",
                border: "none",
                height: "40px",
                fontSize: "20px",
              }}
              onClick={onStart}
            >
              Start Survey
              <RightOutlined />
            </Button>
          </div>
        </Card>
      </div>
      <div>
        <Card
          style={{
            marginTop: "94px",
            width: "825px",
            height: "370px",
            position: "relative",
            left: "20rem",
            backgroundImage: `url(${backgroundImage})`,
          }}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h1 style={{ marginTop: "4rem", fontWeight: "600" }}>
              Communication Skills
            </h1>

            <Button
              style={{
                marginTop: "18rem",
                marginLeft: "17rem",
                borderRadius: "17px",
                width: "200px",
                backgroundImage:
                  "linear-gradient(to right, rgb(13 22 215), rgb(37 153 199))",
                color: "#ffffff",
                border: "none",
                height: "40px",
                fontSize: "20px",
              }}
              onClick={onStart}
            >
              Continue <ArrowRightOutlined />
            </Button>
            {/* <Button
              style={{
                marginTop: "50px",
                borderRadius: "17px",
                width: "200px",
                backgroundImage:
                  "linear-gradient(to right, rgb(13 15 215), rgb(37 154 199))",
                color: "#ffffff",
                border: "none",
                height: "40px",
                fontSize: "20px",
              }}
              onClick={onStart}
            >
              Technical Skills
            </Button> */}
          </div>
        </Card>
      </div>
      <div>
        <Card
          className="questionTag"
          style={{
            marginTop: "94px",
            width: "825px",
            height: "398px",
            position: "relative",
            left: "20rem",
            backgroundImage: `url(${backgroundImage})`,
          }}
        >
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
          <div className="questionsScroll">
            {questionDetails.map((title) => (
              <div div key={title.id}>
                <div style={{ margin: "35px", fontSize: "21px" }}>
                  <p>{title?.label}</p>
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
                      }}
                      // onMouseLeave={handleHover}
                    >
                      1
                    </Button>
                  </Tooltip>

                  <Tooltip
                    title="Ok"
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
                      }}
                    >
                      5
                    </Button>
                  </Tooltip>
                </div>
              </div>
            ))}
            <Button
              style={{
                marginLeft: "36rem",
                marginTop: "1rem",
                borderRadius: "17px",
                width: "200px",
                backgroundImage:
                  "linear-gradient(to right, rgb(13 22 215), rgb(37 153 199))",
                color: "#ffffff",
                border: "none",
                height: "40px",
                fontSize: "20px",
              }}
              onClick={onStart}
            >
              Next <ArrowRightOutlined />
            </Button>
          </div>
        </Card>
      </div>
      <div>
        <Card
          style={{
            marginTop: "94px",
            width: "825px",
            height: "370px",
            position: "relative",
            left: "20rem",
            backgroundImage: `url(${backgroundImage})`,
          }}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h1 style={{ marginTop: "4rem", fontWeight: "600" }}>
              Technical Skills
            </h1>

            <Button
              style={{
                marginTop: "18rem",
                marginLeft: "22rem",
                borderRadius: "17px",
                width: "200px",
                backgroundImage:
                  "linear-gradient(to right, rgb(13 22 215), rgb(37 153 199))",
                color: "#ffffff",
                border: "none",
                height: "40px",
                fontSize: "20px",
              }}
              onClick={onStart}
            >
              Continue <ArrowRightOutlined />
            </Button>
          </div>
        </Card>
      </div>
      <div>
        <Card
          className="questionTag"
          style={{
            marginTop: "94px",
            width: "825px",
            height: "398px",
            position: "relative",
            left: "20rem",
            backgroundImage: `url(${backgroundImage})`,
          }}
        >
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
              Technical Skills
            </h2>
          </header>
          <div className="questionsScroll">
            {questionDetails.map((title) => (
              <div div key={title.id}>
                <div style={{ margin: "35px", fontSize: "21px" }}>
                  <p>{title?.label}</p>
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
                      }}
                      // onMouseLeave={handleHover}
                    >
                      1
                    </Button>
                  </Tooltip>

                  <Tooltip
                    title="Ok"
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
                      }}
                    >
                      5
                    </Button>
                  </Tooltip>
                </div>
              </div>
            ))}
            <Button
              style={{
                marginLeft: "36rem",
                marginTop: "1rem",
                borderRadius: "17px",
                width: "200px",
                backgroundImage:
                  "linear-gradient(to right, rgb(13 22 215), rgb(37 153 199))",
                color: "#ffffff",
                border: "none",
                height: "40px",
                fontSize: "20px",
              }}
              onClick={onStart}
            >
              Finish <ArrowRightOutlined />
            </Button>
          </div>
        </Card>
      </div>
    </Carousel>
    // </div>
  );
}

export default EmployeeSurvey;
