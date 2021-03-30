//Constantes
const letters = document.querySelector('.letters')
const alphabet = document.querySelectorAll('.alphabet');
const hits = document.querySelector('.hits');
const tip = document.querySelector('.tip');
const gains = document.getElementById('gains');
const points = document.getElementById('point');
const start = document.querySelector('.start');
const divForca = document.querySelector('.forca');

//Variáveis do jogo
var numberDrawn;
var wordDrawn;
var wordDrawnSingle;
var tipDrawn;
var letterFound;
var amountErrors
var wordDrawnSplit;
var invertWord;
var inverted
var idAlphabet;
var scoreboardGain;
var scoreboardPoint;
var endGame;
var countLetters;
var startG;

//Array de palavras e dic.a
const word = [
    { tip: "Pessoa que trabalha com lógica", word: "programador" },
    { tip: "Meio de transporte", word: "onibus" },
    { tip: "Ato do pescador", word: "Pescar" },
    { tip: "Pessoa que trabalha com roupas", word: "costureira" },
    { tip: "Tipo de bebida", word: "Refrigerante" },
    { tip: "Normalmente pendurado na parede", word: "quadro" },
    { tip: "Artefato de decoração e iluminação", word: "lustre" },
    { tip: "Ferramenta usada para trabalhar e acessar a internet", word: "computador" },
    { tip: "Local onde os caminhões andam", word: "estradas" },
    { tip: "Personagem da Disney", word: "minnie" },
    { tip: "Personagem do filme Vingadores", word: "thor" },
]

//Array de teclas permitidas
const charactersAuthorized = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', '', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'z', 'y', 'w', 'ç'
]

//Arrays com as imagens da forca
const forca = [
    './src/images/forca_7.png',
    './src/images/forca_6.png',
    './src/images/forca_5.png',
    './src/images/forca_4.png',
    './src/images/forca_3.png',
    './src/images/forca_2.png',
    './src/images/forca_1.png',
    './src/images/forca_0.png',
]
var imgInit = divForca.innerHTML = '<img src="' + forca[7] + '" alt="">';

//Desativa botão iniciar jogo
const actionBtn = () => {
    if (start.classList.contains('btnNone')) {
        start.classList.remove('btnNone');
    } else {
        start.classList.add('btnNone');
    }
    startGame();
}
start.addEventListener('click', actionBtn, false);

//Função para sortear um palavra
const startGame = () => {

    startG = true;
    letters.classList.remove('disabled')
    imgInit = divForca.innerHTML = '<img src="' + forca[7] + '" alt="">';
    console.log('Inciou o jogo')

    numberDrawn = Math.floor(Math.random() * word.length)
    wordDrawn = word[numberDrawn].word.toLowerCase();

    if (wordDrawn === wordDrawnSingle) {
        numberDrawn = Math.floor(Math.random() * word.length)
        wordDrawn = word[numberDrawn].word.toLowerCase();
    }

    wordDrawnSingle = word[numberDrawn].word.toLowerCase();
    tipDrawn = word[numberDrawn].tip;
    letterFound = [];
    amountErrors = 7;
    inverted = '';
    scoreboardGain = 0;
    scoreboardPoint = 0;
    endGame = false;
    countLetters = false;

    tip.innerHTML = tipDrawn;

    //Converte as letras da palavra sorteada em espaços com traços
    const convertCharacter = () => {
        wordDrawnSplit = wordDrawn.split("");
        invertWord = wordDrawnSplit.map(char => { return "_" });

        for (i = 0; i < invertWord.length; i++) {
            inverted += '<span id="' + [i] + '">' + invertWord[i] + '</span>';
        }
        return inverted;
    }
    hits.innerHTML = convertCharacter();

    //Remover classes correct e incorrect
    const verifyEndGame = () => {
        startG = false;
        letters.classList.add('disabled')
        wordDrawn = '';
        letterFound = [];
        amountErrors = 0;
        endGame = false;
        tip.innerHTML = 'Clique no botão para iniciar o jogo';
        for (var i = 0; i < alphabet.length; i++) {
            alphabet[i].classList.remove('correct');
            alphabet[i].classList.remove('incorrect');
        }
        start.classList.remove('btnNone');
    }

    //Verifica estagio do jogo par montar a forca
    const verifyPhaseGame = () => {
        for (var i = 0; i < forca.length; i++) {
            if (i === amountErrors) {
                var imgForca = forca[i];
            }
        }
        imgInit = divForca.innerHTML = '<img src="' + imgForca + '" alt="">';
        return imgInit;
    }

    //Verifica se existe a letra na palavra
    const letterExist = (word, letter) => {

        let letterTyped = document.getElementById(letter);

        if (!letterTyped.classList.contains('correct') || !letterTyped.classList.contains('incorrect') || !startG) {

            for (var i = 0; i < word.length; i++) {
                if (word[i] == letter) {
                    for (var x = 0; x < wordDrawnSingle.length; x++) {
                        if (wordDrawnSingle[x] == letter) {
                            let span = document.getElementById(x);
                            span.innerHTML = letter;
                            let l = document.getElementById(letter);
                            l.classList.add('correct');
                        }
                    }

                    letterFound.push(letter);
                    wordDrawn = wordDrawn.replace(letter, '');
                    scoreboardPoint = scoreboardPoint + 5;
                    points.innerHTML = scoreboardPoint;

                    //Caso o jogar acerte a palavra
                    if (wordDrawn.length == 0) {
                        scoreboardGain = scoreboardGain + 1;
                        gains.innerHTML = scoreboardGain;
                        console.log('Você ganhou')
                        endGame = true;
                        verifyEndGame();
                    }
                }
            }

            //Verificar se a letra digitada esta presente no novo array
            //Caso contrario contabiliza com letra errada
            function checksWrongLetter() {
                if (letterFound.length > 0) {
                    for (var i = 0; i < letterFound.length; i++) {
                        if (letterFound[i] == letter) {
                            countLetters = true;
                        } else {
                            countLetters = false;
                        }
                    }
                }
                console.log('Função check: ' + countLetters)
                return countLetters;
            }

            //Verifico a quantidade erros
            if (!endGame) {
                if (!checksWrongLetter()) {
                    amountErrors = amountErrors - 1;
                    let l = document.getElementById(letter);
                    l.classList.add('incorrect');
                    verifyPhaseGame();
                    console.log(verifyPhaseGame())
                    console.log(amountErrors)
                }
                if (amountErrors === 0) {
                    console.log('Você perdeu')
                    endGame = true;
                    verifyEndGame();
                }
            }
        }
    }

    //Função para marcar a letra digitada ou apertada pelo usuário
    const verifyLetters = (ev) => {
        idAlphabet = ev.target.id;
        if (idAlphabet) {
            letterExist(wordDrawn, idAlphabet)
        }
    }
    document.addEventListener('click', verifyLetters, false);

    //Verifica se o carácter apertado esta no array de autorizados
    const verifyCharactersAuthorized = (ev) => {
        var key = ev.key;

        for (var i = 0; i < charactersAuthorized.length; i++) {
            if (key == charactersAuthorized[i]) {
                letterExist(wordDrawn, key)
            }
        }
    }
    document.addEventListener('keydown', verifyCharactersAuthorized)
}