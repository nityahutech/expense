// ------------------------------------Place for import
import React from "react";

import { useState } from "react";

import { Card, Col, Row, Input, DatePicker, Button } from "antd";

import {
  PlusCircleOutlined,
  CloseOutlined,
  CheckOutlined,
  EditTwoTone,
} from "@ant-design/icons";

// ----------------------------------------place for const declaration

const onChange = (date, dateString) => {
  console.log(date, dateString);
};

// --------------------------------------place for functions

function Education() {
  const [editContent, showEditContent] = useState(false);

  return (
    <div className="education" style={{ margin: "10px" }}>
      <Card title="Educational Info">
        <Row>
          <Col span={24}>
            <Button type="text" onClick={() => showEditContent(!editContent)}>
              <PlusCircleOutlined />
              Add
            </Button>
          </Col>
        </Row>

        {editContent === true ? (
          <Row>
            <Col span={24}>
              {" "}
              <Input placeholder="Course Name" />{" "}
            </Col>

            <Col span={8}>
              {" "}
              <Input placeholder="Course Name" />{" "}
            </Col>

            <Col span={8}>
              {" "}
              <Input placeholder="Course Type" />{" "}
            </Col>

            <Col span={8}>
              {" "}
              <Input placeholder="Stream" />{" "}
            </Col>

            <Col span={8}>
              <DatePicker
                onChange={onChange}
                placeholder="Course Start Date"
                style={{ width: "100%" }}
              />
            </Col>

            <Col span={8}>
              <DatePicker
                onChange={onChange}
                placeholder="Course End Date"
                style={{ width: "100%" }}
              />
            </Col>

            <Col span={8}>
              {" "}
              <Input placeholder="College Name" />{" "}
            </Col>

            <Col span={8}>
              {" "}
              <Input placeholder="University Name" />{" "}
            </Col>

            <Col span={24} style={{ textAlign: "right" }}>
              <Button onClick={() => showEditContent(!editContent)}>
                <CloseOutlined />
                Cancel
              </Button>
              <Button
                type="primary"
                style={{ width: "100px", marginLeft: "10px" }}
              >
                <CheckOutlined />
                Save
              </Button>
            </Col>
          </Row>
        ) : null}
      </Card>
      <Card title="Educatonal Info" extra={<EditTwoTone />}>
        <Row>
          <Col span={24}>
            {" "}
            <Input placeholder="Course Name" />{" "}
          </Col>

          <Col span={3}>
            {" "}
            <Input placeholder="Course Name" />{" "}
          </Col>

          <Col span={21}>
            {" "}
            <Input placeholder="Course Name" />{" "}
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default Education;
