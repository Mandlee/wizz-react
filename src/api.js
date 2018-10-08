const API_URL = 'https://mock-air.herokuapp.com';

export const searchTicket = (originStation, destinationStation, departureDate) => {
    return new Promise((resolve, reject) => {
        fetch(`${API_URL}/search?departureStation=${originStation}&arrivalStation=${destinationStation}&date=${departureDate}`)
            .then(response => response.json())
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                console.log(error.message);
                reject(error);
            });
    });
};

export const getStations = () => {
//TODO
};