module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/graph/graph-image-generator.js":
/*!********************************************!*\
  !*** ./src/graph/graph-image-generator.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var chartjs_node_canvas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! chartjs-node-canvas */ "chartjs-node-canvas");
/* harmony import */ var chartjs_node_canvas__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(chartjs_node_canvas__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_formatters_decimal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/formatters/decimal */ "./src/utils/formatters/decimal.js");




const {
  registerFont
} = __webpack_require__(/*! canvas */ "canvas");

registerFont('./fonts/pns-regular-webfont.ttf', {
  family: 'pnregular'
});

const chartCallback = ChartJS => {};

const chartJsFactory = () => {
  const chartJS = __webpack_require__(/*! chart.js */ "chart.js");

  delete __webpack_require__.c[/*require.resolve*/(/*! chart.js */ "chart.js")];
  return chartJS;
};

const generateDates = count => Array.from({
  length: count
}).reduce((acc, _, index) => {
  const d = new Date();
  d.setDate(d.getDate() - index);
  acc.unshift(d.toLocaleDateString());
  return acc;
}, []);

const generateValues = (count, {
  from = 200,
  to = 500
} = {}) => Array.from({
  length: count
}).reduce(acc => {
  const value = Math.floor(Math.random() * (to - from) + from);
  acc.push(value);
  return acc;
}, []);

async function graphImageGenerator({
  labels = [],
  data = []
} = {}, {
  height = 500,
  width = 300
} = {}) {
  const dates = generateDates(7);
  const values = generateValues(7);
  const color = '#f4427d';
  const configuration = {
    type: 'line',
    maintainAspectRatio: false,
    responsive: true,
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        type: 'time',
        time: {
          minUnit: 'day'
        }
      }],
      yAxes: [{
        type: 'linear',
        ticks: {
          beginAtZero: true,
          callback: () => '$'
        }
      }]
    },
    data: {
      labels: dates,
      datasets: [{
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
        borderWidth: 2
      }]
    },
    plugins: {
      datalabels: {
        display: false
      }
    }
  };
  const canvasRenderService = new chartjs_node_canvas__WEBPACK_IMPORTED_MODULE_1__["CanvasRenderService"](width, height, chartCallback, undefined, chartJsFactory);
  const imgBuffer = await canvasRenderService.renderToBuffer(configuration);
  return imgBuffer;
}

/* harmony default export */ __webpack_exports__["default"] = (graphImageGenerator);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: handler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__dirname) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "handler", function() { return handler; });
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fs */ "fs");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! util */ "util");
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(util__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _react_pdf_renderer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @react-pdf/renderer */ "@react-pdf/renderer");
/* harmony import */ var _react_pdf_renderer__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_react_pdf_renderer__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _utils_streamToBuffer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/streamToBuffer */ "./src/utils/streamToBuffer.js");
/* harmony import */ var _graph_graph_image_generator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./graph/graph-image-generator */ "./src/graph/graph-image-generator.js");







const fs_writeFile = util__WEBPACK_IMPORTED_MODULE_2___default.a.promisify(fs__WEBPACK_IMPORTED_MODULE_1___default.a.writeFile);
process.env.FONTCONFIG_PATH = __dirname;

const handler = async (event, ctx) => {
  const graphImg = await Object(_graph_graph_image_generator__WEBPACK_IMPORTED_MODULE_6__["default"])({}, {
    width: 600,
    height: 300
  });
  const stream = await _react_pdf_renderer__WEBPACK_IMPORTED_MODULE_4___default.a.renderToStream(react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_react_pdf_renderer__WEBPACK_IMPORTED_MODULE_4__["Document"], null, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_react_pdf_renderer__WEBPACK_IMPORTED_MODULE_4__["Page"], {
    style: styles.body
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_react_pdf_renderer__WEBPACK_IMPORTED_MODULE_4__["Text"], {
    style: styles.title
  }, "Pug-A-Tron"), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_react_pdf_renderer__WEBPACK_IMPORTED_MODULE_4__["Text"], {
    style: styles.subtitle
  }, "Report for 04/19/2019"), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_react_pdf_renderer__WEBPACK_IMPORTED_MODULE_4__["Image"], {
    style: styles.image,
    src: "https://i.imgur.com/6lkT3WF.png"
  }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_react_pdf_renderer__WEBPACK_IMPORTED_MODULE_4__["Image"], {
    style: styles.graph,
    source: {
      data: graphImg,
      format: 'png'
    }
  }))));
  const buffer = await Object(_utils_streamToBuffer__WEBPACK_IMPORTED_MODULE_5__["default"])(stream);
  await fs_writeFile('./temp.pdf', buffer);
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      hello: 'world'
    })
  };
};

_react_pdf_renderer__WEBPACK_IMPORTED_MODULE_4__["Font"].register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
});
const styles = _react_pdf_renderer__WEBPACK_IMPORTED_MODULE_4__["StyleSheet"].create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Oswald'
  },
  subtitle: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 'auto',
    width: 200
  },
  graph: {
    marginVertical: 15,
    marginHorizontal: 'auto',
    width: 350
  }
});

/* WEBPACK VAR INJECTION */}.call(this, "/"))

/***/ }),

/***/ "./src/utils/formatters/decimal.js":
/*!*****************************************!*\
  !*** ./src/utils/formatters/decimal.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);


function decimal(locale = 'en-US') {
  return new Intl.NumberFormat(locale, {
    maximumFractionDigits: 0
  });
}

/* harmony default export */ __webpack_exports__["default"] = (decimal);

/***/ }),

/***/ "./src/utils/streamToBuffer.js":
/*!*************************************!*\
  !*** ./src/utils/streamToBuffer.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);


function streamToBuffer(stream) {
  return new Promise(function (res, rej) {
    const chunks = [];
    stream.on('data', chunk => chunks.push(chunk));
    stream.on('end', () => {
      const buffer = Buffer.concat(chunks);
      res(buffer);
    });
  });
}

/* harmony default export */ __webpack_exports__["default"] = (streamToBuffer);

/***/ }),

/***/ "@react-pdf/renderer":
/*!**************************************!*\
  !*** external "@react-pdf/renderer" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@react-pdf/renderer");

/***/ }),

/***/ "canvas":
/*!*************************!*\
  !*** external "canvas" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("canvas");

/***/ }),

/***/ "chart.js":
/*!***************************!*\
  !*** external "chart.js" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("chart.js");

/***/ }),

/***/ "chartjs-node-canvas":
/*!**************************************!*\
  !*** external "chartjs-node-canvas" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("chartjs-node-canvas");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "source-map-support/register":
/*!**********************************************!*\
  !*** external "source-map-support/register" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("source-map-support/register");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ })

/******/ });
//# sourceMappingURL=index.js.map