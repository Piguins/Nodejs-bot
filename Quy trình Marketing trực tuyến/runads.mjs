import {
  Client,
  logger
} from "camunda-external-task-client-js";
import nodemailer from 'nodemailer';


// Configure the client
const config = { baseUrl: 'http://localhost:8080/engine-rest', use: logger };
const client = new Client(config);

// Create a transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Use your email service provider
  auth: {
    user: '21522537@gm.uit.edu.vn', // Your email address
    pass: 'sfqvdemszjogyvaf' // Your password
  }
});

// Subscribe to the external task
client.subscribe('runAds', async function({ task, taskService }) {
  try {

    const to = task.variables.get('to');
    const sub = task.variables.get('sub');
    const txt = task.variables.get('txt');
    // Define the email options
    const mailOptions = {
      from: '21522537@gm.uit.edu.vn', // Sender address
      to: to.toString(), // List of recipients
      subject: sub.toString(), // Subject line
      text: txt.toString() // Plain text body
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log('Email sent');

    // Complete the external task
    await taskService.complete(task);
  } catch (error) {
    console.log(error);

    // Handle any errors and fail the external task
    await taskService.handleFailure(task, {
      errorMessage: 'Failed to send email',
      errorDetails: error.message,
      retries: 0
    });
  }
});
