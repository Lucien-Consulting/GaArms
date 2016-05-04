<?php
include('./functions/functions.inc');
$json = json_decode(file_get_contents('php://input'));

$products = new Products;
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $method = $json->method;
} else {
    $method = $_GET['method'];
}

switch ($method) {  
    case 'get':
        $products->getProducts();
        echo $products->result;
        break;
    case 'types':
        $products->getProductTypes();
        echo $products->result;
        break;
    case 'delete':
        $products->id = $json->id;
        $products->deleteProduct();
        echo $products->result;
        break;
    case 'create':
        $products->name = $json->name;
        $products->brand = $json->brand;
        $products->type = $json->type;
        $products->addProduct();
        echo $products->result;
        break;
}