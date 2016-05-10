<?php

class Reports {
    public $id;
    public $range;

    //stores results from database queries
    public $result;
    public $rows;

    //sets up the database connection
    private function setupDb(){
        include('config.inc');
    }

    //query the database to retrieve user information
    public function generateReport(){
        //set up database
        $this->setupDb();
        $prev = '';
        $today = '';
        if($this->range == "week"){
            $format = "Y-m-d";
            $now = date($format);
            $today = date($format, strtotime ( '+1 day' . $now ) );
            $prev = date ( $format, strtotime ( '-7 day' . $now ) );
        }
        else if($this->range == "month"){
            $format = "Y-m-d";
            $now = date($format);
            $today = date($format, strtotime ( '+1 day' . $now ) );
            $prev = date ( $format, strtotime ( '-1 month' . $now ) );
        }
        else if($this->range == "year"){
            $format = "Y-m-d";
            $now = date($format);
            $today = date($format, strtotime ( '+1 day' . $now ) );
            $prev = date ( $format, strtotime ( '-1 year' . $now ) );
        }

        $sql = $this->db->prepare(" SELECT logs.date,
                                           logs.added,
                                           logs.removed,
                                           logs.initial,
                                           products.name as productName
                                        FROM logs JOIN products
                                        ON logs.id_product = products.id_product
                                        WHERE id_product = ? AND date BETWEEN ? and ?
                                        ORDER BY date ASC");
        $sql->bindParam(1, $this->id);
        $sql->bindParam(2, $prev);
        $sql->bindParam(3, $today);
        $sql->execute();
        $result = $sql->fetchAll(PDO::FETCH_ASSOC);  

        $this->result = json_encode($result);
    }
}
