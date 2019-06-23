package at.fhj.game;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.ConnectionFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;

class UserStatProducer {
    Logger log = LoggerFactory.getLogger(UserStatProducer.class);

    private static final String QUEUE_NAME = "userstats";
    private final ConnectionFactory factory;
    private final Gson gson;

    public UserStatProducer() {
        factory = new ConnectionFactory();
        factory.setHost("localhost");
        gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
    }

    public void send(Result result) {
        try (var channel = factory.newConnection().createChannel()) {
            channel.queueDeclare(QUEUE_NAME, false, false, false, null);
            channel.basicPublish("", QUEUE_NAME, null, gson.toJson(result).getBytes("UTF-8"));
        } catch(Exception e) {
            log.error("user stat publish failed!", e);
        }
    }
}
