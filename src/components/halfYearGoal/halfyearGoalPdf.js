import React, { useState, useEffect } from "react";
import { Button, Card, Table } from "antd";
import { DatePicker, Space } from "antd";
import "./HalfYearDown.css";
import { DeleteOutlined } from "@ant-design/icons";
import moment from "moment";

import hutechLogo from "../../images/hutechlogo.png";

function AppraisalPdf() {
    const [month, setMonth] = useState(null);
    // const [year, setYear] = useState(null);
    const [appraisalPdf, setAppraisalPdf] = useState(false);
    const [printContent, setPrintContent] = useState(null);
    useEffect(() => {
        if (month) {
            // alert("ok");
            setAppraisalPdf(true);
        } else {
            // alert("NA");
            setAppraisalPdf(false);
        }
    }, [month]);

    return (
        <>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Card
                    className="card"
                    title="Pay Slip"
                    style={{
                        width: "790px",
                        marginTop: "3px",

                        height: "auto",
                    }}
                >
                    <Space direction="vertical" size={12}>
                        <div
                            className="date"
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                flexDirection: "row",
                            }}
                        >
                            <DatePicker
                                picker="month"
                                className="picker"
                                placeholder="Select MM & YY"
                                bordered={true}
                                format="MM-YYYY"
                                style={{
                                    width: "100%",
                                    background: "#1890ff",
                                    cursor: "pointer",
                                }}
                                allowClear
                                onChange={(_, dateString) => {
                                    setMonth(dateString);
                                }}
                            />
                        </div>
                    </Space>
                    {appraisalPdf ? (
                        <>
                            <Button
                                className="button"
                                style={{
                                    background: "#1890ff",
                                    color: "white",
                                    marginLeft: "40rem",
                                }}
                                type="button"
                            // onClick={() => {
                            //     createPdfFromHtml(printContent);
                            // }}
                            >
                                Download
                            </Button>
                            <div className="mainBorder A4" id="payslip">
                                <div
                                    ref={(el) => {
                                        setPrintContent(el);
                                    }}
                                >
                                    <HalfyearGoalPdf />
                                </div>
                            </div>
                        </>
                    ) : null}
                </Card>
            </div>
        </>
    );
}

