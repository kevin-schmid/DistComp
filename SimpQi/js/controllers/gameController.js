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

        this.lastQuestion = null;
    }

    initialize() {
        /* wire up backendService-events */
        this.backendService.registerOnNewQuestion((question) => this.displayQuestion(question));
        this.backendService.registerOnNewResults((results) => this.displayResults(results));
    }


    display() {
        $('.js-centered-body').empty();
        renderPlayerCardWaiting(this.currentUser, this.playerImages[0], this.sensorService.getCountry());
        $('.js-centered-body').fadeIn(1000);
        this.initialize();
    }

    displayQuestion(question) {
        this.lastQuestion = question;
        $('.js-centered-body').empty();
        renderQuestion(question);

        $('.js-answer-selection-0').click(() => this.handleAnswer(question, 0));
        $('.js-answer-selection-1').click(() => this.handleAnswer(question, 1));
        $('.js-answer-selection-2').click(() => this.handleAnswer(question, 2));
        $('.js-answer-selection-3').click(() => this.handleAnswer(question, 3));
    }

    handleAnswer(question, answerIndex) {
        if(question.correctAnswer === answerIndex) {
            this.handleCorrectAnswer();
        } else {
            this.handleWrongAnswer();
        }
    }

    handleCorrectAnswer() {
        $('.js-centered-body').empty();
        $('.js-centered-body').html('<h1>Where you toooooo fast</h1>');
        this.backendService.sendCorrectAnswer(this.currentUser);
    }

    handleWrongAnswer() {
        $('.js-centered-body').empty();
        $('.js-centered-body').html('<h1>Wrooooooong</h1>');
    }

    displayResults(results) {
        $('.js-centered-body').empty();
        renderResults(this.lastQuestion, results);
    }
}
