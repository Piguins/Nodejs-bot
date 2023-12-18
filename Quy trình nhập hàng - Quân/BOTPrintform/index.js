
import { Client, logger } from "camunda-external-task-client-js";
import fs from 'fs';
import  PDFDocument  from "pdfkit";


// configuration for the client
const config = { baseUrl: 'http://localhost:8080/engine-rest', use: logger };

// create a new client instance
const client = new Client(config);


// subscribe to the "updateQuantity" topic
client.subscribe('BOTPrintForm', async function ({ task, taskService }) {
    //
    const type = task.variables.get("type");
    var ten = 'Not found';
    const code = task.variables.get("code");
    if (type == 34) { ten = 'X-Hunter'}
    else if (type == 77) { ten = 'XS-Hunter'}
    else if (type == 55) { ten = 'Ph-Hunter' }
    else if (type == 44) { ten = 'BitisX' }
    else if (type == 20) { ten = 'VroXX' }
    
    const doc = new PDFDocument();
    

    const date = new Date();
    const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;

    doc.font('Times-Roman');
    doc.pipe(fs.createWriteStream('C:/Users/PC/Desktop/BPMN/lab2/OutputData/form.pdf'));
    doc.fontSize(25).text('Form', 100, 80);
    doc.fontSize(14).text(`Ngày : ${formattedDate}`, 100, 110); 
    doc.fontSize(14).text(`Mã sản phẩm : ${type}`, 100, 130);
    doc.fontSize(14).text(`Tên sản phẩm : ${ten}`, 100, 150);
    doc.fontSize(14).text(`Mã code : ${code}`, 100, 170);    

    doc.end();   

    // complete the task with the updated quantity value
    await taskService.complete(task);
});