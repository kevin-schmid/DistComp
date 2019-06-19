function renderSimpQiUnsupportedError(reason) {
    return "Excuse me, but it seems that your browser is a little out of date. " + reason
}

$(document).ready(function() {
    var persistenceService = new PersistenceService();
    if(!persistenceService.isClientSupportingLocalStorage() 
        || !persistenceService.isClientSupportingsSessionStorage()) {
            alert(renderSimpQiUnsupportedError("Browser does not support Session-/LocalStorage."));
    }

    var backendService = new BackendServiceFactory("localhost", 1337, true).create();

    var loginController = new LoginController(backendService, persistenceService, function(username){
       alert("User " + username + " ist jetzt angemeledet");
    });

    loginController.display();
});
