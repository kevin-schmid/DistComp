# SimpQui Server

## Quick Start

The latest all-in-one build can be downloaded at https://codinggentleman.com/share/

To start the server, simply use the command line:
```bash
java -jar SimpQui-all-1.0-SNAPSHOT.jar
```

The default port 8090 can be overwritten with a command line param:
```bash
java -jar SimpQui-all-1.0-SNAPSHOT.jar -port 8099
```

The quick start jar doesn't use any queueing. It's a standalone to test the Web App.  
Other default params which are not configurable in the quick start:

* 2 Player can play together in one game
* 5 Question rounds per game are played  
* Each round lasts 10 seconds

## Setup

Java Version 11 is needed. Dependencies are managed via gradle.
