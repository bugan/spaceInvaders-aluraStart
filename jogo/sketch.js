const cenas = {
    jogo: 0,
    gameOver: 1,
    vitoria: 2,
}
const colunas = 5;

let trilha;

let pontuacao = 0;

let ultimoFrame;
let deltaTime;

let cenaAtual = cenas.jogo;

function preload() {
    trilha = loadSound('audio/Trilha.mp3');

    imagemNave = loadImage("imagens/Nave.png");
    imagemMissil = loadImage("imagens/Missil.png");
    imagemLaser = loadImage("imagens/laser.png");
    imagensAlien.push(loadImage("imagens/Alien1.png"));
    imagensAlien.push(loadImage("imagens/Alien2.png"));
    imagensAlien.push(loadImage("imagens/Alien3.png"));
}

function setup() {
    createCanvas(900, 600);

    textAlign(CENTER, CENTER)
    fill(255);

    trilha.loop();

    ultimoFrame = millis() / 1000;

    inicializarNave();
    inicializarAliens();
}

function draw() {
    calcularDeltaTime();
    background(50);

    if (cenaAtual == cenas.jogo) {
        AtualizarCenaJogo();
    } else if (cenaAtual == cenas.gameOver) {
        AtualizarCenaDerrota();
    } else if (cenaAtual == cenas.vitoria) {
        AtualizarCenaVitoria();
    }
}

function calcularDeltaTime() {
    let frameAtual = millis() / 1000;
    deltaTime = frameAtual - ultimoFrame;
    ultimoFrame = frameAtual;
}

function AtualizarCenaJogo() {
    if (todoMundoMorto()) {
        cenaAtual = cenas.vitoria;
    }
    atualizarNave();
    atualizarAliens();
    atualizarMisseis();
    atualizarLasers();

    desenharNave();
    desenharAliens();
    desenharMisseis();
    desenharLasers();

    textSize(40);
    text(pontuacao, 40, 70);
}

function AtualizarCenaVitoria() {
    textSize(100);
    text("Parabéns!", width / 2, height / 2);
}

function AtualizarCenaDerrota() {
    textSize(50);
    text(pontuacao, width / 2, height / 2 + 40);
    textSize(150);
    text("Game Over", width / 2, height / 2 - 80);
}

function colidiu(posicaoObjeto, larguraObjeto, alturaObjeto, posicaoOutro, larguraOutro, alturaOutro) {

    if (posicaoObjeto.x > posicaoOutro.x + larguraOutro ||
        posicaoObjeto.x + larguraObjeto < posicaoOutro.x ||
        posicaoObjeto.y > posicaoOutro.y + alturaOutro ||
        posicaoObjeto.y + alturaObjeto < posicaoOutro.y
    ) {
        return false;
    }

    return true;
}

function estaForaDaTela(posicaoY) {
    return posicaoY > height || posicaoY < 0;
}

function reiniciar() {

    for (let i = 0; i < aliens.length; i++) {
        aliens[i] = parseInt(Math.random() * imagensAlien.length);
    }

    lasers = new Array();
    misseis = new Array();

    deslocamentoParaDireita = 0;
    deslocamentoParaBaixo = 0;
    velocidadeHorizontalAlien = Math.abs(velocidadeHorizontalAlien);

    pontuacao = 0;
    cenaAtual = cenas.jogo;
}