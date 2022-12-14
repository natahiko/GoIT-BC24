import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const {GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, GMAIL_REFRESH_TOKEN, GMAIL_ACCESS_TOKEN, GMAIL_USER} = process.env

const nodemailerConfig = {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        type: 'OAuth2',
        clientId: GMAIL_CLIENT_ID,
        clientSecret: GMAIL_CLIENT_SECRET,
        refreshToken: GMAIL_REFRESH_TOKEN,
        accessToken: GMAIL_ACCESS_TOKEN,
        user: GMAIL_USER
    }
}

const transporter = nodemailer.createTransport(nodemailerConfig)

export const sendEmail = async (data) => {
    try {
        const email = {
            ...data,
            from: GMAIL_USER
        }
        await transporter.sendMail(email)
        return true
    } catch (error) {
        console.log('error on send email', error)
        throw error;
    }
}
