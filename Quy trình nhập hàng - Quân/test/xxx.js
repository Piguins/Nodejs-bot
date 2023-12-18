
import { Client, logger, Variables } from "camunda-external-task-client-js";
import fs from 'fs';
import  PDFDocument from "pdfkit";

// configuration for the client


// subscribe to the "updateQuantity" topic

    // get the quantity value from the task payload
    const type = 77;
    var ten = 'ten';
    const code = 'x12321321';
    if (type == 34) { ten = 'Xhunter' }
    else if (type == 77) { ten = 'Xshunter' }
    else { ten = 'PhunterX' };
    const doc = new PDFDocument();
    const date = new Date();
    const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
    doc.pipe(fs.createWriteStream('output.pdf'));
    doc.fontSize(25).text('Form', 100, 80);
    
    doc.fontSize(14).text(`Date: ${formattedDate}`, 100, 110);    
    doc.fontSize(14).text(`Ma san pham : ${type}`, 100, 130);
    doc.fontSize(14).text(`Ten san pham : ${ten}`, 100, 150);
    doc.fontSize(14).text(`Ma code : ${code}`, 100, 170);
    

    

    doc.end();
    // complete the task with the updated quantity value
   
