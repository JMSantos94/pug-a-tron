import aws from 'aws-sdk';

aws.config.region = 'us-east-1';

const uploadPdfToS3 = (BUCKET, FOLDER_PATH, isReport) => (
    stream,
    filename,
    clientId,
) => {
    return new Promise(async function(res, rej) {
        // const sts = new aws.STS();
        // sts.assumeRole(
        //     {
        //         RoleArn: 'arn:aws:iam::564061425806:role/AssumeSports',
        //         RoleSessionName: 'sports',
        //     },
        //     function(err, data) {
        //         if (err) {
        //             // an error occurred
        //             console.log('Cannot assume role');
        //             console.log(err, err.stack);
        //         } else {
        //             // successful response
        //             aws.config.update({
        //                 accessKeyId: data.Credentials.AccessKeyId,
        //                 secretAccessKey: data.Credentials.SecretAccessKey,
        //                 sessionToken: data.Credentials.SessionToken,
        //             });

        const s3 = new aws.S3();
        const timestamp = Date.now();

        const key = isReport
            ? `${FOLDER_PATH}/${clientId}/${filename}-${timestamp}.pdf`
            : `${FOLDER_PATH}/${timestamp}.pdf`;

        var params = {
            Key: key,
            Bucket: BUCKET,
            Body: stream,
            ContentType: 'application/pdf',
        };

        // Notice use of the upload function, not the putObject function
        s3.upload(params, function(err, response) {
            if (err) console.error(err);
            res('https://sports-cdn.ggops.com/' + key);
        });
    });
};

export default uploadPdfToS3;
