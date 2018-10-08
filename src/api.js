const API_URL = 'https://mock-air.herokuapp.com';

/**
 * Searching ticket
 * @param originStation
 * @param destinationStation
 * @param departureDate
 * @returns {Promise<any>}
 */
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

/**
 * Get all stations
 * @returns {Promise<any>}
 */
export const getStations = () => {
    return new Promise((resolve, reject) => {
        fetch(`${API_URL}/asset/stations`)
            .then(response => response.json())
            .then(data => {
                resolve(data)
            })
            .catch(error => {
                console.log(error.message);
                reject(error);
            });
    })
};