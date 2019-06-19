package at.fhj.server;

import com.google.gson.JsonParser;

import javax.websocket.DecodeException;
import javax.websocket.Decoder;
import javax.websocket.EndpointConfig;

public class MessageDecoder implements Decoder.Text<ClientMessage> {
    private static final String USERNAME = "username";
    private static final String ACTION = "action";

    private final JsonParser jsonParser = new JsonParser();

    public MessageDecoder(){}

    @Override
    public ClientMessage decode(String message) throws DecodeException {
        var json = jsonParser.parse(message).getAsJsonObject();
        return new ClientMessage(
                json.get(USERNAME).getAsString(),
                ActionType.valueOf(json.get(ACTION).getAsString())
        );
    }

    @Override
    public boolean willDecode(String message) {
        return message.contains(USERNAME) && message.contains(ACTION);
    }

    @Override
    public void init(EndpointConfig config) {}

    @Override
    public void destroy() {}
}
