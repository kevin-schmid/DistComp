class StatsController {
    constructor(persistenceService) {
        if(persistenceService === undefined) 
            throw Error("PersistenceService may not be undefined");

        this.persistenceService = persistenceService;

        this.currentUser = persistenceService
            .loadFromLocalStorage('lastUsername');
    }

    display(results) {
        this.currentUser = this.persistenceService
            .loadFromLocalStorage('lastUsername');
        renderStats(this.currentUser, results);
    }
}