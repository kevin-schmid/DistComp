package main

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/streadway/amqp"
)

// SheetsData to unmarshal the json into
type SheetsData struct {
	SpreadsheetID string       `json:"spreadsheetId"`
	ValueRanges   []ValueRange `json:"valueRanges"`
}

// ValueRange represents the data
type ValueRange struct {
	Range          string     `json:"range"`
	MajorDimension string     `json:"majorDimension"`
	Values         [][]string `json:"values"`
}

// Question to marshal for server
type Question struct {
	Question string
	Answer   string
}

func main() {
	// loading the sheets data
	res, err := http.Get("https://sheets.googleapis.com/v4/spreadsheets/1g8464j9pz50pExB8IUdAtZnX4T2fcDbL9aQSHi9EyzE/values:batchGet?ranges=B7%3AB120&ranges=E7%3AE120&key=AIzaSyAWoy5sbzQy1o2ALOTUopHVZmSIOzCVPjw")
	failOnError(err)

	// read the body data
	robots, err := ioutil.ReadAll(res.Body)
	failOnError(err)

	// unmarshalling
	var data SheetsData
	err = json.Unmarshal([]byte(robots), &data)
	failOnError(err)

	keys := data.ValueRanges[0]
	vals := data.ValueRanges[1]

	// connecting to the queue
	conn, err := amqp.Dial("amqp://guest:guest@localhost:5672/")
	failOnError(err)
	defer conn.Close()

	// opening a channel
	ch, err := conn.Channel()
	failOnError(err)
	defer ch.Close()

	// declaring the queue 'questions'
	q, err := ch.QueueDeclare(
		"questions", // name
		false,       // durable
		false,       // delete when unused
		false,       // exclusive
		false,       // no-wait
		nil,         // arguments
	)
	failOnError(err)

	// iterating through data
	for i := 0; i < len(keys.Values); i++ {

		// check if both have a value
		if len(keys.Values[i]) > 0 && len(vals.Values[i]) > 0 {
			// TODO: go routine might be nice here

			// creating JSON object
			jsonObj := Question{keys.Values[i][0], vals.Values[i][0]}
			bin, err := json.Marshal(jsonObj)
			failOnError(err)

			// sending message to queue
			err = ch.Publish(
				"",     // exchange
				q.Name, // routing key
				false,  // mandatory
				false,  // immediate
				amqp.Publishing{
					ContentType: "text/plain",
					Body:        bin,
				})
			failOnError(err)
		}
	}
}

func failOnError(err error) {
	if err != nil {
		log.Fatal(err)
	}
}
