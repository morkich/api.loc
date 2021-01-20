<?php
class Product
{
  private $conn;
  private $table_name = "products";

  // свойства объекта 
  public $id;
  public $name;
  public $description;
  public $price;
  public $image_item;
  public $created;
  public $modified;

  public function __construct($db)
  {
    $this->conn = $db;
  }

  function read()
  {
    $query = "SELECT
                  `image_item`, `id`, `name`, `description`, `price`, `created`, `modified`
              FROM
                  " . $this->table_name . "
              ORDER BY
                  created DESC";

    $stmt = $this->conn->prepare($query);
    $stmt->execute();
    return $stmt;
  }

  function create()
  {
    $query = "INSERT INTO
                    " . $this->table_name . "
                SET
                    name=:name, 
                    price=:price, 
                    description=:description, 
                    image_item=:image_item, 
                    created=:created";

    $stmt = $this->conn->prepare($query);

    $this->name = htmlspecialchars(strip_tags($this->name));
    $this->price = htmlspecialchars(strip_tags($this->price));
    $this->description = htmlspecialchars(strip_tags($this->description));
    $this->image_item = htmlspecialchars(strip_tags($this->image_item));
    $this->created = htmlspecialchars(strip_tags($this->created));

    $stmt->bindParam(":name", $this->name);
    $stmt->bindParam(":price", $this->price);
    $stmt->bindParam(":description", $this->description);
    $stmt->bindParam(":image_item", $this->image_item);
    $stmt->bindParam(":created", $this->created);

    if ($stmt->execute()) {
      return true;
    }
    return false;
  }

  function update()
  {
    $query = "UPDATE
                    " . $this->table_name . "
                SET
                    name = :name,
                    price = :price,
                    description = :description,
                    modified = :modified
                WHERE
                    id = :id";

    $stmt = $this->conn->prepare($query);

    $this->name = htmlspecialchars(strip_tags($this->name));
    $this->price = htmlspecialchars(strip_tags($this->price));
    $this->description = htmlspecialchars(strip_tags($this->description));
    $this->id = htmlspecialchars(strip_tags($this->id));
    $this->modified = htmlspecialchars(strip_tags($this->modified));

    $stmt->bindParam(':name', $this->name);
    $stmt->bindParam(':price', $this->price);
    $stmt->bindParam(':description', $this->description);
    $stmt->bindParam(':id', $this->id);
    $stmt->bindParam(':modified', $this->modified);

    if ($stmt->execute()) {
      return true;
    }
    return false;
  }

  function update_image()
  {
    $query = "UPDATE
                    " . $this->table_name . "
                SET
                    image_item = :image_item,
                    modified = :modified
                WHERE
                    id = :id";

    $stmt = $this->conn->prepare($query);

    $this->image_item = htmlspecialchars(strip_tags($this->image_item));
    $this->id = htmlspecialchars(strip_tags($this->id));
    $this->modified = htmlspecialchars(strip_tags($this->modified));

    $stmt->bindParam(':image_item', $this->image_item);
    $stmt->bindParam(':id', $this->id);
    $stmt->bindParam(':modified', $this->modified);

    if ($stmt->execute()) {
      return true;
    }
    return false;
  }


  function delete()
  {
    $id_product = $_GET['id'];

    $query = "DELETE FROM " . $this->table_name . " WHERE id = " . $id_product . "";

    $stmt = $this->conn->prepare($query);
    $this->id = htmlspecialchars(strip_tags($this->id));
    $stmt->bindParam(1, $this->id);

    if ($stmt->execute()) {
      return true;
    }

    return false;
  }
}
