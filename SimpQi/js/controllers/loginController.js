class LoginController {
    constructor(nextStepCallback) {
        this.nextStepCallback = nextStepCallback;
    }

    initialize() {
        var self = this;
        $('.js-username-input').keyup(function(ev){
           if(ev.keyCode === 13) { // keyCode 13 == Enter
               self.tryLogin();
           }
        });
        $('.js-login-button').on("click", function() {
            self.tryLogin();
        });
    }

    display() {
        renderLogin();
    }

    tryLogin() {
        var username = $('.js-username-input').val();
        if(username !== "herbert") {
            alert("Username is already taken");
        }
        this.nextStepCallback(username);
    }
}
