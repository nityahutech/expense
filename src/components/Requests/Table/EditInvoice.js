import { React, useState, useRef } from "react";
import {
  Row,
  Col,
  Button,
  Input,
  Form,
  DatePicker,
  Divider,

} from "antd";
import {
  MinusCircleOutlined,
  PlusOutlined,
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import {
  checkAlphabets,
  getBase64,
  showNotification
} from "../../../contexts/CreateContext";
import moment from "moment";
import InvoiceContext from "../../../contexts/InvoiceContext";
import EmpInfoContext from "../../../contexts/EmpInfoContext";


function EditInvoice(props) {
  console.log('editInvoiceName', props);
  const editInvoiceName = props?.data;
  console.log('editInvoiceName', editInvoiceName);

  const imgRef = useRef(null);
  const [fileName, setFileName] = useState(
    editInvoiceName?.payments?.map((img) => img.upload)
  );

  const { TextArea } = Input;

  const [imageUrl, setImageUrl] = useState(
    editInvoiceName?.payments?.map((img) => img.upload) || ""
  );

  const [editInvoiceData, setEditInvoicsData] = useState(
    editInvoiceName?.payments?.map((data) => {
      console.log(data);
      return {
        ...data,
        paymentDate: moment(data?.paymentDate, "DD-MM-YYYY"),
      };
    })
  );
  console.log('editInvoiceName', fileName, imageUrl, editInvoiceData)


  const handleChange = (event) => {
    if (!event) {
      return;
    }
    const fileUploaded = event.target.files[0];
    getBase64(fileUploaded, (url) => {
      setImageUrl(url);
    });
  };

  const handleClick = () => {
    imgRef.current.click();
  };

  const onFinish = (values) => {
    console.log(values, "ektaaaaaaaaa");
    let temp = 0;
    const editInvoice = {
      invoiceName: values.invoiceName,
      payments: values.users.map((pay) => {
        temp = Number(temp) + Number(pay.amount);

        console.log(pay);
        return {
          ...pay,
          paymentDate: pay.paymentDate.format("DD-MM-YYYY"),
          upload: pay.upload,
        };
      }),
    };
    editInvoice.totalAmt = temp;
    console.log(props.invoiceData);
    console.log(editInvoice, "ektaaaaaaaaa");
    InvoiceContext.updateInvoiceData(props.data.id, editInvoice)
      .then((res) => {
        showNotification("success", "Success", "Edit Successful");
        // props.getData();
      })
      .catch((err) => {
        console.log(err);
        showNotification("error", "Error", "Failed to edit");
      });
    props.setEditData(false);
  };

  return (
    <>
      <Form layout="vertical" className="invoiceForm" onFinish={onFinish}>
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Form.Item
              initialValue={editInvoiceName.invoiceName}
              maxLength={25}
              label="Invoice Reimbursement Title"
              name="invoiceName"
              onKeyPress={(event) => {
                if (checkAlphabets(event)) {
                  event.preventDefault();
                }
              }}
              rules={[
                {
                  required: true,
                  message: "Please Enter Invoice",
                },
                {
                  pattern: /^[a-zA-Z\s]*$/,
                  message: "Please Enter Valid Title",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Form.List name="users" initialValue={[...editInvoiceData]}>
            {(fields, { add, remove }) => {
              return (
                <>
                  {fields.map(({ key, i, name, ...edit }) => (
                    <>
                      <Divider orientation="left" orientationMargin="10px">
                        Expenditure No.{key + 1}
                      </Divider>
                      {console.log(edit, editInvoiceData)}
                      <Col span={12}>
                        <Form.Item
                          {...edit}
                          name={[name, "paymentDate"]}
                          //   initialValue={moment(
                          //     editInvoiceData.payments[key]?.paymentDate,
                          //     "DD-MM-YYYY"
                          //   )}
                          label="Date of Payment"
                          rules={[
                            {
                              required: true,
                              message: "Missing Payment Date",
                            },
                          ]}
                        >
                          <DatePicker
                            style={{ width: "100%" }}
                            format={"DD-MM-YYYY"}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          {...edit}
                          // initialValue={edit?.amount}
                          name={[name, "amount"]}
                          label="Amount"
                          rules={[
                            {
                              required: true,
                              message: "Missing Amount",
                            },
                            {
                              pattern: /^[0-9\s]*$/,
                              message: "Please Enter Valid Title",
                            },
                          ]}
                        >
                          <Input
                            placeholder="Enter Amount"
                            maxLength={10}
                            style={{ borderRadius: "5px" }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          {...edit}
                          //   initialValue={edit?.description}
                          name={[name, "description"]}
                          label="Description"
                          rules={[
                            {
                              required: true,
                              message: "Missing Description",
                            },
                          ]}
                        >
                          <TextArea
                            autoSize={{ minRows: 3, maxRows: 6 }}
                            placeholder="Enter Description"
                            maxLength={150}
                            style={{ borderRadius: "5px" }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={10}>
                        <Form.Item label="Upload" name={[name, "upload"]}>
                          <div
                            style={{
                              border: "dashed #B9B9B9",
                              borderWidth: "thin",
                              borderRadius: "4px",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <input
                              style={{
                                display: "none",
                              }}
                              type="file"
                              id="logo"
                              name="logo"
                              ref={imgRef}
                              onChange={(e) => handleChange(e)}
                            />
                            {fileName[key] ? (
                              <div
                                className="hoverImgCont"
                                style={{ margin: "10px auto" }}
                              >
                                <img
                                  src={imageUrl[key]}
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    maxWidth: "170px",
                                    height: "100px",
                                    padding: "10px",
                                  }}
                                />
                                {console.log(fileName)}
                                <div className="editOverlay">
                                  <DeleteOutlined
                                    className="hoverIcon"
                                    onClick={() => {
                                      let temp = [...fileName];
                                      temp[key] = null;
                                      setFileName(temp);
                                      let pic = [...imageUrl];
                                      pic[key] = "";
                                      setImageUrl(pic);
                                    }}
                                  />
                                </div>
                              </div>
                            ) : (
                              <>
                                <Button
                                  onClick={(e) => handleClick(e)}
                                  style={{
                                    width: "60px",
                                    height: "50px",
                                    margin: "10px",
                                  }}
                                >
                                  <PlusCircleOutlined
                                    style={{
                                      display: "flex",
                                      flexDirection: "column-reverse",
                                      alignItems: "center",
                                    }}
                                  />
                                  <span
                                    style={{
                                      display: "flex",
                                      justifyContent: "center",
                                      marginRight: "8px",
                                    }}
                                  >
                                    Upload
                                  </span>
                                </Button>
                              </>
                            )}
                          </div>
                        </Form.Item>
                      </Col>
                      <Col span={2} className="actionButton">
                        <MinusCircleOutlined
                          onClick={() => {
                            remove(name);
                            // let temp = [...edit];
                            // delete temp[i];
                            // temp
                            // console.log(temp);
                            // setFile(temp);
                            let paymentTemp = [...editInvoiceData];
                            console.log(paymentTemp);
                            paymentTemp.splice(i, 1);
                            setEditInvoicsData(paymentTemp);
                          }}
                        />
                      </Col>
                    </>
                  ))}
                  <Col span={24}>
                    <Button
                      className="addField"
                      onClick={() => {
                        add();
                      }}
                      block
                    >
                      <PlusOutlined /> Add field
                    </Button>
                  </Col>
                </>
              );
            }}
          </Form.List>
          <Divider />
          <Col span={24} className="formButton">
            <Button
              type="text"
              style={{ marginRight: "10px" }}
              onClick={() => {
                props.setEditData(false);
              }}
            >
              <CloseOutlined />
              Cancel
            </Button>
            <Button
              htmlType="submit"
              style={{
                border: "1px solid #1963A6",
                background: "#1963A6",
                color: "#ffffff",
                fontSize: "15",
                lineHeight: "17px",
                // width: "119px",
              }}
              type="primary"
            >
              <CheckOutlined />
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default EditInvoice;


