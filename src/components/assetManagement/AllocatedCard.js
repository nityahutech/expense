import React, { useState, useRef } from 'react'
import {
    Card, Button, Row, Col,
    Descriptions, message, Input, Space, Form, Carousel, DatePicker, Select,

} from 'antd';
import hutechlogo from "../../images/hutechlogo.png";
import laptop from "../../images/laptop.jpg";
import { EditFilled, CloseOutlined, CheckOutlined, UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import {
    capitalize,
} from "../../contexts/CreateContext";
import UploadImage from './UploadImage';
const { Option } = Select;

const resetButton = {
    border: "1px solid #1565D8",
    color: "#1565D8",
    fontWeight: "600",
    fontSize: "14px",
    lineHeight: "17px",
    width: "99px",
    marginTop: "10px",
    cursor: "pointer",

}
const submitButton = {
    border: "1px solid #1565D8",
    background: "#1565D8",
    color: "#ffffff",
    fontWeight: "600",
    fontSize: "14px",
    lineHeight: "17px",
    width: "99px",
    marginTop: "10px",
    cursor: "pointer",
    marginLeft: "17px",
}



const modal = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed',
    top: '0',
    left: '0',
    width: ' 100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: '100'

}

const modalContent = {
    backgroundColor: 'white',
    border: '1px solid black',
    width: '80%',
    height: '80%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: '10px',
    padding: '10px'


}

const modalContent2 = {
    backgroundColor: 'white',
    border: '1px solid black',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: '10px',



}



