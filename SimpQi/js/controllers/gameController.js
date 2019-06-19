class GameController {
    constructor(backendService, persistenceService) {
        this.backendService = backendService;
        this.persistenceService = persistenceService;

        this.playerImages = [
            "img/player/p1.jpg",
            "img/player/p2.jpg",
            "img/player/p3.jpg",
            "img/player/p4.jpg"
        ]

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
        renderPlayerCardWaiting(this.currentUser, this.playerImages[0]);
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
