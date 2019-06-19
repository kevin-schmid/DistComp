class WebSocketBackendService {
    construct(host, port) {
        this.host = host;
        this.port = port;
    }

    tryLogin(username) {
        return { 
            'success': true, 
            'message': 'Login successful' 
        };
    }
}