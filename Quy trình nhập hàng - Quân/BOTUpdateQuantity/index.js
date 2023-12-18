
import { Client, logger, Variables } from "camunda-external-task-client-js";
import fs  from 'fs';
import csv from 'csv-parser';


import { createObjectCsvWriter } from 'csv-writer';
// configuration for the client
const config = { baseUrl: 'http://localhost:8080/engine-rest', use: logger };

// create a new client instance
const client = new Client(config);

// subscribe to the "updateQuantity" topic
client.subscribe('BOTUpdateQuantity', async function ({ task, taskService }) {
    // get the quantity value from the task payload
    const type = task.variables.get("type");
    const quantity = parseInt(task.variables.get("quantity"));
    const results = [];
    fs.createReadStream('listcsv.csv')
        .pipe(csv())
        .on('data', (row) => {
            results.push(row);
        })
        .on('end', () => {
            if (type == 34){
                results[0].SL = parseInt(results[0].SL) + quantity;
            }else if (type == 77){
                results[1].SL = parseInt(results[1].SL) + quantity;
            } else if (type == 55) {
                results[2].SL = parseInt(results[2].SL) + quantity;
            } else if (type == 44) {
                results[3].SL = parseInt(results[3].SL) + quantity;
            }else if (type == 20){
                results[4].SL = parseInt(results[4].SL) + quantity;
            }else {};

            console.log('CSV file successfully processed');
            const csvWriter = createObjectCsvWriter({
                path: 'C:/Users/PC/Desktop/BPMN/lab2/InputData/listcsv.csv',
                header: [
                    { id: 'MA', title: 'MA' },
                    { id: 'Ten', title: 'Ten' },
                    { id: 'SL', title: 'SL' },
                ],
            });
            csvWriter.writeRecords(results).then(() => {
                console.log('CSV file successfully written');
            });
        });


    // complete the task with the updated quantity value
    await taskService.complete(task);
});