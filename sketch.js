// let img;
let baseCanvas,
  numImgsInput,
  numImgsLabel,
  numImgsBtn,
  drawn,
  redrawBtn,
  saveBtn,
  imgInputsCheckBox,
  imgInputsLabel,
  numImgsRenderInput,
  numImgsRenderLabel,
  importBtn,
  imgLocations

let imgs = [],
  imgInputs = [],
  palette = []
let speech = new p5.Speech()

function preload() {
  // img = loadImage('assets/grumpy.jpg');
  numImgsRenderLabel = createElement('h2', 'Number of images to render:')
  numImgsRenderLabel.position(550, 0)

  numImgsRenderInput = createInput(1)
  numImgsRenderInput.position(550, 50)

  numImgsLabel = createElement('h2', 'Number of images to import:')
  numImgsLabel.position(550, numImgsRenderInput.y + numImgsRenderInput.height)

  numImgsInput = createInput(1)
  numImgsInput.position(
    550,
    numImgsRenderInput.y + numImgsRenderInput.height + 50,
  )

  numImgsBtn = createButton('Set')
  numImgsBtn.position(numImgsInput.x + numImgsInput.width, numImgsInput.y)
  numImgsBtn.mousePressed(renderImgInputs)

  redrawBtn = createButton('New Colors')
  redrawBtn.position(0, 550)
  redrawBtn.mousePressed(redrawPressed)

  saveBtn = createButton('Save')
  saveBtn.position(0, 575)
  saveBtn.mousePressed(saveImg)

  imgInputsLabel = createElement('h4', 'Image name (with extension)')
  imgInputsLabel.position(550, numImgsInput.y + numImgsInput.height)

  // await setupPageFields();
  // await setupImgInputs();
}

function setup() {
  baseCanvas = createCanvas(540, 540)

  noLoop()
}

function draw() {
  palette.push(randomHexadecimal())
  palette.push(randomHexadecimal())
  palette.push(randomHexadecimal())
  palette.push(randomHexadecimal())
  palette.push(randomHexadecimal())

  // for(let y = 0; y < height; y++) {
  //   for (let x = 0; x < width; x++) {
  //     const imgColor = img.get(x, y);
  //     const paletteColor = getPaletteColor(imgColor);
  //     stroke(paletteColor);
  //     point(x, y);
  //   }
  // }

  imgs.forEach((x) => {
    console.log(x)
    let imgSize = 540 / numImgsRenderInput.value()
    let matrix = Math.sqrt(numImgsRenderInput.value())

    for (let i = 0; i < matrix; i++) {
      for (let j = 0; j < matrix; j++) {
        image(x, j * imgSize, i * imgSize, imgSize, imgSize)
      }
    }
  })

  drawn = true
}

function setupPageFields() {
  let numImages = createInput()
  numImages.position(550, 50)

  let label = createElement('h2', 'Number of images:')
  label.position(550, 0)

  let imgsBtn = createButton('Set')
  imgsBtn.position(numImages.x + numImages.width, 50)
  imgsBtn.mousePressed(() => setImgs(numImages.value()))

  let redraw = createButton('New Colors')
  redraw.position(0, 550)
  redraw.mousePressed(redrawPressed)

  let save = createButton('Save')
  save.position(0, 575)
  save.mousePressed(saveImg)

  return Promise.resolve()
}

// function getPaletteColor(imgColor) {
//   const imgR = red(imgColor)
//   const imgG = green(imgColor)
//   const imgB = blue(imgColor)

//   let minDistance = 999999
//   let targetColor

//   for (const c of palette) {
//     const paletteR = red(c)
//     const paletteG = green(c)
//     const paletteB = blue(c)

//     const colorDistance = dist(imgR, imgG, imgB, paletteR, paletteG, paletteB)

//     if (colorDistance < minDistance) {
//       targetColor = c
//       minDistance = colorDistance
//     }
//   }

//   return targetColor
// }

// function randomHexadecimal() {
//   let color = '#'

//   for (let i = 0; i < 6; i++) {
//     const random = Math.random()
//     const bit = (random * 16) | 0
//     color += bit.toString(16)
//   }

//   return color
// }

function saveImg() {
  saveCanvas('grumpy', 'png')
}

function redrawPressed() {
  palette = []
  redraw()
}

function renderImgInputs() {
  imgInputsCheckBox = createCheckbox('Use for all', false)
  importBtn = createButton('Import')

  for (let i = 0; i < numImgsInput.value(); i++) {
    imgInputs.push(renderImgInput(i))
  }

  importBtn.position(
    imgInputsCheckBox.x,
    imgInputsCheckBox.y + imgInputsCheckBox.height + 5,
  )
  importBtn.mousePressed(setImages)
}

function renderImgInput(currentIndex) {
  let input = currentIndex ? createInput() : createInput('grumpy.jpg')

  input.position(550, imgInputsLabel.y + 50 + input.height * currentIndex)

  if (!currentIndex)
    imgInputsCheckBox.position(input.x + input.width, imgInputsLabel.y + 50)

  return input
}

function setImages() {
  let inputs = imgInputs.filter((x) => !!x.elt.value)

  inputs.forEach((x) => imgs.push(loadImage('assets/' + x.elt.value)))

  if (drawn) redraw()
}
