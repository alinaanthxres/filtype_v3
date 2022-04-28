
var font;

var fontSize = 210;
var pointDensity = 10;
var nOff = 0;
var malla;

var colors;
var bckgColor = '#ffffff';
var x = 0;
var y = 0;
var num;
var w;
var h;

var input;


function preload() {
    font = loadFont('assets/fonts/georgia.ttf');
}
//Canvas responsive
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup(){
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('caja_canvas');
    colors = [color(0, 250, 255), color(200, 100, 0), color(100, 109, 255)];

    
    //Código para crear el input y el texto
    text('Texto');
    input = createInput('Hola chicos');
    input.input(myInputEvent);
    input.size(120,50);
    input.parent('caja_input');
    input.textAlign = 'top';
  
    setupText();
}

//Con esta función se actualiza el texto del canvas según el input
function myInputEvent() {
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
    malla.textFont(font)
    malla.textSize(fontSize);
    malla.textAlign = 'center';
    malla.textBaseline = "middle";

    malla.text(text, 40, height/3, malla.textBaseline, height);
  
    malla.loadPixels();
}
  


function draw(){
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
            w = noise((num + nOff) / 135, (x + nOff * 0.1) / 100) * 20;
            h = noise((num - nOff) / 135, (x + nOff * 0.1) / 100) * 20;
            push();
            translate(x, y);
    
            noStroke();
  
            if (w > 9) {
            fill(colors[0]);
            } else if (h < 7 || w < 7) {
            fill(colors[1]);
            } else if (w < 9) {
            fill(colors[2]);
            } else {
            fill(colors[3]);
            }  
  
            ellipse(0, 0, w, h);
            pop();   
            
        }
      }
    }
}

//Función para cambiar de color el fondo de manera interactiva

function keyPressed(){
    if (keyCode === LEFT_ARROW) {
      bckgColor = '#000000';
    } else if (keyCode === RIGHT_ARROW) {
      bckgColor = '#ffffff';
    }
  }