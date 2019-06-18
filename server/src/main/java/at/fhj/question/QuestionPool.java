package at.fhj.question;

public interface QuestionPool {
    QuestionPool INSTANCE = new QuestionPoolImpl();
    Question pop();
}
