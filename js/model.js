class Model extends EventTarget{
    constructor() {
        super();
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

    caricaDatiDaJson() {
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
                this.lanciaEvent( "modelHaGeneratoNuoviDatiDafileJSON");  //TODO: serve ???
            });
    }

    inizializzaDaDati() {
        this.quizCorrente = { testo: "", soluzione: "", indice: 0 };
        this.lanciaEvent("modelHaGeneratoLinguaggi",{linguaggi:this.dati.linguaggi});
        this.indiceLinguaggioCorrente = 0; //il default
        this.caricaLinguaggioDiIndice(this.indiceLinguaggioCorrente);
    }

    caricaLinguaggioDiIndice(indice) {
        this.indiceLinguaggioCorrente = indice;

        this.argomenti = [];
        for (const argo of this.dati.linguaggi[this.indiceLinguaggioCorrente].argomenti) {
            this.argomenti.push(argo.directory);
        }
        this.indiceArgomentoCorrente = 0;

        this.lanciaEvent("modelHaGeneratoArgomenti");

        this.elencoNomiQuiz =
            this.dati.linguaggi[this.indiceLinguaggioCorrente].argomenti[
                this.indiceArgomentoCorrente
            ].esercizi;
        this.caricaInQuizCorrenteQuelloDiIndice(0);
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
            this.dati.linguaggi[this.indiceLinguaggioCorrente].directory +
            "/" +
            this.dati.linguaggi[this.indiceLinguaggioCorrente].argomenti[
                this.indiceArgomentoCorrente
            ].directory +
            "/" +
            nomeQuiz;

        let estensioneSorgente = this.dati.linguaggi[this.indiceLinguaggioCorrente].estensione;

        //TODO : trasformare in promiseALL (attualmente segnala che il quiz è cambiato
        // 2 volte, prevedere possibili tempi di download lunghi ...)
        fetch(percorsoENomeQuiz + "." + estensioneSorgente)
            .then((res) => res.text())
            .then((text) => {
                this.quizCorrente.testo = text;
                this.lanciaEvent("modelHaCambiatoQuiz");
            })
            .catch((e) => console.error(e));

        fetch(percorsoENomeQuiz + ".sol")
            .then((res) => res.text())
            .then((text) => {
                this.quizCorrente.soluzione = text;
                this.lanciaEvent("modelHaCambiatoQuiz");
            })
            .catch((e) => console.error(e));
    }

    controlla(risposta) {
        var dmp = new diff_match_patch(); //TODO : rendere globale dmp?
        return dmp.diff_main(risposta, this.quizCorrente.soluzione);
    }

    selezionaArgomento(indice) {
        this.indiceArgomentoCorrente = indice;
        this.elencoNomiQuiz =
            this.dati.linguaggi[this.indiceLinguaggioCorrente].argomenti[
                this.indiceArgomentoCorrente
            ].esercizi;
        this.caricaInQuizCorrenteQuelloDiIndice(0);
    }
}
