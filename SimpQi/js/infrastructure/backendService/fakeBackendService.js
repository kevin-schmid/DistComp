class FakeBackendService {
    constructor() {
        this.registeredNewResultCallbacks = []
        this.registeredNewQuestionCallbacks = []
    }

    tryLogin(username) {
        if(username === "herbert") {
            return { 
                'success': true, 
                'message': 'Login successful' 
            };
        }

        return { 
            'success': false, 
            'message': `The username '${username}' has already been taken` 
        };
    }
    
    notifyNewQuestionAndAnswer(questionAndAnswer) {
        for(var i = 0; i < this.registeredNewQuestionCallbacks.length; i++) {
            this.registeredNewQuestionCallbacks[i](questionAndAnswer);
        }
    }

    registerOnNewQuestionAndAnswer(onNewQuestionAndAnswerReceived) {
        registeredNewQuestionCallbacks.push(onNewQuestionAndAnswerReceived)
    }

    notifyNewResultAndRanking(resultAndRanking) {
        for(var i = 0; i < this.registeredNewResultCallbacks.length; i++) {
            this.registeredNewResultCallbacks[i](resultAndRanking);
        }
    }

    registerOnNewResultAndRanking(onNewResultAndRankingReceived) {
        registeredNewResultCallbacks.push(onNewResultAndRankingReceived);
    }
}