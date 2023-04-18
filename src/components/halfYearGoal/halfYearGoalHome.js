import React, { useState, useEffect } from "react";
import { Button, Col, Tabs } from "antd";
import { Input, Modal, Row, DatePicker } from "antd";
import "./halfYearGoal.css";
import CreatehalfYearGoal from "./createhalfYearGoal";
import HalfYearGoalTable from "./halfYearGoalTable";
import ConfigureContext from "../../contexts/ConfigureContext";

const HalfYearGoalHome = (props) => {
    const page = "appraisalPage";
    const isHr = props.roleView == "admin";
    console.log(props, isHr);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const isMgr = JSON.parse(sessionStorage.getItem("isMgr"));

    const showModal = () => {
        console.log("hi");
        setIsModalOpen(true);
    };

    const closeCreateAppraisalModal = () => {
        console.log("hiii");
        setIsModalOpen(!isModalOpen);
    };

    useEffect(() => {
        getConfigurations();
    }, [props.roleView]);

    const getConfigurations = async () => {
        let data = await ConfigureContext.getConfigurations(page);
        console.log(data, "datass");
    };
    console.log("props.roleView::: ", props.roleView);

    return (
        <>
            <Tabs className="appraisal-tab" defaultActiveKey="1">
                <>
                    {props.roleView === "admin" ? (
                        <Tabs.TabPane tab="Create Appraisal" key="1">
                            <>
                                <div
                                    className="app-tab"
                                    style={{ width: "100%", marginleft: "10px" }}
                                >
                                    <Row
                                        className="employeeRow"
                                        style={{
                                            marginLeft: "10px",
                                            marginRight: "10px",
                                            flexDirection: "row",
                                            display: "flex",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <Col>
                                            <Input placeholder="Search" />
                                        </Col>
                                        <Button type="primary" onClick={showModal}>
                                            Create Appraisal
                                        </Button>
                                    </Row>
                                </div>

                                <HalfYearGoalTable
                                    reload={!isModalOpen}
                                    roleView={props.roleView}
                                    listType="hr"
                                    title="Appraisal Created by Hr"
                                />
                            </>
                        </Tabs.TabPane>
                    ) : (
                        <Tabs.TabPane tab="My Appraisal" key="2">
                            <HalfYearGoalTable
                                roleView={props.roleView}
                                listType="emp"
                                title="My Apparisal"
                            />
                        </Tabs.TabPane>
                    )}
                    {isMgr && (
                        <Tabs.TabPane tab="Team Approval (Manager)" key="4">
                            {isMgr && (
                                <HalfYearGoalTable
                                    listType="mgr"
                                    roleView={props.roleView}
                                    title="Appraisal Pending For Review (Manager)"
                                />
                            )}
                        </Tabs.TabPane>
                    )}
                </>
            </Tabs>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    // width: '100%',
                    borderRadius: "10px",
                }}
            >
                <Modal
                    className="viewModal"
                    maskClosable={false}
                    title="Employee List"
                    footer={null}
                    visible={isModalOpen}
                    open={isModalOpen}
                    onCancel={closeCreateAppraisalModal}
                    width={600}
                    closeIcon={
                        <div
                            onClick={() => {
                                closeCreateAppraisalModal(false);
                            }}
                            style={{ color: "#ffffff" }}
                        >
                            X
                        </div>
                    }
                >
                    <CreatehalfYearGoal
                        closeCreateAppraisalModal={closeCreateAppraisalModal}
                    />
                </Modal>
            </div>
        </>
    );
};

export default HalfYearGoalHome;
