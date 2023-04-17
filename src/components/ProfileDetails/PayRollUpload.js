import React, { useState } from 'react'
import { Button, Row, Col, notification, Modal, DatePicker } from "antd";
import { useCSVReader } from "react-papaparse";
import EmployeeNetSalary from '../../contexts/EmployeeNetSalary';
import { downloadFile, showNotification } from '../../contexts/CreateContext';
import { DownloadOutlined, LoadingOutlined } from '@ant-design/icons';
import moment from 'moment';

const PayRollUpload = (props) => {
    const { CSVReader } = useCSVReader();
    const earning = props.earningConfig.Earning.concat(props.earningConfig.Deduction)
    const [bulkModal, openBulkModal] = useState(false);
    const [month, setMonth] = useState(moment().format("MMM_YYYY"));
    const startDate = "01-01-2019" //replace later with company start date
    const template = [
      ["Employee ID", "Name", "Basic"].concat(earning),
      ["EMP000001", "Rohit Ram Sharma", "100000"].concat(Array(earning.length).fill("15000"))
    ].concat(Object.keys(props.codes).map(x => [props.codes[`${x}`], x]))
    
    const showBulkModal = () => {
        openBulkModal(!bulkModal);
    };

    const handleBulkUpload = (data, headers, err) => {
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
            headers.map((x, i) => {
                if (i < 2) { return; }
                let num = values[i] || '0'
                if (x == "Basic") {
                    temp.basic = Number(num)
                    temp.hra = temp.basic * 0.15 
                    temp.netSalaryIncome = temp.netSalaryIncome + temp.basic + temp.hra
                    temp.totalEarning = temp.totalEarning + temp.basic + temp.hra
                    return; 
                }
                if (props.earningConfig.Earning.includes(x)) {
                    temp.earnings[`${x}`] = num
                    temp.totalEarning = temp.totalEarning + Number(num)
                    temp.netSalaryIncome = temp.netSalaryIncome + Number(num)
                } else {
                    temp.deductions[`${x}`] = num
                    temp.totalDeduction = temp.totalDeduction + Number(num)
                    temp.netSalaryIncome = temp.netSalaryIncome - Number(num)
                }
            })
            console.log(id, month, temp);
            EmployeeNetSalary.addingSalary(id, month, temp)
                .then(res => {
                    if (i == data.length - 1) {
                        showNotification("success", "Success", "Bulk Uploading Complete!")
                        openBulkModal(false)
                    }
                })
                .catch(err =>
                    notification.error({
                        message: `Upload falied: ${data[1]}`,
                    })
                );
        }))
    };

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
        data.forEach((x, emp) => {
            if (x.length < 2) { data.splice(emp, 1)}
            x.forEach((e, i) => {
                if (i > 1) {
                    if (e == "") {
                        data[emp][i] = "0"
                    }
                    if (!(/^[0-9]*$/.test(e))) {
                        errors.push([x[0], headers[i], "Not a Number"])
                    }
                }
            })
        })
        let temp = [];
        console.log(data, headers, temp)
        if (errors.length > 1) {
            
            // setErrorFile(<Button style={{marginRight: "10px"}} onClick={() => downloadFile(errors, "errorFile")}> Download Error File</Button>)
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
                footer={false}
                destroyOnClose
                className="bulkOnboardingModal"
                closeIcon={
                    <div
                        onClick={showBulkModal}
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
                        {/* <Col>
                            <DatePicker
                                picker="month"
                                placeholder="Select Month"
                                defaultValue={moment()}
                                format={"MM-YYYY"}
                                allowClear
                                onChange={(e) => setMonth(e == null ? month : e.format("MMM_YYYY"))}
                                disabledDate={(e) => e.isAfter(moment()) || e.isBefore(moment(startDate, "DD-MM-YYYY"))}
                             />
                        </Col> */}
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