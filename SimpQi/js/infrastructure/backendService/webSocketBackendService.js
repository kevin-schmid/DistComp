class WebSocketBackendService {
    constructor(host, port) {
        this.host = host;
        this.port = port;

        this.registeredNewResultsCallbacks = []
        this.registeredNewQuestionCallbacks = []

        this.ws = new WebSocket(`ws://${host}:${port}`);

        this.allMessages = []
        this.ws.onmessage = (msg) => {
            var serverMessage = JSON.parse(msg.data);
            this.allMessages.push(serverMessage);

            if(serverMessage.question !== undefined) {
                var question = new Question(
                    serverMessage.question, 
                    serverMessage.answers, 
                    serverMessage.correctAnswer);
                this.notifyNewQuestion(question);
            }

            if(serverMessage.messageType === 'results') {
                console.log("New result: ", serverMessage);
                this.notifyNewResults(serverMessage.results);
            }
        };

    }

    tryLogin(username) {
        if(this.ws === undefined) {
            return {
                'success': false,
                'message': 'Your Browser does not support WebSockets.'
            }
        }

        this.ws.send(JSON.stringify({'messageType': 'login', 'username': username, 'traceId': uuidv4()}));

        return {
            'success': true,
            'message': 'Login OK'
        }
    }

    sendCorrectAnswer(username){
        this.ws.send(JSON.stringify({
            'messageType': 'correctAnswer',
            'username': username
        }));
    }

    notifyNewQuestion(question) {
        for(var i = 0; i < this.registeredNewQuestionCallbacks.length; i++) {
            this.registeredNewQuestionCallbacks[i](question);
        }
    }

    registerOnNewQuestion(callback) {
        this.registeredNewQuestionCallbacks.push(callback);
    }

    notifyNewResults(results) {
        for(var i = 0; i < this.registeredNewResultsCallbacks.length; i++) {
            this.registeredNewResultsCallbacks[i](results);
        }
    }

    registerOnNewResults(callback) {
        this.registeredNewResultsCallbacks.push(callback);
    }
}

function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
  }