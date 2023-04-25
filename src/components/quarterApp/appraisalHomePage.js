import React, { useState, useEffect } from "react";
import { Button, Col, Tabs } from "antd";
import { Input, Modal, Row, DatePicker } from "antd";
import "./appraisal.css";
import CreateApparaisal from "./createApparaisal";
import EmpAppraisalTable from "./empAppraisalTable";
import ConfigureContext from "../../contexts/ConfigureContext";

const AppraisalHr = (props) => {
    const page = "appraisalPage";
    const isHr = props.roleView == "admin";
    console.log(props, isHr);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const isMgr = JSON.parse(sessionStorage.getItem("isMgr"));
    const isLead = JSON.parse(sessionStorage.getItem("isLead"));
    // const isHr = JSON.parse(sessionStorage.getItem("isHr"));
    // const isHr =
    //     role == "admin" ? false : sessionStorage.getItem("isHr") == "true";

    const showModal = () => {
        setIsModalOpen(true);
    };

    const closeCreateAppraisalModal = () => {
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

                                <EmpAppraisalTable
                                    reload={!isModalOpen}
                                    roleView={props.roleView}
                                    listType="hr"
                                    title="Appraisal Created by Hr"
                                />
                            </>
                        </Tabs.TabPane>
                    ) : (
                        <Tabs.TabPane tab="My Appraisal" key="2">
                            <EmpAppraisalTable
                                roleView={props.roleView}
                                listType="emp"
                                title="My Apparisal"
                            />
                        </Tabs.TabPane>
                    )}

                    {isLead && (
                        <Tabs.TabPane tab="Team Approval (Lead)" key="3">
                            {isLead && (
                                <EmpAppraisalTable
                                    listType="lead"
                                    roleView={props.roleView}
                                    title="Appraisal Pending For Review (Lead)"
                                />
                            )}
                        </Tabs.TabPane>
                    )}
                    {isMgr && (
                        <Tabs.TabPane tab="Team Approval (Manager)" key="4">
                            {isMgr && (
                                <EmpAppraisalTable
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
                    // centered
                    title="Employee List"
                    footer={null}
                    visible={isModalOpen}
                    open={isModalOpen}
                    onCancel={closeCreateAppraisalModal}
                    width={800}
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
                    <CreateApparaisal
                        closeCreateAppraisalModal={closeCreateAppraisalModal}
                    />
                </Modal>
            </div>
        </>
    );
};

export default AppraisalHr;
