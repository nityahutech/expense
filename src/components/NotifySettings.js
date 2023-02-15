import {useEffect} from 'react'
import {
    Tabs,
    Table,
    Button,
    Form,
    Input,
    DatePicker,
    Spin,
    Card,
    Divider,
    Radio,
    Switch,
    TimePicker,
    InputNumber,
    Row,
    Col,
  } from "antd";


function NotifySettings(props) {
    console.log(props.data)
  return (
  <div style={{
    display:"flex",
    justifyContent:"center",
    }}
  >
        <Card
          style={{
            borderRadius: "5px",
            marginBottom: "25px",
            width:"80%"
          }}
        >
            <Form>
                <Form.Item
                    labelCol={{
                        span: 18,
                        // offset: 2,
                      }}
                      wrapperCol={{
                        span: 14,
                        // offset: 1,
                      }} 
                    label="Birthday Notification"
                    colon={true}
                >
                    <Switch />
                </Form.Item>
                <Divider orientation="left">Templates</Divider>
                <Row gutter={[16,16]}>
                    <Col span={12}>
                        <div
                          style={{
                            backgroundColor:"#ffffff",
                            border:"1px solid lightGrey",
                            borderRadius:"10px",
                            display:"flex",
                            justifyContent:"center",
                            alignItems:"center",
                            height:"10vh"
                          }}
                        >
                            Preview Template
                        </div>
                    </Col>
                    <Col span={12}></Col>
                </Row>
                <Divider />
                <Form.Item
                    labelCol={{
                        span: 18,
                        // offset: 2,
                      }}
                      wrapperCol={{
                        span: 14,
                        // offset: 1,
                      }} 
                    label="Aniversary Notification"
                    colon={true}
                >
                    <Switch />
                </Form.Item>
                <Divider orientation="left">Templates</Divider>
                <Row gutter={[16,16]}>
                    <Col span={12}></Col>
                    <Col span={12}></Col>
                </Row>
            </Form>
        </Card>
</div>)
}

export default NotifySettings