package at.fhj.question;

import at.fhj.question.Question;
import at.fhj.server.QuestionEncoder;
import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Test;

import javax.websocket.EncodeException;
import java.util.stream.Stream;

public class QuestionTest {

    @Test
    public void correctAnswer() {
        var correctAnswer = "Correct";
        var question = new Question("Question?", correctAnswer);
        Assert.assertEquals(correctAnswer, question.getAnswers()[question.getCorrectAnswer()]);
    }

    @Test
    public void openSlotsAfterInit() {
        var question = new Question("Question?", "Correct");
        Assert.assertTrue(question.hasOpenAnswerSlots());
    }

    @Test
    public void allSlotsFilled() {
        var question = new Question("Question?", "Correct");
        question.addWrongAnswer("1");
        question.addWrongAnswer("2");
        question.addWrongAnswer("3");
        Assert.assertFalse(question.hasOpenAnswerSlots());
    }

    @Test
    public void noDuplicatedAnswers() {
        var question = new Question("Question?", "Correct");
        question.addWrongAnswer("1");
        question.addWrongAnswer("1");
        question.addWrongAnswer("1");
        Assert.assertTrue(question.hasOpenAnswerSlots());
    }

    @Test
    public void noOverflowing() {
        var question = new Question("Question?", "Correct");
        question.addWrongAnswer("1");
        question.addWrongAnswer("2");
        question.addWrongAnswer("3");
        question.addWrongAnswer("4");
        Stream.of(question.getAnswers()).forEach(answer ->
            Assert.assertNotEquals("4", answer)
        );
    }
    @Test
    public void json() throws EncodeException {
        var question = new Question("q", "a");
        question.addWrongAnswer("b");
        question.addWrongAnswer("c");
        question.addWrongAnswer("d");

        var json = String.format("{\"question\":\"%s\",\"correctAnswer\":%d,\"answers\":[\"%s\",\"%s\",\"%s\",\"%s\"]}",
                question.getQuestion(), question.getCorrectAnswer(),
                question.getAnswers()[0], question.getAnswers()[1], question.getAnswers()[2], question.getAnswers()[3]);

        Assert.assertEquals(json, new QuestionEncoder().encode(question));
        Assert.assertEquals("a", question.getAnswers()[question.getCorrectAnswer()]);
    }
}
