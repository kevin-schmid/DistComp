#!/usr/bin/env python
import pika
import time
from .classes.writeToMongo import WriteToMongo;

connection = pika.BlockingConnection(
    #TODO: Change if needed
    pika.ConnectionParameters(host='localhost'))
channel = connection.channel()

# TODO: Change if needed
channel.queue_declare(queue='task_queue', durable=True)
print(' [*] Waiting for messages. To exit press CTRL+C')


def callback(ch, method, properties, body):
    print(" [x] Received %r" % body)
    sender = WriteToMongo.__init__(body)
    sender.writeToMongo();

    time.sleep(body.count(b'.'))
    print(" [x] Done")
    ch.basic_ack(delivery_tag=method.delivery_tag)


channel.basic_qos(prefetch_count=1)
channel.basic_consume(queue='task_queue', on_message_callback=callback)

channel.start_consuming()