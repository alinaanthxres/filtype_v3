var font;

var fontSize = 210;
/* var pointDensity = 8; */
var nOff = 0;
var malla;

var colors;
var bckgColor = '#000000';
var x = 0;
var y = 0;
var num;
var w;
var h;

var input;
var selectTipo;

//Cargar fuentes
function preload() {
  font = loadFont('assets/fonts/georgia.ttf');
}
//Canvas responsive
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

var pointDensity = 8;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('caja_canvas');
  colors = [color(245, 0, 0), color(0, 160, 80), color(15, 109, 228)];
  
 
  inputTexto();
  setupText();
  selectorTipo();
}

function inputTexto() {
 //Código para crear el input y el texto
 text('Texto');
 input = createInput('Hola chicos');
 input.input(eventoInput);
 input.size(120,30);
 input.parent('caja_input');
}

//SELECTOR DE TIPOGRAFÍA
function selectorTipo(){
  selectTipo = createSelect();
  selectTipo.parent('tools_t_selector');
  selectTipo.option('Helvetica');
  selectTipo.option('Replica Mono');
  selectTipo.option('Georgia');
  selectTipo.selected('Georgia');
}

//Con esta función se actualiza el texto del canvas según el input
function eventoInput() {
  clear();
  text = this.value();
  console.log(this.value());
  setupText();
}

function setupText() {
  // create an offscreen graphics object to draw the text into
  malla = createGraphics(width, height);
  malla.pixelDensity(1);
  malla.background(255);
  malla.textFont(font);
  malla.textSize(fontSize);
  malla.textAlign = 'center';
  malla.textBaseline = "middle";

  malla.text(text, 40, height/4, malla.textBaseline, height);
  malla.loadPixels();
}



function draw() {
  background(bckgColor);
  nOff++;

  for (x = 0; x < malla.width; x += pointDensity) {
    for (y = 0; y < malla.height; y += pointDensity) {
      // Calculate the index for the pixels array from x and y
      var index = (x + y * malla.width) * 4;
      // Get the red value from image. Index = el array de pixeles
      var r = malla.pixels[index];

      if (r < 128) {
        num = random(5);
        w = noise((num + nOff) / 138, (x - nOff * 0.1) / 100) * 12;
        h = noise((num + nOff) / 138, (y - nOff * 0.1) / 100) * 22;
        push();
        translate(x, y);

        noStroke();

        if (w > 6) {
          fill(colors[0]);
          rect(0,0,w,h);
        } else if (h < 9 ) {
          fill(colors[1]);
          ellipse(3,3,w,h);
        } else if (w < 6) {
          fill(colors[2]);
          triangle(0,0,h,w,2,h);
        } /* else if (w > 8){
          fill(bckgColor);
          rect(0, 0, w, h);
        } */

        pop();
      }
    }
  }
}

//Función para cambiar de color el fondo de manera interactiva
function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    bckgColor = '#f3ff31';
  } else if (keyCode === RIGHT_ARROW) {
    bckgColor = '#000000';
  }

  if (keyCode === DOWN_ARROW) {
    pointDensity--;
    if (pointDensity < 3)  pointDensity = 3
    
  }
  if (keyCode === UP_ARROW) {
    pointDensity++;
    if (pointDensity > 13)  pointDensity = 13
  }
}