<?php
//this file is for manipulating data in the back
include("connection.php");
//call for all Trails data
showImagesById();

function showImagesById(){
	global $con;
	
	$arrayStorage = array();
	$query = "SELECT * FROM pictures WHERE pictures.trailid='1'";
	$result = mysqli_query($con, $query);
   
	if($result){
		
			$result = array("pictures" => $result);
			array_push($arrayStorage, $result);
		}
		
	
  
	echo json_encode($arrayStorage);
      
}




















?>