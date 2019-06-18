package at.fhj.game;

import at.fhj.question.QuestionPool;

import javax.websocket.Session;
import java.util.ArrayList;
import java.util.List;

class Game implements Runnable {
    private List<Player> players = new ArrayList<>();

    public List<Player> getPlayers() {
        return players;
    }

    public void addPlayer(Player player) {
        players.add(player);
    }

    public boolean isStartable() {
        return players.size() == 4;
    }

    @Override
    public void run() {
        var question = QuestionPool.INSTANCE.pop();
        getPlayers().stream()
                .map(Player::getSession)
                .map(Session::getAsyncRemote)
                .forEach(remote -> remote.sendObject(question));
    }
}
