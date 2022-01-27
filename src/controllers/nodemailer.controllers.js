const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const URL_FRONT = process.env.URL_FRONT;

const { User } = require("../database/db")

/* Función que envía e-mail a la persona cuando crea alerta de empleo */
const enviarMail = async (req, res) => {

  const { CLIENT_ID, REFRESH_TOKEN, CLIENT_SECRET, REDIRECT_URI } = process.env;

  const {post, jobs} = req.body;

  if (!post || !jobs) return res.status(400).send("No hay alertas de empleo");


  const users = await User.findAll({
    where: {
      usr_alerts: jobs
    }
  });

  const emails = users?.map(user => user.usr_email);


  try {
    //voy a recibir el email por body para verificar si existe user.
    if (emails.length) {
      const HTML = `
    <h1> Oportunidad para ${jobs[0]} </h1>
    <h4> ${post?.post_title} </h4>
    <p> ${post?.post_description} </p>
    <a href="${URL_FRONT}/post/${post?.post_id}"> Ver más </a>
    `;

      const oAuth2Client = new google.auth.OAuth2(
        CLIENT_ID,
        CLIENT_SECRET,
        REDIRECT_URI
      );
      oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

      async function sendMail(email) {
        try {
          const accessToken = await oAuth2Client.getAccessToken();
          const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              type: "OAuth2",
              user: "vsclothes2@gmail.com",
              clientId: CLIENT_ID,
              clientSecret: CLIENT_SECRET,
              refreshToken: REFRESH_TOKEN,
              accessToken: accessToken,
            },
          });
          const mailOptions = {
            from: "VSClothes <vsclothes2@gmail.com>",
            to: email,
            subject: "WorkApp - Oportunidad",
            html: HTML,
          };

          const result = await transporter.sendMail(mailOptions);
        } catch (error) {
          console.log(error);
        }
      }

      emails.forEach(async email => {
        await sendMail(email);
      });
    }

    res.status(200).json("Enviado")
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  enviarMail,
};