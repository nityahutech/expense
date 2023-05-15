import { Card, Divider, Select } from "antd"
import { useState } from "react"
import InvoiceForm from "./InvoiceForm"
import TravelForm from "./TravelForm"
import LaptopUpgradeForm from "./LaptopUpgradeForm"
import LaptopRepairForm from "./LaptopRepairForm"
import LaptopReturnForm from "./LaptopReturnForm"


const Forms = () => {
    const [type, setType] = useState(null)
    const formTypes = {
        "Invoice Reimbursement": <InvoiceForm />,
        "Laptop Upgrade": <LaptopUpgradeForm/>,
        "Laptop Repair": <LaptopRepairForm/>,
        "Laptop Return": <LaptopReturnForm/>,
        "Travel Booking": <TravelForm />
    }

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

