package at.fhj.question;

import at.fhj.SimpQui;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.*;
import java.util.concurrent.ThreadLocalRandom;
import java.util.function.BiConsumer;

class QuestionPoolImpl implements QuestionPool{
    private Logger log = LoggerFactory.getLogger(QuestionPoolImpl.class);

    private final Queue<String> QUESTION_POOL = new LinkedList<>();
    private final LinkedList<String> ANSWER_POOL = new LinkedList<>();

    private final BiConsumer<String, String> consumeRefill = (question, answer) -> {
        QUESTION_POOL.add(question);
        ANSWER_POOL.add(answer);
    };

    public QuestionPoolImpl() {
        tryRefill();
    }

    private void tryRefill() {
        var refillSize = Integer.parseInt(SimpQui.INSTANCE.getProperty(SimpQui.PropertyKey.QuestionPoolRefillSize));
        if(QUESTION_POOL.size() < refillSize) {
            log.debug("refill starts");
            new QuestionReceiver().receive(consumeRefill);
        }
    }

    @Override
    public Question pop() {
        var question = new Question(QUESTION_POOL.poll(), ANSWER_POOL.poll());
        while(question.hasOpenAnswerSlots()) {
            question.addWrongAnswer(ANSWER_POOL.get(ThreadLocalRandom.current().nextInt(0, ANSWER_POOL.size())));
        }
        tryRefill();
        return question;
    }
}
