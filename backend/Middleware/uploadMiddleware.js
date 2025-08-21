import multer from 'multer';
import path from 'path';
import fs from 'fs';

const ensureDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
};
ensureDir('uploads');
ensureDir('uploads/covers');
ensureDir('uploads/books');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'coverImage') {
      cb(null, 'uploads/covers/');
    } else if (file.fieldname === 'file') {
      cb(null, 'uploads/books/');
    } else {
      cb(null, 'uploads/');
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.fieldname === 'coverImage') {
    const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (allowedImageTypes.includes(file.mimetype)) return cb(null, true);
    return cb(new Error('Cover image must be JPEG, JPG, PNG, WebP, or GIF'), false);
  } else if (file.fieldname === 'file') {
    const allowedBookTypes = [
      'application/pdf',
      'application/epub+zip',
      'application/x-mobipocket-ebook',
      'text/plain',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    if (allowedBookTypes.includes(file.mimetype)) return cb(null, true);
    return cb(new Error('Book file must be PDF, EPUB, MOBI, TXT, DOC, or DOCX'), false);
  } else {
    return cb(new Error('Unexpected field'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024,
    fieldSize: 100 * 1024 * 1024,
    files: 2
  }
});

export const uploadBookFiles = upload.fields([
  { name: 'coverImage', maxCount: 1 },
  { name: 'file', maxCount: 1 }
]);
