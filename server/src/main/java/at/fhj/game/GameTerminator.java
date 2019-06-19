package at.fhj.game;

class GameTerminator implements Runnable {
    private Game game;
    public GameTerminator(Game game) {
        this.game = game;
    }

    @Override
    public void run() {
        GameManager.INSTANCE.endGame(game);
    }
}
