import { Client, logger } from "camunda-external-task-client-js";
import XlsxPopulate from 'xlsx-populate';




const config = {baseUrl: "http://localhost:8080/engine-rest",use: logger};
const client = new Client(config);

client.subscribe("BOTUpdatequantity", async function ({ task, taskService }) {
    const billladingcode=task.variables.get("billladingcode");
    const productname=task.variables.get("productname");
    const quantity=task.variables.get("quantity");
    const price=task.variables.get("price");
    const customername=task.variables.get("customername");
    const customeraddress=task.variables.get("customeraddress");
    const customerphone=task.variables.get("customerphone");
    const deliverymethod=task.variables.get("deliverymethod");
    const deliverydate=task.variables.get("deliverydate");
    const paymentamount=task.variables.get("paymentamount");
    console.log("billladingcode IS "+billladingcode);
    console.log("productname IS "+productname);
    console.log("QUANTquantityITY IS "+quantity);
    console.log("price IS "+price);
    console.log("customername IS "+customername);
    console.log("customeraddress IS "+customeraddress);
    console.log("customerphone IS "+customerphone);
    console.log("deliverymethod IS "+deliverymethod);
    console.log("deliverydate IS "+deliverydate);
    console.log("paymentamount IS "+paymentamount);


    


    XlsxPopulate.fromFileAsync('Book1.xlsx')
  .then(workbook => {
    const sheet = workbook.sheet(0); // Chọn sheet theo index (0 là sheet đầu tiên)

    const startingRow = 2; // Dòng bắt đầu kiểm tra

    // Kiểm tra từng dòng xem có dòng trống hay không
    let isEmptyRow = false;
    let rowIndex = startingRow;
    while (!isEmptyRow) {
      const cellValue = sheet.cell(`A${rowIndex}`).value(); // Kiểm tra giá trị ô trong cột A (có thể thay đổi cột kiểm tra tùy theo yêu cầu)
      if (cellValue === undefined || cellValue === null || cellValue === '') {
        isEmptyRow = true;
      } else {
        rowIndex++;
      }}

    sheet.cell('A1').value(billladingcode);
    sheet.cell('B1').value(productname);
    sheet.cell('C1').value(quantity);
    sheet.cell('D1').value(price);
    sheet.cell('E1').value(customername);
    sheet.cell('F1').value(customeraddress);
    sheet.cell('G1').value(customerphone);
    sheet.cell('H1').value(deliverymethod);
    sheet.cell('I1').value(deliverydate);
    sheet.cell('J1').value(paymentamount);
    return workbook.toFileAsync('Book1.xlsx'); // Lưu workbook vào file
  })
  .then(() => {
    console.log('Dữ liệu đã được thêm vào file Excel thành công');
  });

    await taskService.complete(task);
  });
