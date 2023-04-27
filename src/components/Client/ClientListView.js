import React, { useState } from "react";
import "./client.css";

function ClientListview(props) {
    console.log("props", props);
    const showRecord = props.showRecord;
    const [isFlipped, setIsFlipped] = useState(false);

    const flipCard = () => {
        setIsFlipped(!isFlipped);
    };
    return (
        <>
            <div className="container">
                <div
                    className={`flip-card ${isFlipped ? "flipped" : ""}`}
                    onClick={flipCard}
                >
                    <div className="flip-card-front">
                        <div style={{ padding: "10px" }}>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                {showRecord.upload ? (
                                    <img
                                        src={showRecord.upload}
                                        style={{
                                            border: "1px solid black",
                                            width: "50%",
                                            height: "200px",
                                            borderRadius: "50px",
                                            background: "#dddddd",
                                        }}
                                    />
                                ) : (
                                    <div
                                        // src={showRecord.profilePic}
                                        style={{
                                            border: "1px solid black",
                                            width: "50%",
                                            height: "200px",
                                            borderRadius: "50px",
                                            background: "#dddddd",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            color: "black",
                                        }}
                                    >
                                        No image !!{" "}
                                    </div>
                                )}
                            </div>
                            <div style={{ padding: "10px" }}>
                                <h2>Company Details</h2>
                                <p>
                                    <b>Company Name:</b>{" "}
                                    {showRecord.regCompName ? showRecord.regCompName : "-"}
                                </p>
                                <p>
                                    <b>Email:</b> {showRecord.domain ? showRecord.domain : "-"}
                                </p>
                                <p>
                                    <b>Phone:</b> {showRecord.phone ? showRecord.phone : "-"}
                                </p>
                            </div>

                        </div>
                    </div>
                    <div className="flip-card-back">
                        <div style={{}}>
                            <h2>Contact Details</h2>
                            <p>
                                <b>Point of Contact:</b>{" "}
                                {showRecord.poc && showRecord.poc ? showRecord.poc : "-"}
                            </p>
                            <p>
                                <b>Project:</b>{" "}
                                {showRecord.project && showRecord.project
                                    ? showRecord.project
                                    : "-"}
                            </p>
                            <p>
                                <b>Address Line 1:</b>{" "}
                                {showRecord.contact && showRecord.contact.addLine1
                                    ? showRecord.contact.addLine1
                                    : "-"}
                            </p>
                            <p>
                                <b>Address Line 2:</b>{" "}
                                {showRecord.contact && showRecord.contact.addLine2
                                    ? showRecord.contact.addLine2
                                    : "-"}
                            </p>
                            <p>
                                <b>City:</b>{" "}
                                {showRecord.contact && showRecord.contact.city
                                    ? showRecord.contact.city
                                    : "-"}
                            </p>
                            <p>
                                <b>State:</b>{" "}
                                {showRecord.contact && showRecord.contact.state
                                    ? showRecord.contact.state
                                    : "-"}
                            </p>
                            <p>
                                <b>Country:</b>{" "}
                                {showRecord.contact && showRecord.contact.country
                                    ? showRecord.contact.country
                                    : "-"}
                            </p>
                            <p>
                                <b>Pincode:</b>{" "}
                                {showRecord.contact && showRecord.contact.pincode
                                    ? showRecord.contact.pincode
                                    : "-"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ClientListview;
