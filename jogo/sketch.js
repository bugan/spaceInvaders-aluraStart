let imagemNave;
let imagemAlien;

function preload() {
    imagemNave = loadImage("imagens/Nave.png");
    imagemAlien = loadImage("imagens/Alien1.png");
}

function setup() {
    createCanvas(900, 600);
}

function draw() {
        image(imagemNave, 450, 550);
        image(imagemAlien, 450, 100);
}

