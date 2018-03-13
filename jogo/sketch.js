let imagemNave;
let imagemAlien;
let imagemMissil;

let posicaoNave;
let posicaoInicialAlien;
let posicaoMissil;

let deslocamentoAlien;
let limiteHorizontalAlien;

let velocidadeHorizontalAlien;
let velocicadeMissil;


function preload() {
    imagemNave = loadImage("imagens/Nave.png");
    imagemAlien = loadImage("imagens/Alien1.png");
    imagemMissil = loadImage("imagens/Missil.png");
}

function setup() {
    createCanvas(900, 600);
    deslocamentoAlien = createVector(0,0);
    
    posicaoInicialAlien = createVector(0,100);
    posicaoNave = createVector(0, 500);
    posicaoMissil = createVector(400, 600);

    limiteHorizontalAlien = 750;
    velocidadeHorizontalAlien = 1;
    velocicadeMissil = 3;
    
}

function draw() {
        background(100);

        deslocamentoAlien.x += velocidadeHorizontalAlien;
        if(deslocamentoAlien.x % limiteHorizontalAlien == 0){
            velocidadeHorizontalAlien *= -1;
        }

        posicaoNave.x = mouseX;
        posicaoMissil.y -= velocicadeMissil;
        

        image(imagemMissil, posicaoMissil.x, posicaoMissil.y);
        image(imagemNave, posicaoNave.x, posicaoNave.y);
        image(imagemAlien, posicaoInicialAlien.x + deslocamentoAlien.x, posicaoInicialAlien.y);
}

