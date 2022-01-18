const nodemailer = require("nodemailer");
const {google} = require("googleapis");

/* Función que envía e-mail a la persona cuando crea alerta de empleo */
const enviarMail = async (req, res) => {
    
  const { CLIENT_ID, REFRESH_TOKEN, CLIENT_SECRET, REDIRECT_URI } = process.env;
  
  const {email}  = req.body;
//   const email = "tincho20012017@gmail.com";
  try {
      //voy a recibir el email por body para verificar si existe user.
   if(email){
    const HTML = `
    <h1> Hola </h1>
    <h4> Lindaaaaaaa </h4> `;

    const oAuth2Client = new google.auth.OAuth2(
      CLIENT_ID,
      CLIENT_SECRET,
      REDIRECT_URI
    );
    oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

    async function sendMail() {
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
          subject: "Mail de prueba",
          html: HTML,
        };

        const result = await transporter.sendMail(mailOptions);
        console.log(result);
        res.status(200).json("Enviado")
      } catch (error) {
        console.log(error);
      }
    }

    sendMail()
      .then((res) => {
        res.status(200).send("Enviado");
      })
      .catch((error) => console.log(error.message));
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  enviarMail,
};