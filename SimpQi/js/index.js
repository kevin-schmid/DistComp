function renderSimpQiUnsupportedError(reason) {
    return "Excuse me, but it seems that your browser is a little out of date. " + reason
}

$(document).ready(function() {
    var sensorService = new Sensors();
    var persistenceService = new PersistenceService();
    if(!persistenceService.isClientSupportingLocalStorage() 
        || !persistenceService.isClientSupportingsSessionStorage()) {
            alert(renderSimpQiUnsupportedError("Browser does not support Session-/LocalStorage."));
    }

    var backendService = new BackendServiceFactory("localhost", 1337, false).create();

    var gameController = new GameController(backendService, persistenceService, sensorService);
    var loginController = new LoginController(backendService, persistenceService, sensorService,function(username){
       gameController.display();
    });

    loginController.display();
});
