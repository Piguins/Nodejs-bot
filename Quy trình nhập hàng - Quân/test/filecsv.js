import fs, { write } from 'fs';
import csv from 'csv-parser';


import { createObjectCsvWriter } from 'csv-writer';

const results = [];
fs.createReadStream('listcsv.csv')
    .pipe(csv())
    .on('data', (row) => {
        results.push(row);
    })
    .on('end', () => {
        results[2].SL = parseInt(results[2].SL) + 3;
        console.log(parseInt(results[2].SL)+ 1);
        console.log('CSV file successfully processed');
        const csvWriter = createObjectCsvWriter({
            path: 'output.csv',
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

