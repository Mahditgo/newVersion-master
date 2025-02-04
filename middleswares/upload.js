

const multer = require('multer');
const path = require('path');


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
