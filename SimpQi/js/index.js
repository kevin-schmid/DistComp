$(document).ready(function() {
    var sensorService = new SensorService();
    if(!sensorService.clientSupportsSensors()){
        alert(renderSimpQiUnsupportedError("Browser does not support SensorAPI."));
    }

    var persistenceService = new PersistenceService();
    if(!persistenceService.isClientSupportingLocalStorage() 
        || !persistenceService.isClientSupportingsSessionStorage()) {
            alert(renderSimpQiUnsupportedError("Browser does not support Session-/LocalStorage."));
    }

    var backendService = new WebSocketBackendService("localhost", 8090, 'quiz/');

    var gameController = new GameController( /* handles game */
        backendService, 
        persistenceService, 
        sensorService);

    var statsController = new StatsController( /* handles result screen */
        backendService, 
        persistenceService, 
        () => gameController.displayWaitingForPlayers());

    var loginController = new LoginController( /* handles login */
        backendService, 
        persistenceService, 
        sensorService,
        (username) => gameController.displayWaitingForPlayers());

    loginController.display();  /* start with displaying login */
});

function renderSimpQiUnsupportedError(reason) {
    return "Excuse me, but it seems that your browser is a little out of date. Reason: " + reason
}
