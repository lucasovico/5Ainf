<?php

//Server SOAP

function sayHello($name){

  // return "Ciao $name, sto funzionando come chiamata SOAP!";

   $dollar = number_format($name*1.09, 2); 

   $conv = "conversione euro-dollaro: " . $dollar;

   return $conv; 

}

$server= new SoapServer("test.wsdl");

$server->addFunction("sayHello");

$server->handle();

?>

