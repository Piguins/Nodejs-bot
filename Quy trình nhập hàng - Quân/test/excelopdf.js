import { ConvertApi } from 'groupdocs-conversion-cloud';
import fs from 'fs';


const convertApi = new ConvertApi();

const inputFile = 'list.xlsx';
const outputFile = 'exceltopdf.pdf';

convertApi.convertDocument(
    {
        format: 'pdf',
        file: fs.createReadStream(inputFile),
    },
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    {
        outputFilePath: outputFile,
    }
).then((response) => {
    console.log('Document converted successfully: ' + response[0].url);
});
