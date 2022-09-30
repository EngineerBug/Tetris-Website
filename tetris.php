<?php
	include_once 'header.php';
?>

<div class="main">
	<div class="second-div" style="">
		<!--score-->
		<p id="score">Score: <span id="points">0</span></p>
		<!--game board-->
		<div class="tetris-bg">
			<canvas id="tetris" width="220" height="400"></canvas>
			<script src="./tetris.js"></script>
		</div>
	</div>
</div>
</body>

</html>
