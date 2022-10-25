import axios from "axios"

export const sendEmail = async (mailOptions) => {
    console.log(mailOptions)
    try {
        await axios.post("https://expense-email.herokuapp.com/api2", {
            mailOptions
            
        })
    } catch (error) {
        console.log(error)
    }
}
