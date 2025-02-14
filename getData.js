import {milesightDeviceDecode} from "./decoder.js";
import config from './config.js';

var apiUrl = config.apiUrl;
var deviceEUI = config.deviceEUI;
var apiKey = config.apiKey
apiUrl = apiUrl + deviceEUI;

function hexToBytes(hex) {
    if (hex.length % 2 !== 0) {
        throw new Error("Invalid hex string");
    }
    let bytes = [];
    for (let i = 0; i < hex.length; i += 2) {
        bytes.push(parseInt(hex.substr(i, 2), 16));
    }
    return bytes;
}

const options = {
    method: 'GET', // ou "POST" selon votre besoin
    headers: {
        'X-API-KEY': apiKey,
        'Content-Type': 'application/json'
    }
};

export function getData() {
    return fetch(apiUrl, options)
        .then(response => {
            if (response.status === 200) {
                return response.json(); // Extract data as JSON
            } else {
                // Throw an error for non-200 status codes
                throw new Error('Erreur : HTTP ' + response.status);
            }
        })
        .then(data => {
            // Assuming 'data' is an array
            const filteredData = data
                .map(entry => {
                    const payloadHex = entry.value.payload;
                    const payloadBytes = hexToBytes(payloadHex);
                    const decodedData = milesightDeviceDecode(payloadBytes);

                    // Ajouter timestamp et EUI
                    decodedData.timestamp = entry.timestamp;
                    decodedData.deviceEUI = deviceEUI;

                    return decodedData;
                })


            console.log("Données filtrées et valides :", filteredData);

            // Affiche le résultat en cas de succès
            console.log(filteredData);
        })
        .catch(error => {
            // Affiche le message d'erreur en cas de problème
            console.error(error.message);
        });
}

