import React, {useState} from 'react'
import { Button, Table, Card, Input, Select } from 'antd';
const { Search } = Input;

const columns = [
  {
    title: 'Employee Code',
    dataIndex: 'empcode',
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Designation',
    dataIndex: 'designation',
  },
  {
    title: 'No. of Approvers',
    dataIndex: 'Approvers',
  },
  {
    title: 'List of Approvers',
    dataIndex: 'listApprovers',
  },
];
const data = [
    {
        key: 1,  
        empcode: 32,
        name: "saswat",
        designation: "Trainee Software Developer",
        Approvers: 2,
        listApprovers: "HR",
      },
      {
        key: 2,  
        empcode: 32,
        name: "Rahul",
        designation: "Software Developer L1",
        Approvers: 2,
        listApprovers: "HR",
      },
];

const ApprovalConfig = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
 
  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  return (
    <Card
    title="Default size card"
    extra={
    <>
     <div style={{display:"flex"}}>
     <Search
      placeholder="input search text"
    />
      <Select
      defaultValue="Trainee"
      placeholder="Filter by Name"
      style={{ marginLeft:"10px",width:"250px" }}
      options={[
        {
          value: 'Trainee',
          label: 'Trainee',
        },
        {
          value: 'Trainee Software Developer',
          label: 'Trainee Software Developer',
        },
        {
          value: 'Junior Software Developer',
          label: 'Junior Software Developer',
        },
      ]}
    />
        <Button type="primary"  disabled={!hasSelected} style={{marginLeft:"10px"}} >
          Edit
        </Button>
      </div>
    </>}
    style={{borderRadius:"10px"}}
    >
      <Table 
        rowSelection={rowSelection} 
        columns={columns} 
        dataSource={data} 
        pagination={false}
        />
    </Card>
  );
};


export default ApprovalConfig
