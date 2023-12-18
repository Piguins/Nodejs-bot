import { Client, logger } from "camunda-external-task-client-js";
import XlsxPopulate from 'xlsx-populate';
import XLSX from 'xlsx';
import PDFDocument from 'pdfkit';
import fs from 'fs';




const config = {baseUrl: "http://localhost:8080/engine-rest",use: logger};
const client = new Client(config);

client.subscribe("BOTPrintform", async function ({ task, taskService }) {

  const excelFile = 'Book1.xlsx';

  // Đọc file Excel
  const workbook = XLSX.readFile(excelFile);
  
  // Chọn sheet trong workbook
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  
  // Parse dữ liệu từ sheet
  const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
  
  // Đường dẫn tới file PDF
  const pdfFile = 'file.pdf';
  
  // Tạo một document PDF mới
  const doc = new PDFDocument();
  
  // Mở file PDF để ghi dữ liệu
  doc.pipe(fs.createWriteStream(pdfFile));
  
  // Ghi dữ liệu từ file Excel vào file PDF
  data.forEach(row => {
    row.forEach(cell => {
      doc.text(cell.toString());
    });
    doc.moveDown();
  });
  
  // Kết thúc ghi dữ liệu và đóng file PDF
  doc.end();
    await taskService.complete(task);
  });
