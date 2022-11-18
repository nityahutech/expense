import React from 'react'
import {
    Col,
    Row,
    Space,
    Typography,
    Form,
    Input,
    Radio,
    DatePicker,
    Table,
    notification
} from 'antd';
import 'antd/dist/antd.css';
import { Button, Drawer, Modal, } from 'antd';

const LeaveCreate = () => {
    // return (
    //     <Modal className='viewAppraisal'
    //         title=" Create Holiday"
    //         maskClosable={false}
    //         footer={null}
    //         open={isModalOpen}
    //         visible={isModalOpen}
    //         onCancel={handleCancel}
    //         closeIcon={
    //             <div
    //                 onClick={() => {
    //                     setIsModalOpen(false);
    //                 }}
    //                 style={{ color: "#ffffff" }}
    //             >
    //                 X
    //             </div>
    //         }
    //     >
    //         <Form

    //             labelCol={{
    //                 span: 8,

    //             }}
    //             wrapperCol={{
    //                 span: 16,
    //             }}
    //             initialValues={{
    //                 remember: true,
    //             }}
    //             onFinish={onFinish}
    //             form={form}
    //             autoComplete="off"
    //         >
    //             <Form.Item labelAlign="left"
    //                 style={{ marginBottom: "10px", }}

    //                 label="Holiday Name"
    //                 name='holidayname'
    //                 rules={[
    //                     {
    //                         required: true,
    //                         message: 'Please Type Holiday Name',
    //                     },
    //                 ]}

    //             >
    //                 <Input placeholder="Please Type Holiday Name" />
    //             </Form.Item>
    //             <Form.Item
    //                 rules={[
    //                     {
    //                         required: true,
    //                         message: 'Please Type Holiday Date',
    //                     },
    //                 ]}
    //                 label="Date"
    //                 name='holidaydate'
    //                 labelAlign="left"
    //                 style={{ marginBottom: "10px", width: '100% ' }}
    //             >
    //                 <DatePicker style={{ width: '100% ' }}
    //                     disabledDate={disabledDate}
    //                     // disabledYear={disabledYear}
    //                     format="Do MMM, YYYY"
    //                 />
    //             </Form.Item>
    //             <Form.Item
    //                 label="Type Of Leave"
    //                 name='holidaytype'
    //                 labelAlign="left"
    //                 style={{ marginBottom: "10px", }}
    //                 initialValue="Official"
    //             >
    //                 <Radio.Group defaultValue="Official"
    //                 >
    //                     <Radio value="Optional"> Optional </Radio>
    //                     <Radio value="Official"> Official </Radio>
    //                 </Radio.Group>
    //             </Form.Item>
    //             <Form.Item >
    //                 <Button
    //                     style={cancelStyle}
    //                     onClick={handleOk}
    //                     htmlType="submit"
    //                     type="primary">Create New Holiday
    //                 </Button>
    //                 <Button
    //                     type='default'
    //                 // style={buttonStyle}
    //                 // onClick={onReset}
    //                 >
    //                     Reset</Button>
    //             </Form.Item>
    //         </Form>
    //     </Modal>
    // )
}

export default LeaveCreate