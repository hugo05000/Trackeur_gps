<?php

function getLast30GPSPositions($json) {
    // Décodage du JSON en tableau associatif
    $data = json_decode($json, true);
    if ($data === null) {
        return []; // Erreur de décodage
    }

    // Trier les enregistrements par timestamp décroissant (les plus récents en premier)
    usort($data, function ($a, $b) {
        return strtotime($b['timestamp']) - strtotime($a['timestamp']);
    });

    // Ne conserver que les 30 premiers enregistrements
    $last30 = array_slice($data, 0, 30);

    $positions = [];

    // Parcourir chacun des enregistrements sélectionnés
    foreach ($last30 as $entry) {
        // Si l'API fournit directement des champs "latitude" et "longitude"
        if (isset($entry['value']['latitude']) && isset($entry['value']['longitude'])) {
            $positions[] = [
                'latitude'  => $entry['value']['latitude'],
                'longitude' => $entry['value']['longitude']
            ];
        }
        // Sinon, tenter d'extraire les coordonnées depuis le champ "payload"
        elseif (isset($entry['value']['payload'])) {
            $payload = $entry['value']['payload'];
            // Convertir la chaîne hexadécimale en données binaires
            $binary = hex2bin($payload);
            // On suppose ici que les 8 premiers octets contiennent deux floats (4 octets chacun)
            if ($binary !== false && strlen($binary) >= 8) {
                // Décompacter en deux floats (attention : le format doit être adapté à votre payload)
                $coords = unpack("flatitude/flongitude", $binary);
                $positions[] = [
                    'latitude'  => $coords['latitude'],
                    'longitude' => $coords['longitude']
                ];
            }
        }
    }

    return $positions;
}
