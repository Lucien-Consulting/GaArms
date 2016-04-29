<?php
include('./functions/functions.inc');

$signin = new Users;
$signin->username = $_POST['username'];
#### todo: import a crypto library, store a salt with the hashed pass to verify the pass
$signin->password = $_POST['password'];
$signin->signIn();

echo $signin->result;