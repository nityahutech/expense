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
        background: {
            alignment: 'center',
            text: 'Humantech Solutions India Private Limited',
            style: 'header',
            fontSize: 16,
            bold: true,
            margin: [0, 0, 0, 10],
        },

        // function(page) {
        //     if (page !== 0) {
        //         return [


        //         ];
        //     }
        // },

        footer: function (currentPage, pageCount) { return currentPage.toString() + ' of ' + pageCount; },
        header: function (currentPage,) {
            // you can apply any logic and return any valid pdfmake element

            return [
                { text: currentAppraisal.empId, alignment: (currentPage) ? 'left' : 'right' },

            ]
        },
        watermark: { text: 'Hutech', color: 'blue', opacity: 0.1, bold: true, italics: false },


        content: [





            // {

            //     image: 'data:image/png;base64,...encodedContent...'
            // },



            {
                style: 'tableExample',
                table: {
                    widths: ['20%', '20%', '20%', '20%', '20%',],
                    margin: [0, 10, 0, 10],

                    body: [
                        ['Employee Name ', 'Employee ID ', 'Designation ', 'Reporting Manager ', 'Appraisal Month ',],
                        [{ text: currentAppraisal.fname, italics: true, color: 'gray' }, { text: currentAppraisal.empId, italics: true, color: 'gray' }, { text: currentAppraisal.designation, italics: true, color: 'gray' }, { text: currentAppraisal.repManager, italics: true, color: 'gray' }, { text: currentAppraisal.quarter, italics: true, color: 'gray' }]
                    ]
                }
            },

            { text: 'Rating :-', style: 'subheader', margin: [0, 20, 0, 8] },

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
                                text: (parseInt(currentAppraisal.empProjectActivitiesRating, 10) + parseInt(currentAppraisal.mgrProjectActivitiesRating, 10)) / 2,
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
            },


        ],

    };


    // for (let i = 0; i < currentAppraisal.projectList.length; i++) {
    //     let currentProject = currentAppraisal.projectList[i]
    docDefinition.content.push(


        { text: 'Projects :', style: 'subheader', margin: [0, 10, 0, 10] },
        {
            style: 'tableExample',

            table: {
                heights: 10,
                border: [true, false, false, false],
                widths: [150, '*',],
                margin: [0, 10, 0, 0],
                body: [
                    // ['Project Name :', currentProject.projectName],


                ]
            }
        },


    )
    docDefinition.content.push(

        {
            style: 'tableExample',
            table: {
                heights: 100,
                widths: [150, '*',],
                margin: [0, 10, 0, 0],
                body: [
                    // ['Project Description :', currentProject.projectDetail],


                ]
            }
        },


    )

    // }

    docDefinition.content.push(


        { text: 'Employee Comments:-', style: 'subheader', margin: [0, 10, 0, 10] },
        {
            style: 'tableExample',
            table: {
                // heights: function (row) {
                //     let h = row * 25;
                //     return h
                // },
                heights: 'auto',

                widths: [150, '*',],
                margin: [0, 10, 0, 0],
                body: [
                    ['Organizational Activities:', currentAppraisal.empOrganizationalCheckBox],
                    [' Description:', currentAppraisal.organizationalActivitiesDetail],
                    ['Personal Growth Activities :', currentAppraisal.empPersonalCheckBox],
                    [' Description:', currentAppraisal.personalGrowthDetail],

                ]
            }
        },




        { text: 'Manager FeedBack :-', style: 'subheader', pageBreak: 'before', margin: [0, 10, 0, 10] },
        {
            style: 'tableExample',
            table: {
                heights: 100,
                widths: [150, '*',],
                margin: [0, 10, 0, 0],
                body: [
                    ['Manager Comments :', currentAppraisal.managerComment],


                ]
            }
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



        </>
    );
};

export default HalfyearGoalPdf;
