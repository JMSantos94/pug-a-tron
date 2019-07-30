import aws from 'aws-sdk';

aws.config.region = 'us-east-1';

const uploadPdfToS3 = (BUCKET, FOLDER_PATH) => (stream, filename) => {
    return new Promise(async function(res, rej) {
        const s3 = new aws.S3();
        const timestamp = Date.now();

        const key = `${FOLDER_PATH}/${filename}-${timestamp}.pdf`;

        const params = {
            Key: key,
            Bucket: BUCKET,
            Body: stream,
            ContentType: 'application/pdf',
        };

        // Notice use of the upload function, not the putObject function
        s3.upload(params, function(err, response) {
            if (err) console.error(err);
            res('https://your-domain-here.com/' + key);
        });
    });
};

export default uploadPdfToS3;
