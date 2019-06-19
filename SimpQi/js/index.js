function renderSimpQiUnsupportedError(reason) {
    return "Excuse me, but it seems that your browser is a little out of date. " + reason
}

$(document).ready(function() {
    $('.game-header').hide();
    var persistenceService = new PersistenceService();
    if(!persistenceService.isClientSupportingLocalStorage() 
        || !persistenceService.isClientSupportingsSessionStorage()) {
            alert(renderSimpQiUnsupportedError("Browser does not support Session-/LocalStorage."));
    }

    var backendService = new BackendServiceFactory("localhost", 1337, true).create();

    var gameController = new GameController(backendService, persistenceService);
    var loginController = new LoginController(backendService, persistenceService, function(username){
       gameController.display();
    });

    loginController.display();
});
