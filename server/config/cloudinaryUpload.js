import cloudinary from 'cloudinary';
import streamifier from 'streamifier';

export const streamUpload = (buffer, folder = 'profile_pics_penpixel', publicId = null) => {
  return new Promise((resolve, reject) => {
    const options = { folder };
    if (publicId) {
      options.public_id = publicId;
      options.overwrite = true;
    }

    const stream = cloudinary.v2.uploader.upload_stream(options, (error, result) => {
      if (result) resolve(result);
      else reject(error);
    });

    streamifier.createReadStream(buffer).pipe(stream);
  });
};
