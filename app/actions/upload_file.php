<?php
$uploaddir = '../assets/img/objects/';
$filename = basename($_FILES['document']['name']);
$uploadfile = $uploaddir . basename($_FILES['document']['name']);

if (move_uploaded_file($_FILES['document']['tmp_name'], $uploadfile)) {
    echo '{"success": true, "file": "./app/assets/img/objects/'. $filename .'" }';
} else {
    echo '{"success": false}';
}
?>