<?php

class Brands {
    public $name;
    public $id;

    //stores results from database queries
    public $result;
    public $rows;

    //sets up the database connection
    private function setupDb(){
        include('config.inc');
    }

    public function getBrands() {
        $this->setupDb();
        $sql = $this->db->prepare("SELECT name
                                FROM brands");
        $sql->execute();
        $result = $sql->fetchAll(PDO::FETCH_ASSOC);
        $this->result = json_encode($result);
    }

    //query the database to retrieve user information
    public function addBrand(){
        //set up database
        $this->setupDb();
        $sql = $this->db->prepare("SELECT name
                            FROM brands
                            WHERE name = ?");
        $sql->bindParam(1, $this->name);
        $sql->execute();
        $this->rows = $sql->rowCount();
        if ($this->rows > 0) {
            $result = 'Brand already added.';
        } else {
            $sql = $this->db->prepare(" INSERT INTO brands
                                        SET name = ?");

            $sql->bindParam(1, $this->name);
            $sql->execute();
            $result = $sql->fetch(PDO::FETCH_ASSOC);  
        }

        //return the array of information (should contain account information)
        return 'success';
    }

    //add new user
    public function deleteBrand(){
        $this->setupDb();
        
        $sql = $this->db->prepare(" DELETE FROM brands 
                                    WHERE id_brand = ?");
        $sql->bindParam(1, $this->id);
        $sql->execute();

        return 'success';
    }

    public function __toString(){
        return $this->result;
    }
}
