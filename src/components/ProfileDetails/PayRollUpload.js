import React, { useState } from 'react'
import { Form, Button, Row, Col, Input, notification, Modal, Select, DatePicker } from "antd";
import { useCSVReader } from "react-papaparse";
import Papa from 'papaparse';
import EmployeeNetSalary from '../../contexts/EmployeeNetSalary';
import { checkNumbervalue, downloadFile, showNotification } from '../../contexts/CreateContext';
import { DownloadOutlined, LoadingOutlined } from '@ant-design/icons';
import moment from 'moment';

const PayRollUpload = (props) => {
    const earning = props.earningConfig.Earning.concat(props.earningConfig.Deduction)
    // const deductions = 
    // const allEmp = props.allEmpName;
    const ids = props.ids;
    const [bulkModal, openBulkModal] = useState(false);
    const [enableBulk, setEnableBulk] = useState(false);
    const [errorFile, setErrorFile] = useState(null);
    const [month, setMonth] = useState(moment().format("MMM_YYYY"));
    const startDate = "01-01-2019" //replace later with company start date
    const [heads, setHeaders] = useState([]);
    const template = [
      ["Employee ID", "Name", "Basic"].concat(earning),
      ["EMP000001", "Rohit Ram Sharma", "100000"].concat(Array(earning.length).fill("15000"))
    ].concat(Object.keys(props.codes).map(x => [props.codes[`${x}`], x]))
    // console.log(ids, earning, template, month)

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

    const handleBulkUpload = (data, headers, err) => {
        // console.log(props.earningConfig.Earning);
        data.forEach(((values, i) => {
            if (err.includes(values[0])) {return}
            let id = props.ids[`${values[1]}`]
            let temp = {
                totalEarning: 0,
                totalDeduction: 0,
                netSalaryIncome: 0,
                earnings: {},
                deductions: {}
            }
            // console.log(headers);
            headers.map((x, i) => {
                if (i < 2) { return; }
                if (x == "Basic") {
                    temp.basic = Number(values[i])
                    temp.hra = temp.basic * 0.15 
                    temp.netSalaryIncome = temp.netSalaryIncome + temp.basic + temp.hra
                    temp.totalEarning = temp.totalEarning + temp.basic + temp.hra
                    return; 
                }
                if (props.earningConfig.Earning.includes(x)) {
                    temp.earnings[`${x}`] = values[i]
                    temp.totalEarning = temp.totalEarning + Number(values[i])
                    temp.netSalaryIncome = temp.netSalaryIncome + Number(values[i])
                } else {
                    // console.log(x, i);
                    temp.deductions[`${x}`] = values[i]
                    temp.totalDeduction = temp.totalDeduction + Number(values[i])
                    temp.netSalaryIncome = temp.netSalaryIncome - Number(values[i])
                }
            })
            // console.log(id, month, temp);
            EmployeeNetSalary.addSalary(id, month, temp)
                .then(res => {
                    if (i == data.length - 1) {
                        showNotification("success", "Success", "Bulk Uploading Complete!")
                        openBulkModal(false)
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

    const validateCSV = async (data, headers) => {
        let errors = [["Emp Id", "Field", "Error"]];
        // console.log(data, headers);
        data.forEach(x => {
            x.forEach((e, i) => {
                if (i > 1 && (e == "" || !(/^[0-9]*$/.test(e))))
                    errors.push([x[0], headers[i], e == "" ? "Missing Value" : "Not a Number"])
            })
        })
        // console.log(errors);
        if(data[data.length-1].length == 1) {
            data.pop()
        }
        setErrorFile(null)
        // const timer = setTimeout(() => {
          // setAllEmp(data)
          // setHeaders(headers)
          let temp = []
          if (errors.length > 1) {
            // console.log(data, headers, temp)
            setErrorFile(<Button style={{marginRight: "10px"}} onClick={() => downloadFile(errors, "errorFile")}> Download Error File</Button>)
            temp = errors.map(x => x[0]);
            temp.shift()
            Modal.confirm({
              title: "This file contains errors. Do you want to contine onboarding all user records without errors?",
              okText: "Download error file and Continue",
              okType: "danger",
        
              onOk: () => {
                downloadFile(errors, "errorFile")
                handleBulkUpload(data, headers, temp)
                notification.open({
                  message: "Onboarding",
                  duration: 7,
                  icon: <LoadingOutlined />,
                });
              },
              onCancel: () => {}
            })
            // setErrorRecs(temp)
          } else {
            Modal.confirm({
              title: "Are you sure you want to upload this data?",
              okText: "Yes",
              okType: "danger",
        
              onOk: () => {
                handleBulkUpload(data, headers, temp)
                notification.open({
                  message: "Uploading",
                  duration: 3,
                  icon: <LoadingOutlined />,
                });
                  // .then((res) => {
                  //   showNotification(
                  //     "success",
                  //     "Success",
                  //     "Users Onboarded Successfully!"
                  //   );
                  // })
                  // .catch((error) => {
                  //   showNotification("error", "Error", error.message);
                  // });
              },
            })
          }
          // showNotification("success", "Success", "All Fields Valid!")
            
          // setEnableBulk(true)
        // }, [5000])
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
                    <Row style={{justifyContent: "space-between"}}>
                        <Col>
                            <Button style={{marginBottom: "10px"}} onClick={() => downloadFile(template, "template")}> 
                                <DownloadOutlined />
                                Download File Template
                            </Button>
                        </Col>
                        <Col>
                            <DatePicker
                                picker="month"
                                placeholder="Select Month"
                                defaultPickerValue={moment()}
                                format={"MM-YYYY"}
                                allowClear
                                onChange={(e) => setMonth(e == null ? month : e.format("MMM_YYYY"))}
                                disabledDate={(e) => e.isAfter(moment()) || e.isBefore(moment(startDate, "DD-MM-YYYY"))}
                             />
                        </Col>
                    </Row>
                    <Col>
                        <CSVReader
                            onUploadAccepted={(results) => {
                                let temp = [...results.data];
                                let headers = temp.shift();
                                validateCSV(temp, headers);
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
                    {/* <Col
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
                        {errorFile}
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
                    </Col> */}
                </Row>
            </Modal>
        </>
    )
}

export default PayRollUpload