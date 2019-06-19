class PersistenceService {
    construct() {}

    isClientSupportingsSessionStorage() {
        return sessionStorage !== undefined;
    }

    isClientSupportingLocalStorage() {
        return localStorage !== undefined
    }

    loadFromSessionStorage(key) {
        var value = sessionStorage.getItem(key);
        return value !== null && value !== undefined ? value : {};
    }

    persistToSessionStorage(key, value) {
        sessionStorage.setItem(key, value);
    }

    extendSessionStorage(key, value) {
        var existing = loadFromSessionStorage(key);
        var extended = $.extend(existing, value);
        persistToSessionStorage(key, extended);
    }

    loadFromLocalStorage(key) {
        var value = localStorage.getItem(key);
        return value !== null && value !== undefined ? value : {};
    }

    persistToLocalStorage(key, value) {
        localStorage.setItem(key, value);
    }

    extendLocalStorage(key, value, defaultState) {
        var existing = loadFromLocalStorage(key);
        var extended = $.extend(existing, value);
        persistToLocalStorage(key, extended);
    }
}