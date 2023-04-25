import { useEffect } from "react";
import { Col, Row, Form, Button, Input, Space } from "antd";

function Editclient(props) {
    console.log('props', props?.record?.regCompName)
    const [form] = Form.useForm()
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
        console.log('values', values)
        const editCompanyName = {
            clientName: values.clientName,
            project: values.project,
            poc: values.poc
        }
        console.log('values', editCompanyName)

        props.setIsModalVisible(false);
        form.resetFields()
    }

    useEffect(() => {
        form.setFieldsValue({
            clientName: props?.record?.regCompName,
        });

    }, [props?.record?.regCompName])

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
                            onKeyPress={(event) => {
                                if (checkAlphabets(event)) {
                                    event.preventDefault();
                                }
                            }}
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
                                style={{
                                    border: "1px solid #8692A6",
                                    borderRadius: "4px",
                                }}


                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={24}>
                        <Form.Item
                            name="project"
                            label="Project Name"
                            onKeyPress={(event) => {
                                if (checkAlphabets(event)) {
                                    event.preventDefault();
                                }
                            }}
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
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={24}>
                        <Form.Item
                            name="poc"
                            label="Point Of Contact&nbsp;"
                            onKeyPress={(event) => {
                                if (checkAlphabets(event)) {
                                    event.preventDefault();
                                }
                            }}
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
                            htmlType='submit'
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
