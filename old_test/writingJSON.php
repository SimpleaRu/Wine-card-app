<?php 
$wineCardArr = file_get_contents('winecardsJSON.json');
$wineCardArrP = json_decode($wineCardArr);
var_dump($wineCardArrP);
// echo $wineCardArrP[1]->name ;
