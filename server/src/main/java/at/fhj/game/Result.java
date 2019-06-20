package at.fhj.game;

import com.google.gson.annotations.Expose;

import java.util.ArrayList;
import java.util.List;

public class Result {
    @Expose
    private List<Player> players = new ArrayList<>();

    private Result(List<Player> players){
        this.players.addAll(players);
    }
    public static Result of(Game game) {
        return new Result(game.getPlayers());
    }
}
