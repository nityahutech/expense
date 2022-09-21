import React, { useEffect, useState, } from 'react';
import {
    Col,
    Row,
    Table,
    Modal,

} from 'antd';

import { useAuth } from '../contexts/AuthContext'
import "../style/leave.css";

let dummy=[{
    date:"OKOKO",
    name:"OKOKO",
    nature:"OKOKO",
    slot:"OKOKO",
    reason:"OKOKO",
    approver:"jhbd"
}]
const Notification = ({data}) => {
const { currentUser, role } = useAuth();
const [dataSource, setDataSource] = useState(data)
useEffect(() => {
 setDataSource(data)
}, [data])


console.log("data",data);
    const onApproveLeave = (record) => {
       

        Modal.confirm({
            title: "Are you sure, you want to approve Leave record?",
            okText: "Yes",
            okType: "primary",
         


            onOk: () => {
                //log record
                //set record: leaveStatus:"approve"
                //record.leaveStatus="approved"
                //get index of selected leave
                //  dataSrc[0]=record
                //hit firebase with status
                //getDtata()

                // LeaveContext.approveLeave(record.id)
                //     .then(response => {
                //         console.log(response);
                //         getData();
                //     })
                //     .catch(error => {
                //         console.log(error.message);

                //     })
            },
        });
    };

    const onRejectedLeave = (record) => {
        Modal.confirm({
            title: "Are you sure, you want to Reject Leave record?",
            okText: "Yes",
            okType: "danger",
            // onOk: () => {
            //     LeaveContext.rejectLeave(record.id)
            //         .then(response => {
            //             console.log(response);
            //             getData();
            //         })
            //         .catch(error => {
            //             console.log(error.message);

            //         })
            // },
        });
    };






    const columns = [
        {
            title: 'Duration',
            dataIndex: 'date',
            width: 150,

        },
        {
            title: 'Employee Name',
            dataIndex: 'name',
            width: 150,

        },
        {
            title: 'Nature of Leave',
            dataIndex: 'nature',
            width: 150,

        },
        {
            title: 'Slot',
            dataIndex: 'slot',
        },
        {
            title: 'Reason',
            dataIndex: 'reason',
            width: 150,
        },
        {
            title: 'Approver',
            dataIndex: 'approver',
            width: 150,
        },


        {
            key: "5",
            title: "Actions",
            fixed: 'right',
            width: 80,
            render: (record) => {
                return (
                    <>
                        {

                            <>{
                                
                            }
                                <img
                                    style={{ color: "white", width: '20px', marginRight: 10 }}
                                    src="../logo/checkmark.png"
                                    alt="profile"
                                    className="Dash"
                                    onClick={() => {
                                        onApproveLeave(record);

                                    }}
                                    
                                    
                                />
                                <img
                                    style={{ color: "white", width: '20px' }}
                                    src="../logo/rejected.png"
                                    alt="profile"
                                    className="Dash"
                                    onClick={() => {
                                        onRejectedLeave(record);
                                    }}

                                />

                                {/* <DeleteOutlined
                                  
                                    style={{ color: "red", marginLeft: 10 }}
                                /> */}

                            </>

                        }


                    </>
                );
            },
        }

    ];


    return (
        <Row style={{
            display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'flex-start', backgroundColor: 'white',
            borderRadius: '10px', padding: '10px', margin: '10px'
        }}
        >
            <Col span={24} style={{
                display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'flex-start', color: 'black'
            }}><h3>Leave Requested</h3></Col>

            <Col xl={24} lg={24} md={24} sm={24} xs={24} style={{
                background: 'flex', padding: '10px', width: '400px'
            }} >


                <div>
                    <Table columns={columns}
                        dataSource={dataSource}
                        // rowClassName={record => !record.enabled && "disabled-row"}
                        size="small" scroll={{
                            x: 1000,
                        }} />
                </div>



            </Col>
        </Row>

    )
}

export default Notification