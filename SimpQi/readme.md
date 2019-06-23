# SimpQi Frontend

a simple JavaScript/HTML/CSS SPA (=Single-Page-Application)-Frontend for the SimpQi Quiz Backend (/server)

## Developers
* Rehberger Raffael
* Sarcevic Lejla
* Schmid Kevin
* Walzl Martin

---

## Frameworks / Dependencies in use
* jquery
* semantic-ui

---

## Features (as of this commit)
* Login-Page with faked Backend-connection
* WebSocket-Server
* Ask users question out of a list
* Peristence of username for further sessions
* Fetching and displaying of User-Country by API-Lookup of Longitude Latitude
* Fetching questions from Backend
* Sending responses back to Backend via WebSocket
* retreive GameStatus/Rankings at the end of the Game

---

## How do I run it?

* Install dependencies ```npm install```
* Start Backend Server (please refer to server-documentation)
* Start Frontend Server ```node testWebserver.js```
* Open Browser and navigate to ```localhost:8080```

---

## Developer Setup

* git clone the repository
* cd into the repository
* ```npm install``` (to install all dependencies)
* open up index.html (should direct you to a login-page)...
* ...or start Frontend Server ```nodemon testWebserver.js```

---

## How do I run all tests?

* do developer setup first
* start Backend-Server (refer to server-documentation)
* start Frontend-Server (refer to "How do I run It")
* run ```npm test```


---


## Test-Creation

#### E2E Tests with Selenium
Tests are created using Selenium-IDE in Browser, or handcrafted.
All Selenium E2E-Tests are run by calling ```npm test``` in the SimpQi-Source-Root.
Every test contained in the folder in the Format of a mocha-test (JavaScript test-framework),
will automatically run.

##### Note:
make sure that the Backend-Server is running

---

## Implementation Details

The Frontend is basically a Single-Page-Application built with a classical MVC-Pattern.
No Single-Page-Application-Framework (like Angular, Vue, React) was used. Everything was
made with plain JS and jQuery.

* Controllers are located under js/controllers
* Views are located under js/views
* Models are located under js/models

The main entrance of the frontend is index.js (which is directly linked from index.html).
From there on the LoginController is displayed. If the Login was successful LoginController
calls a callback-Function which hands GUI-Handling over to the Game-Controller. Initially
a simple Waiting-Animation and User-Card is displayed. This page is displayed as long there
was no question from Server. Server sends question every 10 seconds to the frontend.
When the game ends the GameController hands over to the StatsController, which displays
a ranking of all users that participated in this game.

For convenience-purposes:
* Username is remembered once entered (Local-Storage)
* Player-Information (on User-Card) contains the Country of the Player (which was looked up via a HTTP-REST-API)
* Rankings are sorted by the number of achieved points (= answered questions)

---

## WebSocket Communication API (Communication with Backend)

#### Frontend to Backend
* LoginMessage 

#### Backend to Frontend
* a new Question
* final Results of the Game

---
