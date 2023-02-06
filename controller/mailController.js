const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "automazda999@gmail.com",
    pass: "ujtufozbvluzfath",
  },
});

const sendMail = (req, res, next) => {
  const mailOptions = {
    from: "automazda999@gmail.com",
    to: "hoangnguyenhoan@gmail.com",
    subject: "Quan tâm mua xe",
    text: `Họ và tên: ${req.body.name} \nSố điện thoại: ${req.body.phone} \nXe: ${req.body.car}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  res.render("thanks");
};

module.exports = {
  sendMail,
};
