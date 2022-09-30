<?php
	include_once 'header.php';
?>

<div class="main">
	<div class="second-div">
		<?php
			require('db_login.php');
			$query = "SELECT * FROM Scores ORDER BY Score DESC LIMIT 5;"
			
			if (mysqli_query($conn, $query)) {
				echo "Data feched successfully";
			} else {
				echo "Error: " . $query . "<br>" . mysqli_error($conn);
			}
		?>
		<table id="leaderboard" style="width:100%">
			<!--Table headers-->
			<tr bgcolor="grey" height="40px">
				<th>Name</th>
				<th>Score</th>
			</tr>
			<!--First place-->
			<tr bgcolor="lightgrey" height="40px">
				<td id="1Name" style="color:yellow"></td>
				<td id="1Score"></td>
			</tr>
			<!--Second place-->
			<tr bgcolor="lightgrey" height="40px">
				<td id="2Name" style="color:grey"></td>
				<td id="2Score"> </td>
			</tr>
			<!--Third place-->
			<tr bgcolor="lightgrey" height="40px">
				<td id="3Name" style="color:brown"></td>
				<td id="3Score"> </td>
			</tr>
			<!--Fourth place-->
			<tr bgcolor="lightgrey" height="40px">
				<td id="4Name"></td>
				<td id="4Score"> </td>
			</tr>
			<!--Fifth place-->
			<tr bgcolor="lightgrey" height="40px">
				<td id="5Name"></td>
				<td id="5Score"> </td>
			</tr>
		</table>
	</div>
</div>
</body>

</html>
