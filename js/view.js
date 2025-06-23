class View extends EventTarget {
    constructor() {
        super();
        this.eventTarget = new EventTarget();  
        this.codeBlock = document.getElementById("codeBlock");
        this.risposta = document.getElementById("risposta");
        this.risposta.placeholder =
            "Inserisci qui quello che pensi il programma produca in output poi clicca su controlla";
        this.bottoneControlla = document.getElementById("bottoneControlla");
        this.bottoneControlla.addEventListener("click", (e)=> {
            this.lanciaEvent("viewHaCliccatoSuControlla");
        });


        this.soluzione = document.getElementById("soluzione");
        this.differenze = document.getElementById("differenze");
        this.bottoneQuizAvanti = document.getElementById("quizAvanti");
        this.bottoneQuizAvanti.addEventListener("click", (e)=> {
            this.lanciaEvent("viewHacliccatoQuizAvanti");
        });

        this.bottoneQuizIndietro = document.getElementById("quizIndietro");
        this.bottoneQuizIndietro.addEventListener("click", (e)=> {
            this.lanciaEvent("viewHaCliccatoQuizIndietro");
        });
        
        this.bottoneCopia = document.getElementById("buttonCopy");
        this.bottoneCopia.addEventListener("click",  async () => {
                await navigator.clipboard.writeText(this.testoQuizNonHighlighted);
                this.bottoneCopia.innerHTML = " Testo copiato "
                setTimeout(() => { this.bottoneCopia.innerHTML = " copia testo nella clipboard  "; }, 330);
        });

        this.selettoreArgomento = document.getElementById("selettoreArgomento");
        this.selettoreArgomento.addEventListener("change", (e)=> {
            this.lanciaEvent("viewHaCliccatoAltroArgomento",{value:this.selettoreArgomento.value})
        })

        this.selettoreLinguaggio = document.getElementById("selettoreLinguaggio");
        this.selettoreLinguaggio.addEventListener("change", (e) => {
            this.lanciaEvent("viewHaCliccatoAltroLinguaggio",{value:this.selettoreLinguaggio.value}) 
        })

        this.nomeFile = document.getElementById("nomeFile");
    }

    lanciaEvent(eventName, dettagli = {}) {
        const event = new CustomEvent(eventName, {
            detail: dettagli
        });
        this.dispatchEvent(event);
    }

    // questa funzione on( ... ) è per leggibilità nel controllore  
    on(eventName, handler) {
        this.addEventListener(eventName, handler);
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
        this.testoQuizNonHighlighted=quiz.testo; 
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
