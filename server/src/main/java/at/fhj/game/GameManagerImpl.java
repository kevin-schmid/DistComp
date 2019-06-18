package at.fhj.game;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;
import java.util.stream.IntStream;

class GameManagerImpl implements GameManager {
    private final Set<Game> gameCache = Collections.synchronizedSet(new HashSet<Game>());
    private final Map<String, Player> playerCache = new ConcurrentHashMap<>();

    private static final int ROUND_TIME = 30;
    private static final int ROUND_COUNT = 5;

    private Game openGame = new Game();

    public void addPlayer(Player player) {
        openGame.addPlayer(player);
        if(openGame.isStartable()) {
            startGame(openGame);
            openGame = new Game();
        }
    }

    public void correctAnswer(String username) {
        playerCache.get(username).incCorrectAnswers();
    }

    public void removeGame(Game game) {
        game.getPlayers().stream().map(Player::getUsername).forEach(playerCache::remove);
        gameCache.remove(game);
    }

    private void startGame(Game game) {
        var scheduler = Executors.newSingleThreadScheduledExecutor();
        IntStream.range(1, ROUND_COUNT+1).forEach(i -> scheduler.schedule(game, ROUND_TIME*i, TimeUnit.SECONDS));
        scheduler.schedule(new GameTerminator(game), ROUND_TIME*ROUND_COUNT+1, TimeUnit.SECONDS);
        scheduler.shutdown();
        gameCache.add(game);
    }
}
