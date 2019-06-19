class WebSocketBackendService {
    construct(host, port) {
        this.host = host;
        this.port = port;
        this.registeredNewQuestionCallbacks = []

    }

    tryLogin(username) {
        return { 
            'success': true, 
            'message': 'Login successful' 
        };
    }

    notifyNewQuestion(question) {
        for(var i = 0; i < this.registeredNewQuestionCallbacks.length; i++) {
            this.registeredNewQuestionCallbacks[i](question);
        }
    }

    registerOnNewQuestion(callback) {
        registeredNewQuestionCallbacks.push(callback);
    }
}