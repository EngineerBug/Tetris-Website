<?php
	include_once 'header.php';
?>

<div class="main">
	<!--PHP code to display the users welcome page, depending on if they are logged in.-->
	<div class="second-div" align="center">	
		<h1 style="text-align:center;">Welcome to Tetris</h1>
		<?php
		//is there no login cookie?
		if(!isset($_SESSION["name"])) {
		?>
		
		<br>
		<form class="loginForm" action="" method="POST">
			<h3>Already Registered? Log in instead:</h3>
			<br><input type="text" name="LoginUname" placeholder="Username">
			<br><input type="password" name="LoginPword" placeholder="Password">
			<br><input type = "submit" name="login" value = "Login">
			<br>
		</form>
		<p>Don't have a user account? <a href="register.php" class="tetrisButton">Register Now</a></p>
		
		<?php
		//there is a login cookie:
		} else {
		?>
		<!--remember to add cookie processing to update $tetrisPlayerID for scoring-->
		<a href="tetris.php" class="playButton">Click here to play!</a>
		
		<?php
		}
		?>
		
	</div>
	
	<!--PHP code to deal with POST request from register.php-->
	<div>
	<?php
		//set up database connection
		require('db_login.php');
		//has register.php has sent a POST request
		if (isset($_POST['Register'])) {
			//echo ("Debug A<br>");
			//are the requirments of the password satisfied(since none specified, I didn't do any).
			if ($_POST["pWord"] != $_POST["pWord2"]) {
				header("location: ../register.php");
				echo "Passwords did not match!<br>";
			} else {
				//add the information to the database.
				//echo ("Radio button = ".$_POST["input_score"]."<br>");
				$query = "INSERT INTO Users (UserName,FirstName,LastName,Password,Display) VALUES('"
				.$_POST["uName"]."', '"
				.$_POST["fName"]."', '"
				.$_POST["lName"]."', '"
				.$_POST["pWord"]."', "
				.$_POST["input_score"].");";
				//echo("Query = ".$query."<br>");
				
				//submit the query to the database
				if (mysqli_query($conn, $query)) {
					echo "New record created successfully";
				} else {
					echo "Error: " . $query . "<br>" . mysqli_error($conn);
				}
			}
		//has a login POST reuqest been sent by this page
		} elseif (isset($_POST['login'])) {
			//fetch the username and password fields from the database
			$query = "SELECT UserName Password FROM Users;";
			$result = mysqli_query($conn, $query);

			$row = mysql_fetch_row($result);
			for ($i = 0; $i < $row.length; $i++) {
				//check is the details from the form are in the database
				if ($row[i]["UserName"] == $_POST["LoginUname"] && $row[i]["Password"] == $_POST["LoginPword"]) {
					//create a session to store the username for scoring 
					session_start();
					$_SESSION["name"] = $row[i]["UserName"];
					echo "Successfully logged in!";
				}
			}
		}
		mysqli_close($conn);
	?>
	</div>
</div>

</body>

</html>
