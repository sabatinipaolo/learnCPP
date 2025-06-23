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

        this.view.bindSignalOnClickQuizCopia(async () => {
            //TODO: spostare in view ...
            await navigator.clipboard.writeText(this.model.quizCorrente.testo);
            this.view.bottoneCopia.innerHTML = " Testo copiato "
            setTimeout(()=>{ this.view.bottoneCopia.innerHTML = " copia testo nella clipboard  " ;}, 330);
        });

        this.model.bindSignalQuizChanged(() => {
            this.view.mostraQuiz(this.model.quizCorrente);
        });

        this.model.bindSignalGeneratoArgomenti(() => {
            this.view.costruisceSelettoreArgomento(this.model.argomenti);
        });

        this.view.bindSignalOnSelectAltroArgomento(() => {
            this.model.selezionaArgomento(this.view.selettoreArgomento.value);
        });

        this.view.bindSignalOnSelectAltroLinguaggio(() => {
            this.model.caricaLinguaggioDiIndice(parseInt(this.view.selettoreLinguaggio.value));
        });

        this.model.bindSignalGeneratiNuoviDatiDaFileJSON(() => {
            this.view.mostraQuiz(this.model.quizCorrente);
            this.view.costruisceSelettoreArgomento(this.model.argomenti);
        });

        this.model.bindSignalGeneratoLinguaggi((linguaggi) => {
            this.view.costruisceSelettoreLinguaggio(linguaggi);
        });
        //fine binding

        this.model.caricaDatiDaJson();
    }
}
