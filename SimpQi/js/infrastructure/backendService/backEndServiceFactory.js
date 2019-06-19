class BackendServiceFactory {
    constructor(host, port, fake=false) {
        this.host = host;
        this.port = port;
        this.fake = fake;
    }

    create() {
        return this.fake 
            ? new FakeBackendService() 
            : new WebSocketBackendService(this.host, this.port);
    }
}