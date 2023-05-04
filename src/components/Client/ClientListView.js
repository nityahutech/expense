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
                                            height: "190px",
                                            borderRadius: "50%",
                                            background: "#dddddd",
                                        }}
                                    />
                                ) : (
                                    <div
                                        // src={showRecord.profilePic}
                                        style={{
                                            border: "1px solid black",
                                            width: "50%",
                                            height: "190px",
                                            borderRadius: "50%",
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
                                <div style={{ display: 'flex' }} >
                                    <div style={{ width: '50%' }} >Company Name:</div>{" "}
                                    <div style={{ width: '50%' }} >{showRecord.regCompName ? showRecord.regCompName : "-"}</div>
                                </div>
                                <div style={{ display: 'flex' }}>
                                    <div style={{ width: '50%' }}>Email:</div>{" "}
                                    <div style={{ width: '50%' }}>{showRecord.domain ? showRecord.domain : "-"}</div>
                                </div>
                                <div style={{ display: 'flex' }}>
                                    <div style={{ width: '50%' }}>Phone:</div>{" "}
                                    <div style={{ width: '50%' }}>{showRecord.phone ? showRecord.phone : "-"}</div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="flip-card-back">
                        <div style={{}}>
                            <h2>Contact Details</h2>
                            <div style={{ display: 'flex' }}>
                                <div style={{ width: '50%' }}>Point of Contact:</div>{" "}
                                <div style={{ width: '50%' }}>{showRecord.poc && showRecord.poc ? showRecord.poc : "-"}</div>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <div style={{ width: '50%' }}>Project:</div>{" "}
                                <div style={{ width: '50%' }}>{showRecord.project && showRecord.project ? showRecord.project : "-"}</div>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <div style={{ width: '50%' }}>Address Line 1:</div>{" "}
                                <div style={{ width: '50%' }}>{showRecord.contact && showRecord.contact.addLine1 ? showRecord.contact.addLine1 : "-"}</div>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <div style={{ width: '50%' }}>Address Line 2:</div>{" "}
                                <div style={{ width: '50%' }}>{showRecord.contact && showRecord.contact.addLine2 ? showRecord.contact.addLine2 : "-"}</div>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <div style={{ width: '50%' }}>City:</div>{" "}
                                <div style={{ width: '50%' }}>{showRecord.contact && showRecord.contact.city ? showRecord.contact.city : "-"}</div>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <div style={{ width: '50%' }}>State:</div>{" "}
                                <div style={{ width: '50%' }}>{showRecord.contact && showRecord.contact.state ? showRecord.contact.state : "-"}</div>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <div style={{ width: '50%' }}>Country:</div>{" "}
                                <div style={{ width: '50%' }}>{showRecord.contact && showRecord.contact.country ? showRecord.contact.country : "-"}</div>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <div style={{ width: '50%' }}>Pincode:</div>{" "}
                                <div style={{ width: '50%' }}>{showRecord.contact && showRecord.contact.pincode ? showRecord.contact.pincode : "-"}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}

export default ClientListview;
