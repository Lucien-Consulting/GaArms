<?php
include('./functions/functions.inc');
$json = json_decode(file_get_contents('php://input'));
$brands = new Brands;
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $method = $json['method'];
} else {
    $method = $_GET['method'];
}

switch ($method) {
    case 'get':
        $brands->getBrands();
        header('Content-Type: application/json');
        echo $brands->result;
        break;   
    case 'delete':
        $brands->id = $json['id'];
        $brands->deleteBrand();
        echo $brands->result;
        break;
    case 'create':
        $brands->name = $json['name'];
        $brands->addBrand();
        echo $brands->result;
        break;
}