const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = async (req, res) => {
    try {
        const { listname, listcolor, firstName, lastName, email, addresse, city } = req.body;
        const text = `Votre commande est constituée de ${listname.join(",")} de couleurs ${listcolor.join(",")}`;
        const text2 = `La commande est constituée de ${listname.join(",")} 
        de couleurs ${listcolor.join(",")}\n de ${firstName},${lastName},${email},${addresse},${city}`;
        
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.PASSWORD_USER
            }
        });

        let mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Résumé de Votre commande',
            text: text
        };

        let mailOptions2 = {
            from: process.env.EMAIL_USER,
            to: "tricotagogo351@gmail.com",
            subject: `Résumé de la commande de ${req.user.firstName}`,
            text: text2
        };

        let info = await transporter.sendMail(mailOptions);
        let info2 = await transporter.sendMail(mailOptions2);

        return { success: true, message: "E-mail envoyé avec succès" };
    } catch (error) {
        console.error("Erreur lors de l'envoi de l'email :", error);
        return { success: false, message: "Échec de l'envoi de l'email", error };
    }
};

module.exports = {sendEmail};