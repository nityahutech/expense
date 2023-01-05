import React, { useState, } from 'react'
import {
    Card, Button, Row, Col,
    Input, Form, DatePicker, Select,

} from 'antd';
import hutechlogo from "../../images/hutechlogo.png";
import laptop from "../../images/laptop.jpg";
import { EditFilled, CloseOutlined, CheckOutlined,PlusCircleOutlined } from "@ant-design/icons";
import {
    capitalize,
} from "../../contexts/CreateContext";
import UploadImage from './UploadImage';
const { Option } = Select;

const AllocatedCard = () => {
    const [form] = Form.useForm();
    const [editAsset, setEditAsset] = useState(false);
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
                                style={{
                                    width: "100%",
                                    marginTop: 10,
                                    borderRadius: "10px",
                                    cursor: "default",
                                }}
                            >

                                {editAsset === true ? 
                                (<>
                                    <Row gutter={[0, 0]}>
                                        <Col xs={22} sm={15} md={8}>
                                            <div>
                                                <div
                                                    className="div-discription"
                                                >

                                                    Laptop Name
                                                </div>
                                                {editAsset === false ? (
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
                                                {editAsset === false ? (
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
                                                {editAsset === false ? (
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
                                                {editAsset === false ? (
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
                                                {editAsset === false ? (
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
                                                {editAsset === false ? (
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

                                            {editAsset === true ? (
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
                                </>):
                                (<>
                                  <Button
                                        type="primary"
                                        style={{ marginLeft: "10px",background: "#1963a6",border: "1px solid #1963A6", }}
                                        onClick={() => setEditAsset(true)}
                                    >
                                        <PlusCircleOutlined />
                                        Add
                                    </Button>  
                                </>)}

                                


                                {editAsset === true ? (
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
                                                onClick={() => setEditAsset(false)}
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