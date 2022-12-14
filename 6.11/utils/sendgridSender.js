import dotenv from 'dotenv'
import sgMail from '@sendgrid/mail'

dotenv.config();

const {SENDGRID_API_KEY, SENDGRID_USER} = process.env

sgMail.setApiKey(SENDGRID_API_KEY)

export const sendEmail = async (data) => {
    try{
        await sgMail.send({
            ...data,
            from: SENDGRID_USER
        })
    }catch (e){
        console.log('email error',e)
        throw e;
    }
}
