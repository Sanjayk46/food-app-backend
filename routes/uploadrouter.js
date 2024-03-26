const express = require('express');
const multer = require('multer');
const admin = require('../middleware/admin');
const handler =require ('express-async-handler');
const router = express.Router();
const BAD_REQUEST= 400;
const UNAUTHORIZED = 401;
const upload = multer();
const cloudinary = require('../config/cloudinary');
router.post(
    '/',
    admin,
    upload.single('image'),
    handler(async (req, res) => {
      const file = req.file;
      if (!file) {
        res.status(BAD_REQUEST).send();
        return;
      }
  
      const imageUrl = await uploadImageToCloudinary(req.file?.buffer);
      res.send({ imageUrl });
    })
  );
  
  const uploadImageToCloudinary = imageBuffer => {
    const cloudinary = configCloudinary();
  
    return new Promise((resolve, reject) => {
      if (!imageBuffer) reject(null);
  
      cloudinary.uploader
        .upload_stream((error, result) => {
          if (error || !result) reject(error);
          else resolve(result.url);
        })
        .end(imageBuffer);
    });
  };
   module.exports = router;