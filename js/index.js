class Model {
    constructor() {

        this.quizCorrente = {
            testo: '#include <iostream> \nusing namespace std;\n \nint main { \n\tcout << " hello world " << endl \n}',
            soluzione: "hello world"
        }
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

    mostraSoluzione(testoSoluzione) {
        this.soluzione.value = testoSoluzione;
    }

    mostraQuiz(quiz) {
        this.codeBlock.innerHTML = this.escapeHTML(quiz.testo);
        hljs.highlightElement(this.codeBlock);
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

        this.handleOnQuizChanged(); //nato un nuovo quiz. da spostare in model ...

    }

    handleOnQuizChanged = () => {
        this.view.mostraQuiz(this.model.quizCorrente);
    }

    handleOnControlla = () => {
        this.view.mostraSoluzione(this.model.quizCorrente.soluzione);
    }

}

var app
function setup() {
    app = new Controller(new Model(), new View())
}