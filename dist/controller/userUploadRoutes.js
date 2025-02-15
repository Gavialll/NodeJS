"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Busboy = require("busboy");
const userUploadRoutes = require("express").Router();
const SAVE_SUCCESSFUL = '💾 Save successful';
const UPDATE_SUCCESSFUL = '🔄 Update successful';
const USER_NOT_FOUND = '⛔ User not found';
const DELETE_SUCCESSFUL = '🗑️ Delete successful';
// userUploadRoutes.post('/upload', (req: Request, res: Response) => {
//     const busboy = new Busboy({ headers: req.headers });
//
//     busboy.on('file', (fieldname, file, filename) => {
//         console.log(`Отримано файл: ${filename}`);
//
//         const saveTo = path.join(__dirname, 'uploads', filename);
//         const fileStream = createWriteStream(saveTo);
//
//         file.pipe(fileStream); // ✅ Тепер pipe() буде працювати!
//
//         fileStream.on('finish', () => {
//             console.log(`Файл збережено як: ${saveTo}`);
//         });
//     });
//
//     busboy.on('finish', () => {
//         res.send({ message: 'Файл успішно завантажено!' });
//     });
//
//     req.pipe(busboy); // ✅ Обов'язково використовуй pipe() тут
// });
module.exports = userUploadRoutes;
