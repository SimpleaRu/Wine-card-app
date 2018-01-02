<?php
  $name = '';
  function can_upload($file){
	// если имя пустое, значит файл не выбран
    if($file['name'] == '')
		return 'Вы не выбрали файл.';
	
	/* если размер файла 0, значит его не пропустили настройки 
	сервера из-за того, что он слишком большой */
	if($file['size'] == 0)
		return 'Файл слишком большой.';
	
	// разбиваем имя файла по точке и получаем массив
	$getMime = explode('.', $file['name']);
	// нас интересует последний элемент массива - расширение
	$mime = strtolower(end($getMime));
	// объявим массив допустимых расширений
	$types = array('jpg', 'png', 'gif', 'bmp', 'jpeg');
	
	// если расширение не входит в список допустимых - return
	if(!in_array($mime, $types))
		return 'Недопустимый тип файла.';
	
	return true;
  }
  
  function make_upload($file){	
	// формируем уникальное имя картинки: случайное число и name
	$GLOBALS['name'] = mt_rand(0, 10000) . $file['name'];
	copy($file['tmp_name'], 'img/' . $GLOBALS['name']);
	}
	    // если была произведена отправка формы
			if(isset($_FILES['file'])) {
				// проверяем, можно ли загружать изображение
				$check = can_upload($_FILES['file']);
			
				if($check === true){
					// загружаем изображение на сервер

					make_upload($_FILES['file']);

			$winecardArrJson = file_get_contents('winecardsJSON.json');
			$wineCardArr = json_decode($winecardArrJson);
			$nextNum = count($wineCardArr);
			$wineCardArr[$nextNum]->name = $_POST['formName']; 
			$wineCardArr[$nextNum]->imgUrl = 'img/' . $GLOBALS['name'];
			$wineCardArr = array_values($wineCardArr);
			$winecardArrJson = json_encode($wineCardArr);
			file_put_contents('winecardsJSON.json', $winecardArrJson); 

		//	echo var_dump($wineCardArr);
				}
				else{
					// выводим сообщение об ошибке
					echo "<strong>$check</strong>";  
				}
			}