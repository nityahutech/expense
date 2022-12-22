import { useState, useEffect } from "react";
import EmpInfoContext from "../../contexts/EmpInfoContext";
import {
  Card,
  Row,
  Col,
  Input,
  Button,
  Form,
  Select,
  Divider,
  Modal,
} from "antd";
import {
  EditFilled,
  CloseOutlined,
  CheckOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import "../../style/BankAccount.css";
import FormItem from "antd/es/form/FormItem";
import CompanyProContext from "../../contexts/CompanyProContext";
import {
  capitalize,
  checkAlphabets,
  checkNumbervalue,
} from "../../contexts/CreateContext";
import { arrayUnion, deleteDoc } from "firebase/firestore";
function BankAccount() {
  const [form] = Form.useForm();
  const [editBankForm] = Form.useForm();
  const [addBankForm] = Form.useForm();
  const [editContent, showEditContent] = useState(false);
  const compId = sessionStorage.getItem("compId");
  const [data, setData] = useState("");
  const [editBank, setEditBank] = useState([false]);
  const [bankList, setBankList] = useState([]);
  const [addBank, setAddBank] = useState(false);
  const currentUser = JSON.parse(sessionStorage.getItem("user"));

  const onFinish = (values) => {
    values.profilePic = data.profilePic || null;
    EmpInfoContext.updateEduDetails(currentUser.uid, values);
    showEditContent(false);
    let temp = {
      ...data,
      bankName: values.bankName,
      accountNumber: values.accountNumber,
      ifscCode: values.ifscCode,
    };
    setData(temp);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let data = await EmpInfoContext.getEduDetails(currentUser.uid);
    console.log(data);
    setData(data);
    setBankList(data?.bank || []);
    setEditBank([...data?.bank].fill(false));
  };

  function onEditBank(values) {
    let record = {
      title: values.title,
      ifsc: values.ifsc,
      accountType: values.accountType,
      bankName: values.bankName,
      city: values.city,
      branch: values.branch,
      accountNo: values.accountNo,
    };
    let temp = [...bankList];
    let i = editBank.indexOf(true);
    temp[i] = record;

    console.log(currentUser.uid, { bank: temp });

    EmpInfoContext.updateEduDetails(currentUser.uid, { bank: temp }).then(
      (res) => {
        getData();
      }
    );
    // let old = bankList[editBank.indexOf(true)];
    // EmpInfoContext.editBankInfo(
    //   currentUser.uid,
    //   { bank: old },
    //   { bank: record }
    // );
    // editBankForm.resetFields();
    setEditBank(editBank.fill(false));
    // const timer = setTimeout(() => getData(), 600);
    // return () => clearTimeout(timer);
  }

  const onDeleteBank = (record) => {
    console.log("hey", record);
    Modal.confirm({
      title: "Are you sure, you want to delete Bank Account?",
      okText: "Yes",
      okType: "danger",

      onOk: () => {
        let temp = [...bankList];
        // delete temp[record];
        temp.splice(record, 1);
        console.log(currentUser.uid, { bank: temp });

        EmpInfoContext.updateEduDetails(currentUser.uid, { bank: temp }).then(
          (res) => {
            getData();
          }
        );
      },
    });
  };

  function onAddBank(values) {
    let rec = {
      title: values.title,
      ifsc: values.ifsc,
      accountType: values.accountType,
      bankName: values.bankName,
      city: values.city,
      branch: values.branch,
      accountNo: values.accountNo,
    };
    let record = [...bankList, rec];
    console.log(values);
    EmpInfoContext.updateEduDetails(currentUser.uid, { bank: record });
    // CompanyProContext.addCompInfo(compId, { bank: record });
    addBankForm.resetFields();
    getData();
    setEditBank(editBank.fill(false));
  }

  console.log(bankList);

  return (
    <>
      {/* <div
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
                className="viewCard"
                title="Bank Account Details"
                bordered={true}
                hoverable={true}
                extra={
                  <>
                    {editContent === false ? (
                      <Button
                        className="personal"
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
                        onClick={() => showEditContent(!editContent)}
                      >
                        <EditFilled />
                      </Button>
                    ) : null}
                  </>
                }
                style={{
                  width: "100%",
                  marginTop: "15px",
                  borderRadius: "10px",
                  cursor: "default",
                }}
              >
                <Row gutter={[16, 16]}>
                  <Col xs={22} sm={20} md={12}>
                    <div>
                      <div
                        style={{
                          fontWeight: 600,
                          lineHeight: "18px",
                          color: "#07182b",
                          fontSize: "15px",
                          fontFamily: "Open Sans,sans-serif",
                        }}
                      >
                        Bank Name
                      </div>
                      {editContent === false ? (
                        <div style={{ marginTop: "7px" }}>
                          {data?.bankName ? data.bankName : "-"}
                        </div>
                      ) : (
                        <Form.Item
                          name="bankName"
                          onKeyPress={(event) => {
                            if (checkAlphabets(event)) {
                              event.preventDefault();
                            }
                          }}
                          rules={[
                            {
                              required: true,
                              pattern: /^[a-zA-Z\s]*$/,
                              message: "Please enter Bank Name",
                            },
                          ]}
                          initialValue={data?.bankName ? data.bankName : null}
                        >
                          <Input
                            placeholder="Enter Bank Name"
                            onChange={(e) => {
                              const inputval = e.target.value;
                              const str = e.target.value;
                              const newVal =
                                inputval.substring(0, 1).toUpperCase() +
                                inputval.substring(1);
                              const caps = str
                                .split(" ")
                                .map(capitalize)
                                .join(" ");
                              form.setFieldsValue({
                                bankName: newVal,
                                bankName: caps,
                              });
                            }}
                            maxLength={20}
                            style={{
                              marginTop: "10px",
                              width: "100%",
                              borderBottom: "1px solid #ccc",
                              paddingLeft: "0px",
                            }}
                            bordered={false}
                          />
                        </Form.Item>
                      )}
                    </div>
                  </Col>
                  <Col xs={22} sm={15} md={12}>
                    <div>
                      <div
                        style={{
                          fontWeight: 600,
                          lineHeight: "18px",
                          color: "#07182b",
                          fontSize: "15px",
                          fontFamily: "Open Sans,sans-serif",
                        }}
                      >
                        Account Number
                      </div>
                      {editContent === false ? (
                        <div style={{ marginTop: "7px" }}>
                          {data?.accountNumber ? data.accountNumber : "-"}
                        </div>
                      ) : (
                        <Form.Item
                          name="accountNumber"
                          onKeyPress={(event) => {
                            console.log(checkNumbervalue(event));
                            if (checkNumbervalue(event)) {
                              event.preventDefault();
                            }
                          }}
                          rules={[
                            {
                              required: true,
                              pattern: /^[0-9\b]+$/,
                              message: "Please enter Account Number",
                            },
                            {
                              whitespace: true,
                            },
                          ]}
                          initialValue={
                            data?.accountNumber ? data.accountNumber : null
                          }
                        >
                          <Input
                            placeholder="Enter Account Number"
                            maxLength={20}
                            style={{
                              marginTop: "10px",
                              width: "100%",
                              borderBottom: "1px solid #ccc ",
                              paddingLeft: "0px",
                            }}
                            bordered={false}
                          />
                        </Form.Item>
                      )}
                    </div>
                  </Col>
                  <Col xs={22} sm={15} md={12}>
                    <div>
                      <div
                        style={{
                          fontWeight: 600,
                          lineHeight: "18px",
                          color: "#07182b",
                          fontSize: "15px",
                          fontFamily: "Open Sans,sans-serif",
                        }}
                      >
                        IFSC Code
                      </div>
                      {editContent === false ? (
                        <div style={{ marginTop: "7px" }}>
                          {data?.ifscCode ? data.ifscCode : "-"}
                        </div>
                      ) : (
                        <Form.Item
                          name="ifscCode"
                          onKeyPress={(event) => {
                            console.log(
                              checkNumbervalue(event),
                              checkAlphabets(event)
                            );
                            if (
                              checkNumbervalue(event) &&
                              checkAlphabets(event)
                            ) {
                              event.preventDefault();
                            }
                          }}
                          rules={[
                            {
                              required: true,
                              pattern: /^[0-9a-zA-Z]+$/,
                              message: "Please enter IFSC Code",
                            },
                            {
                              whitespace: true,
                            },
                          ]}
                          initialValue={data?.ifscCode ? data.ifscCode : null}
                        >
                          <Input
                            placeholder="Enter IFSC Code"
                            maxLength={15}
                            style={{
                              marginTop: "10px",
                              width: "100%",
                              borderBottom: "1px solid #ccc ",
                              paddingLeft: "0px",
                            }}
                            bordered={false}
                          />
                        </Form.Item>
                      )}
                    </div>
                  </Col>
                </Row>

                {editContent === true ? (
                  <Row
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginTop: "3%",
                    }}
                  >
                    <Button
                      onClick={() => {
                        form.resetFields();
                        showEditContent(false);
                      }}
                      type="text"
                      style={{ fontSize: 15 }}
                    >
                      <CloseOutlined /> CANCEL
                    </Button>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{
                          marginLeft: "10px",
                          background: "#1963A6",
                          width: "90px",
                        }}
                      >
                        <CheckOutlined />
                        SAVE
                    </Button>
                  </Row>
                ) : null}
              </Card>
            </Form>
          </Col>
        </Row>
      </div> */}

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
            <Card
              title=" BANK ACCOUNT INFO"
              bordered={true}
              hoverable={true}
              style={{
                width: "100%",
                marginTop: 10,
                borderRadius: "10px",
                cursor: "default",
              }}
              className="companyCard"
            >
              <Form
                labelcol={{
                  span: 24,
                }}
                wrappercol={{
                  span: 24,
                }}
                initialValues={{
                  remember: true,
                }}
                autoComplete="off"
                onFinish={onEditBank}
                form={editBankForm}
                layout="vertical"
              >
                {bankList.map((u, i) => (
                  <div>
                    <Row gutter={[16, 16]}>
                      <Col xs={22} sm={15} md={22}>
                        {editBank[i] === false ? (
                          <div
                            style={{
                              fontSize: "25px",
                              fontWeight: "lighter",
                            }}
                          >
                            {u.title ? u.title : "-"}
                          </div>
                        ) : (
                          <FormItem
                            initialValue={u.title}
                            name="title"
                            rules={[
                              {
                                pattern: /^[a-zA-Z-0-9\s]*$/,
                                required: true,
                                message: "Please Enter Account Title",
                              },
                            ]}
                          >
                            <Input
                              placeholder="Account Title"
                              bordered={false}
                              maxLength={25}
                              style={{
                                width: "100%",
                                borderBottom: "1px solid #ccc ",
                                paddingLeft: "0px",
                                marginTop: "10px",
                              }}
                            />
                          </FormItem>
                        )}
                      </Col>
                      <Col
                        xs={22}
                        sm={15}
                        md={1}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "end",
                        }}
                      >
                        {editBank[i] == false ? (
                          <Button
                            style={{
                              width: "10px",
                              border: "none",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "end",
                            }}
                            onClick={() => {
                              let array = [...editBank].fill(false);
                              setEditBank([...array]);
                              const timer = setTimeout(() => {
                                editBankForm.resetFields();
                                array[i] = true;
                                setEditBank(array);
                              }, 200);
                              return () => clearTimeout(timer);
                            }}
                          >
                            <EditFilled />
                          </Button>
                        ) : (
                          <Button
                            style={{
                              width: "10px",
                              border: "none",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "end",
                            }}
                            onClick={() => {
                              onDeleteBank(i);
                            }}
                          >
                            <DeleteOutlined />
                          </Button>
                        )}
                      </Col>
                      <Divider style={{ margin: "0px" }} />
                      <Col xs={22} sm={15} md={8}>
                        <div className="div-discription">Bank Name</div>
                        {editBank[i] === false ? (
                          <div>{u?.bankName ? u.bankName : "-"}</div>
                        ) : (
                          <FormItem
                            name="bankName"
                            initialValue={u.bankName}
                            rules={[
                              {
                                pattern: /^[a-zA-Z\s]*$/,
                                required: true,
                                message: "Please Enter Bank Name",
                              },
                            ]}
                          >
                            <Input
                              placeholder="Bank Name"
                              bordered={false}
                              maxLength={25}
                              style={{
                                width: "100%",
                                borderBottom: "1px solid #ccc ",
                                paddingLeft: "0px",
                                marginTop: "10px",
                              }}
                            />
                          </FormItem>
                        )}
                      </Col>
                      <Col xs={22} sm={15} md={8}>
                        <div className="div-discription">City</div>
                        {editBank[i] === false ? (
                          <div>{u?.city ? u.city : "-"}</div>
                        ) : (
                          <FormItem
                            name="city"
                            initialValue={u.city}
                            rules={[
                              {
                                pattern: /^[a-zA-Z\s]*$/,
                                required: true,
                                message: "Please Enter City",
                              },
                            ]}
                          >
                            <Input
                              placeholder="City"
                              bordered={false}
                              maxLength={25}
                              style={{
                                width: "100%",
                                borderBottom: "1px solid #ccc ",
                                paddingLeft: "0px",
                                marginTop: "10px",
                              }}
                            />
                          </FormItem>
                        )}
                      </Col>
                      <Col xs={22} sm={15} md={8}>
                        <div className="div-discription">Branch Name</div>
                        {editBank[i] === false ? (
                          <div>{u?.branch ? u.branch : "-"}</div>
                        ) : (
                          <FormItem
                            name="branch"
                            initialValue={u.branch}
                            rules={[
                              {
                                pattern: /^[a-zA-Z\s]*$/,
                                required: true,
                                message: "Please Enter Branch Name",
                              },
                            ]}
                          >
                            <Input
                              placeholder="Branch Name"
                              bordered={false}
                              maxLength={25}
                              style={{
                                width: "100%",
                                borderBottom: "1px solid #ccc ",
                                paddingLeft: "0px",
                                marginTop: "10px",
                              }}
                            />
                          </FormItem>
                        )}
                      </Col>
                      <Col xs={22} sm={15} md={8}>
                        <div className="div-discription">IFSC Code</div>
                        {editBank[i] === false ? (
                          <div>{u?.ifsc ? u.ifsc : "-"}</div>
                        ) : (
                          <FormItem
                            name="ifsc"
                            initialValue={u.ifsc}
                            rules={[
                              {
                                pattern: /^[A-Z0-9\s]*$/,
                                required: true,
                                message: "Please Enter IFSC Code",
                              },
                            ]}
                          >
                            <Input
                              maxLength={11}
                              placeholder="IFSC Code"
                              bordered={false}
                              style={{
                                width: "100%",
                                borderBottom: "1px solid #ccc ",
                                paddingLeft: "0px",
                                marginTop: "10px",
                              }}
                            />
                          </FormItem>
                        )}
                      </Col>
                      <Col xs={22} sm={15} md={8}>
                        <div className="div-discription">Account Type</div>
                        {editBank[i] === false ? (
                          <div>{u?.accountType ? u.accountType : "-"}</div>
                        ) : (
                          <FormItem
                            name="accountType"
                            initialValue={u.accountType}
                            rules={[
                              {
                                required: true,
                                message: "Please Select Account Type",
                              },
                            ]}
                          >
                            <Select
                              defaultValue="Current Type"
                              style={{
                                width: "100%",
                                borderBottom: "1px solid #ccc ",
                                paddingLeft: "0px",
                                marginTop: "10px",
                              }}
                              bordered={false}
                              options={[
                                {
                                  value: "Current Account",
                                  label: "Current Account",
                                },
                                {
                                  value: "Fixed Deposit",
                                  label: "Fixed Deposit",
                                },
                                {
                                  value: "Salary Account",
                                  label: "Salary Account",
                                },
                              ]}
                            />
                          </FormItem>
                        )}
                      </Col>
                      <Col xs={22} sm={15} md={8}>
                        <div className="div-discription">Account Number</div>
                        {editBank[i] === false ? (
                          <div>{u?.accountNo ? u.accountNo : "-"}</div>
                        ) : (
                          <FormItem
                            name="accountNo"
                            initialValue={u.accountNo}
                            rules={[
                              {
                                pattern: /^[0-9\b]+$/,
                                required: true,
                                message: "Please Enter Account Number",
                              },
                            ]}
                          >
                            <Input
                              maxLength={14}
                              placeholder="Account Number"
                              bordered={false}
                              style={{
                                width: "100%",
                                borderBottom: "1px solid #ccc ",
                                paddingLeft: "0px",
                                marginTop: "10px",
                              }}
                            />
                          </FormItem>
                        )}
                      </Col>
                    </Row>
                    <Divider />
                  </div>
                ))}
                {editBank.includes(true) ? (
                  <>
                    <Button
                      type="text"
                      onClick={() => setEditBank([...editBank].fill(false))}
                    >
                      CANCEL
                    </Button>
                    <Button
                      type="primary"
                      onClick={() => editBankForm.submit()}
                      style={{ background: "#1963A6" }}
                    >
                      <PlusCircleOutlined />
                      Save
                    </Button>
                  </>
                ) : addBank === false ? (
                  <Button
                    type="primary"
                    onClick={() => setAddBank(true)}
                    style={{ background: "#1963A6" }}
                  >
                    <PlusCircleOutlined />
                    Add
                  </Button>
                ) : (
                  <Form
                    labelcol={{
                      span: 24,
                    }}
                    wrappercol={{
                      span: 24,
                    }}
                    initialValues={{
                      remember: true,
                    }}
                    autoComplete="off"
                    onFinish={onAddBank}
                    form={addBankForm}
                    layout="vertical"
                  >
                    <Row gutter={[16, 16]}>
                      <Col xs={24} sm={24} md={24}>
                        <FormItem
                          label="Account Title"
                          name="title"
                          rules={[
                            {
                              pattern: /^[a-zA-Z-0-9\s]*$/,
                              required: true,
                              message: "Please Enter Account Title",
                            },
                          ]}
                        >
                          <Input
                            placeholder="Account Title"
                            bordered={false}
                            maxLength={25}
                            style={{
                              width: "100%",
                              borderBottom: "1px solid #ccc ",
                              paddingLeft: "0px",
                              marginTop: "10px",
                            }}
                          />
                        </FormItem>
                      </Col>
                      <Col xs={24} sm={12} md={8}>
                        <FormItem
                          label="Bank Name"
                          name="bankName"
                          rules={[
                            {
                              pattern: /^[a-zA-Z\s]*$/,
                              required: true,
                              message: "Please Enter Bank Name",
                            },
                          ]}
                        >
                          <Input
                            placeholder="Bank Name"
                            bordered={false}
                            maxLength={25}
                            style={{
                              width: "100%",
                              borderBottom: "1px solid #ccc ",
                              paddingLeft: "0px",
                              marginTop: "10px",
                            }}
                          />
                        </FormItem>
                      </Col>
                      <Col xs={24} sm={12} md={8}>
                        <FormItem
                          label="City"
                          name="city"
                          rules={[
                            {
                              pattern: /^[a-zA-Z\s]*$/,
                              required: true,
                              message: "Please Enter City",
                            },
                          ]}
                        >
                          <Input
                            placeholder="City"
                            bordered={false}
                            maxLength={25}
                            style={{
                              width: "100%",
                              borderBottom: "1px solid #ccc ",
                              paddingLeft: "0px",
                              marginTop: "10px",
                            }}
                          />
                        </FormItem>
                      </Col>
                      <Col xs={24} sm={12} md={8}>
                        <FormItem
                          label="Branch Name"
                          name="branch"
                          rules={[
                            {
                              pattern: /^[a-zA-Z\s]*$/,
                              required: true,
                              message: "Please Enter Branch Name",
                            },
                          ]}
                        >
                          <Input
                            placeholder="Branch Name"
                            bordered={false}
                            maxLength={25}
                            style={{
                              width: "100%",
                              borderBottom: "1px solid #ccc ",
                              paddingLeft: "0px",
                              marginTop: "10px",
                            }}
                          />
                        </FormItem>
                      </Col>
                      <Col xs={24} sm={12} md={8}>
                        <FormItem
                          label="IFSC Code"
                          name="ifsc"
                          rules={[
                            {
                              pattern: /^[A-Z0-9\s]*$/,
                              required: true,
                              message: "Please Enter IFSC Code",
                            },
                          ]}
                        >
                          <Input
                            maxLength={11}
                            placeholder="IFSC Code"
                            bordered={false}
                            style={{
                              width: "100%",
                              borderBottom: "1px solid #ccc ",
                              paddingLeft: "0px",
                              marginTop: "10px",
                            }}
                          />
                        </FormItem>
                      </Col>
                      <Col xs={24} sm={12} md={8}>
                        <FormItem
                          label="Account Type"
                          initialValue="Current Account"
                          name="accountType"
                          rules={[
                            {
                              required: true,
                              message: "Please Select Account Type",
                            },
                          ]}
                        >
                          <Select
                            defaultValue="Current Account"
                            style={{
                              width: "100%",
                              borderBottom: "1px solid #ccc ",
                              paddingLeft: "0px",
                              marginTop: "10px",
                            }}
                            bordered={false}
                            options={[
                              {
                                value: "Current Account",
                                label: "Current Account",
                              },
                              {
                                value: "Fixed Deposit",
                                label: "Fixed Deposit",
                              },
                              {
                                value: "Salary Account",
                                label: "Salary Account",
                              },
                            ]}
                          />
                        </FormItem>
                      </Col>
                      <Col xs={24} sm={12} md={8}>
                        <FormItem
                          label="Account Number"
                          name="accountNo"
                          rules={[
                            {
                              pattern: /^[0-9\b]+$/,
                              required: true,
                              message: "Please Enter Account Number",
                            },
                          ]}
                        >
                          <Input
                            maxLength={14}
                            placeholder="Account Number"
                            bordered={false}
                            style={{
                              width: "100%",
                              borderBottom: "1px solid #ccc ",
                              paddingLeft: "0px",
                              marginTop: "10px",
                            }}
                          />
                        </FormItem>
                      </Col>
                      <Col
                        xs={24}
                        sm={24}
                        md={24}
                        style={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        <FormItem>
                          <Button
                            type="text"
                            style={{ marginRight: "1rem" }}
                            onClick={() => setAddBank(false)}
                          >
                            {" "}
                            <CloseOutlined />
                            CANCEL
                          </Button>
                          <Button
                            type="primary"
                            onClick={() => {
                              console.log("add");
                              addBankForm.submit();
                              setAddBank(false);
                            }}
                            style={{ background: "#1963A6", width: "90px" }}
                          >
                            <CheckOutlined />
                            SAVE
                          </Button>
                        </FormItem>
                      </Col>
                    </Row>
                  </Form>
                )}
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
export default BankAccount;
