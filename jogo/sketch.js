let imagemNave;
let imagensAlien = [];
let imagemMissil;
let imagemLaser;

let trilha;
;

let quantidadeAliens = 10;
let colunas = 5;

let posicaoNave;

let distanciaDoTopo = 50;
let distanciaDaEsquerda = 50;
let deslocamentoParaDireita = 0;
let deslocamentoParaBaixo = 0;

let velocidadeHorizontalAlien = 0.5;
let velocidadeVerticalAlien = 10;
let velocidadeMissil = 5;

let limiteHorizontal = 70;
let limiteVertical = 200;

let tamanhoAlien = 120;
let chanceAtirar = 0.0025;
let pontuacao = 0;

let podeAtirar = true;
let tempoParaRecarregar = .5;
let cronometroRecarregar = tempoParaRecarregar;

let ultimoFrame;
let deltaTime;

let cenas = {
    jogo: 0,
    gameOver: 1,
    vitoria: 2,
}
let cenaAtual = cenas.jogo;

let aliens = new Array();
let misseis = new Array();
let lasers = new Array();

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
    posicaoNave = createVector(width / 2, height - 80);
    for (let i = 0; i < quantidadeAliens; i++) {
        aliens.push(parseInt(Math.random() * imagensAlien.length));
    }
}

function draw() {
    let frameAtual = millis() / 1000;
    deltaTime = frameAtual - ultimoFrame;
    ultimoFrame = frameAtual;
    background(50);
    if (cenaAtual == cenas.jogo) {
        if (todoMundoMorto()) {
            cenaAtual = cenas.vitoria;
        }
        atualizarNave();
        deslocarAliens();
        adicionarDisparosDosAliens();
        atualizarMisseis();
        atualizarLasers();

        verificarColisoesMisseis();
        verificarColisoesLasers();

        desenharNave();
        desenharAliens();
        desenharMisseis();
        desenharLasers();

        textSize(40);
        text(pontuacao, 40, 70);

        recarregarMissil();

    } else if (cenaAtual == cenas.gameOver) {
        textSize(50);
        text(pontuacao, width / 2, height / 2 + 40);
        textSize(150);
        text("Game Over", width / 2, height / 2 - 80);
    } else if (cenaAtual == cenas.vitoria) {
        textSize(100);
        text("Parabéns!", width / 2, height / 2);
    }

}

function mousePressed() {
    if (cenaAtual == cenas.jogo) {
        if (podeAtirar) {
            podeAtirar = false;
            misseis.push(createVector(mouseX, height - 50));
        }
    } else {
        reiniciar();
    }
}

function adicionarDisparosDosAliens() {
    for (let i = 0; i < aliens.length; i++) {
        if (alienMorto(aliens[i])) {
            continue;
        }

        if (deveAtirar()) {
            let posicao = calcularPosicaoAlien(i, tamanhoAlien, tamanhoAlien);
            posicao.x += 50;
            posicao.y += 50;
            lasers.push(posicao);
        }
    }
}

function alienMorto(numero) {
    return numero == -1;
}

function atualizarNave() {
    posicaoNave.x = mouseX - imagemNave.width / 2;
}

function atualizarMisseis() {
    for (let i = misseis.length - 1; i >= 0; i--) {
        misseis[i].y -= velocidadeMissil;
        if (estaForaDaTela(misseis[i].y)) {
            misseis.splice(i, 1);
        }
    }
}

function atualizarLasers() {
    for (let i = lasers.length - 1; i >= 0; i--) {
        lasers[i].y += velocidadeMissil;
        if (estaForaDaTela(lasers[i].y)) {
            lasers.splice(i, 1);
        }
    }
}

function calcularPosicaoAlien(indice, largura, altura) {
    let posicao = createVector();

    let linha = Math.floor(indice / colunas);
    let coluna = indice % colunas;

    let deslocamentoHorizontal = distanciaDaEsquerda + deslocamentoParaDireita;
    let deslocamentoVertical = distanciaDoTopo + deslocamentoParaBaixo

    posicao.x = coluna * largura + deslocamentoHorizontal;
    posicao.y = linha * altura + deslocamentoVertical;

    return posicao;
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

function desenharAliens() {
    for (let i = 0; i < aliens.length; i++) {
        if (alienMorto(aliens[i])) {
            continue;
        }
        let imagemAlien = imagensAlien[aliens[i]];
        let posicaoAlien = calcularPosicaoAlien(i, tamanhoAlien, tamanhoAlien);
        image(imagemAlien, posicaoAlien.x, posicaoAlien.y);
    }
}

function desenharNave() {
    image(imagemNave, posicaoNave.x, posicaoNave.y);
}

function desenharMisseis() {
    for (let missel of misseis) {
        image(imagemMissil, missel.x, missel.y);
    }
}

function desenharLasers() {
    for (let laser of lasers) {
        image(imagemLaser, laser.x, laser.y);
    }
}

function deslocarAliens() {
    deslocamentoParaDireita += velocidadeHorizontalAlien;

    if (deslocamentoParaDireita % limiteHorizontal == 0 || deslocamentoParaDireita < 0) {
        velocidadeHorizontalAlien *= -1;
        deslocamentoParaBaixo += velocidadeVerticalAlien
    }

    deslocamentoParaBaixo = limitarValor(deslocamentoParaBaixo, limiteVertical);
}

function deveAtirar() {
    return Math.random() < chanceAtirar;
}

function estaForaDaTela(posicaoY) {
    return posicaoY > height || posicaoY < 0;
}

function limitarValor(valorAtual, limite) {
    return valorAtual % limite
}

function recarregarMissil() {
    if (podeAtirar == false) {
        cronometroRecarregar -= deltaTime;
        if (cronometroRecarregar < 0) {
            cronometroRecarregar = tempoParaRecarregar;
            podeAtirar = true;
        }
    }
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

function todoMundoMorto() {
    for (let alien of aliens) {
        if (!alienMorto(alien)) {
            return false;
        }
    }
    return true;
}

function verificarColisoesLasers() {
    for (let i = lasers.length - 1; i >= 0; i--) {
        if (colidiu(lasers[i], 10, 30, posicaoNave, 100, 100)) {
            cenaAtual = cenas.gameOver;
            lasers.splice(i, 1);
        }
    }
}

function verificarColisoesMisseis() {

    for (let i = misseis.length - 1; i >= 0; i--) {
        for (let j = 0; j < aliens.length; j++) {
            if (alienMorto(aliens[j])) {
                continue;
            }

            let posicaoAlien = calcularPosicaoAlien(j, tamanhoAlien, tamanhoAlien);

            if (colidiu(posicaoAlien, tamanhoAlien, tamanhoAlien,
                misseis[i], imagemMissil.width, imagemMissil.height
            )) {
                aliens[j] = -1;
                misseis.splice(i, 1);
                pontuacao += 10;
                break;
            }
        }
    }
}