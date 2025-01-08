<?php

//Client SOAP

$wsdl_url = "http://127.0.0.1/soap/server/test.wsdl";

if (isset($_POST['name']) && !empty($_POST['name'])){ 

    try {

        $client = new SoapClient($wsdl_url,["location" =>"http://127.0.0.1/soap/server/",""]);

        $risposta = $client->sayHello(htmlentities($_POST['name']));

        echo $risposta;

    } catch (SoapFault $e){

        echo '<br>Errore nel client SOAP: ' . $e->getMessage();

    }

}


?>

