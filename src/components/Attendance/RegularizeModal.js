import { Button, Col, Form, Input, Modal, Row, Space } from "antd";
import { capitalize } from "../../contexts/CreateContext";

const RegularizeModal = (props) => {
  const [form] = Form.useForm();

  const handleFinish = (value) => {
    if (props.role == 'admin') {let status = "Approved"};
    console.log(value);
  }

  return (
        <Modal
            className="regularize"
            title="Regularize Attendance"
            open={props.regularizeOpen}
            footer={null}
            closeIcon={
                <div onClick={props.handleCancel} style={{ color: "#ffffff" }}>
                    X
                </div>
            }
        >
            <Form form={form} onFinish={(e) => {
                props.handleFinish(e)
                form.resetFields()
            }}>
                <Row gutter={[0, 24]}>
                    <Col span={24}>
                        <span className="approvalText">
                        {"Get Approval For " +
                            `${props.name}` +
                            " on " +
                            `${props.date}`}
                        </span>
                    </Col>
                    <Col span={24}>
                        <span style={{ fontWeight: "600", fontSize: "16px" }}>Reason</span>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            name="reason"
                            rules={[{
                                required: true,
                                message: "Please enter a reason"
                            }]}
                        >
                        <Input
                            onChange={(e) => {
                                const str = e.target.value;
                                const caps = str.split(" ").map(capitalize).join(" ");
                                form.setFieldsValue({
                                    reason: caps,
                                });
                            }}
                        />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "end",
                                marginRight: "7px",
                            }}
                        >
                            <Space>
                                <Form.Item>
                                    <Button
                                        onClick={props.handleCancel}
                                        style={{
                                        border: "1px solid #1963a6",
                                        color: "#1963a6",
                                        fontWeight: "600",
                                        fontSize: "14px",
                                        lineHeight: "17px",
                                        width: "99px",
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                </Form.Item>
                                <Form.Item>
                                    <Button
                                        htmlType="submit"
                                        style={{
                                        border: "1px solid #1963a6",
                                        background: "#1963a6",
                                        color: "#ffffff",
                                        fontWeight: "600",
                                        fontSize: "14px",
                                        lineHeight: "17px",
                                        width: "99px",
                                        }}
                                    >
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Space>
                        </div>
                    </Col>
                </Row>
            </Form>
        </Modal>
    )
}

export default RegularizeModal