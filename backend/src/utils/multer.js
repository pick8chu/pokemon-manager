"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.multer = void 0;
var ErrorCode_1 = require("../statics/ErrorCode");
var path_1 = require("path");
var fs_1 = require("fs");
exports.multer = require('fastify-multer'); // or import multer from 'fastify-multer'
var storage = exports.multer.diskStorage({
    destination: function (req, file, cb) {
        var pathDir = path_1.default.join(__dirname, '../public/pokemon/pictures');
        if (!fs_1.default.existsSync(pathDir))
            fs_1.default.mkdirSync(pathDir, { recursive: true });
        cb(null, pathDir);
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    },
});
exports.upload = (0, exports.multer)({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 1, // 10 MB
    },
    fileFilter: function (req, file, cb) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/gif') {
            cb(null, true);
        }
        else {
            // TODO: Throw error with 422
            console.log('MULTER :: File type not supported');
            cb(new Error(ErrorCode_1.FILE_TYPE_NOT_SUPPORTED), false);
        }
    },
});
