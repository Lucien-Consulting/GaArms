<?php
include('./functions/functions.inc');

$products = new Products;
$method = $_POST['method'];

switch ($method) {  
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