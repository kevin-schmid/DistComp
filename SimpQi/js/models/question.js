class Question {
    constructor(question, answers, correctAnswer) {
        this.question = question;
        this.answers = answers;
        this.correctAnswer = correctAnswer;
    }

    getAllAnswers() {
        return this.answers;
    }

    getCorrectAnswer() {
        return this.answers[this.correctAnswer];
    }

    getQuestion() {
        return this.question;
    }
}
