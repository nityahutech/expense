import { Card } from "antd"

const ViewInvoice = (props) => {
    console.log(props)
    return (
        <div>
            {props.data.date}
        </div>
    )
}

export default ViewInvoice