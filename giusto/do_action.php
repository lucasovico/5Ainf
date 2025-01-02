<?php
// do_action.php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $amount = $_POST["amount"];
    $currency = $_POST["currency"];
    
    // Carica i tassi di cambio dal file JSON
    $rates = json_decode(file_get_contents("exchange_rates.json"), true);
    
    // Controlla se la valuta è supportata
    if (!isset($rates[$currency])) {
        echo "Errore: valuta non supportata.";
    } else {
        // Calcola la conversione
        $convertedAmount = number_format($amount * $rates[$currency], 2);
        echo "Conversione: $amount EUR = $convertedAmount $currency";
    }
} else {
    echo "Metodo non supportato.";
}
?>
