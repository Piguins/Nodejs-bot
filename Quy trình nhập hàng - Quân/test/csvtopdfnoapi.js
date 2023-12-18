import { PDFDocument , rgb} from 'pdf-lib';
import fs from 'fs';
import csv from 'csv-parser';
import { promisify } from 'util';
import csvToJson from 'csvtojson';


(async () => {
    const jsonArray = await csvToJson().fromFile('listcsv.csv');

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();

    const { width, height } = page.getSize();

    const fontSize = 12;
    const lineHeight = fontSize * 1.5;
    const margin = 72;

    const textOptions = {
        size: fontSize,
        lineHeight,
        font: await pdfDoc.embedFont('Helvetica'),
        color: rgb(0, 0, 0),
    };

    let y = height - margin;

    for (let i = 0; i < jsonArray.length; i++) {
        const row = jsonArray[i];

        let x = margin;

        for (let key in row) {
            page.drawText(row[key], {
                x,
                y,
                ...textOptions,
            });

            x += width / Object.keys(row).length;
        }

        y -= lineHeight;
    }

    fs.writeFileSync('csvtopdfnoapi.pdf', await pdfDoc.save());
})();
