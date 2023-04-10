import { FILE_TYPE_NOT_SUPPORTED } from '../statics/ErrorCode';
import path from 'path';
import fs from 'fs';

export const multer = require('fastify-multer'); // or import multer from 'fastify-multer'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const pathDir = path.join(__dirname, '../public/pokemon/pictures');

    if (!fs.existsSync(pathDir)) fs.mkdirSync(pathDir, { recursive: true });
    cb(null, pathDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  },
});

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 1, // 10 MB
  },
  fileFilter: function (req, file, cb) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/gif') {
      cb(null, true);
    } else {
      // TODO: Throw error with 422
      console.log('MULTER :: File type not supported');
      cb(new Error(FILE_TYPE_NOT_SUPPORTED), false);
    }
  },
});
