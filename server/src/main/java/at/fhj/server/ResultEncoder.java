package at.fhj.server;

import at.fhj.game.Result;

import javax.websocket.EncodeException;
import javax.websocket.Encoder;
import javax.websocket.EndpointConfig;

public class ResultEncoder implements Encoder.Text<Result> {
    @Override
    public String encode(Result result) throws EncodeException {
        return null;
    }

    @Override
    public void init(EndpointConfig config) {

    }

    @Override
    public void destroy() {

    }
}
