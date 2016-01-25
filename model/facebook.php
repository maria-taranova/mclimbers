<?php
include("connection.php");


function FBRegister(){
    global $con;
    
    
    var_dump($_POST['email']);
    
   
    $username = $_POST['name'];
    $password ='123';
    $lname = 'none';
    $fname = 'none';
    $email = $_POST['email'];
    $city = 'Vancouver';
     $fbid = $_POST['fbid'];
     $img = $_POST['img'];
    
    
    $arrayStorage = array();
    
 $query = "INSERT INTO `users` (`id`, `username`, `lname`, `fname`, `password`, `locationID`, `email`, `profilePicture`, `fb_id`) VALUES (NULL, '".$username."', '".$lname."', '".$fname."', '".$password."', (SELECT id FROM location WHERE city='".$city."'), '".$email."', '".$img."', '".$fbid."')";

$result = mysqli_query($con, $query);

	$result = mysqli_query($con, $query);
	if($result){
        
      	while($row = mysqli_fetch_array($result)){
	
			$userinfo = array(
				"username" => $row['username'],
				"profilePicture" => $row['profilePicture'],
				
			);
			
			array_push($arrayStorage, $userinfo);
		}
		
	}
	
	/*echo "<pre>";
	var_dump($arrayStorage);
	echo "</pre>";*/
	echo json_encode($arrayStorage);

};
    


function FBIDSelect(){
 global $con;
       $fbid = $_POST['fbid'];
    $arrayStorage = array();
    
    $query = "SELECT * FROM users WHERE fb_id = '".$fbid."'";
    
    $result = mysqli_query($con, $query);
        
    if($result){
     while($row = mysqli_fetch_array($result)){
	
			$userinfo = array(
				"username" => $row['username'],
				"profilePicture" => $row['profilePicture'],
                "id" => $row['id']
				
			);
			
			array_push($arrayStorage, $userinfo);
         echo json_encode($arrayStorage, JSON_FORCE_OBJECT);

		}
    }
}


if($_POST['mode'] == 1){
    FBRegister();
    FBIDSelect();  

}

if($_POST['mode'] == 2){
 FBIDSelect();  

  
}
?>