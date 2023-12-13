//variable que contendra referencia al lienzo en indexhtml
const canvas = document.getElementById('canvas1');
//El método HTMLCanvasElement.getContext() retorna un contexto de dibujo en el lienzo, o null si el identificador del contexto no está soportado.
const ctx = canvas.getContext('2d');
//constante que define el tamaño del lienzo
const CANVAS_WIDTH = canvas.whidth = 600;
const CANVAS_HEIGHT = canvas.height = 600;
//const donde creamos una imagen 
const playerImage = new Image();
//asignamos la imagen a la constante
playerImage.src = 'shadow_dog.png';
//valores del tamaño para el corte del sprite
const spriteWidth = 575;
const spriteHeight = 523;
//variables para la seleccion de los sprites (eje X y Y))
let frameX = 0;
let frameY = 0;
//variables para ralentizar el bucle de animacion 
let gameFrame = 0;
const staggerFrames = 3;



//funcion para dibujar la imagen en el lienzo 
function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    //ctx.drawImage(image,sx,sy,sw,sh,dx,dy,dw,dh)

    //sx recorre sobre el eje x el cuadro del sprite
    //sy recorre sobre el eje y el cuadro del sprite
    //sw y sh el tamaño del recorte del sprite
    //dx La coordenada X del canvas destino en la cual se coloca la esquina superior izquierda de la imagen origen.
    //dy La coordenada Y del canvas destino en la cual se coloca la esquina superior izquierda de la imagen origen.
    //dwidth El ancho para dibujar la imagen en el canvas destino.
    //dheight El alto para dibujar la imagen en el canvas destino. Esto permite escalar la imagen dibujada. Si no se especifica, el alto de la imagen no se escala al dibujar.


    ctx.drawImage(playerImage, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    if (gameFrame % staggerFrames == 0) {
        if (frameX < 6) frameX++;
        else frameX = 0;
    }
    requestAnimationFrame(animate);
    gameFrame++
    
}
animate()


