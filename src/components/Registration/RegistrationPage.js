import { Card, Divider } from "antd"
import { Outlet } from "react-router-dom"

const RegistrationPage = (props) => {
    return (
        <Card
            title="Registration page"
        >
            <Divider />
            <Outlet />
        </Card>
    )
}

export default RegistrationPage