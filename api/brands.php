<?php
include('./functions/functions.inc');

$brands = new Brands;
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $method = $_POST['method'];
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
        $brands->id = $_POST['id'];
        $brands->deleteBrand();
        echo $brands->result;
        break;
    case 'create':
        $brands->name = $_POST['name'];
        $brands->addBrand();
        echo $brands->result;
        break;
}