import fs from 'fs';
import util from 'util';
import React from 'react';

import ReactPDF, {
    View,
    Text,
    Font,
    Image,
    StyleSheet,
    Document,
    Page,
} from '@react-pdf/renderer';

import streamToBuffer from './utils/streamToBuffer';
import generateGraph from './graph/graph-image-generator';

const fs_writeFile = util.promisify(fs.writeFile);

process.env.FONTCONFIG_PATH = __dirname;

// import uploadPdf from './utils/uploadPdfToS3';

const handler = async (event, ctx) => {
    const graphImg = await generateGraph({}, { width: 600, height: 300 });

    const stream = await ReactPDF.renderToStream(
        <Document>
            <Page style={styles.body}>
                <Text style={styles.title}>Pug-A-Tron</Text>
                <Text style={styles.subtitle}>Report for 04/19/2019</Text>
                <Image
                    style={styles.image}
                    src="https://i.imgur.com/6lkT3WF.png"
                />
                <Image
                    style={styles.graph}
                    source={{
                        data: graphImg,
                        format: 'png',
                    }}
                />
            </Page>
        </Document>,
    );

    const buffer = await streamToBuffer(stream);
    await fs_writeFile('./temp.pdf', buffer);

    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({
            hello: 'world',
        }),
    };
};

Font.register({
    family: 'Oswald',
    src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
});

// PDF Styles
const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        fontFamily: 'Oswald',
    },
    subtitle: {
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 40,
    },
    image: {
        marginVertical: 15,
        marginHorizontal: 'auto',
        width: 200,
    },
    graph: {
        marginVertical: 15,
        marginHorizontal: 'auto',
        width: 350,
    },
});

export { handler };
