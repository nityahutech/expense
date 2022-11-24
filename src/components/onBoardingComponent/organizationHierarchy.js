import React, { useState } from 'react'
import {

    Divider,
    Card,
    Button,
    Breadcrumb,
    Row,
    Col,
    Modal,
    Form,
    Input


} from "antd";
import {

    CloseOutlined,
    CheckOutlined
} from "@ant-design/icons";

import BuisenessUnitPage from './buisenessUnitPage';
import Departmentpage from './departmentpage';
import TeamPage from './teampage';
import DivisionPage from './divisionpage';

const onFinish = () => {

}
const OranizationHierarcy = () => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [form] = Form.useForm();

    return (
        <Card
            style={{
                background: "#fff",
                margin: "0px 15px 20px 15px",

                // height: "55rem",
            }}
        >
            <div style={{ background: "#fff" }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div
                        style={{
                            fontWeight: "600",
                            fontSize: "14px",
                            lineHeight: "19px",
                            // textTransform: "uppercase",
                        }}
                    >
                        <Breadcrumb style={{}}
                            separator=">">
                            <Breadcrumb.Item className='org-breadcrumb' style={{ fontWeight: '600', fontSize: '18px', }} href=""> Business Unit</Breadcrumb.Item>
                            <Breadcrumb.Item className='org-breadcrumb' style={{ fontWeight: '600', fontSize: '18px' }} href="">Division</Breadcrumb.Item>
                            <Breadcrumb.Item className='org-breadcrumb' style={{ fontWeight: '600', fontSize: '18px' }} href="">Department</Breadcrumb.Item>
                            <Breadcrumb.Item className='org-breadcrumb' style={{ fontWeight: '600', fontSize: '18px' }}>Team</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <div
                        style={{
                            fontWeight: "600",
                            fontSize: "14px",
                            lineHeight: "19px",
                            textTransform: "uppercase",
                        }}
                    >
                        <Button type='default' onClick={() => {
                            {
                                console.log('hi')
                                setIsEditModalOpen(true);
                            }
                        }}>+ Add Business Unit </Button>
                    </div>
                </div>
                <Divider />




                {/* //------------------------------------------------------Buissness Modal */}
                <BuisenessUnitPage />
                <Row>
                    <Col xs={22} sm={20} md={18}>
                        <Modal
                            // bodyStyle={{ overflowY: 'scroll' }}
                            // style={{ height: 'calc(100vh - 200px)' }}
                            bodyStyle={{ overflowY: 'auto', maxHeight: 'calc(100vh - 200px)', marginLeft: '40px', marginRight: '40px' }}
                            className="viewAppraisal"
                            centered
                            width={550}
                            visible={isEditModalOpen}
                            // footer={null}
                            destroyOnClose
                            onCancel={() => {

                                setIsEditModalOpen(false);
                            }}
                            cancelText={<div ><CloseOutlined style={{ marginRight: '10px' }} />CANCEL</div>}
                            onOk={() => {
                                form.submit();
                                setIsEditModalOpen(false);
                            }}

                            okText={<div><CheckOutlined style={{ marginRight: '10px' }} />SAVE</div>}
                            title="Business Unit  "
                            closeIcon={
                                <div
                                    onClick={() => {

                                        setIsEditModalOpen(false);
                                    }}
                                    style={{ color: "#ffffff" }}
                                >
                                    X
                                </div>
                            }
                        >
                            <Row
                                className="apply-leave"
                                style={{
                                    marginTop: "10px",
                                }}
                            >
                                <Col xl={24} lg={24} md={24} sm={24} xs={24}
                                    style={{
                                        background: "flex",
                                        padding: "10px",
                                        // width: "400px",
                                    }}
                                >
                                    <Form

                                        labelCol={{
                                            span: 8,
                                        }}
                                        wrapperCol={{
                                            span: 16,
                                        }}
                                        initialValues={{
                                            remember: true,
                                        }}
                                        form={form}
                                        onFinish={onFinish}
                                    >

                                        <Form.Item
                                            labelAlign="left"
                                            name="businessunitname"
                                            style={{ marginBottom: "20px" }}
                                            label={
                                                <label style={{ color: "black", fontWeight: "400" }}>
                                                    Business Unit Name <span style={{ color: "red" }}> *</span>
                                                </label>
                                            }

                                        >
                                            <Input

                                            />
                                        </Form.Item>

                                        <Form.Item required={false}

                                            labelAlign="left"
                                            name="businessunitdescription"
                                            style={{ marginBottom: "20px" }}
                                            label={
                                                <label style={{ color: "black", fontWeight: "400" }}>
                                                    Description:<span style={{ color: "red" }}> *</span>{" "}
                                                </label>
                                            }
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Please Enter Description"
                                                }
                                            ]}
                                        >
                                            <Input.TextArea
                                                maxLength={80}
                                                rows={4}
                                                // onChange={(e) => {
                                                //     const inputval = e.target.value;
                                                //     const newVal =
                                                //         inputval.substring(0, 1).toUpperCase() +
                                                //         inputval.substring(1);
                                                //     form1.setFieldsValue({ reason: newVal });
                                                // }}
                                                required
                                            />
                                        </Form.Item>


                                    </Form>
                                </Col>
                            </Row>
                        </Modal>
                    </Col>
                </Row>
                {/* //------------------------------------------------------Division Modal */}
                <DivisionPage />
                {/* //------------------------------------------------------Department Modal */}
                <Departmentpage />
                {/* //------------------------------------------------------Team Modal */}
                <TeamPage />
            </div>
        </Card >
    )
}

export default OranizationHierarcy