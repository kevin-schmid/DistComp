class FakeBackendService {
    constructor() {
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

    notifyNewQuestion(question) {
        for(var i = 0; i < this.registeredNewQuestionCallbacks.length; i++) {
            this.registeredNewQuestionCallbacks[i](question);
        }
    }

    registerOnNewQuestion(callback) {
        registeredNewQuestionCallbacks.push(callback);
    }
}