class WebSocketBackendService {
    construct(host, port) {
        this.host = host;
        this.port = port;
        this.registeredNewResultCallbacks = []
        this.registeredNewQuestionCallbacks = []

    }

    tryLogin(username) {
        return { 
            'success': true, 
            'message': 'Login successful' 
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