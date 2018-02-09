<?php
$file = $_GET["file"];
$data = file_get_contents($file);
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
echo $data;