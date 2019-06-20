package at.fhj.game;

import at.fhj.server.ResultEncoder;
import org.junit.Assert;
import org.junit.Test;

import javax.websocket.EncodeException;

public class ResultTest {
    @Test
    public void json() throws EncodeException {
        Player p1 = new Player("a", null);
        Player p2 = new Player("b", null);
        Player p3 = new Player("c", null);
        Player p4 = new Player("d", null);
        var game = new Game();
        game.addPlayer(p1);
        game.addPlayer(p2);
        game.addPlayer(p3);
        game.addPlayer(p4);
        p2.incCorrectAnswers();
        p2.incCorrectAnswers();
        p1.incCorrectAnswers();
        p4.incCorrectAnswers();

        var result = new ResultEncoder().encode(Result.of(game));
        Assert.assertEquals("{\"players\":[{\"username\":\"b\",\"correctAnswers\":2},{\"username\":\"a\",\"correctAnswers\":1},{\"username\":\"d\",\"correctAnswers\":1},{\"username\":\"c\",\"correctAnswers\":0}]}",
                result);
    }
}
