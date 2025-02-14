import {getData} from "./getData.js";

document.addEventListener("DOMContentLoaded", function () {
    // Initialisation de la carte avec un point de vue initial
    var map = L.map('map').setView([48.8566, 2.3522], 5);

    // Ajout du fond de carte OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributeurs'
    }).addTo(map);

    getData().then(data => {
        console.log("Les données récupérées :", data);
        // Si 'data' est un objet qui contient une propriété 'latitude', vous pouvez y accéder :
        console.log(data[0].latitude);
        var positionActuelle = L.marker([data[0].latitude, 2.3522]).addTo(map);
    })


    // Variable pour stocker le marqueur courant
    //var currentMarker = null;
    var defaultMarker = L.marker([48.8566, 2.3522]).addTo(map);
    var positionActuelle = L.marker([48.8566, 2.3522]).addTo(map);


    // Ajout d'un écouteur d'événement sur chaque ligne du tableau
    document.querySelectorAll('#coordinatesTable tbody tr').forEach(function (row) {
        row.addEventListener('click', function () {
            var lat = parseFloat(this.dataset.lat);
            var lng = parseFloat(this.dataset.lng);

            // Supprime le marqueur précédent s'il existe
            if (currentMarker) {
                map.removeLayer(currentMarker);
            }

            // Ajoute un nouveau marqueur à l'endroit sélectionné
            currentMarker = L.marker([lat, lng]).addTo(map);

            // Centre la carte sur le nouveau marqueur et ajuste le niveau de zoom
            map.setView([lat, lng], 13);
        });
    });
});