<?php
	include_once 'header.php';
?>

<div class="main">
	<div class="second-div">
		
		<h3>Register</h3>
		<p>Boxes marked with a red <span style="color:#ff0000">*</span> are compulsary.</p>
		<form class="register_form" action="index.php" method="POST">
			<input type="text" name="uName" placeholder="Username"><span style="color:#ff0000">*</span>
			<br><input type="text" name="fName" placeholder="First Name">
			<br><input type="text" name="lName" placeholder="Last Name">
			<br><input type="password" name="pWord" placeholder="Password"><span style="color:#ff0000">*</span>
			<br><input type="password" name="pWord2" placeholder="Confirm Password"><span style="color:#ff0000">*</span>
			<br><p>Would you like your scores on the leaderboard?</p>
			<input type="radio" id="yes" name="input_score" value="1" checked>
			<label for="yes">Yes</label>
			<br><input type="radio" id="no" name="input_score" value="0">
			<label for="no">No</label>
			<p><input type="submit" name="Register" value="Register"></p>
		</form>
		
	</div>
</div>
</body>

</html>
