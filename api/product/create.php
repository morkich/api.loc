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
$data = json_decode(file_get_contents("php://input"));

if (
  !empty($data->name) &&
  !empty($data->price) &&
  !empty($data->description) &&
  !empty($data->image_item)
):

  $product->name = $data->name;
  $product->price = $data->price;
  $product->description = $data->description;
  $product->image_item = $data->image_item;
  $product->created = date('Y-m-d H:i:s');

  if ($product->create()) {
    http_response_code(201);
    echo json_encode(["message" => "Товар был создан."], JSON_UNESCAPED_UNICODE);
  }
  else {
    http_response_code(503);
    echo json_encode(["message" => "Невозможно создать товар."], JSON_UNESCAPED_UNICODE);
  }
else:
  
  http_response_code(400);
  echo json_encode(["message" => "Невозможно создать товар. Данные неполные."], JSON_UNESCAPED_UNICODE);
endif;
