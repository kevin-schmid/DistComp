package at.fhj;

import java.util.Properties;

public enum SimpQui {
    INSTANCE;
    public static final String MOCK = "mock";

    public enum PropertyKey {
        ServerPort("server.port"),
        GamePlayerCount("game.player_count"),
        GameRoundTime("game.round_time"),
        GameRoundCount("game.round_count"),
        UserstatQueue("userstat.queue"),
        QuestionPoolRefillSize("question_pool.refillSize"),
        QuestionReceiverQueue("question_receiver.queue");

        private String value;
        PropertyKey(String value) {
            this.value=value;
        }
        public String getValue() {
            return value;
        }
    }

    private final Properties properties = new Properties();
    public void loadProperties() {
        try (var inputStream = SimpQui.class.getClassLoader().getResourceAsStream("config.properties")) {
            properties.load(inputStream);
        } catch(Exception e) {
            throw new IllegalStateException("Could not read properties!", e);
        }
    }

    public String getProperty(PropertyKey key) {
        return properties.getProperty(key.getValue());
    }
}
