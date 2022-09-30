<html>

<head>
	<title>Tetris</title>
	<style>
		/*the navbar itself*/
		ul {
			list-style-type: none;
			overflow: hidden;
			background-color: blue;
			/*creates space around elements outside the defined borders*/
			margin: 0;
			/*creates space around elements inside the defined borders*/
			padding: 0;
		}
		
		/*the location of the elements on the navbar*/
		li {
			float: right;
		}
		
		/*the anchor tags*/
		li a {
			display: block;
			color: white;
			/*Arial is a member of the generic font family sans-serif*/
			font-family: Arial, sans-serif;
			font-size: 12px;
			font-style: bold;
			text-align: center;
			padding: 16px;
			text-decoration: none;
		}
		
		/*when an item is moused over*/
		li a:hover {
			background-color: #111;
		}

		body {
			font-family: Arial, sans-serif;
		}

		/*page content will go here*/
		div.main {
			/*background image*/
			position: relative;
			background-image: url("tetris.png");
			background-repeat: no-repeat;
			background-attachment: fixed;
			background-size: 95%;
			left: 100px;
			height: 100%;
			width: 100%;
		}
		/*the gray div for holding the interactable content*/
		div.second-div {
			position: absolute;
			background-color: #c7c7c7;
			box-shadow: 5px 5px 5px gray;
			top: 100px;
			left: 250px;
			width: 500px;
			height: 500px;
			padding: 30px;
		}

		/*construct the div that the tetris game will be played in*/
		div.tetris-bg {
			background-image: url("tetris-grid-bg.png");
			background-size: 100%;
			height: 400px;
			width: 200px;
		}

		/*keep the input boxed tidy with a small gap between them*/
		div input {
			margin: 1px;
		}
	</style>
</head>

<body>
<ul>
	<li style="float: left" name="home"><a href="index.php">Home</a></li>
	<li name="leaderboard"><a href="leaderboard.php">Leaderboard</a></li>
	<li name="tetris"><a href="tetris.php">Play Tetris</a></li>
</ul>