function HalfyearGoalPdf() {
    return (
        <>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <div className="sheet">
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            flexDirection: "row",
                        }}
                    >
                        <div></div>
                        <div className="heading">
                            <h1 style={{ fontSize: "14px", textAlign: "center" }}>
                                Humantech Solutions India Private Limited
                            </h1>
                            <h2 style={{ fontSize: "14px", textAlign: "center" }}>
                                Appraisal For Month Oct - 2022
                            </h2>
                        </div>
                        <div>
                            <img
                                src={hutechLogo}
                                style={{
                                    marginRight: "34px",
                                    marginTop: "5px",
                                    width: "100px",
                                }}
                            ></img>
                        </div>
                    </div>
                    <div className="firstSplit">
                        <div className="splitLeft">
                            <table>
                                <tr>
                                    <td
                                        style={{
                                            width: "195px",
                                        }}
                                    >
                                        Employee Name :

                                    </td>
                                    <td
                                        style={{
                                            width: "195px",
                                        }}
                                    >
                                        Jatin
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style={{
                                            width: "195px",
                                        }}
                                    >
                                        Employee ID :

                                    </td>
                                    <td
                                        style={{
                                            width: "195px",
                                        }}
                                    >
                                        HT0002
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style={{
                                            width: "180px",
                                        }}
                                    >
                                        Designation:
                                    </td>
                                    <td
                                        style={{
                                            width: "180px",
                                        }}
                                    >
                                        Software Developer
                                    </td>

                                </tr>

                            </table>
                        </div>

                        <div className="splitRight">
                            <table>
                                <tr>
                                    <td
                                        style={{
                                            width: "180px",
                                        }}
                                    >
                                        Manager:
                                    </td>
                                    <td
                                        style={{
                                            width: "180px",
                                        }}
                                    >
                                        Dhanshri
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style={{
                                            width: "180px",
                                        }}
                                    >
                                        Date of Joining:
                                    </td>
                                    <td
                                        style={{
                                            width: "180px",
                                        }}
                                    >
                                        21/09/2022
                                    </td>
                                </tr>



                            </table>
                        </div>
                    </div>
                    <div className="secondSplit">
                        <div className="splitLeft2">


                            <p
                                style={{
                                    width: "180px",
                                }}
                            >
                                Project Name : dssesdeeeee

                            </p>




                            <p
                                style={{
                                    width: "180px",

                                }}
                            >
                                Project Description :
                            </p>
                            <p>
                                gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg   hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
                            </p>




                        </div>

                    </div>
                    <div className="secondSplit">
                        <div className="splitLeft2">


                            <p
                                style={{
                                    width: "180px",
                                }}
                            >
                                Project Related Activities :

                            </p>
                            <p>
                                gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg   hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
                            </p>






                        </div>


                    </div>
                    <div className="secondSplit">
                        <div className="splitLeft2">

                            <p
                                style={{
                                    width: "180px",
                                }}
                            >
                                Organizational Activities :

                            </p>

                            <p>
                                gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg   hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
                            </p>


                        </div>


                    </div>

                    <div className="secondSplit">
                        <div className="splitLeft2">
                            <table>
                                <tr>
                                    <td
                                        style={{
                                            width: "180px",
                                        }}
                                    >
                                        Personal Growth :

                                    </td>

                                </tr>


                            </table>
                        </div>


                    </div>
                    <div className="thridSplit">
                        <div className="splitthird">
                            <table>
                                <tr>
                                    <td
                                        style={{
                                            width: "400px",
                                        }}
                                    >
                                        Description

                                    </td>

                                </tr>


                            </table>
                        </div>

                        <div className="splitforth">
                            <table>
                                <tr>
                                    <td
                                        style={{
                                            width: "400px",
                                        }}
                                    >
                                        Rating
                                    </td>

                                </tr>




                            </table>
                        </div>

                        <div className="splitforth">
                            <table>
                                <tr>
                                    <td
                                        style={{
                                            width: "400px",
                                        }}
                                    >
                                        Rating
                                    </td>

                                </tr>




                            </table>
                        </div>
                        <div className="splitforth">
                            <table>
                                <tr>
                                    <td
                                        style={{
                                            width: "400px",
                                        }}
                                    >
                                        Average Rating
                                    </td>

                                </tr>




                            </table>
                        </div>
                    </div>
                    <div className="thridSplit">
                        <div className="splitthird">
                            <table>
                                <tr>
                                    <td
                                        style={{
                                            width: "400px",
                                        }}
                                    >
                                        Project Related Activities :

                                    </td>

                                </tr>


                            </table>
                        </div>

                        <div className="splitforth">
                            <table>
                                <tr>

                                    <td
                                        style={{
                                            width: "180px",
                                        }}
                                    >
                                        5
                                    </td>
                                </tr>




                            </table>
                        </div>

                        <div className="splitforth">
                            <table>
                                <tr>

                                    <td
                                        style={{
                                            width: "180px",
                                        }}
                                    >
                                        5
                                    </td>
                                </tr>




                            </table>
                        </div>

                        <div className="splitforth">
                            <table>
                                <tr>

                                    <td
                                        style={{
                                            width: "180px",
                                        }}
                                    >
                                        5
                                    </td>
                                </tr>




                            </table>
                        </div>
                    </div>
                    <div className="thridSplit">
                        <div className="splitthird">
                            <table>
                                <tr>
                                    <td
                                        style={{
                                            width: "400px",
                                        }}
                                    >
                                        Organizational Activities :

                                    </td>

                                </tr>


                            </table>
                        </div>

                        <div className="splitforth">
                            <table>
                                <tr>

                                    <td
                                        style={{
                                            width: "180px",
                                        }}
                                    >
                                        5
                                    </td>
                                </tr>




                            </table>
                        </div>

                        <div className="splitforth">
                            <table>
                                <tr>

                                    <td
                                        style={{
                                            width: "180px",
                                        }}
                                    >
                                        5
                                    </td>
                                </tr>




                            </table>
                        </div>

                        <div className="splitforth">
                            <table>
                                <tr>

                                    <td
                                        style={{
                                            width: "180px",
                                        }}
                                    >
                                        5
                                    </td>
                                </tr>




                            </table>
                        </div>
                    </div>
                    <div className="thridSplit">
                        <div className="splitthird">
                            <table>
                                <tr>
                                    <td
                                        style={{
                                            width: "400px",
                                        }}
                                    >
                                        Personal Growth :

                                    </td>

                                </tr>


                            </table>
                        </div>

                        <div className="splitforth">
                            <table>
                                <tr>

                                    <td
                                        style={{
                                            width: "180px",
                                        }}
                                    >
                                        5
                                    </td>
                                </tr>




                            </table>
                        </div>

                        <div className="splitforth">
                            <table>
                                <tr>

                                    <td
                                        style={{
                                            width: "180px",
                                        }}
                                    >
                                        5
                                    </td>
                                </tr>




                            </table>


                        </div>

                        <div className="splitforth">
                            <table>
                                <tr>

                                    <td
                                        style={{
                                            width: "180px",
                                        }}
                                    >
                                        5
                                    </td>
                                </tr>




                            </table>
                        </div>
                    </div>

                    <div className="thridSplit">
                        <div className="splitthird">
                            <table>
                                <tr>
                                    <td
                                        style={{
                                            width: "400px",
                                        }}
                                    >
                                        Total :

                                    </td>

                                </tr>


                            </table>
                        </div>

                        <div className="splitforth">
                            <table>
                                <tr>

                                    <td
                                        style={{
                                            width: "180px",
                                        }}
                                    >
                                        5
                                    </td>
                                </tr>




                            </table>
                        </div>

                        <div className="splitforth">
                            <table>
                                <tr>

                                    <td
                                        style={{
                                            width: "180px",
                                        }}
                                    >
                                        5
                                    </td>
                                </tr>




                            </table>


                        </div>

                        <div className="splitforth">
                            <table>
                                <tr>

                                    <td
                                        style={{
                                            width: "180px",
                                        }}
                                    >
                                        5
                                    </td>
                                </tr>




                            </table>
                        </div>
                    </div>


                    <div className="secondSplit">
                        <div className="splitLeft2">


                            <p
                                style={{
                                    width: "180px",
                                }}
                            >
                                Manager Growth :

                            </p>
                            <p>
                                gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg   hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
                            </p>

                        </div>


                    </div>

                </div>


            </div>
        </>
    );
}

export default HalfyearGoalPdf;
