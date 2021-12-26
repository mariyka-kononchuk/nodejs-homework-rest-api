const multer = require('multer');
const path = require('path');
const Jimp = require('jimp');

const tempDir = path.join(__dirname, '../', 'temp');

const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 2048
  }
});

const upload = multer({
  storage:multerConfig
})

module.exports = upload;

// Jimp.read(tempDir)
//         .then(image => {
//             image.resize(250, 250) 
//             image.write(imageName);
//         })
//   .catch(err => {
//           error
//         });

   


