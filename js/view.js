class View {
    constructor() {
        this.codeBlock = document.getElementById("codeBlock");
        this.risposta = document.getElementById("risposta");
        this.risposta.placeholder =
            "Inserisci qui quello che pensi il programma produca in output poi clicca su controlla";
        this.bottoneControlla = document.getElementById("bottoneControlla");
        this.soluzione = document.getElementById("soluzione");
        this.differenze = document.getElementById("differenze");
        this.bottoneQuizAvanti = document.getElementById("quizAvanti");
        this.bottoneQuizIndietro = document.getElementById("quizIndietro");
        this.bottoneCopia = document.getElementById("buttonCopy");
        this.selettoreArgomento = document.getElementById("selettoreArgomento");
        this.selettoreLinguaggio = document.getElementById("selettoreLinguaggio");

        this.nomeFile = document.getElementById("nomeFile");
    }

    escapeHTML(stringa) {
        //https://stackoverflow.com/questions/3043775/how-to-escape-html

        var p = document.createElement("p");
        p.appendChild(document.createTextNode(stringa));
        return p.innerHTML;
    }

    costruisceSelettoreLinguaggio(linguaggi) {
        for (let i = 0; i < linguaggi.length; i++) {
            this.selettoreLinguaggio[i] = new Option(linguaggi[i].nome, i);
        }

        //this.selettoreLinguaggio[ linguaggi.length ] = new Option("XXXXXXXXXX", linguaggi.length);
    }
    costruisceSelettoreArgomento(elenco) {
        this.selettoreArgomento.innerHTML = "";
        elenco.forEach((element, index) => {
            var opt = new Option(element, index);
            this.selettoreArgomento[index] = opt;
        });
    }

    mostraSoluzione(testoSoluzione) {
        this.soluzione.value = testoSoluzione;
    }

    mostraDifferenze(diff) {
        let differenzeRenderizzate = "";
        let s = "";
        diff.forEach((element) => {
            element[1] = element[1].replaceAll(" ", "&nbsp");
            element[1] = element[1].replaceAll("\n", "&para<br>");

            switch (element[0]) {
                case -1:
                    // rimuovere
                    s = "<delchar class='diffchar'>" + element[1] + "</delchar>";
                    break;
                case 0:
                    // corretta
                    s = "<okchar class='diffchar'>" + element[1] + "</okchar>";
                    break;
                case 1:
                    // aggiungere
                    s = "<addchar class='diffchar'>" + element[1] + "</addchar>";
                    break;
            }
            differenzeRenderizzate += s;
        });
        this.differenze.innerHTML = differenzeRenderizzate;
    }

    mostraQuiz(quiz) {
        this.cancellaQuiz();
        this.nomeFile.innerHTML = quiz.nome;
        this.codeBlock.innerHTML = this.escapeHTML(quiz.testo);
        delete codeBlock.dataset.highlighted;
        hljs.highlightElement(this.codeBlock);
    }

    cancellaQuiz() {
        this.risposta.value = "";
        this.soluzione.value = "";
        this.differenze.innerHTML = "";
    }

    //bind per l'inversione di controllo
    bindSignalOnClickControlla(handler) {
        this.bottoneControlla.addEventListener("click", (event) => {
            handler();
        });
    }

    bindSignalOnClickQuizAvanti(handler) {
        this.bottoneQuizAvanti.addEventListener("click", (event) => {
            handler();
        });
    }
    bindSignalOnClickQuizIndietro(handler) {
        this.bottoneQuizIndietro.addEventListener("click", (event) => {
            handler();
        });
    }
    bindSignalOnClickQuizCopia(handler) {
        this.bottoneCopia.addEventListener("click", (event) => {
            handler();
        });
    }
    bindSignalOnSelectAltroArgomento(handler) {
        this.selettoreArgomento.addEventListener("change", (event) => {
            handler();
        });
    }
    bindSignalOnSelectAltroLinguaggio(handler) {
        this.selettoreLinguaggio.addEventListener("change", (event) => {
            handler();
        });
    }
}
