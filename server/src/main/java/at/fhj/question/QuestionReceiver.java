package at.fhj.question;

import at.fhj.SimpQui;
import com.google.gson.JsonParser;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.DeliverCallback;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.function.BiConsumer;

class QuestionReceiver {
    private static final Logger log = LoggerFactory.getLogger(QuestionReceiver.class);

    private final ConnectionFactory factory;
    private final JsonParser jsonParser = new JsonParser();

    public QuestionReceiver() {
        factory = new ConnectionFactory();
        factory.setHost(SimpQui.INSTANCE.getProperty(SimpQui.PropertyKey.QuestionReceiverHost));
    }

    public void receive(final BiConsumer<String, String> consume) {
        var queueName = SimpQui.INSTANCE.getProperty(SimpQui.PropertyKey.QuestionReceiverQueue);
        log.debug("receiving questions from queue {} @ {}", queueName, factory.getHost());
        if(queueName.equals(SimpQui.MOCK)) {
            receiveMockData(consume);
        } else {
            receiveFromQueue(queueName, consume);
        }
    }

    private void receiveMockData(BiConsumer<String, String> consume) {
        var refillSize = Integer.parseInt(SimpQui.INSTANCE.getProperty(SimpQui.PropertyKey.QuestionPoolRefillSize));
        for(int i = 0; i < refillSize; i++) {
            consume.accept("Q"+i, "A"+i);
        }
    }

    private void receiveFromQueue(String queueName, final BiConsumer<String, String> consume) {
        try {
            var channel = factory.newConnection().createChannel();
            channel.queueDeclare(queueName, false, false, false, null);

            DeliverCallback deliverCallback = (consumerTag, delivery) -> {
                String message = new String(delivery.getBody(), "UTF-8");
                var json = jsonParser.parse(message).getAsJsonObject();
                consume.accept(json.get("Question").getAsString(), json.get("Answer").getAsString());
            };
            channel.basicConsume(queueName, true, deliverCallback, consumerTag -> {});
        } catch (Exception e) {
            throw new IllegalStateException(e);
        }
    }
}
