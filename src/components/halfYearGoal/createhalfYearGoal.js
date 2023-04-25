import React, { useState, useEffect } from "react";
import { Button, Col, DatePicker, notification, Modal, Form } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Input, Row, Layout, Radio, Table } from "antd";
import { getUsers } from "../../contexts/CreateContext";
import AppraisalContext from "../../contexts/AppraisalContext";
import EmpInfoContext from "../../contexts/EmpInfoContext";
import moment from "moment";


const CreatehalfYearGoal = (props) => {
    console.log('sssssffffffffff', props,)
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [filterEmployees, setFilterEmployees] = useState([]);
    const [allEmployees, setAllEmployees] = useState([]);
    const [selectionType, setSelectionType] = useState("");
    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const [selectedQuarter, setSelectedQuarter] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const currentUser = JSON.parse(sessionStorage.getItem("user"));
    const [form] = Form.useForm();


    const columns = [
        {
            title: "Employee Code",
            dataIndex: "empId",
            key: "empId",
            align: "left",
            width: 60,
        },
        {
            title: "Name",
            dataIndex: "fname",
            key: "fname",
            align: "left",
            width: 60,
        },
    ];

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedEmployees(selectedRows);
            console.log(
                `selectedRowKeys: ${selectedRowKeys}`,
                "selectedRows: ",
                selectedRows
            );
        },
    };
    const closeCreateAppraisalModal = () => {
        console.log("hiii");
        setIsModalOpen(!isModalOpen);
    };



    //--------------onFinish------------------------
    const handleCreateAppraisal = () => {
        console.log("isAppraisalPresent", props.appraisalList);
        const appraisals = [];

        for (let i = 0; i < selectedEmployees.length; i++) {
            const currentEmp = selectedEmployees[i];
            const isAppraisalPresent = props.appraisalList.find(
                (appraisal) => appraisal.empId === currentEmp.empId && appraisal.quarter === selectedQuarter
            );

            if (isAppraisalPresent) {
                showNotification("error", "Error", `Appraisal already exists for ${currentEmp.fname}`);
            } else {
                const currentDate = new Date();
                const day = currentDate.getDate().toString().padStart(2, "0");
                const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
                const year = currentDate.getFullYear().toString();
                const newAppraisal = {
                    empId: currentEmp.empId,
                    fname: currentEmp.fname,
                    designation: currentEmp.designation,
                    quarter: selectedQuarter,
                    mailid: currentEmp.mailid,
                    repManager: currentEmp.repManager,
                    lead: currentEmp.lead ? currentEmp.lead : currentEmp.repManager,
                    status: "empPending",
                    date: `${day}/${month}/${year}`,
                };
                appraisals.push(newAppraisal);
            }
        }

        if (appraisals.length === 0) {
            showNotification("error", "Error", "All selected employees already have appraisals for this quarter");
            return;
        }

        AppraisalContext.createMidYearBatchAppraisal(appraisals)
            .then((response) => {
                console.log("appraisal Created", response);
                showNotification("success", "Success", "Appraisal Created");
                setIsModalOpen(false);
                form.resetFields();
                setSelectionType("");
                props.getData();
            })
            .catch((error) => {
                console.log("appraisal", error.message);
            });
    };

    const showNotification = (type, msg, desc) => {
        notification[type]({
            message: msg,
            description: desc,
        });
    };

    const onQuarterChange = (date, dateString) => {
        setSelectedQuarter(dateString);
    };

    const searchChange = (e) => {
        let search = e.target.value;
        if (search) {
            let result = data.filter(
                (ex) =>
                    ex.fname.toLowerCase().includes(search.toLowerCase()) ||
                    ex.lname.toLowerCase().includes(search.toLowerCase())
            );
            const modifiedFilterExpense = [...result];
            setFilterEmployees(modifiedFilterExpense);
        } else {
            setFilterEmployees(allEmployees);
        }
    };

    async function getDataUser() {
        setLoading(true);
        const allData = await getUsers();
        let d = allData.docs.map((doc, i) => {
            var longDateStr = moment(doc.data()["date"], "D/M/Y").format("MM-DDY");
            return {
                ...doc.data(),
                date: doc.data()["date"],
                dt: new Date(longDateStr),
                id: doc.id,
                sn: i + 1,
                disabled: false,
                key: doc.data()["empId"],
                fname: doc.data()["fname"] + " " + doc.data()["lname"],
            };
        });
        console.log("abcr", { d });
        setData(d);
        setFilterEmployees(d);
        setAllEmployees(d);
        setLoading(false);
    }

    useEffect(() => {
        getDataUser();
    }, []);

    const showModal = () => {
        console.log("hi");
        setIsModalOpen(true);
    };
    const disabledDate = (current) => {
        const month = current.month();
        return !(month === 5 || month === 11);
    };

    return (
        <>
            <Layout>
                <div className="app-tab" style={{ width: "100%", marginleft: "10px" }}>
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
                        {/* <Col>
                            <Input placeholder="Search" />
                        </Col> */}
                        <Button type="primary" onClick={showModal}>
                            Create Appraisal
                        </Button>
                    </Row>
                </div>

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
                        <Row className="employeeRows">
                            <Col
                                className="check-box"
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    width: "100%",
                                    justifyContent: "space-between",
                                }}
                            >
                                <div>
                                    <Input
                                        placeholder="Search"
                                        prefix={<SearchOutlined />}
                                        onChange={searchChange}
                                    />
                                </div>

                                <Form
                                    style={{ display: "flex" }}
                                    form={form}
                                    onFinish={handleCreateAppraisal}
                                >
                                    <Form.Item name="quarter">
                                        <DatePicker
                                            picker="month"
                                            onChange={onQuarterChange}
                                            style={{ width: "100%" }}
                                            disabledDate={disabledDate}

                                        />
                                    </Form.Item>

                                    <Form.Item>
                                        <Button type="primary" htmlType="submit">
                                            Create
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Col>
                        </Row>

                        <Radio.Group
                            onChange={({ target: { value } }) => {
                                setSelectionType(value);
                            }}
                            value={selectionType}
                        ></Radio.Group>

                        <Table
                            rowSelection={{
                                type: selectionType,
                                ...rowSelection,
                            }}
                            loading={loading}
                            columns={columns}
                            dataSource={filterEmployees}
                            pagination={{
                                position: ["bottomCenter"],
                            }}
                            // scroll={{ x: 1300 }}
                            className="employeeTable"
                            size="small"
                            reloadData={getDataUser}
                        />
                    </Modal>
                </div>
            </Layout>
        </>
    );
};

export default CreatehalfYearGoal;
