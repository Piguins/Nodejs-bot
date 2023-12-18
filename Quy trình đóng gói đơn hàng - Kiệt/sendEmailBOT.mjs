import { Client, logger } from "camunda-external-task-client-js";
import nodemailer from 'nodemailer';

// Configure the client
const config = { baseUrl: 'http://localhost:8080/engine-rest', use: logger };
const client = new Client(config);

// Create a transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Use your email service provider
  auth: {
    user: 'thekiet.hoyo@gmail.com', // Your email address
    pass: 'Kiethongngu@1' // Your password
  }
});

// Subscribe to the external task
client.subscribe('sendMail', async function({ task, taskService }) {
  try {
    const emailString = task.variables.get('to');
    const emails = emailString.split(',');

    // Create an array to store the promises for sending emails
    const emailPromises = [];

    for (const email of emails) {
      // Define the email options
      const mailOptions = {
        from: '21522427@gm.uit.edu.vn', // Sender address
        to: email.trim(), // Individual recipient email address
        subject: task.variables.get('sub').toString(), // Subject line
        text: task.variables.get('txt').toString() // Plain text body
      };

      // Push the promise for sending each email into the array
      emailPromises.push(transporter.sendMail(mailOptions));
    }

    // Complete the external task
    await taskService.complete(task);
  } catch (error) {
    console.log(error);

    // Handle any errors and fail the external task
    await taskService.handleFailure(task, {
      errorMessage: 'Failed to send emails',
      errorDetails: error.message,
      retries: 0
    });
  }
});
