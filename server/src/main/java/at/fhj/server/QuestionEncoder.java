package at.fhj.server;

import at.fhj.question.Question;
import com.google.gson.GsonBuilder;

import javax.websocket.EncodeException;
import javax.websocket.Encoder;
import javax.websocket.EndpointConfig;

public class QuestionEncoder implements Encoder.Text<Question> {
    @Override
    public String encode(Question question) throws EncodeException {
        return new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create().toJson(question);
    }

    @Override
    public void init(EndpointConfig config) {}
    @Override
    public void destroy() {}
}