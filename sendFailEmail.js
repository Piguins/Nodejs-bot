const { Client, logger } = require("camunda-external-task-client-js");
const nodemailer = require("nodemailer");

// configuration for the Camunda worker
const config = { baseUrl: "http://camunda-g2.io.vn/engine-rest", use: logger };

// create a client instance with the configuration
const client = new Client(config);

// subscribe to the "send-email" topic
client.subscribe("failNotify", async function({ task, taskService }) {
  // retrieve the necessary data from the task payload
 // const { recipient, subject, body } = task.variables;
 const subject = "ket qua";
 const body = "ban da rot";


  

  // create a nodemailer transporter for sending the email
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "21522190@gm.uit.edu.vn",
      pass: "1810318672",
    },
  });

  // create the email message
  const message = {
    from: "21522190@gm.uit.edu.vn",
    to:"nkhang2306@gmail.com",
    subject: subject,
    text: body
  };

  // send the email using the transporter
  try {
    const info = await transporter.sendMail(message);
    console.log(`Email sent to ${recipient}: ${info.messageId}`);

    // complete the external task in Camunda
    await taskService.complete(task);
  } catch (error) {
    console.error(`Error sending email to ${recipient}: ${error}`);
  }
});