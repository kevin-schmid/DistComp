package at.fhj;

import org.junit.Assert;
import org.junit.Test;

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
}
