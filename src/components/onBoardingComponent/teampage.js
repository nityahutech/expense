import React, { useState } from 'react'
import {
    Col,
    Row,
    Table,
    Button,
    Modal

} from "antd";
import {
    DeleteOutlined,
    EditFilled,
    CloseOutlined,
    CheckOutlined
} from "@ant-design/icons";
import { Form, Input } from "antd";

const columns = [
    {
        title: "SLno.",
        dataIndex: "SL",
        key: "SL",
        width: 50,

    },
    {
        title: "Team Name",
        dataIndex: "teamname",
        key: "teamname",
        width: 100,
        render: text => <a href="#">{text}</a>,
    },

    {
        title: "Team Description",
        key: "teamdescription",
        dataIndex: "teamdescription",
        width: 200,
        // responsive: ["md"],
        // render: (_, { status }) => getStatusUi(status),
    },
    {
        title: "Action",
        key: "action",
        dataIndex: "action",
        width: 80,
        // align: "center",
        render: (_, record) => {
            return (
                <>
                    <Row gutter={[0, 0]}>
                        <Col xs={22} sm={15} md={8}>
                            <Button
                                className="editbuttononboard"
                                type="text"
                                style={{
                                    color: " #007ACB",
                                    border: "none",
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '35px',
                                    height: '36px',
                                    background: '#EEEEEE',
                                    borderRadius: '10px'
                                }}
                            // onClick={() => {
                            //     setEditInfo(true);
                            //     setDes(record.designation);
                            //     setOld(record.designation);
                            // }}
                            >
                                <EditFilled />
                            </Button>
                        </Col>
                        <Col xs={22} sm={15} md={8}>
                            <Button
                                className="editbuttononboard"
                                type="text"
                                style={{
                                    color: " #007ACB",
                                    border: "none",
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '35px',
                                    height: '36px',
                                    background: '#EEEEEE',
                                    borderRadius: '10px'
                                }}
                            // onClick={() => onDelete(record.designation)}
                            >
                                <DeleteOutlined />
                            </Button>
                        </Col>

                    </Row>
                </>
            );
        },
    },
];

const dataSource = [
    {
        SL: '1',
        teamname: 'Sales Operations Representative',
        teamdescription: 'The sales operations representative position...',
        action: '',
    },

];

const onFinish = () => {

}



const TeamPage = () => {

    const [form] = Form.useForm();
    return (
        <>
            <Row style={{ display: 'flex', flexDirection: 'column', margin: '20px' }}>
                <Row>
                    <Col style={{ fontWeight: 600 }} span={24}>Team -  Sales Operation</Col>
                </Row>
                <Row>
                    <Col span={24}>Manages day-to-day operations of sales organization, such as forecasting and tool administration.</Col>
                </Row>
            </Row>
            <Table
                className="tableTab"
                columns={columns}
                dataSource={dataSource}
                size="middle"
                
            />
            {/* <Row>
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
                                        name="teamname"
                                        style={{ marginBottom: "20px" }}
                                        label={
                                            <label style={{ color: "black", fontWeight: "400" }}>
                                                Team Name<span style={{ color: "red" }}> *</span>
                                            </label>
                                        }

                                    >
                                        <Input

                                        />
                                    </Form.Item>

                                    <Form.Item required={false}

                                        labelAlign="left"
                                        name="teamdescription"
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
            </Row> */}
        </>
    )
}

export default TeamPage