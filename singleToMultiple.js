// Images
let img, imgSize, numImgs

// Canvases
let baseCanvas

// Palette
// let palette = []

// Inputs, Labels, Buttons
let redrawBtn, numImgsInput, numImgsLabel, borderCheck, colorRadio

function preload() {
  img = loadImage('assets/finger-scaled.jpg')
}

function setup() {
  baseCanvas = createCanvas(540, 540)
  buildFields()
  noLoop()
}

function draw() {
  // palette.push(randomHexadecimal())
  // palette.push(randomHexadecimal())
  // palette.push(randomHexadecimal())
  // palette.push(randomHexadecimal())
  // palette.push(randomHexadecimal())

  // invertPixels(img)
  // invertedColoredStatic()

  numImgs = numImgsInput.value()
  imgsPer = Math.sqrt(numImgs)
  imgSize = baseCanvas.width / imgsPer

  if ((scheme = colorRadio.value())) convertPixels(scheme, img)

  for (let i = 0; i < numImgsInput.value(); i++) {
    image(
      img,
      getX(i),
      getY(i),
      borderCheck.checked() ? getXSize(i) : imgSize,
      borderCheck.checked() ? getYSize(i) : imgSize,
    )
  }
}

function buildFields() {
  numImgsLabel = createElement('h4', 'Number of images to render:')
  numImgsLabel.position(550, 0)
  numImgsInput = createInput(1)
  numImgsInput.position(550, 50)

  borderCheck = createCheckbox('Borders', false)
  borderCheck.position(550, numImgsInput.y + numImgsInput.height + 10)

  redrawBtn = createButton('Redraw')
  redrawBtn.position(0, 550)
  redrawBtn.mouseClicked(redrawPressed)

  colorRadio = createRadio('colorRadio')
  colorRadio.option('Red')
  colorRadio.option('Green')
  colorRadio.option('Blue')
  colorRadio.style('width', '65px')
  colorRadio.position(550, borderCheck.y + borderCheck.height + 5)
}