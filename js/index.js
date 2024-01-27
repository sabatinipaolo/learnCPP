class Model {
    constructor() {
        this.dati={};
        this.linguaggi=[];
        this.indiceLinguaggioCorrente=-1; //TODO : è corretto?

        // this.linguaggioObject={
        //     "nome": "",
        //     "directory": "",
        //     "estensione": "",
        //     "argomenti": []
        // }

        this.quizCorrente = { "testo" :"",
                              "soluzione":"",
                              "indice" : -1
                            };
        this.linguaggio = "c";
        this.indiceDirectoryCorrente = 0;
        this.elencoNomiDirectoryArgomenti = [];

        this.caricaDatiDaJson()
        
    }



    caricaDatiDaJson(){
        fetch("modello.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json();
        })
        .then((json) => {
            this.dati = json;
            this.inizializzaDaDati();
            this.signalGeneratiNuoviDatiDaFileJSON();
        });
    }

    inizializzaDaDati(){

        this.linguaggi=this.dati.linguaggi;
        this.indiceLinguaggioCorrente=0; //il default

        this.linguaggioObject= this.linguaggi[this.indiceLinguaggioCorrente]
        
        this.linguaggio = this.linguaggioObject.directory ; //TODO : ora è directory rinominare linguaggio
        

        // for ( const argo of  this.linguaggi[this.indiceLinguaggioCorrente].argomenti ){
        //     this.elencoNomiDirectoryArgomenti.push( argo.directory );
        // };

        this.caricaLinguaggioDiIndice( this.indiceLinguaggioCorrente );

     }



    caricaLinguaggioDiIndice (indice) {
        this.linguaggio = this.linguaggi[indice].directory; //TODO : ora è directory rinominare linguaggio
        this.indiceDirectoryCorrente = 0;
        this.indiceLinguaggioCorrente = indice;
        
        //this.elencoNomiDirectoryArgomenti[this.indiceDirectoryCorrente];
        this.elencoNomiDirectoryArgomenti=[];
        for ( const argo of  this.linguaggi[this.indiceLinguaggioCorrente].argomenti ){
            this.elencoNomiDirectoryArgomenti.push( argo.directory );
        };
        this.signalGeneratoElencoNomiDirectoryArgomenti();
        console.log(this.linguaggi[this.indiceLinguaggioCorrente].argomenti[0])     
        this.elencoNomiQuiz = this.linguaggi[this.indiceLinguaggioCorrente].argomenti[ this.indiceDirectoryCorrente].esercizi;
        this.caricaInQuizCorrenteQuelloDiIndice(0);    


    }

    caricaLinguaggio(linguaggio) {
        this.linguaggio = linguaggio;
        this.indiceDirectoryCorrente = 0;
        this.path = "./quiz/" + this.linguaggio;
        let nomeFileElencoDir = this.path + "/elencoDirectory.txt";
        fetch(nomeFileElencoDir)
            .then((res) => res.text())
            .then((text) => {
                // do something with "text"
                this.elencoNomiDirectoryArgomenti = text.split("\n");
                this.signalGeneratoElencoNomiDirectoryArgomenti();

                //TODO : DRY vedi selezionaDirectory( indice)
                let nomeFileElencoQuiz =
                    this.path +
                    "/" +
                    this.elencoNomiDirectoryArgomenti[this.indiceDirectoryCorrente] +
                    "/elenco.txt";

                fetch(nomeFileElencoQuiz)
                    .then((res) => res.text())
                    .then((text) => {
                        // do something with "text"
                        this.elencoNomiQuiz = text.split("\n");
                        //this.indiceDirectoryCorrente = 0;
                        this.caricaInQuizCorrenteQuelloDiIndice(0);
                    });
            });
    }

    altroQuiz(piuOMenoUno) {
        let i = this.quizCorrente.indice;
        let n = this.elencoNomiQuiz.length;

        i = (((i + piuOMenoUno) % n) + n) % n; // i in [ 0 .. n-1 ], mai negativo

        this.caricaInQuizCorrenteQuelloDiIndice(i);
    }

    caricaInQuizCorrenteQuelloDiIndice(indice) {
        this.quizCorrente.indice = indice;

        let nomeQuiz = this.elencoNomiQuiz[indice];

        this.quizCorrente.nome = nomeQuiz;

        let percorsoENomeQuiz =
             this.dati.directory +
             "/" +
             this.linguaggi[this.indiceLinguaggioCorrente].directory +
             "/" +
             this.linguaggi[this.indiceLinguaggioCorrente].argomenti[this.indiceDirectoryCorrente]
                 .directory +
             "/" +
             nomeQuiz;
                               


        //TODO : trasformare in promiseALL (attualmente segnala che il quiz è cambiato
        // 2 volte, prevedere possibili tempi di download lunghi ...)
        fetch(percorsoENomeQuiz + "." + this.linguaggio)
            .then((res) => res.text())
            .then((text) => {
                this.quizCorrente.testo = text;
                this.signalQuizChanged();
            })
            .catch((e) => console.error(e));

        fetch(percorsoENomeQuiz + ".sol")
            .then((res) => res.text())
            .then((text) => {
                this.quizCorrente.soluzione = text;
                this.signalQuizChanged();
            })
            .catch((e) => console.error(e));
    }

    controlla(risposta) {
        var dmp = new diff_match_patch(); //TODO : rendere globale dmp?
        return dmp.diff_main(risposta, this.quizCorrente.soluzione);
    }

    selezionaDirectory(indice) {
        this.indiceDirectoryCorrente = indice;
        this.elencoNomiQuiz = this.linguaggi[this.indiceLinguaggioCorrente].argomenti[ this.indiceDirectoryCorrente].esercizi;
        this.caricaInQuizCorrenteQuelloDiIndice(0); 

    }

    //bind per l'inversione di controllo
    bindSignalQuizChanged(handler) {
        this.signalQuizChanged = handler;
    }

    bindSignalGeneratoElencoNomiDirectoryArgomenti(handler) {
        this.signalGeneratoElencoNomiDirectoryArgomenti = handler;
    }

    bindSignalGeneratiNuoviDatiDaFileJSON(handler){
        this.signalGeneratiNuoviDatiDaFileJSON=handler;
    }
}

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
        this.selettoreCartella = document.getElementById("selettoreCartella");
        this.selettoreLinguaggio = document.getElementById("selettoreLinguaggio");
        //TODO : creare da model ...
        {
            this.selettoreLinguaggio[0] = new Option("C", 0);
            this.selettoreLinguaggio[1] = new Option("C++", 1);
        }
        this.nomeFile = document.getElementById("nomeFile");
    }

    escapeHTML(stringa) {
        //https://stackoverflow.com/questions/3043775/how-to-escape-html

        var p = document.createElement("p");
        p.appendChild(document.createTextNode(stringa));
        return p.innerHTML;
    }

    costruisceSelettoreCartella(elenco) {
        this.selettoreCartella.innerHTML="";
        elenco.forEach((element, index) => {
            var opt = new Option(element, index);
            this.selettoreCartella[index] = opt;
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
    bindSignalOnSelectAltraDirectory(handler) {
        this.selettoreCartella.addEventListener("change", (event) => {
            handler();
        });
    }
    bindSignalOnSelectAltroLinguaggio(handler) {
        this.selettoreLinguaggio.addEventListener("change", (event) => {
            handler();
        });
    }
}

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        //inverte il controllo ( la classe view puo' cosi'
        // richiamare un methodo della classe "padrona")

        this.view.bindSignalOnClickControlla(() => {
            this.view.mostraSoluzione(this.model.quizCorrente.soluzione);
            let diff = this.model.controlla(this.view.risposta.value);
            this.view.mostraDifferenze(diff);
        });

        this.view.bindSignalOnClickQuizAvanti(() => {
            this.model.altroQuiz(+1);
        });

        this.view.bindSignalOnClickQuizIndietro(() => {
            this.model.altroQuiz(-1);
        });

        this.model.bindSignalQuizChanged(() => {
            this.view.mostraQuiz(this.model.quizCorrente);
        });

        this.model.bindSignalGeneratoElencoNomiDirectoryArgomenti(() => {
            this.view.costruisceSelettoreCartella(this.model.elencoNomiDirectoryArgomenti);
        });

        this.view.bindSignalOnSelectAltraDirectory(() => {
            this.model.selezionaDirectory(this.view.selettoreCartella.value);
        });

        this.view.bindSignalOnSelectAltroLinguaggio(() => {
            this.model.caricaLinguaggioDiIndice( parseInt(this.view.selettoreLinguaggio.value));

        });

        this.model.bindSignalGeneratiNuoviDatiDaFileJSON( () => {
            this.view.mostraQuiz(this.model.quizCorrente);
            this.view.costruisceSelettoreCartella(this.model.elencoNomiDirectoryArgomenti);
        })
    }
}

var app;
function setup() {
    app = new Controller(new Model(), new View());
    setupResizerEvents();
}
