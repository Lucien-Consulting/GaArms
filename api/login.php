<?php
include('./functions/functions.inc');
$json = json_decode(file_get_contents('php://input'));
$signin = new Users;
$signin->username = $json->username;
#### todo: import a crypto library, store a salt with the hashed pass to verify the pass
$signin->password = $json->password;
$signin->signIn();

echo $signin->result;