package at.fhj.game;

import org.junit.Assert;
import org.junit.Test;

public class GameTest {
    @Test
    public void orderedResult() {
        var game = new Game();
        var playerA = new Player("A", null);
        var playerB = new Player("B", null);
        var playerC = new Player("C", null);
        game.addPlayer(playerA);
        game.addPlayer(playerB);
        game.addPlayer(playerC);
        playerB.incCorrectAnswers();
        Assert.assertEquals("B", game.getPlayers().get(0).getUsername());
        Assert.assertEquals("A", game.getPlayers().get(1).getUsername());
        Assert.assertEquals("C", game.getPlayers().get(2).getUsername());
    }

    @Test
    public void startable() {
        var game = new Game();
        game.addPlayer(new Player("A", null));
        game.addPlayer(new Player("B", null));
        game.addPlayer(new Player("C", null));
        game.addPlayer(new Player("D", null));
        Assert.assertTrue(game.isStartable());
    }
}
