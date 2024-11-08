const nodemailer = require('nodemailer')

const send365Email = async (from, to, subject, html, text, attachments) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.office365.com',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: 'leaveapp@ugmc.ug.edu.gh',
        pass: 'Genesis1:1',
        //gmailpass: "ognbuqgwnjdzjhmg",
      },

      tls: { ciphers: 'SSLv3' },
    })

    await transporter.sendMail({
      from,
      to,
      subject,
      html,
      text,
      attachments,
    })
  } catch (err) {
    console.log(err)
  }
}

module.exports = send365Email
