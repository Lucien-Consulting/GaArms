<?php
include('./functions/functions.inc');
$json = json_decode(file_get_contents('php://input'));
$brass = new Brass;
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $method = $json['method'];
} else {
    $method = $_GET['method'];
}

switch ($method) {
    case 'get':
        $brass->getBrass();
        header('Content-Type: application/json');
        echo json_encode($brass->result);
        break;   
    case 'update':
        $brass->id = $json['id'];
        $brass->newValue = $json['value'];
        $brass->updateBrass();
        echo $brass->result;
        break;
}