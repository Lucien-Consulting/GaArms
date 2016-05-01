<?php

class Primers {
    public $id;
    public $newValue;

    //stores results from database queries
    public $result;
    public $rows;

    //sets up the database connection
    private function setupDb(){
        include('config.inc');
    }

    //query the database to retrieve user information
    public function getPrimers(){
        //set up database
        $this->setupDb();
        
        $results = $this->db->prepare(" SELECT  products.id_product,
                                                products.quantity,
                                                products.name as productName, 
                                                brands.name as brandName
                                        FROM products JOIN brands
                                        ON products.id_brand = brands.id_brand
                                        WHERE id_type = 2
                                        ORDER BY productName ASC");
        $results->execute();
        $result = $results->fetchAll(PDO::FETCH_ASSOC);  

        //return the array of information (should contain account information)
        $this->result = $result;
    }

    //add new user
    public function updatePrimer(){
        $this->setupDb();
        
        $sql = $this->db->prepare(" UPDATE products ('quantity')
                                    VALUES (?)
                                    WHERE id_product = ? ");
        $sql->bindParam(1, $newValue);
        $sql->bindParam(2, $id);
        $sql->execute();
        $this->result = 'success';
    }
}
