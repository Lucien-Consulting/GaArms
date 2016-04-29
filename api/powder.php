<?php
include('./functions/functions.inc');

$powder = new Powder;
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $method = $_POST['method'];
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
        $powder->id = $_POST['id'];
        $powder->newValue = $_POST['value'];
        $powder->updatePowder();
        echo $powder->result;
        break;
}