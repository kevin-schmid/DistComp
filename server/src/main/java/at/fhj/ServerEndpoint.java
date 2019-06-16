package at.fhj;

import javax.websocket.*;

@ClientEndpoint
@javax.websocket.server.ServerEndpoint(value = "/quiz/")
public class ServerEndpoint {

    @OnOpen
    public void onOpen(Session session) {
        System.out.printf("onOpen: sessionId='%s' \n", session.getId());
    }

    @OnMessage
    public void onMessage(Session session, String message) {
        System.out.printf("onMessage: sessionId='%s', message='%s' \n", session.getId(), message);
    }

    @OnClose
    public void onClose(Session session) {
        System.out.printf("onClose: sessionId='%s' \n", session.getId());
    }

    @OnError
    public void onError(Session session, Throwable throwable) {
        System.out.printf("onError: sessionId='%s' \n", session.getId());
    }
}