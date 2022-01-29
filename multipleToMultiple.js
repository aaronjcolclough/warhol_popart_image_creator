// Images
let imgSize, numImgs
let imgs = []
let assets = []

// Canvases
let baseCanvas

// Palette
// let palette = []

// Inputs, Labels, Buttons, etc
let redrawBtn, importBtn, colorRadio, borderCheck
let saveBtn, saveInput, saveLabel
let numImgsBtn, numImgsInput, numImgsLabel
let selects = []

function preload() {
  assets.push({ key: 'Finger', img: loadImage('assets/finger-scaled.jpg') })
  assets.push({ key: 'Shit', img: loadImage('assets/shit-scaled.jpg') })
  assets.push({ key: 'Cat', img: loadImage('assets/cat-eye.jpg') })
  assets.push({ key: 'Grumpy', img: loadImage('assets/grumpy.jpg') })
}

function setup() {
  baseCanvas = createCanvas(540, 540)
  buildStaticFields()

  noLoop()
}

function draw() {
  noStroke()
  fill('white')
  square(0, 0, 540)
  numImgs = numImgsInput.value()
  imgsPer = Math.sqrt(numImgs)
  imgSize = baseCanvas.width / imgsPer

  if (imgs.length > 0) {
    imgs.forEach((img, i) => {
      if ((scheme = colorRadio.value())) convertPixels(scheme, img)

      image(
        img,
        getX(i),
        getY(i),
        borderCheck.checked() ? getXSize(i) : imgSize,
        borderCheck.checked() ? getYSize(i) : imgSize,
      )
    })
  }
}

function buildStaticFields() {
  numImgsLabel = createElement('h4', 'Number of images to render:')
  numImgsLabel.position(550, 0)
  numImgsInput = createInput(1)
  numImgsInput.position(550, 50)
  numImgsBtn = createButton('Set')
  numImgsBtn.position(numImgsInput.x + numImgsInput.width, numImgsInput.y)
  numImgsBtn.mouseClicked(() => buildDynamicFields(numImgsInput.value()))

  borderCheck = createCheckbox('Borders', false)
  borderCheck.position(550, numImgsInput.y + numImgsInput.height + 10)

  redrawBtn = createButton('Redraw Canvas')
  redrawBtn.position(numImgsBtn.x + numImgsBtn.width + 5, numImgsBtn.y)
  redrawBtn.mouseClicked(redrawCanvas)

  colorRadio = createRadio('colorRadio')
  colorRadio.option('Red')
  colorRadio.option('Green')
  colorRadio.option('Blue')
  colorRadio.style('width', '65px')
  colorRadio.position(550, borderCheck.y + borderCheck.height + 5)

  saveLabel = createElement('h4', 'ex. Filename.ext')
  saveLabel.position(5, 550)
  saveInput = createInput()
  saveInput.position(5, 600)
  saveBtn = createButton('Save')
  saveBtn.position(saveInput.x + saveInput.width, saveInput.y)
  saveBtn.mouseClicked(() => saveImg(saveInput.value()))
}

function buildDynamicFields(updatedNumImgs) {
  if (selects.length > 0) {
    importBtn.remove()
    selects.forEach((x) => x.remove())
    selects = []
  }

  numImgs = updatedNumImgs

  for (let i = 0; i < numImgs; i++) {
    selects.push(createSelect())
  }

  importBtn = createButton('Import')
  importBtn.mouseClicked(importImgs)

  selects.forEach((select, index) => {
    assets.forEach((obj) => {
      select.option(obj.key)
    })
    select.position(550, 200 + index * select.height)
  })
  importBtn.position(
    selects[0].x + selects[0].elt.clientWidth + 5,
    selects[0].y,
  )
}

function importImgs() {
  selects.forEach((select) => {
    imgs.push(assets.find((x) => x.key === select.value()).img)
  })

  redrawCanvas()
}
