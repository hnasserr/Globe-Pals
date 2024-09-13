import { v2 as cloudinary } from "cloudinary";

export const imageUpload = async(file, folder) => {
  try {
    const result = await cloudinary.uploader.upload(file.path, { folder: folder });
    console.log(result);
    return {
      url: result.secure_url,
      public_id: result.public_id
    };
  } catch(e) {
    console.log(e);
  }
}

export const imageUpload2 = async (file, folder) => {
  try {
    let uploadResult;
    console.log(uploadResult);
    
    if (typeof file === 'string') {
      // If file is a string (URL or base64), upload directly
      uploadResult = await cloudinary.uploader.upload(file, { folder: folder });
    } else if (file && file.url) {
      // If file is an object with a url property, upload from that URL
      uploadResult = await cloudinary.uploader.upload(file.url, { folder: folder });
    } else if (file && file.path) {
      // If file is an object with a path property, upload from path
      uploadResult = await cloudinary.uploader.upload(file.path, { folder: folder });
    } else {
      throw new Error('Invalid file format');
    }

    console.log('Cloudinary upload result:', uploadResult);
    return {
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id
    };
  } catch (e) {
    console.log('Error in imageUpload2:', e);
    throw e;
  }
}
