import { Button, Card, Carousel, Tooltip } from "antd";
import { ArrowRightOutlined, RightOutlined } from "@ant-design/icons";
import React, { useRef, useState } from "react";
import backgroundImage from "../../images/backgroundImage.jpg";
import "../Feedback/FeedBack.css";
import Questions from "./Questions";
import Title from "./Title";
// import { color } from "html2canvas/dist/types/css/types/color";

function Section(props) {
  console.log("propssss", props);
  const innerCarouselRef = useRef(null);

  const nextInner = () => {
    innerCarouselRef.current.next();
  };

  const backInner = () => {
    innerCarouselRef.current.prev();
  };

  return (
    // <Carousel
    //     ref={outerCarouselRef}
    //     dots={false}
    //     style={{
    //     // margin: "auto",
    //     display: "flex",
    //     alignItems: "center",
    //     width: "100%",
    //     height: "100vh",
    //     backgroundColor: "#f8f8f8",
    //     }}
    // >
    //     <div className="surveyCarousel">
    //         <Card className="surveyCard">
    //             <Title nextPage={nextOuter} titleType={"startPage"} />
    //         </Card>
    //     </div>
    //     {sections.map(section => {
    // return (
    <Carousel
      ref={innerCarouselRef}
      dots={false}
      // dotPosition="left"
      style={{
        // margin: "auto",
        display: "flex",
        alignItems: "center",
        width: "100%",
        height: "100vh",
        backgroundColor: "#f8f8f8",
      }}
    >
      <div>
      <div className="surveyCarousel">
        <Card className="surveyCard">
          <Title nextPage={nextInner} titleType={props.section} />
        </Card>
      </div>
      </div>
      <div>
      <div className="surveyCarousel">
        <Card className="surveyCard">
          <Questions
            nextPage={props.nextOuter}
            questionList={props.questions}
            section={props.section}
            ranks={props.ranks}
            next={nextInner}
          />
        </Card>
      </div>

      </div>
      <div>
      <div className="surveyCarousel">
        <Card className="commentCard">
          <Title
            nextPage={props.nextOuter}
            titleType={props.section + " " + "Comments"}
            text={"If any further comments, please enter below:"}
            length={props.section.length}
          />
        </Card>
      </div>
      </div>
    </Carousel>
    //         )
    //     })}
    // </Carousel>
  );
}

export default Section;
