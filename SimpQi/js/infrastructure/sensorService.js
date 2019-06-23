class SensorService {
    constructor() {
        this.latitude = 0;
        this.longitude = 0;
        this.country = 'Somewhere';

        if(this.clientSupportsSensors()) {
            navigator.geolocation.getCurrentPosition((pos) => this.setCurrentPosition(pos));
        }
    }

    clientSupportsSensors() {
        return navigator !== undefined;
    }

    setCurrentPosition(position) {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.fetchCountry();
    }

    vibrate(duration) {
        navigator.vibrate(duration);
    }

    fetchCountry(){
        $.getJSON(`http://api.geonames.org/countryCodeJSON?lat=${this.latitude}&lng=${this.longitude}&username=therealherbert`,
            (data) => this.setCountry(data.countryName));
    }

    setCountry(countryName){
        this.country = countryName;
    }

    getCountry(){
        return this.country;
    }
}
