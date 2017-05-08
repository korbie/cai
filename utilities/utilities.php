<?php

/*
TODO:
programatically screen the .txt files to ensure that blank lines aren't considered as the file names of images to be displayed
*/

session_start();

function getPhotos($collectionName){
	
	$productDescriptions = processDescriptions();
		
	$fileContents = array();
	
	$path = '../img/galleryGroups/' . $collectionName . '.txt'; 
	$fileContents = file($path, FILE_IGNORE_NEW_LINES);
	
	$output = array();
	$subArray = array();
	
	for($i = 0; $i < count($fileContents); $i++){
		array_push($subArray, $fileContents[$i]);
		if(($i + 1) % 4 == 0){
			array_push($output, $subArray);
			$subArray = array();
		}
	}
	if(count($subArray) > 0){
		array_push($output, $subArray);
	}
	
	$result = array('rows' => array());
	
	for($a = 0; $a < count($output); $a++){
		$data = array('images' => array());
	
		foreach($output[$a] as $value){
			$fileName = '../img/gallery/small/' . $value . '_small.jpg';
			
			$description = 'no data';
			$material = 'no data';
			$technique = 'no data';
			$color = 'no data';
			$size = 'no data';
			$price = 'no data';

			if(array_key_exists($value, $productDescriptions)){
				$description = htmlspecialchars($productDescriptions[$value]['description']);
				$material = htmlspecialchars($productDescriptions[$value]['material']);
				$technique = htmlspecialchars($productDescriptions[$value]['technique']);
				$color = htmlspecialchars($productDescriptions[$value]['color']);
				$size = htmlspecialchars($productDescriptions[$value]['size']);
				$price = htmlspecialchars($productDescriptions[$value]['price']);
			}			
			
			array_push($data['images'], array('fileName' => $fileName, 'itemNumber' => $value, 'itemDescription' => $description, 'itemMaterial' => $material, 'itemTechnique' => $technique, 'itemColor' => $color, 'itemSize' => $size, 'itemPrice' => $price));
		}
		array_push($result['rows'], $data);
	}
	
	return $result;
	
}

function processDescriptions(){
	
	$descriptionPath = '../img/galleryGroups/descriptions.txt'; 
	$fileContentsDescription = file($descriptionPath, FILE_IGNORE_NEW_LINES);
	
	if(count($fileContentsDescription) % 2 != 0){
		return false;
	}
	
	$output = array();
	
	for ($i = 0; $i < count($fileContentsDescription); $i++){
		if($i % 2 == 0){
			//create asssociative array, with keys set as product ID and an associative array of values (description, materials, etc).
			$output[$fileContentsDescription[$i]] = processText($fileContentsDescription[($i + 1)]);
		}
	}
	return $output;
}

function processText($rawText){
	
	//example input:
	//$testText = 'Trivet Mat / Hot Stand*100% Wool Felt*Handmade, solid rolled with perforations*Natural light brown*18@17@.7*15';
	$output = array();
	$count = 0;
	$categories = array('description', 'material', 'technique', 'color', 'size', 'price');
	$letters = str_split($rawText);
	$phrase = '';
	
	for ($i = 0; $i < count($letters); $i++){
		if($letters[$i] != '*' && $letters[$i] != ' '){
			$phrase .= $letters[$i];
		}
		else if($letters[$i] == ' '){
			$phrase .= '#';
		}
		else{
			$output[$categories[$count]] = $phrase;
			$phrase = '';
			$count++;
		}
	}

	$output[$categories[$count]] = $phrase;
	
	return $output;
}

if (isset($_POST['collection'])) {
	echo json_encode(getPhotos($_POST['collection']));
}


