import { useState, useRef } from 'react'
import { Checkbox } from 'antd';
import { Col, Button } from 'antd'


const EmpFieldDownload = (props) => {

    const [indeterminate, setIndeterminate] = useState(true);
    const [checkAll, setCheckAll] = useState(false);
    const [checkedList, setCheckedList] = useState([]);
    const checkboxGroupRef = useRef(null);

    const handleCheckAllChange = (event) => {
        setCheckedList(event.target.checked ? ["Basic Information","Family Information", "Work Information", "Bank Information", "Education Information"] : []);
        setIndeterminate(false);
        setCheckAll(event.target.checked);
    };
// , "Certificate", "Identification Document"
    const handleChange = (checkedList) => {
        setCheckedList(checkedList);
        setIndeterminate(
            !!checkedList.length && checkedList.length < 7
        );
        setCheckAll(checkedList.length === 7);
    };

    const downloadModalInformation = () => {
        props.downloadCSV(checkedList)
        props.setShowDownloadModal(false)
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
                <Checkbox style={{ marginBottom: '15px', marginLeft: '0px' }} value="Basic Information">Basic Information</Checkbox>
                <Checkbox style={{ marginBottom: '15px', marginLeft: '0px' }} value="Family Information">Family Information</Checkbox>
                <Checkbox style={{ marginBottom: '15px', marginLeft: '0px' }} value="Work Information">Work Information</Checkbox>
                <Checkbox style={{ marginBottom: '15px', marginLeft: '0px' }} value="Bank Information">Bank Information</Checkbox>
                <Checkbox style={{ marginBottom: '15px', marginLeft: '0px' }} value="Education Information">Education Information</Checkbox>
                {/* <Checkbox style={{ marginBottom: '15px', marginLeft: '0px' }} value="Certificate">Certificate</Checkbox>
                <Checkbox style={{ marginBottom: '15px', marginLeft: '0px' }} value="Identification Document">Identification Document</Checkbox> */}
            </Checkbox.Group>
            <Col style={{ width: '100%', float: 'right' }} xs={24} xm={24} md={8} lg={8}>
                <Button style={{ width: '100%', }} type="primary" onClick={downloadModalInformation}>Download</Button>
            </Col>
        </>
    )
}

export default EmpFieldDownload