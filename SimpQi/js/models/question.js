class Question {
    constructor(question, answers, correctAnswer) {
        this.question = question;
        this.answers = answers;
        this.correctAnswer = correctAnswer;
    }


    getAllAnswers() {
        return answers;
    }

    getCorrectAnswer() {
        return answers[this.correctAnswer];
    }
}