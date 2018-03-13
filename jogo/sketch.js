let imagemNave;
let imagemAlien;

let deslocamentoAlienX;

function preload() {
    imagemNave = loadImage("imagens/Nave.png");
    imagemAlien = loadImage("imagens/Alien1.png");
}

function setup() {
    createCanvas(900, 600);
    deslocamentoAlienX = 0;
}

function draw() {
        background(100);

        deslocamentoAlienX += 1;
        image(imagemNave, mouseX, 500);
        image(imagemAlien, deslocamentoAlienX, 100);
}

