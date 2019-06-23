const WebSocket = require('ws')
 
const wss = new WebSocket.Server({ port: 1337 })

var gameState = []
var questions = [
  {
    'question': 'Is it true, that you duck?',
    'answers': ['Yes', 'No'],
    'correctAnswer': 0
  }, {
    'question': 'Why do you still play this game',
    'answers': ['Because I hate life', 'Because I develop this game'],
    'correctAnswer': 1
  }
]

wss.on('connection', ws => {
  function sendResults() {
    console.log("Round over: ", gameState);
    ws.send(JSON.stringify({'messageType': 'results', 'results': gameState}), 15000);
    setTimeout(beginGame, 5000);
  }

  function sendQuestion(question) {
    console.log('Question: ', question.question);
    ws.send(JSON.stringify(question));
    setTimeout(sendResults, 5000);
  }

  function beginGame() {
    for(var i = 0; i < gameState.length; i++) {
      if(gameState[i].points == questions.length) {
        endGame();
      }
    }
    var questionIndex = getRandom(0, questions.length-1);
    setTimeout(() => sendQuestion(questions[questionIndex]), 5000);
  }

  function endGame() {
      // send results
      console.log("Game finisehd");
      gameState = []
  }
 
  ws.on('message', msg => {
      var message = JSON.parse(msg);
      if(message.messageType === 'login') {
        gameState.push({'username': message.username, 'points': 0});
        console.log(`User '${message.username}' joined game!`);
      }

      if(message.messageType === 'correctAnswer') {
        for(var i = 0; i < questions.length-1; i++) {
          if(gameState[i].username === message.username) {
              gameState[i].points++;
              console.log(`'${message.username}' scored 1 point - has total of ${gameState[i].points} points`);
          }
        }
      }

      if(gameState.length === 1) {
        console.log(`Total of ${gameState.length} players connected. Let's start the game`);
        beginGame();
      }
  })
});

function getRandom(min, max) {
  return Math.floor(Math.random()*(max-min+1)+min);
}
