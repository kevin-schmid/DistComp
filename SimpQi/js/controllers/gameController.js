class GameController {
    constructor(backendService, persistenceService) {
        this.backendService = backendService;
        this.persistenceService = persistenceService;
    }

    initialize() {
        /* wire up backendService-events */
        /* if game started, no message received - displayWaitingForQuestion() */
        /* if message question-received - displayQuestion() */
        /* if questionAnswered, displayRank() */
    }

    displayWaitingForQuestion() {
        
    }

    displayQuestion(questionAndAnswer) {

    }

    displayRank() {

    }
    
 }