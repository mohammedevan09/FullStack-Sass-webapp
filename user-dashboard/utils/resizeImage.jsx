import pica from 'pica'

export const resizeImage = async (file, maxWidth, maxHeight, maxFileSizeKB) => {
  const image = new Image()
  const reader = new FileReader()

  return new Promise((resolve, reject) => {
    reader.onload = async (event) => {
      image.src = event.target.result

      image.onload = async () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        let width = image.width
        let height = image.height

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width
            width = maxWidth
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height
            height = maxHeight
          }
        }

        canvas.width = width
        canvas.height = height

        // Resize the image using pica
        const picaInstance = pica()
        try {
          const resizedCanvas = await picaInstance.resize(image, canvas)
          const resizedBlob = await new Promise((resolve) => {
            resizedCanvas.toBlob(async (blob) => {
              // Check if the resized image size exceeds the maximum allowed size
              if (blob.size > maxFileSizeKB * 1024) {
                // If the size exceeds the maximum, adjust the quality
                const quality = (maxFileSizeKB * 1024) / blob.size
                const resizedCanvasWithQuality = await picaInstance.resize(
                  image,
                  canvas,
                  { unsharpAmount: 80, quality }
                )
                resizedCanvasWithQuality.toBlob(
                  (resizedBlobWithQuality) => {
                    resolve(resizedBlobWithQuality)
                  },
                  'image/jpeg',
                  quality
                )
              } else {
                // If the size is within the limit, resolve with the original blob
                resolve(blob)
              }
            }, 'image/jpeg')
          })
          resolve(resizedBlob)
        } catch (error) {
          reject(error)
        }
      }

      image.onerror = (error) => {
        reject(error)
      }
    }

    reader.readAsDataURL(file)
  })
}
