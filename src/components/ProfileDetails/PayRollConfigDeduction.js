import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Drawer, Modal, notification } from 'antd';
import { PlusCircleOutlined, MinusCircleOutlined, SaveOutlined, FastForwardFilled } from '@ant-design/icons';
import ConfigureContext from '../../contexts/ConfigureContext';
import {
    showNotification,

} from "../../contexts/CreateContext";

const PayRollConfigDeduction = (props) => {
    const [open, setOpen] = useState(false);
    const page = "salary";
    const [fields, setFields] = useState([props.data]);
    const [form] = Form.useForm();

    const handleAddField = () => {
        const newFields = [...fields, ""];
        setFields(newFields);
    };

    useEffect(() => {
        setFields(props.data)
    }, [props.data])

    const handleRemoveField = (index) => {
        Modal.confirm({
            title: "Are you sure you want to delete this field?",
            okText: "Yes",
            okType: "danger",
            onOk: () => {
                const newFields = [...fields];
                newFields.splice(index, 1);
                setFields(newFields);
                notification.success({
                    message: "Field removed",
                    description: `The ${props.data[index]} has been removed successfully.`,
                });
            },
            onCancel: () => { },
        });
    };


    const onFinish = (values) => {
        let deductionConfig = [...fields]
        ConfigureContext.createConfigurationsDeduction(page, {
            Deduction: deductionConfig,
        })
            .then((respnse) => {
                showNotification("success", "Success, Earning  Added",)
                form.resetFields();
                setFields(['']);
                setOpen(false)
            })
            .catch((error) => {
                showNotification("error", "Error ",);
            });
    };


    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const handleFieldChange = (index, value) => {
        let newFields = [...fields];
        newFields[index] = value;
        setFields(newFields);
    };

    const resetForm = () => {
        form.resetFields();
        setFields([{ name: 'field', value: '' }]);
    }

    return (
        <>
            <Button onClick={showDrawer} className="bulkEmployee" type="primary">
                <div >Deduction Configration</div>
            </Button>
            <Drawer title="Deduction" placement="right" onClose={onClose} open={open}>
                <Form form={form} onFinish={onFinish} initialValues={[props.data]}>
                    {fields.map((field, index) => (
                        <Form.Item key={index} name={`field-${index + 100}`} >
                            <Input
                                name={`field-${index}`}
                                placeholder={`Field ${index + 1}`}
                                value={field}
                                onChange={(e) => handleFieldChange(index, e.target.value)}
                            />
                            {index > -1 && (
                                <Button
                                    type="link"
                                    danger
                                    icon={<MinusCircleOutlined />}
                                    onClick={() => handleRemoveField(index)}
                                >
                                    Remove
                                </Button>
                            )}
                        </Form.Item>
                    ))}
                    <Button type="dashed" icon={<PlusCircleOutlined />} onClick={handleAddField} block>
                        Add Field
                    </Button>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" icon={<SaveOutlined />} style={{ marginTop: '16px' }}>
                            Save
                        </Button>
                        <Button type="primary" onClick={resetForm} style={{ marginLeft: '16px' }}>Reset </Button>
                    </Form.Item>
                </Form>
            </Drawer>
        </>
    );
};

export default PayRollConfigDeduction;