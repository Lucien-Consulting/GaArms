<?php
include('./functions/functions.inc');

$reports = new Reports;

$reports->range = $_GET['range'];
$reports->id = $_GET['id'];
$reports->generateReport();
echo $reports->result;
