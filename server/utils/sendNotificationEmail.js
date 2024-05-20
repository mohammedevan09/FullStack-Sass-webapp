import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

export const emailNotification = async (email, subject, html) => {
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
      from: `${process.env.COMPANY_NAME} <${process.env.USER}>`,
      to: email,
      subject: subject,
      // text: text,
      html,
    })
    // console.log('email sent successfully')
  } catch (error) {
    console.log(error)
  }
}

const bottomMail = `
  <p>To view the details and respond to your projects, please log in to your account.</p>
  <div style="border-radius: 4px;background: #0000ffb8;width: 200px;text-align: center;"> 
    <a href=${process.env.BASE_URL} target="_blank" style="padding: 8px 10px; border-radius: 6px; font-family: Helvetica, Arial, sans-serif;font-size: 14px; color: #ffffff;text-decoration: none;font-weight:bold;display: inline-block;">
      Go to Website
    </a> 
  </div> 
  <p>Best regards, <br>WP Sprint LLC</p>
`

export const notificationTypes = [
  // {
  //   type: 'message',
  //   template: (userName, title, content) => `
  //     <html>
  //       <body>
  //         <p>Hi ${userName},</p>
  //         <p>You have a new message</p>
  //         <blockquote>${content}</blockquote>
  //         ${bottomMail}
  //       </body>
  //     </html>
  //   `,
  // },
  {
    type: 'project',
    template: (userName, title, content) => `
      <html>
        <body>
          <h1>Project Update - ${title}</h1>
          <p>Hi ${userName},</p>
          <p>Your project "${title}" has been updated</p>
          <p>${content}</p>
          ${bottomMail}
        </body>
      </html>
    `,
  },
  {
    type: 'ticket',
    template: (userName, title, content) => `
      <html>
        <body>
          <h1>Support Ticket Update - ${title}</h1>
          <p>Hi ${userName},</p>
          <p>Your support ticket "${title}" has been updated:</p>
          <p>${content}</p>
          ${bottomMail}
        </body>
      </html>
    `,
  },
  {
    type: 'invoiceAndProposal',
    template: (userName, title, content) => `
      <html>
        <body>
          <h1>New Project - ${title}</h1>
          <p>Hi ${userName},</p>
          <p>You have received a new ${title}</p>
          <p>${content}</p>
          ${bottomMail}
        </body>
      </html>
    `,
  },
  {
    type: 'subscription',
    template: (userName, title, content) => `
      <html>
        <body>
          <h1>Subscription Update</h1>
          <p>Hi ${userName},</p>
          <p>Your subscription has been ${content}.</p>
          <p>${title}</p>
          ${bottomMail}
        </body>
      </html>
    `,
  },
  {
    type: 'meeting',
    template: (userName, title, content) => `
      <html>
        <body>
          <h1>Meeting Scheduled - ${title}</h1>
          <p>Hi ${userName},</p>
          <p>A new meeting "${title}" has been scheduled</p>
          <p>${content}</p>
          ${bottomMail}
        </body>
      </html>
    `,
  },
]

export const teamMemberNotification = (fullName, email, password) => {
  return `
      <html>
        <body>
          <p>Hi ${fullName},</p>
          <p>Congratulations! You are added as a team member</p>
          <p><b>Email - </b>${email}</p>
          <p><b>Password - </b>${password}</p>
          ${bottomMail}
        </body>
      </html>
    `
}
