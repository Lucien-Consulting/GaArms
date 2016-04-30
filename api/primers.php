<?php
include('./functions/functions.inc');
$json = json_decode(file_get_contents('php://input'));
$primers = new Primers;
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $method = $json->method;
} else {
    $method = $_GET['method'];
}

switch ($method) {
    case 'get':
        $primers->getPrimers();
        header('Content-Type: application/json');
        echo $primers->result;
        break;   
    case 'update':
        $primers->id = $json->id;
        $primers->newValue = $json->value;
        $primers->updatePrimer();
        echo $primers->result;
        break;
}