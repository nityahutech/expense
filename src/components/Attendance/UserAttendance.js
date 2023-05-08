import { Tabs } from "antd"
import { useState } from "react";
import MonthlyLog from "./MonthlyLog";

const UserAttendance = (props) => {
  const [activetab, setActivetab] = useState("1");
  return (
        <div className="hrtab">
        <Tabs
            className="page-tabs"
            defaultActiveKey={activetab}
            activeKey={activetab}
            onChange={(tabKey) => {
              setActivetab(tabKey);
            }}
        >
        <Tabs.TabPane tab="My Attendance" key="1">
          <MonthlyLog />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab="Add Report"
          key="4"
          className="reportTabs"
          // onClick={() => {
          //   setIsModalOpen(true);
          // }}
        >
          {/* <Form
            {...layout}
            form={form}
            name="control-hooks"
            onFinish={onFinish}
            className="formItem"
          >
            <Form.Item
              name="date"
              label="Date"
              rules={[
                {
                  required: true,
                },
              ]}
              className="pname"
            >
              <DatePicker
                disabledDate={(current) => current.isAfter(moment())}
                format={"DD-MM-YYYY"}
                style={{ width: "50%" }}
              />
            </Form.Item>
            <Form.Item
              name="project_name"
              label="Project Name"
              rules={[
                {
                  required: true,
                },
              ]}
              className="pname"
            >
              <Input className="name" />
            </Form.Item>
            <Form.Item
              name="project_details"
              label="Project Details"
              rules={[
                {
                  required: true,
                },
              ]}
              className="pname"
            >
              <Input className="name" />
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit" className="submit">
                Submit
              </Button>
              <Button
                htmlType="button"
                onClick={onReset}
                className="reset"
              >
                Reset
              </Button>
            </Form.Item>
          </Form> */}
          {/* </Modal> */}
        </Tabs.TabPane>
        </Tabs>
       </div>
    )
}

export default UserAttendance