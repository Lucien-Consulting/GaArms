<?php
include('./functions/functions.inc');

$products = new Products;
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $method = $_POST['method'];
} else {
    $method = $_GET['method'];
}

switch ($method) {
    case 'get':
        $products->getProducts();
        header('Content-Type: application/json');
        echo $products->result;
        break;   
    case 'delete':
        $products->id = $_POST['id'];
        $products->deleteProduct();
        echo $products->result;
        break;
    case 'create':
        $products->name = $_POST['name'];
        $products->brand = $_POST['brand'];
        $products->type = $_POST['type'];
        $products->addProduct();
        echo $products->result;
        break;
}