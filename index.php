<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>PHP_n_JSON</title>
	
</head>
<body>
	<div class="wineContener"></div>
	
	<?php
	
	$string = file_get_contents('winecardsJSON.json');
	$data = json_decode($string);
	var_dump($data[1]->name);
	$data[1]->noteText = 'trololo';
	echo $data[1]->noteText;
	
	?>

	<script src='script.js'></script>
</body>
</html>

