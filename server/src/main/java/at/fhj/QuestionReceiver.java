package at.fhj;

import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.DeliverCallback;

import java.util.Map;
import java.util.function.BiConsumer;

class QuestionReceiver {
    private final static String QUEUE_NAME = "questions";
    private final ConnectionFactory factory;
    private final JsonParser jsonParser = new JsonParser();

    public QuestionReceiver() {
        factory = new ConnectionFactory();
        factory.setHost("localhost");
    }

    public void receive(final BiConsumer<String, String> consume) {
        try {
            var channel = factory.newConnection().createChannel();
            channel.queueDeclare(QUEUE_NAME, false, false, false, null);

            DeliverCallback deliverCallback = (consumerTag, delivery) -> {
                String message = new String(delivery.getBody(), "UTF-8");
                var json = jsonParser.parse(message).getAsJsonObject();
                consume.accept(json.get("Question").getAsString(), json.get("Answer").getAsString());
            };
            channel.basicConsume(QUEUE_NAME, true, deliverCallback, consumerTag -> {});
        } catch (Exception e) {
            throw new IllegalStateException(e);
        }
    }
}
