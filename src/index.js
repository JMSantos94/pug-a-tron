import React from 'react';
import ReactPDF from '@react-pdf/renderer';

// import fs from 'fs';
// import util from 'util';

// const fs_writeFile = util.promisify(fs.writeFile);
// import streamToBuffer from './utils/streamToBuffer';

process.env.FONTCONFIG_PATH = __dirname;

import uploadPdf from './utils/uploadPdfToS3';

const handler = async (event, ctx) => {
    

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({
                pdfUrl,
                reportId,
            }),
        };
}

export { default };
