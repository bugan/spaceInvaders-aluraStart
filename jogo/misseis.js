const velocidadeMissil = 5;

let imagemMissil;
let misseis = new Array();

function atualizarMisseis() {
    for (let i = misseis.length - 1; i >= 0; i--) {
        misseis[i].y -= velocidadeMissil;
        if (estaForaDaTela(misseis[i].y)) {
            misseis.splice(i, 1);
        }
    }

    verificarColisoesMisseis();
}

function desenharMisseis() {
    for (let missel of misseis) {
        image(imagemMissil, missel.x, missel.y);
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