import React, { useState } from 'react'
import {
    Col,
    Row,
    Table,
    Button,


} from "antd";
import {
    DeleteOutlined,
    EditFilled,

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
        title: "Business Unit Name",
        dataIndex: "businessunitname",
        key: "businessunitname",
        width: 100,
        render: text => <a href="#">{text}</a>,
    },

    {
        title: "Business Unit Description",
        key: "businessunitdescription",
        dataIndex: "businessunitdescription",
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
        businessunitname: 'Health Care',
        businessunitdescription: 'Health care Business Unit Description',
        action: '',
    },

];


const BuisenessUnitPage = () => {

    const [form] = Form.useForm();
    return (
        <>
            <Table
                className="tableTab"
                columns={columns}
                dataSource={dataSource}
                size="middle"
                
            />

        </>
    )
}

export default BuisenessUnitPage