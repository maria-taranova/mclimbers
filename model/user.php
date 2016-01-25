<?php
//this file is for manipulating data in the back
include("connection.php");
//call for all Trails data





function InsertUser(){
	global $con;
    var_dump($_POST['userData']);
    $data = $_POST['userData'];
   
    $username = $data['username'];
    $password = md5($data['password']);
    $lname = $data['lname'];
    $fname = $data['fname'];
    $email = $data['email'];
    $city = $data['city'];


   // $rating = $data['rating'];
   
    
	$arrayStorage = array();
    
 
	  
    $query = "INSERT INTO `users` (`id`, `username`, `lname`, `fname`, `password`, `locationID`, `email`, `profilePicture`) VALUES (NULL, '".$username."', '".$lname."', '".$fname."', '".$password."', (SELECT id FROM location WHERE city='".$city."'), '".$email."', '')";
    
    
    
    
    $result = mysqli_query($con, $query);
	if($result){
		
		echo json_encode("INSERTED!!!!");
		
	} else {
		echo json_encode("FAIL!!!");	
	}
}

function showOneUser(){
	global $con;
	
//    var_dump($_POST['userData']);
   
    $data = $_POST['userData'];
    $username = $data['username'];
    $password = $data['password'];

	$arrayStorage = array();
	$query = "SELECT id, username, fname, lname, password, profilePicture FROM users WHERE username = '".$username."' AND password = '".$password."'";
	$result = mysqli_query($con, $query);
	if($result){
		while($row = mysqli_fetch_array($result)){
	
			$userinfo = array(
				"username" => $row['username'],
				"profilePicture" => $row['profilePicture'],
				"fname" => $row['fname'],
				"lname" => $row['lname']
				
			);
			
			array_push($arrayStorage, $userinfo);
		}
		
	}
	
	/*echo "<pre>";
	var_dump($arrayStorage);
	echo "</pre>";*/
	echo json_encode($arrayStorage);
};



//showAllUsers();
 if ($_POST['mode'] == 12){
	InsertUser();	
} else if ($_POST['mode'] == 5){
	showOneUser();
 }



?>