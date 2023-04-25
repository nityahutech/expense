import React, { useState, useEffect } from "react";
import { Tabs, Col, Input } from "antd";
import "./halfYearGoal.css";
import CreatehalfYearGoal from "./createhalfYearGoal";
import HalfYearGoalTable from "./halfYearGoalTable";
import ConfigureContext from "../../contexts/ConfigureContext";
import AppraisalContext from "../../contexts/AppraisalContext";
import EmpInfoContext from "../../contexts/EmpInfoContext";

const HalfYearGoalHome = (props) => {
    console.log("pppppppppp", props);
    const page = "appraisalPage";
    const isHr = props.roleView == "admin";
    console.log(props, isHr);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const isMgr = JSON.parse(sessionStorage.getItem("isMgr"));
    const [employeeRecord, setEmployeeRecord] = useState();
    const currentUser = JSON.parse(sessionStorage.getItem("user"));
    const [appraisalList, setAppraisalList] = useState([]);

    useEffect(() => {
        getConfigurations();
    }, [props.roleView]);

    const getConfigurations = async () => {
        let data = await ConfigureContext.getConfigurations(page);
        console.log(data, "datass");
    };
    console.log("props.roleView::: ", props.roleView);

    useEffect(() => {
        getAppraisalList();
    }, [props.roleView]);

    const getAppraisalList = async () => {
        let allData = [];
        let empRecord = await EmpInfoContext.getEduDetails(currentUser.uid);

        setEmployeeRecord(empRecord);
        if (props.roleView === "admin") {
            allData = await AppraisalContext.getAllMidYearAppraisal();
        } else if (props.roleView === "emp") {
            allData = await AppraisalContext.getUserMidYearAppraisal(empRecord.empId);
        } else if (props.roleView === "mgr") {
            allData = await AppraisalContext.getManagerMidYearAppraisal(
                empRecord.fname + " " + empRecord.lname
            );
        }

        allData.docs.map((doc) => {
            let d = allData.docs.map((doc) => {
                return {
                    ...doc.data(),
                    id: doc.id,
                };
            });
            console.log("appraisalLIST3", d);
            setAppraisalList(d);
        });
    };


    return (
        <>
            <Tabs className="appraisal-tab" defaultActiveKey="1">
                <>
                    {props.roleView === "admin" ? (
                        <Tabs.TabPane tab="Create Appraisal" key="1">
                            <>

                                <CreatehalfYearGoal
                                    getData={getAppraisalList}
                                    appraisalList={appraisalList}
                                />
                                <HalfYearGoalTable
                                    reload={!isModalOpen}
                                    roleView={props.roleView}
                                    listType="hr"
                                    title="Appraisal Created by Hr"
                                    appraisalList={appraisalList}
                                    getData={getAppraisalList}
                                />
                            </>
                        </Tabs.TabPane>
                    ) : (
                        <Tabs.TabPane tab="My Appraisal" key="2">
                            <HalfYearGoalTable
                                roleView={props.roleView}
                                listType="emp"
                                title="My Apparisal"
                                appraisalList={appraisalList}
                            />
                        </Tabs.TabPane>
                    )}
                    {isMgr && props.roleView === "emp" ? (
                        <Tabs.TabPane tab="Team Approval (Manager)" key="4">
                            <HalfYearGoalTable
                                listType="mgr"
                                roleView={props.roleView}
                                title="Appraisal Pending For Review (Manager)"
                                appraisalList={appraisalList}
                            />
                        </Tabs.TabPane>
                    ) : null}
                </>
            </Tabs>
        </>
    );
};

export default HalfYearGoalHome;
