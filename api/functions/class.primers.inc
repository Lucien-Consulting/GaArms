<?php

class Primers {
    public $id;
    public $newValue;
    public $initial;
    public $quantity;

    //stores results from database queries
    public $result;
    public $rows;

    //sets up the database connection
    private function setupDb(){
        include('config.inc');
    }

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

        $this->result = json_encode($result);
    }

    public function updatePrimer(){
        $this->setupDb();
        
        $sql = $this->db->prepare(" UPDATE products ('quantity')
                                    VALUES (?)
                                    WHERE id_product = ? ");
        $sql->bindParam(1, $newValue);
        $sql->bindParam(2, $id);
        $sql->execute();

        $added = 0;
        $removed = 0;

        if ($this->quantity > 0) {
            $added = $this->quantity;
        } else {
            $removed = $this->quantity * -1;
        }

        $log = $this->db->prepare(" INSERT INTO logs (id_product, initial, added, removed, date)
                                    VALUES (?, ?, ?, ?, ?)");
        $log->bindParam(1, $this->id);
        $log->bindParam(2, $this->initial);
        $log->bindParam(3, $added);
        $log->bindParam(4, $removed);
        $log->bindParam(5, NOW());
        $this->result = 'success';
    }
}
