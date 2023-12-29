import nodemailer from 'nodemailer'

export default async (email, subject, text, html) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: Number(process.env.EMAIL_PORT),
      secure: Boolean(process.env.SECURE),
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    })

    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      // text: text,
      html: `<table width="100%" cellspacing="0" cellpadding="0"> 
  <tr>
    <td>
      <table cellspacing="0" cellpadding="0">
        <tr style="display: grid;"> 
        <h1>Welcome, Please verify your email</h1>
          <td style="border-radius: 4px;background: #0000ffb8;width: 70px;"> 
            <a href=${text} target="_blank" style="padding: 8px 16px; border-radius: 6px; font-family: Helvetica, Arial, sans-serif;font-size: 14px; color: #ffffff;text-decoration: none;font-weight:bold;display: inline-block;">
              Verify 
            </a> 
            </td> 
        </tr> 
      </table> 
    </td> 
  </tr> 
</table>`,
    })
    // console.log('email sent successfully')
  } catch (error) {
    next(error)
  }
}
