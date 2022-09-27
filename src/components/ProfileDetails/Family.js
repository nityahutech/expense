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
      {saveContent ===true ?
      <Card
        title="Educatonal Info"
        // extra={<EditTwoTone />}
        extra={ 
          <Button 
            type="text"
          >
            <DeleteTwoTone twoToneColor="#eb2f96"/>
          </Button>
        } 
        style={{marginTop:'10px'}}    
      >
        
        <Row gutter={[16, 8]}>

          <Col span={12}> <Input placeholder="Mother's Name" /> </Col>

          <Col span={12}> <Input placeholder="Contact No." /> </Col>

          <Col span={12}> <Input placeholder="Father's Name" /> </Col>

          <Col span={12}> <Input placeholder="Contact No." /> </Col>

        </Row>
      </Card>:null}
      <Card
        title='Emergency Contact'
        style={{marginTop:'10px'}}
      >
        <Row gutter={[16, 8]}>
          <Col span={8}> <Input placeholder="Mother's Name" /> </Col>

          <Col span={8}> <Input placeholder="Contact No." /> </Col>

          <Col span={8}> <Input placeholder="Relation" /> </Col>
        </Row>
      </Card>
    </div>
  )
}

export default Education 