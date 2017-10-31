const getRGBA = (img) => img.data;

const getAscii = (text = '') => (
  [...text].map(c => c.charCodeAt(0))
);

const asciiToHex = (ascii = []) => ascii.map(a => a.toString(16));
const asciiToString = (ascii = []) => String.fromCharCode(...hex);

const buildColors = (hex = []) => {

  const len = hex.length,
        colors = [];
  
  for (let i = 0; i <= len; i += 4) {
    colors.push({
      red: hex[i],
      green: hex[i + 1],
      blue: hex[i + 2],
      alpha: hex[i + 3]
    });
  }

  return colors;
};

const getMatrixSize = (length = 0) => {
  const r = Math.sqrt(length);
  return !(r % 1) ? r : Math.trunc(r + 1);
};

const getCanvasSize = (matrixSize, squareSize = 10) => {
  return matrixSize ? {
    width: matrixSize * squareSize,
    height: matrixSize * squareSize
  } : 0;
};

const drawSquare = (context, square) => {
  const { hexColor = '#fff' } = square.style;
  context.fillStyle = hexColor;
  context.fillRect(square.x, square.y, square.width, square.height);
};

const getXY = (x, y, xLimit, squareWidth) => {
  if (x >= xLimit) {
    return {x: 0, y: y += squareWidth};
  }

  return {x, y};
};

const buildStyle = (color) => {
  const { red, green = '00', blue = '00', alpha = '00' } = color;

  return { 
    green, 
    red, 
    blue, 
    alpha, 
    hexColor: `#${red}${green}${blue}`
  };
};

const buildSquare = (color, square) => {
  const {x, y} = getXY(
    square.x, 
    square.y, 
    square.xLimit, 
    square.squareWidth
  );

  return {
    x,
    y,
    style: buildStyle(color),
    width: square.squareWidth,
    height: square.squareWidth
  };
};

const drawImage = (text) => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const squareSize = 100;
  const ascii = getAscii(text);
  const colors = buildColors(asciiToHex(ascii));
  const colorsLenght = colors.length;
  const matrixSize = getMatrixSize(colorsLenght);
  const canvasSize = getCanvasSize(matrixSize, squareSize);

  canvas.id = "art";
  canvas.width = canvasSize.width;
  canvas.height = canvasSize.height;

  let x = 0, y = 0;

  const squares = [];
  
  colors.forEach(color => {
    const square = buildSquare(
      color, 
      { 
        x, 
        y, 
        xLimit: canvasSize.width,
        squareWidth: squareSize
      }
    );

    // FIX GET XY function
    x = square.x;
    y = square.y;
    x += squareSize;

    squares.push(square);
  });

  squares.forEach(square => drawSquare(context, square));
  document.getElementById('main').appendChild(canvas);
};