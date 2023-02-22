import { EyeInvisibleOutlined, EyeTwoTone, LoadingOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

const EmailVerification = () => {
    const [parameters, setParameters] = useState(false)
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const { handleVerifyEmail, handlePasswordReset } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        let params = {};
        window.location.href.split('?')[1].split('&').map(x => {
            let temp = x.split('=');
                params = {
                ...params,
                [`${temp[0]}`]: temp[1]
            }
        })
        setParameters(params)
    }, [])

    const changePassword = async () => {
        try {
            setLoading(true)
            let res = {}
            switch(parameters.mode) {
                case "verifyEmail":  
                    res = await handleVerifyEmail(parameters.oobCode, password)
                        break;
                case "resetPassword": 
                    res = await handlePasswordReset(parameters.oobCode, password)
            }
            setTimeout(async () => {
                sessionStorage.setItem("accessToken", res.user.accessToken);
                sessionStorage.setItem("user", JSON.stringify(res.user));
                setLoading(false)
                setSuccess(true)
                setTimeout(() => {
                    navigate("/DashBoard", { replace: true });
                }, 5000)
            }, 2500)
        } 
        catch (err) {
            setError(err)
            setTimeout(() => {
                navigate("/", { replace: true });
            }, 5000)
        }
    }

    if (success)  return (
        <Modal 
            open={true}
            footer={null}
            closable={false}
        >
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <h1>Success</h1>
                <LoadingOutlined style={{height: "40px", fontSize: "40px"}} />
            </div>
            <p>{parameters.mode == "verifyEmail" ? "Your account has been successfully verified and y": "Y"}our password has been set. In 5 seconds you will be redirected to your Dashboard.</p>
        </Modal>
    )

    if (error) {
        let message = error.message;
        switch(error.code) {
            case "auth/invalid-action-code": message = "code timeout. Please go to 'Forgot Password' to send email link again."
        }
        return (
            <Modal 
                open={true}
                footer={null}
                closable={false}
            >
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <h1>Error</h1>
                    <LoadingOutlined style={{height: "40px", fontSize: "40px"}} />
                </div>
                <p>Password reset failed due to {message} In 5 seconds you will be redirected to you Dashboard.</p>
            </Modal>
        )
    }

    return (
        <Modal 
            open={true}
            footer={null}
            closable={false}
        >
            <h1>{parameters.mode == "verifyEmail" ? "Email Verification" : "Password Reset"}</h1>
            <p>Please enter your new password below.</p>
            <Form>
                <Form.Item
                    name="password"
                    rules={[
                            {
                                required: true,
                                message: "Please Enter Password"
                            },
                            {
                                pattern: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,25}$/,
                                message: <div>Password must
                                            <ul>
                                                <li>- be 8-25 characters in length</li>
                                                <li>- have at least one Number</li>
                                                <li>- have at least one Special Character</li>
                                                <li>- have at least one Uppercase Letter</li>
                                            </ul>
                                        </div>
                            }
                        ]}
                >
                    <Input.Password
                        className="password-input-len"
                        maxLength={25}
                        style={{justifyContent: "space-between", width: "100%"}}
                        onChange={e => setPassword(e.target.value.trim())}
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                </Form.Item>
                <div style={{display: "flex", justifyContent: "flex-end"}}>
                    <Button className="color-button" type="primary" style={loading ? { backgroundColor: "lightgray", color: "gray" } : null} onClick={changePassword}>
                        {loading && (<LoadingOutlined />)}
                        {loading? "Saving": "Set Password"}
                    </Button>
                </div>
            </Form>
        </Modal>
    )
}

export default EmailVerification;