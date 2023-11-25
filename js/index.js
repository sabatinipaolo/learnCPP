class Model {
    constructor() {
        this.quizCorrente = {};
        this.indiceQuizCorrente = -1;
        this.path="./quiz";
        this.indiceDirectoryCorrente= 0;
        this.elencoNomiDirectory= []


        fetch(this.path+"/elencoDirectory.txt")
        .then((res) => res.text())
        .then((text) => {
            // do something with "text"
            this.elencoNomiDirectory = text.split('\n');
            this.gEND();
            
            //TODO : DRY vedi selezionaDirectory( indice)   
            fetch(this.path+"/"+this.elencoNomiDirectory[this.indiceDirectoryCorrente]+"/elenco.txt")
                .then((res) => res.text())
                .then((text) => {
                    // do something with "text"
                    this.elencoNomiQuiz = text.split('\n');
                    this.altroQuiz();
                })
        })

    }

    gEND(){
        this.generatoElencoNomiDirectory();
    }

    altroQuiz() {
        //TODO:prevedere fine sessione di quiz
        this.indiceQuizCorrente++ ;
        if (this.indiceQuizCorrente >= this.elencoNomiQuiz.length) {
            this.indiceQuizCorrente = 0;
        }

        fetch(this.path+"/"+this.elencoNomiDirectory[this.indiceDirectoryCorrente]+"/"+ this.elencoNomiQuiz[this.indiceQuizCorrente] + ".cpp")
            .then((res) => res.text())
            .then((text) => {
                // do something with "text"
                this.quizCorrente.testo = text;
                this.onQuizChanged();
            })
            .catch((e) => console.error(e));
        fetch("./quiz/" + this.elencoNomiDirectory[this.indiceDirectoryCorrente]+"/"+ this.elencoNomiQuiz[this.indiceQuizCorrente]+ ".sol")
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

    selezionaDirectory( indice ){
        this.indiceDirectoryCorrente = indice;
        
        //TODO : DRY vedi constructor 
        fetch(this.path+"/"+this.elencoNomiDirectory[this.indiceDirectoryCorrente]+"/elenco.txt")
        .then((res) => res.text())
        .then((text) => {
            this.indiceQuizCorrente = -1; 
            this.elencoNomiQuiz = text.split('\n');
            this.altroQuiz();
        })

    }
    bindOnQuizChanged(handler) {
        this.onQuizChanged = handler;
    }

    bindGeneratoElencoNomiDirectory(handler){
        this.generatoElencoNomiDirectory = handler;
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
        this.selettoreCartella=document.getElementById("selettoreCartella");
    }

    costruisceSelettoreCartella ( elenco ){

        elenco.forEach((element, index) => {
            var opt=new Option(element, index);
            this.selettoreCartella[index]=opt;
        });
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

    bindOnSelectAltraDirectory(handler){
        this.selettoreCartella.addEventListener("change", event => {
            handler();
        })
    }
    mostraSoluzione(testoSoluzione) {
        this.soluzione.value = testoSoluzione;
    }

    mostraDifferenze(diff) {
        let differenzeRenderizzate = "";
        let s = "";
        diff.forEach(element => {
            console.log(element);
            element[1] = element[1].replaceAll(" ", "&nbsp");
            element[1] = element[1].replaceAll("\n", "&para<br>");

            switch (element[0]) {
                case -1:
                    // rimuovere
                    s = "<delchar>" + element[1] + "</delchar>";
                    break;
                case 0:
                    // corretta
                    s = "<okchar>" + element[1] + "</okchar>";
                    break;
                case 1:
                    // aggiungere
                    s = "<addchar>" + element[1] + "</addchar>";
                    break;
            }
            differenzeRenderizzate += s;
        });
        this.differenze.innerHTML = differenzeRenderizzate;
    }

    mostraQuiz(quiz) {
        this.codeBlock.innerHTML = this.escapeHTML(quiz.testo);
        delete codeBlock.dataset.highlighted;
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


        //costruisce il selettoredi cartelle TODO: da spostare in view?
        this.model.bindGeneratoElencoNomiDirectory( this.handleGeneratoElencoNomiDirectory );

        this.view.bindOnSelectAltraDirectory (this.handleOnSelectAltraDirectory ); 

    }
    
    handleOnSelectAltraDirectory = () => {
        //alert ("selezionata directory " + this.view.selettoreCartella.value );
        this.model.selezionaDirectory( this.view.selettoreCartella.value ) ; 
    }
    handleGeneratoElencoNomiDirectory = () => {
        this.view.costruisceSelettoreCartella(this.model.elencoNomiDirectory);
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
    app = new Controller(new Model(), new View());
}