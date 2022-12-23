import axios from "axios"

export const sendEmail = async (mailOptions) => {
    try {
        await axios.post("https://expense-server-ruddy.vercel.app/mail-api/v2", {
            mailOptions
        })
    } catch (error) {
        console.log(error)
    }
}

export const disableAccount = async (uid, action) => {
    // try {
    //     let data = await axios.get(`http://localhost:3001/auth-api/v1`);
    //     console.log(data)  https://auth-api-pink.vercel.app/auth-api/v2
    //     await axios.post("http://localhost:3001/auth-api/v2", {
    //         uid, action
    //     })
    // } catch (error) {
    //     console.log(error)
    // }
}
