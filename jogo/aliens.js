const quantidadeAliens = 10;
const chanceAtirar = 0.0025;
const tamanhoAlien = 120;
const distanciaDoTopo = 50;
const distanciaDaEsquerda = 50;
const velocidadeVerticalAlien = 10;

let deslocamentoParaDireita = 0;
let deslocamentoParaBaixo = 0;

let limiteHorizontal = 70;
let limiteVertical = 200;

let imagensAlien = [];

let velocidadeHorizontalAlien = 0.5;

let aliens = new Array();

function inicializarAliens() {
    for (let i = 0; i < quantidadeAliens; i++) {
        aliens.push(parseInt(Math.random() * imagensAlien.length));
    }
}

function atualizarAliens() {
    deslocarAliens();
    adicionarDisparosDosAliens();
}

function alienMorto(numero) {
    return numero == -1;
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

function todoMundoMorto() {
    for (let alien of aliens) {
        if (!alienMorto(alien)) {
            return false;
        }
    }
    return true;
}

function limitarValor(valorAtual, limite) {
    return valorAtual % limite
}