import { useEffect } from "react";
import { Col, Row, Form, Button, Input, Space } from "antd";
import {
    checkNumbervalue, showNotification, capitalize
} from "../../contexts/CreateContext";
import ClientContext from "../../contexts/ClientContext";


function Editclient(props) {
    console.log("props", props?.record?.id);
    const [form] = Form.useForm();
    const cancelStyle = {
        border: "1px solid #1565D8",
        color: "#1565D8",
        fontWeight: "600",
        fontSize: "14px",
        lineHeight: "17px",
        width: "99px",
    };
    const buttonStyle = {
        border: "1px solid #1565D8",
        background: "#1565D8",
        color: "#ffffff",
        fontWeight: "600",
        fontSize: "14px",
        lineHeight: "17px",
        width: "99px",
    };

    const checkAlphabets = (event) => {
        if (!/^[a-zA-Z ]*$/.test(event.key) && event.key !== "Backspace") {
            return true;
        }
    };

    const onCancel = () => {
        props.setIsModalVisible(false);
    };

    const handleFinish = (values) => {
        console.log("values", values);
        const editClient = {
            regCompName: values.clientName,
            project: values.project,
            poc: values.poc,
            domain: values.domain,
            phone: values.phone,
            // {pocAccess: ["admin"]}
        };
        try {
            ClientContext.updateClient(editClient, props?.record?.id)
            showNotification("success", "Success", "Client Updated Successfully")
        }
        catch (error) {
            console.log('error', error)
            showNotification("error", "Error", "Failed to updateClient!")
        }
        console.log("values", editClient);
        props.setIsModalVisible(false);
        form.resetFields();
    };

    useEffect(() => {
        form.setFieldsValue({
            clientName: props?.record?.regCompName,
            phone: props.record?.phone,
            domain: props.record?.domain,
            project: props.record?.project,
            poc: props.record?.poc
        });
    }, [props?.record?.regCompName]);

    return (
        <>
            <Form
                layout="vertical"
                form={form}
                initialValues={{
                    remember: true,
                }}
                onFinish={handleFinish}
                autoComplete="off"
            >
                <Row gutter={[0, 0]}>
                    <Col xs={24} sm={24} md={24}>
                        <Form.Item
                            name="clientName"
                            label="Client Name&nbsp;"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter Client Name",
                                },
                                {
                                    pattern: /^[a-zA-Z\s]*$/,
                                    message: "Please enter Valid Name",
                                },
                            ]}
                        >
                            <Input
                                maxLength={20}
                                placeholder="Please Enter Client Name"
                                style={{
                                    border: "1px solid #8692A6",
                                    borderRadius: "4px",
                                }}
                                onChange={(e) => {
                                    const str = e.target.value;
                                    const caps = str.split(" ").map(capitalize).join(" ");
                                    form.setFieldsValue({ clientName: caps });
                                }}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={24}>
                        <Form.Item
                            name="project"
                            label="Project Name"
                            rules={[
                                {
                                    required: false,
                                    message: "Please enter Project Name",
                                },
                                {
                                    pattern: /^[a-zA-Z\s]*$/,
                                    message: "Please enter Valid Name",
                                },
                            ]}
                        >
                            <Input
                                style={{ border: "1px solid #8692A6", borderRadius: "4px" }}
                                maxLength={20}
                                placeholder="Enter Your Project Name"
                                onChange={(e) => {
                                    const str = e.target.value;
                                    const caps = str.split(" ").map(capitalize).join(" ");
                                    form.setFieldsValue({ project: caps });
                                }}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={24}>
                        <Form.Item
                            name="poc"
                            label="Point Of Contact&nbsp;"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter Poc",
                                },
                                {
                                    pattern: /^[a-zA-Z\s]*$/,
                                    message: "Please enter Poc",
                                },
                            ]}
                        >
                            <Input
                                style={{ border: "1px solid #8692A6", borderRadius: "4px" }}
                                maxLength={20}
                                placeholder="Enter Poc"
                                onChange={(e) => {
                                    const str = e.target.value;
                                    const caps = str.split(" ").map(capitalize).join(" ");
                                    form.setFieldsValue({ poc: caps });
                                }}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={24}>
                        <Form.Item
                            name="domain"
                            label="Email"
                            rules={[
                                {
                                    required: true,
                                    message: "Please Enter Email Id",
                                    type: "email",
                                },
                                {
                                    message: "Please enter Valid Email",
                                },
                            ]}
                        >
                            <Input
                                maxLength={30}
                                placeholder="Email Name"
                                style={{
                                    border: "1px solid #8692A6",
                                    borderRadius: "4px",
                                }}

                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={24}>
                        <Form.Item
                            name="phone"
                            label="Phone"
                            onKeyPress={(event) => {
                                if (checkNumbervalue(event)) {
                                    event.preventDefault();
                                }
                            }}
                            rules={[
                                {
                                    required: true,
                                    message: "Please Enter Phone Number",
                                },
                                {
                                    pattern: /^[0-9]\d{9}$/,
                                    message: "Please Enter Valid Number",
                                },
                            ]}
                        >
                            <Input
                                maxLength={10}
                                placeholder="Phone"
                                style={{
                                    border: "1px solid #8692A6",
                                    borderRadius: "4px",
                                }}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "end",
                        marginTop: "13px",
                    }}
                >
                    <Space>
                        <Button style={cancelStyle} onClick={onCancel}>
                            Cancel
                        </Button>
                        <Button
                            style={buttonStyle}
                            // onClick={submitEdit}
                            htmlType="submit"
                        >
                            Submit
                        </Button>
                    </Space>
                </div>
            </Form>
        </>
    );
}

export default Editclient;
