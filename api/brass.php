<?php
include('./functions/functions.inc');
$json = json_decode(file_get_contents('php://input'));
$brass = new Brass;
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $method = $json->method;
} else {
    $method = $_GET['method'];
}

switch ($method) {
    case 'get':
        $brass->getBrass();
        header('Content-Type: application/json');
        echo $brass->result;
        break;   
    case 'update':
        $brass->id = $json->id;
        $brass->newValue = $json->newValue;
        $brass->quantity = $json->quantity;
        $brass->initial = $json->initial;
        $brass->updateBrass();
        echo $brass->result;
        break;
}