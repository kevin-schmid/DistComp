# Installation 

To be able to run program you have to install amqp using `go get`

```sh
go get github.com/streadway/amqp
```

To run it, pass a parameter with the queue information
```sh
go run producer.go amqp://guest:guest@localhost:5672/
```