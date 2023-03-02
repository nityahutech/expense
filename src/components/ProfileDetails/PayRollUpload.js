import React, { useState } from 'react'
import { Form, Button, Row, Col, Input, notification, Modal } from "antd";
import { useCSVReader } from "react-papaparse";
import Papa from 'papaparse';
import EmployeeNetSalary from '../../contexts/EmployeeNetSalary';
import { showNotification } from '../../contexts/CreateContext';

const PayRollUpload = (props) => {

    const [allEmp, setAllEmp] = useState(props.allEmpName);
    const [ids, setAllIds] = useState(props.ids);
    const [emp, setEmp] = useState(props.emp);
    console.log(allEmp,ids,emp)
    const [bulkModal, openBulkModal] = useState(false);
    const [enableBulk, setEnableBulk] = useState(false);
    const [errorFile, setErrorFile] = useState(null);
    const [heads, setHeaders] = useState([]);

    //-------------------------upload--------------
    const showBulkModal = () => {
        openBulkModal(true);
    };

    const handleBulkModal = () => {
        openBulkModal(false);
    };
    const handleCancel = () => {
        openBulkModal(false);
    };

    const handleBulkOnboard = () => {
        let temp = [...allEmp];
        let headers = heads;
        let selectStaff = headers.indexOf("Select Staff");
        let totalEarning = headers.indexOf("Total Earning");
        let totalDeduction = headers.indexOf("Total Deduction");
        let netSalary = headers.indexOf("Net Salary");
        let basic = headers.indexOf("Basic");
        let hra = headers.indexOf("HRA(15%)");
        let conveyance = headers.indexOf("Conveyance");
        let medicalAllowance = headers.indexOf("Medical Allowance");
        let profAllowance = headers.indexOf("Proff. Dev. Allowance");
        let specialAllowance = headers.indexOf("Special Allowance");
        let bonus = headers.indexOf("Bonus");
        let lta = headers.indexOf("LTA");
        let otherAllowance = headers.indexOf("Other Allowance");
        let tds = headers.indexOf("TDS");
        let esi = headers.indexOf("ESI");
        let pfEmployer = headers.indexOf("PF Employer");
        let PfEmployee = headers.indexOf("PF Enployee");
        let profTax = headers.indexOf("Prof. Tax");
        let otherDeduction = headers.indexOf("Other Deduction");

        temp.forEach(((pay, i) => {
            let temp = {

                selectStaff: pay[selectStaff],
                totalEarning: pay[totalEarning],
                totalDeduction: pay[totalDeduction],
                netSalary: pay[netSalary],
                basic: pay[basic],
                hra: pay[hra],
                conveyance: pay[conveyance] || "",
                medicalAllowance: pay[medicalAllowance] || "",
                profAllowance: pay[profAllowance] || "",
                specialAllowance: pay[specialAllowance] || "",
                bonus: pay[bonus] || "",
                lta: pay[lta] || "",
                otherAllowance: pay[otherAllowance] || "",
                tds: pay[tds] || "",
                esi: pay[esi] || "",
                pfEmployer: pay[pfEmployer] || "",
                PfEmployee: pay[PfEmployee] || "",
                profTax: pay[profTax] || "",
                otherDeduction: pay[otherDeduction] || "",

            }
            EmployeeNetSalary.addSalary(ids[`${emp}`], temp)
                .then(res => {
                    if (i == temp.length - 1) {
                        showNotification("success", "Success", "Bulk Onboarding Complete!")
                    }
                })
                .catch(() =>
                    notification.error({
                        message: "Upload Failed",
                    })
                );
        }))
        setEnableBulk(false);
    };

    const { CSVReader } = useCSVReader();
    const styles = {
        csvReader: {
            display: "flex",
            flexDirection: "row",
            marginBottom: 10,
        },
        browseFile: {
            width: "20%",
        },
        acceptedFile: {
            border: "1px solid #ccc",
            // height: 45,
            lineHeight: 2.5,
            paddingLeft: 10,
            width: "80%",
        },
        remove: {
            borderRadius: 0,
            padding: "0 20px",
        },
        progressBarBackgroundColor: {
            backgroundColor: "red",
        },
    };

    const validateCSV = async (data, headers, model) => {


    }
    return (
        <>
            <Button
                className="bulkEmployee"
                type="primary"
                onClick={showBulkModal}
            >
                <div className="bulkButton">Bulk PayRoll Upload</div>
            </Button>
            <Modal
                title="Upload Payload"
                open={bulkModal}
                onOk={handleBulkModal}
                onCancel={handleCancel}
                footer={false}
                className="bulkOnboardingModal"
                closeIcon={
                    <div
                        onClick={() => {
                            openBulkModal(false);
                        }}
                        style={{ color: "#ffffff" }}
                    >
                        X
                    </div>
                }
            >
                <Row
                    className="rowform"
                    gutter={[0, 8]}
                    style={{
                        marginBottom: "1.5rem",
                        marginTop: "1.5rem",
                        display: "flex",
                        flexDirection: "column",
                        alignitems: "center",
                        justifyContent: "space-around",
                    }}
                >
                    <Col>
                        <CSVReader
                            onUploadAccepted={(results) => {
                                let temp = [...results.data];
                                let headers = temp.shift();
                                let model = temp.shift();
                                validateCSV(temp, headers, model);
                            }}
                        >
                            {({
                                getRootProps,
                                acceptedFile,
                                ProgressBar,
                                getRemoveFileProps,
                            }) => (
                                <>
                                    <div style={styles.csvReader}>
                                        <button
                                            type="button"
                                            {...getRootProps()}
                                            style={styles.browseFile}
                                        >
                                            Browse file
                                        </button>
                                        <div style={styles.acceptedFile}>
                                            {acceptedFile && acceptedFile.name}
                                            {!acceptedFile && setEnableBulk(false)}
                                            {!acceptedFile && setErrorFile(null)}
                                        </div>
                                        <button {...getRemoveFileProps()} style={styles.remove}>
                                            Remove
                                        </button>
                                    </div>
                                    <ProgressBar style={styles.progressBarBackgroundColor} />
                                </>
                            )}
                        </CSVReader>
                    </Col>
                    <Col
                        xs={{ span: 24 }}
                        sm={{ span: 12 }}
                        md={{ span: 24 }}
                        className="Col-1-center"
                        style={{
                            background: "",
                            height: "50px",
                            display: "flex",
                            justifyContent: "flex-end",
                        }}
                    >
                        {/* {errorFile} */}
                        <Button
                            className="listExpense"
                            disabled={!enableBulk}
                            type="primary"
                            onClick={handleBulkOnboard}
                            style={{
                                // cursor: "pointer",
                                backgroundColor: "#1963A6",
                                borderRadius: "5px",
                                color: "#ffff",
                            }}
                        >
                            Bulk Upload Payload
                        </Button>
                    </Col>
                </Row>
            </Modal>
        </>
    )
}

export default PayRollUpload