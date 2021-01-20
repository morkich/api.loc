<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../objects/product.php';

$database = new Database();
$db = $database->getConnection();

$product = new Product($db);

$product->id = $_POST['id'];

$product->image_item = $_POST['link_image'];
$product->modified = date('Y-m-d H:i:s');

if ($product->update_image()) :

  http_response_code(200);
  echo json_encode(array("message" => "Товар был обновлён."), JSON_UNESCAPED_UNICODE);
else :

  http_response_code(503);
  echo json_encode(array("message" => "Невозможно обновить товар."), JSON_UNESCAPED_UNICODE);
endif;
