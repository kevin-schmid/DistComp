package at.fhj.game;

import at.fhj.SimpQui;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.rabbitmq.client.ConnectionFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

class UserStatProducer {
    Logger log = LoggerFactory.getLogger(UserStatProducer.class);
    private final ConnectionFactory factory;
    private final Gson gson;

    public UserStatProducer() {
        factory = new ConnectionFactory();
        factory.setHost(SimpQui.INSTANCE.getProperty(SimpQui.PropertyKey.UserstatHost));
        gson = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
    }

    public void send(Result result) {
        var queueName = SimpQui.INSTANCE.getProperty(SimpQui.PropertyKey.UserstatQueue);
        if (queueName.equals(SimpQui.MOCK)) {
            return;
        }
        try (var channel = factory.newConnection().createChannel()) {
            channel.queueDeclare(queueName, false, false, false, null);
            channel.basicPublish("", queueName, null, gson.toJson(result).getBytes("UTF-8"));
        } catch (Exception e) {
            log.error("user stat publish failed!", e);
        }
    }
}
