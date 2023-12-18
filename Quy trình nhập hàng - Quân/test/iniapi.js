import { ConvertApi } from 'groupdocs-conversion-cloud';
import fs from 'fs';


// Get your App SID and App Key at https://dashboard.groupdocs.cloud (free registration is required).
ConvertApi.init("YOUR_APP_SID", "YOUR_APP_KEY");

// Upload file to cloud storage
const fileStream = fs.createReadStream("C:/Temp/ConvertApi/Test.docx");
const request = new UploadFileRequest("conversions", fileStream);
fileApi.uploadFile(request).then(function (response) {
    console.log("Expected response type is FilesUploadResult:", response);
}).catch(function (error) {
    console.log("Error while calling FileApi: ", error);
});
