<?php

class Users {
    public $user_id;
    public $name_first;
    public $name_last;
    public $password;
    public $password_confirm;
    public $timelog;

    //stores results from database queries
    public $result;
    public $rows;

    //sets up the database connection
    private function setupDb(){
        include('config.inc');
    }

    //query the database to retrieve user information
    public function userInfo($user_id){
        //set up database
        $this->setupDb();
        
        //attempt to query database, return error if the databse connection fails.
        try{
            $results = $this->db->prepare(" SELECT  name_first, name_last, password, username
                                            FROM    users 
                                            WHERE   id_user = ?");
            $results->bindParam(1, $user_id);
            $results->execute();
            $result = $results->fetch(PDO::FETCH_ASSOC);
        }catch(Exception $e){
            $this->result = '<h1>Error!</h1><p>Please contact an administrator: ERROR CODE: 2100.</p>';
            exit;
        }

        //return the array of information (should contain account information)
        return $result;
    }

    //add new user
    public function updateUser($user_id){
        //set up database
        $this->setupDb();

        if($this->password === $this->password_confirm):
            try{
                $sql = $this->db->prepare(" UPDATE  users ('name_first', 'name_last', 'username', 'password') 
                                            VALUES  (?, ?, ?, ?)
                                            WHERE   id_user = ?");
                $sql->bindParam(1, $user_id);
                $sql->execute();
            }catch(Exception $e){
                $this->result = '<h1>Error!</h1><p>Please contact an administrator: ERROR CODE: 2110.</p>';
                exit;
            }
        else:
            return "Passwords do not match, please check your password and try again.";
            exit;
        endif;
    }

    //add user
    public function addUser(){
        //set up database
        $this->setupDb();

        //query the database for duplicate users
        try{
            $sql = $this->db->prepare(" SELECT  username
                                        FROM    users
                                        WHERE   username = ?");
            $sql->bindParam(1, $this->username);
            $sql->execute();
            $this->rows = $sql->rowCount();
        }catch(Exception $e){
            $this->result = 'error';
            exit;
        }
        
        //attempt to insert new user, return error if the databse connection fails.
        if($this->password !== $this->password_confirm):
            $this->result = 'password';
        elseif($this->rows > 0):
            $this->result = 'duplicate';
        else:
            try{
                $sql = $this->db->prepare(" INSERT INTO users (name_first, name_last, username, password) 
                                            VALUES      (?, ?, ?, ?)");
                $sql->bindParam(1, $this->name_first);
                $sql->bindParam(2, $this->name_last);
                $sql->bindParam(3, $this->username);
                $sql->bindParam(4, $this->password);
                $sql->execute();
            }catch(Exception $e){
                $this->result = 'error';
                exit;
            }

            //result of method - success!
            $this->result = 'success';

        endif;
    }

    //check email
    public function checkUser(){
        //set up database
        $this->setupDb();

        //query the database for duplicate users
        try{
            $sql = $this->db->prepare(" SELECT  username
                                        FROM    users
                                        WHERE   username = ?");
            $sql->bindParam(1, $this->username);
            $sql->execute();
            $rows = $sql->rowCount();
        }catch(Exception $e){
            $this->result = 'error';
            exit;
        }
        
        //return message of whether the email is taken or not.
        if($rows > 0):
            $this->result = 'duplicate';
        else:
            $this->result = 'success';
        endif;
    }

    //sign user in
    public function signIn(){
        //set up database
        $this->setupDb();

        //query the database to check email and password
        try{
            $sql = $this->db->prepare(" SELECT  username, password, id_user
                                        FROM    users
                                        WHERE   username = ? AND password = ?");
            $sql->bindParam(1, $this->username);
            $sql->bindParam(2, $this->password);
            $sql->execute();
            $this->rows = $sql->rowCount();
            $this->result = $sql->fetch(PDO::FETCH_ASSOC);
        }catch(Exception $e){
            $this->result = 'error';
            exit;
        }

        $this->result = json_encode($result);

        //log the users log in into the login_log table
        // if($this->rows === 1):
        //     try{
        //         $sql = $this->db->prepare(" INSERT INTO login_log (kf_user, timelog)
        //                                     VALUES      (?, ?)");
        //         $sql->bindParam(1, $this->user_id);
        //         $sql->bindParam(2, $this->timelog);
        //         $sql->execute();
        //     }catch(Exception $e){
        //         $this->result = 'error';
        //         exit;
        //     }
        //     $this->result = "success";
        // else:
        //     $this->result = "failed";
        // endif;
    }

    public function __toString(){
        return $this->result;
    }
}
