<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';
include_once '../objects/product.php';

$database = new Database();
$db = $database->getConnection();
$product = new Product($db);


$stmt = $product->read();
$num = $stmt->rowCount();

// проверка, найдено ли больше 0 записей 
if ($num > 0) :
  $products_arr = [];
  $products_arr["data"] = [];

  while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    extract($row);
    $product_item = array(
      "id" => $id,
      "name" => $name,
      "description" => html_entity_decode($description),
      "price" => $price,
      "image_item" => $image_item,
      "created" => $created,
      "modified" => $modified,
    );
    array_push($products_arr["data"], $product_item);
  }
  http_response_code(200);
  echo json_encode($products_arr);
else :

  http_response_code(404);
  echo json_encode(array("message" => "Товары не найдены."), JSON_UNESCAPED_UNICODE);
endif;
