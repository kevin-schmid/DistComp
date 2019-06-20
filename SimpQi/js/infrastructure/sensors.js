class Sensors {
    constructor() {
        this.longitude = 0;
        this.latitude = 0;
        this.country = 'Unknown';

        if(navigator === undefined) {
            throw Error("Your browser does not Support the Sensor API");
        }

        navigator.geolocation.getCurrentPosition((pos) => this.setCurrentPosition(pos));
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
