<?php

class Products {
    public $name;
    public $newName;
    public $id;
    public $type;
    public $brand;

    //stores results from database queries
    public $result;
    public $rows;

    //sets up the database connection
    private function setupDb(){
        include('config.inc');
    }

    public function getProducts() {
        $this->setupDb();
        $sql = $this->db->prepare(" SELECT  products.id_product,
                                            products.quantity,
                                            products.name as productName, 
                                            brands.name as brandName
                                    FROM products JOIN brands
                                    ON products.id_brand = brands.id_brand
                                    ORDER BY productName ASC");
        $sql->execute();
        $result = $sql->fetchAll(PDO::FETCH_ASSOC);
        $this->result = json_encode($result);
    }

    public function getProductTypes() {
        $this->setupDb();
        $sql = $this->db->prepare("SELECT name, id_category
                                   FROM categories");
        $sql->execute();
        $result = $sql->fetchAll(PDO::FETCH_ASSOC);
        $this->result = json_encode($result);
    }

    public function addProduct(){
        //set up database
        $this->setupDb();
        $sql = $this->db->prepare("SELECT name
                                   FROM products
                                   WHERE name = ?");
        $sql->bindParam(1, $this->name);
        $sql->execute();
        $this->rows = $sql->rowCount();
        if ($this->rows > 0) {
            $this->result = 'The product "' . $this->name . '"" already exists.';
        } else {
            $prods = $this->db->prepare(" INSERT INTO products (name, id_brand, id_type)
                                          VALUES (?, ?, ?)");

            $prods->bindParam(1, $this->name);
            $prods->bindParam(2, $this->brand);
            $prods->bindParam(3, $this->type);
            $prods->execute();
            $this->result = 'success';
        }
    }

    public function updateProduct(){
        //set up database
        $this->setupDb();
        $sql = $this->db->prepare("UPDATE products
                                   SET name = ?
                                   WHERE id_product = ?");
        $sql->bindParam(1, $this->newName);
        $sql->bindParam(2, $this->id);
        $sql->execute();
        $this->result = 'success';
    }

    public function deleteProduct(){
        $this->setupDb();
        
        $sql = $this->db->prepare(" DELETE FROM products 
                                    WHERE id_product = ?");
        $sql->bindParam(1, $this->id);
        $sql->execute();

        $this->result = 'success';
    }
}
