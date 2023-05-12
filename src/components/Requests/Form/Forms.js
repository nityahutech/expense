import { Card, Divider, Select } from "antd"
import { useState } from "react"
import InvoiceForm from "./InvoiceForm"
import TravelForm from "./TravelForm"

const Forms = () => {
    const [type, setType] = useState(null)
    const formTypes = {
        "Invoice Reimbursement": <InvoiceForm />,
        "Laptop Upgrade": null,
        "Laptop Repair": null,
        "Laptop Return": null,
        "Travel Booking": <TravelForm />
    }

    return (
        <div className="personalCardDiv">
            <Card
                className="personal"
                style={{width: "90%"}}
                title="Forms"
                bordered={true}
                hoverable={true}
            >
                <Select
                    placeholder="Select Form Type"
                    allowClear
                    onChange={(e) => setType(e || null)}
                    style={{minWidth: "200px", width: "40%"}}
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

// import AllForms from "./AllForms"

// const Forms = () => {
//     return (
//         <div>
//             <AllForms />
//         </div>
//     )
// }

// export default Forms