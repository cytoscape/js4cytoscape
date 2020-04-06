'use strict';

const converter = require ('./converter.js');

module.exports.convert = (cx, targetFormat) => { return converter.convert(cx, targetFormat); };
