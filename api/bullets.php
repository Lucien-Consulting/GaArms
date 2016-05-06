<?php
include('./functions/functions.inc');
$json = json_decode(file_get_contents('php://input'));
$bullets = new Bullets;
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $method = $json->method;
} else {
    $method = $_GET['method'];
}

switch ($method) {
    case 'get':
        $bullets->getBullets();
        header('Content-Type: application/json');
        echo $bullets->result;
        break;   
    case 'update':
        $bullets->id = $json->id;
        $bullets->newValue = $json->newValue;
        $bullets->quantity = $json->quantity;
        $bullets->initial = $json->initial;
        $bullets->updateBullet();
        echo $bullets->result;
        break;
}
