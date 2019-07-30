import { CanvasRenderService } from 'chartjs-node-canvas';

import formatDecimal from '../utils/formatters/decimal';

const { registerFont } = require('canvas');

registerFont('./fonts/pns-regular-webfont.ttf', { family: 'pnregular' });

const chartCallback = ChartJS => {
    // ChartJS.plugins.register(LabelsPlugin);
};

const chartJsFactory = () => {
    const chartJS = require('chart.js');
    delete require.cache[require.resolve('chart.js')];
    return chartJS;
};

const generateDates = count =>
    Array.from({ length: count }).reduce((acc, _, index) => {
        const d = new Date();
        d.setDate(d.getDate() - index);
        acc.unshift(d.toLocaleDateString());
        return acc;
    }, []);

const generateValues = (count, { from = 200, to = 500 } = {}) =>
    Array.from({ length: count }).reduce(acc => {
        const value = Math.floor(Math.random() * (to - from) + from);
        acc.push(value);
        return acc;
    }, []);

const decimal = formatDecimal();

async function graphImageGenerator(
    { labels = [], data = [] } = {},
    { height = 500, width = 300 } = {},
) {
    const dates = generateDates(7);
    const values = generateValues(7);

    const color = '#f4427d';

    const configuration = {
        type: 'line',
        maintainAspectRatio: false,
        responsive: true,
        options: {
            legend: {
                labels: {
                    fontSize: 14,
                    fontColor: '#969696',
                },
            },
            scales: {
                xAxes: [
                    {
                        type: 'time',
                        time: {
                            minUnit: 'day',
                        },
                        gridLines: {
                            color: '#d1d1d1',
                        },
                        ticks: {
                            fontSize: 14,
                        },
                    },
                ],
                yAxes: [
                    {
                        type: 'linear',
                        gridLines: {
                            color: '#d1d1d1',
                        },
                        ticks: {
                            fontSize: 14,
                            beginAtZero: true,
                            callback: value => `$${decimal.format(value)}`,
                        },
                    },
                ],
            },
        },
        data: {
            labels: dates,
            datasets: [
                {
                    label: 'Pug Stocks',
                    lineTension: 0,
                    backgroundColor: color,
                    borderColor: color,
                    borderCapStyle: 'butt',
                    borderWidth: 1.5,
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: '#fff',
                    pointBackgroundColor: color,
                    pointBorderWidth: 1,
                    pointHoverRadius: 2,
                    pointHoverBackgroundColor: color,
                    pointHoverBorderColor: color,
                    pointHoverBorderWidth: 2,
                    pointRadius: 5,
                    pointHitRadius: 10,
                    data: values,
                    fill: false,
                    borderWidth: 2,
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
