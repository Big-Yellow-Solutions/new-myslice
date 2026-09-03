/**
 * Turns a picked file into a small data URL suitable for `localStorage`.
 *
 * A phone photo is several megabytes and base64 adds a third on top, which
 * blows the ~5 MB storage budget on the first upload. Everything is cropped to
 * the ID frame's 3:4 ratio and re-encoded as JPEG, which lands around 30 KB.
 */

/** Matches the ID frame (50x66 CSS px) at 4x, so it stays sharp on retina. */
const TARGET_WIDTH = 200
const TARGET_HEIGHT = 264
const JPEG_QUALITY = 0.85
const MAX_FILE_BYTES = 20 * 1024 * 1024

export async function fileToPhotoDataUrl(file: File): Promise<string> {
  if (!file.type.startsWith('image/')) {
    throw new Error('Pick an image file.')
  }
  if (file.size > MAX_FILE_BYTES) {
    throw new Error('That image is too large. Pick one under 20 MB.')
  }

  const image = await decode(file)
  const canvas = document.createElement('canvas')
  canvas.width = TARGET_WIDTH
  canvas.height = TARGET_HEIGHT
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error("Couldn't process that image.")

  // JPEG has no alpha; paint white so transparent PNGs don't come out black.
  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, TARGET_WIDTH, TARGET_HEIGHT)

  const { sx, sy, size } = coverCrop(image.width, image.height)
  ctx.drawImage(image, sx, sy, size.width, size.height, 0, 0, TARGET_WIDTH, TARGET_HEIGHT)

  return canvas.toDataURL('image/jpeg', JPEG_QUALITY)
}

/** Largest centered source rectangle with the target aspect ratio. */
function coverCrop(width: number, height: number) {
  const targetRatio = TARGET_WIDTH / TARGET_HEIGHT
  const sourceRatio = width / height
  const size =
    sourceRatio > targetRatio
      ? { width: height * targetRatio, height }
      : { width, height: width / targetRatio }
  return {
    sx: (width - size.width) / 2,
    sy: (height - size.height) / 2,
    size,
  }
}

function decode(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const image = new Image()
    image.onload = () => {
      URL.revokeObjectURL(url)
      resolve(image)
    }
    image.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error("That image couldn't be read. Try a JPEG or PNG."))
    }
    image.src = url
  })
}
