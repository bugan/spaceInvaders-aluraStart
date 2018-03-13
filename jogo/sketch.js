let imagemNave;
let imagemAlien;

let deslocamentoAlienX;
let limiteHorizontalAlien;
let velocidadeHorizontalAlien;

function preload() {
    imagemNave = loadImage("imagens/Nave.png");
    imagemAlien = loadImage("imagens/Alien1.png");
}

function setup() {
    createCanvas(900, 600);
    deslocamentoAlienX = 0;
    limiteHorizontalAlien = 750;
    velocidadeHorizontalAlien = 1
}

function draw() {
        background(100);

        deslocamentoAlienX += velocidadeHorizontalAlien;
        if(deslocamentoAlienX % limiteHorizontalAlien == 0){
            velocidadeHorizontalAlien *= -1;
        }

        image(imagemNave, mouseX, 500);
        image(imagemAlien, deslocamentoAlienX, 100);
}

