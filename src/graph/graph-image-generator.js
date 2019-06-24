import { CanvasRenderService } from 'chartjs-node-canvas';

import formatPercentage from '../utils/formatters/percentage';
import formatDecimal from '../utils/formatters/decimal';

const { registerFont } = require('canvas');

import defaultColors from './default-colors';

registerFont('./fonts/pns-regular-webfont.ttf', { family: 'pnregular' });

const decimal = formatDecimal();

const optionsByType = {
    pie: {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
            display: false,
        },
        cutoutPercentage: 50,
        plugins: {
            datalabels: {
                color: 'white',
                font: {
                    size: 40,
                    weight: 'bold',
                    family: 'pnregular',
                },
                anchor: 'center',
            },
        },
    },
    polarArea: {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
            display: false,
        },
        cutoutPercentage: 50,
        scale: {
            gridLines: {
                lineWidth: 2.25,
                color: '#c6c6c6',
            },
            ticks: {
                fontSize: 30,
                showLabelBackdrop: true,
                backdropColor: 'white',
                backdropPaddingY: 5,
                backdropPaddingX: 5,
                fontColor: '#636363',
                fontFamily: 'pnregular',
                callback: function(value) {
                    return decimal.format(value);
                },
            },
        },
        plugins: {
            datalabels: {
                display: false,
            },
        },
    },
};

const chartCallback = ChartJS => {
    // ChartJS.plugins.register(LabelsPlugin);
};

const chartJsFactory = () => {
    const chartJS = require('chart.js');
    require('chartjs-plugin-datalabels');
    delete require.cache[require.resolve('chart.js')];
    delete require.cache[require.resolve('chartjs-plugin-datalabels')];
    return chartJS;
};

const borderRatio = 0.01;

async function graphImageGenerator(
    { labels = [], data = [] } = {},
    {
        type = 'pie',
        height = 500,
        width = 500,
        colors = ['#00c4b4', '#ff5a34', ...defaultColors],
        locale = 'en-US',
    } = {},
) {
    const options = optionsByType[type];

    const formatters = {
        percentage: formatPercentage(locale).format,
    };

    const configuration = {
        type,
        options,
        data: {
            labels,
            datasets: [
                {
                    data,
                    backgroundColor: colors,
                    borderColor: '#ffffff',
                    borderWidth: ((height + width) / 2) * borderRatio,
                    datalabels: {
                        formatter: formatters.percentage,
                    },
                },
            ],
        },
    };

    const canvasRenderService = new CanvasRenderService(
        width,
        height,
        chartCallback,
        undefined,
        chartJsFactory,
    );

    const imgBuffer = await canvasRenderService.renderToBuffer(configuration);

    return imgBuffer;
}

export default graphImageGenerator;
