import multer from 'multer';
import path from 'path';



// Optional: set storage directory and filename strategy
const storage = multer.diskStorage({


  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Make sure this folder exists
  },
  
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  }

  
});




// Filter (optional)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'), false);
  }

};



const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB per file
  }
});



export const uploadBookFiles = upload.fields([
  { name: 'coverImage', maxCount: 1 },
  { name: 'file', maxCount: 1 }
]);

// export const uploadSingleFile = upload.single('coverImageUrl');