class Player {
    constructor(username, correctAnswers){
        this.username = username;
        this.correctAnswers = correctAnswers;
    }

    getUsername(){
        return this.username;
    }

    getCorrectAnswersCount() {
        return this.correctAnswers;
    }
}
