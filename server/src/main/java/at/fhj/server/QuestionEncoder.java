package at.fhj.server;

import at.fhj.question.Question;

import javax.websocket.EncodeException;
import javax.websocket.Encoder;
import javax.websocket.EndpointConfig;

public class QuestionEncoder implements Encoder.Text<Question> {
    @Override
    public String encode(Question object) throws EncodeException {
        return null;
    }

    @Override
    public void init(EndpointConfig config) {

    }

    @Override
    public void destroy() {

    }
}
