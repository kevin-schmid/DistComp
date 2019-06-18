package at.fhj.game;

import javax.websocket.Session;

public class Player {
    private String username;
    private Session session;
    private int correctAnswers;

    public Player(String username, Session session) {
        this.username = username;
        this.session = session;
    }

    public String getUsername() {
        return username;
    }

    public Session getSession() {
        return session;
    }

    public void incCorrectAnswers() {
        correctAnswers++;
    }

    public int getCorrectAnswers() {
        return correctAnswers;
    }
}
