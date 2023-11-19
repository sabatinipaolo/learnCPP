class Model {
    constructor() {
    }
}


class View {
    constructor() {
        this.codeBlock = document.getElementById("codeBlock");
        this.risposta = document.getElementById("risposta");
        this.bottoneControlla = document.getElementById("bottoneControlla");
        this.soluzione = document.getElementById("soluzione");
        this.differenze = document.getElementById("differenze");
        this.bottoneAltroQuiz = document.getElementById("altroQuiz");
 
        this.codeBlock.innerHTML = '#include <iostream> \nusing namespace std;\n \nint main { \n\tcout << " hello world " << endl \n}';

        hljs.highlightElement(this.codeBlock);
    }
}

class Controller {
    constructor(model, view) {
    }

}

var app
function setup() {
    app = new Controller(new Model(), new View())
}