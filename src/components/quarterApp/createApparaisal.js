import React, { useState, useEffect } from 'react'
import { Button, Col, DatePicker, notification } from 'antd';
import {
    SearchOutlined,
} from "@ant-design/icons";
import { Input, Row, Layout, Radio, Table, } from 'antd';
import { getUsers } from "../../contexts/CreateContext";
import AppraisalContext from '../../contexts/AppraisalContext';
import moment from "moment";

const CreateApparaisal = (props) => {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [filterEmployees, setFilterEmployees] = useState([]);
    const [allEmployees, setAllEmployees] = useState([]);
    const [selectionType, setSelectionType] = useState('checkbox');
    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const [selectedQuarter, setSelectedQuarter] = useState();

    const columns = [
        {
            title: "Employee Code",
            dataIndex: "empId",
            key: "empId",
            // fixed: "left",
            width: 60,
        },
        {
            title: "First Name",
            dataIndex: "fname",
            key: "fname",
            // fixed: "left",
            width: 60,
            // fixed: size,
        },
        {
            title: "Last Name",
            dataIndex: "lname",
            key: "lname",
            width: 60,
        },

    ]

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedEmployees(selectedRows)
            console.log(
                `selectedRowKeys: ${selectedRowKeys}`,
                "selectedRows: ",
                selectedRows
            );
        },
    }
    //--------------onFinish------------------------
    const handleCreateAppraisal = () => {
        console.log('appraisal',);
        let appraisals = []
        for (let i = 0; i < selectedEmployees.length; i++) {
            let currentEmp = selectedEmployees[i]
            let newAppraisal = {
                empId: currentEmp.empId,
                fname: currentEmp.fname,
                lname: currentEmp.lname,
                designation: currentEmp.designation,
                quarter: selectedQuarter,
                mailid: currentEmp.mailid,
                repManager: currentEmp.repManager,
                lead: currentEmp.lead ? currentEmp.lead : currentEmp.repManager,
                status: 'empPending'

            }
            appraisals[i] = newAppraisal
        }

        console.log('appraisal', appraisals)

        AppraisalContext.createBatchAppraisal(appraisals)
            .then(response => {
                console.log("appraisal Created", response);
                
                // getAppraisalList()
            })
            .catch(error => {
                console.log('appraisal', error.message);

            })
        console.log('appraisal', 'appraisal created');
        showNotification("success", "Success", "Appraisal Created");
        setSelectedQuarter('')
        props.closeCreateAppraisalModal()
    };

    const showNotification = (type, msg, desc) => {
        notification[type]({
            message: msg,
            description: desc,
        });
    };

    const onQuarterChange = (date, dateString) => {
        setSelectedQuarter(dateString)
    }

    const searchChange = (e) => {
        let search = e.target.value;
        // setFilterCriteria({ ...filterCriteria, search: search });
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

    async function getData() {
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
            };
        });
        console.log('abcr', { d });
        setData(d);
        setFilterEmployees(d);
        setAllEmployees(d);
        setLoading(false);
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <Layout>
                <Row className="employeeRow" >
                    <Col className='check-box' style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                        <div>
                            <Input
                                placeholder="Search"
                                prefix={<SearchOutlined />}
                                onChange={searchChange}
                            />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            <div>
                                <DatePicker style={{ width: '100%' }}

                                    onChange={onQuarterChange}
                                    picker="quarter"

                                />

                            </div>
                            <div>
                                <Button type="primary"

                                    onClick={() => {
                                        handleCreateAppraisal();

                                    }}
                                >Create </Button>

                            </div>
                        </div>
                    </Col>
                </Row>

                <Radio.Group
                    onChange={({ target: { value } }) => {
                        setSelectionType(value);

                    }}
                    value={selectionType}
                >

                </Radio.Group>

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
                    reloadData={getData}
                    rowClassName={(record) => record.disabled && "disabled-row"}
                />
            </Layout>
        </>
    )
}

export default CreateApparaisal