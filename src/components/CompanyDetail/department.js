import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col, Select, Input, Form, Divider, Table, Modal } from "antd";
import { CloseOutlined, EditFilled } from "@ant-design/icons";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import "./companystyle.css";
import FormItem from "antd/es/form/FormItem";



// ------------------------------------------------------------------------------const part
const Department = () => {


// ---------------------------------usestate for adding Department
const [addDepartmentOpen, setAddDepartmentOPen] = useState(false);
const showAddDepartment = () => {
  setAddDepartmentOPen(true);
};
const handleOk = () => {
  setAddDepartmentOPen(false);
}
const handleCancel = () => {
  setAddDepartmentOPen(false);
}

// --------------------------------code for the table
  const data = [
    {
      key: '0',
      department: 'Sales',
      hod: 'Ram',
      totalemployees: '17',
      // description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
   
    {
      key: '1',
      department: 'Service',
      hod: 'Shyam',
      totalemployees: '27',
    },
  ];

  const columns = [
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
    },
    // Table.EXPAND_COLUMN,
    {
      title: 'H.O.D',
      dataIndex: 'hod',
      key: 'hod',
    },
    
    {
      title: 'Total Employees',
      dataIndex: 'totalemployees',
      key: 'totalemployees',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => {
        return (
          <>
            <Row>
              <Col>
                <Button><EditFilled /></Button>
              </Col>
            </Row>
          </>
        )
    },
   },
  ];
// -------------------------------code for extra data in expandable row
  const expandedRowRender = () => {
    const columns = [
      {
        title: 'Email ID',
        dataIndex: 'emailid',
        key: 'emailid',
      },
      {
        title: 'Phone No.',
        dataIndex: 'phoneno',
        key: 'phoneno',
      },
      
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: () => <a>Active</a>
      },
      
    ];
    const data = [];
    for (let i = 0; i < 1; ++i) {
      data.push({
        key: i.toString(),
        emailid: 'ram@gmail.com',
        phoneno: '+91658556552',
        status: 'Active',
      });
    }
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };

// --------------------------------------------------------------------------------Return part 
  return (
    <>

      <div
        className="personalCardDiv"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Form
          labelcol={{
            span: 4,
          }}
          wrappercol={{
            span: 14,
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
        >
          <Card
            title=" DEPARTMENT"
            extra={
              <>
                  <Button 
                    type="primary"
                    onClick={showAddDepartment}
                    >
                    Add Department
                  </Button>
              </>
            }
            style={{
              width: 800,
              marginTop: 10,
            }}
          >

            <div className="table-responsive">
              <Table
                columns={columns}
                dataSource={data}
                pagination={false}
                rowSelection={{}}
                // expandable={{
                //   expandedRowRender: (record) => (
                //     <p
                //       style={{
                //         margin: 0,
                //       }}
                //     >
                //       {record.description}
                //     </p>
                //   ),
                // }}
                expandable={{
                  expandedRowRender,
                  defaultExpandedRowKeys: ['0'],
                }}
              />
            </div>

          </Card>
          <Modal 
            title="Basic Modal" 
            open={addDepartmentOpen} 
            onOk={handleOk} 
            onCancel={handleCancel}
          >
           <Form>
            <Row gutter={[16,]}>
              <Col span={24}>
                <FormItem label=''>
                  <Input placeholder="Department Name"></Input>
                </FormItem>
              </Col>
              <Col span={24}>
                <FormItem>
                  <Input placeholder="H.O.D"></Input>
                </FormItem>
              </Col>
              <Col span={24}>
                <FormItem>
                  <Input placeholder="No. of Employee"></Input>
                </FormItem>
              </Col>
            </Row>
           </Form>
          </Modal>
        </Form>
      </div>
    </>
  )
}

export default Department