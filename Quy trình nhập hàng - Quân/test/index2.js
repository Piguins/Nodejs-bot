import fs from 'fs';
import { Client, logger } from 'camunda-external-task-client-js';

const config = { baseUrl: 'http://localhost:8080/engine-rest', use: logger };
const client = new Client(config);

client.subscribe('BOTUpdateQuantity', async function ({ task, taskService }) {
    const rows = [];
    fs.createReadStream('./listcsv.csv')
        .pipe(csv())
        .on('data', (row) => {
            rows.push(row);
        })
        .on('end', () => {
            const quantity = rows.map((row) => row[2]);
            const updatedQuantity = quantity.map((q) => q + 1);
            console.log(updatedQuantity);
            taskService.complete(task);
        });
});