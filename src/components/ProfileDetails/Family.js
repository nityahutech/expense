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
  const [saveContent, showSaveContent] = useState(false);
  const [saveEmergency, showSaveEmergency] = useState(false)

  return (
    <div className='education' style={{margin:'10px'}}>
      <Card title="Family Info">

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

            <Col span={24}>
                    <Button 
                      type="text"
                      onClick={() => showEditContent(!editContent)}
                    >
                        <PlusCircleOutlined />Add
                    </Button>
              </Col>

             <Col span={12}> <Input placeholder="Mother's Name" /> </Col>

             <Col span={12}> <Input placeholder="Contact No." /> </Col>

             <Col span={12}> <Input placeholder="Father's Name" /> </Col>

             <Col span={12}> <Input placeholder="Contact No." /> </Col>

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
    {/* --------------------------Emergency---------------------- */}
      <Card
        title='Emergency Contact'
        style={{marginTop:'10px'}}
      >
        <Row gutter={[16, 8]}>
          <Col span={24}>
            <Button 
              type="text"
              onClick={() => showSaveEmergency(!saveEmergency)}
            >
                <PlusCircleOutlined />Add
            </Button>
          </Col>
        </Row>
        {saveEmergency ===true ?
        <Row gutter={[16, 8]}>
          <Col span={24}>
            <Button 
              type="text"
              onClick={() => showSaveContent(!saveEmergency)}
            >
                <PlusCircleOutlined />Add
            </Button>
          </Col>
          
          <Col span={8}> <Input placeholder="Mother's Name" /> </Col>

          <Col span={8}> <Input placeholder="Contact No." /> </Col>

          <Col span={8}> <Input placeholder="Relation" /> </Col>
        </Row>:null}
      </Card>
    </div>
  )
}

export default Education 