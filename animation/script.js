//variable para elegir la animacion 
let playerState = "idle";
//variable que contiene la referencia del select
const dropdown =document.getElementById("animations")
//Añade un "escuchador de eventos" al elemento identificado por "animations", Dentro del manejador de eventos, se asigna el valor seleccionado en la lista desplegable a la variable
dropdown.addEventListener('change',function(event){
    playerState =event.target.value;
})
//variable que contendra referencia al lienzo en indexhtml
const canvas = document.getElementById('canvas1');
//El método HTMLCanvasElement.getContext() retorna un contexto de dibujo en el lienzo, o null si el identificador del contexto no está soportado.
const ctx = canvas.getContext('2d');
//constante que define el tamaño del lienzo (MAYUSCULAS variableglobal)
const CANVAS_WIDTH = canvas.whidth = 600;
const CANVAS_HEIGHT = canvas.height = 600;
//const donde creamos una imagen 
const playerImage = new Image();
//asignamos la imagen a la constante
playerImage.src = 'shadow_dog.png';
//valores del tamaño para el corte del sprite
const spriteWidth = 575;
const spriteHeight = 523;
//variables para ralentizar el bucle de animacion 
let gameFrame = 0;
const staggerFrames = 5;

/* //funcion para dibujar la imagen en el lienzo metodo 1 
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
animate() */

//esta matriz servira como contenedor principal de todos los datos de las animaciones
const spriteAnimations = [];

//esta matriz servira como especie de mapa que coincidira con la hoja de sprites
const animationStates = [
    {
        name: 'idle',
        frames: '7',
    },
    {
        name: 'jump',
        frames: '7',
    },
    {
        name: 'fall',
        frames: '7',
    },
    {
        name: 'run',
        frames: '9',
    },
    {
        name: 'dizzy',
        frames: '11',
    },
    {
        name: 'sit',
        frames: '5',
    },
    {
        name: 'roll',
        frames: '7',
    },
    {
        name: 'bite',
        frames: '7',
    },
    {
        name: 'Ko',
        frames: '12',
    },
    {
        name: 'gethit',
        frames: '4',
    },
];

//este bucle nos ayudara
animationStates.forEach((state, index) => { 
    let frames = {
        loc: []
    }
    for (let j = 0; j < state.frames; j++) {
        let positionX = j * spriteWidth;
        let positionY = index * spriteHeight
        frames.loc.push({x:positionX, y: positionY})
    }
    spriteAnimations[state.name] = frames ;
})
console.log (spriteAnimations)

//funcion para dibujar la imagen en el lienzo metodo 2
function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    //esta variable,hace un calculo entre el game frame y el staggerFrames el cual hacemos en numeros sin decimales con Math.floor y el resultado le sacamos el resto que serria el nuemro de dibujos que tenemos en el sprite
    let position = Math.floor(gameFrame / staggerFrames) % spriteAnimations[playerState].loc.length;
    //variables para la seleccion de los sprites (eje X y Y)) multiplicando el spriteWidth por la variable position 575 * 1, 575 * 2 ...... 
    let frameX = spriteWidth * position;
    let frameY = spriteAnimations[playerState].loc[position].y;    
    //hacemos el cambio del frameX ya que el multiplo lo hacemos arriba 
    ctx.drawImage(playerImage, frameX, frameY , spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
    gameFrame++;
    requestAnimationFrame(animate);
};
animate();