const AllocatedCard = () => {
    const [file, setFile] = useState("");
    const [form] = Form.useForm();
    const [editContactInfo, showEditCompanyInfo] = useState(false);
    const [data, setData] = useState([]);
    const [dob, setDob] = useState("");

    const onFinish = (values) => {
        console.log('form', values)

    }

    const images = [
        { hutechlogo },
        { laptop },
        { laptop },
    ];


    return (
        <>
            <div
                className="personalCardDiv"
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Row
                    className="Row-Card"
                    style={{
                        width: "75%",
                        margin: "10px",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <Col span={24}>
                        <Form
                            form={form}
                            labelcol={{
                                span: 4,
                            }}
                            wrappercol={{
                                span: 14,
                            }}
                            initialValues={{
                                remember: true,
                            }}
                            autoComplete="off"
                            onFinish={onFinish}
                        >

                            <Card

                                title=" Laptop Allotment "
                                className="overview"
                                hoverable={true}
                                bordered={true}
                                // loading={loading}
                                extra={
                                    <>
                                        {editContactInfo === false ? (
                                            <Button
                                                className="edit"
                                                type="text"
                                                style={{
                                                    color: "#ffff",
                                                    display: "none",
                                                    paddingTop: "7px",
                                                    paddingRight: "7px",
                                                    position: "absolute",
                                                    right: 10,
                                                    top: 10,
                                                }}
                                                onClick={() => showEditCompanyInfo(!editContactInfo)}
                                            >
                                                <EditFilled />
                                            </Button>
                                        ) : null}
                                    </>
                                }
                                style={{
                                    width: "100%",
                                    marginTop: 10,
                                    borderRadius: "10px",
                                    cursor: "default",
                                }}
                            >
                                <Row gutter={[0, 0]}>

                                    <Col xs={22} sm={15} md={8}>
                                        <div>
                                            <div
                                                className="div-discription"
                                            >

                                                Laptop Name
                                            </div>
                                            {editContactInfo === false ? (
                                                <div style={{ marginTop: "7px", }}>
                                                    {data.regCompName ? data.regCompName : '-'}
                                                </div>
                                            ) : (
                                                <Form.Item
                                                    initialValue={data ? data.regCompName : null}
                                                    name="lapname"


                                                    onChange={(e) => {
                                                        const inputval = e.target.value;
                                                        const str = e.target.value;
                                                        const newVal =
                                                            inputval.substring(0, 1).toUpperCase() +
                                                            inputval.substring(1);
                                                        const caps = str.split(" ").map(capitalize).join(" ");
                                                        // setPaidBy(newVal);
                                                        form.setFieldsValue({ lapname: newVal, lapname: caps });
                                                    }}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: "Please enter Laptop Name",
                                                        },
                                                        {
                                                            pattern: /^[a-zA-Z\s]*$/,
                                                            message: "Please enter Valid Laptop Name",
                                                        },
                                                    ]}
                                                >
                                                    <Input
                                                        maxLength={50}
                                                        placeholder="Enter Laptop Name"
                                                        bordered={false}
                                                        style={{
                                                            borderBottom: "1px solid #ccc ",
                                                            paddingLeft: "0px",
                                                            width: '220px'
                                                        }}
                                                    />
                                                </Form.Item>
                                            )}
                                        </div>
                                    </Col>
                                    <Col xs={22} sm={15} md={8}>
                                        <div>
                                            <div className="div-discription">Model </div>
                                            {editContactInfo === false ? (
                                                <div style={{ marginTop: "7px" }}>{data.brandName ? data.brandName : '-'}</div>
                                            ) : (
                                                <Form.Item
                                                    initialValue={data ? data.brandName : null}
                                                    name="modelName"
                                                    // onKeyPress={(event) => {
                                                    //   if (checkAlphabets(event)) {
                                                    //     event.preventDefault();
                                                    //   }
                                                    // }}
                                                    rules={[
                                                        {
                                                            required: true,

                                                            message: "Please enter Model Name",
                                                        },
                                                        {
                                                            pattern: /^[a-zA-Z\s]*$/,
                                                            message: "Please enter Valid Model Name",
                                                        },
                                                    ]}
                                                >
                                                    <Input
                                                        maxLength={30}
                                                        style={{
                                                            paddingLeft: "0px",
                                                            borderBottom: "1px solid #ccc ",
                                                            width: '220px'
                                                        }}
                                                        onChange={(e) => {
                                                            const inputval = e.target.value;
                                                            const str = e.target.value;
                                                            const newVal =
                                                                inputval.substring(0, 1).toUpperCase() +
                                                                inputval.substring(1);
                                                            const caps = str.split(" ").map(capitalize).join(" ");
                                                            // setPaidBy(newVal);
                                                            form.setFieldsValue({ modelName: newVal, modelName: caps });
                                                        }}
                                                        placeholder="Enter Model Name"
                                                        bordered={false}
                                                    />
                                                </Form.Item>
                                            )}
                                        </div>
                                    </Col>
                                    <Col xs={22} sm={15} md={8}>
                                        <div>
                                            <div className="div-discription">Serial Number</div>
                                            {editContactInfo === false ? (
                                                <div style={{ marginTop: "7px" }}>{data.brandName ? data.brandName : '-'}</div>
                                            ) : (
                                                <Form.Item
                                                    initialValue={data ? data.website : null}
                                                    name="serialNum"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: "Please enter Serial Number",
                                                            type: "Website",
                                                        },
                                                        {
                                                            pattern:
                                                                /[0-9a-zA-Z]/,
                                                            message: "Please enter Valid Serial Number",
                                                        },
                                                    ]}
                                                >
                                                    <Input
                                                        type="text"
                                                        maxLength={60}
                                                        style={{
                                                            paddingLeft: "0px",
                                                            borderBottom: "1px solid #ccc ",
                                                            width: '220px'
                                                        }}
                                                        onChange={(e) => {
                                                            const inputval = e.target.value;
                                                            const str = e.target.value;
                                                            const newVal =
                                                                inputval.substring(0, 1).toUpperCase() +
                                                                inputval.substring(1);
                                                            const caps = str.split(" ").map(capitalize).join(" ");
                                                            // setPaidBy(newVal);
                                                            form.setFieldsValue({ serialNum: newVal, serialNum: caps });
                                                        }}
                                                        placeholder="Enter Serial Number"
                                                        bordered={false}
                                                    />
                                                </Form.Item>
                                            )}
                                        </div>
                                    </Col>

                                    <Col xs={22} sm={15} md={8}>
                                        <div>
                                            <div className="div-discription">Charger</div>
                                            {editContactInfo === false ? (
                                                <div style={{ marginTop: "7px" }}>{data.domain ? data.domain : '-'}</div>
                                            ) : (
                                                <Form.Item
                                                    name="charger"
                                                    initialValue={
                                                        data.gender
                                                    }
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: "Please Choose Yes or No",
                                                        },
                                                    ]}
                                                >
                                                    <Select
                                                        placeholder="Select a Yes or No"
                                                        style={{
                                                            marginTop: "10px",
                                                            width: '220px',
                                                            borderBottom: "1px solid #ccc ",
                                                            paddingLeft: "0px",
                                                        }}
                                                        bordered={false}
                                                    >
                                                        <Option value="Male">Yes</Option>
                                                        <Option value="Female">No</Option>
                                                    </Select>
                                                </Form.Item>
                                            )}
                                        </div>
                                    </Col>
                                    <Col xs={22} sm={15} md={8}>
                                        <div>
                                            <div className="div-discription">Date of Issue</div>
                                            {editContactInfo === false ? (
                                                <div style={{ marginTop: "7px" }}>{data.brandName ? data.brandName : '-'}</div>
                                            ) : (
                                                <Form.Item
                                                    // initialValue={
                                                    //     dob ? moment(dob, "DD-MM-YYYY") : null
                                                    // }
                                                    name='DoI'
                                                    rules={[
                                                        {
                                                            required: false,
                                                            message: "Please Choose a Date",
                                                        },
                                                    ]}
                                                >
                                                    {/* format={dateFormatList} */}
                                                    <DatePicker
                                                        format="DD-MM-YYYY"
                                                        style={{
                                                            marginTop: "10px",
                                                            width: '220px'
                                                        }}
                                                        // format={dateFormatList}
                                                        // defaultValue= {dob?moment(dob, "DD-MM-YYYY"):null}
                                                        onChange={(e) => {
                                                            setDob(e.format("DD-MM-YYYY"));
                                                        }}
                                                        // disabledDate={(e) => disabledDate(e)}
                                                        value={dob}
                                                        placeholder="Choose Date"
                                                    />
                                                </Form.Item>
                                            )}
                                        </div>
                                    </Col>
                                    <Col xs={22} sm={15} md={8}>
                                        <div>
                                            <div className="div-discription">Laptop Bag</div>
                                            {editContactInfo === false ? (
                                                <div style={{ marginTop: "7px" }}>{data.domain ? data.domain : '-'}</div>
                                            ) : (
                                                <Form.Item
                                                    name="bag"
                                                    initialValue={
                                                        data.gender
                                                    }
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: "Please Choose Yes or No ",
                                                        },
                                                    ]}
                                                >
                                                    <Select
                                                        placeholder="Select a Yes or No"
                                                        style={{
                                                            marginTop: "10px",
                                                            width: '220px',
                                                            borderBottom: "1px solid #ccc ",
                                                            paddingLeft: "0px",
                                                        }}
                                                        bordered={false}
                                                    >
                                                        <Option value="Male">Yes</Option>
                                                        <Option value="Female">No</Option>
                                                    </Select>
                                                </Form.Item>
                                            )}
                                        </div>
                                    </Col>
                                    <Col xs={22} sm={15} md={8}>

                                        {editContactInfo === true ? (
                                            <div>
                                                <Form.Item
                                                    // initialValue={
                                                    //     dob ? moment(dob, "DD-MM-YYYY") : null
                                                    // }
                                                    name='photo'
                                                    rules={[
                                                        {
                                                            required: false,
                                                            message: "Please Choose a Date",
                                                        },
                                                    ]}
                                                >      <UploadImage /></Form.Item>

                                            </div>
                                        ) : null}

                                    </Col>

                                </Row>


                                {editContactInfo === true ? (
                                    <Row
                                        gutter={[16, 16]}
                                        style={{
                                            display: "flex",
                                            justifyContent: "flex-end",
                                            marginTop: "3%",
                                        }}
                                    >
                                        <Col xs={24} sm={8} md={7} lg={6} xl={4} xxl={2}>
                                            <Button
                                                type="text"
                                                style={{ fontSize: 15 }}
                                                onClick={() => showEditCompanyInfo(false)}
                                            >
                                                <CloseOutlined /> CANCEL
                                            </Button>
                                        </Col>
                                        <Col xs={24} sm={8} md={7} lg={6} xl={4} xxl={2}>
                                            <Button
                                                type="primary"
                                                htmlType="submit"
                                                style={{
                                                    // marginLeft: "10px",
                                                    backgroundColor: "#1963A6",
                                                    borderColor: "#1963A6",
                                                    width: "119px",
                                                }}
                                            >
                                                <CheckOutlined /> SAVE
                                            </Button>
                                        </Col>
                                    </Row>
                                ) : null}
                            </Card>

                        </Form>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default AllocatedCard