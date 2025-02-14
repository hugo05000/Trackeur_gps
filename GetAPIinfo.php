<?php

echo("test");

$api_url = "https://liveobjects.orange-business.com/api/v0/data/streams/";
$api_key = "17acbb4b49134812be2ebd85081ba4d6";

$headers = [
    "X-API-KEY: $api_key",
    "Content-Type: application/json"
];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $api_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($http_code === 200) {
    echo "Réponse de l'API : " . $response;
} else {
    echo "Erreur : HTTP " . $http_code;
    var_dump($response);
}