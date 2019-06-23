package at.fhj.server;

import at.fhj.game.GameManager;
import at.fhj.game.Player;
import at.fhj.question.Question;
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
    Logger logger = LoggerFactory.getLogger(ServerEndpoint.class);

    @OnOpen
    public void onOpen(Session session) {
        logger.debug("onOpen: sessionId='%s' \n", session.getId());
    }

    @OnMessage
    public void onMessage(Session session, ClientMessage message) {
        logger.debug("onMessage: sessionId='%s', message='%s' \n", session.getId(), message);
        switch (message.getAction()) {
            case NEW_GAME:
                GameManager.INSTANCE.addPlayer(new Player(message.getUsername(), session));
                break;
            case CORRECT_ANSWER:
                GameManager.INSTANCE.correctAnswer(message.getUsername());
                break;
        }
    }

    @OnClose
    public void onClose(Session session) {
        logger.debug("onClose: sessionId='%s' \n", session.getId());
    }

    @OnError
    public void onError(Session session, Throwable throwable) {
        logger.error("onError: sessionId='%s' \n", session.getId(), throwable);
    }
}