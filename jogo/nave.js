const tempoParaRecarregar = .5;

let imagemNave;

let posicaoNave;

let podeAtirar = true;
let cronometroRecarregar = tempoParaRecarregar;

function inicializarNave() {
    posicaoNave = createVector(width / 2, height - 80);
}

function atualizarNave() {
    recarregarMissil();
    posicaoNave.x = mouseX - imagemNave.width / 2;
}

function desenharNave() {
    image(imagemNave, posicaoNave.x, posicaoNave.y);
}

function mousePressed() {
    if (cenaAtual == cenas.jogo) {
        atirar();
    } else {
        reiniciar();
    }
}

function atirar() {
    if (podeAtirar) {
        podeAtirar = false;
        misseis.push(createVector(mouseX, height - 50));
    }
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