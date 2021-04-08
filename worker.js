"use strict";

var imgData = null;
var originalPixels = null;
var currentPixels = null;
var srcImageheight = null;
var srcImagewidth = null;
var arr = null;

const R_OFFSET = 0;
const G_OFFSET = 1;
const B_OFFSET = 2;


onmessage = function(e) {
    imgData = e.data[0];
    originalPixels = e.data[1];
    var srcImageheight = e.data[2];
    var srcImagewidth = e.data[3];
    arr = srcImageheight * srcImagewidth * 4;

    /*console.log(imgData);
    console.log(originalPixels);
    console.log(currentPixels);
    console.log(srcImageheight);
    console.log(srcImagewidth);*/

    processImage2();
}

/*function getIndex(x, y) {
    return (x + y * srcImagewidth) * 4;
}

function clamp(value) {
    return Math.max(0, Math.min(Math.floor(value), 255));
}

function addBlue(x, y, value) {
    const index = getIndex(x, y) + B_OFFSET;
    const currentValue = currentPixels[index];
    currentPixels[index] = clamp(currentValue + value);
}

function processImage() {
    currentPixels = originalPixels.slice();

    for(let i = 0; i < srcImageheight; i++) {
        for(let j = 0; j < srcImagewidth; j++) {
            addBlue(j, i, 100);
        }
    }

    postMessage(currentPixels);
}*/

function processImage2() {
    currentPixels = originalPixels.slice();
    for(let i = 2; i < arr; ) {
        currentPixels[i] = 250;
        i = i+4;
    }

    postMessage(currentPixels);
}
