import { Card, Divider, Select } from "antd"
import { useState, useEffect } from "react"
import InvoiceForm from "./InvoiceForm"
import TravelForm from "./TravelForm"
import LaptopUpgradeForm from "./LaptopUpgradeForm"
import LaptopRepairForm from "./LaptopRepairForm"
import LaptopReturnForm from "./LaptopReturnForm"
import AssetContext from "../../../contexts/AssetContext";


const Forms = () => {
    const [type, setType] = useState(null)
    const currentUser = JSON.parse(sessionStorage.getItem("user"));
    const [assetData, setAssetData] = useState([])
    const formTypes = {
        "Invoice Reimbursement": <InvoiceForm assetData={assetData} />,
        "Laptop Upgrade": <LaptopUpgradeForm assetData={assetData} />,
        "Laptop Repair": <LaptopRepairForm assetData={assetData} />,
        "Laptop Return": <LaptopReturnForm assetData={assetData} />,
        "Travel Booking": <TravelForm assetData={assetData} />
    }

    useEffect(() => {
        getEmpAllAsset();
    }, []);

    const getEmpAllAsset = async () => {
        let assetData = await AssetContext.getRepairData(currentUser.uid, true);
        console.log('assetData', assetData)
        setAssetData(assetData)



    };



    return (
        <div className="personalCardDiv">
            <Card
                className="personal"
                style={{ width: "90%" }}
                title="Forms"
                bordered={true}
                hoverable={true}
            >
                <Select
                    placeholder="Select Form Type"
                    allowClear
                    onChange={(e) => setType(e || null)}
                    style={{ minWidth: "200px", width: "40%" }}
                    options={Object.keys(formTypes).map(x => {
                        return {
                            value: x,
                            label: x
                        }
                    })}
                />
                {type && (
                    <>
                        <Divider />
                        {formTypes[type]}
                    </>
                )}
            </Card>
        </div>
    )
}

export default Forms

