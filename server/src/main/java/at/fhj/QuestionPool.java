package at.fhj;

import java.util.*;
import java.util.concurrent.ThreadLocalRandom;
import java.util.function.BiConsumer;

enum QuestionPool {
    INSTANCE;

    private static final Queue<String> QUESTION_POOL = new LinkedList<>();
    private static final LinkedList<String> ANSWER_POOL = new LinkedList<>();

    private static final BiConsumer<String, String> consumeRefill = (question, answer) -> {
        QUESTION_POOL.add(question);
        ANSWER_POOL.add(answer);
    };

    static {
        tryRefill();
    }

    private static void tryRefill() {
        if(QUESTION_POOL.size() < 20) {
            new QuestionReceiver().receive(consumeRefill);
        }
    }

    public Question pop() {
        tryRefill();
        var question = new Question(QUESTION_POOL.poll(), ANSWER_POOL.poll());
        while(question.hasOpenAnswerSlots()) {
            question.addWrongAnswer(ANSWER_POOL.get(ThreadLocalRandom.current().nextInt(0, ANSWER_POOL.size())));
        }
        return question;
    }
}
