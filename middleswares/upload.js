

const multer = require('multer');
const path = require('path');

// const mongoURI = 'mongodb://localhost:27017/auditOnlinee'; 
// const conn = mongoose.createConnection(mongoURI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })



// const storage = new GridFsStorage({
//     db: conn,
//     file: (req, file) => {
//         return new Promise((resolve, reject) => {
//             const filename = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`;
//             const fileInfo = {
//                 filename,
//                 bucketName: 'uploads' // نام مجموعه‌ای که فایل‌ها در آن ذخیره می‌شوند
//             };
//             resolve(fileInfo);
//         });
//     }
// });


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/auditOnlineAsset/uploads');  
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
    },
});


const fileFilter = (req, file, cb) => {
    const allowedFileTypes = /xlsx|xls/; 
    const extName = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());  
    const mimeType = /application\/vnd\.openxmlformats-officedocument\.spreadsheetml\.sheet/;  

    if (extName && mimeType) {
        cb(null, true);  
    } else {
        cb(new Error('Only .xls and .xlsx files are allowed!'));  
    }
};


const upload = multer({
    storage, 
    limits: { fileSize: 5 * 1024 * 1024 },  
    fileFilter, 
});

module.exports = upload;



