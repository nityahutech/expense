import React from 'react'
import { 
  Card,
  Tabs,
  Table,
  Col, 
  Row,
  Input,
  DatePicker,
  Button,
  Form,
  Select,
} from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import "../../style/Documents.css" 


// import Columns from 'antd/lib/table/Column';

// -------------------------------------------------------------------



// ------------------------------------------------------------------

function Document() {

// -------------------------------------------------------------------

  return (
    <div
    className='education' 
    style={{
            margin:'10px',
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width:'100%'
          }}
    >
        <div  
          style={{
              width:'800px',
              marginTop:'10px',
              backgroundColor:'white', 
              padding:'10px',
              display:'flex',
              justifyContent:'center',
               
            }}>

          <Tabs defaultActiveKey="1" className='tabs'>

            <Tabs.TabPane tab="IDs" key="1">
              <table style={{borderStyle:'solid',width:'100%'}}>

                <tr>
                  <td colspan="2" style={{borderStyle:'solid',width:'25%', fontWeight:'200'}}><h1 style={{ fontWeight:'bold'}}>Proof</h1></td>
                </tr>

                <tr>
                  <td style={{borderStyle:'solid',width:'25%'}}>Photo Id</td>
                  <td style={{borderStyle:'solid',width:'100%'}}></td>
                </tr>

                <tr>
                  <td style={{borderStyle:'solid',width:'25%'}}>Date Of Birth</td>
                  <td style={{borderStyle:'solid',width:'100%'}}></td>
                </tr>

                <tr>
                  <td style={{borderStyle:'solid',width:'25%'}}>Current Address</td>
                  <td style={{borderStyle:'solid',width:'100%'}}></td>
                </tr>

                <tr>
                  <td style={{borderStyle:'solid',width:'25%'}}>Premanent Address</td>
                  <td style={{borderStyle:'solid',width:'100%'}}></td>
                </tr>

              </table> 
              
              
              
            </Tabs.TabPane>

            <Tabs.TabPane tab="Certification" key="2" className='certficationtable'>
              <table style={{border: '1px solid #DDD',width: '100%'}}>
                <tr>
                  <th style={{
                    // borderBottom: '1px solid #DDD'
                    }}>COURSE TITLE</th>
                  <th style={{
                    // borderBottom: '1px solid #DDD',
                    // borderLeft: '1px solid #DDD'
                    }}>COURSE TYPE</th>
                </tr>
                <tr>
                  <td style={{
                    width:'50%',
                    padding:'8px'
                    }}>hi</td>
                  <td style={{
                    width:'50%',
                    // borderLeft: '1px solid #DDD',
                    padding:'8px'
                    }}>hi</td>
                </tr>
                <tr colspan="2">
                  <Button type='text'><PlusCircleOutlined /> Add</Button>
                </tr>
              </table>
            </Tabs.TabPane>

            <Tabs.TabPane tab="Work" key="3">
              Content of Tab Pane 3
            </Tabs.TabPane>

          </Tabs>
        </div>
    </div>
  )
}

export default Document 