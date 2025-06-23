class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // Ascolta eventi dal Model
        this.model.on('modelHaGeneratoLinguaggi', (e) => {
            this.view.costruisceSelettoreLinguaggio(e.detail.linguaggi);
        });

        this.model.on('modelHaGeneratoArgomenti', (e) => {
            this.view.costruisceSelettoreArgomento(this.model.argomenti);
        });


        this.model.on("modelHaCambiatoQuiz", (e) => {
            this.view.mostraQuiz(this.model.quizCorrente);
        });

        // Ascolta eventi dal Model
        this.view.on("viewHaCliccatoSuControlla", (e) => {
            this.view.mostraSoluzione(this.model.quizCorrente.soluzione);
            let diff = this.model.controlla(this.view.risposta.value);
            this.view.mostraDifferenze(diff);
        });

        this.view.on("viewHacliccatoQuizAvanti", (e) => {
            this.model.altroQuiz(+1);
        });

        this.view.on("viewHaCliccatoQuizIndietro",(e) => {
            this.model.altroQuiz(-1);
        });


        this.view.on("viewHaCliccatoAltroArgomento", (e) => {
            this.model.selezionaArgomento(e.detail.value);
        });

        this.view.on("viewHaCliccatoAltroLinguaggio",(e) => {
            this.model.caricaLinguaggioDiIndice(parseInt(e.detail.value));
        });


        this.model.caricaDatiDaJson();
    }
}
