class Model {
    constructor() {
        this.quizCorrente ={};
        this.indiceQuizCorrente=-1;

        fetch("./quiz/elenco.txt")
            .then((res) => res.text())
            .then((text) => {
                // do something with "text"
                this.elencoNomiQuiz = text.split('\n');
                this.altroQuiz();
            })
    }

    altroQuiz() {
        //TODO:prevedere fine sessione di quiz
        this.indiceQuizCorrente++ ;
        if (this.indiceQuizCorrente >= this.elencoNomiQuiz.length) {
            this.indiceQuizCorrente = 0;
        }

        fetch("./quiz/" + this.elencoNomiQuiz[this.indiceQuizCorrente] + ".cpp")
            .then((res) => res.text())
            .then((text) => {
                // do something with "text"
                this.quizCorrente.testo = text;
                this.onQuizChanged();
            })
            .catch((e) => console.error(e));
        fetch("./quiz/" + this.elencoNomiQuiz[this.indiceQuizCorrente] + ".sol")
            .then((res) => res.text())
            .then((text) => {
                // do something with "text"
                this.quizCorrente.soluzione = text;
                this.onQuizChanged();
            })
            .catch((e) => console.error(e));
    }


    controlla(risposta) {
        let dmp = new diff_match_patch(); //TODO : rendere globale dmp?
        return dmp.diff_main(risposta, this.quizCorrente.soluzione);
    }

    bindOnQuizChanged(handler) {
        this.onQuizChanged = handler;
    }
}


class View {

    escapeHTML(stringa) {
        //https://stackoverflow.com/questions/3043775/how-to-escape-html

        var p = document.createElement("p");
        p.appendChild(document.createTextNode(stringa));
        return p.innerHTML;
    }
    constructor() {
        this.codeBlock = document.getElementById("codeBlock");
        this.risposta = document.getElementById("risposta");
        this.bottoneControlla = document.getElementById("bottoneControlla");
        this.soluzione = document.getElementById("soluzione");
        this.differenze = document.getElementById("differenze");
        this.bottoneAltroQuiz = document.getElementById("altroQuiz");
    }

    //bind per l'inversione di controllo
    bindOnClickControlla(handler) {
        this.bottoneControlla.addEventListener("click", event => {
            handler();
        })
    }

    bindOnClickAltroQuiz(handler) {
        this.bottoneAltroQuiz.addEventListener("click", event => {
            handler();
        })
    }

    mostraSoluzione(testoSoluzione) {
        this.soluzione.value = testoSoluzione;
    }

    mostraDifferenze(diff) {
        let dmp = new diff_match_patch(); //TODO : rendere globale dmp?
        let differenzeRenderizzate = dmp.diff_prettyHtml(diff);
        this.differenze.innerHTML = differenzeRenderizzate;
    }

    mostraQuiz(quiz) {
        this.codeBlock.innerHTML = this.escapeHTML(quiz.testo);
        hljs.highlightElement(this.codeBlock);
    }

    cancellaQuiz() {
        this.risposta.value = "";
        this.soluzione.value = "";
        this.differenze.innerHTML = "";
    }
}

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        //inverte il controllo ( la classe view 
        //puo' cosi' richiamare un methodo della classe
        //"padrona")
        this.view.bindOnClickControlla(this.handleOnControlla);
        this.model.bindOnQuizChanged(this.handleOnQuizChanged);
        this.view.bindOnClickAltroQuiz(this.handleAltroQuiz);

        this.view.cancellaQuiz(); //da spostare in view ?
        this.handleOnQuizChanged(); //nato un nuovo quiz. da spostare in model ...

    }
    
    handleAltroQuiz = () => {
        this.model.altroQuiz();
        this.view.cancellaQuiz(); 
    }

    handleOnQuizChanged = () => {
        this.view.mostraQuiz(this.model.quizCorrente);
    }

    handleOnControlla = () => {
        this.view.mostraSoluzione(this.model.quizCorrente.soluzione);
        let diff = this.model.controlla(this.view.risposta.value);
        this.view.mostraDifferenze(diff);
    }

}

var app
function setup() {
    app = new Controller(new Model(), new View())
}