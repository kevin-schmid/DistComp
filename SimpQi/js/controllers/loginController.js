class LoginController {
    constructor(backendService, persistenceService, loginSuccessCallback) {
        if(backendService === undefined)
            throw Error("BackendService may not be undefined");
        if(persistenceService === undefined) 
            throw Error("PersistenceService may not be undefined");
        if(loginSuccessCallback === undefined)
            throw Error("LoginSuccess-Callback may not be undefined");

        this.backendService = backendService;
        this.persistenceService = persistenceService;
        this.loginSuccessCallback = loginSuccessCallback;
    }

    display() {
        renderLogin();
        this.initialize();
    }

    initialize() {
        var self = this;

        /* Load Username from last Session, to help user save time */
        var lastUsername = this.persistenceService
            .loadFromLocalStorage('lastUsername');

        if(!$.isEmptyObject(lastUsername)) {
            $('.js-username-input').val(lastUsername);
        }

        /* User presses Enter on Input-Textbox */
        $('.js-username-input').keyup(function(ev){
           if(ev.keyCode === 13) self.tryLogin();
        });

        /* User clicks Login-Button */
        $('.js-login-button').on("click", function() { 
            self.tryLogin();
        });
    }

    tryLogin() {
        var username = $('.js-username-input').val();
        var loginResult = this.backendService.tryLogin(username);
        if(loginResult.success === false) {
            this.flashLoginError(loginResult.message);
            return;
        }

        this.persistenceService
            .persistToLocalStorage('lastUsername', username);

        this.loginSuccessCallback(username);
    }

    flashLoginError(message) {
        $('.js-error-message')
            .html(message)
            .show()
            .fadeOut(5000);
    }
}
