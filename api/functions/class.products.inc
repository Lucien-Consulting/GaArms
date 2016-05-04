<?php

class Products {
    public $name;
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
        $sql = $this->db->prepare("SELECT name, id_product
                            FROM products");
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
            $this->result = 'fail';
        } else {
            $sql = $this->db->prepare(" INSERT INTO products
                                        SET name = ?
                                            id_brand = ?
                                            id_type = ?");

            $sql->bindParam(1, $this->name);
            $sql->bindParam(2, $this->brand);
            $sql->bindParam(3, $this->type);
            $sql->execute();
            $this->result = 'success';
        }
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
