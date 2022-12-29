import React from 'react'
import {
    Button,
    Modal,
    Form,
    Table,
    Input,
    Row,
    Col,
    Card,
    message,
    Select,
    Space,
    Tag

} from "antd";
import moment from "moment";
import { PlusCircleOutlined, DeleteOutlined, EditFilled } from "@ant-design/icons"
import "../../components/assetManagement/RepairRequest.css"

const dataSource = [
    {
        key: '1',
        allotmentDate: '29/12/2022',
        lapname: 'Dell',
        serNum: 'ADFG555',
        doIssue: '1/1/2021',
        reason: 'Black Screen',
        status: 'Pending',
        model: 'Note Book',
        tags: ['nice', 'developer'],
    },

];

const columns = [
    {
        title: 'Date Of Allotment',
        dataIndex: 'allotmentDate',
        key: 'allotmentDate',
        width: 200,
    },
    {
        title: 'Laptop Name',
        dataIndex: 'lapname',
        key: 'lapname',
        width: 200,
    },
    {
        title: 'Laptop Modal',
        dataIndex: 'model',
        key: 'model',
        width: 200,
    },
    {
        title: 'Serial Number',
        dataIndex: 'serNum',
        key: 'serNum',
        width: 200,
    },

    {
        title: 'Date Of Repairing Request',
        dataIndex: 'doIssue',
        key: 'doIssue',
        width: 300,
    },
    {
        title: 'Reason',
        dataIndex: 'reason',
        key: 'reason',
        width: 200,
    },
    // {
    //     title: 'Tags',
    //     key: 'tags',
    //     dataIndex: 'tags',
    //     render: (_, { tags }) => (
    //         <>
    //             {tags.map((tag) => {
    //                 let color = tag.length > 5 ? 'geekblue' : 'green';
    //                 if (tag === 'loser') {
    //                     color = 'volcano';
    //                 }
    //                 return (
    //                     <Tag color={color} key={tag}>
    //                         {tag.toUpperCase()}
    //                     </Tag>
    //                 );
    //             })}
    //         </>
    //     ),
    // },
    {
        title: 'Photo',
        dataIndex: 'photo',
        key: 'photo',
        width: 200,
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <a>Invite {record.name}</a>
                <a>Delete</a>
            </Space>
        ),
    },
];





const RepairRequestTable = () => {
    return (
        <>
            <div className='laptopDiv'>
                        <Card
                            title="Laptop Request/Repair Request /Upgrade Request"
                            className="laptopcard"
                            bordered={true}
                            hoverable={true}
                        >
                            <Table
                                columns={columns}
                                pagination={false}
                                dataSource={dataSource}
                                scroll={{ x: 1500 }}
                                className="policies"
                            />
                        </Card>
            </div>
        </>
    )
}

export default RepairRequestTable