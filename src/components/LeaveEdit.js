import React from 'react'


const LeaveEdit = () => {
    const [editform] = Form.useForm();
    return (

        <Row
            className="apply-leave"
            style={{
                marginTop: "10px",
            }}
        >


            <Col xl={24} lg={24} md={24} sm={24} xs={24}
                style={{
                    background: "flex",
                    padding: "10px",
                    // width: "400px",
                }}
            >
                <Form
                    {...Leave}
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    initialValues={{
                        remember: true,


                    }}
                    form={editform}
                    onFinish={onFinishEditLeave}
                // layout="vertical"
                >

                    <Row gutter={[16, 0]} className='row-one-div' style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <Col xl={24} lg={24} md={24} sm={24} xs={24} >
                            <Form.Item

                                labelAlign="left"
                                style={{
                                    marginBottom: "20px",
                                    color: "white",

                                    minWidth: "70px",
                                }}
                                label={
                                    <label style={{ color: "black", fontWeight: "400" }}>
                                        Start Date<span style={{ color: "red" }}> *</span>
                                    </label>
                                }
                                name="editleavedateStart"
                            >
                                <DatePicker
                                    defaultValue={editedLeave.dateCalc == null ? null : moment(editedLeave.dateCalc[0], 'Do MMM, YYYY')}
                                    style={{ width: "100%" }}
                                    format="Do MMM, YYYY"
                                    onChange={(date, dateString) => {
                                        console.log('ondateChange', date, dateString, dateEnd)
                                        setDateStart(date);
                                        console.log('ondateChangeafter', dateEnd)
                                        onLeaveDateChange();
                                    }}
                                    disabledDate={disabledDate}
                                />
                            </Form.Item>
                        </Col>

                        <Col xl={24} lg={24} md={24} sm={24} xs={24} >
                            <Form.Item
                                labelAlign="left"
                                name="editleaveslotStart"
                                style={{ marginBottom: "25px", }}
                                className="div-slot"
                                label={
                                    <label style={{ color: "black", fontWeight: "400" }}>
                                        Start Slot<span style={{ color: "red" }}> *</span>
                                    </label>
                                }
                                rules={[{ message: "Please select an option!" }]}
                                initialValue={"Full Day"}
                                allowClear
                            >
                                <Select
                                    required
                                    defaultValue={"Full Day"}
                                    style={{ width: "100%" }}
                                    onChange={(e) => {
                                        setStartSlot(e);
                                        onLeaveDateChange();
                                    }}
                                >
                                    <Option value="Full Day">Full Day</Option>
                                    <Option value="Half Day">Half Day</Option>
                                </Select>
                                {/* <Radio.Group defaultValue="Full Day"
                          onChange={onLeaveSlotChange}
                      >
                          <Radio style={{ color: "black", fontWeight: '400' }} disabled={ dateSelected.length > 1 ? true:false } value="Half Day">Half Day</Radio>
                          <Radio style={{ color: "black", fontWeight: '400' }} value="Full Day" >Full Day</Radio>

                      </Radio.Group> */}
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={[16, 0]} className='row-one-div' style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                        <Col xl={24} lg={24} md={24} sm={24} xs={24} >
                            <Form.Item
                                labelAlign="left"
                                style={{ marginBottom: "20px", color: "white", }}
                                label={
                                    <label style={{ color: "black", fontWeight: "400" }}>
                                        End Date<span style={{ color: "red" }}> *</span>
                                    </label>
                                }
                                name="editLeavedateEnd"
                            >
                                <DatePicker
                                    defaultValue={editedLeave.dateCalc == null ? null : moment(editedLeave.dateCalc[1], 'Do MMM, YYYY')}
                                    style={{ width: "100%" }}
                                    format="Do MMM, YYYY"
                                    onChange={(date, dateString) => {
                                        console.log('ondateChange', date, dateString, dateEnd)
                                        setDateEnd(date);
                                        console.log('ondateChangeafter', dateEnd)
                                        onLeaveDateChange(date);
                                    }}
                                    disabledDate={disabledDate}
                                // disabled={disableEnd()}
                                />
                            </Form.Item>
                        </Col>


                    </Row>

                    <Form.Item
                        labelAlign="left"
                        name="editleaveNature"
                        style={{ marginBottom: "20px" }}
                        label={
                            <label style={{ color: "black", fontWeight: "400" }}>
                                Nature of Leave<span style={{ color: "red" }}> *</span>
                            </label>
                        }
                    >
                        <Select defaultValue={editedLeave.nature}
                            required
                            placeholder="Select a option "
                            allowClear
                            disabled={disableNature()}
                            onChange={onLeaveNatureChange}
                        >{leavedays != null ?
                            (Object.keys(leavedays).map((u) => (
                                <Option
                                    disabled={disabledLeaveNature(u)}
                                    value={u}
                                >
                                    {u}
                                </Option>
                            )))
                            : null}
                            <Option value={"Loss of Pay"}>Loss of Pay</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        initialValue={editedLeave.reason}
                        labelAlign="left"
                        name="editleavereason"
                        style={{ marginBottom: "20px" }}
                        label={
                            <label style={{ color: "black", fontWeight: "400" }}>
                                Reason<span style={{ color: "red" }}> *</span>{" "}
                            </label>
                        }
                    >
                        <Input.TextArea
                            maxLength={60}
                            onChange={(e) => {
                                const inputval = e.target.value;
                                const newVal =
                                    inputval.substring(0, 1).toUpperCase() +
                                    inputval.substring(1);
                                form.setFieldsValue({ reason: newVal });
                            }}
                            required
                        />
                    </Form.Item>

                    <Form.Item
                        labelAlign="left"
                        name="approver"
                        style={{ marginBottom: "20px" }}
                        label={
                            <label style={{ color: "black", fontWeight: "400" }}>
                                Approver<span style={{ color: "red" }}> *</span>
                            </label>
                        }
                        initialValue={repManager}
                    >
                        <Input
                            maxLength={20}
                            onChange={(e) => {
                                const inputval = e.target.value;
                                const newVal =
                                    inputval.substring(0, 1).toUpperCase() +
                                    inputval.substring(1);
                                form.setFieldsValue({ approver: newVal });
                            }}
                            // rules={[{ required: true }]}
                            // placeholder="Reporting Manager"
                            disabled
                        />
                    </Form.Item>

                    <Form.Item
                        style={{ paddingTop: "px" }}
                        wrapperCol={{
                            offset: 8,
                            span: 24,
                        }}
                    >
                        <Button type="primary" htmlType="submit"
                        // onClick={oncloseModal} 
                        >
                            {" "}
                            Submit{" "}


                        </Button>
                        <Button
                            htmlType="button"
                            style={{ marginLeft: "10px" }}
                            onClick={onReset}
                        >
                            Reset
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    )
}

export default LeaveEdit