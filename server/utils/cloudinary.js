import dotenv from 'dotenv'
dotenv.config()

import cloudinary from 'cloudinary'
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const cloudinaryUploadImg = async (fileToUploads) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      fileToUploads,
      (result, error) => {
        if (error) {
          reject(error)
        } else {
          resolve({
            url: result.secure_url,
            asset_id: result.asset_id,
            public_id: result.public_id,
          })
        }
      },
      {
        resource_type: 'auto',
      }
    )
  })
}

export const cloudinaryDeleteImg = async (fileToDelete) => {
  return new Promise((resolve) => {
    cloudinary.uploader.destroy(fileToDelete, (result) => {
      resolve(
        {
          url: result.secure_url,
          asset_id: result.asset_id,
          public_id: result.public_id,
        },
        {
          resource_type: 'auto',
        }
      )
    })
  })
}

const getImagePublicId = (imageUrl) => {
  console.log(imageUrl)
  const splitUrl = imageUrl.split('/')
  const fileName = splitUrl[splitUrl.length - 1]
  const publicId = fileName.split('.')[0]

  return publicId
}

export const deleteImageByUrl = async (imageUrl) => {
  const publicId = getImagePublicId(imageUrl)

  try {
    const result = await cloudinary.v2.uploader.destroy(publicId)

    return result
  } catch (error) {
    throw error
  }
}
