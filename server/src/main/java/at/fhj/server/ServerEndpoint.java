package at.fhj.server;

import at.fhj.game.GameManager;
import at.fhj.game.Player;

import javax.websocket.*;

@ClientEndpoint
@javax.websocket.server.ServerEndpoint(
        value = "/quiz/",
        decoders = MessageDecoder.class,
        encoders = {QuestionEncoder.class, ResultEncoder.class})
public class ServerEndpoint {
    @OnOpen
    public void onOpen(Session session) {
        System.out.printf("onOpen: sessionId='%s' \n", session.getId());
    }

    @OnMessage
    public void onMessage(Session session, ClientMessage message) {
        switch (message.getAction()) {
            case NEW_GAME:
                GameManager.INSTANCE.addPlayer(new Player(message.getUsername(), session));
                break;
            case CORRECT_ANSWER:
                GameManager.INSTANCE.correctAnswer(message.getUsername());
                break;
        }
        System.out.printf("onMessage: sessionId='%s', message='%s' \n", session.getId(), message);
    }

    @OnClose
    public void onClose(Session session) {
        System.out.printf("onClose: sessionId='%s' \n", session.getId());
    }

    @OnError
    public void onError(Session session, Throwable throwable) {
        System.out.printf("onError: sessionId='%s' \n", session.getId());
        throwable.printStackTrace(System.err);
    }
}