<?php
include('./functions/functions.inc');

$bullets = new Bullets;
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $method = $_POST['method'];
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
        $bullets->id = $_POST['id'];
        $bullets->newValue = $_POST['value'];
        $bullets->updateBullet();
        echo $bullets->result;
        break;
}