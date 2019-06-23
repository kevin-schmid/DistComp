class StatsController {
    constructor(backendService, persistenceService) {
        if(backendService === undefined)
            throw Error("BackendService may not be undefined");
        if(persistenceService === undefined) 
            throw Error("PersistenceService may not be undefined");

        this.backendService = backendService;
        this.persistenceService = persistenceService;

        this.currentUser = persistenceService
            .loadFromLocalStorage('lastUsername');

        this.backendService.registerOnNewResults((results) => this.display(results));
    }

    display(results) {
        this.currentUser = this.persistenceService
            .loadFromLocalStorage('lastUsername');
        renderStats(this.currentUser, results);
    }
}
