/**
 * Created by Dali on 08/01/15.
 */

"use strict";
var im = require("imagemagick"),
    path = require("path"),
    fs = require("fs");

var formats = {
    "icon.png": 57,
    "icon@2x.png": 114,
    "icon-40.png": 40,
    "icon-40@2x.png": 80,
    "icon-50.png": 50,
    "icon-50@2x.png": 100,
    "icon-60.png": 60,
    "icon-60@2x.png": 120,
    "icon-72.png": 72,
    "icon-72@2x.png": 144,
    "icon-76.png": 76,
    "icon-76@2x.png": 152,
    "icon-small.png": 29,
    "icon-small@2x.png": 58,
    "iTunesArtwork.png": 512,
    "iTunesArtwork@2x.png": 1024
};

window.ondragover = window.ondrop = function (e) {
    e.preventDefault();
    return false;
};

var el = document.querySelector("#drop");

el.ondragover = function () {
    this.className = "hover";
    this.innerHTML = "Drop the file";
    return false;
};

el.ondragleave = function () {
    this.className = "";
    this.innerHTML = "Drop your icon";
    return false;
};

el.ondrop = function (e) {
    e.preventDefault();
    for (var i = 0; i < e.dataTransfer.files.length; i++) {
        var file = e.dataTransfer.files[i].path;
        var ext = path.extname(file);

        var dirResult = path.basename(file, ext) + "-result";
        var dirname = path.dirname(file);


        if (!fs.existsSync(dirname + path.sep + dirResult)) {
            fs.mkdirSync(dirname + path.sep + dirResult);
        }

        var converted = 0;
        console.log("0");
        for (var format in formats) {
            console.log("1");
            var size = formats[format];
            console.log("2");
            var output = dirname + path.sep + dirResult + path.sep + format;
            console.log("do convert");
            im.convert([file, "-resize", size + "x" + size, output],
                function (err, stdout) {
                    if (err) {
                        throw err;
                    }
                    converted++;
                    if (converted === Object.keys(formats).length) {
                        el.className = "";
                        el.innerHTML = "Done.";
                        var audio = new Audio("sounds/0437.ogg");
                        audio.volume = 0.1;
                        audio.play();
                    }
                });
        }


    }
};

var fileExt = function (filename) {
    return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) : undefined;
};