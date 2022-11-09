import React, { useState, useEffect } from 'react'
import { Button, Col } from 'antd';
import { Input, Modal, Row, DatePicker, } from 'antd';
import "./appraisal.css";
import CreateApparaisal from "./createApparaisal";
import EmpInfoContext from '../../contexts/EmpInfoContext';
import { useAuth } from '../../contexts/AuthContext'
import EmpAppraisalTable from './empAppraisalTable';

const AppraisalHr = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [employeeRecord, setEmployeeRecord] = useState();
    const { currentUser } = useAuth();
    const [empRole, setEmpRole] = useState(sessionStorage.getItem("role"));

    const showModal = () => {
        console.log('hi')
        setIsModalOpen(true);
    };

    const closeCreateAppraisalModal = () => {
        console.log('hiii')
        setIsModalOpen(!isModalOpen);
    };

    useEffect(() => {
        getEmployeeRecord()

    }, [])

    const getEmployeeRecord = async () => {
        EmpInfoContext.getEduDetail(currentUser.uid)
            .then(response => {
                console.log('empRecorddd', response)
                setEmployeeRecord(response)
            })
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            // width: '100%',
            borderRadius: '10px'

        }}>

            {empRole === 'hr' &&
                <div className="app-tab" style={{ width: '100%', marginleft: '10px' }}>
                    <Row className="employeeRow" style={{ marginLeft: '10px', marginRight: '10px', flexDirection: 'row', display: 'flex', justifyContent: 'space-between', }}>
                        <Col>
                            <Input
                                placeholder="Search"
                            />

                        </Col>
                        <Button type="primary" onClick={showModal}>Create Appraisal</Button>

                    </Row>
                </div>
            }

            {
                empRole === 'hr' && <EmpAppraisalTable reload={!isModalOpen} listType='hr' title='Appraisal Created by Hr' />

            }
            <Modal className='viewModal'
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
                <CreateApparaisal closeCreateAppraisalModal={closeCreateAppraisalModal} />
            </Modal>

            <EmpAppraisalTable listType='emp' title='My Apparisal' />
            {empRole === 'lead' && <EmpAppraisalTable listType='lead' title='Appraisal Pending For Review (Lead)' />}
            {employeeRecord && employeeRecord.isManager && <EmpAppraisalTable listType='mgr' title='Appraisal Pending For Review (Manager)' />}

        </div >
    )
}

export default AppraisalHr