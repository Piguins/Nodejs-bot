import csv from 'csv-parser';
import fs from 'fs';
import { createObjectCsvWriter } from 'csv-writer';
import csvtoxlsx from '@aternus/csv-to-xlsx';

const converter = csvtoxlsx();

const readStream = fs.createReadStream('listcsv.csv').pipe(csv());

let data = [];

readStream.on('data', (chunk) => {
    data.push(chunk);
});

readStream.on('end', () => {
    const csvWriter = createObjectCsvWriter({
        path: 'listcsv.csv',
        header: [
            { id: 'MA', title: 'MA' },
            { id: 'Ten', title: 'Ten' },
            { id: 'SL', title: 'SL' },
        ],
    });

    csvWriter.writeRecords(data).then(() => {
        console.log('CSV file written successfully');

        converter({
            input: './listcsv.csv',
            output: './listexcel.xlsx',
        })
            .then(() => {
                console.log('Excel file written successfully');
            })
            .catch((error) => {
                console.log(error);
            });
    });
});
