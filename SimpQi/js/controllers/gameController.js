class GameController {
    constructor(backendService, persistenceService, sensorService) {
        this.backendService = backendService;
        this.persistenceService = persistenceService;
        this.sensorService = sensorService;

        this.playerImages = [
            "img/player/freddie.jpg",
            "img/player/freddie2.jpg",
            "img/player/freddie3.jpg",
            "img/player/spongebob.jpg"
        ];

        this.currentUser = persistenceService
            .loadFromLocalStorage('lastUsername');
    }

    initialize() {
        /* wire up backendService-events */
        /* if game started, no message received - displayWaitingForQuestion() */
        /* if message question-received - displayQuestion() */
        /* if questionAnswered, displayRank() */
    }


    display() {
        $('.js-centered-body').empty();
        var self = this;

        renderPlayerCardWaiting(self.currentUser, self.playerImages[0], this.sensorService.getCountry());
        $('.js-centered-body').fadeIn(1000);

        setTimeout(function(){
            $('.js-centered-body').empty();
            renderQuestion(new Question("Warum ist die Banane krumm?", [
                "Weiß nicht", "Darum", "Hab Angst", "Weil sie gelb ist"], 3));
        }, 1000);
        this.initialize();
    }

    displayWaitingForQuestion() {

    }

    displayQuestion(question) {

    }

    displayRank() {

    }

}
