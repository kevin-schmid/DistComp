package at.fhj.game;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;
import java.util.stream.IntStream;

class GameManagerImpl implements GameManager {
    private final Set<Game> gameCache = Collections.synchronizedSet(new HashSet<Game>());
    private final Map<String, Player> playerCache = new ConcurrentHashMap<>();

    private static final int ROUND_TIME = 10;
    private static final int ROUND_COUNT = 5;

    private Game openGame = new Game();

    @Override
    public void addPlayer(Player player) {
        openGame.addPlayer(player);
        if(openGame.isStartable()) {
            startGame(openGame);
            openGame = new Game();
        }
    }

    @Override
    public void correctAnswer(String username) {
        playerCache.get(username).incCorrectAnswers();
    }

    @Override
    public void endGame(Game game) {
        var result = Result.of(game);
        for(var player : game.getPlayers()) {
            player.send(result);
            playerCache.remove(player.getUsername());
        }
        gameCache.remove(game);
    }

    private void startGame(Game game) {
        gameCache.add(game);
        game.getPlayers().forEach(player -> playerCache.put(player.getUsername(), player));

        var scheduler = Executors.newSingleThreadScheduledExecutor();
        IntStream.range(0, ROUND_COUNT).forEach(i -> scheduler.schedule(game, ROUND_TIME*i, TimeUnit.SECONDS));
        scheduler.schedule(new GameTerminator(game), (ROUND_TIME*ROUND_COUNT)+1, TimeUnit.SECONDS);
        scheduler.shutdown();
    }
}
