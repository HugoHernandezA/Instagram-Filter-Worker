"use strict";

function spin() {
    const spinner = document.getElementById("spinner");
    let angle = 0;
    setInterval(() => {
        angle++;
        spinner.style.transform = `rotate(${angle}deg)`;
    }, 20);
}

spin();

const fileinput = document.getElementById("fileinput");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const srcImage = new Image();

let imgData = null;
let originalPixels = null;
let currentPixels = null;

/*/////////////////////////////////////////////////////// */

const primeWorker = new Worker("/worker.js");

/*primeWorker.onmessage = function(event) {
    document.getElementById("result").innerHTML = event.data;
};

function startProcessingFilter() {
    primeWorker.postMessage("process");
}*/

/*/////////////////////////////////////////////////////// */

fileinput.onchange = function (e) {
    if(e.target.files && e.target.files.item(0)) {
        srcImage.src = URL.createObjectURL(e.target.files[0]);
    }
};

srcImage.onload = function () {
    canvas.width = srcImage.width;
    canvas.height = srcImage.height;
    ctx.drawImage(srcImage, 0, 0, srcImage.width, srcImage.height);
    imgData = ctx.getImageData(0, 0, srcImage.width, srcImage.height);
    originalPixels = imgData.data.slice();
};

function getIndex(x, y) {
    return (x + y * srcImage.width) * 4;
}

function clamp(value) {
    return Math.max(0, Math.min(Math.floor(value), 255));
}

/*const R_OFFSET = 0;
const G_OFFSET = 1;
const B_OFFSET = 2;

function addBlue(x, y, value) {
    const index = getIndex(x, y) + B_OFFSET;
    const currentValue = currentPixels[index];
    currentPixels[index] = clamp(currentValue + value);
}

function processImage() {
    currentPixels = originalPixels.slice();

    for(let i = 0; i < srcImage.height; i++) {
        for(let j = 0; j < srcImage.width; j++) {
            addBlue(j, i, 100);
        }
    }

    commitChanges();
}*/

function processImage2() {
    primeWorker.postMessage([imgData, originalPixels, srcImage.height, srcImage.width]);
}

primeWorker.onmessage = function(e) {
    currentPixels = e.data;
    //console.log(currentPixels);
    commitChanges();
}

function commitChanges() {
    for(let i = 0; i < imgData.data.length; i++) {
        imgData.data[i] = currentPixels[i];
    }

    ctx.putImageData(imgData, 0, 0, 0, 0, srcImage.width, srcImage.height);
}
