import { Button, Card } from "antd";
import { useState } from "react";

function Question(props) {
    console.log("propssss", props);
    const [shaded, setShaded] = useState(-1)

    const handleClick = (x) => {
        console.log(x);
        props.nextInner();
    }

    const firstStyle = {
        borderRadius: "5px 0 0 5px"
    }

    const lastStyle = {
        borderRadius: "0 5px 5px 0"
    }

    console.log("shaded", shaded);

    return (
        <div className="surveyCarousel">
            <Card className="surveyCard">
                <h1>{props.section}</h1>
                <h3>Question {props.index + 1}</h3>
                <h3>{props.question}</h3>
                <br />
                <div className="rank-list">
                {props.ranks.map((x, i) => (
                    <Button
                        onMouseEnter={() => setShaded(i)}
                        onMouseLeave={() => setShaded(-1)}
                        className={`rank-button${i < shaded ? " shaded-style" : ""}`}
                        style={
                            i == 0 ? firstStyle
                                : i == props.ranks.length-1 ? lastStyle
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

export default Question