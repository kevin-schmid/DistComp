package at.fhj;

import com.google.gson.Gson;
import org.eclipse.jetty.util.StringUtil;

import java.util.concurrent.ThreadLocalRandom;

public class Question {
    private String question;
    private int correctAnswer;
    private String[] answers = new String[4];

    public Question(String question, String correctAnswer) {
        this.question = question;
        this.correctAnswer = ThreadLocalRandom.current().nextInt(0, 4);
        answers[this.correctAnswer] = correctAnswer;
    }

    public String getQuestion() {
        return question;
    }

    public int getCorrectAnswer() {
        return correctAnswer;
    }

    public String[] getAnswers() {
        return answers;
    }

    public boolean hasOpenAnswerSlots() {
        for(int i = 0; i < answers.length; i++) {
            if(StringUtil.isBlank(answers[i])) {
                return true;
            }
        }
        return false;
    }

    public void addWrongAnswer(String answer) {
        int blankIndex = -1;
        for(int i = 0; i < answers.length; i++) {
            if(StringUtil.isBlank(answers[i])) {
                blankIndex = i;
            } else if(answers[i].equals(answer)) {
                    return;
            }
        }
        if(blankIndex > -1) {
            answers[blankIndex] = answer;
        }
    }

    @Override
    public String toString() {
        return toJson();
    }

    public String toJson() {
        return new Gson().toJson(this);
    }
}
