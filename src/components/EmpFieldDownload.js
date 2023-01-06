import React, { useState, useRef } from 'react'
import { Checkbox } from 'antd';
import { Col, Button } from 'antd'


const EmpFieldDownload = (props) => {
    const [indeterminate, setIndeterminate] = useState(true);
    const [checkAll, setCheckAll] = useState(false);
    const [checkedList, setCheckedList] = useState([]);
    const checkboxGroupRef = useRef(null);


    const handleCheckAllChange = (event) => {
        console.log(event)
        setCheckedList(event.target.checked ? ['option1', 'option2', 'option3', 'option4', 'option5', 'option6', 'option7'] : []);
        setIndeterminate(false);
        setCheckAll(event.target.checked);
    };

    const handleChange = (checkedList) => {
        console.log(checkedList);
        setCheckedList(checkedList);
        setIndeterminate(
            !!checkedList.length && checkedList.length < ['option1', 'option2', 'option3', 'option4', 'option5', 'option6', 'option7'].length
        );
        setCheckAll(checkedList.length === ['option1', 'option2', 'option3', 'option4', 'option5', 'option6', 'option7'].length);
    };

    const downLoadModalInformation = () => {
        console.log('ffff')
        props.closeCreateEmpModal()
        setCheckedList(false)

    }

    return (
        <>

            <Checkbox style={{ marginBottom: '15px', fontSize: '20px' }}
                indeterminate={indeterminate}
                onChange={handleCheckAllChange}
                checked={checkAll}
                ref={checkboxGroupRef}
            >
                Check all
            </Checkbox>
            <br />

            <Checkbox.Group style={{ width: '100%', display: 'flex', flexDirection: 'column', }} value={checkedList} onChange={handleChange} >
                <Checkbox style={{ marginBottom: '15px', marginLeft: '0px' }} value="option1">Basic Information</Checkbox>
                <Checkbox style={{ marginBottom: '15px', marginLeft: '0px' }} value="option2">Family Information</Checkbox>
                <Checkbox style={{ marginBottom: '15px', marginLeft: '0px' }} value="option3">Work Information</Checkbox>
                <Checkbox style={{ marginBottom: '15px', marginLeft: '0px' }} value="option4">Bank Information</Checkbox>
                <Checkbox style={{ marginBottom: '15px', marginLeft: '0px' }} value="option5">Education Information</Checkbox>
                <Checkbox style={{ marginBottom: '15px', marginLeft: '0px' }} value="option6">Certificate</Checkbox>
                <Checkbox style={{ marginBottom: '15px', marginLeft: '0px' }} value="option7">Identification Document</Checkbox>

            </Checkbox.Group>

            <Col style={{ width: '100%', float: 'right' }} xs={24} xm={24} md={8} lg={8}>
                <Button style={{ width: '100%', }} type="primary" onClick={downLoadModalInformation}>DownLoad </Button>
            </Col>

        </>
    )
}

export default EmpFieldDownload