package at.fhj.game;

import com.google.gson.annotations.Expose;

import javax.websocket.Session;

public class Player {
    @Expose
    private String username;
    @Expose
    private int correctAnswers;

    private Session session;

    public Player(String username, Session session) {
        this.username = username;
        this.session = session;
    }

    public String getUsername() {
        return username;
    }

    public void send(Object msg) {
        session.getAsyncRemote().sendObject(msg);
    }

    public void incCorrectAnswers() {
        correctAnswers++;
    }

    public int getCorrectAnswers() {
        return correctAnswers;
    }
}
