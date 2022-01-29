function randomHexadecimal() {
  let color = '#'

  for (let i = 0; i < 6; i++) {
    const random = Math.random()
    const bit = (random * 16) | 0
    color += bit.toString(16)
  }

  return color
}

function getPaletteColor(imgColor) {
  const imgR = red(imgColor)
  const imgG = green(imgColor)
  const imgB = blue(imgColor)

  let minDistance = 999999
  let targetColor

  for (const c of palette) {
    const paletteR = red(c)
    const paletteG = green(c)
    const paletteB = blue(c)

    const colorDistance = dist(imgR, imgG, imgB, paletteR, paletteG, paletteB)

    if (colorDistance < minDistance) {
      targetColor = c
      minDistance = colorDistance
    }
  }

  return targetColor
}

function invertedColoredStatic() {
  img.loadPixels()

  // Loop over every pixel in the image
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      // Read the pixel's color
      let originalColor = img.get(x, y)

      // Randomly alter the colors

      const r = random(256) - red(originalColor)
      const g = random(256) - green(originalColor)
      const b = random(256) - blue(originalColor)
      let outputColor = color(r, g, b)

      // Set the pixel's color
      img.set(x, y, outputColor)
    }
  }

  img.updatePixels()
}

function invertPixels() {
  img.loadPixels()

  // Loop over every pixel in the image
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      // Read the pixel's color
      let originalColor = img.get(x, y)

      // Randomly alter the colors

      const r = 255 - red(originalColor)
      const g = 255 - green(originalColor)
      const b = 255 - blue(originalColor)
      let outputColor = color(r, g, b)

      // Set the pixel's color
      img.set(x, y, outputColor)
    }
  }

  img.updatePixels()
}

function usePalette() {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const imgColor = img.get(x, y)
      const paletteColor = getPaletteColor(imgColor)
      stroke(paletteColor)
      point(x, y)
    }
  }
}

function convertPixels(scheme, img) {
  img.loadPixels()

  // Loop over every pixel in the image
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      // Read the pixel's color
      let originalColor = img.get(x, y)

      // Call color change
      let outputColor

      switch (scheme) {
        case 'Red':
          outputColor = toRed(originalColor)
          break
        case 'Green':
          outputColor = toGreen(originalColor)
          break
        case 'Blue':
          outputColor = toBlue(originalColor)
          break
        default:
          break
      }

      // Set the pixel's color
      img.set(x, y, outputColor)
    }
  }

  img.updatePixels()
}

function toRed(originalColor) {
  const r = 255 - red(originalColor)
  return color(r, 0, 0)
}

function toGreen(originalColor) {
  const g = 255 - green(originalColor)
  return color(0, g, 0)
}

function toBlue(originalColor) {
  const b = 255 - blue(originalColor)
  return color(0, 0, b)
}
