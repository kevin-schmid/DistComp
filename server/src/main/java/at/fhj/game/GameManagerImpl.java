package at.fhj.game;

import at.fhj.SimpQui;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;
import java.util.stream.IntStream;

class GameManagerImpl implements GameManager {
    private Logger log = LoggerFactory.getLogger(GameManagerImpl.class);

    private final Set<Game> gameCache = Collections.synchronizedSet(new HashSet<Game>());
    private final Map<String, Player> playerCache = new ConcurrentHashMap<>();
    private final UserStatProducer statProducer = new UserStatProducer();

    private Game openGame = new Game();

    @Override
    public void addPlayer(Player player) {
        openGame.addPlayer(player);
        if(openGame.isStartable()) {
            log.debug("game starts");
            startGame(openGame);
            openGame = new Game();
        }
    }

    @Override
    public void correctAnswer(String username) {
        log.debug("{} has the correct answer", username);
        playerCache.get(username).incCorrectAnswers();
    }

    @Override
    public void endGame(Game game) {
        log.debug("game ended");
        var result = Result.of(game);
        for(var player : game.getPlayers()) {
            player.send(result);
            playerCache.remove(player.getUsername());
        }
        statProducer.send(result);
        gameCache.remove(game);
    }

    private void startGame(Game game) {
        gameCache.add(game);
        game.getPlayers().forEach(player -> playerCache.put(player.getUsername(), player));

        var roundTime = Integer.parseInt(SimpQui.INSTANCE.getProperty(SimpQui.PropertyKey.GameRoundTime));
        var roundCount = Integer.parseInt(SimpQui.INSTANCE.getProperty(SimpQui.PropertyKey.GameRoundCount));
        log.debug("games lasts {} rounds, each {} seconds", roundCount, roundTime);
        var scheduler = Executors.newSingleThreadScheduledExecutor();
        IntStream.range(0, roundCount).forEach(i -> scheduler.schedule(game, roundTime*i, TimeUnit.SECONDS));
        scheduler.schedule(new GameTerminator(game), (roundTime*roundCount)+1, TimeUnit.SECONDS);
        scheduler.shutdown();
    }
}
