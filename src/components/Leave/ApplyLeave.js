import { AutoComplete, Button, Col, DatePicker, Form, Input, Modal, Row, Select } from "antd";
import { useEffect, useState } from "react";
import { capitalize, getUsers, showNotification } from "../../contexts/CreateContext";
import moment from "moment";
import LeaveContext from "../../contexts/LeaveContext";

const { Option } = Select;

const ApplyLeave = (props) => {

    const [form] = Form.useForm()
    const [empApply, setEmpApply] = useState(props.name);
    const [dateSelected, setDateSelected] = useState([]);
    const [repManager, setRepManager] = useState('');
    const [dateStart, setDateStart] = useState(null);
    const [dateEnd, setDateEnd] = useState(null);
    const [startSlot, setStartSlot] = useState("Full Day");
    const [endSlot, setEndSlot] = useState("Full Day");
    const [validleaverequest, setValidleaverequest] = useState("false");
    const [options, setOptions] = useState([]);
    const [allEmpName, setAllEmpName] = useState(props.allEmpName || []);
    const [allEmpMap, setAllEmpMap] = useState(props.allEmpMap || {});
  console.log(props);

  useEffect(() => {
    setAllEmpMap(props.allEmpMap);
    setAllEmpName(props.allEmpName);
    setEmpApply(props.name);
    console.log(props, empApply , props?.allEmpName?.length );
    console.log(props?.allEmpMap[`${props.name}`]);
    let temp = props.name != null && props?.allEmpName.length != 0 ? props?.allEmpMap[`${props.name}`][1] == '' ? props.name : props?.allEmpMap[`${props?.name}`][1] : ""
    // form.setFieldsValue({
    //   approver: temp
    // })
    console.log("Temp", temp);
    setRepManager(temp)
    form.resetFields();
    form.setFieldsValue({approver: temp})
    setDateSelected([]);
    setDateStart(null);
    setStartSlot(null);
    setDateEnd(null);
    setEndSlot(null);
    setValidleaverequest(false);
  }, [props.name, props.allEmpName])

    const onSearch = (searchText) => {
        if (searchText == "") {
        //   setEmpApply(null);
          form.resetFields();
          setDateStart(null);
          setEndSlot("Full Day");
          setValidleaverequest(false);
        //   onLeaveDateChange();
          return;
        }
        let matchingName = allEmpName.filter((ex) => {
          return ex.value.toLowerCase().includes(searchText.toLowerCase());
        });
        setOptions(!searchText ? [] : matchingName);
      };
    
  const validateLeaveRequest = (noOfDays, leavetype) => {
    if (leavetype != null && dateSelected.length - noOfDays > 0) {
      if (props.leavedays[leavetype] < dateSelected.length - noOfDays) {
        showNotification(
          "error",
          "Error",
          "Leave requested is more than available leave"
        );
        setValidleaverequest(false);
      } else {
        setValidleaverequest(true);
      }
    }
  };
  
  function disabledDate(current) {
    if (
      moment(current).day() === 0 ||
      current.day() === 6 ||
      moment(current).isBefore(moment().startOf("day"))
    ) {
      return true;
    }
    if (
      dateStart != null && dateStart != 0
        ? moment(current).isBefore(dateStart.startOf("day"))
        : false
    ) {
      return true;
    }
    if (props.tempDur.includes(moment(current).format("Do MMM, YYYY"))) {
      return true;
    }
    let matchOptionalHoliday = props.holidays?.filter((item) => {
      return item.optionalHoliday
        ? false
        : item.date == moment(current).format("Do MMM, YYYY");
    });
    if (matchOptionalHoliday.length != 0) {
      return true;
    }
    return false;
  }
    
  const onLeaveNatureChange = (value) => {
    if (value == "Optional Leave" || value == "Sick Leave") {
      if (dateSelected.length == 1) {
        validateLeaveRequest(endSlot == "Full Day" ? 0 : 0.5, value);
      } else {
        setValidleaverequest(false);
        showNotification(
          "error",
          "Error",
          `${value} can only be for 1 full day!`
        );
      }
      return;
    }
    let noOfDays = 0;
    if (endSlot != "Full Day") {
      noOfDays = 0.5;
    }
    if (startSlot != "Full Day") {
      noOfDays += 0.5;
    }
    validateLeaveRequest(noOfDays, value);
  };
  const onLeaveDateChange = (e) => {
    form.setFieldsValue({ leaveNature: null });
    // form1.setFieldsValue({ leaveNature: null });
    let tempDateEnd = dateEnd;
    if (e != undefined) {
      tempDateEnd = e;
    }
    let holidayList = props.holidays.map((hol) => {
      return !hol.optionalHoliday ? hol.date : null;
    });
    let temp = [];
    try {
      for (
        let i = dateStart.clone();
        i.isSameOrBefore(tempDateEnd);
        i = i.clone().add(1, "days")
      ) {
        let day = i.format("dddd");
        if (!(day == "Saturday" || day == "Sunday")) {
          if (
            !holidayList.includes(i.format("Do MMM, YYYY")) &&
            !props.tempDur.includes(i.format("Do MMM, YYYY"))
          ) {
            temp.push(i.format("Do MMM, YYYY"));
          }
        }
      }
    } catch (error) {}
    setDateSelected(temp);
  };
  const disableEnd = () => {
    if (dateStart == null) {
      // if (isEditModalOpen) {
        // form1.setFieldsValue({ dateEnd: null });
        // form1.setFieldsValue({ sloltEnd: "Full Day" });
      // } else {
        form.setFieldsValue({ dateEnd: null });
        form.setFieldsValue({ slotEnd: "Full Day" });
      // }
      return true;
    }
    return false;
  };
  const disableNature = () => {
    if (dateStart == null || dateEnd == null) {
      // if (isEditModalOpen) {
      //   // form1.setFieldsValue({ leaveNature: null });
      // } else {
        form.setFieldsValue({ leaveNature: null });
      // }
      return true;
    }
    return false;
  };
  const disableEndSlot = () => {
    if (dateStart == null || dateStart == 0) {
      return true;
    }
    if (
      dateEnd != null && dateEnd != 0
        ? dateStart.format("DDMMYYYY") == dateEnd.format("DDMMYYYY")
        : false
    ) {
      return true;
    }
    return false;
  };
  const disabledLeaveNature = (u) => {
    if (props.leavedays[u] <= 0) {
      return true;
    }
    if (
      (u == "Optional Leave" || u == "Sick Leave") &&
      dateSelected.length > 1
    ) {
      return true;
    }
    if (u == "Optional Leave" && dateSelected.length == 1) {
      let holidayMatch = props.holidays.filter((hol) =>
        hol.optionalHoliday ? hol.date == dateSelected[0] : false
      );
      return !(holidayMatch.length > 0);
    }
    if (u == "Sick Leave" && dateSelected.length == 1) {
      return dateStart != null || dateStart != undefined
        ? !(
            dateStart.format("DD-MM-yyyy") == moment().format("DD-MM-yyyy") ||
            dateStart.format("DD-MM-yyyy") ==
              moment().add(1, "days").format("DD-MM-yyyy")
          )
        : false;
    }
    return false;
  };

  
  const onFinish = (values) => {
    if (values.leaveNature === "Optional Leave") {
      let optionalHolidays = props.holidays.filter((item) => {
        return item.optionalHoliday;
      });
      let matchOptionalHoliday = optionalHolidays.filter((item) => {
        return item.date == dateSelected[0];
      });
      if (
        matchOptionalHoliday.length > 0 &&
        values.leaveNature != "Optional Leave"
      ) {
        showNotification(
          "error",
          "Error",
          "Optional Leave Can only be apply on Optional Holiday"
        );
        return;
      }
    }
    let matchingdates = dateSelected.filter((item) => props.duration.includes(item));
    if (matchingdates.length > 0) {
      showNotification(
        "error",
        "Error",
        "Leave already applied on one of the days"
      );
      return;
    }
    let newLeave = {
      empId: allEmpMap[empApply][0],
      approver: values.approver || empApply,
      date: dateSelected,
      name: empApply,
      nature: values.leaveNature,
      slotStart: values.slotStart,
      slotEnd: dateSelected.length == 1 ? values.slotStart : values.slotEnd,
      reason: values.reason,
      status: "Pending",
    };
    if (validleaverequest) {
      LeaveContext.createLeave(newLeave)
        .then((response) => {
          // getData();
          showNotification("success", "Success", "Leave apply successfully");
          props.setApplyModal(false)
          form.resetFields();
          form.setFieldsValue({approver: props?.name == null ? '' : repManager})
          setDateSelected([]);
          setDateStart(null);
          setStartSlot(null);
          setDateEnd(null);
          setEndSlot(null);
          setValidleaverequest(false);
        })
        .catch((error) => {
          console.log(error);
          showNotification(
            "error",
            "Error",
            "Unable to process leave request!"
          );
        });
        props.setApplyModal(false)
        form.resetFields();
        form.setFieldsValue({approver: props?.name == null ? '' : repManager})
        setDateSelected([]);
        setDateStart(null);
        setStartSlot(null);
        setDateEnd(null);
        setEndSlot(null);
        setValidleaverequest(false);
    } else {
      console.log("error");
      showNotification("error", "Error", "Unable to process leave request!");
    }
  };

  return (
    <Modal
      className="modal-window"
      bodyStyle={{
        overflowY: "auto",
        maxHeight: "calc(100vh - 200px)",
      }}
      footer={null}
      title={`Apply ${props.name == null ? "Employee " : ""}Leave`}
      centered
      destroyOnClose
      open={props.applyModal}
      width={450}
      closeIcon={
        <div
          onClick={() => {
            props.setApplyModal(false)
            form.resetFields();
            form.setFieldsValue({approver: props?.name == null ? '' : repManager})
            setDateSelected([]);
            setDateStart(null);
            setStartSlot(null);
            setDateEnd(null);
            setEndSlot(null);
            setValidleaverequest(false);
          }}
          style={{ color: "#ffffff" }}
        >
          X
        </div>
      }
    >
      <Row
        className="apply-leave"
        style={{
          marginTop: "10px",
        }}
      >
        <Col
          xl={24}
          lg={24}
          md={24}
          sm={24}
          xs={24}
          style={{
            background: "flex",
            padding: "10px",
          }}
        >
            {console.log(props)}
            
          <Form
            // name="applyForm"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            form={form}
            onFinish={onFinish}
          >
            <Row
              gutter={[16, 0]}
              className="row-one-div"
              style={{
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              {props?.name == null ? <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                <Form.Item
                  required={false}
                  labelAlign="left"
                  style={{
                    marginBottom: "20px",
                    color: "white",
                    minWidth: "70px",
                  }}
                  label={
                    <label style={{ color: "black", fontWeight: "400" }}>
                      Employee Name
                      <span style={{ color: "red" }}> *</span>
                    </label>
                  }
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter Name",
                    },
                  ]}
                >
                  <AutoComplete
                    // bordered={false}
                    allowClear
                    options={options}
                    onSearch={onSearch}
                    onSelect={(e) => {
                    //   onLeaveDateChange();
                      // console.log(e)
                    //   setEmpApply(e);
                      if (e == null) {
                        form.setFieldsValue({ dateStart: null });
                        setEndSlot("Full Day");
                        form.setFieldsValue({ approver: "" });
                        setValidleaverequest(false);
                      } else {
                        let name = allEmpMap[`${e}`][1] == '' ? props.name : allEmpMap[`${e}`][1]
                        form.setFieldsValue({
                          approver: name,
                        });
                      }
                    }}
                  />
                  {/* <DatePicker
                            style={{ width: "100%", backgroundColor: "#ffffff" }}
                            format="Do MMM, YYYY"
                            onChange={(e) => {
                              setDateStart(e);
                              onLeaveDateChange();
                              if (e == null) {
                                setDateEnd(e);
                                setEndSlot("Full Day");
                                setValidleaverequest(false)
                              }
                            }}
                            disabledDate={disabledDate}
                          /> */}
                </Form.Item>
              </Col> : null}
              <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                <Form.Item
                  required={false}
                  labelAlign="left"
                  style={{
                    marginBottom: "20px",
                    color: "white",
                    minWidth: "70px",
                  }}
                  label={
                    <label style={{ color: "black", fontWeight: "400" }}>
                      Start Date
                      <span style={{ color: "red" }}> *</span>
                    </label>
                  }
                  name="dateStart"
                  rules={[
                    {
                      required: true,
                      message: "Please Select Date",
                    },
                  ]}
                >
                  <DatePicker
                    style={{ width: "100%" }}
                    format="Do MMM, YYYY"
                    onChange={(e) => {
                      setDateStart(e);
                      onLeaveDateChange();
                      // if (e == null) {
                        setDateEnd(e);
                        setEndSlot("Full Day");
                        setValidleaverequest(false);
                      // }
                    }}
                    disabled={empApply == null}
                    disabledDate={disabledDate}
                  />
                </Form.Item>
              </Col>
              <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                <Form.Item
                  labelAlign="left"
                  name="slotStart"
                  style={{ marginBottom: "25px" }}
                  className="div-slot"
                  label={
                    <label style={{ color: "black", fontWeight: "400" }}>
                      Start Slot
                      <span style={{ color: "red" }}> *</span>
                    </label>
                  }
                  initialValue={"Full Day"}
                >
                  <Select
                    style={{ width: "100%" }}
                    disabled={empApply == null}
                    onChange={(e) => {
                      setStartSlot(e);
                      onLeaveDateChange();
                    }}
                  >
                    <Option value="Full Day">Full Day</Option>
                    <Option value="Half Day (First Half)">
                      Half Day (First Half)
                    </Option>
                    <Option value="Half Day (Second Half)">
                      Half Day (Second Half)
                    </Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row
              gutter={[16, 0]}
              className="row-one-div"
              style={{
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                <Form.Item
                  required={false}
                  labelAlign="left"
                  style={{ marginBottom: "20px", color: "white" }}
                  label={
                    <label style={{ color: "black", fontWeight: "400" }}>
                      End Date<span style={{ color: "red" }}> *</span>
                    </label>
                  }
                  name="dateEnd"
                  rules={[
                    {
                      required: true,
                      message: "Please Select Date",
                    },
                  ]}
                >
                  <DatePicker
                    style={{ width: "100%" }}
                    format="Do MMM, YYYY"
                    onChange={(e) => {
                      setDateEnd(e);
                      onLeaveDateChange(e);
                    }}
                    disabledDate={disabledDate}
                    disabled={disableEnd()}
                  />
                </Form.Item>
              </Col>

              <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                <Form.Item
                  labelAlign="left"
                  name="slotEnd"
                  style={{ marginBottom: "25px" }}
                  className="div-slot"
                  label={
                    <label style={{ color: "black", fontWeight: "400" }}>
                      End Slot<span style={{ color: "red" }}> *</span>
                    </label>
                  }
                  initialValue={"Full Day"}
                >
                  <Select
                    style={{ width: "100%" }}
                    disabled={disableEndSlot()}
                    onChange={(e) => {
                      setEndSlot(e);
                      onLeaveDateChange();
                    }}
                  >
                    <Option value="Full Day">Full Day</Option>
                    <Option value="Half Day (First Half)">
                      Half Day (First Half)
                    </Option>
                    <Option value="Half Day (Second Half)">
                      Half Day (Second Half)
                    </Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              required={false}
              labelAlign="left"
              name="leaveNature"
              style={{ marginBottom: "20px" }}
              label={
                <label style={{ color: "black", fontWeight: "400" }}>
                  Nature of Leave
                  <span style={{ color: "red" }}> *</span>
                </label>
              }
              rules={[
                {
                  required: true,
                  message: "Select Nature of Leave",
                },
              ]}
            >
              <Select
                placeholder="Select an option"
                allowClear
                disabled={disableNature()}
                onChange={onLeaveNatureChange}
              >
                {props?.leavedays != null
                  ? Object.keys(props?.leavedays).map((u) => (
                      <Option 
                      disabled={disabledLeaveNature(u)} 
                      value={u}>
                        {u}
                      </Option>
                    ))
                  : null}
                {/* <Option value={"Loss of Pay"}>Loss of Pay</Option> */}
              </Select>
            </Form.Item>

            <Form.Item
              required={false}
              labelAlign="left"
              name="reason"
              style={{ marginBottom: "20px" }}
              label={
                <label style={{ color: "black", fontWeight: "400" }}>
                  Reason<span style={{ color: "red" }}> *</span>{" "}
                </label>
              }
              rules={[
                {
                  required: true,
                  message: "Please Enter a Reason",
                },
              ]}
            >
              <Input.TextArea
                maxLength={60}
                onChange={(e) => {
                  const str = e.target.value;
                  const caps = str.split(". ").map(capitalize).join(". ");
                  form.setFieldsValue({ reason: caps });
                }}
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
              // initialValue={empApply != null ? allEmpMap[`${empApply}`][1] : ""}
            >
              <Input disabled />
            </Form.Item>

            <Form.Item
              style={{ paddingTop: "px" }}
              wrapperCol={{
                offset: 8,
                span: 24,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button
                htmlType="button"
                type="default"
                style={{ marginLeft: "10px" }}
                onClick={() => {
                  form.resetFields();
                  form.setFieldsValue({approver: repManager})
                  setDateSelected([]);
                  setDateStart(null);
                  setStartSlot(null);
                  setDateEnd(null);
                  setEndSlot(null);
                  setValidleaverequest(false);
                }}
              >
                Reset
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Modal>
  );
};

export default ApplyLeave;
