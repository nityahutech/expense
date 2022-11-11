import React, { useState, useEffect } from "react";
import "./HalfYearDown.css";
import hutechLogo from "../../images/hutechlogo.png";
import pdfMake from "pdfmake/build/pdfmake";
import { DownloadOutlined } from "@ant-design/icons";
import { Card, Space } from "antd";

const HalfyearGoalPdf = (props) => {
    const [currentAppraisal, setCurrentAppraisal] = useState(props.appraisal);
    console.log('currentAppraisal', currentAppraisal)
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
                    widths: ['25%', '25%', '25%', '25%',],
                    heights: [10, 10, 10, 10],
                    body: [
                        [
                            {
                                text: 'Employee Name :',
                                // colSpan: 3,
                                bold: true,
                                fontSize: 9
                            },
                            {
                                text: currentAppraisal.fname,
                                fontSize: 9,
                                bold: true,
                            },
                        ],
                        [
                            {
                                text: 'Employee ID :',
                                // colSpan: 3,
                                bold: true,
                                fontSize: 9
                            },

                            {
                                text: currentAppraisal.empId,
                                fontSize: 9,
                                bold: true
                            }
                        ],

                        [

                            {
                                text: 'Designation :',
                                // colSpan: 3,
                                bold: true,
                                fontSize: 9
                            },
                            {
                                text: currentAppraisal.designation,
                                fontSize: 9,
                                bold: true
                            },


                        ],
                        [
                            {
                                text: 'Reporting Manager :',
                                fontSize: 9,
                                bold: true
                            },

                            {
                                text: currentAppraisal.repManager,
                                fontSize: 9,
                                bold: true
                            },


                        ],
                    ],
                }
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
                    heights: [10, 10, 10, 10, 10],
                    headerRows: 1,
                    body: [
                        [
                            {
                                text: 'Description',
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
                                text: currentAppraisal.empProjectActivitiesRating,
                                // colSpan: 3,
                                bold: true,
                                fontSize: 9
                            },
                            {
                                text: currentAppraisal.mgrProjectActivitiesRating,
                                // colSpan: 3,
                                bold: true,
                                fontSize: 9
                            },

                            {
                                text: (currentAppraisal.empProjectActivitiesRating + currentAppraisal.mgrProjectActivitiesRating) / 2,
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
                                text: currentAppraisal.empOrganisationActivitiesRating,
                                // colSpan: 3,
                                bold: true,
                                fontSize: 9
                            },
                            {
                                text: currentAppraisal.mgrOrganisationActivitiesRating,
                                // colSpan: 3,
                                bold: true,
                                fontSize: 9
                            },

                            {
                                text: (currentAppraisal.empOrganisationActivitiesRating + currentAppraisal.mgrOrganisationActivitiesRating) / 2,
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
                                text: currentAppraisal.empPersonalGrowthRating,
                                // colSpan: 3,
                                bold: true,
                                fontSize: 9
                            },
                            {
                                text: currentAppraisal.mgrPersonalGrowthRating,
                                // colSpan: 3,
                                bold: true,
                                fontSize: 9
                            },

                            {
                                text: (currentAppraisal.empPersonalGrowthRating + currentAppraisal.mgrPersonalGrowthRating) / 2,
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
                                text: (currentAppraisal.empProjectActivitiesRating + currentAppraisal.empOrganisationActivitiesRating + currentAppraisal.empPersonalGrowthRating) / 3,
                                // colSpan: 3,
                                bold: true,
                                fontSize: 9
                            },
                            {
                                text: (currentAppraisal.mgrProjectActivitiesRating + currentAppraisal.mgrOrganisationActivitiesRating + currentAppraisal.mgrPersonalGrowthRating) / 3,
                                // colSpan: 3,
                                bold: true,
                                fontSize: 9
                            },

                            {
                                text: (currentAppraisal.empProjectActivitiesRating + currentAppraisal.empOrganisationActivitiesRating + currentAppraisal.empPersonalGrowthRating + currentAppraisal.mgrProjectActivitiesRating + currentAppraisal.mgrOrganisationActivitiesRating + currentAppraisal.mgrPersonalGrowthRating) / 6,
                                fontSize: 9,
                                bold: true
                            }
                        ],

                    ]
                }
            }
        ]
    };

    for (let i = 0; i < currentAppraisal.projectList.length; i++) {
        let currentProject = currentAppraisal.projectList[i]
        docDefinition.content.push(
            {
                text: 'Project Name : ',
                fontSize: 12,
                bold: true
            },
            {
                text: currentProject.projectName,
                fontSize: 9,
                bold: true
            }

        )
        docDefinition.content.push(
            {
                text: 'Project Description :',
                fontSize: 12,
                bold: true
            },
            {
                text: currentProject.projectDetail,
                fontSize: 9,
                bold: true
            }

        )

    }

    docDefinition.content.push(
        {
            text: 'Organizational Activities :',
            fontSize: 12,
            bold: true
        },
        {
            text: currentAppraisal.organizationalActivitiesDetail,
            fontSize: 9,
            bold: true
        },
        {
            text: 'Personal Growth :',
            fontSize: 12,
            bold: true
        },
        {
            text: currentAppraisal.personalGrowthDetail,
            fontSize: 9,
            bold: true
        },
        {
            text: 'Manager Comments',
            fontSize: 12,
            bold: true
        },
        {
            text: currentAppraisal.managerComment,
            fontSize: 9,
            bold: true
        },


    )







    return (
        <>
            <div
              className="date"
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <DownloadOutlined
                onClick={() => pdfMake.createPdf(docDefinition).download()}
              ></DownloadOutlined>
            </div>
          </Space>
        </Card>
      </div>
    </>
  );
};

export default HalfyearGoalPdf;
