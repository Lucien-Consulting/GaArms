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
        echo json_encode($bullets->result);
        break;   
    case 'update':
        $bullets->id = $json->id;
        $bullets->newValue = $json->value;
        $bullets->updateBullet();
        echo $bullets->result;
        break;
}