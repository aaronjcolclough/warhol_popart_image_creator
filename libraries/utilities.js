function saveImg(name) {
  let periodCount = name.split('.').length - 1
  let filename = name.split('.')

  if (periodCount > 1) {
    console.log('fuckoff')
  } else if (!IMG_EXTS.includes(filename[1])) {
    console.log('fuckoff again')
  } else saveCanvas(filename[0], filename[1])
}

function redrawCanvas() {
  clear()
  redraw()
}
