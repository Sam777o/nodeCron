import _ from 'lodash';
import {createTransport} from 'nodemailer';
import path from 'path';
import fs from 'fs'

const transporter = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: 'minasyansamo24@gmail.com',
        pass: 'eolektdtlqcroapz'
    }
});

class Mail {
    static send( subject,  html) {
        return transporter.sendMail({
            from: '"Samvel Minasyan" <minasyansamo24@gmail.com>',
            to:"minasyansamo24@gmail.com",
            subject: subject,
            html:html
        });
    }
}

export default Mail