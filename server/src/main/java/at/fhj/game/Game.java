package at.fhj.game;

import at.fhj.SimpQui;
import at.fhj.question.QuestionPool;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;

class Game implements Runnable {
    private static final Logger log = LoggerFactory.getLogger(Game.class);
    private List<Player> players = new ArrayList<>();

    public List<Player> getPlayers() {
        players.sort(new PlayerComparator());
        return players;
    }

    public void addPlayer(Player player) {
        players.add(player);
    }

    public boolean isStartable() {
        var startSize = Integer.parseInt(SimpQui.INSTANCE.getProperty(SimpQui.PropertyKey.GamePlayerCount));
        log.debug("game start size: {}, current count: {}", startSize, players.size());
        return players.size() == startSize;
    }

    @Override
    public void run() {
        var question = QuestionPool.INSTANCE.pop();
        getPlayers().forEach(player -> player.send(question));
    }
}
