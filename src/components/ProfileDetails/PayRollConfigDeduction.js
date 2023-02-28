import React, { useState } from 'react';
import { Form, Input, Button, Drawer } from 'antd';
import { PlusCircleOutlined, MinusCircleOutlined, SaveOutlined } from '@ant-design/icons';

const PayRollConfigDeduction = () => {
    const [open, setOpen] = useState(false);
    const [fields, setFields] = useState([{ name: 'field', value: '' }]);
    const [form] = Form.useForm();

    const handleAddField = () => {
        const newFields = [...fields, { name: 'field', value: '' }];
        console.log(newFields);
        setFields(newFields);
    };

    const handleRemoveField = (index) => {
        const newFields = [...fields];
        newFields.splice(index, 1);
        setFields(newFields);
    };

    const onFinish = (values) => {
        console.log('Form values:', values);
        console.log('Fields:', fields);
    };

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const handleFieldChange = (index, key, value) => {
        const newFields = [...fields];
        newFields[index][key] = value;
        if (key === 'value') {
            newFields[index].name = value ? `Field ${index + 1}` : '';
        }
        setFields(newFields);
    };

    return (
        <>
            <Button onClick={showDrawer} className="bulkEmployee" type="primary">
                <div className="bulkButton">Deduction Configration</div>
            </Button>
            <Drawer title="Deduction" placement="right" onClose={onClose} visible={open}>
                <Form form={form} onFinish={onFinish}>
                    {fields.map((field, index) => (
                        <Form.Item key={index} name={`field-${index}`} >
                            <Input
                                name={`field-${index}`}
                                placeholder={`Field ${index + 1}`}
                                value={field.value}
                                onChange={(e) => handleFieldChange(index, 'value', e.target.value)}
                            />
                            {index > 0 && (
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
                    </Form.Item>
                </Form>
            </Drawer>
        </>
    );
};

export default PayRollConfigDeduction;