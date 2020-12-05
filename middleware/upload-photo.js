const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

// we need to plug in access credentials to aws here
aws.config.update({
  secretAccessKey: process.env.AWSSecretAccessKey,
  accessKeyId: process.env.AWSAccessKey,
});

const s3 = new aws.S3();

// Now lets’s create a function that validates the file type:
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type, only JPEG and PNG is allowed!'), false);
  }
};

// Now we will setup Multer to process the image and send it to the S3 bucket.
const upload = multer({
  fileFilter,
  storage: multerS3({
    s3: s3,
    bucket: 'ecommercev1.0',
    acl: 'public-read',
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, Date.now().toString());
    },
  }),
});
module.exports = upload;
