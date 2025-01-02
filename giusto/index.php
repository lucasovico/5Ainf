
<?php
// Server SOAP

function convertCurrency($amount, $currency) {
    // Carica i tassi di cambio dal file JSON
    $rates = json_decode(file_get_contents("exchange_rates.json"), true);
    
    // Controlla se la valuta è supportata
    if (!isset($rates[$currency])) {
        return "Errore: valuta non supportata.";
    }

    // Calcola la conversione
    $convertedAmount = number_format($amount * $rates[$currency], 2);
    return "Conversione: $amount EUR = $convertedAmount $currency";
}

$server = new SoapServer("test.wsdl");

// Registra la funzione convertCurrency
$server->addFunction("convertCurrency");

$server->handle();
?>
