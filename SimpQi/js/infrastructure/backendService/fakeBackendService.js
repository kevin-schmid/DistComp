class FakeBackendService {
    constructor() {}

    tryLogin(username) {
        if(username === "herbert") {
            return { 
                'success': true, 
                'message': 'Login successful' 
            };
        }
        
        return { 
            'success': false, 
            'message': `The username '${username}' has already been taken` 
        };
    }
}