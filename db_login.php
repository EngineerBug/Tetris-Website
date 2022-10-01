<?php
$username = "year_username";
$password = "your_password";
$dbname = "your_database_name";
// Create connection
$conn = mysqli_connect("database_location", $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . mysqli_connect_error());
} else {
	echo("Connection succesful in db_login.php<br>");
}

