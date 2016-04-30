<?php
include('./functions/functions.inc');
$json = json_decode(file_get_contents('php://input'));
$powder = new Powder;
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $method = $json['method'];
} else {
    $method = $_GET['method'];
}

switch ($method) {
    case 'get':
        $powder->getPowder();
        header('Content-Type: application/json');
        echo $powder->result;
        break;   
    case 'update':
        $powder->id = $json['id'];
        $powder->newValue = $json['value'];
        $powder->updatePowder();
        echo $powder->result;
        break;
}