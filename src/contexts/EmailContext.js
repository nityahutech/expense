import axios from "axios"

export const sendEmail = async (mailOptions) => {
    // OLD api
    // try {
    //     await axios.post("https://expense-server-ruddy.vercel.app/mail-api/v2", {
    //         mailOptions
    //     })
    // } catch (error) {
    //     console.log(error)
    // }

    // devina's API
    try {
        await axios.post("https://expense-server-seven.vercel.app/mail-api/v2", {
            mailOptions
        })
    } catch (error) {
        console.log(error)
    }

    // LOCALHOST API
    // try {
    //     await axios.post("http://localhost:3001/mail-api/v2", {
    //         mailOptions
    //     })
    // } catch (error) {
    //     console.log("error at sendEmail:",error)
    // }
}

export const changeAccount = async (uid, action, email) => {
    let data = email || null
    try {
        await axios.post("https://auth-api-pink.vercel.app/auth-api/v2", {
            uid, action, data
        })
    } catch (error) {
        console.log(error)
    }
}

export const isUserVerified = async (email) => {
    try {
        let user = await axios.post("https://auth-api-pink.vercel.app/auth-api/v3", {
            email
        })
        return user.data.userRecord;
    } catch (error) {
        console.log(error)
    }
}

export const sendVerificationEmail = async (email) => {
    try {
        let user = await axios.post("http://localhost:3001/auth-api/v4", {
            email
        })
    } catch (error) {
        console.log(error)
    }
}

export const webClock = async () => {
    // try {
    //     await axios.post("http://localhost:3001/web-clock/v1")
    // } catch (error) {
    //     console.log(error)
    // }
}
