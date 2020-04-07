var fs = require('fs');
var path = require('path');
var converter = require('../../build/bundle.js');

var targetFormat = undefined;
if (process.argv[2]) {
    targetFormat = process.argv[2];
}

var sourceFileName = undefined;
if (process.argv[3]) {
    sourceFileName = process.argv[3];
}

var targetFileName = undefined;
if (process.argv[4]) {
    targetFileName = process.argv[4];
}

const loadStartTime = new Date().getTime();
var content = fs.readFileSync(sourceFileName);
var rawCX = JSON.parse(content);

const loadEndTime = new Date().getTime();

console.info('loaded in: ' + (loadEndTime - loadStartTime) + ' milliseconds');

const convertStartTime = new Date().getTime();

var converted = converter.convert(rawCX, targetFormat);

const convertEndTime = new Date().getTime();

console.info('converted in: ' + (convertEndTime - convertStartTime) + ' milliseconds');

fs.writeFileSync(targetFileName, JSON.stringify(converted, null, 2));
