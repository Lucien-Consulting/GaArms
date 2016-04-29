<?php
include('./functions/functions.inc');

$primers = new Primers;
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $method = $_POST['method'];
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
        $primers->id = $_POST['id'];
        $primers->newValue = $_POST['value'];
        $primers->updatePrimer();
        echo $primers->result;
        break;
}