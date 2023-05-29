import {
  Card,
  Form,
  InputNumber,
  Radio,
  Skeleton,
  Switch,
  Table,
  TimePicker,
} from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import {
  checkNumbervalue,
  showNotification,
} from "../../contexts/CreateContext";
import ConfigureContext from "../../contexts/ConfigureContext";
import { webClock } from "../../contexts/EmailContext";

const ConfigureAttendance = () => {
  const [configurations, setConfigurations] = useState({});
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [selectedDay, setSelectedDay] = useState({});
  const [loading, setLoading] = useState(true);

  const workingdays = [
    { days: "Monday" },
    { days: "Tuesday" },
    { days: "Wednesday" },
    { days: "Thursday" },
    { days: "Friday" },
    { days: "Saturday" },
    { days: "Sunday" },
  ];

  const handleFinish = (values) => {
    let temp = Object.keys(values);
    if (
      (temp.includes("starttime") || temp.includes("endtime")) &&
      values?.starttime == null &&
      values?.endtime == null
    ) {
      return;
    }
    let attendanceConfig = {
      ...configurations,
      ...values,
      starttime:
        values?.starttime?.format("HH:mm") || startTime.format("HH:mm"),
      endtime: values?.endtime?.format("HH:mm") || endTime.format("HH:mm"),
    };
    setStartTime(values?.starttime || startTime);
    setEndTime(values?.endtime || endTime);
    ConfigureContext.createConfiguration("attendanceConfig", {
      attendanceNature: attendanceConfig,
    })
      .then((response) => {
        // getAttendanceData();
        webClock();
      })
      .catch((error) => {
        showNotification("error", "Error", error.message);
      });
    // } else {
    //   showNotification("error", "Error", "Start Time cannot be after End Time!")
    // }
  };

  useEffect(() => {
    getAttendanceData();
  }, []);

  const getAttendanceData = async () => {
    setLoading(true);
    let data = await ConfigureContext.getConfigurations("attendanceConfig");
    setConfigurations(data?.attendanceNature);
    setSelectedDay(data?.attendanceNature?.selectedDay);
    setStartTime(moment(data?.attendanceNature?.starttime, "HH:mm"));
    setEndTime(moment(data?.attendanceNature?.endtime, "HH:mm"));
    console.log(data);
    setLoading(false);
  };

  const handleRadiochange = (value, data) => {
    let tempSelectedDay = {
      ...selectedDay,
      [data.days]: value,
    };
    setSelectedDay(tempSelectedDay);
    handleFinish({ selectedDay: tempSelectedDay });
  };

  const tableHeaders = [
    {
      title: "Days",
      dataIndex: "days",
      key: "days",
      align: "left",
    },
    {
      title: "Full Day",
      dataIndex: "fullday",
      key: "fullday",
      align: "left",
      render: (_, data) => {
        return (
          <Radio.Group
            onChange={(e) => handleRadiochange(e.target.value, data)}
            value={selectedDay[data.days]}
            // value={value4}
          >
            <Radio className="radio" value={`fullday`} />
          </Radio.Group>
        );
      },
    },
    {
      title: "Half Day",
      dataIndex: "halfday",
      key: "halfday",
      align: "left",
      render: (_, data) => {
        return (
          <Radio.Group
            onChange={(e) => handleRadiochange(e.target.value, data)}
            value={selectedDay[data.days]}
          >
            <Radio
              className="radio"
              // value={`halfday_${data.key}_${data.days}`}
              value={`halfday`}
            />
          </Radio.Group>
        );
      },
    },
    {
      title: "Dayoff",
      dataIndex: "dayoff",
      key: "dayoff",
      align: "left",
      render: (_, data) => {
        return (
          <Radio.Group
            onChange={(e) => handleRadiochange(e.target.value, data)}
            value={selectedDay[data.days]}
          >
            <Radio className="radio" value={`dayoff`} />
          </Radio.Group>
        );
      },
    },
  ];

  console.log(startTime?.format("HH:mm") || null);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card
        style={{
          width: "80%",
          borderRadius: "5px",
          marginBottom: "25px",
        }}
      >
        {loading ? (
          <Skeleton active />
        ) : (
          <Form
            labelCol={{
              span: 4,
              offset: 2,
            }}
            wrapperCol={{
              span: 14,
              offset: 1,
            }}
            layout="horizontal"
            initialValues={{
              remember: true,
            }}
              onValuesChange={handleFinish}
          >
            <Form.Item
              initialValue={startTime}
              name="starttime"
              className="time"
              label="Start Time"
              rules={[
                {
                  required: true,
                  message: "Please Enter Start Date",
                },
              ]}
            >
              <TimePicker
                onChange={(e) => setStartTime(e)}
                disabled={!endTime}
                disabledTime={() => ({
                  disabledHours: () => {
                    let temp = [
                      ...Array(
                        Number(endTime.format("HH:mm").substring(0, 2))
                      ).keys(),
                    ];
                    return [...Array(24).keys()].filter(
                      (i) => !temp.includes(i)
                    );
                  },
                })}
                defaultOpenValue={moment("00:00", "HH:mm")}
              />
            </Form.Item>
            <Form.Item
              initialValues={endTime}
              name="endtime"
              className="time"
              label="End Time"
              rules={[
                {
                  required: true,
                  message: "Please Enter End Date",
                },
              ]}
            >
              <TimePicker
                defaultValue={endTime}
                onChange={(e) => setEndTime(e)}
                disabled={!startTime}
                disabledTime={() => ({
                  disabledHours: () => [
                    ...Array(
                      Number(startTime?.format("HH:mm").substring(0, 2)) + 1
                    ).keys(),
                  ],
                })}
                defaultOpenValue={moment("00:00", "HH:mm")}
              />
            </Form.Item>
            {/* <div
                        style={{
                          fontWeight: "600",
                          fontSize: "14px",
                          marginLeft: "41px",
                        }}
                      >
                        Work Days
                      </div> */}
            {/* <Divider
                        style={{
                          borderTop: "2px solid #EAEAEA",
                          margin: "10px",
                        }}
                      /> */}

            <Form.Item
              // initialValue={moment(endTime, "HH:mm")}
              name="days"
              // className="time"
              label="Work Days"
              // rules={[
              //   {
              //     required: true,
              //     message: "Please Enter End Date",
              //   },
              // ]}
            >
              <Table
                className="weekDays"
                columns={tableHeaders}
                dataSource={workingdays || []}
                bordered
                pagination={false}
                size="small"
              />
            </Form.Item>
            <Form.Item
              label="Max Break Duration (hr)"
              name="maxBreakDuration"
              labelCol={{
                span: 7,
                offset: 2,
              }}
              wrapperCol={{
                span: 10,
                offset: 1,
              }}
              initialValue={configurations.maxBreakDuration}
            >
              <InputNumber
                min={0}
                max={5}
                onKeyPress={(event) => {
                  if (checkNumbervalue(event)) {
                    event.preventDefault();
                  }
                }}
              />
            </Form.Item>
            <Form.Item
              initialValue={configurations.inputclock}
              name="inputclock"
              label="Auto Clock Out"
              labelCol={{
                span: 6,
                offset: 2,
              }}
              wrapperCol={{
                span: 10,
                offset: 2,
              }}
            >
              <Switch
                checkedChildren="Enabled"
                unCheckedChildren="Disabled"
                defaultChecked={configurations.inputclock}
              />
            </Form.Item>
          </Form>
        )}
      </Card>
    </div>
  );
};

export default ConfigureAttendance;
