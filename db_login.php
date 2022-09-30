<?php
$username = "root";
$password = "HaloBenX";
$dbname = "tetris";
// Create connection
$conn = mysqli_connect("localhost", $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . mysqli_connect_error());
} else {
	echo("Connection succesful in db_login.php<br>");
}

