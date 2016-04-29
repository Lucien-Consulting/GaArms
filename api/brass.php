<?php
include('./functions/functions.inc');

$brass = new Brass;
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $method = $_POST['method'];
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
        $brass->id = $_POST['id'];
        $brass->newValue = $_POST['value'];
        $brass->updateBrass();
        echo $brass->result;
        break;
}