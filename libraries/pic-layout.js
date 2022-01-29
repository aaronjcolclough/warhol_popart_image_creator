function getXSize(imgIndex) {
  let mod = imgIndex % imgsPer

  return mod === 0 || mod === imgsPer - 1 ? imgSize - 2 : imgSize - 4
}

function getYSize(imgIndex) {
  let firstRowMaxIndex = imgsPer - 1
  let lastRowMinIndex = numImgs - imgsPer

  return firstRowMaxIndex < imgIndex && imgIndex < lastRowMinIndex
    ? imgSize - 4
    : imgSize - 2
}

function getX(imgIndex) {
  let x = (imgIndex % imgsPer) * imgSize

  return !(imgIndex % imgsPer) ? 0 : borderCheck.checked() ? x + 2 : x
}

function getY(imgIndex) {
  let y = floor(imgIndex / imgsPer) * imgSize

  return imgIndex < imgsPer ? 0 : borderCheck.checked() ? y + 2 : y
}
