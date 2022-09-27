// ------------------------------------Place for import 
import React from 'react'

import  { useState } from 'react';

import { 
  Card,
  Col, 
  Row,
  Input,
  DatePicker,
  Button,
} from 'antd';

import {
  PlusCircleOutlined,
  CloseOutlined,
  CheckOutlined,
  EditTwoTone,
  DeleteTwoTone, 
} from '@ant-design/icons';

// ----------------------------------------place for const declaration

const onChange = (date, dateString) => {
  console.log(date, dateString);
};

// --------------------------------------place for functions

function Education() {

  const [editContent, showEditContent] = useState(false);
  const [saveContent, showSaveContent] = useState(false)

  return (
    <div className='education' style={{margin:'10px'}}>
      <Card title="Educational Info">

        <Row>
        <Col span={24}>
            <Button 
              type="text"
              onClick={() => showEditContent(!editContent)}
            >
                <PlusCircleOutlined />Add
            </Button>
          </Col>
        </Row>

        {editContent ===true ?
        <Row gutter={[16, 8]}>

             <Col span={24}> <Input placeholder="Course Name" /> </Col>

             <Col span={8}> <Input placeholder="Course Name" /> </Col>

             <Col span={8}> <Input placeholder="Course Type" /> </Col>

             <Col span={8}> <Input placeholder="Stream" /> </Col>

             <Col span={8}>
                <DatePicker 
                onChange={onChange} 
                placeholder="Course Start Date"
                style={{ width:'100%' }}
                />
              </Col>

              <Col span={8}>
                <DatePicker 
                  onChange={onChange} 
                  placeholder="Course End Date"
                  style={{ width:'100%' }}
                />
              </Col>

              <Col span={8}> <Input placeholder="College Name" /> </Col>

              <Col span={8}> <Input placeholder="University Name" /> </Col>

              <Col 
                  span={24}
                  style={{textAlign:'right'}}
                >
                  <Button
                  onClick={() => showEditContent(!editContent)}>
                  <CloseOutlined /> 
                  Cancel
                  </Button>
                  <Button
                    type='primary'
                    style={{width:'100px',marginLeft:'10px'}}
                    onClick={() => showSaveContent(!saveContent)}
                  >
                    <CheckOutlined />Save
                  </Button>
                </Col>

        </Row>:null}
      </Card>
      {saveContent ===true ?
      <Card
        title="Qulification Type"
        // extra={<EditTwoTone />}
        extra={ 
          <Button 
            type="text"
          >
            <DeleteTwoTone twoToneColor="#eb2f96"/>
          </Button>
        
        } 
              
      >
        
        <Row gutter={[36, 8]}>

        <Col span={5}> 
          <img 
            src="/logo/university medium.png" 
            alt="university"
            style={{
              border:'1px solid #faf9be',
              borderRadius:'5px',
              backgroundColor:'#faf9be',
              height:'100%'
            }} 
          /> 
        </Col>

        <Col span={19}>
           <h3>College Name</h3>
           <h3>University Name</h3>
           <h3>COURSE Name</h3>
           <h3>Course Type</h3>
           <h3>Stream</h3>
           <h3>Starting Date - Ending Date</h3>
        </Col>
        </Row>
      </Card>:null}
    </div>
  )
}

export default Education