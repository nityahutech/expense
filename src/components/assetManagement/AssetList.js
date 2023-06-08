import { Row, Table, Col, Modal, Card, Select, Input, Form } from "antd";
import { useState, useEffect } from "react";
import {
  DeleteOutlined,
  EyeFilled,
  SearchOutlined,
  EditFilled,
  DeleteFilled,
} from "@ant-design/icons";
import AssetContext from "../../contexts/AssetContext";
import "../assetManagement/RepairRequestTable.css";
import EditAsset from "./EditAsset";
const { Option } = Select;

const AssetList = (props) => {
  const [filteredData, setFilteredData] = useState([]);
  const [tableAssetData, setTableAssetData] = useState([]);
  const [viewAssetData, setViewAssetData] = useState(null);
  const [editAssetData, setEditAssetData] = useState(null);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: "Asset Name",
      dataIndex: "modalName",
      key: "modalName",
      // width: 200,
      align: "left",
    },
    {
      title: "Asset Type",
      dataIndex: "assetType",
      key: "assetType",
      // width: 150,
      align: "left",
    },
    {
      title: "Serial Number",
      dataIndex: "serialNumber",
      key: "serialNumber",
      // width: 150,
      align: "left",
    },
    // {
    //   title: "Request Type",
    //   dataIndex: "type",
    //   key: "type",
    //   width: 150,
    //   align: "left",
    // },
    // {
    //   title: "Status",
    //   key: "Status",
    //   width: 120,
    //   align: "left",
    //   render: (_, { status }) =>
    //     status !== "" && (
    //       <Tag
    //         style={{
    //           width: "84px",
    //           color: "#000000",
    //           borderRadius: "10px",
    //           display: "flex",
    //           justifyContent: "center",
    //           padding: "2px",
    //         }}
    //         className="statusTag"
    //         color={
    //           status === "Approved"
    //             ? "rgb(8 231 68 / 75%)"
    //             : status === "Reject"
    //             ? "#f44336"
    //             : "rgb(244 209 105)"
    //         }
    //         key={status}
    //       >
    //         {status}
    //       </Tag>
    //     ),
    // },
    {
      title: "Action",
      dataIndex: "operation",
      key: "operation",
      width: 150,
      align: "center",
      render: (_, record) => {
        return (
          <>
            {
              <>
                <Row gutter={[0, 0]}>
                  <Col xs={24} sm={20} md={8}>
                    <EyeFilled
                      style={{ color: "#6e7475" }}
                      onClick={(i) => {
                        console.log("testttt", record, i);
                        setViewAssetData(record);
                      }}
                    />
                  </Col>
                  <Col xs={24} sm={20} md={8}>
                    <EditFilled
                      onClick={() => {
                        console.log(record?.id);
                        setEditAssetData(record);
                      }}
                      style={{
                        color: "rgb(64, 169, 255)",
                        marginLeft: 10,
                      }}
                      // disabled={record.status == "Approved"}
                    />
                  </Col>
                  <Col xs={24} sm={20} md={8}>
                    <DeleteFilled
                      onClick={() => {
                        onDeleteUpdateRepair(record);
                      }}
                      style={{ color: "red", marginLeft: 10 }}
                    />
                  </Col>
                </Row>
              </>
            }
          </>
        );
      },
    },
  ];

  useEffect(() => {
    getEmpAssetList();
  }, []);

  const getEmpAssetList = async () => {
    setLoading(true);
    let assetList = await AssetContext.getEmpAsset();
    console.log("listtttt", assetList);
    let assets = assetList.map((asset) => asset);
    setTableAssetData(assets);
    setLoading(false);
  };

  const onDeleteUpdateRepair = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete Laptop Update/Repair Record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        AssetContext.deleteEmpAsset(record.id)
          .then((response) => {
            getEmpAssetList();
          })
          .catch((error) => {});
      },
    });
  };

  console.log("tablesdata", tableAssetData);

  return (
    <>
      {" "}
      <Table
        loading={loading}
        size="small"
        columns={columns}
        dataSource={tableAssetData}
        className="assetTable"
      />
      <Modal
        className="viewAssetModal"
        footer={null}
        title="Asset Details"
        open={viewAssetData}
        closeIcon={
          <div
            onClick={() => setViewAssetData(null)}
            style={{ color: "#ffffff" }}
          >
            X
          </div>
        }
      >
        {/* <Col span={24}> */}
        <Form
          layout="vertical"
          // form={form}
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
          // onFinish={onFinish}
        >
          <Row span={24} gutter={[16, 16]}>
            <>
              <Col xs={24} sm={12} md={8}>
                <Form.Item
                  label="Type"
                  name="assetType"
                  className="labelText"
                  // initialValue="Laptop"
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: "Select Asset Type",
                  //   },
                  // ]}
                >
                  {viewAssetData?.assetType}
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Form.Item
                  label="Modal Name"
                  name="modalName"
                  className="labelText"
                >
                  {viewAssetData?.modalName}
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Form.Item
                  label="Serial Number"
                  name="serialNumber"
                  className="labelText"
                >
                  {viewAssetData?.serialNumber}
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Form.Item
                  label={
                    viewAssetData?.assetType == "Monitor"
                      ? "Power Supply Cord"
                      : "Charger"
                  }
                  className="labelText"
                >
                  {viewAssetData?.assetType == "Monitor"
                    ? viewAssetData?.pwrCord
                    : viewAssetData?.charger}
                </Form.Item>
              </Col>

              {viewAssetData?.assetType == "Monitor" ? null : (
                <Col xs={24} sm={12} md={8}>
                  <Form.Item
                    label={
                      viewAssetData?.assetType == "Laptop"
                        ? "Laptop Bag"
                        : "Mobile Case"
                    }
                    name={
                      viewAssetData?.assetType == "Laptop" ? "bag" : "cover"
                    }
                    rules={[
                      {
                        required: true,
                        message: "Please Choose Yes or No ",
                      },
                    ]}
                  >
                    {viewAssetData?.assetType == "Laptop"
                      ? viewAssetData?.bag
                      : viewAssetData?.cover}
                  </Form.Item>
                </Col>
              )}

              <Col span={24} xs={24} sm={24} md={16}>
                <Form.Item
                  label="Upload Image"
                  name="upload"
                  rules={[
                    {
                      required: true,
                      message: "Please upload file",
                    },
                  ]}
                  className="labelText"
                >
                  <img
                    src={viewAssetData?.upload}
                    style={{ width: "100px", height: "auto" }}
                  />
                </Form.Item>
              </Col>
            </>
          </Row>
        </Form>

        {/* </Col> */}
      </Modal>
      <Modal
        className="viewAssetModal"
        footer={null}
        title="Edit Asset Details"
        open={editAssetData}
        closeIcon={
          <div
            onClick={() => setEditAssetData(null)}
            style={{ color: "#ffffff" }}
          >
            X
          </div>
        }
      >
        <EditAsset
          editAssetData={editAssetData}
          setEditAssetData={setEditAssetData}
          getEmpAssetList={getEmpAssetList}
        />
      </Modal>
    </>
  );
};

export default AssetList;
