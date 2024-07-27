const express = require("express");
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");

//server used to send message or emails
const app = express();
app.use(cors());
app.use(express.json());
app.use("/", router);
app.listen("5000", () => console.log("Server is Running"));

const contactGmail = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "********@gmail.com",
    pass: "",
  },
});

contactGmail.verify((error) => {
  if (error) {
    console.log("error when service is verifying.");
  } else {
    console.log("ready to send!.");
  }
});

router.post("/contact", (req, res) => {
  const name = req.body.firstName + req.body.lastName;
  const email = req.body.email;
  const phone = req.body.phone;
  const message = req.body.message;
  const mail = {
    from: name,
    to: "********@gmail.com",
    subject: "A New Message from Pham Lam Thai",
    html: `<p>Name: ${name}</p>
           <p>Email: ${email}</p>
           <p>Phone: ${phone}</p>
           <p>Message: ${message}</p>`,
  };
  contactGmail.sendMail(mail, (error) => {
    if (error) {
      res.json(error);
    } else {
      res.json({ code: 200, status: "Message Sent" });
    }
  });
});
