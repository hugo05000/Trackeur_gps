import {getData} from "./getData.js";

document.addEventListener("DOMContentLoaded", function () {
    // Initialisation de la carte
    var map = L.map('map').setView([48.8566, 2.3522], 5);

    // Ajout du fond de carte OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributeurs'
    }).addTo(map);

    var tableBody = document.querySelector("#coordinatesTable tbody");
    getData()
        .then((data) => {
            // Nettoyer le tableau avant d'ajouter les nouvelles données
            tableBody.innerHTML = "";
            //Boucle permettant d'afficher seulement la dernière position par défaut
            var lastPosition = true;
            data.forEach((entry) => {
                // Extraire les données
                let lat = entry.latitude;
                let lng = entry.longitude;
                let temperature = entry.temperature;

                // Formater la date et l'heure à partir du timestamp
                let timestamp = new Date(entry.timestamp);
                let date = timestamp.toLocaleDateString();   // Format local de la date
                let time = timestamp.toLocaleTimeString();   // Format local de l'heure

                // Ajouter une nouvelle ligne au tableau avec latitude, longitude, température, date et heure
                let row = document.createElement("tr");
                row.dataset.lat = lat;
                row.dataset.lng = lng;
                row.innerHTML = `<td>${lat}</td>
                     <td>${lng}</td>
                     <td>${temperature}°C</td>
                     <td>${date}</td>
                     <td>${time}</td>`;
                tableBody.appendChild(row);

                // Ajoute le marqueur par défaut sur la carte
                if (lastPosition) {
                    // Icon rouge pour la position par défaut
                    var redIcon = L.icon({
                        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
                        shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
                        iconSize: [25, 41],
                        iconAnchor: [12, 41],
                        popupAnchor: [1, -34],
                        shadowSize: [41, 41]
                    });

                    let lastPositionMarker = L.marker([lat, lng], { icon: redIcon }).addTo(map);
                    lastPosition = false;
                }

                // Ajouter un événement au clic pour déplacer la vue
                row.addEventListener("click", function () {
                    if (currentMarker) {
                        map.removeLayer(currentMarker);
                    }

                    currentMarker = L.marker([lat, lng]).addTo(map);
                    map.setView([lat, lng], 13);
                });
            });
        });

    // Marqueur courant
    var currentMarker = null;

    // Gestion du tableau dynamique
    document.querySelectorAll('#coordinatesTable tbody tr').forEach(function (row) {
        row.addEventListener('click', function () {
            var lat = parseFloat(this.dataset.lat);
            var lng = parseFloat(this.dataset.lng);

            if (currentMarker) {
                map.removeLayer(lastPositionMarker);
                map.removeLayer(currentMarker);
            }

            // Ajoute un nouveau marqueur à l'endroit sélectionné
            var currentMarker = L.marker([lat, lng]).addTo(map);
            map.setView([lat, lng], 13);
        });
    });
});