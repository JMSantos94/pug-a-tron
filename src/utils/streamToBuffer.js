function streamToBuffer(stream) {
    return new Promise(function(res, rej) {
        const chunks = [];

        stream.on('data', chunk => chunks.push(chunk));

        stream.on('end', () => {
            const buffer = Buffer.concat(chunks);
            res(buffer);
        });
    });
}

export default streamToBuffer;
