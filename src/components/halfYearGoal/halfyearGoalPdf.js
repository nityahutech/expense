import React, { useState, useEffect } from "react";
import "./HalfYearDown.css";
import hutechLogo from "../../images/hutechlogo.png";
import pdfMake from "pdfmake/build/pdfmake";
import {


    DownloadOutlined
} from "@ant-design/icons";


const HalfyearGoalPdf = (props) => {
    const [currentAppraisal, setCurrentAppraisal] = useState(props.appraisal);
    const docDefinition = {
        content: [
            {
                alignment: 'center',
                text: 'Humantech Solutions India Private Limited',
                style: 'header',
                fontSize: 23,
                bold: true,
                margin: [0, 10],
            },
            {
                alignment: 'center',
                text: 'Appraisal For Month Oct - 2022',
                style: 'header',
                fontSize: 23,
                bold: true,
                margin: [0, 10],
            },
            {
                margin: [0, 0, 0, 10],
                layout: {
                    fillColor: function (rowIndex, node, columnIndex) {
                        return (rowIndex % 2 === 0) ? '#ebebeb' : '#f5f5f5';
                    }
                },
                table: {
                    widths: ['100%'],
                    heights: [10, 10],
                    body: [
                        [
                            {
                                text: 'Employee Name :',
                                fontSize: 9,
                                bold: true,
                            }
                        ],
                        [
                            {
                                text: 'Employee ID',
                                fontSize: 9,
                                bold: true
                            }
                        ],
                        [
                            {
                                text: 'Designation',
                                fontSize: 9,
                                bold: true
                            }
                        ],
                        [
                            {
                                text: 'Manager:',
                                fontSize: 9,
                                bold: true
                            }
                        ],
                    ],
                }
            },
            {
                text: 'Project Name : ',
                fontSize: 12,
                bold: true
            },
            {
                text: 'gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',
                fontSize: 9,
                bold: true
            },
            {
                text: 'Project Description :',
                fontSize: 12,
                bold: true
            },
            {
                text: 'gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh'

                ,
                
                fontSize: 9,
                bold: true
            },
            {
                text: 'Organizational Activities :',
                fontSize: 12,
                bold: true
            },
            {
                text: 'gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',
                fontSize: 9,
                bold: true
            },
            {
                text: 'Organizational Activities :',
                fontSize: 12,
                bold: true
            },
            {
                text: 'gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',
                fontSize: 9,
                bold: true
            },
            {
                text: 'Manager Comments :',
                fontSize: 12,
                bold: true
            },
            {
                text: 'gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',
                fontSize: 9,
                bold: true
            },




            {
                style: 'tableExample',
                layout: {
                    fillColor: function (rowIndex, node, columnIndex) {
                        return (rowIndex === 0) ? '#c2dec2' : null;
                    }
                },
                table: {
                    widths: ['40%', '20%', '20%', '20%'],
                    heights: [10, 10, 10, 10, 30, 10, 25],
                    headerRows: 1,
                    body: [
                        [
                            {
                                text: '',
                                // colSpan: 3,
                                bold: true,
                                fontSize: 9
                            },
                            {
                                text: 'Self Rating',
                                // colSpan: 3,
                                bold: true,
                                fontSize: 9
                            },
                            {
                                text: 'Manager Rating',
                                // colSpan: 3,
                                bold: true,
                                fontSize: 9
                            },

                            {
                                text: 'Average Rating',
                                fontSize: 9,
                                bold: true
                            }
                        ],
                        [
                            {
                                text: 'Project Related Activities :',
                                // colSpan: 3,
                                bold: true,
                                fontSize: 9
                            },
                            {
                                text: '5',
                                // colSpan: 3,
                                bold: true,
                                fontSize: 9
                            },
                            {
                                text: '5',
                                // colSpan: 3,
                                bold: true,
                                fontSize: 9
                            },

                            {
                                text: '5',
                                fontSize: 9,
                                bold: true
                            }
                        ],
                        [
                            {
                                text: 'Organizational Activities :',
                                // colSpan: 3,
                                bold: true,
                                fontSize: 9
                            },
                            {
                                text: '5',
                                // colSpan: 3,
                                bold: true,
                                fontSize: 9
                            },
                            {
                                text: '5',
                                // colSpan: 3,
                                bold: true,
                                fontSize: 9
                            },

                            {
                                text: '5',
                                fontSize: 9,
                                bold: true
                            }
                        ],
                        [
                            {
                                text: 'Personal Growth :',
                                // colSpan: 3,
                                bold: true,
                                fontSize: 9
                            },
                            {
                                text: '5',
                                // colSpan: 3,
                                bold: true,
                                fontSize: 9
                            },
                            {
                                text: '5',
                                // colSpan: 3,
                                bold: true,
                                fontSize: 9
                            },

                            {
                                text: '5',
                                fontSize: 9,
                                bold: true
                            }
                        ],
                        [
                            {
                                text: 'Total Rating :',
                                // colSpan: 3,
                                bold: true,
                                fontSize: 9
                            },
                            {
                                text: '5',
                                // colSpan: 3,
                                bold: true,
                                fontSize: 9
                            },
                            {
                                text: '5',
                                // colSpan: 3,
                                bold: true,
                                fontSize: 9
                            },

                            {
                                text: '5',
                                fontSize: 9,
                                bold: true
                            }
                        ],





                    ]
                }
            }
        ]
    };



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
                <DownloadOutlined onClick={() => pdfMake.createPdf(docDefinition).download()}>

                </DownloadOutlined>



            </div>

        </>
    );
}

export default HalfyearGoalPdf;
