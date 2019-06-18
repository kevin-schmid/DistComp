package at.fhj.game;

public interface GameManager {
    GameManager INSTANCE = new GameManagerImpl();
    void addPlayer(Player player);
    void correctAnswer(String username);
    void removeGame(Game game);
}
