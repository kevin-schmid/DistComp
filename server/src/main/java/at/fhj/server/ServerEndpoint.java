package at.fhj.server;

import at.fhj.game.GameManager;
import at.fhj.game.Player;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.websocket.*;

@ClientEndpoint
@javax.websocket.server.ServerEndpoint(
        value = "/quiz/",
        decoders = MessageDecoder.class,
        encoders = {ResultEncoder.class, QuestionEncoder.class}
)
public class ServerEndpoint {
    private Logger log = LoggerFactory.getLogger(ServerEndpoint.class);

    @OnOpen
    public void onOpen(Session session) {
        log.debug("onOpen: sessionId='{}'", session.getId());
    }

    @OnMessage
    public void onMessage(Session session, ClientMessage message) {
        log.debug("onMessage: sessionId='{}', message='{}'", session.getId(), message);
        switch (message.getAction()) {
            case NEW_GAME:
                GameManager.INSTANCE.addPlayer(new Player(message.getUsername(), session));
                break;
            case CORRECT_ANSWER:
                GameManager.INSTANCE.correctAnswer(message.getUsername());
                break;
            case USER_STAT:

                break;
        }
    }

    @OnClose
    public void onClose(Session session) {
        log.debug("onClose: sessionId='{}'", session.getId());
    }

    @OnError
    public void onError(Session session, Throwable throwable) {
        log.error("onError: sessionId='{}'", session.getId(), throwable);
    }
}